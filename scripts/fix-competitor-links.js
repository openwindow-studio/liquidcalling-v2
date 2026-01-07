#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the current articles data
const articlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))

// Updated outbound links - REMOVED direct B2B competitors
const safeOutboundLinks = {
  // Crypto/Web3 platforms (complementary, not competing)
  'Base': 'https://base.org',
  'Hyperliquid': 'https://hyperliquid.xyz',
  'Ethereum': 'https://ethereum.org',
  'USDC': 'https://www.centre.io/usdc',
  'Coinbase': 'https://coinbase.com',
  'MetaMask': 'https://metamask.io',
  'Stripe': 'https://stripe.com',

  // Privacy organizations/resources (educational, not competing)
  'Electronic Frontier Foundation': 'https://eff.org',
  'EFF': 'https://eff.org',
  'Privacy International': 'https://privacyinternational.org',
  'GDPR': 'https://gdpr.eu',
  'Tor': 'https://www.torproject.org',

  // Tech standards/protocols (educational)
  'WebRTC': 'https://webrtc.org',
  'Matrix': 'https://matrix.org',

  // General business tools (different market)
  'GitHub': 'https://github.com',
  'Notion': 'https://notion.so',
  'Linear': 'https://linear.app',
  'Slack': 'https://slack.com',

  // Note: REMOVED Wire, Signal, Discord, Zoom, Teams, etc.
  // These are direct competitors in the secure communication space
}

// Competitors to REMOVE links from (but keep the text)
const competitorsToUnlink = [
  'Signal', 'Wire', 'Telegram', 'WhatsApp', 'Discord', 'Skype',
  'Zoom', 'Google Meet', 'Microsoft Teams', 'Teams', 'Element',
  'Jami', 'Wickr', 'Briar', 'Daily.co'
]

// Function to remove competitor links and add safe outbound links
function updateLinks(content) {
  let updatedContent = content

  // First, remove links to direct competitors (keep the text, remove the link)
  competitorsToUnlink.forEach(competitor => {
    const linkRegex = new RegExp(`\\[([^\\]]*${competitor}[^\\]]*)\\]\\([^\\)]+\\)`, 'gi')
    updatedContent = updatedContent.replace(linkRegex, '$1')
  })

  // Then add safe outbound links
  const linkedTerms = new Set()
  const sortedTerms = Object.keys(safeOutboundLinks).sort((a, b) => b.length - a.length)

  sortedTerms.forEach(term => {
    if (!linkedTerms.has(term.toLowerCase())) {
      const regex = new RegExp(`(?<!\\[[^\\]]*?)\\b(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})\\b(?![^\\[]*\\]\\([^\\)]*\\))`, 'i')
      const match = updatedContent.match(regex)
      if (match) {
        updatedContent = updatedContent.replace(regex, `[$1](${safeOutboundLinks[term]})`)
        linkedTerms.add(term.toLowerCase())
      }
    }
  })

  return updatedContent
}

// Function to escape content for JSON
function escapeForJS(str) {
  return str
    .replace(/\\\\/g, '\\\\')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\`/g, '\\`')
    .replace(/\\\\\\$/g, '\\$')
    .replace(/\\n/g, '\\n')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
}

// Update articles
let updatedCount = 0
Object.entries(articlesData).forEach(([slug, article]) => {
  let content = article.content
    .replace(/\\\\n/g, '\n')
    .replace(/\\\\'/g, "'")
    .replace(/\\\\"/g, '"')

  const originalContent = content
  const newContent = updateLinks(content)

  if (newContent !== originalContent) {
    articlesData[slug].content = escapeForJS(newContent)
    updatedCount++

    if (updatedCount % 50 === 0) {
      console.log(`✓ Updated ${updatedCount} articles...`)
    }
  }
})

// Write the updated data back
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2))

console.log(`\n✅ Successfully updated ${updatedCount} articles!`)
console.log('\n🚫 REMOVED links to direct competitors:')
console.log('- Wire, Signal, Discord, Zoom, Teams, etc.')
console.log('- These compete directly with your B2B SDK business')
console.log('\n✅ KEPT links to complementary services:')
console.log('- Crypto platforms (Base, Hyperliquid, USDC)')
console.log('- Privacy organizations (EFF, Privacy International)')
console.log('- Tech standards (WebRTC, Matrix protocol)')
console.log('- Business tools in different markets (GitHub, Notion)')
console.log('\nThis positions you as knowledgeable without promoting direct competition!')