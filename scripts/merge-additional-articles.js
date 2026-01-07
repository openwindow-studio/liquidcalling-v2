#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the new articles index
const indexPath = path.join(__dirname, '../resources/generated_articles/articles_index.json')
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))

// Read existing articles data
const existingArticlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const existingArticles = JSON.parse(fs.readFileSync(existingArticlesPath, 'utf-8'))

// Function to safely escape strings for JavaScript
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

// Generate tag based on content
function generateTags(content, title, category) {
  const tags = new Set()

  // Base tags
  tags.add('Anonymous Calling')
  tags.add('Privacy')

  // Content-based tags
  if (content.includes('crypto') || content.includes('trading') || title.toLowerCase().includes('crypto')) {
    tags.add('Crypto Trading')
    tags.add('USDC Payments')
  }
  if (content.includes('browser') || title.toLowerCase().includes('browser')) {
    tags.add('Browser-Based')
  }
  if (content.includes('business') || title.toLowerCase().includes('business')) {
    tags.add('Business')
  }
  if (content.includes('secure') || content.includes('encryption')) {
    tags.add('Security')
  }
  if (content.includes('web3') || content.includes('dao') || content.includes('defi')) {
    tags.add('Web3')
  }

  // Category-specific tags
  if (category === 'how_to') {
    tags.add('Tutorial')
  } else if (category === 'comparison') {
    tags.add('Reviews')
  } else if (category === 'listicle') {
    tags.add('Guide')
  }

  return Array.from(tags).slice(0, 6)
}

// Function to generate random date between start and end dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Date ranges
const endDate = new Date('2026-01-07')
const startDate = new Date('2025-07-01')
const startDate2026 = new Date('2026-01-01')
const endDate2026 = new Date('2026-12-31')

// Process new articles
const newArticles = {}
let processedCount = 0

console.log(`Processing ${indexData.length} new articles...`)

for (const metadata of indexData) {
  // Skip if article already exists
  if (existingArticles[metadata.slug]) {
    console.log(`Skipping existing article: ${metadata.title}`)
    continue
  }

  try {
    const articlePath = path.join(__dirname, `../resources/generated_articles/${metadata.slug}.md`)

    if (fs.existsSync(articlePath)) {
      const content = fs.readFileSync(articlePath, 'utf-8')

      // Clean content of template artifacts
      const conclusions = [
        'In an era where digital privacy is increasingly rare, Liquid Calling offers a refreshing approach to secure communication. With its browser-based platform, pay-per-use model, and commitment to anonymity, it\'s the perfect solution for anyone who values their privacy.',
        'Whether you\'re a business professional handling sensitive calls or simply someone who values privacy, Liquid Calling provides the tools you need for secure, anonymous voice communication.',
        'The future of private communication is browser-based, anonymous, and accessible to everyone. No downloads, no accounts, no compromises on privacy.',
        'Privacy shouldn\'t come at the cost of convenience. With Liquid Calling, you get secure voice communication that works instantly in your browser.',
        'As digital privacy becomes more important than ever, browser-based anonymous calling represents the next evolution in secure communication technology.'
      ]
      const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)]

      const cleanContent = content
        .replace(/\{conclusion_text\}/g, randomConclusion)
        .replace(/\{datetime\.now\(\)\.strftime\("[^"]*"\)\}/g, 'December 2025')
        .replace(/\{[^}]*\}/g, '') // Remove any other template placeholders
        .replace(/\\'/g, "'") // Fix escaped apostrophes

      const tags = generateTags(cleanContent, metadata.title, metadata.category)

      // Generate appropriate date
      let randomDate
      if (metadata.title.includes('2026')) {
        randomDate = getRandomDate(startDate2026, endDate2026)
      } else {
        randomDate = getRandomDate(startDate, endDate)
      }

      newArticles[metadata.slug] = {
        slug: metadata.slug,
        title: metadata.title,
        description: metadata.meta_description || `${metadata.title}. Learn about anonymous calling and secure communication.`,
        category: metadata.category,
        tags: tags,
        publishedDate: randomDate.toISOString(),
        readTime: `${metadata.read_time} min read`,
        content: escapeForJS(cleanContent)
      }

      processedCount++
      console.log(`✓ ${metadata.title}`)
    }
  } catch (error) {
    console.error(`✗ Failed to convert ${metadata.title}:`, error.message)
  }
}

// Merge with existing articles
const mergedArticles = { ...existingArticles, ...newArticles }

// Create the updated articles data file
fs.writeFileSync(existingArticlesPath, JSON.stringify(mergedArticles, null, 2))

console.log(`\n✅ Successfully added ${processedCount} new articles!`)
console.log(`Total articles now: ${Object.keys(mergedArticles).length}`)
console.log('New articles integrated into articles-data.json')