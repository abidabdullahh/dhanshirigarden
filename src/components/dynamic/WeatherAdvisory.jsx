import { useState } from 'react'
import { CloudSun, Droplets, MessageCircle, ShieldCheck, Sparkles, Sun, Thermometer } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle } from '../ui/Doodles'
import { Container } from '../ui/Section'
import InteractiveCard3D from './InteractiveCard3D'

export default function WeatherAdvisory() {
  const { t, lang } = useLocale()
  const copy = t.weatherAdvisory
  const [activeMetric, setActiveMetric] = useState(null)

  const metrics = [
    {
      id: 'temp',
      label: copy.tempLabel,
      val: copy.tempVal,
      icon: Thermometer,
      accent: 'text-amber-600 bg-amber-500/15 border-amber-500/30',
      hint: lang === 'bn' ? 'দুপুরের রোদে ছাদবাগান অতিরিক্ত গরম হতে পারে।' : 'Moderate warmth; ideal for photosynthesis without heat stress.',
    },
    {
      id: 'sun',
      label: copy.sunLabel,
      val: copy.sunVal,
      icon: Sun,
      accent: 'text-yellow-600 bg-yellow-500/15 border-yellow-500/30',
      hint: lang === 'bn' ? 'গাছে ফুল ও ফল আসার জন্য আদর্শ সূর্যালোক।' : 'Optimum direct sunlight hours for fruit tree flower induction.',
    },
    {
      id: 'water',
      label: copy.waterLabel,
      val: copy.waterVal,
      icon: Droplets,
      accent: 'text-sky-600 bg-sky-500/15 border-sky-500/30',
      hint: lang === 'bn' ? 'সকাল ৮টার মধ্যে জল দেওয়া শেষ করুন।' : 'Irrigate early morning to prevent evaporative fungal build-up.',
    },
    {
      id: 'pest',
      label: copy.pestLabel,
      val: copy.pestVal,
      icon: ShieldCheck,
      accent: 'text-emerald bg-bright/20 border-bright/35',
      hint: lang === 'bn' ? 'সাদা মাছি রোধে প্রতি সপ্তাহে নিমের তেল স্প্রে।' : 'Prevent whiteflies with weekly organic neem oil emulsion.',
    },
  ]

  const whatsappLink = getWhatsAppLink(
    lang === 'bn'
      ? 'আসসালামু আলাইকুম, আমি ধানসিঁড়ি ওয়েবসাইটের আজকের কৃষি বুলেটিন দেখে আমার বাগানের পরিচর্যা সম্পর্কে পরামর্শ চাই।'
      : 'Hello Mr. Amir Ali, I would like expert advice on today’s garden advisory for my rooftop.',
    null,
    lang
  )

  return (
    <div className="relative py-8">
      <Container>
        <InteractiveCard3D
          maxTilt={4}
          className="rounded-[2.5rem] glass-card p-6 shadow-lift ring-1 ring-bright/30 sm:p-8 lg:p-10"
        >
          {/* Top header strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest text-white shadow-soft">
                <CloudSun className="size-6 animate-pulse-soft text-bloom" />
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest/70">
                  <Sparkles className="size-3.5 text-bloom" />
                  {copy.eyebrow}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-forest">{copy.seasonTitle}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full glass-green px-4 py-1.5 text-xs font-semibold text-forest">
              <span className="size-2 rounded-full bg-emerald animate-ping" />
              <span>{copy.verifiedNote}</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {metrics.map((m) => {
              const Icon = m.icon
              const isSelected = activeMetric === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMetric(isSelected ? null : m.id)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition duration-300 ${
                    isSelected ? 'ring-2 ring-forest bg-mint/40 shadow-soft' : 'glass-white hover:bg-white/90'
                  } ${m.accent}`}
                >
                  <div className="flex w-full items-center justify-between">
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-[0.72rem] font-medium opacity-75">{m.label}</span>
                  </div>
                  <strong className="mt-3 font-display text-lg sm:text-xl font-bold text-forest">{m.val}</strong>
                  <span className="mt-1 text-[0.78rem] leading-tight text-charcoal/70">{m.hint}</span>
                </button>
              )
            })}
          </div>

          {/* Advisory banner from Amir Ali */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-forest/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ring-1 ring-forest/10">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-emerald text-white">
                <LeafDoodle className="size-5" />
              </div>
              <div>
                <strong className="block font-display text-sm font-bold text-forest">{copy.tipHeading}</strong>
                <p className="mt-0.5 text-sm leading-relaxed text-charcoal/80">{copy.tipText}</p>
              </div>
            </div>

            <Button
              href={whatsappLink}
              size="sm"
              icon={MessageCircle}
              className="shrink-0 self-start sm:self-auto"
            >
              {copy.consultAgronomist}
            </Button>
          </div>
        </InteractiveCard3D>
      </Container>
    </div>
  )
}
