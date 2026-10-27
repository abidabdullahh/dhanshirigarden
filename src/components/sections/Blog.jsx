import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  User,
} from 'lucide-react'
import { blogCategories, blogPosts, getBlogPostBySlug } from '../../data/blogPosts'
import { photos } from '../../data/images'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import BlogReaderModal from './BlogReaderModal'

export default function Blog() {
  const { t, lang, n } = useLocale()
  const copy = t.blog
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activePostSlug, setActivePostSlug] = useState(null)

  // Listen to hash for direct deep links e.g. #blog?post=slug
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.includes('post=')) {
        const match = hash.match(/post=([^&]+)/)
        if (match && match[1]) {
          setActivePostSlug(decodeURIComponent(match[1]))
        }
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleOpenPost = (slug) => {
    setActivePostSlug(slug)
    try {
      window.history.replaceState(null, '', `#blog?post=${encodeURIComponent(slug)}`)
    } catch {
      // ignore
    }
  }

  const handleClosePost = () => {
    setActivePostSlug(null)
    try {
      window.history.replaceState(null, '', '#blog')
    } catch {
      // ignore
    }
  }

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return blogPosts
    return blogPosts.filter((post) => post.category === selectedCategory)
  }, [selectedCategory])

  const activePost = activePostSlug ? getBlogPostBySlug(activePostSlug) : null

  // Generate structured schema.org JSON-LD for Search Engine Bots
  const blogJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${site.website}/#blog`,
      name: `${site.brand?.name || 'ধানসিঁড়ি গার্ডেন'} - ${copy.title}`,
      description: copy.sub,
      url: `${site.website}/#blog`,
      publisher: {
        '@type': 'LocalBusiness',
        name: 'ধানসিঁড়ি গার্ডেন (Dhanshiri Garden)',
        url: site.website,
        logo: `${site.website}/favicon.svg`,
      },
      blogPost: blogPosts.map((post) => {
        const p = post[lang] || post.bn
        return {
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.summary,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: lang === 'bn' ? 'bn-BD' : 'en-US',
          url: `${site.website}/#blog?post=${post.slug}`,
          keywords: post.meta?.keywords?.join(', '),
          author: {
            '@type': 'Person',
            name: p.author || 'জনাব আমির আলী (Mr. Amir Ali)',
            jobTitle: 'Founder & Chief Agronomy Consultant',
          },
        }
      }),
    }
  }, [copy, lang])

  return (
    <Section id="blog" className="bg-linear-to-b from-transparent via-mint/30 to-transparent">
      {/* Dynamic SEO JSON-LD Script tag in DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={BookOpen}
          title={copy.title}
          sub={copy.sub}
        />

        {/* Category Filter Pills */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {blogCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const label = cat[lang] || cat.bn
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-forest text-white shadow-soft ring-2 ring-forest'
                    : 'glass-white text-forest/80 hover:bg-forest/10 hover:text-forest'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const pData = post[lang] || post.bn
            const photo = photos[post.featuredImage] || photos.gardenPath
            return (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-3xl glass-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-mint">
                  {photo && (
                    <Img
                      photo={photo}
                      width={800}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-forest/85 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-xs">
                      {pData.categoryLabel || copy.eyebrow}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-bloom/90 px-2.5 py-0.5 text-[0.68rem] font-bold text-charcoal shadow-sm">
                      <Sparkles className="size-2.5" aria-hidden="true" />
                      {copy.autoBadge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center justify-between text-xs font-medium text-charcoal/65">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5 text-emerald" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5 text-emerald" aria-hidden="true" />
                      {n(post.readTime)} {copy.minRead}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-forest transition-colors group-hover:text-emerald">
                    <a
                      href={`#blog?post=${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleOpenPost(post.slug)
                      }}
                      className="focus:outline-hidden"
                    >
                      {pData.title}
                    </a>
                  </h3>

                  {/* Summary */}
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-charcoal/75">
                    {pData.summary}
                  </p>

                  {/* Author */}
                  <div className="mt-4 flex items-center gap-2 border-t border-forest/10 pt-3 text-xs text-charcoal/70">
                    <User className="size-3.5 text-emerald" aria-hidden="true" />
                    <span>{pData.author || copy.authorTitle}</span>
                  </div>

                  {/* Tags */}
                  {pData.tags && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {pData.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-mint/80 px-2.5 py-0.5 text-[0.7rem] font-medium text-forest"
                        >
                          <Tag className="size-2 text-emerald" aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => handleOpenPost(post.slug)}
                      className="inline-flex items-center gap-2 font-display text-sm font-bold text-forest transition-colors hover:text-emerald"
                    >
                      <span>{copy.readMore}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl glass-green p-6 text-center sm:p-8">
          <p className="font-display text-lg font-bold text-forest sm:text-xl">
            {copy.consultCTA}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-charcoal/75">
            আমাদের নিজস্ব নার্সারি ও ৩০ বছরের মাঠপর্যায়ের কৃষি পরামর্শক জনাব আমির আলীর সার্বিক তত্ত্বাবধানে আমরা ছাদবাগান, লন ও বাণিজ্যিক বাগান তৈরি ও পরিচর্যা করি।
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="#contact" size="sm">
              আমাদের সাথে যোগাযোগ করুন
            </Button>
            <Button href="#plant-doctor" variant="glass" size="sm" icon={Sparkles}>
              এআই উদ্ভিদ ডাক্তার
            </Button>
          </div>
        </div>
      </Container>

      {/* Full Article Reader Modal */}
      {activePost && <BlogReaderModal post={activePost} onClose={handleClosePost} />}
    </Section>
  )
}
