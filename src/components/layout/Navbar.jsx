import { useCallback, useState } from 'react'
import {
  Menu,
  Phone,
  ShoppingBag,
  X,
} from 'lucide-react'
import { site } from '../../data/site'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { useCart } from '../../lib/CartContext'
import Logo from '../ui/Logo'
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
    { path: '/#irrigation-engine', hash: '#irrigation-engine', label: isBn ? 'ইরিগেশন ইঞ্জিন' : 'Irrigation' },
    { path: '/#lawn-mower-engine', hash: '#lawn-mower-engine', label: isBn ? 'লন মওয়ার' : 'Lawn Mower' },
    { path: '/projects', hash: '#works', label: isBn ? 'সম্পন্ন প্রকল্প' : 'Projects' },
    { path: '/store', hash: '#nursery', label: isBn ? 'গাছ ও ঘাস নার্সারি' : 'Nursery' },
    { path: '/about', hash: '#about', label: isBn ? 'আমাদের কথা' : 'About' },
    { path: '/contact', hash: '#contact', label: isBn ? 'যোগাযোগ' : 'Contact' },
  ]

  const handleNavClick = (e, path, hash) => {
    e.preventDefault()
    closeMobile()
    if (hash && (route === '/' || path.startsWith('/#'))) {
      const el = document.querySelector(hash) || (hash === '#about' ? document.querySelector('#atelier') : null)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate(path)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
          <div className="glass-panel-3d rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl flex items-center justify-between gap-4 border border-white/80">
            {/* Brand Logo in Bangla */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                closeMobile()
                if (route === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  navigate('/')
                }
              }}
              className="flex items-center gap-3 shrink-0 group focus-visible:outline-hidden"
            >
              <Logo />
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="প্রধান নেভিগেশন" className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, link.hash)}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold font-sutonny transition-all duration-200 ${
                      isActive
                        ? 'bg-forest text-white shadow-sm'
                        : 'text-charcoal hover:text-forest hover:bg-forest/5'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            {/* Right Action Icons: Cart, Auth, Phone */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`শপিং ব্যাগ (${totalItems} টি আইটেম)`}
                className="relative p-2.5 text-forest hover:bg-forest/5 rounded-full transition glass-pill-3d"
              >
                <ShoppingBag className="size-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 rounded-full bg-forest text-white text-[0.65rem] font-bold flex items-center justify-center font-mono shadow-md animate-pop">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account / Login */}
              <UserAuthMenu />

              {/* Direct Site Visit CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-forest px-4.5 py-2 text-xs font-bold text-white hover:bg-emerald transition-all shadow-md hover:shadow-lg font-sutonny glass-specular"
              >
                <span>{isBn ? 'সাইট ভিজিট' : 'Site Visit'}</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                aria-label={mobileOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 text-forest hover:bg-forest/5 rounded-full lg:hidden transition glass-pill-3d"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Glass Slide Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={closeMobile}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm glass-panel-3d bg-white/95 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-forest/10">
              <Logo />
              <button
                type="button"
                aria-label="মেনু বন্ধ করুন"
                onClick={closeMobile}
                className="p-2 text-forest hover:bg-forest/5 rounded-full"
              >
                <X className="size-6" />
              </button>
            </div>

            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`block font-sutonny text-xl font-bold py-2 px-3 rounded-xl transition ${
                        isActive ? 'bg-forest text-white' : 'text-charcoal hover:bg-forest/5'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto border-t border-forest/10 pt-6 space-y-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="flex w-full items-center justify-center rounded-xl bg-forest py-3.5 text-sm font-bold text-white hover:bg-emerald transition shadow-md"
              >
                <span>{isBn ? 'বিনামূল্যে সাইট ভিজিট ও বাজেট পরামর্শ' : 'Free Site Visit & Budget Quote'}</span>
              </a>

              <a
                href={`tel:${site.phones[0].tel}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl glass-pill-3d py-3 text-sm font-bold text-forest transition"
              >
                <Phone className="size-4 text-bright" />
                <span>সরাসরি কল: {site.phones[0].number}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
