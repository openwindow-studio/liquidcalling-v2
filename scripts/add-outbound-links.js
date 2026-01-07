#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read the current articles data
const articlesPath = path.join(__dirname, '../app/resources/articles-data.json')
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))

// Outbound link mappings - competitors and relevant services
const outboundLinks = {
  // Direct competitors (voice/video calling)
  'Signal': 'https://signal.org',
  'Wire': 'https://wire.com',
  'Telegram': 'https://telegram.org',
  'WhatsApp': 'https://www.whatsapp.com',
  'Discord': 'https://discord.com',
  'Skype': 'https://www.skype.com',
  'Zoom': 'https://zoom.us',
  'Google Meet': 'https://meet.google.com',
  'Microsoft Teams': 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',
  'Teams': 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',

  // Privacy/Security tools
  'Element': 'https://element.io',
  'Matrix': 'https://matrix.org',
  'Jami': 'https://jami.net',
  'Wickr': 'https://wickr.com',
  'Briar': 'https://briarproject.org',
  'Tor': 'https://www.torproject.org',

  // Crypto/Web3 platforms
  'Base': 'https://base.org',
  'Hyperliquid': 'https://hyperliquid.xyz',
  'Ethereum': 'https://ethereum.org',
  'USDC': 'https://www.centre.io/usdc',
  'Coinbase': 'https://coinbase.com',
  'MetaMask': 'https://metamask.io',
  'Stripe': 'https://stripe.com',

  // Business/Enterprise tools
  'Slack': 'https://slack.com',
  'GitHub': 'https://github.com',
  'Notion': 'https://notion.so',
  'Linear': 'https://linear.app',

  // Privacy organizations/resources
  'Electronic Frontier Foundation': 'https://eff.org',
  'EFF': 'https://eff.org',
  'Privacy International': 'https://privacyinternational.org',
  'GDPR': 'https://gdpr.eu',

  // Tech resources
  'WebRTC': 'https://webrtc.org',
  'Daily.co': 'https://www.daily.co',
}

// Function to add outbound links contextually
function addOutboundLinks(content) {
  let updatedContent = content

  // Track which terms we've already linked to avoid over-linking
  const linkedTerms = new Set()

  // Sort by length (longest first) to avoid partial matches
  const sortedTerms = Object.keys(outboundLinks).sort((a, b) => b.length - a.length)

  sortedTerms.forEach(term => {
    // Only link if we haven't already linked this term
    if (!linkedTerms.has(term.toLowerCase())) {
      // Create regex that matches the term as a whole word, case insensitive
      // But avoid matching if it's already inside a markdown link
      const regex = new RegExp(`(?<!\\[[^\\]]*?)\\b(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})\\b(?![^\\[]*\\]\\([^\\)]*\\))`, 'i')

      const match = updatedContent.match(regex)
      if (match) {
        // Replace only the first occurrence to avoid over-linking
        updatedContent = updatedContent.replace(regex, `[$1](${outboundLinks[term]})`)
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

// Update articles with outbound links
let updatedCount = 0
Object.entries(articlesData).forEach(([slug, article]) => {
  // Unescape content for processing
  let content = article.content
    .replace(/\\\\n/g, '\n')
    .replace(/\\\\'/g, "'")
    .replace(/\\\\"/g, '"')

  const originalContent = content
  const newContent = addOutboundLinks(content)

  if (newContent !== originalContent) {
    articlesData[slug].content = escapeForJS(newContent)
    updatedCount++

    if (updatedCount % 20 === 0) {
      console.log(`✓ Added outbound links to ${updatedCount} articles...`)
    }
  }
})

// Write the updated data back
fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2))

console.log(`\n✅ Successfully added outbound links to ${updatedCount} articles!`)
console.log('Outbound linking benefits:')
console.log('- Shows comprehensive, unbiased research')
console.log('- Builds trust and authority')
console.log('- Helps with SEO (Google likes sites that link out)')
console.log('- Positions you as industry expert who knows the landscape')
console.log('\nLinked to competitors and relevant services:')
console.log('- Voice/video calling platforms (Signal, Wire, Zoom, etc.)')
console.log('- Crypto platforms (Base, Hyperliquid, USDC)')
console.log('- Privacy tools and organizations')
console.log('- Business tools and enterprise solutions')