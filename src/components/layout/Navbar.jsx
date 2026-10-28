import { useCallback, useState } from 'react'
import {
  BookOpen,
  Building2,
  Calendar,
  Compass,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Phone,
  ScanSearch,
  Trees,
  X,
} from 'lucide-react'
import { site } from '../../data/site'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import LangToggle from '../ui/LangToggle'
import Logo from '../ui/Logo'

export default function Navbar() {
  const { t, lang } = useLocale()
  const { route, navigate } = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useEscape(closeMobile, mobileOpen)
  useLockBodyScroll(mobileOpen)

  const phone = site.phones[0]

  const navLinks = [
    { path: '/', label: t.nav.home, icon: Trees },
    { path: '/services', label: t.nav.services, icon: Layers },
    { path: '/studio', label: t.nav.studio, icon: Compass },
    { path: '/projects', label: t.nav.projects, icon: LayoutGrid },
    { path: '/plant-doctor', label: t.nav.plantDoctor, badge: 'AI', icon: ScanSearch },
    { path: '/blog', label: t.nav.blog, icon: BookOpen },
    { path: '/about', label: t.nav.about, icon: Info },
    { path: '/contact', label: t.nav.contact, icon: Phone },
  ]

  const handleNavClick = (e, path) => {
    e.preventDefault()
    navigate(path)
    closeMobile()
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        {/* Top Micro-Bar: Frosted Glass Utility Strip */}
        <div className="hidden border-b border-white/40 bg-white/40 backdrop-blur-md py-1.5 lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-[0.72rem] tracking-wider text-forest/80 font-medium">
            <div className="flex items-center gap-3">
              <span className="font-bold text-forest flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald animate-pulse" />
                DHANSHIRI GARDEN ARCHITECTURE & AGRONOMY
              </span>
              <span className="text-forest/25">|</span>
              <span>DHAKA 1212 · NAOGAON 6500</span>
              <span className="text-forest/25">|</span>
              <span className="text-emerald font-bold">DAE CERTIFIED SCIENCE-FIRST LANDSCAPING</span>
            </div>

            <div className="flex items-center gap-4">
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
              href="#/"
              onClick={(e) => handleNavClick(e, '/')}
              aria-label={t.nav.home}
              className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Logo />
            </a>

            {/* Desktop Navigation Links — Glass Pills */}
            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={`#${link.path}`}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        isActive
                          ? 'bg-forest text-white shadow-soft'
                          : 'text-forest/80 hover:bg-forest/8 hover:text-forest'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`rounded-full px-1.5 py-0.2 text-[0.65rem] font-extrabold ${
                          isActive ? 'bg-bloom text-charcoal' : 'bg-emerald/15 text-emerald'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Right Action: Language Switcher + Consultation CTA */}
            <div className="flex items-center gap-2.5">
              <div className="lg:hidden">
                <LangToggle />
              </div>

              <Button
                href="#/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                size="sm"
                variant="primary"
                className="hidden text-xs font-bold uppercase tracking-wider sm:inline-flex shadow-soft"
              >
                <Calendar className="size-3.5" />
                <span>{lang === 'bn' ? 'পরামর্শ বুক করুন' : 'Book Consultation'}</span>
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
              <Logo />
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
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={`#${link.path}`}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-base font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-forest text-white shadow-soft'
                          : 'text-forest hover:bg-forest/8'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`size-4.5 ${isActive ? 'text-bright' : 'text-emerald'}`} />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className={`rounded-full px-2 py-0.5 text-[0.68rem] font-extrabold ${
                          isActive ? 'bg-bloom text-charcoal' : 'bg-forest/10 text-forest'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Fast Service Shortcuts */}
            <div className="mt-4 border-t border-forest/10 pt-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-forest/60 mb-2.5">
                {lang === 'bn' ? 'সরাসরি সেবা ও স্টুডিও' : 'Quick Access'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="#/services"
                  onClick={(e) => handleNavClick(e, '/services')}
                  className="flex items-center gap-2 rounded-xl glass-pill p-2.5 font-bold text-forest hover:bg-white transition"
                >
                  <Building2 className="size-4 text-emerald" />
                  <span>{t.servicesMenu.rooftop.title}</span>
                </a>
                <a
                  href="#/services"
                  onClick={(e) => handleNavClick(e, '/services')}
                  className="flex items-center gap-2 rounded-xl glass-pill p-2.5 font-bold text-forest hover:bg-white transition"
                >
                  <MowerDoodle className="size-4 text-emerald" />
                  <span>{t.servicesMenu.lawn.title}</span>
                </a>
                <a
                  href="#/studio"
                  onClick={(e) => handleNavClick(e, '/studio')}
                  className="flex items-center gap-2 rounded-xl glass-pill p-2.5 font-bold text-forest hover:bg-white transition"
                >
                  <Compass className="size-4 text-emerald" />
                  <span>{t.nav.studio}</span>
                </a>
                <a
                  href="#/plant-doctor"
                  onClick={(e) => handleNavClick(e, '/plant-doctor')}
                  className="flex items-center gap-2 rounded-xl glass-pill p-2.5 font-bold text-forest hover:bg-white transition"
                >
                  <ScanSearch className="size-4 text-bloom" />
                  <span>{t.nav.plantDoctor}</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="mt-auto pt-6 border-t border-forest/10 space-y-2">
              <Button
                href={`tel:${phone.tel}`}
                variant="glass"
                size="md"
                icon={Phone}
                className="w-full text-xs font-bold uppercase tracking-wider"
              >
                {phone.number}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
