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

  return (
    <footer className="relative border-t border-forest/15 bg-cream/90 pb-28 pt-16 md:pb-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 lg:gap-14">
          {/* Col 1: Brand & Credentials */}
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/75">
              {t.meta.description}
            </p>
            <div className="mt-4 font-mono text-xs text-forest/80">
              <p className="font-bold">DAE CERTIFIED AGRONOMY & URBAN LANDSCAPING</p>
              <p className="mt-1">Founder: Mr. Amir Ali (Former SAAO, DAE)</p>
            </div>
            {site.social?.company?.facebook && (
              <div className="mt-5">
                <a
                  href={site.social.company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dhanshiri Garden on Facebook"
                  className="inline-flex items-center gap-2 rounded-lg border border-forest/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-forest transition hover:bg-forest hover:text-white"
                >
                  <FacebookIcon size={14} />
                  <span>Facebook</span>
                </a>
              </div>
            )}
          </div>

          {/* Col 2: Core Architectural Services */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-forest/70 mb-3">
              {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
            </h4>
            <ul className="space-y-2 text-sm text-charcoal/80">
              <li>
                <a href="#services" className="hover:text-forest transition">
                  {t.servicesMenu.landscapeDesign.title}
                </a>
              </li>
              <li>
                <a href="#rooftop" className="hover:text-forest transition">
                  {t.servicesMenu.rooftop.title}
                </a>
              </li>
              <li>
                <a href="#lawn" className="hover:text-forest transition">
                  {t.servicesMenu.lawn.title}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-forest transition">
                  {t.servicesMenu.verticalGarden.title}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-forest transition font-semibold text-emerald">
                  {t.nav.studio}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Independent Pages & Knowledge Base (Permalinks) */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-forest/70 mb-3">
              {lang === 'bn' ? 'বিশেষ পেজ ও পরামর্শ' : 'Special Pages & Insights'}
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal/80">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/plant-doctor')}
                  className="flex items-center gap-2 font-semibold text-forest hover:text-emerald transition"
                >
                  <span className="size-1.5 rounded-full bg-bloom" />
                  <span>{t.nav.plantDoctor} (AI Diagnosis)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="flex items-center gap-2 font-semibold text-forest hover:text-emerald transition"
                >
                  <span className="size-1.5 rounded-full bg-emerald" />
                  <span>{lang === 'bn' ? 'ব্লগ ও কৃষি প্রবন্ধ সংগ্রহশালা' : 'Agronomy Blog & Research Guides'}</span>
                </button>
              </li>
              <li>
                <a href="#projects" className="hover:text-forest transition">
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#care-plans" className="hover:text-forest transition">
                  {t.nav.carePlans}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-forest transition">
                  {t.nav.contact}
                </a>
              </li>
            </ul>

            <div className="mt-6 border-t border-forest/10 pt-3 text-xs text-charcoal/65">
              <p><strong>{t.contact.corporate}:</strong> {t.contact.dhakaAddress}</p>
              <p className="mt-1"><strong>{t.contact.nursery}:</strong> {t.contact.naogaonAddress}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col gap-2 border-t border-forest/15 pt-6 font-mono text-[0.75rem] text-charcoal/60 md:flex-row md:items-center md:justify-between">
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
