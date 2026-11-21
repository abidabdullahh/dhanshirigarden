import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/layout/CartDrawer'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import { Container } from '../components/ui/Section'

export default function ProjectsPage() {
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
              <span className="text-forest font-semibold">{isBn ? 'নির্বাচিত কাজসমূহ' : 'SELECTED WORKS'}</span>
            </nav>

            <div className="max-w-4xl">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald block mb-4">
                {isBn ? 'আর্কিটেকচারাল পোর্টফোলিও' : 'ARCHITECTURAL PORTFOLIO'}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-light tracking-[-0.035em] text-forest leading-[1.05]">
                {isBn ? 'বাস্তবায়িত ল্যান্ডস্কেপ ও প্রজেক্ট চিত্রশালা' : 'Selected Works & Case Studies'}
              </h1>
              <p className="mt-6 text-base sm:text-xl text-charcoal/70 font-light leading-relaxed max-w-2xl">
                {isBn
                  ? 'ঢাকা, নওগাঁ ও গাজীপুরের বিভিন্ন আবাসিক, কর্পোরেট, ভেলভেট লন ও ছাদবাগানের বাস্তবায়িত চিত্রশালা।'
                  : 'A curated chronicle of living architectural transformations across private residences and corporate headquarters.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Projects Gallery */}
        <Projects />

        {/* Contact Consultation */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
