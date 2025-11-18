import { base } from 'viem/chains'

// Privy configuration for LiquidCalling
export const privyConfig = {
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmhp0p924009zky0crejo2od7',
  config: {
    // Wallet configuration
    loginMethods: ['email', 'wallet', 'google'] as const, // 'apple' - commented out, takes weeks to set up

    // Explicitly disable OAuth providers
    disabledLoginMethods: ['apple'] as const,

    // Appearance
    appearance: {
      theme: 'dark' as const,
      accentColor: '#6366F1' as const,
      logo: '/LCLOGO.png',
    },

    // Embedded wallets (no MetaMask needed!)
    embeddedWallets: {
      ethereum: {
        createOnLogin: 'users-without-wallets' as const, // Auto-create wallet for email/social users
      },
    },

    // Enable test accounts for development
    testMode: process.env.NODE_ENV === 'development',

    // Default to Base and force users to use supported chains only
    defaultChain: base,

    // Explicitly list supported chains to force network switching
    supportedChains: [base], // Start with just Base for testing
  },
}