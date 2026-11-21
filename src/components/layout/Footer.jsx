import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import Logo from '../ui/Logo'
import { Container } from '../ui/Section'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { lang, setLang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  const handleLink = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <footer className="relative bg-[#14261C] text-stone-200 border-t border-emerald-950 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 items-start">
          {/* Col 1: Wordmark & Core Identity */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-block"
            >
              <Logo light={true} />
            </a>
            <p className="text-sm text-stone-300 font-normal leading-relaxed max-w-sm pt-2">
              {isBn
                ? 'আবাসিক ছাদবাগান, প্রাইভেট ভিলা এস্টেট ও ভেলভেট কার্পেট ঘাসের লন—কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) সাবেক কর্মকর্তার বিজ্ঞানসম্মত নির্দেশনায় ১০০% লিকপ্রুফ ওয়াটারপ্রুফিং সহ টেকসই ল্যান্ডস্কেপিং।'
                : 'Bespoke estate grounds, zero-leakage rooftop sanctuaries, and velvet turf lawns engineered under certified agricultural science.'}
            </p>

            <div className="pt-2 text-xs font-mono text-emerald-400 font-semibold">
              <span>DAE CERTIFIED AGRONOMY · AMIR ALI (EX-SAAO)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs tracking-wider uppercase text-emerald-300 font-bold block mb-4">
              {isBn ? 'ন্যাভিগেশন' : 'EXPLORE'}
            </span>
            <ul className="space-y-3 text-sm font-medium text-stone-300">
              <li>
                <a href="/services" onClick={(e) => handleLink(e, '/services')} className="hover:text-emerald-300 transition">
                  {isBn ? 'সেবাসমূহ' : 'Services & Disciplines'}
                </a>
              </li>
              <li>
                <a href="/projects" onClick={(e) => handleLink(e, '/projects')} className="hover:text-emerald-300 transition">
                  {isBn ? 'সম্পন্ন প্রকল্পসমূহ' : 'Selected Works'}
                </a>
              </li>
              <li>
                <a href="/store" onClick={(e) => handleLink(e, '/store')} className="hover:text-emerald-300 transition">
                  {isBn ? 'উদ্ভিদ ও ঘাস নার্সারি' : 'Specimen Nursery Catalog'}
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLink(e, '/about')} className="hover:text-emerald-300 transition">
                  {isBn ? 'আমাদের কথা ও বিজ্ঞান' : 'About & Soil Science'}
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="hover:text-emerald-300 transition">
                  {isBn ? 'যোগাযোগ ও সাইট ভিজিট' : 'Commission & Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studios & Direct Lines */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs tracking-wider uppercase text-emerald-300 font-bold block mb-4">
              {isBn ? 'অফিস ও নার্সারি' : 'LOCATIONS'}
            </span>

            <div className="space-y-3 text-sm text-stone-300 font-normal">
              <div>
                <strong className="block text-white font-bold">ঢাকা অফিস ও ডিজাইন স্টুডিও</strong>
                <span>ক-২৬/১, মহাখালী, ঢাকা-১২১২</span>
              </div>
              <div>
                <strong className="block text-white font-bold">নওগাঁ কৃষি গবেষণা ফার্ম ও নার্সারি</strong>
                <span>সুলতানপুর, পণ্ডিত পাড়া, নওগাঁ সদর-৬৫০০</span>
              </div>
              <div className="pt-2 font-mono text-xs">
                <a href={`tel:${site.phones[0].tel}`} className="text-emerald-300 hover:text-white transition font-bold block">
                  সরাসরি হটলাইন: {site.phones[0].number}
                </a>
                <a href={`tel:${site.phones[1].tel}`} className="text-stone-300 hover:text-white transition block mt-1">
                  সহকারী লাইন: {site.phones[1].number}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Row with Language Switcher */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-normal gap-4">
          <p>© {YEAR} ধানসিঁড়ি গার্ডেন (Dhanshiri Garden). সর্বস্বত্ব সংরক্ষিত।</p>

          {/* English / Bengali Switcher Option in Footer as requested */}
          <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/40">
            <span className="text-stone-400 font-medium">Language / ভাষা:</span>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2 py-0.5 rounded text-xs transition ${
                lang === 'bn'
                  ? 'bg-[#2d6a4f] text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <span className="text-emerald-800">|</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-xs transition ${
                lang === 'en'
                  ? 'bg-[#2d6a4f] text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span>ঢাকা · নওগাঁ · সমগ্র বাংলাদেশ</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
