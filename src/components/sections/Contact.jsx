import { useState } from 'react'
import { Check, Copy, Mail, MapPin, MessageCircle, Phone, Sprout } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
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
      /* clipboard fallback */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1.5 text-xs font-bold text-emerald transition hover:bg-white"
      aria-live="polite"
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  )
}

function Office({ icon: Icon, title, address, note }) {
  return (
    <div className="rounded-3xl glass-card p-6 shadow-soft border border-white/75">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl glass-emerald text-white shadow-soft">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-forest">{title}</h3>
      </div>
      <address className="mt-4 text-sm not-italic leading-relaxed text-charcoal/85">{address}</address>
      {note && <p className="mt-1.5 text-xs font-semibold text-emerald">{note}</p>}
      <div className="mt-4">
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
    <Section id="contact" compact className="relative isolate overflow-hidden pb-32 md:pb-24">
      {/* Background Glass Lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 -z-10 size-96 rounded-full bg-bright/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-10 -z-10 size-96 rounded-full bg-emerald/20 blur-3xl" />

      <Container>
        <div className="relative overflow-hidden rounded-3xl glass-panel p-7 sm:p-12 lg:p-14 shadow-lift border border-white/85">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 mesh-glow opacity-30" />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider">
                <Sprout className="size-4 text-bloom" aria-hidden="true" />
                {copy.eyebrow}
              </span>
              <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold text-forest leading-tight">{copy.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/80 sm:text-lg">{copy.sub}</p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={getWhatsAppLink(null, null, lang)} size="lg" icon={MessageCircle} variant="primary">
                  {t.actions.whatsapp}
                </Button>
                <Button href={`tel:${site.phones[0].tel}`} variant="glass" size="lg" icon={Phone}>
                  {t.actions.callNow}
                </Button>
              </div>
            </div>

            <ul className="grid content-center gap-3 lg:col-span-5">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="group flex items-center gap-4 rounded-2xl glass-card p-4 transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-soft"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl glass-emerald text-white shadow-soft">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-charcoal/65 font-medium">{phone.label[lang]}</span>
                      <span className="block font-display text-lg font-bold tabular-nums text-forest">{phone.number}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl glass-card p-4 transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-soft"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl glass-emerald text-white shadow-soft">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-charcoal/65 font-medium">{copy.email}</span>
                    <span className="block break-all font-bold text-forest text-sm">{site.email}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dual Location Offices */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Office
            icon={MapPin}
            title={copy.corporate}
            address={copy.dhakaAddress}
            note={copy.dhakaNote}
          />
          <Office
            icon={Sprout}
            title={copy.nursery}
            address={copy.naogaonAddress}
            note={copy.naogaonNote}
          />
        </div>

        {/* Social Follow Bar */}
        {socials.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl glass-card p-5 border border-white/75">
            <span className="text-xs font-bold uppercase tracking-wider text-forest/80 font-mono">
              {lang === 'bn' ? 'সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন' : 'Connect on Social Media'}
            </span>
            <div className="flex items-center gap-2">
              {socials.map((soc) => {
                const Icon = soc.Icon
                return (
                  <a
                    key={soc.key}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="grid size-10 place-items-center rounded-xl glass-pill text-forest transition hover:bg-white hover:scale-105"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}
