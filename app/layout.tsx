import './globals.css'
import '../styles/fonts.css'
import '../styles/design-system.css'
import '../styles/figma-responsive.css'
import { Providers } from './providers'
import { GeistMono } from 'geist/font/mono'

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
