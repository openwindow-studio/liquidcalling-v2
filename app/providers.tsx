'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export function Providers({ children }: { children: React.ReactNode }) {
  // Access environment variable with proper fallback
  const envAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const appId = envAppId || 'cmhp0p924009zky0crejo2od7'

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
