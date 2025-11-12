/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://*.privy.io https://*.auth0.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.privy.io https://*.daily.co https://c.daily.co blob:; connect-src 'self' https://*.privy.io https://*.auth0.com https://api.daily.co https://*.daily.co https://c.daily.co https://explorer-api.walletconnect.com wss://*.daily.co; worker-src 'self' blob:;"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig