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
    <section id="atelier" className="relative isolate py-28 sm:py-36 lg:py-48 bg-[#FCFCFA] border-b border-black/[0.06]">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal/60">
              {isBn ? 'অ্যাটেলিয়ার ও বিজ্ঞান' : 'THE ATELIER & AGRONOMY'}
            </span>
          </div>
          <span className="font-mono text-xs text-charcoal/40">
            [DAE CERTIFIED · EST. 2018]
          </span>
        </div>

        {/* Editorial 2-Column Split: Portrait & Credo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT 5 COLS: Restrained Minimalist Portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-2xl bg-neutral-100 border border-black/[0.08]">
              {founderPhoto ? (
                <img
                  src={founderPhoto}
                  alt={isBn ? 'জনাব আমির আলী — প্রতিষ্ঠাতা' : 'Mr. Amir Ali — Founder'}
                  className="h-full w-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-charcoal/40 font-mono text-xs">
                  AMIR ALI · FOUNDER
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-black/[0.06] text-xs">
                <strong className="block font-display font-medium text-forest">
                  {isBn ? 'জনাব আমির আলী' : 'Mr. Amir Ali'}
                </strong>
                <span className="font-mono text-[0.65rem] text-charcoal/60 block mt-0.5">
                  {isBn ? 'সাবেক উপসহকারী কৃষি কর্মকর্তা (ডিএই), কৃষি মন্ত্রণালয়' : 'Former Sub-Assistant Agriculture Officer, DAE'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: The Architectural & Scientific Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-display text-3xl sm:text-5xl font-light tracking-[-0.03em] text-forest leading-[1.12]">
              {isBn ? (
                <>
                  মাটির বিজ্ঞান ছাড়া <br />
                  <span className="text-emerald font-normal">স্থায়ী ল্যান্ডস্কেপ অসম্ভব।</span>
                </>
              ) : (
                <>
                  Landscapes fail without <br />
                  <span className="text-emerald font-normal">the science of living soil.</span>
                </>
              )}
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-charcoal/70 font-light leading-relaxed">
              <p>
                {isBn
                  ? 'ধানসিঁড়ি গার্ডেন কেবল সাধারণ নার্সারি বা মালি সার্ভিস নয়। এটি কৃষি সম্প্রসারণ অধিদপ্তরের মাঠপর্যায়ের দীর্ঘ গবেষণালব্ধ অভিজ্ঞতা এবং আধুনিক স্থাপত্যের একটি সমন্বিত অ্যাটেলিয়ার।'
                  : 'Dhanshiri Garden operates at the intersection of civil architectural planning and field-proven agronomy. Founded by Mr. Amir Ali after decades of service in the Department of Agricultural Extension (DAE), our mission is to eliminate amateur guesswork in exterior design.'}
              </p>
              <p>
                {isBn
                  ? 'একটি ছাদবাগান নির্মাণের আগে আমরা স্ল্যাবের ডেড-লোড বিশ্লেষণ করি, মাটির ওজনের বিকল্প হিসেবে লাইটওয়েট পারলাইট-কোকোপিট মিডিয়া প্রেসক্রাইব করি এবং ১০০% লিকপ্রুফ সুরক্ষার নিশ্চয়তা প্রদান করি।'
                  : 'Every rooftop project begins with structural dead-load calculus, custom-formulated lightweight volcanic substrates, and multi-tier waterproofing membranes engineered specifically for Bangladesh’s harsh monsoon conditions.'}
              </p>
            </div>

            {/* 3 Scientific Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/[0.06]">
              <div>
                <span className="font-mono text-xs text-emerald block">01 / LOAD SCIENCE</span>
                <strong className="block font-display text-sm font-medium text-forest mt-1">
                  {isBn ? '৬০% হালকা মাটি' : '60% Lighter Media'}
                </strong>
                <span className="text-xs text-charcoal/60 mt-0.5 block font-light">
                  {isBn ? 'স্ল্যাবে অতিরিক্ত চাপ পড়ে না' : 'Eliminates structural fatigue'}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-emerald block">02 / LEAKPROOF</span>
                <strong className="block font-display text-sm font-medium text-forest mt-1">
                  {isBn ? '৭-লেয়ার মেমব্রেন' : '7-Layer Membrane'}
                </strong>
                <span className="text-xs text-charcoal/60 mt-0.5 block font-light">
                  {isBn ? 'আজীবন স্ল্যাব সুরক্ষা' : 'Zero slab percolation'}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-emerald block">03 / GENETICS</span>
                <strong className="block font-display text-sm font-medium text-forest mt-1">
                  {isBn ? 'নিজস্ব নার্সারি' : 'Own Agronomy Farm'}
                </strong>
                <span className="text-xs text-charcoal/60 mt-0.5 block font-light">
                  {isBn ? 'নওগাঁয় অ্যাক্লিমেটাইজড' : 'Farm-acclimatized stock'}
                </span>
              </div>
            </div>

            {/* Inquire Action */}
            <div className="pt-4">
              <a
                href={getWhatsAppLink('Agronomic Consultation with Mr. Amir Ali', null, lang)}
                className="inline-flex items-center gap-2 text-xs font-medium text-forest hover:text-emerald transition tracking-wide"
              >
                <span>{isBn ? 'প্রধান কৃষিবিদের সাথে পরামর্শ করুন' : 'Consult Chief Agronomist on WhatsApp'}</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
