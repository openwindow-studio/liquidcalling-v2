#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the current articles data
const articlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))

// Get all article slugs by topic for linking
const articlesByTopic = {
  'crypto': [],
  'business': [],
  'anonymous': [],
  'security': [],
  'privacy': [],
  'browser': [],
  'web3': []
}

// Categorize articles for intelligent linking
Object.entries(articlesData).forEach(([slug, article]) => {
  const title = article.title.toLowerCase()
  const content = article.content.toLowerCase()

  if (title.includes('crypto') || title.includes('trading') || title.includes('defi') || title.includes('web3')) {
    articlesByTopic.crypto.push({ slug, title: article.title })
  }
  if (title.includes('business') || title.includes('enterprise') || title.includes('professional')) {
    articlesByTopic.business.push({ slug, title: article.title })
  }
  if (title.includes('anonymous') || title.includes('anonymity')) {
    articlesByTopic.anonymous.push({ slug, title: article.title })
  }
  if (title.includes('secure') || title.includes('security') || title.includes('encrypted')) {
    articlesByTopic.security.push({ slug, title: article.title })
  }
  if (title.includes('privacy') || title.includes('private')) {
    articlesByTopic.privacy.push({ slug, title: article.title })
  }
  if (title.includes('browser') || content.includes('browser-based')) {
    articlesByTopic.browser.push({ slug, title: article.title })
  }
  if (title.includes('web3') || title.includes('dao') || title.includes('nft')) {
    articlesByTopic.web3.push({ slug, title: article.title })
  }
})

// Function to add relevant internal links to content
function addInternalLinks(content, currentSlug) {
  let updatedContent = content

  // Add links to related topics
  const linkPatterns = [
    {
      pattern: /\b(anonymous calling|anonymous voice calls)\b/gi,
      getLink: () => {
        const related = articlesByTopic.anonymous.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[anonymous calling](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(crypto trading|trading coordination)\b/gi,
      getLink: () => {
        const related = articlesByTopic.crypto.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[crypto trading](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(secure business calls|business communication)\b/gi,
      getLink: () => {
        const related = articlesByTopic.business.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[secure business calls](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(browser-based calling|browser-based)\b/gi,
      getLink: () => {
        const related = articlesByTopic.browser.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[browser-based calling](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(voice privacy|privacy protection)\b/gi,
      getLink: () => {
        const related = articlesByTopic.privacy.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[voice privacy](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(encrypted communication|encrypted calls)\b/gi,
      getLink: () => {
        const related = articlesByTopic.security.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[encrypted communication](/resources/${randomArticle.slug})`
        }
        return null
      }
    },
    {
      pattern: /\b(Web3 voice chat|DAO governance)\b/gi,
      getLink: () => {
        const related = articlesByTopic.web3.filter(a => a.slug !== currentSlug)
        if (related.length > 0) {
          const randomArticle = related[Math.floor(Math.random() * related.length)]
          return `[Web3 voice chat](/resources/${randomArticle.slug})`
        }
        return null
      }
    }
  ]

  // Apply link patterns (but only once per pattern to avoid over-linking)
  linkPatterns.forEach(({ pattern, getLink }) => {
    const matches = updatedContent.match(pattern)
    if (matches && matches.length > 0) {
      const link = getLink()
      if (link) {
        // Replace only the first occurrence to avoid over-linking
        updatedContent = updatedContent.replace(pattern, link)
      }
    }
  })

  // Add a "Related Articles" section at the end
  const relatedLinks = []

  // Get related articles from the same topics
  const currentTitle = Object.values(articlesData).find(a => a.slug === currentSlug)?.title.toLowerCase() || ''

  if (currentTitle.includes('crypto') || currentTitle.includes('trading')) {
    const related = articlesByTopic.crypto.filter(a => a.slug !== currentSlug).slice(0, 2)
    relatedLinks.push(...related)
  }
  if (currentTitle.includes('business') || currentTitle.includes('professional')) {
    const related = articlesByTopic.business.filter(a => a.slug !== currentSlug).slice(0, 2)
    relatedLinks.push(...related)
  }
  if (currentTitle.includes('anonymous')) {
    const related = articlesByTopic.anonymous.filter(a => a.slug !== currentSlug).slice(0, 2)
    relatedLinks.push(...related)
  }

  // Add random related articles if we don't have enough
  if (relatedLinks.length < 3) {
    const allArticles = Object.entries(articlesData).filter(([slug]) => slug !== currentSlug)
    const shuffled = allArticles.sort(() => Math.random() - 0.5).slice(0, 3 - relatedLinks.length)
    relatedLinks.push(...shuffled.map(([slug, article]) => ({ slug, title: article.title })))
  }

  if (relatedLinks.length > 0) {
    updatedContent += '\\n\\n## Related Articles\\n\\n'
    relatedLinks.slice(0, 3).forEach(article => {
      updatedContent += `- [${article.title}](/resources/${article.slug})\\n`
    })
  }

  return updatedContent
}

// Function to escape content for JSON
function escapeForJS(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

// Update articles with internal links
let updatedCount = 0
Object.entries(articlesData).forEach(([slug, article]) => {
  // Unescape content for processing
  let content = article.content
    .replace(/\\n/g, '\n')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')

  const originalContent = content
  const newContent = addInternalLinks(content, slug)

  if (newContent !== originalContent) {
    articlesData[slug].content = escapeForJS(newContent)
    updatedCount++

    if (updatedCount % 50 === 0) {
      console.log(`✓ Added links to ${updatedCount} articles...`)
    }
  }
})

// Write the updated data back
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2))

console.log(`\n✅ Successfully added internal links to ${updatedCount} articles!`)
console.log('Internal linking will help with SEO and user engagement.')
console.log('\nLink types added:')
console.log('- Contextual links within article content')
console.log('- Related articles section at the end of each article')
console.log('- Topic-based intelligent linking')