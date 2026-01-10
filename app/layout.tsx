import './globals.css'
import '../styles/fonts.css'
import '../styles/design-system-v2.css'
import '../styles/torus-animation.css'
import { Providers } from './providers'
import { GeistMono } from 'geist/font/mono'

// Force dynamic rendering to avoid Privy build-time errors
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
