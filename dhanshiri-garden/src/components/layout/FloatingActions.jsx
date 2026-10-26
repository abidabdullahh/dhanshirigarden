import { ArrowUp, MessageCircle, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { useScrollProgress } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'

/**
 * Desktop: a WhatsApp pill (and back-to-top once scrolled) bottom-right.
 * Mobile: a thumb-reach bar with the two actions customers actually use — call and WhatsApp.
 */
export default function FloatingActions() {
  const { t, lang } = useLocale()
  const { progress } = useScrollProgress()
  const whatsapp = getWhatsAppLink(null, null, lang)
  const phone = site.phones[0]
  const showTop = progress > 0.08

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <button
          type="button"
          aria-label={t.actions.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`grid size-11 place-items-center rounded-full glass-white text-forest shadow-soft transition duration-300 hover:-translate-y-0.5 ${
            showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
          tabIndex={showTop ? 0 : -1}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-forest py-3 pl-4 pr-5 text-[0.95rem] font-semibold text-white shadow-lift transition duration-300 hover:-translate-y-1 hover:bg-emerald"
        >
          <MessageCircle className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
          {t.actions.whatsapp}
        </a>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full glass-white p-1.5 shadow-lift md:hidden">
        <a
          href={`tel:${phone.tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-mint py-3 text-[0.95rem] font-semibold text-forest"
        >
          <Phone className="size-[1.1em]" aria-hidden="true" />
          {t.actions.callNow}
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest py-3 text-[0.95rem] font-semibold text-white"
        >
          <MessageCircle className="size-[1.1em]" aria-hidden="true" />
          {t.actions.whatsapp}
        </a>
      </div>
    </>
  )
}
