import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/layout/CartDrawer'
import Services from '../components/sections/Services'
import Contact from '../components/sections/Contact'
import { Container } from '../components/ui/Section'

export default function ServicesPage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-charcoal flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 sm:pt-32">
        {/* Page Header */}
        <section className="py-16 sm:py-24 border-b border-black/[0.06]">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-charcoal/50">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="hover:text-forest transition"
              >
                {isBn ? 'প্রচ্ছদ' : 'HOME'}
              </button>
              <span>/</span>
              <span className="text-forest font-semibold">{isBn ? 'সেবাসমূহ' : 'SERVICES'}</span>
            </nav>

            <div className="max-w-4xl">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald block mb-4">
                {isBn ? 'আর্কিটেকচারাল ডিসিপ্লিনস' : 'ARCHITECTURAL DISCIPLINES'}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-light tracking-[-0.035em] text-forest leading-[1.05]">
                {isBn ? 'বিশেষায়িত ল্যান্ডস্কেপিং সেবা' : 'Architectural Landscape Services'}
              </h1>
              <p className="mt-6 text-base sm:text-xl text-charcoal/70 font-light leading-relaxed max-w-2xl">
                {isBn
                  ? 'আবাসিক এস্টেট, শতভাগ লিকপ্রুফ ছাদবাগান, সিলেট স্যান্ডস্টোন ওয়াকওয়ে ও গল্ফ-গ্রেড লন—ডিএই বৈজ্ঞানিক এগ্রোনমি ও আধুনিক স্থাপত্যের মেলবন্ধন।'
                  : 'Bespoke estate grounds, zero-leakage rooftop sanctuaries, and natural stone hardscapes engineered under certified agricultural science.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Core Services Component */}
        <Services />

        {/* Direct Consultation / Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
