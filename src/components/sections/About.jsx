import { Globe, Mail, MessageCircle, Phone, Sprout, Users } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { teamPhoto } from '../../lib/teamPhotos'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { CompassDoodle, LeafDoodle, SproutDoodle, TrowelDoodle } from '../ui/Doodles'
import { socialIcons } from '../ui/socialIcons'
import { Container, Section, SectionHeading } from '../ui/Section'

const SOCIAL_KEYS = ['facebook', 'instagram', 'linkedin', 'youtube']
const teamMeta = {
  horticulturist: { Doodle: SproutDoodle, photo: 'horticulturist', tone: 'from-mint to-bright/40' },
  architect: { Doodle: CompassDoodle, photo: 'architect', tone: 'from-[#e6eef2] to-[#c9dbe6]' },
  nurserymen: { Doodle: TrowelDoodle, photo: 'nurserymen', tone: 'from-bloom-soft to-bloom/30' },
}

function FounderPortrait() {
  const { t } = useLocale()
  const copy = t.about.founder
  const src = teamPhoto('amir-ali')

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <div aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-3xl bg-bright/25 blur-sm" />
      <div className="relative h-full overflow-hidden rounded-3xl bg-mint shadow-lift ring-6 ring-white/80">
        {src ? (
          <img src={src} alt={copy.photoAlt} title={copy.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div className="relative grid h-full w-full place-items-center bg-linear-to-br from-mint via-white to-bright/40">
            <svg viewBox="0 0 120 150" className="absolute bottom-0 h-[78%] w-auto text-forest/[0.14]" aria-hidden="true">
              <circle cx="60" cy="44" r="26" fill="currentColor" />
              <path d="M8 150c0-34 22-56 52-56s52 22 52 56z" fill="currentColor" />
            </svg>
            <SproutDoodle className="absolute right-[12%] top-[14%] size-16 animate-sway text-emerald" />
            <p className="absolute inset-x-6 bottom-6 rounded-full glass-pill px-4 py-2 text-center text-sm font-semibold text-forest">
              {copy.photoNote}
            </p>
          </div>
        )}
      </div>
      <span className="absolute -bottom-3 -left-3 -rotate-6 rounded-2xl glass-amber px-4 py-2 font-display text-sm font-bold text-charcoal shadow-soft sm:-left-4">
        {copy.sticker}
      </span>
      <LeafDoodle className="absolute -right-3 -top-4 size-12 rotate-12 animate-float text-emerald" style={{ '--r': '12deg' }} />
    </div>
  )
}

function SocialRow() {
  const { t } = useLocale()
  const copy = t.about.founder
  const links = site.social.founder
  const dev = import.meta.env.DEV

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_KEYS.map((key) => {
        const Icon = socialIcons[key]
        const url = links[key]
        if (!url && !dev) return null
        return (
          <li key={key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy[key]} — ${copy.name}`}
                className="grid size-10 place-items-center rounded-xl glass-pill text-forest transition duration-200 hover:-translate-y-0.5 hover:bg-forest hover:text-white"
              >
                <Icon size={18} />
              </a>
            ) : (
              <span
                title="DEV only: add this URL in src/data/site.js (hidden on the live site until set)"
                className="grid size-10 place-items-center rounded-xl border border-dashed border-forest/30 text-forest/40"
              >
                <Icon size={18} />
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function TeamCard({ memberKey }) {
  const { t, lang } = useLocale()
  const member = t.about.team.members[memberKey]
  const meta = teamMeta[memberKey]
  const src = teamPhoto(meta.photo)
  const Doodle = meta.Doodle

  return (
    <article className="group relative flex flex-col rounded-3xl glass-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift border border-white/75">
      <div className={`relative mb-6 aspect-[5/4] w-full overflow-hidden rounded-2xl bg-linear-to-br ${meta.tone} shadow-inner`}>
        {src ? (
          <img src={src} alt={`${member.role} - ${lang === 'bn' ? 'ধানসিঁড়ি গার্ডেন' : 'Dhanshiri Garden'}`} title={`${member.role} - ${lang === 'bn' ? 'ধানসিঁড়ি গার্ডেন' : 'Dhanshiri Garden'}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Doodle className="size-24 text-forest transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" strokeWidth={2.2} />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-forest">{member.role}</h3>
      <p
        lang={lang === 'bn' ? 'en' : 'bn'}
        style={{ fontFamily: lang === 'bn' ? 'var(--font-body-en)' : 'var(--font-body-bn)' }}
        className="mt-0.5 text-xs font-semibold text-emerald uppercase tracking-wider"
      >
        {member.roleEn}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{member.desc}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {member.skills.map((skill) => (
          <li key={skill} className="rounded-full glass-pill px-3 py-1 text-xs font-semibold text-forest">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function About() {
  const { t, lang } = useLocale()
  const copy = t.about
  const founder = copy.founder
  const phone = site.phones[0]

  return (
    <Section id="about" className="relative isolate overflow-hidden">
      {/* Diffuse background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-40 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-40 -z-10 size-96 rounded-full bg-bloom/20 blur-3xl" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Users} title={copy.title} />

        <div className="relative grid gap-10 rounded-3xl glass-panel p-6 sm:p-10 shadow-lift border border-white/85 lg:grid-cols-12 lg:gap-14 lg:p-12">
          <div className="lg:col-span-5">
            <FounderPortrait />
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1.5 text-xs font-bold text-emerald">
                <Sprout className="size-4" aria-hidden="true" />
                {founder.role}
              </span>
              <a
                href={site.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1.5 text-xs font-semibold text-forest transition hover:bg-white"
              >
                <Globe className="size-3.5" aria-hidden="true" />
                {site.domain}
              </a>
            </div>
            <h3 className="mt-4 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold text-forest">{founder.name}</h3>

            <ul className="mt-4 flex flex-wrap gap-2">
              {founder.creds.map((cred) => (
                <li key={cred} className="rounded-full glass-pill px-3.5 py-1 text-xs font-semibold text-forest">
                  {cred}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3.5 text-base leading-relaxed text-charcoal/85">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl glass-card px-4 py-2.5 text-xs font-medium text-forest">
              <Globe className="size-4 shrink-0 text-emerald" aria-hidden="true" />
              <span>{lang === 'bn' ? 'অফিসিয়াল পোর্টাল:' : 'Official website:'}</span>
              <a
                href={site.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald underline decoration-emerald/50 underline-offset-4 transition hover:text-forest"
              >
                {site.domain}
              </a>
            </div>

            <div className="mt-7 border-t border-forest/10 pt-6">
              <p className="mb-3 font-display text-sm font-bold text-forest">{founder.connect}</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button href={getWhatsAppLink(null, null, lang)} icon={MessageCircle} variant="primary">
                  {founder.whatsapp}
                </Button>
                <Button href={`tel:${phone.tel}`} variant="glass" icon={Phone}>
                  {founder.call}
                </Button>
                <Button href={`mailto:${site.email}`} variant="outline" icon={Mail}>
                  {founder.email}
                </Button>
              </div>
              <div className="mt-4">
                <SocialRow />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="mb-8 max-w-2xl">
            <h3 className="text-2xl sm:text-[2rem] font-bold text-forest">{copy.team.title}</h3>
            <p className="mt-2 text-base text-charcoal/75">{copy.team.sub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
            {Object.keys(copy.team.members).map((key) => (
              <TeamCard key={key} memberKey={key} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-charcoal/60">{copy.team.footnote}</p>
        </div>
      </Container>
    </Section>
  )
}
