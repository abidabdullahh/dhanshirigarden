import { useState } from 'react'
import { Check, Copy, Mail, MapPin, MessageCircle, Phone, Sprout } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, PlanTree, ScissorsDoodle } from '../ui/Doodles'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/Icons'
import { Container, Section } from '../ui/Section'

function CopyButton({ text }) {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard may be blocked; the address stays selectable on the page */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.85rem] font-semibold text-emerald transition-colors hover:bg-mint"
      aria-live="polite"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  )
}

function Office({ icon: Icon, title, address, note }) {
  return (
    <div className="rounded-[2rem] glass-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-mint text-emerald">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg">{title}</h3>
      </div>
      <address className="mt-4 text-[1rem] not-italic leading-body text-charcoal/85">{address}</address>
      {note && <p className="mt-1 text-sm text-emerald">{note}</p>}
      <div className="mt-3 -ml-3">
        <CopyButton text={address} />
      </div>
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useLocale()
  const copy = t.contact
  const company = site.social.company
  const socials = [
    { key: 'facebook', Icon: FacebookIcon, url: company.facebook, label: t.about.founder.facebook },
    { key: 'instagram', Icon: InstagramIcon, url: company.instagram, label: t.about.founder.instagram },
    { key: 'youtube', Icon: YoutubeIcon, url: company.youtube, label: t.about.founder.youtube },
  ].filter((item) => item.url)

  return (
    <Section id="contact" compact className="pb-32 md:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.75rem] glass-green-strong p-7 shadow-lift sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-grid opacity-60" />
          <PlanTree className="pointer-events-none absolute -right-16 -top-16 size-72 text-forest/[0.09]" />
          <LeafDoodle className="pointer-events-none absolute bottom-6 right-8 hidden size-20 rotate-12 animate-sway text-emerald sm:block" />
          <ScissorsDoodle className="pointer-events-none absolute right-40 top-10 hidden size-14 -rotate-12 animate-float text-forest md:block" style={{ '--r': '-12deg' }} />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <span className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-full bg-bloom-soft px-3.5 py-1.5 text-sm font-semibold text-forest ring-1 ring-bloom/35">
                <Sprout className="size-4 text-bloom" aria-hidden="true" />
                {copy.eyebrow}
              </span>
              <h2 className="text-[clamp(1.9rem,4.2vw,3.3rem)]">{copy.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-body text-charcoal/75 sm:text-lg">{copy.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={getWhatsAppLink(null, null, lang)} size="lg" icon={MessageCircle}>
                  {t.actions.whatsapp}
                </Button>
                <Button href={`tel:${site.phones[0].tel}`} variant="white" size="lg" icon={Phone}>
                  {t.actions.callNow}
                </Button>
              </div>
            </div>

            <ul className="grid content-center gap-3 lg:col-span-5">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white/75 px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest text-white">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-charcoal/65">{phone.label[lang]}</span>
                      <span className="block font-display text-xl font-bold tabular-nums text-forest">{phone.number}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white/75 px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest text-white">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-charcoal/65">{copy.email}</span>
                    <span className="block break-all font-semibold text-forest">{site.email}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Office icon={MapPin} title={copy.corporate} address={copy.dhakaAddress} />
          <Office icon={Sprout} title={copy.nursery} address={copy.naogaonAddress} note={copy.nurseryNote} />
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-display text-base font-semibold text-forest">{copy.follow}</span>
            {socials.map(({ key, Icon, url, label }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full glass-green text-forest transition duration-200 hover:-translate-y-0.5 hover:bg-forest hover:text-white"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
