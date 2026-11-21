import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { teamPhoto } from '../../lib/teamPhotos'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { Container } from '../ui/Section'

export default function About() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const founderPhoto = teamPhoto('amir-ali')

  return (
    <section id="about" className="relative isolate py-20 sm:py-28 lg:py-36 bg-[#FCFCFA] border-b border-stone-200">
      {/* Fallback anchor for older links */}
      <span id="atelier" className="sr-only" />

      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-5 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#2d6a4f]" />
            <span className="font-sutonny font-bold text-sm tracking-wider uppercase text-[#1b4332]">
              {isBn ? 'আমাদের কথা ও বিজ্ঞান' : 'ABOUT & BOTANICAL SCIENCE'}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
            [DAE CERTIFIED · EST. 2018]
          </span>
        </div>

        {/* 2-Column Split: Portrait & Credo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 5 COLS: Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-3xl bg-stone-100 border-2 border-stone-300 shadow-lg">
              {founderPhoto ? (
                <img
                  src={founderPhoto}
                  alt={isBn ? 'জনাব আমির আলী — প্রধান কৃষি পরামর্শক' : 'Mr. Amir Ali — Founder & Chief Agronomist'}
                  className="h-full w-full object-cover contrast-105"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-stone-600 font-mono text-xs">
                  AMIR ALI · FOUNDER
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-stone-300 shadow-md text-stone-900">
                <strong className="block font-sutonny text-base sm:text-lg font-bold text-[#1b4332]">
                  {isBn ? 'জনাব আমির আলী' : 'Mr. Amir Ali'}
                </strong>
                <span className="text-xs sm:text-sm font-semibold text-stone-700 block mt-0.5">
                  {isBn ? 'সাবেক উপসহকারী কৃষি কর্মকর্তা (ডিএই), কৃষি মন্ত্রণালয়' : 'Former Sub-Assistant Agriculture Officer, DAE'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: The Architectural & Scientific Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-sutonny text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b4332] leading-[1.15]">
              {isBn ? (
                <>
                  মাটির বিজ্ঞান ও প্রকৌশল ছাড়া <br />
                  <span className="text-[#2d6a4f]">স্থায়ী ল্যান্ডস্কেপ ও ছাদবাগান অসম্ভব।</span>
                </>
              ) : (
                <>
                  Landscapes fail without <br />
                  <span className="text-[#2d6a4f]">the science of living soil.</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-stone-800 font-normal leading-relaxed">
              <p>
                {isBn
                  ? 'ধানসিঁড়ি গার্ডেন কেবল সাধারণ নার্সারি বা মালি সার্ভিস নয়। এটি কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) মাঠপর্যায়ের দীর্ঘ গবেষণালব্ধ অভিজ্ঞতা এবং আধুনিক বহিরাঙ্গন স্থাপত্যের একটি সমন্বিত প্রতিষ্ঠান। গৃহিণীদের সাধের ছাদবাগান থেকে শুরু করে কর্পোরেট ও ভিলা এস্টেটের জন্য আমরা নিশ্চিত করি বিজ্ঞানসম্মত পুষ্টি ও নান্দনিক সবুজ।'
                  : 'Dhanshiri Garden operates at the intersection of civil architectural planning and field-proven agronomy. Founded by Mr. Amir Ali after decades of service in the Department of Agricultural Extension (DAE), our mission is to eliminate amateur guesswork in exterior design.'}
              </p>
              <p>
                {isBn
                  ? 'একটি ছাদবাগান নির্মাণের আগে আমরা স্ল্যাবের ডেড-লোড বিশ্লেষণ করি, মাটির ওজনের বিকল্প হিসেবে লাইটওয়েট পারলাইট-কোকোপিট মিডিয়া প্রেসক্রাইব করি এবং ১০০% লিকপ্রুফ সুরক্ষার নিশ্চয়তা প্রদান করি। এর ফলে ছাদে কোনো পানি জমে ড্যাম হয় না।'
                  : 'Every rooftop project begins with structural dead-load calculus, custom-formulated lightweight substrates, and multi-tier waterproofing membranes engineered specifically for Bangladesh’s harsh monsoon conditions.'}
              </p>
            </div>

            {/* 4 Pillars Addressing Housewife, Architect & Nature Needs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-stone-200">
              <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                <span className="font-mono text-xs font-bold text-[#2d6a4f] block">০১ / লোড বিজ্ঞান ও হালকা মাটি</span>
                <strong className="block font-sutonny text-sm sm:text-base font-bold text-[#1b4332] mt-0.5">
                  {isBn ? '৬০% হালকা পটিং মিডিয়া' : '60% Lighter Media'}
                </strong>
                <span className="text-xs text-stone-700 mt-1 block">
                  {isBn ? 'স্ল্যাবে অতিরিক্ত চাপ সৃষ্টি করে না' : 'Eliminates structural fatigue'}
                </span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                <span className="font-mono text-xs font-bold text-[#2d6a4f] block">০২ / ১০০% লিকপ্রুফ সুরক্ষা</span>
                <strong className="block font-sutonny text-sm sm:text-base font-bold text-[#1b4332] mt-0.5">
                  {isBn ? '৭-স্তর ড্রেনেজ মেমব্রেন' : '7-Layer Membrane'}
                </strong>
                <span className="text-xs text-stone-700 mt-1 block">
                  {isBn ? 'আজীবন ছাদ থাকবে ড্যাম ও লিকেজমুক্ত' : 'Zero slab percolation'}
                </span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                <span className="font-mono text-xs font-bold text-[#2d6a4f] block">০৩ / নিজস্ব নার্সারি সরবরাহ</span>
                <strong className="block font-sutonny text-sm sm:text-base font-bold text-[#1b4332] mt-0.5">
                  {isBn ? 'নওগাঁ ফার্মের তাজা চারা' : 'Own Agronomy Farm'}
                </strong>
                <span className="text-xs text-stone-700 mt-1 block">
                  {isBn ? 'মধ্যস্বত্বভোগী ছাড়া সাশ্রয়ী মূল্যে চারা' : 'Direct farm-acclimatized stock'}
                </span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                <span className="font-mono text-xs font-bold text-[#2d6a4f] block">০৪ / জীববৈচিত্র্য ও ফ্লোরা-ফনা</span>
                <strong className="block font-sutonny text-sm sm:text-base font-bold text-[#1b4332] mt-0.5">
                  {isBn ? 'পাখি ও প্রজাপতির অভয়ারণ্য' : 'Pollinator Habitat'}
                </strong>
                <span className="text-xs text-stone-700 mt-1 block">
                  {isBn ? 'সুগন্ধি ফুল ও ফলদ গাছে সবুজ প্রাঙ্গণ' : 'Fragrant native flora & fruit'}
                </span>
              </div>
            </div>

            {/* Inquire Action */}
            <div className="pt-2">
              <a
                href={getWhatsAppLink('আসসালামু আলাইকুম, আমি প্রধান কৃষিবিদ জনাব আমির আলীর সাথে ল্যান্ডস্কেপ/ছাদবাগান সংক্রান্ত পরামর্শ করতে চাই।', null, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#2d6a4f] transition shadow-xs"
              >
                <span>{isBn ? 'প্রধান কৃষিবিদের সাথে হোয়াটসঅ্যাপে পরামর্শ করুন' : 'Consult Chief Agronomist on WhatsApp'}</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
