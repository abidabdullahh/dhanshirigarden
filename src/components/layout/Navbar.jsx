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
    { path: '/projects', hash: '#works', label: isBn ? 'সম্পন্ন প্রকল্প' : 'Projects' },
    { path: '/store', hash: '#nursery', label: isBn ? 'গাছ ও ঘাস নার্সারি' : 'Nursery' },
    { path: '/about', hash: '#about', label: isBn ? 'আমাদের কথা' : 'About' },
    { path: '/contact', hash: '#contact', label: isBn ? 'যোগাযোগ' : 'Contact' },
  ]

  const handleNavClick = (e, path, hash) => {
    e.preventDefault()
    closeMobile()
    if (route === '/') {
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
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-xl bg-white/95 border-b border-stone-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="ধানসিঁড়ি গার্ডেন"
            className="flex h-18 sm:h-20 items-center justify-between gap-4"
          >
            {/* Brand Logo in Bangla */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                closeMobile()
                if (route !== '/') navigate('/')
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="shrink-0 transition-opacity hover:opacity-90"
            >
              <Logo />
            </a>

            {/* Desktop Navigation Links — High-Contrast Clean Typography */}
            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`text-[0.92rem] font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'text-[#1b4332] border-b-2 border-[#1b4332] pb-0.5'
                          : 'text-stone-800 hover:text-[#1b4332]'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Right Action Deck */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Direct Call Line for Housewife / Architect convenience */}
              <a
                href={`tel:${site.phones[0].tel}`}
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-bold text-[#1b4332] hover:bg-emerald-100/80 transition shadow-2xs"
                title="সরাসরি ফোন করুন"
              >
                <Phone className="size-3.5 text-[#2d6a4f]" />
                <span className="font-mono text-[0.82rem] tracking-tight">{site.phones[0].number}</span>
              </a>

              {/* Minimal Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-stone-800 hover:text-[#1b4332] transition rounded-full hover:bg-stone-100"
                aria-label="শপিং ব্যাগ"
              >
                <ShoppingBag className="size-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 size-2.5 rounded-full bg-[#2d6a4f] ring-2 ring-white" />
                )}
              </button>

              <UserAuthMenu />

              {/* Primary Consultation Action Button */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#1b4332] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#2d6a4f] transition-all tracking-wide shadow-xs"
              >
                <span>{isBn ? 'পরামর্শ নিন' : 'Inquire'}</span>
              </a>

              {/* Mobile Hamburger */}
              <button
                type="button"
                aria-label="মেনু খুলুন"
                onClick={() => setMobileOpen(true)}
                className="p-2 text-stone-800 hover:text-[#1b4332] lg:hidden rounded-lg hover:bg-stone-100"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs lg:hidden animate-fade-in"
        >
          <div className="flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-5">
              <Logo />
              <button
                type="button"
                aria-label="মেনু বন্ধ করুন"
                onClick={closeMobile}
                className="p-2 text-stone-700 hover:text-[#1b4332] rounded-lg hover:bg-stone-100"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="mt-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = route === link.path
                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`block font-sutonny text-2xl font-bold tracking-tight transition ${
                        isActive ? 'text-[#1b4332]' : 'text-stone-800 hover:text-[#1b4332]'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Drawer Bottom Actions */}
            <div className="mt-auto border-t border-stone-200 pt-6 space-y-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '/contact', '#contact')}
                className="flex w-full items-center justify-center rounded-xl bg-[#1b4332] py-3.5 text-sm font-bold text-white hover:bg-[#2d6a4f] transition shadow-xs"
              >
                <span>{isBn ? 'বিনামূল্যে সাইট ভিজিট ও বাজেট পরামর্শ' : 'Free Site Visit & Budget Quote'}</span>
              </a>

              <a
                href={`tel:${site.phones[0].tel}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-700/20 bg-emerald-50 py-3 text-sm font-bold text-[#1b4332] hover:bg-emerald-100 transition"
              >
                <Phone className="size-4 text-[#2d6a4f]" />
                <span>সরাসরি কল: {site.phones[0].number}</span>
              </a>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-2 font-mono">
                <span>ঢাকা হেড অফিস</span>
                <span>নওগাঁ নার্সারি ও খামার</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
