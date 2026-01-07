import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | Liquid Calling',
  description: 'Comprehensive guides on anonymous calling, private voice chat, and secure communication.',
}

export default function ResourcesPage() {
  const tags = [
    { name: 'Anonymous Calling', slug: 'anonymous-calling', count: 546, description: 'Private voice communication' },
    { name: 'Privacy', slug: 'privacy', count: 546, description: 'Identity protection guides' },
    { name: 'Browser-Based', slug: 'browser-based', count: 546, description: 'No download solutions' },
    { name: 'Business', slug: 'business', count: 546, description: 'Professional communication' },
    { name: 'Security', slug: 'security', count: 401, description: 'Encrypted communication' },
    { name: 'Crypto Trading', slug: 'crypto-trading', count: 123, description: 'Trading coordination' },
    { name: 'USDC Payments', slug: 'usdc-payments', count: 123, description: 'Crypto payment methods' },
    { name: 'Developers', slug: 'developers', count: 87, description: 'APIs, SDKs & technical integration' },
    { name: 'Reviews', slug: 'reviews', count: 69, description: 'Product comparisons' },
    { name: 'Tutorial', slug: 'tutorial', count: 68, description: 'Step-by-step guides' },
    { name: 'Guide', slug: 'guide', count: 67, description: 'Best practices' },
  ]

  const featuredArticles = [
    {
      title: 'Anonymous Calling for Crypto Traders: Complete Guide',
      slug: 'anonymous-calling-for-crypto-traders-complete-guide',
      category: 'Crypto & Web3',
      readTime: '5 min read',
      description: 'Learn how to protect your identity while coordinating trades and discussing alpha.'
    },
    {
      title: 'How to make anonymous calls Like a Pro in 2026',
      slug: 'how-to-make-anonymous-calls-like-a-pro-in-2026',
      category: 'Tutorials',
      readTime: '4 min read',
      description: 'Complete guide to setting up private voice calls without downloads or registration.'
    },
    {
      title: '7 secure voice communication Apps That Actually Work (2026)',
      slug: '7-secure-voice-communication-apps-that-actually-work-2026',
      category: 'Guides',
      readTime: '3 min read',
      description: 'Best secure calling solutions for privacy-focused professionals.'
    }
  ]

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
          <a href="/" style={{ color: '#000000', textDecoration: 'none' }}>Home</a> → Resources
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
            Liquid Calling Resources
          </h1>
          <p style={{
            fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            color: '#000000',
            lineHeight: 1.6,
            margin: 0
          }}>
            Comprehensive guides on anonymous calling, private voice chat, and secure communication.
          </p>
        </div>

        {/* Featured Articles */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#000000',
            marginBottom: '24px'
          }}>
            Featured Articles
          </h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {featuredArticles.map((article) => (
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
                  {article.category} • {article.readTime}
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
              </a>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#000000',
            marginBottom: '24px'
          }}>
            Browse by Topic
          </h2>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {tags.map((tag) => (
              <a
                key={tag.slug}
                href={`/resources/tag/${tag.slug}`}
                style={{
                  display: 'block',
                  border: '1px solid #000000',
                  background: 'transparent',
                  padding: '20px',
                  textDecoration: 'none',
                  color: '#000000',
                  transition: 'all 0.3s ease'
                }}
                className="tag-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#4f46e5'
                    }} />
                    <h3 style={{
                      fontFamily: 'Britt Sans, Helvetica Neue, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 500,
                      margin: 0
                    }}>
                      {tag.name}
                    </h3>
                  </div>
                  <span style={{
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '0.75rem',
                    opacity: 0.6
                  }}>
                    {tag.count}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'Helvetica Neue, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  opacity: 0.7,
                  margin: 0
                }}>
                  {tag.description}
                </p>
              </a>
            ))}
          </div>
        </section>

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