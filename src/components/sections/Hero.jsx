import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Sparkles,
  Droplets,
  Scissors,
} from 'lucide-react'
import { photos } from '../../data/images'
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

  // 3D Tilt perspective effect on mouse move
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({
      rx: -(y / (rect.height / 2)) * 4,
      ry: (x / (rect.width / 2)) * 4,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

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
    <section className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 bg-[#FCFCFA] overflow-hidden">
      {/* 3D Ambient Blur Spheres */}
      <div className="absolute top-10 left-1/4 w-[32rem] h-[32rem] bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[28rem] h-[28rem] bg-bright/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Top 3D Glass Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full glass-pill-3d px-5 py-2 shadow-md">
          <span className="size-2 rounded-full bg-bright animate-ping" />
          <span className="font-sutonny font-bold text-xs sm:text-sm tracking-wide text-forest">
            {isBn
              ? 'ধানসিঁড়ি গার্ডেন · ৩ডি আর্কিটেকচারাল ল্যান্ডস্কেপিং ও অটোমেশন'
              : 'DHANSHIRI GARDEN · 3D ARCHITECTURAL LANDSCAPES & AUTOMATION'}
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="mt-6 max-w-5xl">
          <h1 className="font-sutonny text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest leading-[1.14] text-balance">
            {isBn ? (
              <>
                প্রকৃতি ও আধুনিক স্থাপত্যের সমন্বয়ে <br className="hidden sm:inline" />
                <span className="text-emerald">আপনার আঙিনায় জীবন্ত সবুজ ও স্মার্ট অটোমেশন।</span>
              </>
            ) : (
              <>
                Harmonizing Nature & Modern Architecture. <br className="hidden sm:inline" />
                <span className="text-emerald">Living Botanical Landscapes & Smart Automation.</span>
              </>
            )}
          </h1>
          <p className="mt-5 text-base sm:text-xl font-normal text-charcoal/85 max-w-3xl leading-relaxed text-balance">
            {isBn
              ? 'ঢাকা ও নওগাঁর আবাসন, স্কাই-টেরেস ও রিসোর্টের জন্য সম্পূর্ণ লিকপ্রুফ ছাদবাগান, বারমুডা কার্পেট ঘাসের লন, হাইড্রোলিক অটোমেটেড ড্রিপ সেচ ও নার্সারি জাত চারা সরবরাহ।'
              : 'End-to-end landscape architecture across Dhaka & Naogaon: 100% leakproof rooftop gardens, golf-grade Bermuda turf, automated micro-irrigation, and 700+ acclimatized plant nursery.'}
          </p>
        </div>

        {/* Action Buttons Row with 3D Glass CTA & Engine Anchors */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl hover:bg-emerald hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 glass-specular"
          >
            <Phone className="size-4.5 text-bright" />
            <span>{isBn ? 'সরাসরি সাইট ভিজিট ও বাজেট নিন' : 'Request Site Consultation'}</span>
            <ArrowUpRight className="size-4" />
          </a>

          <a
            href="#irrigation-engine"
            onClick={(e) => scrollToSection(e, 'irrigation-engine')}
            className="inline-flex items-center gap-2 rounded-full glass-pill-3d px-5 py-4 text-xs sm:text-sm font-bold text-forest hover:bg-white hover:shadow-lg transition-all"
          >
            <Droplets className="size-4 text-cyan-600 animate-bounce" />
            <span>{isBn ? 'ইরিগেশন অটোমেশন ইঞ্জিন' : 'Irrigation Engine'}</span>
          </a>

          <a
            href="#lawn-mower-engine"
            onClick={(e) => scrollToSection(e, 'lawn-mower-engine')}
            className="inline-flex items-center gap-2 rounded-full glass-pill-3d px-5 py-4 text-xs sm:text-sm font-bold text-forest hover:bg-white hover:shadow-lg transition-all"
          >
            <Scissors className="size-4 text-bright" />
            <span>{isBn ? 'লন মওয়ার সিমুলেটর' : 'Lawn Mower Lab'}</span>
          </a>
        </div>

        {/* 3D Glassmorphic Architectural Slideshow Frame */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden glass-panel-3d p-2 sm:p-3 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
        >
          {/* Main Visual Image Viewport */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-forest/5">
            {SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Img
                  src={slide.photo}
                  alt={slide.title[lang] || slide.title.bn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>
            ))}

            {/* Floating 3D Frosted Glass Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20">
              <div className="max-w-3xl rounded-2xl glass-panel-dark-3d p-4 sm:p-6 text-white shadow-2xl border border-white/20">
                <div className="inline-flex items-center gap-2 rounded-full bg-bright/20 border border-bright/30 px-3 py-1 font-mono text-[0.68rem] sm:text-xs text-bright font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="size-3" />
                  <span>{current.tag[lang] || current.tag.bn}</span>
                </div>
                <h3 className="font-sutonny text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                  {current.title[lang] || current.title.bn}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-200 font-medium">
                  {current.meta[lang] || current.meta.bn}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full glass-panel-dark-3d flex items-center justify-center text-white hover:bg-forest/80 transition-all border border-white/20"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full glass-panel-dark-3d flex items-center justify-center text-white hover:bg-forest/80 transition-all border border-white/20"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 py-3 bg-white/40">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`স্লাইড ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'w-10 bg-forest'
                    : 'w-2.5 bg-forest/20 hover:bg-forest/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 High-Contrast 3D Glass Trust Metrics */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="rounded-2xl glass-panel-3d p-5 shadow-lg card-hover-3d">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-forest">১০০%</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-charcoal">
              {isBn ? 'লিকপ্রুফ স্ল্যাব গ্যারান্টি' : 'Zero-Leak Slab Guarantee'}
            </span>
            <span className="text-[0.72rem] text-charcoal/70 block mt-0.5">
              {isBn ? 'ছাদে পানি বা ড্যামপের কোনো ঝুঁকি নেই' : 'Monsoon engineered'}
            </span>
          </div>

          <div className="rounded-2xl glass-panel-3d p-5 shadow-lg card-hover-3d">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-forest">১৫০+</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-charcoal">
              {isBn ? 'সফল সম্পন্ন প্রকল্প' : 'Completed Projects'}
            </span>
            <span className="text-[0.72rem] text-charcoal/70 block mt-0.5">
              {isBn ? 'ঢাকা ও উত্তরাঞ্চলের প্রিমিয়াম এস্টেট' : 'Dhaka & Northern Region'}
            </span>
          </div>

          <div className="rounded-2xl glass-panel-3d p-5 shadow-lg card-hover-3d">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-forest">৩০+ বছর</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-charcoal">
              {isBn ? 'ডিএই কৃষি কর্মকর্তা দিকনির্দেশনা' : 'DAE Agronomic Leadership'}
            </span>
            <span className="text-[0.72rem] text-charcoal/70 block mt-0.5">
              {isBn ? 'জনাব আমির আলী (সাবেক এসএএও)' : 'Mr. Amir Ali (Ex-SAAO)'}
            </span>
          </div>

          <div className="rounded-2xl glass-panel-3d p-5 shadow-lg card-hover-3d">
            <strong className="block font-sutonny text-2xl sm:text-3xl font-bold text-forest">৭-স্তর</strong>
            <span className="mt-1 block text-xs sm:text-sm font-bold text-charcoal">
              {isBn ? 'আধুনিক ড্রেনেজ ও ফিল্টার' : '7-Layer Filter System'}
            </span>
            <span className="text-[0.72rem] text-charcoal/70 block mt-0.5">
              {isBn ? '৩০ মিমি সেল ও জিওটেক্সটাইল' : '30mm cells & geotextile'}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
