#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the current articles data
const articlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))

// Function to generate random date between start and end dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Create date range - last 6 months
const endDate = new Date('2026-01-07') // Today
const startDate = new Date('2025-07-01') // 6 months ago

console.log(`Staggering dates between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()}`)

// Get all article slugs and shuffle them
const articleSlugs = Object.keys(articlesData)
const shuffledSlugs = [...articleSlugs].sort(() => Math.random() - 0.5)

// Update each article with a random date
shuffledSlugs.forEach((slug, index) => {
  // Generate a random date for this article
  const randomDate = getRandomDate(startDate, endDate)

  // Update the article's publishedDate
  articlesData[slug].publishedDate = randomDate.toISOString()

  if (index % 50 === 0) {
    console.log(`✓ Updated ${index + 1}/${shuffledSlugs.length} articles...`)
  }
})

// Write the updated data back
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2))

console.log(`\n✅ Successfully staggered dates for ${articleSlugs.length} articles!`)
console.log('Articles now span from July 2025 to January 2026')