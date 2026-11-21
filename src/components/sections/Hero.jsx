import { useState, useEffect, useCallback } from 'react'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { photos } from '../../data/images'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Img from '../ui/Img'
import { Container } from '../ui/Section'

const SLIDES = [
  {
    id: 1,
    photo: photos.rooftopTerrace,
    tag: { bn: 'ছাদবাগান ও স্কাই টেরেস', en: 'Rooftop & Sky Terrace' },
    title: {
      bn: '১০০% লিকপ্রুফ আরবান রুফটপ গার্ডেন ও স্কাই টেরেস',
      en: '100% Leakproof Urban Rooftop Garden & Sky Terrace',
    },
    meta: {
      bn: 'গুলশান-২, ঢাকা · ২,৮০০ বর্গফুট · ৭-স্তর ওয়াটারপ্রুফিং · হালকা আগ্নেয় মিডিয়া',
      en: 'Gulshan-2, Dhaka · 2,800 Sq Ft · 7-Layer Waterproofing · Lightweight Substrate',
    },
  },
  {
    id: 2,
    photo: photos.sunnyPath,
    tag: { bn: 'ল্যান্ডস্কেপ ওয়াকওয়ে ও বাগানপথ', en: 'Landscape Walkway & Pathway' },
    title: {
      bn: 'প্রাকৃতিক সিলেট স্যান্ডস্টোন ও ফুল-গাছে ঘেরা ইন্টারলকিং বাগানপথ',
      en: 'Natural Sylhet Sandstone & Floral Interlocking Garden Walkway',
    },
    meta: {
      bn: 'পূর্বাচল ভিলা এস্টেট · ৪,৫০০ বর্গফুট · নন-স্লিপ সারফেস · দেশীয় সুগন্ধি ফুল',
      en: 'Purbachal Villa Estate · 4,500 Sq Ft · Non-Slip Surface · Native Fragrant Flora',
    },
  },
  {
    id: 3,
    photo: photos.mowerClose,
    tag: { bn: 'ভেলভেট কার্পেট ঘাস ও লন', en: 'Velvet Turf & Precision Lawn' },
    title: {
      bn: 'প্রিমিয়াম বারমুডা ও কোরিয়ান ভেলভেট কার্পেট ঘাসের লন',
      en: 'Premium Bermuda & Korean Velvet Carpet Grass Lawn',
    },
    meta: {
      bn: 'ধানমন্ডি ও উত্তরা রেসিডেন্স · ১২,০০০ বর্গফুট · নওগাঁ ফার্মের তাজা সোড · লেজার লেভেলিং',
      en: 'Dhanmondi & Uttara · 12,000 Sq Ft · Naogaon Farm Fresh Sod · Laser Leveled',
    },
  },
  {
    id: 4,
    photo: photos.greenWall,
    tag: { bn: 'বায়োফিলিক লিভিং গ্রিন ওয়াল', en: 'Biophilic Living Green Wall' },
    title: {
      bn: 'বায়োফিলিক ভার্টিক্যাল গার্ডেন ও জীবন্ত সবুজ দেয়াল',
      en: 'Biophilic Vertical Living Green Wall System',
    },
    meta: {
      bn: 'তেজগাঁও কর্পোরেট হেডকোয়ার্টার্স · ৮৫০ বর্গফুট · অটোমেটেড ড্রিপ সেচ · বাতাস পরিশোধনকারী উদ্ভিদ',
      en: 'Tejgaon Corporate HQ · 850 Sq Ft · Automated Drip Irrigation · Air-Purifying Species',
    },
  },
  {
    id: 5,
    photo: photos.palmSteps,
    tag: { bn: 'রিসোর্ট ও এস্টেট গ্রাউন্ডস', en: 'Resort & Estate Grounds' },
    title: {
      bn: 'অভিজাত প্রাইভেট ফার্মহাউস ও রিসোর্ট ল্যান্ডস্কেপিং',
      en: 'Luxury Private Farmhouse & Resort Landscape Architecture',
    },
    meta: {
      bn: 'গাজীপুর ফার্মহাউস · ১.৫ একর · রাজকীয় পাম ও ওয়াটার গার্ডেন · টার্নকি মাস্টারপ্ল্যান',
      en: 'Gazipur Farmhouse · 1.5 Acres · Royal Palms & Water Garden · Turnkey Masterplan',
    },
  },
]

export default function Hero() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const current = SLIDES[activeSlide]

  return (
    <section className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 bg-[#FDFBF7]">
      <Container>
        {/* Top Assurance Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-4 py-1.5 shadow-2xs">
          <span className="size-2 rounded-full bg-[#2d6a4f] animate-pulse" />
          <span className="font-sutonny font-bold text-xs sm:text-sm tracking-wide text-[#1b4332]">
            {isBn
              ? 'ধানসিঁড়ি গার্ডেন · ঢাকা ও নওগাঁয় নির্ভরযোগ্য ল্যান্ডস্কেপ ও ছাদবাগান সেবা'
              : 'DHANSHIRI GARDEN · ARCHITECTURAL LANDSCAPES & LIVING BOTANY'}
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="mt-6 max-w-5xl">
          <h1 className="font-sutonny text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1b4332] leading-[1.12] text-balance">
            {isBn ? (
              <>
                প্রকৃতি ও আধুনিক স্থাপত্যের সমন্বয়ে <br className="hidden sm:inline" />
                <span className="text-[#2d6a4f]">আপনার আঙিনায় জীবন্ত সবুজ।</span>
              </>
            ) : (
              <>
                Harmonizing Nature & Modern Architecture. <br className="hidden sm:inline" />
                <span className="text-[#2d6a4f]">Living Botanical Landscapes.</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-3xl text-base sm:text-xl text-stone-800 font-medium leading-relaxed">
            {isBn
              ? 'আবাসিক ছাদবাগান, প্রাইভেট ভিলা এস্টেট ও কার্পেট ঘাসের লন—কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) সাবেক কর্মকর্তার বিজ্ঞানসম্মত নির্দেশনায় ১০০% লিকপ্রুফ ওয়াটারপ্রুফিং (7-Layer Waterproofing), হালকা পুষ্টিকর মাটি ও স্বয়ংক্রিয় ড্রিপ সেচ সহ নির্ভরযোগ্য টার্নকি সমাধান।'
              : 'Bespoke rooftop sanctuaries, estate grounds, and velvet turf lawns engineered under certified agronomy with 100% leakproof waterproofing, ultra-lightweight soil, and automated drip irrigation.'}
          </p>

          {/* 3 Core Client Assurances (Housewife, Architect & Homeowner targeted) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl">
            <div className="flex items-start gap-2.5 rounded-xl border border-stone-300/80 bg-white p-3.5 shadow-2xs">
              <ShieldCheck className="size-5 shrink-0 text-[#2d6a4f] mt-0.5" />
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-stone-900">
                  {isBn ? '১০০% লিকপ্রুফ গ্যারান্টি' : '100% Leakproof Guarantee'}
                </strong>
                <span className="text-xs text-stone-700 font-medium">
                  {isBn ? 'ছাদে এক ফোঁটাও ড্যাম হবে না' : 'Zero structural water seepage'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-stone-300/80 bg-white p-3.5 shadow-2xs">
              <Sparkles className="size-5 shrink-0 text-[#2d6a4f] mt-0.5" />
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-stone-900">
                  {isBn ? '৬০% হালকা পুষ্টিকর মাটি' : '60% Lighter Soil Media'}
                </strong>
                <span className="text-xs text-stone-700 font-medium">
                  {isBn ? 'ছাদের স্ল্যাবে অতিরিক্ত লোড পড়ে না' : 'Eliminates slab dead-load'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-stone-300/80 bg-white p-3.5 shadow-2xs">
              <span className="size-5 shrink-0 grid place-items-center rounded-full bg-[#1b4332] text-white text-[0.65rem] font-bold mt-0.5">
                ✓
              </span>
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-stone-900">
                  {isBn ? 'নওগাঁ ফার্মের তাজা চারা' : 'Fresh Farm Supply Chain'}
                </strong>
                <span className="text-xs text-stone-700 font-medium">
                  {isBn ? 'কোনো মধ্যস্বত্বভোগী ছাড়া সরবরাহ' : 'Direct from nursery to site'}
                </span>
              </div>
            </div>
          </div>

          {/* Prominent Action Deck */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={getWhatsAppLink(
                'আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেন থেকে ছাদবাগান/ল্যান্ডস্কেপ প্রকল্পের জন্য বিনামূল্যে সাইট ভিজিট ও বাজেট পরামর্শ পেতে চাই।',
                null,
                lang,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-[#2d6a4f] transition-all shadow-md hover:shadow-lg"
            >
              <span>{isBn ? 'বিনামূল্যে সাইট ভিজিট ও বাজেট পরামর্শ' : 'Free Site Visit & Budget Quote'}</span>
              <ArrowUpRight className="size-4.5" />
            </a>

            <a
              href={`tel:${site.phones[0].tel}`}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#1b4332] bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#1b4332] hover:bg-stone-50 transition shadow-2xs"
            >
              <Phone className="size-4.5 text-[#2d6a4f]" />
              <span>{isBn ? `সরাসরি ফোন: ${site.phones[0].number}` : `Call Now: ${site.phones[0].number}`}</span>
            </a>

            <a
              href="#works"
              onClick={(e) => scrollToSection(e, 'works')}
              className="text-sm sm:text-base font-bold text-stone-800 hover:text-[#1b4332] transition underline underline-offset-4 decoration-stone-400 ml-2"
            >
              {isBn ? 'আমাদের সম্পন্ন কাজসমূহ দেখুন ↓' : 'Explore Selected Works ↓'}
            </a>
          </div>
        </div>

        {/* Prominent Interactive Slideshow Frame */}
        <div
          className="mt-12 sm:mt-16 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-stone-900 border-2 border-stone-300 shadow-xl">
            {/* Active Slide Image */}
            <Img
              key={current.id}
              photo={current.photo}
              width={1600}
              priority={activeSlide === 0}
              sizes="100vw"
              className="h-full w-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

            {/* Slideshow Top Controls: Index & Pause State */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-emerald-300 border border-white/15">
                <span>{`০১ / ০${SLIDES.length}`}</span>
                <span>·</span>
                <span>{current?.tag?.[lang] || current?.tag?.bn || ''}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[0.7rem] font-mono text-stone-200 border border-white/10">
                <span>{isPaused ? '⏸ স্লাইড পজ' : '▶ অটো স্লাইড ৫ সেকেন্ড'}</span>
              </div>
            </div>

            {/* Slide Caption Overlay (High Contrast Frosted Glass) */}
            <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-3 pointer-events-none">
              <div className="max-w-2xl">
                <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-emerald-400 font-bold block mb-1">
                  {current?.tag?.[lang] || current?.tag?.bn || ''}
                </span>
                <h3 className="font-sutonny text-xl sm:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-md">
                  {current?.title?.[lang] || current?.title?.bn || ''}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-mono text-stone-200">
                  {current?.meta?.[lang] || current?.meta?.bn || ''}
                </p>
              </div>

              {/* Prev / Next Manual Navigation Buttons */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="আগের স্লাইড"
                  className="grid size-10 sm:size-12 place-items-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#1b4332] transition border border-white/20"
                >
                  <ChevronLeft className="size-5 sm:size-6" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="পরের স্লাইড"
                  className="grid size-10 sm:size-12 place-items-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#1b4332] transition border border-white/20"
                >
                  <ChevronRight className="size-5 sm:size-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Dot Indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`স্লাইড ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'w-10 bg-[#1b4332]'
                    : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 High-Contrast Trust Metrics */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t-2 border-stone-200 pt-8">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-[#1b4332]">১০০%</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-stone-900">
              {isBn ? 'লিকপ্রুফ স্ল্যাব গ্যারান্টি' : 'Zero-Leak Slab Guarantee'}
            </span>
            <span className="text-[0.72rem] text-stone-600 block mt-0.5">
              {isBn ? 'ছাদে পানি বা ড্যামপের কোনো ঝুঁকি নেই' : 'Monsoon engineered'}
            </span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-[#1b4332]">১৫০+</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-stone-900">
              {isBn ? 'সফল সম্পন্ন প্রকল্প' : 'Completed Projects'}
            </span>
            <span className="text-[0.72rem] text-stone-600 block mt-0.5">
              {isBn ? 'ঢাকা ও উত্তরাঞ্চলের প্রিমিয়াম এস্টেট' : 'Dhaka & Northern Region'}
            </span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-[#1b4332]">৩০+ বছর</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-stone-900">
              {isBn ? 'ডিএই কৃষি কর্মকর্তা দিকনির্দেশনা' : 'DAE Agronomic Leadership'}
            </span>
            <span className="text-[0.72rem] text-stone-600 block mt-0.5">
              {isBn ? 'জনাব আমির আলী (সাবেক এসএএও)' : 'Mr. Amir Ali (Ex-SAAO)'}
            </span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-[#1b4332]">৭-স্তর</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-stone-900">
              {isBn ? 'আধুনিক ড্রেনেজ ও ফিল্টার' : '7-Layer Filter System'}
            </span>
            <span className="text-[0.72rem] text-stone-600 block mt-0.5">
              {isBn ? '৩০ মিমি সেল ও জিওটেক্সটাইল' : '30mm cells & geotextile'}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
