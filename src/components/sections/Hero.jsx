import { ArrowUpRight } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import Img from '../ui/Img'
import { Container } from '../ui/Section'

export default function Hero() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative isolate pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 bg-[#FCFCFA]">
      <Container>
        {/* Monospace Atelier Label */}
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-emerald" />
          <span className="font-mono text-[0.68rem] tracking-[0.25em] uppercase text-charcoal/60">
            {isBn ? 'ধানসিঁড়ি অ্যাটেলিয়ার · ল্যান্ডস্কেপ আর্কিটেকচার' : 'DHANSHIRI ATELIER · ARCHITECTURAL LANDSCAPES'}
          </span>
        </div>

        {/* Swiss Architectural Headline with Massive Whitespace */}
        <div className="mt-8 max-w-5xl">
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light tracking-[-0.035em] text-forest leading-[1.04] text-balance">
            {isBn ? (
              <>
                জীবন্ত স্থাপত্য। <br className="hidden sm:inline" />
                <span className="font-normal text-emerald">প্রকৃতির সুষম রূপায়ন।</span>
              </>
            ) : (
              <>
                Living Architecture. <br className="hidden sm:inline" />
                <span className="font-normal text-emerald">Sculpted by Nature.</span>
              </>
            )}
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-xl text-charcoal/70 font-light leading-relaxed">
            {isBn
              ? 'আবাসিক এস্টেট, শতভাগ লিকপ্রুফ ছাদবাগান ও প্রাকৃতিক সিলেট স্টোন হার্ডস্কেপ—কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) বৈজ্ঞানিক এগ্রোনমি ও আধুনিক বহিরাঙ্গন স্থাপত্যের মেলবন্ধন।'
              : 'Bespoke estate grounds, zero-leakage rooftop sanctuaries, and natural Sylhet stone hardscapes engineered under certified agricultural science.'}
          </p>

          {/* Minimalist Action Controls */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-xs sm:text-sm font-medium text-white hover:bg-forest/90 transition-all shadow-xs tracking-wide"
            >
              <span>{isBn ? 'প্রকল্প আলোচনা শুরু করুন' : 'Commission a Project'}</span>
              <ArrowUpRight className="size-4" />
            </a>

            <a
              href="#works"
              onClick={(e) => scrollToSection(e, 'works')}
              className="text-xs sm:text-sm font-medium text-charcoal/75 hover:text-forest transition-colors tracking-wide"
            >
              {isBn ? 'নির্বাচিত কাজসমূহ দেখুন ↓' : 'Explore Selected Works ↓'}
            </a>
          </div>
        </div>

        {/* Architectural Monograph Photography Frame */}
        <div className="mt-16 sm:mt-24">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-black/[0.06]">
            <Img
              photo={photos.rooftopTerrace}
              width={1600}
              priority
              sizes="100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Architectural Coordinates & Spec Metadata */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-2 pointer-events-none">
              <div>
                <span className="font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] uppercase text-emerald-300 block">
                  SELECTED WORK · 01 / GULSHAN-2, DHAKA
                </span>
                <strong className="font-display text-base sm:text-xl font-medium tracking-tight block mt-0.5">
                  {isBn ? 'আরবান রুফটপ স্যাঙ্কচুয়ারি ও টেরেস লাউঞ্জ' : 'Urban Rooftop Sanctuary & Teak Pergola'}
                </strong>
              </div>
              <div className="font-mono text-[0.62rem] sm:text-[0.68rem] tracking-wider text-white/80">
                <span>2,800 SQ FT · 7-LAYER WATERPROOFING · 100% LEAKPROOF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Understated 3-Metric Footnote */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-black/[0.06] pt-8 text-xs sm:text-sm text-charcoal/70">
          <div>
            <strong className="block font-display text-2xl font-normal text-forest">100%</strong>
            <span className="mt-1 block text-charcoal/60">{isBn ? 'স্ল্যাব ওয়াটারপ্রুফিং নিশ্চয়তা' : 'Zero-leak slab guarantee'}</span>
          </div>
          <div>
            <strong className="block font-display text-2xl font-normal text-forest">150+</strong>
            <span className="mt-1 block text-charcoal/60">{isBn ? 'বাস্তবায়িত ল্যান্ডস্কেপ ও এস্টেট' : 'Designed estates & terraces'}</span>
          </div>
          <div>
            <strong className="block font-display text-2xl font-normal text-forest">DAE</strong>
            <span className="mt-1 block text-charcoal/60">{isBn ? 'সনদপ্রাপ্ত কৃষিবিদ ও মৃত্তিকা বিজ্ঞান' : 'Certified agronomy oversight'}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
