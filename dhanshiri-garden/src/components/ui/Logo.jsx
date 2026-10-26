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
  const { t } = useLocale()
  return (
    <span className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[0.95rem] font-bold min-[390px]:text-[1.02rem] sm:text-[1.15rem] ${light ? 'text-white' : 'text-forest'}`}>
          {t.brand.name}
        </span>
        <span className={`mt-1 hidden text-[0.72rem] font-medium sm:block ${light ? 'text-mint/80' : 'text-emerald/80'}`}>
          {t.brand.tagline}
        </span>
      </span>
    </span>
  )
}
