import { useState } from 'react'
import { Check, Clock, Copy, FlaskConical, Info, RotateCcw, Sprout, Stethoscope, TriangleAlert, Wrench } from 'lucide-react'
import { fill } from '../../lib/format'
import { useLocale } from '../../lib/locale'
import { getCustomWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Tabs from '../ui/Tabs'

const LEVEL = { healthy: 1, mild: 2, moderate: 3, severe: 4 }
const TONE = {
  healthy: { bar: 'bg-bright', chip: 'bg-bright/25 text-emerald' },
  mild: { bar: 'bg-bright', chip: 'bg-bright/25 text-emerald' },
  moderate: { bar: 'bg-bloom', chip: 'bg-bloom-soft text-[#8a5a00]' },
  severe: { bar: 'bg-alert', chip: 'bg-alert/12 text-alert' },
}

function ProgressRing({ done, total }) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const ratio = total ? done / total : 0
  return (
    <svg viewBox="0 0 44 44" className="size-12 -rotate-90" aria-hidden="true">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="rgb(27 67 50 / 0.12)" strokeWidth="5" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="#2d6a4f"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - ratio)}
        className="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
  )
}

function BulletList({ items }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[0.97rem] leading-body text-charcoal/85">
          <Sprout className="mt-1 size-4 shrink-0 text-emerald" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** The structured result: severity, tabbed advice, a tick-off treatment list and a dated schedule. */
export default function Report({ report, isDemo, onRetry }) {
  const { t, lang, n } = useLocale()
  const copy = t.plantDoctor
  const r = copy.result
  const healthy = report.status === 'healthy'
  const tabIds = healthy ? ['overview', 'prevention'] : ['overview', 'treatment', 'schedule', 'prevention']
  const [tab, setTab] = useState(0)
  const [done, setDone] = useState(() => new Set())
  const [copied, setCopied] = useState(false)

  const tabs = tabIds.map((id) => ({ id, label: r.tabs[id] }))
  const active = tabIds[tab] ?? 'overview'
  const tone = TONE[report.status]
  const steps = report.treatment.organic

  const toggleStep = (index) =>
    setDone((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  const summaryText = () =>
    [
      r.copyHeader,
      `${r.plant}: ${report.plantName || '—'}`,
      `${r.diagnosis}: ${report.diagnosis}`,
      report.summary,
      steps.length ? `\n${r.organic}:\n${steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}` : '',
      report.treatment.chemical.length ? `\n${r.chemical}:\n${report.treatment.chemical.join('\n')}` : '',
      report.schedule.length ? `\n${r.tabs.schedule}:\n${report.schedule.map((row) => `${row.day}: ${row.action}`).join('\n')}` : '',
      `\n${r.disclaimer}`,
    ]
      .filter(Boolean)
      .join('\n')

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard blocked: nothing else to do */
    }
  }

  const bookLink = getCustomWhatsAppLink(fill(copy.whatsapp.diagnosis, { diagnosis: report.diagnosis }))

  return (
    <div className="animate-rise [animation-duration:0.55s]">
      {isDemo && (
        <p className="mb-4 flex items-start gap-2.5 rounded-2xl bg-bloom-soft px-4 py-3 text-[0.88rem] leading-snug text-[#6b4a05] ring-1 ring-bloom/30">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {copy.demo.banner}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {report.plantName && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/[0.07] px-3 py-1 text-sm font-semibold text-forest">
            <Sprout className="size-3.5" aria-hidden="true" />
            {report.plantName}
          </span>
        )}
        {isDemo && <span className="rounded-full bg-bloom px-3 py-1 text-xs font-bold text-charcoal">{copy.demo.tag}</span>}
      </div>

      <p className="mt-4 text-sm font-semibold text-forest/65">{r.diagnosis}</p>
      <h3 className="mt-1 text-[1.55rem] leading-snug sm:text-[1.8rem]">{report.diagnosis}</h3>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-forest/70">{r.severity}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[0.8rem] font-bold ${tone.chip}`}>{r.status[report.status]}</span>
          </div>
          <div role="img" aria-label={`${r.severity}: ${r.status[report.status]}`} className="flex gap-1.5">
            {[1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`h-2.5 flex-1 rounded-full transition-colors duration-500 ${level <= LEVEL[report.status] ? tone.bar : 'bg-forest/10'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-end sm:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-sm font-semibold text-forest ring-1 ring-forest/10">
            <span
              className={`size-2.5 rounded-full ${report.confidence === 'high' ? 'bg-emerald' : report.confidence === 'medium' ? 'bg-bloom' : 'bg-alert'}`}
            />
            {r.confidence[report.confidence]}
          </span>
        </div>
      </div>

      {report.needsExpert && (
        <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-alert/10 px-4 py-3 text-[0.92rem] font-medium leading-snug text-alert">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {r.expertNote}
        </p>
      )}

      <Tabs tabs={tabs} value={tab} onChange={setTab} label={copy.eyebrow} idPrefix="report" className="mt-6" scroll />

      <div
        id="report-panel"
        role="tabpanel"
        aria-labelledby={`report-tab-${tab}`}
        key={active}
        className="mt-5 animate-rise [animation-duration:0.4s]"
      >
        {active === 'overview' && (
          <div className="grid gap-5">
            {healthy && <p className="rounded-2xl bg-bright/20 px-4 py-3 text-[0.95rem] font-medium text-emerald">{r.healthyNote}</p>}
            <p className="text-base leading-body text-charcoal/85">{report.summary}</p>
            {report.causes.length > 0 && (
              <div>
                <h4 className="mb-2.5 text-base">{r.causes}</h4>
                <BulletList items={report.causes} />
              </div>
            )}
            {report.urgency && !healthy && (
              <p className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 text-[0.95rem] font-semibold text-forest ring-1 ring-forest/10">
                <Clock className="size-4 text-emerald" aria-hidden="true" />
                {r.urgency}: {report.urgency}
              </p>
            )}
          </div>
        )}

        {active === 'treatment' && (
          <div className="grid gap-6">
            {steps.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h4 className="text-base">{r.organic}</h4>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest/70" aria-live="polite">
                    {fill(r.progress, { done: n(done.size), total: n(steps.length) })}
                    <ProgressRing done={done.size} total={steps.length} />
                  </span>
                </div>
                <ul className="grid gap-2">
                  {steps.map((step, index) => {
                    const checked = done.has(index)
                    return (
                      <li key={step}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleStep(index)}
                          className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-200 ${
                            checked ? 'bg-bright/20' : 'bg-white/75 hover:bg-white'
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                              checked ? 'border-emerald bg-emerald text-white' : 'border-forest/30 bg-white'
                            }`}
                          >
                            {checked && <Check className="size-3.5" strokeWidth={3.5} aria-hidden="true" />}
                          </span>
                          <span className={`text-[0.97rem] leading-body ${checked ? 'text-charcoal/55 line-through' : 'text-charcoal/90'}`}>{step}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {report.treatment.chemical.length > 0 && (
              <div className="rounded-2xl bg-bloom-soft p-4 ring-1 ring-bloom/30">
                <h4 className="mb-2.5 flex items-center gap-2 text-base text-[#6b4a05]">
                  <FlaskConical className="size-4" aria-hidden="true" />
                  {r.chemical}
                </h4>
                <ul className="grid gap-2 text-[0.93rem] leading-body text-[#6b4a05]">
                  {report.treatment.chemical.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <TriangleAlert className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.treatment.tools.length > 0 && (
              <div>
                <h4 className="mb-2.5 text-base">{r.tools}</h4>
                <ul className="flex flex-wrap gap-2">
                  {report.treatment.tools.map((tool) => (
                    <li key={tool} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-forest ring-1 ring-forest/10">
                      <Wrench className="size-3.5 text-emerald" aria-hidden="true" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {active === 'schedule' && (
          <ol className="relative grid gap-4 pl-1">
            <span aria-hidden="true" className="absolute bottom-3 left-[1.15rem] top-3 w-0.5 bg-linear-to-b from-emerald/60 to-bright/20" />
            {report.schedule.map((row) => (
              <li key={`${row.day}-${row.action}`} className="relative flex items-start gap-4">
                <span className="relative z-10 mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-forest text-white shadow-soft">
                  <Clock className="size-4" aria-hidden="true" />
                </span>
                <div className="rounded-2xl bg-white/75 px-4 py-2.5">
                  <p className="text-sm font-bold text-emerald">{row.day}</p>
                  <p className="mt-0.5 text-[0.95rem] leading-body text-charcoal/85">{row.action}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {active === 'prevention' && <BulletList items={report.prevention} />}
      </div>

      <div className="mt-7 flex flex-wrap gap-2.5 border-t border-dashed border-forest/20 pt-5">
        <Button href={bookLink} variant={report.needsExpert ? 'sun' : 'primary'} icon={Stethoscope}>
          {copy.actions.book}
        </Button>
        <Button variant="glass" icon={copied ? Check : Copy} onClick={copySummary} aria-live="polite">
          {copied ? copy.actions.copied : copy.actions.copy}
        </Button>
        <Button variant="outline" icon={RotateCcw} onClick={onRetry}>
          {copy.actions.retry}
        </Button>
      </div>

      <p lang={lang} className="mt-5 flex items-start gap-2 text-[0.8rem] leading-snug text-charcoal/60">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {r.disclaimer}
      </p>
    </div>
  )
}
