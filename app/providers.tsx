'use client'

import { PrivyProvider } from '@privy-io/react-auth'

export function Providers({ children }: { children: React.ReactNode }) {
  // Use the app ID directly - Next.js will replace this at build time
  const appId = 'cmhp0p924009zky0crejo2od7'

  console.log('Privy config:', { appId })

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
        supportedChains: [
          // Ethereum Mainnet
          { id: 1, name: 'Ethereum', network: 'ethereum', rpcUrls: ['https://mainnet.infura.io/v3/'] },
          // Base
          { id: 8453, name: 'Base', network: 'base', rpcUrls: ['https://mainnet.base.org'] },
          // Hyperliquid Mainnet
          { id: 999, name: 'Hyperliquid', network: 'hyperliquid', rpcUrls: ['https://rpc.hyperliquid.xyz/evm'] },
        ],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
