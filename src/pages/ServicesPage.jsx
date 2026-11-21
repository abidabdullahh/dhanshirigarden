import { ArrowLeft, Calculator, ChevronRight, Layers, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import CartDrawer from '../components/layout/CartDrawer'
import Services from '../components/sections/Services'
import LandscapeEstimator from '../components/sections/LandscapeEstimator'
import LandscapeTransformation from '../components/sections/LandscapeTransformation'
import LandscapeMaterials from '../components/sections/LandscapeMaterials'
import Rooftop from '../components/sections/Rooftop'
import Lawn from '../components/sections/Lawn'
import IrrigationSimulator from '../components/sections/IrrigationSimulator'
import CarePlans from '../components/sections/CarePlans'
import Button from '../components/ui/Button'
import { Container } from '../components/ui/Section'
import { site } from '../data/site'
import { getWhatsAppLink } from '../lib/whatsapp'

export default function ServicesPage() {
  const { t, lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 pb-20">
        {/* Page Hero & Breadcrumb */}
        <section className="relative isolate overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
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
                <span>{isBn ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{isBn ? 'ল্যান্ডস্কেপ সেবা' : 'Landscaping Services'}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-14 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Layers className="size-4 text-emerald" />
                {isBn ? 'আর্কিটেকচারাল ল্যান্ডস্কেপিং ও এক্সটেরিয়র ডিজাইন' : 'Architectural Landscaping & Exterior Design'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {isBn ? 'আমাদের বিশেষায়িত ল্যান্ডস্কেপ সেবাসমূহ' : 'Our Specialized Architectural Landscape Disciplines'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {isBn
                  ? 'ছাদবাগান, কার্পেট ঘাসের লন, সিলেট স্যান্ডস্টোন ওয়াকওয়ে, স্মার্ট ড্রিপ সেচ ও বায়োফিলিক গ্রিন ওয়াল — প্রতিটি প্রকল্প ডিএই সনদপ্রাপ্ত কৃষিবিদ ও ল্যান্ডস্কেপ আর্কিটেক্টের সমন্বয়ে বাস্তবায়িত।'
                  : 'Rooftop biophilic sanctuaries, precision-graded carpet turf, natural Sylhet stone hardscapes, and weather-synced micro-irrigation — engineered under certified agronomist supervision.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('estimator')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lift hover:bg-emerald transition"
                >
                  <Calculator className="size-4 text-bright" />
                  <span>{isBn ? 'প্রজেক্ট খরচ হিসাব করুন' : 'Open Cost Estimator'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('transformation')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-full glass-card px-5 py-2.5 text-xs sm:text-sm font-bold text-forest hover:bg-white transition border border-white/80"
                >
                  <Sparkles className="size-4 text-emerald" />
                  <span>{isBn ? 'আগে ও পরের রূপান্তর দেখুন' : 'View Before & After'}</span>
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* 1. Core Services Catalog (8 Disciplines) */}
        <Services />

        {/* 2. Interactive Landscaping Estimator */}
        <LandscapeEstimator />

        {/* 3. Before & After Transformation Slider */}
        <LandscapeTransformation />

        {/* 4. Materials & Engineering Standards */}
        <LandscapeMaterials />

        {/* 5. Deep Dive: Rooftop Agriculture & Waterproofing */}
        <Rooftop />

        {/* 6. Deep Dive: Precision Turf & Lawn Engineering */}
        <Lawn />

        {/* 7. Interactive Automated Irrigation Simulator */}
        <section id="irrigation-demo" className="py-16 sm:py-24">
          <Container>
            <IrrigationSimulator />
          </Container>
        </section>

        {/* 8. Commercial Maintenance & Care Plans */}
        <CarePlans />

        {/* Consultation Call to Action */}
        <section className="relative isolate overflow-hidden py-24 sm:py-32">
          <Container>
            <div className="rounded-3xl glass-emerald p-8 sm:p-14 text-white shadow-lift border border-white/20 text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="size-4 text-bright" />
                {isBn ? 'আমির আলী গ্যারান্টি' : 'DAE Agronomist Guarantee'}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight">
                {isBn ? 'আপনার স্পেসের সাইট ভিজিট ও আর্কিটেকচারাল প্রপোজাল' : 'Schedule an On-Site Soil & Structural Feasibility Study'}
              </h2>
              <p className="mt-4 text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {isBn
                  ? 'সরাসরি সাইট পরিদর্শন করে রোদ, বাতাস ও লোড ক্যালকুলেশন করে আমরা নিখুঁত প্রজেক্ট প্রপোজাল প্রদান করি।'
                  : 'We measure slab load limits, solar azimuth angles, and draft precision architectural proposals.'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  href={getWhatsAppLink(isBn ? 'সাইট পরিদর্শন ও ল্যান্ডস্কেপিং পরামর্শ' : 'Site Consultation Request for Landscaping', null, lang)}
                  variant="primary"
                  size="lg"
                  className="bg-white text-forest hover:bg-cream hover:text-emerald font-bold"
                >
                  {t.actions.bookWhatsapp}
                </Button>
                <Button
                  href={`tel:${site.phones[0].tel}`}
                  variant="outline"
                  size="lg"
                  icon={Phone}
                  className="border-white text-white hover:bg-white/10"
                >
                  {site.phones[0].number}
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
