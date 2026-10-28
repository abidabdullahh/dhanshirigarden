import { useCallback, useEffect, useRef, useState } from 'react'
import { Building2, ChevronDown, Layers, Menu, MessageCircle, PencilRuler, Phone, X } from 'lucide-react'
import { site } from '../../data/site'
import { useActiveSection, useEscape, useLockBodyScroll, useScrollProgress } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import LangToggle from '../ui/LangToggle'
import Logo from '../ui/Logo'

const SECTION_IDS = [
  'services',
  'studio',
  'rooftop',
  'lawn',
  'plant-explorer',
  'projects',
  'transformations',
  'process',
  'growth-simulator',
  'gallery',
  'plant-doctor',
  'blog',
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

/** Lets the Services section pre-select an entry when a dropdown shortcut is used. */
const selectService = (key) => {
  if (key) window.dispatchEvent(new CustomEvent('dg:service', { detail: key }))
}

const linkClass = (isActive) =>
  `relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors duration-200 ${
    isActive ? 'bg-forest/[0.09] text-forest' : 'text-forest/75 hover:bg-forest/[0.06] hover:text-forest'
  }`

function AiTag({ label }) {
  return (
    <span className="rounded-full bg-bloom px-1.5 py-[3px] text-[0.62rem] font-bold leading-none text-charcoal">
      {label}
    </span>
  )
}

function ServicesMenu({ active }) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const timer = useRef(0)
  const pinned = useRef(false)

  const close = useCallback(() => {
    pinned.current = false
    setOpen(false)
  }, [])
  useEscape(close, open)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) close()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, close])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleEnter = () => {
    window.clearTimeout(timer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    window.clearTimeout(timer.current)
    if (!pinned.current) timer.current = window.setTimeout(() => setOpen(false), 160)
  }
  const handleClick = () => {
    if (!open) {
      pinned.current = true
      setOpen(true)
    } else if (pinned.current) {
      close()
    } else {
      pinned.current = true
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href="#services"
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={open}
        className={linkClass(active)}
      >
        <span>{t.nav.services}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180 text-emerald' : 'text-forest/60'}`}
          aria-hidden="true"
        />
      </a>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 w-80 rounded-3xl glass-card p-2 shadow-lift ring-1 ring-bright/35 backdrop-blur-2xl animate-pop"
        >
          <ul className="grid gap-1">
            {serviceShortcuts.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={() => {
                      selectService(item.service)
                      close()
                    }}
                    role="menuitem"
                    className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-forest/10"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-forest/8 text-emerald">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <strong className="text-sm font-bold text-forest">{t.servicesMenu[item.key].title}</strong>
                      <span className="text-xs text-charcoal/70">{t.servicesMenu[item.key].desc}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t, lang } = useLocale()
  const { scrolled } = useScrollProgress()
  const activeId = useActiveSection(SECTION_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openerRef = useRef(null)
  const closeRef = useRef(null)

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useEscape(closeMobile, mobileOpen)
  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    if (mobileOpen) closeRef.current?.focus()
    else openerRef.current?.focus({ preventScroll: true })
  }, [mobileOpen])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const onChange = () => {
      if (query.matches) setMobileOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const links = [
    { id: 'studio', label: t.nav.studio, match: ['studio'] },
    { id: 'projects', label: t.nav.projects, match: ['projects', 'process', 'transformations'] },
    { id: 'plant-explorer', label: t.nav.plants, match: ['plant-explorer'] },
    { id: 'gallery', label: t.nav.gallery, match: ['gallery', 'growth-simulator'] },
    { id: 'plant-doctor', label: t.nav.plantDoctor, match: ['plant-doctor'], ai: true },
    { id: 'blog', label: t.nav.blog, match: ['blog'] },
    { id: 'care-plans', label: t.nav.carePlans, match: ['care-plans'] },
    { id: 'about', label: t.nav.about, match: ['about', 'faq'] },
    { id: 'contact', label: t.nav.contact, match: ['contact'], wide: true },
  ]

  const phone = site.phones[0]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav
          aria-label={t.brand.name}
          className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 rounded-full glass-white py-2 pl-3 pr-2 transition-shadow duration-300 sm:gap-3 sm:pl-5 sm:pr-2.5 ${
            scrolled ? 'shadow-lift' : 'shadow-soft'
          }`}
        >
          <a href="#top" aria-label={t.nav.home} className="shrink-0 rounded-full">
            <Logo />
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            <li>
              <ServicesMenu active={['services', 'rooftop', 'lawn'].includes(activeId)} />
            </li>
            {links.map((link) => (
              <li key={link.id} className={link.wide ? 'hidden min-[1400px]:block' : undefined}>
                <a
                  href={`#${link.id}`}
                  aria-current={link.match.includes(activeId) ? 'true' : undefined}
                  className={linkClass(link.match.includes(activeId))}
                >
                  {link.label}
                  {link.ai && <AiTag label={t.nav.aiTag} />}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LangToggle />

            <div className="hidden sm:block">
              <Button href={getWhatsAppLink(null, null, lang)} size="sm" icon={MessageCircle}>
                {t.actions.whatsapp}
              </Button>
            </div>

            <button
              ref={openerRef}
              type="button"
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full glass-green text-forest xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-forest/40 backdrop-blur-sm xl:hidden"
        >
          <div className="flex h-full w-full max-w-sm flex-col overflow-y-auto bg-cream p-6 shadow-lift">
            <div className="flex items-center justify-between gap-3">
              <Logo />
              <div className="flex items-center gap-2">
                <LangToggle />
                <button
                  ref={closeRef}
                  type="button"
                  aria-label={t.nav.close}
                  onClick={closeMobile}
                  className="grid size-11 place-items-center rounded-full bg-forest text-white"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="mt-8 grid gap-1">
              {[{ id: 'services', label: t.nav.services, match: ['services', 'rooftop', 'lawn'] }, ...links].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={closeMobile}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 font-display text-xl font-bold transition-colors ${
                      link.match.includes(activeId) ? 'bg-forest/[0.08] text-forest' : 'text-forest/85 hover:bg-forest/[0.06]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      {link.label}
                      {link.ai && <AiTag label={t.nav.aiTag} />}
                    </span>
                    <ChevronDown className="size-5 -rotate-90 text-emerald/70" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-5 grid grid-cols-2 gap-2">
              {serviceShortcuts.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      onClick={() => {
                        selectService(item.service)
                        closeMobile()
                      }}
                      className="flex h-full items-center gap-2.5 rounded-2xl glass-green p-3 text-xs font-semibold text-forest"
                    >
                      <Icon className="size-4 shrink-0 text-emerald" aria-hidden="true" />
                      {t.servicesMenu[item.key].title}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto grid gap-3 pt-8">
              <Button href={getWhatsAppLink(null, null, lang)} size="lg" icon={MessageCircle}>
                {t.actions.whatsapp}
              </Button>
              <Button href={`tel:${phone.tel}`} variant="glass" size="lg" icon={Phone}>
                {t.actions.callNow} · {phone.number}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
