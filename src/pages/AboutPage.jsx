import { ArrowLeft, Award, ChevronRight, Info, Leaf, ShieldCheck } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import About from '../components/sections/About'
import Stats from '../components/sections/Stats'
import { Container } from '../components/ui/Section'
import Button from '../components/ui/Button'
import { getWhatsAppLink } from '../lib/whatsapp'

export default function AboutPage() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()

  const values = [
    {
      icon: Leaf,
      title: lang === 'bn' ? 'বিজ্ঞানভিত্তিক জৈব কৃষি' : 'Science-First Organics',
      desc: lang === 'bn'
        ? 'মাটির মাইক্রোবায়াল স্বাস্থ্য ও কেঁচো কম্পোস্টের মাধ্যমে প্রাকৃতিক ভারসাম্য বজায় রাখা। ক্ষতিকর রাসায়নিক সারের পরিবর্তে জৈব পদ্ধতির অগ্রাধিকার।'
        : 'Prioritizing living soil microbiome, worm castings, and bio-fertilizers over synthetic chemicals for sustainable, perennial plant vitality.',
    },
    {
      icon: ShieldCheck,
      title: lang === 'bn' ? 'কাঠামোগত স্থায়িত্ব ও নিরাপত্তা' : 'Structural Safety',
      desc: lang === 'bn'
        ? 'ছাদের বিম ও কলামের বহনক্ষমতা হিসাব করে লোড ডিস্ট্রিবিউশন এবং ৩-লেয়ার ড্রেইনেজ ম্যাটের নিশ্চয়তা।'
        : 'Rigorous engineering with 3-layer drainage cells preventing dead load buildup and shielding building concrete from water damage.',
    },
    {
      icon: Award,
      title: lang === 'bn' ? 'ডিএই সনদপ্রাপ্ত দক্ষতা' : 'DAE-Certified Expertise',
      desc: lang === 'bn'
        ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) সনদপ্রাপ্ত কৃষিবিদ আমির আলীর ২৫+ বছরের মাঠপর্যায়ের অভিজ্ঞতা ও সরাসরি তত্ত্বাবধান।'
        : 'Led by certified horticulturist Mr. Amir Ali with over 25 years of field experience in Barind and urban microclimates.',
    },
  ]

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero & Breadcrumb */}
        <section className="relative isolate overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{t.nav.about}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-12 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Info className="size-4 text-emerald" />
                {lang === 'bn' ? 'ধানসিঁড়ি গার্ডেনের গল্প ও দর্শন' : 'Our Story, Agronomic Philosophy & Leadership'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {lang === 'bn' ? 'প্রকৃতি ও বিজ্ঞানের মেলবন্ধন' : 'Bridging Nature with Agronomic Science'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {lang === 'bn'
                  ? 'ধানসিঁড়ি গার্ডেন কেবল একটি ল্যান্ডস্কেপিং প্রতিষ্ঠান নয় — এটি ২৫ বছরের বেশি সময় ধরে বাংলাদেশের আবহাওয়া ও মাটির উপযোগী জীবন্ত বাস্তুতন্ত্র গড়ার এক প্রতিশ্রুতি।'
                  : 'For over 25 years, Dhanshiri Garden has pioneered resilient urban microclimates, rooftop orchards, and carpet lawns across Bangladesh.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Credentials & Authority Stats */}
        <Stats />

        {/* Founder & Team Story */}
        <About />

        {/* Core Values / Philosophy */}
        <section className="relative isolate overflow-hidden py-16">
          <Container>
            <div className="rounded-3xl glass-card p-8 sm:p-12 border border-white/80 shadow-soft">
              <div className="max-w-2xl text-center mx-auto mb-10">
                <span className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                  <ShieldCheck className="size-4 text-emerald" />
                  {lang === 'bn' ? 'আমাদের মূল স্তম্ভ' : 'Guiding Principles'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                  {lang === 'bn' ? 'কেন ধানসিঁড়ি গার্ডেন স্বতন্ত্র?' : 'The Dhanshiri Distinction'}
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {values.map((v) => {
                  const Icon = v.icon
                  return (
                    <div key={v.title} className="rounded-2xl glass-panel p-6 border border-white/85 shadow-soft">
                      <span className="grid size-10 place-items-center rounded-xl glass-emerald text-white mb-4">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-forest">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{v.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 flex justify-center">
                <Button href={getWhatsAppLink(null, null, lang)} variant="primary" size="lg">
                  {lang === 'bn' ? 'কৃষিবিদের সাথে পরামর্শ করুন' : 'Consult With Our Agronomist'}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
