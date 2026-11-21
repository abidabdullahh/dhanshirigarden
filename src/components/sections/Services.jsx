import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Img from '../ui/Img'
import { Container } from '../ui/Section'

const DISCIPLINES = [
  {
    number: '০১',
    id: 'rooftop',
    title: {
      bn: 'জিরো-লিক রুফটপ গার্ডেন ও স্কাই টেরেস',
      en: 'Zero-Leak Rooftop Sanctuaries & Sky Terraces',
    },
    subtitle: {
      bn: '১০০% ওয়াটারপ্রুফ মেমব্রেন, সাধারণ মাটির চেয়ে ৬০% হালকা গ্রোয়িং মিডিয়া এবং কাঠামোগত ভারসাম্য',
      en: '100% leak-proof elastomeric barriers, lightweight volcanic media, and structural dead-load management',
    },
    photo: 'rooftopTerrace',
    specs: {
      bn: [
        '৭-স্তর ইলাস্টোমেরিক মেমব্রেন ও ৩০ মিমি ড্রেনেজ সেল (ছাদে এক ফোঁটাও পানি জমবে না)',
        'সাধারণ মাটির চেয়ে ৬০% হালকা ভার্মিকম্পোস্ট ও কোকোপিট সুষম পটিং মিডিয়া',
        'ভারী বর্ষাতেও দ্রুত পানি নিষ্কাশনের আধুনিক ড্রেনেজ পাইপ নেটওয়ার্ক',
      ],
      en: [
        '7-layer elastomeric waterproofing & 30mm drain cells (zero leakage guarantee)',
        'Engineered growing substrate 60% lighter than natural clay to protect slabs',
        'Monsoon storm-water gravity evacuation networks',
      ],
    },
    scope: 'গুলশান · বনানী · ধানমন্ডি · উত্তরা',
  },
  {
    number: '০২',
    id: 'estate',
    title: {
      bn: 'প্রাইভেট ভিলা এস্টেট ও ফার্মহাউস ল্যান্ডস্কেপিং',
      en: 'Private Estate & Villa Landscape Architecture',
    },
    subtitle: {
      bn: 'সাইট টপোগ্রাফি সার্ভে, ক্যাড মাস্টারপ্ল্যান ও দেশীয় ফলদ-সুগন্ধি বৃক্ষ পরিকল্পনা',
      en: 'Topographical surveying, CAD masterplanning, and mature botanical zoning',
    },
    photo: 'gardenPath',
    specs: {
      bn: [
        'সম্পূর্ণ সাইটের নিখুঁত থ্রি-ডি ডিজাইন ও পরিমাপকৃত মাস্টারপ্ল্যান',
        'পরিবেশ-উপযোগী দেশীয় ছায়াদার ও কলম ফলদ বৃক্ষ নির্বাচন (কামিনী, বকুল, আম, পেয়ারা)',
        'রাতের নান্দনিক আলোকসজ্জা ও বাগানপথের সাথে সমন্বিত ওয়াকওয়ে ডিজাইন',
      ],
      en: [
        'Detailed 3D CAD site master plans and elevation projections',
        'Curated native specimen trees and exotic border flora',
        'Integrated ambient lighting and illuminated stone pathways',
      ],
    },
    scope: 'পূর্বাচল · গাজীপুর · সাভার · সিলেট',
  },
  {
    number: '০৩',
    id: 'hardscape',
    title: {
      bn: 'সিলেট নদীর স্যান্ডস্টোন পেভার্স ও কাঠের পারগোলা',
      en: 'Sylhet River Sandstone & Structural Hardscapes',
    },
    subtitle: {
      bn: 'প্রাকৃতিক পাথুরে বাগানপথ, নন-স্লিপ পেভার্স ও চিটাগাং সেগুন কাঠের বসার গেজেবো',
      en: 'Locally quarried natural stone walkways, non-slip turf joints, and seasoned teak pavilions',
    },
    photo: 'palmSteps',
    specs: {
      bn: [
        'জাফলং ও বিছনাকান্দির প্রাকৃতিক স্যান্ডস্টোন ও গ্রানাইট পেভার্স',
        'বৃষ্টির দিনেও পা পিছলে না যাওয়ার মতো খাঁজকাটা নন-স্লিপ সারফেস',
        'আবহাওয়া-সহনশীল কিলন-ড্রাইড চিটাগাং সেগুন কাঠের গেজেবো ও লাউঞ্জ',
      ],
      en: [
        'Authentic natural sandstone and flamed granite pavers',
        'Non-slip textured surface with permeable turf joints',
        'Marine-finished Chittagong teak pergolas and lounges',
      ],
    },
    scope: 'আউটডোর লাউঞ্জ · প্যাটিও · সুইমিংপুল ডেক',
  },
  {
    number: '০৪',
    id: 'lawn',
    title: {
      bn: 'গল্ফ-গ্রেড বারমুডা ও কোরিয়ান ভেলভেট কার্পেট লন',
      en: 'Golf-Grade Velvet Turf & Precision Lawn Carpeting',
    },
    subtitle: {
      bn: 'লেজার লেভেলিং, আগাছামুক্ত খামারের সোড এবং দ্রুত শিকড় বিস্তারের বিজ্ঞান',
      en: 'Laser grading, weed-free farm sod, and gravel sub-base irrigation',
    },
    photo: 'mowerClose',
    specs: {
      bn: [
        'নওগাঁ রিসার্চ ফার্ম থেকে সরাসরি উত্তোলনকৃত সতেজ ও আগাছামুক্ত সোড',
        'ফুটবল ও বাচ্চাদের খেলার উপযোগী ঘন সবুজ কোমল গালিচা ঘাস',
        'মাটির ক্ষয়রোধ ও দ্রুত শিকড় মাটির সাথে জোড়া লাগার আধুনিক রোলার টেকনিক',
      ],
      en: [
        'Freshly harvested weed-free sod from our Naogaon nursery',
        'Deep emerald velvet density built for heavy foot-traffic',
        'Scientific soil conditioning for rapid 7-day root locking',
      ],
    },
    scope: 'রেসিডেন্সিয়াল লন · রিসোর্ট · ফ্যাক্টরি প্রাঙ্গণ',
  },
  {
    number: '০৫',
    id: 'vertical',
    title: {
      bn: 'বায়োফিলিক লিভিং গ্রিন ওয়াল ও ভার্টিক্যাল গার্ডেন',
      en: 'Biophilic Living Green Walls & Facades',
    },
    subtitle: {
      bn: 'সেলফ-ওয়াটারিং ড্রিপ ম্যাট্রিক্স, শব্দ নিরোধক ও বাতাস পরিশোধনকারী উদ্ভিদ',
      en: 'Self-watering modular hydro-matrix, acoustic baffling, and air-purifying foliage',
    },
    photo: 'greenWall',
    specs: {
      bn: [
        'স্বয়ংক্রিয় ড্রিপ লাইনে সংযুক্ত আধুনিক উলম্ব পকেট কাঠামো',
        'বাতাসের ক্ষতিকর টক্সিন ও ধুলাবালি শোষণকারী ইনডোর ও ব্যালকনি উদ্ভিদ',
        'কম ফ্লোর স্পেসে সর্বাধিক সবুজের অনুভূতির সৃষ্টি (ফ্লোর পরিষ্কার থাকে)',
      ],
      en: [
        'Automated internal micro-irrigation manifold',
        'Species matched to ambient lux levels and indoor airflow',
        'Maximum foliage density with zero floor space intrusion',
      ],
    },
    scope: 'কর্পোরেট অফিস · ব্যালকনি · ড্রয়িংরুম ওয়াল',
  },
  {
    number: '০৬',
    id: 'irrigation',
    title: {
      bn: 'ওয়েদার-সিঙ্কড স্মার্ট সেচ ও নিয়মিত বাগান পরিচর্যা',
      en: 'Smart Micro-Irrigation & Garden Maintenance',
    },
    subtitle: {
      bn: 'ডিজিটাল টাইমার নিয়ন্ত্রিত ড্রিপ সেচ ও অভিজ্ঞ মালির নিয়মিত তত্ত্বাবধান',
      en: 'Digital cloud-synced micro-drip networks and DAE certified agronomic stewardship',
    },
    photo: 'wateringGarden',
    specs: {
      bn: [
        'বাসায় কেউ না থাকলেও নির্দিষ্ট সময়ে গাছে পানি দেওয়ার অটোমেটিক সিস্টেম',
        '৬৫% পানি অপচয় রোধকারী প্রেসার ড্রিপার নোজল',
        'নিয়মিত অভিজ্ঞ মালির ভিজিট, গাছের রোগ নির্ণয় ও জৈব ভিটামিন স্প্রে (এএমসি)',
      ],
      en: [
        'Automatic scheduled watering even when homeowners are traveling',
        'Pressure-compensating emitters saving up to 65% water',
        'Turnkey horticultural stewardship and pest protection contracts',
      ],
    },
    scope: 'সাপ্তাহিক কেয়ার · মাসিক প্যাকেজ · অটোমেশন',
  },
]

export default function Services() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [activeTab, setActiveTab] = useState(0)

  const activeItem = DISCIPLINES[activeTab]

  return (
    <section id="services" className="relative isolate py-20 sm:py-28 lg:py-36 bg-white border-b border-stone-200">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-5 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#2d6a4f]" />
            <span className="font-sutonny font-bold text-sm tracking-wider uppercase text-[#1b4332]">
              {isBn ? 'সেবাসমূহ ও স্থাপত্য শৃঙ্খলা' : 'SERVICES & DISCIPLINES'}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
            [০১ — ০৬ সেবাসমূহ]
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <h2 className="font-sutonny text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b4332] leading-[1.15]">
            {isBn ? (
              <>
                আবাসিক ও প্রাতিষ্ঠানিক বহিরাঙ্গনের জন্য <br />
                <span className="text-[#2d6a4f]">৬টি বিশেষায়িত ল্যান্ডস্কেপ সেবা।</span>
              </>
            ) : (
              <>
                Engineered for longevity. <br />
                <span className="text-[#2d6a4f]">Six architectural disciplines.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
            {isBn
              ? 'আমরা কেবল সাধারণ চারা রোপণ করি না; কাঠামোগত নিরাপত্তা, শতভাগ লিকপ্রুফ ওয়াটারপ্রুফিং ও দীর্ঘস্থায়ী মাটির বিজ্ঞানের সমন্বয়ে আপনার প্রাঙ্গণকে গড়ে তুলি এক টুকরো জীবন্ত অভয়ারণ্য।'
              : 'Beyond standard gardening: every project is executed as a rigorous civil, agronomic, and spatial architectural intervention.'}
          </p>
        </div>

        {/* Interactive Discipline Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT 5 COLS: High Contrast Tab List */}
          <div className="lg:col-span-5 space-y-2">
            {DISCIPLINES.map((item, idx) => {
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group flex w-full items-center justify-between p-4 sm:p-5 rounded-2xl border-2 text-left transition-all ${
                    isActive
                      ? 'border-[#1b4332] bg-emerald-50/70 shadow-sm text-[#1b4332]'
                      : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`font-mono text-sm sm:text-base font-bold ${isActive ? 'text-[#2d6a4f]' : 'text-stone-500'}`}>
                      {item.number}
                    </span>
                    <span className="font-sutonny text-base sm:text-lg font-bold tracking-tight">
                      {item.title?.[lang] || item.title?.bn || ''}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold transition-transform ${
                      isActive ? 'text-[#1b4332] translate-x-1' : 'text-stone-400'
                    }`}
                  >
                    →
                  </span>
                </button>
              )
            })}
          </div>

          {/* RIGHT 7 COLS: Active Discipline Showcase */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-stone-300 bg-white p-6 sm:p-8 lg:p-10 shadow-lg">
              {/* Photo Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 mb-8">
                <Img
                  key={activeItem?.id}
                  photo={photos[activeItem?.photo]}
                  width={1200}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1b4332] text-white px-3 py-1 rounded-full text-xs font-mono font-bold">
                  {activeItem?.scope}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#2d6a4f]">
                  <span>{activeItem?.number}</span>
                  <span>/</span>
                  <span className="uppercase">{activeItem?.scope}</span>
                </div>
                <h3 className="font-sutonny text-2xl sm:text-3xl font-bold text-[#1b4332] leading-snug">
                  {activeItem?.title?.[lang] || activeItem?.title?.bn || ''}
                </h3>
                <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
                  {activeItem?.subtitle?.[lang] || activeItem?.subtitle?.bn || ''}
                </p>
              </div>

              {/* 3 Detailed Checkpoints */}
              <div className="mt-6 pt-6 border-t-2 border-stone-200 space-y-3.5">
                {(activeItem?.specs?.[lang] || activeItem?.specs?.bn || []).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-[#1b4332] mt-0.5">
                      <Check className="size-3.5 stroke-[2.5]" />
                    </span>
                    <span className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={getWhatsAppLink(
                    `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেন থেকে "${activeItem?.title?.bn || activeItem?.title?.en || ''}" সেবা সম্পর্কে বিস্তারিত ও কোটেশন জানতে আগ্রহী।`,
                    null,
                    lang,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#2d6a4f] transition shadow-xs"
                >
                  <span>{isBn ? 'এই সেবার ফ্রি কোটেশন ও সাইট ভিজিট' : 'Get Free Quote on WhatsApp'}</span>
                  <ArrowUpRight className="size-4" />
                </a>

                <span className="font-mono text-xs font-bold text-[#2d6a4f]">
                  {isBn ? '১০০% লিকপ্রুফ ওয়ারেন্টি' : '100% Leakproof Warranty'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
