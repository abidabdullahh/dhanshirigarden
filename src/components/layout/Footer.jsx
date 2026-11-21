import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { Container } from '../ui/Section'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  const handleLink = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <footer className="relative bg-[#FCFCFA] border-t border-black/[0.06] py-20 sm:py-28 text-charcoal">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Col 1: Wordmark & Core Identity */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-block font-display text-2xl font-bold tracking-tight text-forest"
            >
              DHANSHIRI
            </a>
            <p className="font-mono text-xs text-charcoal/50 tracking-[0.15em] uppercase">
              ATELIER · LANDSCAPE ARCHITECTURE
            </p>
            <p className="text-sm text-charcoal/70 font-light leading-relaxed max-w-sm pt-2">
              {isBn
                ? 'আবাসিক ও প্রাতিষ্ঠানিক বহিরাঙ্গন পরিকল্পনা, শতভাগ লিকপ্রুফ ছাদবাগান ও সিলেট স্টোন হার্ডস্কেপ।'
                : 'Bespoke estate grounds, zero-leakage rooftop sanctuaries, and natural stone hardscapes engineered under certified agricultural science.'}
            </p>

            <div className="pt-4 font-mono text-xs text-charcoal/50">
              <span>DAE CERTIFIED AGRONOMY · AMIR ALI (FORMER SAAO)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-charcoal/40 block mb-4">
              {isBn ? 'ন্যাভিগেশন' : 'EXPLORE'}
            </span>
            <ul className="space-y-3 text-sm font-light text-charcoal/80">
              <li>
                <a href="/services" onClick={(e) => handleLink(e, '/services')} className="hover:text-forest transition">
                  {isBn ? 'সেবাসমূহ' : 'Services & Disciplines'}
                </a>
              </li>
              <li>
                <a href="/projects" onClick={(e) => handleLink(e, '/projects')} className="hover:text-forest transition">
                  {isBn ? 'নির্বাচিত কাজসমূহ' : 'Selected Works'}
                </a>
              </li>
              <li>
                <a href="/store" onClick={(e) => handleLink(e, '/store')} className="hover:text-forest transition">
                  {isBn ? 'বোটানিক্যাল নার্সারি' : 'Specimen Nursery Catalog'}
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLink(e, '/about')} className="hover:text-forest transition">
                  {isBn ? 'অ্যাটেলিয়ার ও বিজ্ঞান' : 'The Atelier'}
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="hover:text-forest transition">
                  {isBn ? 'যোগাযোগ ও সাইট ভিজিট' : 'Commission & Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studios & Direct Lines */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-charcoal/40 block mb-4">
              {isBn ? 'স্টুডিও ও নার্সারি' : 'LOCATIONS'}
            </span>

            <div className="space-y-3 text-xs sm:text-sm text-charcoal/70 font-light">
              <div>
                <strong className="block text-forest font-normal">Dhaka Studio &amp; HQ</strong>
                <span>K-26/1, Mohakhali, Dhaka-1212</span>
              </div>
              <div>
                <strong className="block text-forest font-normal">Naogaon Agronomy Farm &amp; Nursery</strong>
                <span>Sultanpur, Pandit Para, Naogaon Sadar-6500</span>
              </div>
              <div className="pt-2 font-mono text-xs">
                <a href={`tel:${site.phones[0].tel}`} className="text-forest hover:text-emerald transition">
                  Direct: {site.phones[0].number}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Row */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/50 font-light gap-4">
          <p>© {YEAR} Dhanshiri Garden Atelier. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.innerloopatelier.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest transition"
            >
              Crafted by Innerloop Atelier
            </a>
            <span>·</span>
            <span>Dhaka &amp; Naogaon</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
