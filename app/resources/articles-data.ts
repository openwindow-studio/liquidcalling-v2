// Generated articles data
export interface Article {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedDate: string
  readTime: string
  content: string
}

// This will be populated with the generated articles
export const articles: Record<string, Article> = {}

// Load articles from the generated files
export async function loadArticles() {
  try {
    const fs = await import('fs')
    const path = await import('path')

    // Read the articles index
    const indexPath = path.join(process.cwd(), 'resources/generated_articles/articles_index.json')
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))

    // Load each article
    for (const metadata of indexData.slice(0, 20)) { // Start with first 20 articles
      const articlePath = path.join(process.cwd(), `resources/generated_articles/${metadata.slug}.md`)

      if (fs.existsSync(articlePath)) {
        const content = fs.readFileSync(articlePath, 'utf-8')

        // Extract tags from content
        const tags = []
        if (content.includes('crypto') || content.includes('trading')) tags.push('Crypto Trading')
        if (content.includes('browser') || content.includes('web')) tags.push('Browser-Based')
        if (content.includes('privacy') || content.includes('anonymous')) tags.push('Privacy')
        if (content.includes('business') || content.includes('professional')) tags.push('Business')
        if (content.includes('secure') || content.includes('encryption')) tags.push('Security')

        // Ensure we have at least 3 tags
        if (tags.length < 3) {
          const defaultTags = ['Anonymous Calling', 'Private Voice', 'Secure Communication']
          tags.push(...defaultTags.slice(0, 3 - tags.length))
        }

        articles[metadata.slug] = {
          slug: metadata.slug,
          title: metadata.title,
          description: metadata.meta_description || metadata.title,
          category: metadata.category,
          tags: tags.slice(0, 5), // Max 5 tags
          publishedDate: metadata.published_date,
          readTime: `${metadata.read_time} min read`,
          content: content
        }
      }
    }
  } catch (error) {
    console.error('Failed to load articles:', error)
  }
}

// Initialize articles on module load
if (typeof window === 'undefined') {
  loadArticles()
}

export const articleSlugs = Object.keys(articles)
export const getArticle = (slug: string) => articles[slug]
export const getAllArticles = () => Object.values(articles)