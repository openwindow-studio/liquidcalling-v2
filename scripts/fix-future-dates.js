#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the current articles data
const articlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))

// Function to generate random date between Jan 1-7, 2026
function getRandomDateEarly2026() {
  const start = new Date('2026-01-01')
  const end = new Date('2026-01-07') // Today
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Find articles with "2026" in title and update their dates to early 2026
let updated = 0

Object.entries(articlesData).forEach(([slug, article]) => {
  if (article.title.includes('2026')) {
    const randomDateEarly2026 = getRandomDateEarly2026()
    articlesData[slug].publishedDate = randomDateEarly2026.toISOString()
    console.log(`✓ Updated "${article.title}" to ${randomDateEarly2026.toLocaleDateString()}`)
    updated++
  }
})

// Write the updated data back
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2))

console.log(`\n✅ Successfully updated ${updated} articles with "2026" in the title to have Jan 1-7, 2026 dates!`)
console.log('All 2026 articles are now published between Jan 1-7, 2026 (recent past)!')