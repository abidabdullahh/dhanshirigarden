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
    <div className="min-h-screen bg-[#FCFCFA] text-stone-900 flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 sm:pt-32">
        {/* Page Header */}
        <section className="py-14 sm:py-20 border-b-2 border-stone-200 bg-white">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono font-bold text-stone-600">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="hover:text-[#1b4332] transition"
              >
                {isBn ? 'প্রচ্ছদ' : 'HOME'}
              </button>
              <span>/</span>
              <span className="text-[#1b4332]">{isBn ? 'সেবাসমূহ' : 'SERVICES'}</span>
            </nav>

            <div className="max-w-4xl">
              <span className="font-mono text-xs tracking-wider uppercase text-[#2d6a4f] font-bold block mb-3">
                {isBn ? 'ল্যান্ডস্কেপ সেবাসমূহ' : 'ARCHITECTURAL DISCIPLINES'}
              </span>
              <h1 className="font-sutonny text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1b4332] leading-[1.12]">
                {isBn ? 'বিশেষায়িত ল্যান্ডস্কেপিং সেবা' : 'Architectural Landscape Services'}
              </h1>
              <p className="mt-4 text-base sm:text-xl text-stone-800 font-medium leading-relaxed max-w-2xl">
                {isBn
                  ? 'ছাদবাগান থেকে প্রাইভেট এস্টেট—১০০% লিকপ্রুফ ওয়াটারপ্রুফিং ও বৈজ্ঞানিক মাটির পুষ্টিতে আপনার বহিরাঙ্গনের রূপান্তর।'
                  : 'Engineered for longevity, ecological harmony, and zero-leak rooftop assurance.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Services Disciplines Matrix */}
        <Services />

        {/* Commission */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
