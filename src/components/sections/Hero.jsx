import { Compass, Droplets, MapPin, ShieldCheck, Sun, Thermometer } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { Container } from '../ui/Section'
import InteractiveCard3D from '../dynamic/InteractiveCard3D'

export default function Hero() {
  const { t, lang } = useLocale()
  const copy = t.hero

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* Background Relative Video with 20% subtle blur (~4px) & Architectural Overlay */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover filter blur-[4px] opacity-30 scale-105 pointer-events-none transition-opacity duration-1000"
        >
          <source src="/hero-garden.webm" type="video/webm" />
        </video>
        {/* Architectural Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/80 to-cream" />
        <div className="absolute inset-0 blueprint-grid opacity-20" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Swiss Architectural Copy Column */}
          <div className="lg:col-span-7">
            {/* Architectural Discipline Badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-forest/20 bg-forest/5 px-3 py-1 font-mono text-[0.72rem] font-bold tracking-widest text-forest uppercase">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
              <span>DAE AGRONOMY · LANDSCAPE ARCHITECTURE · DHAKA & NAOGAON</span>
            </div>

            {/* Clean, Commanding Swiss Headline without kitschy doodles */}
            <h1 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold tracking-tight text-forest leading-[1.12]">
              {copy.titleBefore}
              <span className="text-emerald underline decoration-bright/60 decoration-4 underline-offset-6">
                {copy.titleHighlight}
              </span>
              {copy.titleAfter}
            </h1>

            {/* Authoritative Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {copy.sub}
            </p>

            {/* Structured Credentials Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-forest/75 border-y border-forest/10 py-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald" />
                <span className="font-bold">{copy.founderLine}</span>
              </div>
              <span className="hidden sm:inline text-forest/30">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-emerald" />
                <span>{copy.chipReply}</span>
              </div>
            </div>

            {/* Sophisticated Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={getWhatsAppLink(null, null, lang)} size="lg" variant="primary" className="text-sm font-bold uppercase tracking-wider">
                {copy.ctaPrimary}
              </Button>

              <Button href="#studio" size="lg" variant="glass" className="text-sm font-bold uppercase tracking-wider">
                <Compass className="size-4 text-emerald" />
                <span>{copy.exploreStudio}</span>
              </Button>
            </div>
          </div>

          {/* RIGHT: Clean Architectural Imagery Preview */}
          <div className="lg:col-span-5">
            <InteractiveCard3D
              maxTilt={4}
              glare={false}
              className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-forest/15 bg-white p-3 shadow-lift"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-mint">
                <Img photo={photos.rooftopTerrace} width={1000} sizes="(min-width: 1024px) 38vw, 90vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-mono text-[0.68rem] tracking-widest uppercase opacity-80">
                    MASTER-PLANNED ROOFTOP
                  </span>
                  <strong className="block font-display text-lg font-bold">
                    {lang === 'bn' ? 'শতভাগ ওয়াটারপ্রুফ আরবান ছাদবাগান' : '100% Leakproof Urban Rooftop Sanctuary'}
                  </strong>
                </div>
              </div>
            </InteractiveCard3D>
          </div>
        </div>

        {/* INTEGRATED COMPACT BANGLADESH CLIMATE & AGRONOMY BAROMETER */}
        <div className="mt-12 rounded-xl border border-forest/15 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Location & Season */}
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-forest/8 text-forest font-bold">
                🌾
              </span>
              <div>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-forest/60">
                  {lang === 'bn' ? 'বাংলাদেশ কৃষি আবহাওয়া বুলেটিন' : 'Bangladesh Agronomy Barometer'}
                </span>
                <strong className="block text-forest">
                  {lang === 'bn' ? 'বর্তমান ঋতু: হেমন্ত কাল (কার্তিক-অগ্রহায়ণ)' : 'Season: Late Autumn (Hemanto)'}
                </strong>
              </div>
            </div>

            {/* Live Metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-charcoal/85">
              <div className="flex items-center gap-1.5 font-mono">
                <Thermometer className="size-3.5 text-amber-600" />
                <span>২৮° সে. (মাঝারি রোদ)</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Droplets className="size-3.5 text-sky-600" />
                <span>{lang === 'bn' ? 'সেচ: সকাল ৮টার আগে' : 'Irrigation: Before 8 AM'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Sun className="size-3.5 text-yellow-600" />
                <span>৭.৫ ঘণ্টা সূর্যালোক</span>
              </div>
            </div>

            {/* Agronomist Brief Advisory */}
            <div className="w-full lg:w-auto border-t lg:border-t-0 border-forest/10 pt-2 lg:pt-0">
              <span className="inline-flex items-center gap-1.5 text-emerald font-semibold text-[0.78rem]">
                <ShieldCheck className="size-3.5" />
                <span>{lang === 'bn' ? 'পরামর্শ: ছাদবাগানে ফলদ গাছে ভার্মিকম্পোস্ট প্রয়োগের আদর্শ সময়।' : 'Advisory: Ideal window for organic fruit tree fertilization.'}</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
