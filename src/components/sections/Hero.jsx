import {
  ArrowRight,
  Compass,
  Droplets,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Thermometer,
  Waves,
} from 'lucide-react'
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
  const isBn = lang === 'bn'
  const { navigate } = useRouter()
  const copy = t.hero

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      {/* Subtle Luminous Background Video & Gradient Atmosphere */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover filter blur-[4px] opacity-20 scale-105 transition-opacity duration-1000"
        >
          <source src="/hero-garden.webm" type="video/webm" />
        </video>
        {/* Crisp Botanical Ground Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/70 to-cream" />
        <div className="absolute inset-0 mesh-glow opacity-40" />

        {/* Delicate Architectural Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#1b43320a_1px,transparent_1px),linear-gradient(to_bottom,#1b43320a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        />
      </div>

      {/* Floating Ambient Glow Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 -z-10 size-[32rem] rounded-full bg-emerald/15 blur-3xl animate-float" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-48 -z-10 size-[32rem] rounded-full bg-bloom/15 blur-3xl animate-float-slow" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Architectural Typography & Action Center */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Atelier Heritage & Geolocation Eyebrow */}
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full glass-pill px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-forest border border-forest/10 shadow-xs">
              <span className="flex size-2 rounded-full bg-emerald animate-pulse" />
              <span>DHANSHIRI ATELIER · EST. 2018</span>
              <span className="text-forest/30">|</span>
              <span className="text-emerald">DHAKA [23°48&apos;N] &amp; NAOGAON [24°48&apos;N]</span>
            </div>

            {/* Commanding Editorial Headline */}
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5.2vw,4.2rem)] font-extrabold tracking-tight text-forest leading-[1.08] text-balance">
              {isBn ? (
                <>
                  প্রকৃতির সাথে বাসস্থান —{' '}
                  <span className="relative inline-block text-emerald italic font-serif font-normal">
                    জীবন্ত স্থাপত্য
                    <span className="absolute inset-x-0 -bottom-1 h-3 -z-10 rounded-full bg-bright/25 blur-xs" />
                  </span>
                  {' '}ও নান্দনিক নিসর্গ।
                </>
              ) : (
                <>
                  Architectural Landscapes &amp;{' '}
                  <span className="relative inline-block text-emerald italic font-serif font-normal">
                    Living Sanctuaries
                    <span className="absolute inset-x-0 -bottom-1 h-3 -z-10 rounded-full bg-bright/25 blur-xs" />
                  </span>
                  {' '}Engineered with Precision.
                </>
              )}
            </h1>

            {/* Refined Subtitle */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-charcoal/80 font-normal">
              {isBn
                ? 'কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) মাঠপর্যায়ের বৈজ্ঞানিক প্রটোকল এবং আধুনিক স্থাপত্যশিল্পের সমন্বয়। আবাসিক এস্টেট, শতভাগ ওয়াটারপ্রুফ ছাদবাগান, কার্পেট লন, সিলেট স্যান্ডস্টোন হার্ডস্কেপ ও ৭০০+ জাতের অ্যাক্লিমেটাইজড নার্সারি।'
                : 'DAE-certified agronomy unified with contemporary landscape architecture. Engineering 100% leak-proof urban rooftops, velvet carpet lawns, natural Sylhet sandstone hardscapes, and a verified 700+ specimen botanical nursery.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                href={getWhatsAppLink(null, null, lang)}
                size="lg"
                variant="primary"
                className="group text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lift hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{copy.ctaPrimary}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                href="/store"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/store')
                }}
                size="lg"
                variant="glass"
                className="text-xs sm:text-sm font-bold uppercase tracking-wider border border-forest/15 hover:border-emerald/40 transition-all"
              >
                <ShoppingBag className="size-4 text-emerald" />
                <span>{isBn ? '৭০০+ জাতের প্ল্যান্ট স্টোর' : 'Explore 700+ Plant Nursery'}</span>
                <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-[0.65rem] font-mono text-emerald">
                  715+
                </span>
              </Button>
            </div>

            {/* Architectural Engineering Credentials Bar */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 rounded-2xl glass-card px-3.5 py-2.5 text-xs font-semibold text-forest border border-white/70">
                <ShieldCheck className="size-4 text-emerald shrink-0" />
                <span className="line-clamp-1">{isBn ? '১০০% ওয়াটারপ্রুফ গ্যারান্টি' : '100% Leak-Proof Rooftops'}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl glass-card px-3.5 py-2.5 text-xs font-semibold text-forest border border-white/70">
                <Waves className="size-4 text-bright shrink-0" />
                <span className="line-clamp-1">{isBn ? 'স্বয়ংক্রিয় ড্রিপ ও স্প্রিংকলার' : 'Precision Micro-Irrigation'}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl glass-card px-3.5 py-2.5 text-xs font-semibold text-forest border border-white/70">
                <Layers className="size-4 text-bloom shrink-0" />
                <span className="line-clamp-1">{isBn ? 'সিলেট স্যান্ডস্টোন পেভার্স' : 'Sylhet Stone Hardscapes'}</span>
              </div>
            </div>

            {/* Founder Authority Footnote */}
            <p className="mt-4 text-xs font-medium text-forest/70 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald" />
              <span>{copy.founderLine}</span>
            </p>
          </div>

          {/* RIGHT: Layered Architectural Visual Monograph */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Main Architectural Showcase Frame */}
              <InteractiveCard3D
                maxTilt={5}
                glare={true}
                className="relative aspect-[4/4.6] sm:aspect-[4/4.4] w-full overflow-hidden rounded-3xl glass-panel p-3 shadow-lift border border-white/80 ring-1 ring-forest/5"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-mint">
                  <Img photo={photos.rooftopTerrace} width={1200} sizes="(min-width: 1024px) 42vw, 92vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />

                  {/* Architectural Blueprint Spec Stamp */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full glass-surface px-3 py-1 text-[0.68rem] font-mono font-bold tracking-widest uppercase text-white shadow-soft">
                      <Compass className="size-3 text-bright" />
                      <span>SPEC 418 · GULSHAN TERRACE</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-forest/80 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-mono font-bold text-white">
                      100% LEAKPROOF
                    </span>
                  </div>

                  {/* Bottom Architectural Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[0.65rem] font-mono uppercase tracking-widest text-bright block">
                      {isBn ? 'স্বাক্ষরিত ল্যান্ডস্কেপ প্রকল্প' : 'SIGNATURE ARCHITECTURAL LANDSCAPE'}
                    </span>
                    <strong className="block font-display text-lg sm:text-xl font-bold leading-tight mt-0.5">
                      {isBn ? 'আরবান রুফটপ স্যাঙ্কচুয়ারি ও টেরেস' : 'Urban Rooftop Sanctuary & Lounge'}
                    </strong>
                    <p className="mt-1 text-xs text-white/80 line-clamp-2">
                      {isBn
                        ? 'মাল্টি-লেয়ার রুট-ব্যারিয়ার মেমব্রেন, পারলাইট-ভার্মিকম্পোস্ট গ্রোয়িং মিডিয়া এবং ড্রিপ ইরিগেশন।'
                        : 'Sub-slab drainage cells, lightweight volcanic substrate, and root-zone micro-drip networks.'}
                    </p>
                  </div>
                </div>
              </InteractiveCard3D>

              {/* Floating Overlapping Botanical Specimen Inset (Bottom Left) */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 z-20 max-w-[260px] sm:max-w-[280px] rounded-2xl glass-panel p-3 shadow-lift border border-white/90 backdrop-blur-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-mint border border-forest/10">
                    <Img photo={photos.eggBoxSeedlings} width={200} />
                  </div>
                  <div>
                    <span className="text-[0.62rem] font-mono font-bold uppercase tracking-wider text-emerald block">
                      {isBn ? 'নার্সারি কালেকশন' : 'BOTANICAL NURSERY'}
                    </span>
                    <strong className="text-forest text-xs font-bold block leading-tight font-display">
                      {isBn ? '৭০০+ অ্যাক্লিমেটাইজড চারা' : '715+ Acclimatized Plants'}
                    </strong>
                    <span className="text-[0.65rem] text-charcoal/70 block mt-0.5">
                      {isBn ? '৮", ১০", ১/২ ব্যাগ সাইজ প্রস্তুত' : '8", 10", 1/2 Bag sizes in stock'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/store')}
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-forest/90 py-1.5 text-[0.68rem] font-bold text-white hover:bg-forest transition"
                >
                  <ShoppingBag className="size-3 text-bright" />
                  <span>{isBn ? 'প্ল্যান্ট স্টোর দেখুন' : 'Explore Catalog'}</span>
                  <span className="text-[0.6rem]">→</span>
                </button>
              </div>

              {/* Floating Overlapping Micro-Irrigation Capsule (Top Right) */}
              <div className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 z-20 rounded-2xl glass-surface px-3.5 py-2 shadow-lift border border-white/90 backdrop-blur-xl animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-xl bg-emerald text-white shadow-xs">
                    <Droplets className="size-3.5 animate-pulse" />
                  </span>
                  <div>
                    <span className="text-[0.6rem] font-mono font-extrabold tracking-widest text-emerald uppercase block">
                      SMART IRRIGATION
                    </span>
                    <strong className="text-forest text-xs font-bold block">
                      {isBn ? 'স্বয়ংক্রিয় সেচ সক্রিয়' : 'Root-Zone Micro-Pulse'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTEGRATED BANGLADESH AGRONOMY & CLIMATE BAROMETER — MINIMALIST ARCHITECTURAL STRIP */}
        <div className="mt-16 rounded-3xl glass-card p-4 sm:p-5 shadow-soft border border-white/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
            {/* Col 1: Season & Bulletin */}
            <div className="md:col-span-4 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl glass-pill text-xl shadow-xs">
                🌾
              </span>
              <div>
                <span className="text-[0.65rem] uppercase font-mono font-bold tracking-wider text-forest/70 block">
                  {isBn ? 'বাংলাদেশ কৃষি আবহাওয়া বুলেটিন' : 'Bangladesh Agronomy Barometer'}
                </span>
                <strong className="text-forest text-xs sm:text-sm font-display font-bold">
                  {isBn ? 'বর্তমান ঋতু: হেমন্ত কাল (কার্তিক-অগ্রহায়ণ)' : 'Current Season: Late Autumn (Hemanto)'}
                </strong>
              </div>
            </div>

            {/* Col 2: Climate Metrics */}
            <div className="md:col-span-5 flex flex-wrap items-center gap-2 sm:gap-4 text-charcoal/90">
              <div className="flex items-center gap-1.5 rounded-xl glass-pill px-3 py-1.5 text-xs font-medium">
                <Thermometer className="size-3.5 text-amber-600" />
                <span>{isBn ? '২৮° সে. (মাঝারি রোদ)' : '28°C (Moderate Sun)'}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl glass-pill px-3 py-1.5 text-xs font-medium">
                <Droplets className="size-3.5 text-sky-600" />
                <span>{isBn ? 'সেচ: সকাল ৮টার আগে' : 'Water: Pre-8 AM'}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl glass-pill px-3 py-1.5 text-xs font-medium">
                <Sun className="size-3.5 text-yellow-600" />
                <span>{isBn ? '৭.৫ ঘণ্টা সূর্যালোক' : '7.5h Sunlight'}</span>
              </div>
            </div>

            {/* Col 3: Nursery Dispatch Alert */}
            <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-forest/10 pt-2 md:pt-0 md:pl-4">
              <div className="flex items-center gap-2 text-forest text-xs">
                <span className="size-2 rounded-full bg-emerald animate-pulse shrink-0" />
                <span className="font-semibold text-[0.72rem] leading-snug">
                  {isBn ? 'নওগাঁ ও ঢাকা হাব থেকে দৈনিক চারা ডেলিভারি চালু' : 'Daily Plant Dispatch across Dhaka & Hubs'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

