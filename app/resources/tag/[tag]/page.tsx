import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import articlesData from '../../articles-data.json'

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

// Tag mappings for display
const tagMapping: Record<string, { name: string; description: string }> = {
  'anonymous-calling': { name: 'Anonymous Calling', description: 'Private voice communication' },
  'privacy': { name: 'Privacy', description: 'Identity protection guides' },
  'browser-based': { name: 'Browser-Based', description: 'No download solutions' },
  'business': { name: 'Business', description: 'Professional communication' },
  'security': { name: 'Security', description: 'Encrypted communication' },
  'crypto-trading': { name: 'Crypto Trading', description: 'Trading coordination' },
  'usdc-payments': { name: 'USDC Payments', description: 'Crypto payment methods' },
  'reviews': { name: 'Reviews', description: 'Product comparisons' },
  'tutorial': { name: 'Tutorial', description: 'Step-by-step guides' },
  'guide': { name: 'Guide', description: 'Best practices' },
  'developers': { name: 'Developers', description: 'APIs, SDKs & technical integration' }
}

export async function generateStaticParams() {
  return Object.keys(tagMapping).map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tagInfo = tagMapping[params.tag]

  if (!tagInfo) {
    return {
      title: 'Tag Not Found | Liquid Calling Resources'
    }
  }

  return {
    title: `${tagInfo.name} | Liquid Calling Resources`,
    description: `${tagInfo.description}. Learn about anonymous calling and secure communication.`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tagInfo = tagMapping[params.tag]

  if (!tagInfo) {
    notFound()
  }

  // Filter articles by tag - need to match the actual tag names from the articles
  const tagArticles = Object.values(articles).filter(article => {
    if (params.tag === 'developers') {
      // Special filtering for developer articles
      const title = article.title.toLowerCase()
      const content = article.content.toLowerCase()
      return title.includes('api') || title.includes('sdk') || title.includes('webrtc') ||
             title.includes('javascript') || title.includes('react') || title.includes('vue') ||
             title.includes('angular') || title.includes('developer') || title.includes('build') ||
             title.includes('integration') || title.includes('implementation') ||
             content.includes('developer') || content.includes('api') || content.includes('sdk')
    } else {
      // Regular tag matching
      return article.tags.some(tag => tag.toLowerCase().replace(' ', '-') === params.tag)
    }
  })

  return (
    <div className="liquid-app" style={{ background: '#F1F1F5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ position: 'relative', height: '80px', marginBottom: '3rem', paddingTop: '2rem' }}>
          <a
            href="/"
            className="resources-logo"
          >
            Liquid Calling
          </a>

          {/* Try Demo Button */}
          <a
            href="/"
            className="figma-demo-button"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            <span className="figma-button-text">Try Demo</span>
          </a>

          {/* Connect Button */}
          <div className="figma-connect-button">
            <a href="/" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
              Connect
            </a>
          </div>
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
          <a href="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</a> → <a href="/resources" style={{ color: '#000000', textDecoration: 'none' }}>Resources</a> → {tagInfo.name}
        </div>

        {/* Page Header */}
        <div style={{
          border: '1px solid #000000',
          background: 'transparent',
          padding: '48px',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4f46e5'
            }} />
            <h1 style={{
              fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 500,
              color: '#000000',
              margin: 0
            }}>
              {tagInfo.name}
            </h1>
          </div>
          <p style={{
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            color: '#000000',
            lineHeight: 1.6,
            margin: 0
          }}>
            {tagInfo.description}
          </p>
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: '0.875rem',
            color: '#000000',
            opacity: 0.8,
            marginTop: '16px'
          }}>
            {tagArticles.length} articles
          </div>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '48px' }}>
          {tagArticles.map((article) => (
            <a
              key={article.slug}
              href={`/resources/${article.slug}`}
              style={{
                display: 'block',
                border: '1px solid #000000',
                background: 'transparent',
                padding: '24px',
                textDecoration: 'none',
                color: '#000000',
                transition: 'all 0.3s ease'
              }}
              className="article-card"
            >
              <div style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: 0.8,
                marginBottom: '8px'
              }}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })} • {article.readTime}
              </div>
              <h3 style={{
                fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 500,
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                {article.title}
              </h3>
              <p style={{
                fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                opacity: 0.8,
                margin: 0
              }}>
                {article.description}
              </p>
              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '12px'
              }}>
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#000000',
                      background: 'transparent',
                      border: '1px solid #000000',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      opacity: 0.7
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

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