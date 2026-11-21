import { useLocale } from '../../lib/locale'

export function LogoMark({ className = 'size-9 sm:size-10' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#1b4332" />
      <path d="M9 23c0-8 5-13 13-14-1 8-6 13-13 14z" fill="#52b788" />
      <path d="M9 23c2-6 5-9 10-11" stroke="#f8f9fa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ className = '', light = false }) {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sutonny text-[1.12rem] sm:text-[1.28rem] font-bold tracking-tight ${
            light ? 'text-white' : 'text-[#1b4332]'
          }`}
        >
          ধানসিঁড়ি গার্ডেন
        </span>
        <span
          className={`mt-1 text-[0.72rem] sm:text-[0.76rem] font-semibold tracking-wide ${
            light ? 'text-mint/90' : 'text-[#2d6a4f]'
          }`}
        >
          {isBn ? 'ল্যান্ডস্কেপ ও ছাদবাগান বিশেষজ্ঞ' : 'Landscape Architecture & Nursery'}
        </span>
      </span>
    </span>
  )
}
