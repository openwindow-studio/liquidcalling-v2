'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export function Providers({ children }: { children: React.ReactNode }) {
  // Access environment variable with proper fallback and trim whitespace
  const envAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const appId = (envAppId || 'cmhp0p924009zky0crejo2od7').trim()

  // Debug logging (reduced for production)
  console.log('Privy App ID loaded:', appId.length === 25 ? 'Valid' : 'Invalid')

  // Validate App ID format
  if (!appId || appId.length < 20) {
    console.error('Invalid Privy App ID detected:', appId)
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple'],
        appearance: {
          theme: 'dark',
          accentColor: '#6366F1',
          logo: '/LCLOGO.png',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}