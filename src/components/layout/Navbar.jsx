import { useCallback, useEffect, useState } from 'react'
import {
  Calculator,
  Calendar,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import { site } from '../../data/site'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { useCart } from '../../lib/CartContext'
import Button from '../ui/Button'
import LangToggle from '../ui/LangToggle'
import Logo from '../ui/Logo'
import UserAuthMenu from '../ui/UserAuthMenu'

const BULLETINS = [
  {
    tag: { bn: 'কৃষি তথ্য সার্ভিস (AIS) ‘কৃষিকথা’', en: 'AIS Agri-Bulletin' },
    text: {
      bn: 'হেমন্তকালীন ছাদবাগান বুলেটিন: কার্তিক মাসে ফলদ গাছে (মাল্টা, আম, পেয়ারা) সুষম জৈব সার প্রয়োগ ও শীতকালীন সবজির চারা লাগানোর মোক্ষম সময়।',
      en: 'Hemanto Rooftop Advisory: Apply organic compost to fruit trees (Malta, Mango, Guava); ideal window for winter vegetable seedlings.',
    },
    meta: { bn: '২৮° সে. | ঢাকা ও নওগাঁ', en: '28°C | Dhaka & Naogaon' },
  },
  {
    tag: { bn: 'হৃদয়ে মাটি ও মানুষ (শাইখ সিরাজ)', en: 'Hridoye Mati O Manush' },
    text: {
      bn: 'শাইখ সিরাজ বার্তা: ছাদবাগানে অতিরিক্ত লোড কমাতে সাধারণ মাটির বদলে কোকোপিট ও ভার্মিকম্পোস্টের হালকা গ্রোয়িং মিডিয়া ব্যবহার করুন; ছাদ থাকবে নিরাপদ।',
      en: 'Shykh Seraj Advice: Use lightweight engineered media (cocopeat & vermicompost) to avoid dead load on roof slabs while maximizing yield.',
    },
    meta: { bn: 'বাতাস মৃদু | আর্দ্রতা ৬৮%', en: 'Mild breeze | 68% Hum.' },
  },
  {
    tag: { bn: 'বিটিভি মাটি ও মানুষ ও আবহাওয়া', en: 'BTV Mati O Manush' },
    text: {
      bn: 'আবহাওয়া ও সেচ নির্দেশিকা: সকাল ৮টার পূর্বে গাছে পানি দিন। পাতার উপরিভাগে পানি না দিয়ে গোড়ায় সেচ দিন এবং ড্রেনেজ লাইন পরিচ্ছন্ন রাখুন।',
      en: 'Irrigation & Weather Note: Water plants before 8 AM at the root base; avoid spraying foliage in strong sun to prevent fungal scorch.',
    },
    meta: { bn: 'সূর্যালোক ৭.৫ ঘণ্টা', en: '7.5 hrs sunshine' },
  },
  {
    tag: { bn: 'ডিএই বরেন্দ্র ও মেট্রো বুলেটিন', en: 'DAE Barind & Metro' },
    text: {
      bn: 'লনের ঘাস ও কার্পেট টার্ফ পরিচর্যা: শীতের আগমনে বারমুডা ও কোরিয়ান ঘাসে হালকা কাটাই দিন এবং পরিমিত পটাশ সার প্রয়োগ করুন।',
      en: 'Turf Care: Trim Bermuda and Korean carpet turf before winter chill; apply light potassium fertilizer for root strength.',
    },
    meta: { bn: 'মাটির আর্দ্রতা পরীক্ষা করুন', en: 'Check soil moisture' },
  },
]

export default function Navbar() {
  const { t, lang } = useLocale()
  const isBn = lang === 'bn'
  const { route, navigate } = useRouter()
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bulletinIndex, setBulletinIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setBulletinIndex((prev) => (prev + 1) % BULLETINS.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const currentBulletin = BULLETINS[bulletinIndex]

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useEscape(closeMobile, mobileOpen)
  useLockBodyScroll(mobileOpen)

  const phone = site.phones[0]

  const navLinks = [
    { path: '/services', label: isBn ? 'ল্যান্ডস্কেপ সেবা' : 'Landscaping', icon: Layers },
    { path: '/projects', label: t.nav.projects, icon: LayoutGrid },
    {
      path: '#estimator',
      label: isBn ? 'ব্যয় প্রাক্কলন' : 'Cost Estimator',
      badge: isBn ? 'ক্যালকুলেটর' : 'ESTIMATE',
      icon: Calculator,
      isHash: true,
    },
    {
      path: '#transformation',
      label: isBn ? 'রূপান্তর' : 'Before & After',
      icon: Sparkles,
      isHash: true,
    },
    {
      path: '#materials',
      label: isBn ? 'উপাদান মান' : 'Materials',
      icon: ShieldCheck,
      isHash: true,
    },
    { path: '/store', label: isBn ? 'প্ল্যান্ট নার্সারি' : 'Nursery', badge: '715+', icon: ShoppingBag },
    { path: '/about', label: t.nav.about, icon: Info },
    { path: '/contact', label: t.nav.contact, icon: Phone },
  ]

  const handleNavClick = (e, path, isHash = false) => {
    e.preventDefault()
    closeMobile()
    if (isHash) {
      if (route !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(path)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      } else {
        const el = document.querySelector(path)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    navigate(path)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        {/* Top Micro-Bar: Desktop Weather & Plantation Bulletin */}
        <div className="hidden border-b border-white/50 bg-white/75 backdrop-blur-md py-1.5 lg:block transition-all">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-[0.72rem] tracking-wider text-forest/90 font-medium">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-4">
              <span className="inline-flex items-center gap-1.5 rounded-full glass-pill bg-emerald/10 px-2.5 py-0.5 text-[0.65rem] font-bold text-emerald shrink-0">
                <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
                <span>{currentBulletin.tag[lang]}</span>
              </span>
              <p className="truncate font-medium text-forest/90 text-[0.73rem] transition-all duration-300">
                {currentBulletin.text[lang]}
              </p>
              <span className="shrink-0 rounded-full glass-pill px-2 py-0.5 text-[0.62rem] font-bold text-amber-700 bg-amber-500/10">
                {currentBulletin.meta[lang]}
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={`tel:${phone.tel}`}
                className="flex items-center gap-1.5 font-semibold text-forest hover:text-emerald transition"
              >
                <Phone className="size-3 text-emerald" />
                <span>{phone.number}</span>
              </a>
              <span className="text-forest/25">|</span>
              <LangToggle />
            </div>
          </div>
        </div>

        {/* Main Navigation Bar: Floating Frosted Glass Panel */}
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-2 sm:pt-3">
          <nav
            aria-label={t.brand.name}
            className="flex h-16 items-center justify-between rounded-2xl glass-nav px-4 sm:px-6 transition-all duration-300"
          >
            {/* Brand Logo */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              aria-label={t.nav.home}
              className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Logo />
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => {
                const isActive = !link.isHash && route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.isHash)}
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        isActive
                          ? 'bg-forest text-white shadow-soft'
                          : 'text-forest/80 hover:bg-forest/8 hover:text-forest'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[0.65rem] font-extrabold ${
                            isActive ? 'bg-bloom text-charcoal' : 'bg-emerald/15 text-emerald'
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Right Action Deck: Cart + Consultation CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Shopping Cart Drawer Trigger Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative grid size-10 place-items-center rounded-xl glass-pill text-forest transition hover:bg-white hover:text-emerald"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="size-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white shadow-xs animate-rise">
                    {totalItems}
                  </span>
                )}
              </button>

              <UserAuthMenu />

              <div className="lg:hidden">
                <LangToggle />
              </div>

              <Button
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                size="sm"
                variant="primary"
                className="hidden text-xs font-bold uppercase tracking-wider sm:inline-flex shadow-soft"
              >
                <Calendar className="size-3.5" />
                <span>{isBn ? 'পরামর্শ বুক করুন' : 'Book Consultation'}</span>
              </Button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                aria-label={t.nav.menu}
                onClick={() => setMobileOpen(true)}
                className="grid size-10 place-items-center rounded-xl glass-pill text-forest transition hover:bg-white xl:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer (Frosted Glass Sheet) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-forest/30 backdrop-blur-md xl:hidden"
        >
          <div className="flex h-full w-full max-w-sm flex-col glass-panel p-6 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} aria-label={t.nav.home}>
                <Logo />
              </a>
              <button
                type="button"
                aria-label={t.nav.close}
                onClick={closeMobile}
                className="grid size-9 place-items-center rounded-xl glass-pill text-forest hover:bg-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Nav Items */}
            <ul className="mt-5 grid gap-1.5 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = !link.isHash && route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.isHash)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? 'bg-forest text-white'
                          : 'text-forest hover:bg-forest/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4.5" />
                        <span>{link.label}</span>
                      </span>
                      {link.badge && (
                        <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-xs font-bold text-emerald">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Drawer Footer Actions */}
            <div className="mt-auto border-t border-forest/10 pt-5 space-y-3">
              <Button
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                size="md"
                variant="primary"
                className="w-full justify-center text-xs font-bold uppercase tracking-wider"
              >
                <Calendar className="size-4" />
                <span>{isBn ? 'পরামর্শ বুক করুন' : 'Book Consultation'}</span>
              </Button>
              <div className="flex items-center justify-between text-xs text-charcoal/70 px-1">
                <span>{site.phones[0].number}</span>
                <LangToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
