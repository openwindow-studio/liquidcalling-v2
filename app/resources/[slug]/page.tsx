import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import articlesData from '../articles-data.json'

// Article data interface
interface Article {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedDate: string
  readTime: string
  content: string
}

// Type the imported data
const articles = articlesData as Record<string, Article>

// Category mappings for display
const categoryMapping: Record<string, string> = {
  'listicle': 'GUIDES',
  'how_to': 'TUTORIALS',
  'comparison': 'REVIEWS',
  'ultimate_guide': 'COMPLETE GUIDES',
  'location_based': 'REGIONAL',
  'crypto_focused': 'CRYPTO & WEB3'
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug]

  if (!article) {
    return {
      title: 'Article Not Found | Liquid Calling Resources'
    }
  }

  return {
    title: `${article.title} | Liquid Calling Resources`,
    description: article.description,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]

  if (!article) {
    notFound()
  }

  const displayCategory = categoryMapping[article.category] || article.category.toUpperCase()

  return (
    <div className="liquid-app" style={{ background: '#F1F1F5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ position: 'relative', height: '80px', marginBottom: '3rem', paddingTop: '2rem' }}>
          <a
            href="/"
            style={{
              position: 'absolute',
              left: '60px',
              top: '20px',
              fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
              fontSize: '18px',
              color: '#000000',
              textDecoration: 'none'
            }}
          >
            Liquid Calling
          </a>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumbs */}
        <div style={{
          fontFamily: 'Helvetica Neue, sans-serif',
          fontSize: '0.875rem',
          color: '#000000',
          marginBottom: '2rem'
        }}>
          <a href="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</a> → <a href="/resources" style={{ color: '#000000', textDecoration: 'none' }}>Resources</a> → {article.title}
        </div>

        {/* Article */}
        <article style={{
          border: '1px solid #000000',
          background: 'transparent',
          marginBottom: '32px'
        }}>
          {/* Article Header */}
          <header style={{
            padding: '48px',
            borderBottom: '1px solid #000000'
          }}>
            <h1 style={{
              fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 500,
              color: '#000000',
              marginBottom: '32px',
              lineHeight: 1.2,
              margin: '0 0 32px 0'
            }}>
              {article.title}
            </h1>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              fontSize: '0.875rem',
              color: '#000000',
              marginBottom: '24px'
            }}>
              <time style={{
                fontFamily: 'Geist Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                opacity: 0.8
              }}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).toUpperCase()}
              </time>
              <span style={{
                fontFamily: 'Geist Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                opacity: 0.8
              }}>
                {article.readTime}
              </span>
            </div>

            <a
              href={`/resources/category/${article.category}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #000000',
                background: 'transparent',
                color: '#000000',
                padding: '6px 12px',
                fontFamily: 'Geist Mono, monospace',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#4f46e5'
              }} />
              {displayCategory}
            </a>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '16px'
            }}>
              {article.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/resources/tag/${tag.toLowerCase().replace(' ', '-')}`}
                  style={{
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#000000',
                    background: 'transparent',
                    border: '1px solid #000000',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tag}
                </a>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div style={{
            padding: '48px'
          }}>
            <div
              style={{
                fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#000000'
              }}
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/\\n/g, '\n') // Convert escaped newlines back to actual newlines
                  .replace(/\\'/g, "'") // Fix escaped apostrophes
                  .replace(/^# (.+)$/gm, '<h1 style="font-family: \'Britt Sans\', \'Helvetica Neue\', sans-serif; font-size: 1.5rem; font-weight: 500; margin: 48px 0 24px 0; border-bottom: 1px solid #000000; padding-bottom: 8px;">$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2 style="font-family: \'Britt Sans\', \'Helvetica Neue\', sans-serif; font-size: 1.25rem; font-weight: 500; margin: 48px 0 24px 0; border-bottom: 1px solid #000000; padding-bottom: 8px;">$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3 style="font-family: \'Britt Sans\', \'Helvetica Neue\', sans-serif; font-size: 1.25rem; font-weight: 500; margin: 32px 0 16px 0;">$1</h3>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #4f46e5; text-decoration: none; border-bottom: 1px solid #4f46e5;">$1</a>') // Convert markdown links to HTML
                  .replace(/^- (.+)$/gm, '<li style="margin-bottom: 8px;">$1</li>')
                  .replace(/(?:^<li.*<\/li>\s*)+/gms, (match) => `<ul style="margin: 24px 0; padding-left: 24px;">${match}</ul>`)
                  .replace(/^\d+\. (.+)$/gm, '<li style="margin-bottom: 8px;">$1</li>')
                  .replace(/(?:^<li.*<\/li>\s*)+/gms, (match) => `<ol style="margin: 24px 0; padding-left: 24px;">${match}</ol>`)
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^([^<\n].*)$/gm, '<p style="margin-bottom: 24px;">$1</p>')
                  .replace(/\n\n+/g, '\n')
              }}
            />
          </div>
        </article>

        {/* CTA Section */}
        <div style={{
          border: '1px solid #000000',
          background: 'transparent',
          padding: '2rem',
          textAlign: 'center',
          margin: '3rem 0'
        }}>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 48px',
              backgroundColor: 'rgba(0, 0, 31, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: '0.3s',
              margin: '1rem 0'
            }}
          >
            Start Calling
          </a>
          <div style={{
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '0.875rem',
            color: '#000000',
            opacity: 0.7,
            marginTop: '0.5rem'
          }}>
            No signup • No downloads • Start in 3 clicks
          </div>
        </div>
      </div>
    </div>
  )
}