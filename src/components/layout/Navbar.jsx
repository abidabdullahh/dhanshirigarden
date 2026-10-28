import { useCallback, useState } from 'react'
import { Building2, Layers, Menu, PencilRuler, Phone, X } from 'lucide-react'
import { site } from '../../data/site'
import { useActiveSection, useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import LangToggle from '../ui/LangToggle'
import Logo from '../ui/Logo'

const SECTION_IDS = [
  'services',
  'studio',
  'rooftop',
  'lawn',
  'projects',
  'transformations',
  'growth-simulator',
  'care-plans',
  'about',
  'faq',
  'contact',
]

const serviceShortcuts = [
  { key: 'rooftop', href: '#rooftop', icon: Building2 },
  { key: 'lawn', href: '#lawn', icon: MowerDoodle },
  { key: 'landscapeDesign', href: '#services', icon: PencilRuler, service: 'landscapeDesign' },
  { key: 'verticalGarden', href: '#services', icon: Layers, service: 'verticalGarden' },
]

const selectService = (key) => {
  if (key) window.dispatchEvent(new CustomEvent('dg:service', { detail: key }))
}

const linkClass = (isActive) =>
  `relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
    isActive ? 'text-forest font-black border-b-2 border-forest' : 'text-forest/70 hover:text-forest'
  }`

export default function Navbar() {
  const { t, lang } = useLocale()
  const activeId = useActiveSection(SECTION_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useEscape(closeMobile, mobileOpen)
  useLockBodyScroll(mobileOpen)

  const phone = site.phones[0]

  const navLinks = [
    { id: 'services', label: t.nav.services, match: ['services'] },
    { id: 'studio', label: t.nav.studio, match: ['studio'] },
    { id: 'rooftop', label: t.servicesMenu.rooftop.title, match: ['rooftop'] },
    { id: 'lawn', label: t.servicesMenu.lawn.title, match: ['lawn'] },
    { id: 'projects', label: t.nav.projects, match: ['projects', 'transformations'] },
    { id: 'about', label: t.nav.about, match: ['about', 'faq'] },
    { id: 'contact', label: t.nav.contact, match: ['contact'] },
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur-xl border-b border-forest/10 transition-all duration-300">
        {/* LINE 1: Swiss Architectural Utility Micro-Bar */}
        <div className="hidden border-b border-forest/10 bg-forest/[0.03] py-1.5 sm:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-[0.72rem] tracking-wider text-forest/75 font-mono">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-forest">DHANSHIRI GARDEN ARCHITECTURE</span>
              <span className="text-forest/30">|</span>
              <span>DHAKA 1212 · NAOGAON 6500</span>
              <span className="text-forest/30">|</span>
              <span className="text-emerald font-bold">DAE CERTIFIED AGRONOMY</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${phone.tel}`}
                className="flex items-center gap-1.5 hover:text-forest transition"
              >
                <Phone className="size-3 text-emerald" />
                <span className="font-bold">{phone.number}</span>
              </a>
              <span className="text-forest/30">|</span>
              <LangToggle />
            </div>
          </div>
        </div>

        {/* LINE 2: Main Navigation Bar */}
        <nav
          aria-label={t.brand.name}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Brand Logo */}
          <a href="#top" aria-label={t.nav.home} className="shrink-0">
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={linkClass(link.match.includes(activeId))}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action: Small Lang button on mobile + Book Consultation CTA */}
          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <LangToggle />
            </div>

            <Button
              href="#contact"
              size="sm"
              variant="primary"
              className="hidden text-xs font-bold uppercase tracking-wider sm:inline-flex"
            >
              {lang === 'bn' ? 'পরামর্শ নিন' : 'Consult Agronomist'}
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={t.nav.menu}
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-forest/15 text-forest transition hover:bg-forest/5 xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (Clean Swiss Layout) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-forest/40 backdrop-blur-sm xl:hidden"
        >
          <div className="flex h-full w-full max-w-sm flex-col bg-cream p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <Logo />
              <button
                type="button"
                aria-label={t.nav.close}
                onClick={closeMobile}
                className="grid size-9 place-items-center rounded-lg border border-forest/15 text-forest"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="mt-6 grid gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={closeMobile}
                    className="block rounded-xl px-4 py-3 font-display text-lg font-bold text-forest hover:bg-forest/5 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-forest/10 pt-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-forest/60 mb-2">
                {lang === 'bn' ? 'সরাসরি সেবা' : 'Core Focus'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {serviceShortcuts.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={() => {
                        selectService(item.service)
                        closeMobile()
                      }}
                      className="flex items-center gap-2 rounded-xl border border-forest/10 bg-white p-2.5 text-xs font-bold text-forest"
                    >
                      <Icon className="size-4 text-emerald" />
                      <span>{t.servicesMenu[item.key].title}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-forest/10">
              <Button href={`tel:${phone.tel}`} variant="glass" size="md" icon={Phone} className="w-full">
                {phone.number}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
