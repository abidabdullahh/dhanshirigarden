import { ArrowUp, MessageCircle } from 'lucide-react'
import { useScrollProgress } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'

export default function FloatingActions() {
  const { t, lang } = useLocale()
  const { progress } = useScrollProgress()
  const whatsapp = getWhatsAppLink(null, null, lang)
  const showTop = progress > 0.08

  return (
    <div className="fixed bottom-12 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Scroll to Top */}
      <button
        type="button"
        aria-label={t.actions.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`grid size-11 place-items-center rounded-full bg-white/90 border border-forest/15 text-forest shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white hover:-translate-y-0.5 ${
          showTop ? 'translate-y-0 opacity-100 scale-100' : 'pointer-events-none translate-y-4 opacity-0 scale-75'
        }`}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp className="size-4" />
      </button>

      {/* Floating WhatsApp Action Pill */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.actions.whatsapp}
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba59]"
      >
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-35 blur-xs group-hover:opacity-60 transition" />
        <MessageCircle className="relative size-5" />
        <span className="relative hidden font-display text-xs font-bold uppercase tracking-wider sm:inline">
          {t.actions.whatsapp}
        </span>
      </a>
    </div>
  )
}
