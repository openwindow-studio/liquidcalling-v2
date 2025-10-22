import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'

// Define Hyperliquid EVM chain with proper metadata
export const hyperliquid = defineChain({
  id: 998,
  name: 'Hyperliquid',
  network: 'hyperliquid',
  nativeCurrency: {
    decimals: 18,
    name: 'USDC',
    symbol: 'USDC',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hyperliquid.xyz/evm'],
      webSocket: ['wss://api.hyperliquid.xyz/evm/ws']
    },
    public: {
      http: ['https://api.hyperliquid.xyz/evm'],
      webSocket: ['wss://api.hyperliquid.xyz/evm/ws']
    }
  },
  blockExplorers: {
    default: {
      name: 'Hyperscan',
      url: 'https://hyperscan.xyz',
      apiUrl: 'https://hyperscan.xyz/api'
    }
  },
  iconUrl: '/hyper-foundation.svg',
  iconBackground: '#000000',
  testnet: false,
})

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Liquid Calling',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  }
)

export const config = createConfig({
  chains: [hyperliquid],
  connectors,
  transports: {
    [hyperliquid.id]: http('https://api.hyperliquid.xyz/evm'),
  },
})

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
export const SIGNALING_SERVER = process.env.NEXT_PUBLIC_SIGNALING_SERVER || 'http://localhost:3001'
export const RATE_PER_MINUTE = 0.10 // $0.10 per minute