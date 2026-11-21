import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Img from '../ui/Img'
import { Container } from '../ui/Section'

const DISCIPLINES = [
  {
    number: '01',
    id: 'rooftop',
    title: {
      bn: 'জিরো-লিক রুফটপ স্যাঙ্কচুয়ারি ও টেরেস',
      en: 'Zero-Leak Rooftop Sanctuaries & Sky Terraces',
    },
    subtitle: {
      bn: '১০০% ওয়াটারপ্রুফ মেমব্রেন, লাইটওয়েট আগ্নেয় গ্রোয়িং মিডিয়া এবং কাঠামোগত ভারসাম্য',
      en: '100% leak-proof elastomeric barriers, lightweight volcanic media, and structural dead-load management',
    },
    photo: 'rooftopTerrace',
    specs: {
      bn: ['৭-লেয়ার ইলাস্টোমেরিক মেমব্রেন ও ৩০ মিমি ড্রেন সেল', 'সাধারণ মাটির চেয়ে ৬০% হালকা বিশেষ গ্রোয়িং মিডিয়া', 'মৌসুমি বর্ষার নিখুঁত গ্র্যাভিটি ড্রেনেজ চ্যানেল'],
      en: ['7-layer elastomeric waterproofing & 30mm drain cells', 'Engineered substrate 60% lighter than natural clay', 'Monsoon storm-water gravity evacuation networks'],
    },
    scope: 'GULSHAN · BANANI · UTTARA',
  },
  {
    number: '02',
    id: 'estate',
    title: {
      bn: 'প্রাইভেট এস্টেট ও ভিলা ল্যান্ডস্কেপিং',
      en: 'Private Estate & Villa Landscape Architecture',
    },
    subtitle: {
      bn: 'সাইট টপোগ্রাফি, সূর্যরশ্মি ট্র্যাকিং ও দীর্ঘমেয়াদী বোটানিক্যাল মাস্টারপ্ল্যান',
      en: 'Topographical surveying, solar azimuth analysis, and mature botanical zoning',
    },
    photo: 'gardenPath',
    specs: {
      bn: ['সম্পূর্ণ সাইটের পরিমাপকৃত থ্রি-ডি ড্রয়িং ও মাস্টারপ্ল্যান', 'পরিবেশ-উপযোগী অ্যাক্লিমেটাইজড ছায়াদার ও ফলদ বৃক্ষ নির্বাচন', 'আলোকসজ্জা ও ওয়াকওয়ের সাথে সমন্বিত ডিজাইন'],
      en: ['3D CAD site plans and elevation elevations', 'Curated specimen trees and exotic border flora', 'Integrated ambient illumination and pathway design'],
    },
    scope: 'RESIDENTIAL · RESORTS · RETREATS',
  },
  {
    number: '03',
    id: 'hardscape',
    title: {
      bn: 'সিলেট রিভার স্যান্ডস্টোন ও কাঠামোগত পারগোলা',
      en: 'Sylhet River Sandstone & Structural Hardscapes',
    },
    subtitle: {
      bn: 'প্রাকৃতিক পাথুরে বাগানপথ, ড্রেনেজ স্টেপিং পেভার্স ও কিলন-ড্রাইড সেগুন পারগোলা',
      en: 'Locally quarried natural stone walkways, non-slip turf joints, and seasoned teak pavilions',
    },
    photo: 'palmSteps',
    specs: {
      bn: ['জাফলং ও বিছনাকান্দির প্রাকৃতিক স্যান্ডস্টোন ও গ্রানাইট', 'বৃষ্টিতেও অ্যান্টি-স্লিপ সারফেস ও গ্রাস ইন্টারলকিং', 'আবহাওয়া-সহনশীল চিটাগাং সেগুন কাঠের বসার গেজেবো'],
      en: ['Authentic natural sandstone and flamed granite pavers', 'Non-slip textured surface with permeable turf joints', 'Marine-finished Chittagong teak pergolas and lounges'],
    },
    scope: 'EXTERIOR LIVING · PATIOS',
  },
  {
    number: '04',
    id: 'lawn',
    title: {
      bn: 'গল্ফ-গ্রেড বারমুডা ও কোরিয়ান ভেলভেট কার্পেট লন',
      en: 'Golf-Grade Velvet Turf & Precision Lawn Carpeting',
    },
    subtitle: {
      bn: 'লেজার লেভেলিং, আগাছামুক্ত সোড এবং ডিপ-রুট ড্রেনেজ সাব-বেস',
      en: 'Laser grading, weed-free farm sod, and gravel sub-base irrigation',
    },
    photo: 'mowerClose',
    specs: {
      bn: ['নওগাঁ রিসার্চ ফার্ম থেকে সরাসরি সরবরাহকৃত তাজা সোড', 'উচ্চ ফুট-ট্রাফিক সহনশীল ও অতি মসৃণ সবুজ গালিচা', 'মাটির ক্ষয়রোধ ও দ্রুত শিকড় বিস্তারের বিজ্ঞানসম্মত পরিচর্যা'],
      en: ['Freshly harvested weed-free sod from our Naogaon nursery', 'Deep emerald velvet density built for heavy foot-traffic', 'Scientific soil conditioning for rapid 7-day root locking'],
    },
    scope: 'ESTATE LAWNS · CAMPUSES',
  },
  {
    number: '05',
    id: 'vertical',
    title: {
      bn: 'বায়োফিলিক লিভিং গ্রিন ওয়াল ও ভার্টিক্যাল ফ্যাসাড',
      en: 'Biophilic Living Green Walls & Facades',
    },
    subtitle: {
      bn: 'সেলফ-ওয়াটারিং হাইড্রো-ম্যাট্রিক্স, শব্দ নিরোধক ও বাতাস পরিশোধনকারী উদ্ভিদ',
      en: 'Self-watering modular hydro-matrix, acoustic baffling, and air-purifying foliage',
    },
    photo: 'greenWall',
    specs: {
      bn: ['স্বয়ংক্রিয় ড্রিপ লাইনে সংযুক্ত আধুনিক উলম্ব কাঠামো', 'অন্দর ও বহিরাঙ্গনের আলোর তীব্রতা অনুযায়ী উপযোগী গাছ', 'ন্যূনতম ফ্লোর স্পেসে সর্বাধিক সবুজের অনুভূতির সৃষ্টি'],
      en: ['Automated internal micro-irrigation manifold', 'Species matched to ambient lux levels and indoor airflow', 'Maximum foliage density with zero floor space intrusion'],
    },
    scope: 'CORPORATE HQ · FOYERS · VILLA FACADES',
  },
  {
    number: '06',
    id: 'irrigation',
    title: {
      bn: 'ওয়েদার-সিঙ্কড স্মার্ট সেচ ও এস্টেট পরিচর্যা',
      en: 'Weather-Synced Micro-Irrigation & Stewardship',
    },
    subtitle: {
      bn: 'ডিজিটাল ক্লাউড সেন্সর নিয়ন্ত্রিত ড্রিপ নেটওয়ার্ক ও ডিএই কৃষিবিদের তত্ত্বাবধান',
      en: 'Digital cloud-synced micro-drip networks and DAE certified agronomic stewardship',
    },
    photo: 'wateringGarden',
    specs: {
      bn: ['৬৫% পানি অপচয় রোধকারী প্রেসার-কম্পেনসেটিং ড্রিপার', 'বৃষ্টি হলে স্বয়ংক্রিয়ভাবে পানি দেওয়া বন্ধ রাখার সেন্সর', 'বাৎসরিক এগ্রোনমি পরিচর্যা ও মাটি শোধন (এএমসি)'],
      en: ['Pressure-compensating emitters saving up to 65% water', 'Smart rain sensors that automatically pause during precipitation', 'Turnkey horticultural stewardship contracts (AMC)'],
    },
    scope: 'AUTOMATION · STEWARDSHIP',
  },
]

export default function Services() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [activeTab, setActiveTab] = useState(0)

  const activeItem = DISCIPLINES[activeTab]

  return (
    <section id="services" className="relative isolate py-28 sm:py-36 lg:py-48 bg-white border-b border-black/[0.06]">
      <Container>
        {/* Section Monospace Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal/60">
              {isBn ? 'স্থাপত্য সেবাসমূহ' : 'ARCHITECTURAL DISCIPLINES'}
            </span>
          </div>
          <span className="font-mono text-xs text-charcoal/40">
            [01 — 06]
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <h2 className="font-display text-3xl sm:text-5xl font-light tracking-[-0.03em] text-forest leading-[1.1]">
            {isBn ? (
              <>
                আবাসিক ও প্রাতিষ্ঠানিক বহিরাঙ্গনের <br />
                <span className="text-emerald font-normal">৬টি বিশেষায়িত স্থাপত্য শৃঙ্খলা।</span>
              </>
            ) : (
              <>
                Engineered for longevity. <br />
                <span className="text-emerald font-normal">Six architectural disciplines.</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-charcoal/70 font-light leading-relaxed">
            {isBn
              ? 'আমরা নিছক গাছ রোপণ করি না; কাঠামোগত স্থায়িত্ব, মাটির বিজ্ঞান ও নান্দনিক জীবনযাপনের সমন্বয়ে টেকসই বহিঃপরিসর নির্মাণ করি।'
              : 'Beyond standard gardening: every project is executed as a rigorous civil, agronomic, and spatial architectural intervention.'}
          </p>
        </div>

        {/* Swiss Interactive Discipline Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT 5 COLS: Minimalist Tab List */}
          <div className="lg:col-span-5 space-y-2">
            {DISCIPLINES.map((item, idx) => {
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group flex w-full items-baseline justify-between py-5 border-b text-left transition-all ${
                    isActive
                      ? 'border-forest text-forest'
                      : 'border-black/[0.06] text-charcoal/60 hover:text-forest hover:border-black/20'
                  }`}
                >
                  <div className="flex items-baseline gap-4 pr-4">
                    <span className="font-mono text-xs tracking-wider opacity-60">
                      {item.number}
                    </span>
                    <strong className={`font-display text-lg sm:text-xl font-normal tracking-tight ${isActive ? 'text-forest' : ''}`}>
                      {item.title[lang]}
                    </strong>
                  </div>
                  <span className="font-mono text-[0.65rem] tracking-wider text-charcoal/40 uppercase hidden sm:inline">
                    {item.scope}
                  </span>
                </button>
              )
            })}
          </div>

          {/* RIGHT 7 COLS: Dedicated High-Res Monograph Card */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-neutral-50 border border-black/[0.06] p-6 sm:p-10">
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200">
                <Img
                  photo={photos[activeItem.photo]}
                  width={1000}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white">
                    {activeItem.scope}
                  </span>
                </div>
              </div>

              {/* Text & Deliverables */}
              <div className="mt-8">
                <div className="font-mono text-xs text-emerald tracking-wider uppercase mb-2">
                  DISCIPLINE {activeItem.number} / SPECIFICATION
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-forest tracking-tight">
                  {activeItem.title[lang]}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-charcoal/70 font-light leading-relaxed">
                  {activeItem.subtitle[lang]}
                </p>

                {/* Specs List */}
                <div className="mt-6 pt-6 border-t border-black/[0.06] space-y-3">
                  {activeItem.specs[lang].map((spec) => (
                    <div key={spec} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal/80">
                      <Check className="size-4 text-emerald shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="font-light">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between">
                  <a
                    href={getWhatsAppLink(`${activeItem.title[lang]} Consultation`, null, lang)}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-medium text-white hover:bg-forest/90 transition-all tracking-wide"
                  >
                    <span>{isBn ? 'এই সেবার কোটেশন নিন' : 'Inquire on WhatsApp'}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href="#contact"
                    className="text-xs text-charcoal/60 hover:text-forest transition font-medium tracking-wide"
                  >
                    {isBn ? 'সাইট ভিজিট বুক করুন' : 'Book Site Visit'} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
