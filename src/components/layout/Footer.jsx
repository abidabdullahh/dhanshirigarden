import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { useRouter } from '../../lib/router'
import { FacebookIcon } from '../ui/Icons'
import { Container } from '../ui/Section'
import Logo from '../ui/Logo'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t, lang, n } = useLocale()
  const { navigate } = useRouter()

  const handleLink = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <footer className="relative border-t border-white/60 glass-panel pb-28 pt-16 md:pb-16 mt-20">
      {/* Diffuse botanical ambient light behind footer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mesh-glow opacity-30 -z-10" />

      <Container>
        <div className="grid gap-10 md:grid-cols-12 lg:gap-14">
          {/* Col 1: Brand & Credentials */}
          <div className="md:col-span-5">
            <a
              href="#/"
              onClick={(e) => handleLink(e, '/')}
              aria-label={t.nav.home}
              className="inline-block transition-transform hover:scale-[1.02]"
            >
              <Logo />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/80">
              {t.meta.description}
            </p>
            <div className="mt-5 rounded-2xl glass-pill p-3.5 text-xs text-forest/90">
              <p className="font-bold tracking-wide">DAE CERTIFIED AGRONOMY & URBAN LANDSCAPING</p>
              <p className="mt-1 text-charcoal/75">Founder: Mr. Amir Ali (Former SAAO, DAE, Ministry of Agriculture)</p>
            </div>
            {site.social?.company?.facebook && (
              <div className="mt-5">
                <a
                  href={site.social.company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dhanshiri Garden on Facebook"
                  className="inline-flex items-center gap-2 rounded-xl glass-pill px-4 py-2 text-xs font-semibold text-forest transition hover:bg-white hover:scale-105"
                >
                  <FacebookIcon size={14} />
                  <span>Facebook Community</span>
                </a>
              </div>
            )}
          </div>

          {/* Col 2: Multi-Page Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest/70 mb-3 font-mono">
              {lang === 'bn' ? 'প্রধান পেজসমূহ' : 'Main Pages'}
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal/80 font-medium">
              <li>
                <a
                  href="#/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="hover:text-emerald transition flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-emerald" />
                  <span>{t.nav.services}</span>
                </a>
              </li>
              <li>
                <a
                  href="#/studio"
                  onClick={(e) => handleLink(e, '/studio')}
                  className="hover:text-emerald transition flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-bright" />
                  <span>{t.nav.studio}</span>
                </a>
              </li>
              <li>
                <a
                  href="#/projects"
                  onClick={(e) => handleLink(e, '/projects')}
                  className="hover:text-emerald transition flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-emerald" />
                  <span>{t.nav.projects}</span>
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-emerald transition flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-emerald" />
                  <span>{t.nav.about}</span>
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-emerald transition flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-emerald" />
                  <span>{t.nav.contact}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Special AI & Knowledge Center */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest/70 mb-3 font-mono">
              {lang === 'bn' ? 'বিশেষ এআই ও গবেষণা' : 'Innovation & Agronomy'}
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal/80">
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLink(e, '/plant-doctor')}
                  className="flex items-center gap-2 font-semibold text-forest hover:text-emerald transition"
                >
                  <span className="size-2 rounded-full bg-bloom animate-ping" />
                  <span>{t.nav.plantDoctor} (AI Diagnosis USP)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLink(e, '/plant-wiki')}
                  className="flex items-center gap-2 font-semibold text-forest hover:text-emerald transition"
                >
                  <span className="size-2 rounded-full bg-emerald" />
                  <span>{lang === 'bn' ? 'উদ্ভিদকোষ ও প্রজাতি শনাক্তকরণ' : 'Plant Wikipedia & Identifier'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLink(e, '/blog')}
                  className="flex items-center gap-2 font-semibold text-forest hover:text-emerald transition"
                >
                  <span className="size-2 rounded-full bg-bright" />
                  <span>{lang === 'bn' ? 'ব্লগ ও কৃষি প্রবন্ধ সংগ্রহশালা' : 'Agronomy Blog & Research Guides'}</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl glass-card p-3.5 text-xs text-charcoal/75 space-y-1.5">
              <p>
                <strong className="text-forest">{t.contact.corporate}:</strong> {t.contact.dhakaAddress}
              </p>
              <p>
                <strong className="text-forest">{t.contact.nursery}:</strong> {t.contact.naogaonAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col gap-2 border-t border-forest/10 pt-6 text-[0.75rem] text-charcoal/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {n(YEAR)} {t.brand.name}. {t.footer.rights}.
          </p>
          <p className="md:text-right">
            {t.footer.designedBy} <span className="text-forest font-semibold">Dhanshiri Landscape Architecture</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
