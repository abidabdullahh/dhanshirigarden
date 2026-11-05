import { useState } from 'react'
import { Check, ShieldCheck, ShoppingBag, X } from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import { useLocale } from '../../lib/locale'

export default function AuthModal({ isOpen, onClose, onSuccess, pendingItemName }) {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleGoogleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      loginWithGoogle()
      setLoading(false)
      if (onSuccess) onSuccess()
      onClose()
    }, 400)
  }

  const handleGuestContinue = () => {
    if (onSuccess) onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-8 shadow-2xl border border-white/80 bg-white/95 animate-rise z-10 text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full flex items-center justify-center text-charcoal/60 hover:bg-forest/10 hover:text-forest transition"
        >
          <X className="size-4" />
        </button>

        <div className="size-14 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mx-auto mb-4 shadow-inner">
          <ShoppingBag className="size-7" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full glass-pill bg-emerald/10 px-3 py-1 text-[0.68rem] font-bold text-emerald uppercase tracking-wider mb-2">
          <ShieldCheck className="size-3.5" />
          <span>{isBn ? 'নিরাপদ অর্ডার সিস্টেম' : 'Verified Google Order'}</span>
        </span>

        <h3 className="font-display text-xl font-bold text-forest">
          {isBn ? 'অর্ডার করতে গুগল দিয়ে সাইন-ইন করুন' : 'Sign in to add plants to your bag'}
        </h3>

        <p className="mt-2 text-xs text-charcoal/75 leading-relaxed max-w-sm mx-auto">
          {pendingItemName ? (
            <span className="font-semibold text-forest">
              &quot;{pendingItemName}&quot; {isBn ? 'ব্যাগে যুক্ত ও সংরক্ষণ করতে' : 'will be saved to your bag.'}{' '}
            </span>
          ) : null}
          {isBn
            ? 'আপনার অর্ডার হিস্ট্রি ট্র্যাকিং ও দ্রুত হোয়াটসঅ্যাপ ডেলিভারি নিশ্চিত করতে গুগল দিয়ে ১-ক্লিকে সাইন-ইন করুন।'
            : 'Track your order history, save your custom nursery bag, and receive direct WhatsApp confirmation.'}
        </p>

        {/* Benefits list */}
        <div className="my-5 rounded-2xl bg-cream/70 p-3.5 text-left text-xs space-y-1.5 border border-forest/10">
          <div className="flex items-center gap-2 text-forest/90">
            <Check className="size-3.5 text-emerald shrink-0" strokeWidth={3} />
            <span>{isBn ? 'স্বয়ংক্রিয় অর্ডার ট্র্যাকিং ও হিস্ট্রি সংরক্ষণ' : 'Automatic order logging & bag sync'}</span>
          </div>
          <div className="flex items-center gap-2 text-forest/90">
            <Check className="size-3.5 text-emerald shrink-0" strokeWidth={3} />
            <span>{isBn ? 'তাৎক্ষণিক PDF প্রফেশনাল কোটেশন প্রাপ্তি' : 'Instant official PDF plant order list'}</span>
          </div>
        </div>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-forest/20 bg-white py-3 px-4 text-xs font-bold text-forest hover:bg-forest/5 hover:border-emerald transition shadow-md hover:scale-[1.01] active:scale-[0.99]"
        >
          {/* Official Google SVG G-Logo */}
          <svg className="size-4 shrink-0" viewBox="0 0 24 24">
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
          <span>{loading ? (isBn ? 'লগইন হচ্ছে...' : 'Signing in...') : (isBn ? 'গুগল দিয়ে চালিয়ে যান' : 'Continue with Google')}</span>
        </button>

        {/* Guest fallback option */}
        <button
          type="button"
          onClick={handleGuestContinue}
          className="mt-3 text-[0.72rem] text-charcoal/60 hover:text-forest transition underline"
        >
          {isBn ? 'সাইন-ইন ছাড়া সরাসরি ব্যাগে যোগ করুন' : 'Continue as Guest without Sign-in'}
        </button>
      </div>
    </div>
  )
}
