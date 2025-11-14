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
        externalWallets: {
          metaMask: { connectionOptions: 'recommendedFirst' },
          walletConnect: { connectionOptions: 'recommendedFirst' },
          rainbow: { connectionOptions: 'recommendedSecond' },
          coinbaseWallet: { connectionOptions: 'recommendedSecond' },
          phantom: { connectionOptions: 'recommended' },
        },
        supportedChains: [
          // Ethereum Mainnet
          { id: 1, name: 'Ethereum', network: 'ethereum', rpcUrls: ['https://mainnet.infura.io/v3/'] },
          // Base
          { id: 8453, name: 'Base', network: 'base', rpcUrls: ['https://mainnet.base.org'] },
          // Base Sepolia
          { id: 84532, name: 'Base Sepolia', network: 'base-sepolia', rpcUrls: ['https://sepolia.base.org'] },
          // HyperLiquid Testnet
          { id: 998, name: 'HyperLiquid Testnet', network: 'hyperliquid-testnet', rpcUrls: ['https://api.hyperliquid-testnet.xyz/evm'] },
        ],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
