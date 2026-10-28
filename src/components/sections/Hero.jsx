import { Compass, Droplets, MapPin, ShieldCheck, Sparkles, Sun, Thermometer } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { Container } from '../ui/Section'
import InteractiveCard3D from '../dynamic/InteractiveCard3D'

export default function Hero() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()
  const copy = t.hero

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* Background Video with Glassmorphic Gradient Overlay & Diffuse Glowing Orbs */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover filter blur-[6px] opacity-25 scale-105 pointer-events-none transition-opacity duration-1000"
        >
          <source src="/hero-garden.webm" type="video/webm" />
        </video>
        {/* Soft Vignette and Ambient Mesh Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream" />
        <div className="absolute inset-0 mesh-glow opacity-60" />
      </div>

      {/* Floating Background Glass Spheres / Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-8rem] top-24 -z-10 size-96 rounded-full bg-emerald/20 blur-3xl animate-float" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8rem] top-48 -z-10 size-96 rounded-full bg-bloom/20 blur-3xl animate-float-slow" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Copy Column with Glassmorphic Card Accents */}
          <div className="lg:col-span-7">
            {/* Discipline Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full glass-pill px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
              <span className="size-2 rounded-full bg-emerald animate-pulse" />
              <span>DAE AGRONOMY · LANDSCAPE ARCHITECTURE · DHAKA & NAOGAON</span>
            </div>

            {/* Headline with Glass Tone */}
            <h1 className="mt-5 font-display text-[clamp(2.2rem,4.8vw,3.8rem)] font-extrabold tracking-tight text-forest leading-[1.12]">
              {copy.titleBefore}
              <span className="relative inline-block text-emerald">
                {copy.titleHighlight}
                <span className="absolute inset-x-0 -bottom-1 h-3 -z-10 rounded-full bg-bright/35 blur-xs" />
              </span>
              {copy.titleAfter}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/85 sm:text-lg">
              {copy.sub}
            </p>

            {/* Glass Credentials Banner */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl glass-card px-4 py-3 text-xs font-medium text-forest">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald" />
                <span className="font-semibold">{copy.founderLine}</span>
              </div>
              <span className="hidden sm:inline text-forest/30">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-emerald" />
                <span>{copy.chipReply}</span>
              </div>
            </div>

            {/* Glassmorphic Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={getWhatsAppLink(null, null, lang)}
                size="lg"
                variant="primary"
                className="text-sm font-bold uppercase tracking-wider shadow-lift"
              >
                {copy.ctaPrimary}
              </Button>

              <Button
                href="#/studio"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/studio')
                }}
                size="lg"
                variant="glass"
                className="text-sm font-bold uppercase tracking-wider"
              >
                <Compass className="size-4 text-emerald" />
                <span>{copy.exploreStudio}</span>
              </Button>
            </div>
          </div>

          {/* RIGHT: Floating Frosted 3D Glass Showcase Card */}
          <div className="lg:col-span-5">
            <InteractiveCard3D
              maxTilt={6}
              glare={true}
              className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl glass-panel p-3.5 shadow-lift border border-white/80"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-mint">
                <Img photo={photos.rooftopTerrace} width={1000} sizes="(min-width: 1024px) 38vw, 90vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
                
                {/* Floating Glass Tag inside the photo */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 text-[0.7rem] font-bold uppercase text-white shadow-soft">
                    <Sparkles className="size-3 text-bloom" />
                    <span>ENGINEERED ROOFTOP</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <strong className="block font-display text-lg font-bold">
                    {lang === 'bn' ? 'শতভাগ ওয়াটারপ্রুফ আরবান ছাদবাগান' : '100% Leakproof Urban Rooftop Sanctuary'}
                  </strong>
                  <p className="mt-1 text-xs text-white/85">
                    {lang === 'bn' ? 'নিখুঁত ড্রেনেজ ও হালকা ওজনের গ্রোয়িং মিডিয়া সমৃদ্ধ' : 'Engineered with drainage cells and lightweight organic media'}
                  </p>
                </div>
              </div>
            </InteractiveCard3D>
          </div>
        </div>

        {/* INTEGRATED BANGLADESH CLIMATE & AGRONOMY BAROMETER — FROSTED GLASS BAR */}
        <div className="mt-12 rounded-2xl glass-card p-4 sm:p-5 shadow-soft border border-white/70">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Location & Season */}
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl glass-pill text-lg shadow-xs">
                🌾
              </span>
              <div>
                <span className="text-[0.68rem] uppercase font-bold tracking-wider text-forest/70 block">
                  {lang === 'bn' ? 'বাংলাদেশ কৃষি আবহাওয়া বুলেটিন' : 'Bangladesh Agronomy Barometer'}
                </span>
                <strong className="text-forest text-sm font-display">
                  {lang === 'bn' ? 'বর্তমান ঋতু: হেমন্ত কাল (কার্তিক-অগ্রহায়ণ)' : 'Season: Late Autumn (Hemanto)'}
                </strong>
              </div>
            </div>

            {/* Live Metrics */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-charcoal/90">
              <div className="flex items-center gap-2 rounded-xl glass-pill px-3 py-1.5">
                <Thermometer className="size-4 text-amber-600" />
                <span className="font-semibold">২৮° সে. (মাঝারি রোদ)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl glass-pill px-3 py-1.5">
                <Droplets className="size-4 text-sky-600" />
                <span className="font-semibold">{lang === 'bn' ? 'সেচ: সকাল ৮টার আগে' : 'Irrigation: Before 8 AM'}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl glass-pill px-3 py-1.5">
                <Sun className="size-4 text-yellow-600" />
                <span className="font-semibold">৭.৫ ঘণ্টা সূর্যালোক</span>
              </div>
            </div>

            {/* Agronomist Advisory */}
            <div className="w-full lg:w-auto border-t lg:border-t-0 border-forest/10 pt-2 lg:pt-0">
              <span className="inline-flex items-center gap-2 text-emerald font-semibold text-xs rounded-full glass-pill px-3.5 py-1.5">
                <ShieldCheck className="size-4" />
                <span>{lang === 'bn' ? 'পরামর্শ: ছাদবাগানে ফলদ গাছে ভার্মিকম্পোস্ট প্রয়োগের আদর্শ সময়।' : 'Advisory: Ideal window for organic fruit tree fertilization.'}</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
