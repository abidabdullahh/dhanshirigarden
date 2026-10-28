import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Check, Leaf, Loader2, MessageCircle, ScanSearch, Sparkles, TriangleAlert, X } from 'lucide-react'
import { site } from '../../data/site'
import { resizeImage } from '../../lib/imageUtils'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { analyzePlant, normalizeReport } from '../../lib/plantDoctorApi'
import { getCustomWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, PlanTree, SproutDoodle } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'
import CommonProblems from './CommonProblems'
import ContextForm from './ContextForm'
import Report from './Report'
import Viewfinder from './Viewfinder'

const MIN_SCAN_MS = 3800
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const emptyContext = { location: '', plantName: '', symptoms: [] }

function HowItWorks() {
  const { t, n } = useLocale()
  const copy = t.plantDoctor
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="text-xl">{copy.how.title}</h3>
        <ol className="mt-4 grid gap-3">
          {copy.how.steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest font-display text-[0.95rem] font-bold text-white">
                {n(index + 1)}
              </span>
              <span>
                <span className="block font-display text-[1.05rem] font-semibold text-forest">{step.title}</span>
                <span className="block text-[0.93rem] leading-snug text-charcoal/70">{step.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl bg-bloom-soft/80 p-4 ring-1 ring-bloom/25">
        <h3 className="flex items-center gap-2 text-base text-[#6b4a05]">
          <Sparkles className="size-4" aria-hidden="true" />
          {copy.tips.title}
        </h3>
        <ul className="mt-2.5 grid gap-1.5 text-[0.92rem] leading-snug text-[#6b4a05]">
          {copy.tips.items.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ScanProgress({ step, onCancel }) {
  const { t } = useLocale()
  const copy = t.plantDoctor
  return (
    <div className="grid gap-5">
      <h3 className="flex items-center gap-2.5 text-xl">
        <Loader2 className="size-5 animate-spin text-emerald" aria-hidden="true" />
        {copy.scanning.title}
      </h3>
      <ol className="grid gap-2.5">
        {copy.scanning.steps.map((label, index) => {
          const state = index < step ? 'done' : index === step ? 'current' : 'todo'
          return (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] transition-colors duration-300 ${
                state === 'current' ? 'bg-white font-semibold text-forest shadow-soft' : state === 'done' ? 'bg-bright/20 text-emerald' : 'bg-white/40 text-charcoal/45'
              }`}
            >
              <span className="grid size-6 shrink-0 place-items-center">
                {state === 'done' ? (
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                ) : state === 'current' ? (
                  <span className="size-2.5 animate-pulse-soft rounded-full bg-emerald" />
                ) : (
                  <span className="size-2 rounded-full bg-charcoal/25" />
                )}
              </span>
              {label}
            </li>
          )
        })}
      </ol>
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest/80 transition-colors hover:bg-white/70"
        >
          <X className="size-4" aria-hidden="true" />
          {copy.scanning.cancel}
        </button>
      </div>
    </div>
  )
}

function FailurePanel({ kind, onRetry, onReset }) {
  const { t, lang } = useLocale()
  const copy = t.plantDoctor
  return (
    <div role="alert" className="grid gap-4">
      <span className="grid size-12 place-items-center rounded-2xl bg-alert/10 text-alert">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </span>
      <p className="text-base font-medium leading-body text-charcoal/90">{copy.errors[kind] ?? copy.errors.server}</p>
      <div className="flex flex-wrap gap-2.5">
        <Button onClick={onRetry} icon={ScanSearch}>
          {copy.actions.tryAgain}
        </Button>
        <Button variant="glass" onClick={onReset}>
          {copy.actions.change}
        </Button>
      </div>
      <div className="rounded-2xl bg-white/70 p-4">
        <Button href={getCustomWhatsAppLink(copy.whatsapp.photo)} variant="outline" size="sm" icon={MessageCircle} lang={lang}>
          {copy.actions.sendPhoto}
        </Button>
        <p className="mt-2 text-[0.82rem] leading-snug text-charcoal/60">{copy.actions.sendPhotoHint}</p>
      </div>
    </div>
  )
}

export default function PlantDoctor() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()
  const copy = t.plantDoctor
  const [photo, setPhoto] = useState(null)
  const [stage, setStage] = useState('idle') // idle | ready | scanning | result | error
  const [context, setContext] = useState(emptyContext)
  const [liveReport, setLiveReport] = useState(null)
  const [isDemo, setIsDemo] = useState(false)
  const [errorKind, setErrorKind] = useState('server')
  const [notice, setNotice] = useState('')
  const [scanStep, setScanStep] = useState(0)
  const controller = useRef(null)
  const panel = useRef(null)

  // The demo report is read from the active language's copy, so it follows the language toggle.
  const report = useMemo(() => (isDemo ? normalizeReport(copy.sample) : liveReport), [isDemo, liveReport, copy.sample])
  const scanSteps = copy.scanning.steps

  useEffect(() => {
    if (stage !== 'scanning') return undefined
    const id = window.setInterval(() => setScanStep((step) => Math.min(step + 1, scanSteps.length - 1)), 950)
    return () => window.clearInterval(id)
  }, [stage, scanSteps.length])

  useEffect(() => () => controller.current?.abort('cancelled'), [])

  const handleFile = useCallback(
    async (file) => {
      if (!file) return
      setNotice('')
      if (!file.type.startsWith('image/')) {
        setNotice(copy.errors.format)
        return
      }
      try {
        const resized = await resizeImage(file)
        setPhoto(resized)
        setLiveReport(null)
        setIsDemo(false)
        setStage('ready')
      } catch {
        setNotice(copy.errors.image)
      }
    },
    [copy.errors],
  )

  const reset = useCallback(() => {
    controller.current?.abort('cancelled')
    setPhoto(null)
    setLiveReport(null)
    setIsDemo(false)
    setNotice('')
    setStage('idle')
  }, [])

  const analyze = useCallback(async () => {
    if (!photo) return
    controller.current?.abort('cancelled')
    const run = new AbortController()
    controller.current = run
    setScanStep(0)
    setStage('scanning')
    setNotice('')

    const minimum = wait(MIN_SCAN_MS)
    try {
      if (site.plantDoctorEndpoint) {
        const [result] = await Promise.all([
          analyzePlant({ base64: photo.base64, mediaType: photo.mediaType, lang, context, signal: run.signal }),
          minimum,
        ])
        if (run.signal.aborted) return
        setLiveReport(result)
        setIsDemo(false)
      } else {
        await minimum
        if (run.signal.aborted) return
        setLiveReport(null)
        setIsDemo(true)
      }
      setStage('result')
      if (window.innerWidth < 1024) {
        window.setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      }
    } catch (error) {
      if (run.signal.aborted) return
      setErrorKind(error?.kind || 'server')
      setStage('error')
    }
  }, [photo, lang, context])

  const cancel = () => {
    controller.current?.abort('cancelled')
    setStage('ready')
  }

  return (
    <Section id="plant-doctor">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-mint/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -left-20 top-1/4 -z-10 size-[28rem] rounded-full bg-bright/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 top-2/3 -z-10 size-[24rem] rounded-full bg-bloom/15 blur-3xl" />
      <PlanTree className="absolute -right-10 top-24 -z-10 size-64 text-forest/[0.08]" lobes={12} />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={ScanSearch} title={copy.title} sub={copy.sub} />

        <div className="relative rounded-[2.5rem] glass-green-strong p-3 shadow-lift sm:p-5">
          <LeafDoodle className="pointer-events-none absolute -right-3 -top-7 hidden size-14 rotate-12 animate-sway text-emerald sm:block" />
          <SproutDoodle className="pointer-events-none absolute -bottom-6 left-10 hidden size-14 text-emerald sm:block" />

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            <div className="rounded-[2rem] bg-white/55 p-3 sm:p-4 lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
              <Viewfinder
                photo={photo}
                stage={stage}
                scanText={scanSteps[scanStep]}
                notice={notice}
                onFile={handleFile}
                onClear={reset}
              />
            </div>

            <div ref={panel} className="scroll-mt-28 rounded-[2rem] bg-white/70 p-5 sm:p-7 lg:col-span-5">
              {stage === 'idle' && <HowItWorks />}

              {stage === 'ready' && (
                <div className="grid gap-6">
                  <ContextForm value={context} onChange={setContext} />
                  <Button size="lg" icon={ScanSearch} onClick={analyze} className="w-full">
                    {copy.actions.analyze}
                  </Button>
                </div>
              )}

              {stage === 'scanning' && <ScanProgress step={scanStep} onCancel={cancel} />}

              {stage === 'error' && <FailurePanel kind={errorKind} onRetry={analyze} onReset={reset} />}

              {stage === 'result' && report && report.isPlant && (
                <Report key={`${isDemo ? 'demo' : 'live'}-${report.diagnosis}`} report={report} isDemo={isDemo} onRetry={reset} />
              )}

              {stage === 'result' && report && !report.isPlant && (
                <div className="grid gap-4">
                  <p className="text-base font-medium leading-body text-charcoal/90">{copy.result.notPlant}</p>
                  <div>
                    <Button onClick={reset} icon={ScanSearch}>
                      {copy.actions.retry}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CommonProblems />

        {/* Cross-Link: PictureThis Plant Wiki */}
        <div className="mt-10 rounded-3xl glass-card p-6 sm:p-8 border border-white/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald/10 text-emerald">
                <Leaf className="size-6" />
              </span>
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-emerald block">
                  {lang === 'bn' ? 'পিকচার-দিস উদ্ভিদ বিশ্বকোষ · PICTURETHIS' : 'PICTURETHIS BOTANICAL WIKI'}
                </span>
                <h4 className="mt-1 font-display text-lg font-bold text-forest">
                  {lang === 'bn' ? 'অপরিচিত উদ্ভিদের ছবি তুলে প্রজাতি শনাক্ত করতে চান?' : 'Want to identify an unknown garden plant?'}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-charcoal/80 max-w-xl">
                  {lang === 'bn'
                    ? 'আমাদের পিকচার-দিস স্টাইল উদ্ভিদ আইডেন্টিফায়ার ব্যবহার করুন। পাতা বা ফুলের ছবি তুললেই প্রজাতি, বৈজ্ঞানিক নাম এবং কৃষি সম্প্রসারণ অধিদপ্তরের (DAE) যত্ন বিধি পেয়ে যাবেন।'
                    : 'Use our PictureThis-style botanical encyclopedia. Snap any leaf or flower to instantly discover binomial names, sunlight rules, watering schedules, and DAE soil mixes.'}
                </p>
              </div>
            </div>

            <Button
              href="#/plant-wiki"
              onClick={(e) => {
                e.preventDefault()
                navigate('/plant-wiki')
              }}
              variant="primary"
              className="shrink-0 text-xs font-bold uppercase tracking-wider shadow-soft"
            >
              <Leaf className="size-4" />
              <span>{lang === 'bn' ? 'উদ্ভিদকোষ খুলুন' : 'Open Plant Wiki'}</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
