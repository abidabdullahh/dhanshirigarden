import { useState } from 'react'
import { CircleHelp, MessageCircle, Plus } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { Container, Section } from '../ui/Section'

function FaqItem({ id, question, answer, open, onToggle }) {
  return (
    <div className={`rounded-3xl transition-all duration-300 border border-white/80 ${open ? 'glass-panel shadow-lift scale-[1.01]' : 'glass-card hover:bg-white'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left font-display text-base font-bold text-forest sm:px-6"
        >
          {question}
          <span
            className={`grid size-8 shrink-0 place-items-center rounded-xl transition duration-300 ${
              open ? 'rotate-45 glass-emerald text-white shadow-soft' : 'glass-pill text-emerald'
            }`}
          >
            <Plus className="size-4" strokeWidth={2.6} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/80 sm:px-6">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const { t, lang } = useLocale()
  const copy = t.faq
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section id="faq" compact className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-20 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-xs font-bold text-forest uppercase tracking-wider">
              <CircleHelp className="size-4 text-bloom" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold text-forest">{copy.title}</h2>
            <div className="mt-6">
              <Button href={getWhatsAppLink(null, null, lang)} icon={MessageCircle} variant="primary">
                {t.actions.whatsapp}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid content-start gap-3 lg:col-span-8">
          {copy.items.map((item, index) => (
            <FaqItem
              key={item.q}
              id={`faq-${index}`}
              question={item.q}
              answer={item.a}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
