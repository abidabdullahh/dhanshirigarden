import { useCallback, useState } from 'react'
import {
  Menu,
  ShoppingBag,
  X,
} from 'lucide-react'
import { site } from '../../data/site'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { useCart } from '../../lib/CartContext'
import LangToggle from '../ui/LangToggle'
import UserAuthMenu from '../ui/UserAuthMenu'

export default function Navbar() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { route, navigate } = useRouter()
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  useEscape(closeMobile, mobileOpen)
  useLockBodyScroll(mobileOpen)

  const navLinks = [
    { path: '/services', hash: '#services', label: isBn ? 'সেবাসমূহ' : 'Services' },
    { path: '/projects', hash: '#works', label: isBn ? 'নির্বাচিত প্রকল্প' : 'Selected Works' },
    { path: '/store', hash: '#nursery', label: isBn ? 'বোটানিক্যাল নার্সারি' : 'Specimen Nursery' },
    { path: '/about', hash: '#atelier', label: isBn ? 'অ্যাটেলিয়ার' : 'The Atelier' },
    { path: '/contact', hash: '#contact', label: isBn ? 'যোগাযোগ' : 'Contact' },
  ]

  const handleNavClick = (e, path, hash) => {
    e.preventDefault()
    closeMobile()
    if (route === '/') {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate(path)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-xl bg-white/85 border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <nav
            aria-label="Dhanshiri Atelier"
            className="flex h-16 sm:h-20 items-center justify-between"
          >
            {/* Brand Monogram & Wordmark (Swiss Minimalist) */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                closeMobile()
                if (route !== '/') navigate('/')
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex items-baseline gap-2.5 transition-opacity hover:opacity-75"
            >
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-forest">
                DHANSHIRI
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-charcoal/60 hidden sm:inline">
                ATELIER · LANDSCAPES
              </span>
            </a>

            {/* Desktop Navigation Links — Pure Architectural Typography */}
            <ul className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`text-[0.82rem] font-medium tracking-wide transition-colors ${
                        isActive
                          ? 'text-forest font-semibold'
                          : 'text-charcoal/70 hover:text-forest'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Right Action Deck */}
            <div className="flex items-center gap-3 sm:gap-4">
              <LangToggle />

              {/* Minimal Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-forest/80 hover:text-forest transition"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="size-4.5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 size-2 rounded-full bg-emerald" />
                )}
              </button>

              <UserAuthMenu />

              {/* Minimal Apple-style CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-forest px-5 py-2 text-xs font-medium text-white hover:bg-forest/90 transition-all tracking-wide"
              >
                <span>{isBn ? 'প্রকল্প আলোচনা' : 'Inquire'}</span>
              </a>

              {/* Mobile Hamburger */}
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(true)}
                className="p-2 text-forest/90 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer (Clean Swiss Slide-over) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm lg:hidden animate-fade-in"
        >
          <div className="flex h-full w-full max-w-sm flex-col bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-6">
              <span className="font-display text-xl font-bold tracking-tight text-forest">
                DHANSHIRI
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobile}
                className="p-2 text-forest/70 hover:text-forest"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="mt-8 space-y-6">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`block font-display text-2xl font-light tracking-tight transition ${
                        isActive ? 'text-forest font-semibold' : 'text-charcoal/80 hover:text-forest'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Drawer Bottom Actions */}
            <div className="mt-auto border-t border-black/[0.06] pt-6 space-y-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="flex w-full items-center justify-center rounded-full bg-forest py-3 text-sm font-medium text-white hover:bg-forest/90 transition"
              >
                <span>{isBn ? 'প্রকল্প আলোচনা শুরু করুন' : 'Start a Project'}</span>
              </a>
              <div className="flex items-center justify-between text-xs text-charcoal/60 pt-2 font-mono">
                <a href={`tel:${site.phones[0].tel}`} className="hover:text-forest">
                  {site.phones[0].number}
                </a>
                <span>DHAKA · NAOGAON</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
