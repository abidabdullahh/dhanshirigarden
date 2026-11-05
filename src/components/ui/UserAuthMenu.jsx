import { useState, useRef, useEffect } from 'react'
import { LogOut, ShieldCheck, Check, ExternalLink } from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'

export default function UserAuthMenu() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth()
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-forest/20 p-1 pr-2.5 transition hover:bg-forest/5"
        >
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
            alt={user.name}
            className="size-7 rounded-full object-cover border border-emerald"
          />
          <span className="text-xs font-bold text-forest hidden md:inline-block max-w-[90px] truncate">
            {user.name}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white/80 px-3 py-1.5 text-xs font-bold text-forest hover:bg-white hover:border-emerald transition shadow-xs"
        >
          {/* Official Google SVG G-Logo */}
          <svg className="size-3.5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.31 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.27V6.58H1.27A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.27 5.42l4.01-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{isBn ? 'গুগল সাইন-ইন' : 'Google Sign-In'}</span>
        </button>
      )}

      {/* Profile & Options Dropdown Menu */}
      {open && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-3 shadow-2xl border border-forest/10 z-50 animate-rise">
          <div className="flex items-center gap-3 p-2 border-b border-forest/10 pb-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-10 rounded-full object-cover border border-emerald"
            />
            <div className="min-w-0">
              <p className="font-display text-xs font-bold text-forest truncate">{user.name}</p>
              <p className="text-[0.68rem] text-charcoal/70 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold text-emerald mt-0.5">
                <Check className="size-3" />
                <span>Verified Google Session</span>
              </span>
            </div>
          </div>

          <div className="mt-2 space-y-1 text-xs">
            {/* Link to Admin Customer & Order Tracker */}
            <button
              type="button"
              onClick={() => {
                navigate('/admin')
                setOpen(false)
              }}
              className="flex w-full items-center justify-between rounded-xl p-2 font-bold text-forest hover:bg-forest/5 transition"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald" />
                <span>{isBn ? 'অ্যাডমিন ট্র্যাকার পোর্টাল' : 'Admin Tracker Portal'}</span>
              </div>
              <ExternalLink className="size-3.5 text-forest/40" />
            </button>

            {/* Logout button */}
            <button
              type="button"
              onClick={() => {
                logout()
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-xl p-2 font-semibold text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="size-4" />
              <span>{isBn ? 'লগআউট' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
