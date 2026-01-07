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

// Category mappings for display
const categoryMapping: Record<string, { name: string; description: string }> = {
  'listicle': { name: 'Guides', description: 'Best practices and tool recommendations' },
  'how_to': { name: 'Tutorials', description: 'Step-by-step setup instructions' },
  'comparison': { name: 'Reviews', description: 'Product comparisons and alternatives' },
  'ultimate_guide': { name: 'Complete Guides', description: 'In-depth comprehensive resources' },
  'location_based': { name: 'Regional', description: 'Location-specific information' },
  'crypto_focused': { name: 'Crypto & Web3', description: 'Blockchain and crypto trading guides' }
}

export async function generateStaticParams() {
  return Object.keys(categoryMapping).map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryInfo = categoryMapping[params.category]

  if (!categoryInfo) {
    return {
      title: 'Category Not Found | Liquid Calling Resources'
    }
  }

  return {
    title: `${categoryInfo.name} | Liquid Calling Resources`,
    description: `${categoryInfo.description}. Learn about anonymous calling and secure communication.`,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = categoryMapping[params.category]

  if (!categoryInfo) {
    notFound()
  }

  // Filter articles by category
  const categoryArticles = Object.values(articles).filter(article => article.category === params.category)

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
          <a href="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</a> → <a href="/resources" style={{ color: '#000000', textDecoration: 'none' }}>Resources</a> → {categoryInfo.name}
        </div>

        {/* Page Header */}
        <div style={{
          border: '1px solid #000000',
          background: 'transparent',
          padding: '48px',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#000000',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            {categoryInfo.name}
          </h1>
          <p style={{
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            color: '#000000',
            lineHeight: 1.6,
            margin: 0
          }}>
            {categoryInfo.description}
          </p>
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: '0.875rem',
            color: '#000000',
            opacity: 0.8,
            marginTop: '16px'
          }}>
            {categoryArticles.length} articles
          </div>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '48px' }}>
          {categoryArticles.map((article) => (
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