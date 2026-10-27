import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  MessageCircle,
  Share2,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { photos } from '../../data/images'
import { site } from '../../data/site'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Img from '../ui/Img'

export default function BlogReaderModal({ post, onClose }) {
  const { t, lang, n } = useLocale()
  const copy = t.blog
  const closeRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  useEscape(onClose)
  useLockBodyScroll(true)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  if (!post) return null

  const pData = post[lang] || post.bn
  const photo = photos[post.featuredImage] || photos.gardenPath

  const postUrl = `${site.website}/#blog?post=${encodeURIComponent(post.slug)}`

  const handleShare = () => {
    const text = `${pData.title}\n${pData.summary}\n${postUrl}`
    if (navigator.share) {
      navigator.share({ title: pData.title, text: pData.summary, url: postUrl }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
    }
  }

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`*${pData.title}*\n\n${pData.summary}\n\nপড়ুন এখানে: ${postUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      className="fixed inset-0 z-[75] flex items-center justify-center overflow-y-auto bg-forest/80 p-3 backdrop-blur-md sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl ring-1 ring-forest/15">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-forest/10 bg-cream/90 px-5 py-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/[0.08] px-3 py-1 text-xs font-semibold text-forest">
              <BookOpen className="size-3.5 text-emerald" aria-hidden="true" />
              {pData.categoryLabel || copy.eyebrow}
            </span>
            <span className="hidden text-xs text-charcoal/50 sm:inline">·</span>
            <span className="hidden items-center gap-1 text-xs font-medium text-charcoal/70 sm:inline-flex">
              <Clock className="size-3 text-emerald" aria-hidden="true" />
              {n(post.readTime)} {copy.minRead}
            </span>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={copy.closeModal}
            className="grid size-10 place-items-center rounded-full bg-forest text-white transition-colors hover:bg-emerald sm:size-11"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          {/* Breadcrumb & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/70">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5 text-emerald" aria-hidden="true" />
              {copy.publishedOn}: {post.date}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <User className="size-3.5 text-emerald" aria-hidden="true" />
              {pData.author || copy.authorTitle}
            </span>
            <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 font-bold text-emerald">
              {copy.verifiedBadge}
            </span>
          </div>

          {/* Main Title */}
          <h1
            id="blog-modal-title"
            className="mt-4 font-display text-2xl font-bold leading-tight text-forest sm:text-3xl lg:text-4xl"
          >
            {pData.title}
          </h1>

          {/* Summary Lead Box */}
          <div className="mt-4 rounded-2xl border-l-4 border-emerald bg-mint/50 p-4 text-base leading-relaxed text-charcoal/85 sm:p-5 sm:text-lg">
            {pData.summary}
          </div>

          {/* Featured Image */}
          {photo && (
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-soft">
              <Img photo={photo} width={1200} priority />
            </div>
          )}

          {/* Table of Contents / Outline */}
          {pData.sections && pData.sections.length > 0 && (
            <div className="mt-8 rounded-2xl glass-white p-5 ring-1 ring-forest/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-forest">
                <Sparkles className="size-5 text-bloom" aria-hidden="true" />
                {copy.tableOfContents}
              </h2>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {pData.sections.map((sec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-forest/90">
                    <span className="mt-0.5 text-xs font-bold text-emerald">0{idx + 1}.</span>
                    <span>{sec.heading}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Sections */}
          <div className="mt-8 space-y-8">
            {pData.sections?.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-display text-xl font-bold text-forest sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="text-[1.02rem] leading-relaxed text-charcoal/80">
                  {section.content}
                </p>

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="grid gap-2 rounded-2xl bg-white/60 p-4 ring-1 ring-forest/10 sm:p-5">
                    {section.bulletPoints.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-[0.98rem] text-charcoal/85">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Expert Tip Callout */}
                {section.expertTip && (
                  <div className="rounded-2xl border border-amber-300/60 bg-amber-50/70 p-4 text-forest sm:p-5">
                    <div className="flex items-center gap-2 font-display text-sm font-bold text-amber-900">
                      <Sparkles className="size-4 text-amber-600" aria-hidden="true" />
                      {copy.expertAdvice} ({pData.author || copy.authorTitle})
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-amber-950/85">
                      “{section.expertTip}”
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive FAQ Accordion */}
          {pData.faq && pData.faq.length > 0 && (
            <div className="mt-10 border-t border-forest/10 pt-8">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-forest sm:text-2xl">
                <HelpCircle className="size-5 text-emerald" aria-hidden="true" />
                {copy.commonQuestions}
              </h3>
              <div className="mt-4 space-y-3">
                {pData.faq.map((item, fIdx) => {
                  const isOpen = openFaqIndex === fIdx
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-2xl transition-all duration-200 ${
                        isOpen ? 'glass-green-strong shadow-soft' : 'glass-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left font-display text-base font-semibold text-forest sm:px-5"
                      >
                        <span>{item.q}</span>
                        <span className="shrink-0 text-sm font-bold text-emerald">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm leading-relaxed text-charcoal/80 sm:px-5">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {pData.tags && (
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-dashed border-forest/15 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                ট্যাগ / Tags:
              </span>
              {pData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-forest/[0.07] px-3 py-1 text-xs font-medium text-forest"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action CTAs: WhatsApp Consultation & AI Plant Doctor */}
          <div className="mt-8 grid gap-4 rounded-3xl bg-linear-to-br from-mint via-cream to-white p-6 shadow-soft ring-1 ring-forest/15 sm:grid-cols-2">
            <div>
              <p className="font-display text-lg font-bold text-forest">{copy.consultCTA}</p>
              <p className="mt-1 text-sm text-charcoal/70">{pData.authorRole || copy.authorRole}</p>
              <div className="mt-4">
                <Button
                  href={getWhatsAppLink(null, null, lang)}
                  icon={MessageCircle}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  {copy.consultButton}
                </Button>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <p className="font-display text-lg font-bold text-forest">{copy.askDoctor}</p>
              <p className="mt-1 text-sm text-charcoal/70">
                ফোনের ক্যামেরায় ছবি তুলুন, এআই সঙ্গে সঙ্গে রোগ শনাক্ত করে পরামর্শ দেবে।
              </p>
              <div className="mt-4">
                <Button
                  href="#plant-doctor"
                  onClick={onClose}
                  variant="glass"
                  size="sm"
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  উদ্ভিদ ডাক্তার খুলুন
                </Button>
              </div>
            </div>
          </div>

          {/* Social Share & Close Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-forest/10 pt-6">
            <div className="flex items-center gap-2">
              <Button onClick={shareViaWhatsApp} variant="glass" size="sm" icon={Share2}>
                {copy.shareWhatsApp}
              </Button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-forest/15 px-3 py-1.5 text-xs font-semibold text-forest hover:bg-forest/5"
              >
                {copied ? '✓ লিংক কপি হয়েছে!' : 'লিংক কপি'}
              </button>
            </div>

            <Button onClick={onClose} variant="ghost" size="sm">
              {copy.closeModal}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
