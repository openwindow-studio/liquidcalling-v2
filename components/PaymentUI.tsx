'use client'

import { useState } from 'react'

type PaymentUIProps = {
  minutesBalance: number
  buyMinutes: (amount: string, method?: string) => Promise<void>
  isPurchasing: boolean
  calculateMinutesFromDollars: (dollars: string) => number

  // Crypto payment props
  currentNetwork: string | null
  usdcBalance: string
  supportedNetworks: any
  switchToNetwork: (network: any) => Promise<boolean>
  cryptoReady: boolean
  isNetworkSupported?: boolean
}

export function PaymentUI({
  minutesBalance,
  buyMinutes,
  isPurchasing,
  calculateMinutesFromDollars,
  currentNetwork,
  usdcBalance,
  supportedNetworks,
  switchToNetwork,
  cryptoReady,
  isNetworkSupported = false
}: PaymentUIProps) {
  const [selectedAmount, setSelectedAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'privy'>('wallet')

  const handlePayment = async () => {
    if (!selectedAmount) {
      alert('Please select an amount')
      return
    }

    if (paymentMethod === 'wallet' && !cryptoReady && !isNetworkSupported) {
      alert('Please connect to a supported network first')
      return
    }

    if (paymentMethod === 'wallet' && isNetworkSupported && !cryptoReady) {
      alert('Network RPC temporarily unavailable. Try switching to Base or Base Sepolia.')
      return
    }

    console.log(`💸 PaymentUI: Calling buyMinutes with amount=${selectedAmount}, method=${paymentMethod}`)
    await buyMinutes(selectedAmount, paymentMethod)
    console.log(`✅ PaymentUI: buyMinutes call completed`)
    setSelectedAmount('')
  }

  const networkOptions = Object.entries(supportedNetworks).map(([key, config]: [string, any]) => ({
    key,
    name: config.name,
    chainId: config.chainId,
    ready: config.usdcAddress !== '0x...' && config.treasuryWallet !== '0x...'
  }))

  return (
    <div className="figma-minutes-section">
      {/* Minutes Balance Display */}
      <div className="figma-minutes-balance">
        <span className="figma-minutes-label">Minutes Balance:</span>
        <span className="figma-minutes-value" style={{ fontWeight: 'bold' }}> {minutesBalance}</span>
      </div>

      {/* Network Selection */}
      {currentNetwork && (
        <div style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center'
        }}>
          <span>Network: {supportedNetworks[currentNetwork]?.name}</span>
          <span>•</span>
          <span>USDC: {parseFloat(usdcBalance).toFixed(2)}</span>
        </div>
      )}

      {/* Payment Method Toggle */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setPaymentMethod('wallet')}
          style={{
            padding: '4px 12px',
            fontSize: '12px',
            backgroundColor: paymentMethod === 'wallet' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'Britti Sans'
          }}
        >
          Crypto (USDC)
        </button>
        <button
          onClick={() => setPaymentMethod('privy')}
          style={{
            padding: '4px 12px',
            fontSize: '12px',
            backgroundColor: paymentMethod === 'privy' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'Britti Sans'
          }}
        >
          Credit Card
        </button>
      </div>

      {/* Network Switching (for crypto payments) */}
      {paymentMethod === 'wallet' && (
        <div style={{
          marginBottom: '12px',
          display: 'flex',
          gap: '4px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {networkOptions.map(network => (
            <button
              key={network.key}
              onClick={() => switchToNetwork(network.key)}
              disabled={!network.ready}
              style={{
                padding: '2px 8px',
                fontSize: '10px',
                backgroundColor: currentNetwork === network.key ? 'rgba(34, 197, 94, 0.3)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: network.ready ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: network.ready ? 'pointer' : 'not-allowed',
                fontFamily: 'Britti Sans'
              }}
            >
              {network.name}
            </button>
          ))}
        </div>
      )}

      {/* Payment Form */}
      <div className="figma-buy-minutes">
        <div className="figma-buy-minutes-form">
          <select
            className="figma-dollar-select"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            disabled={isPurchasing}
          >
            <option value="">Select Amount</option>
            <option value="5">$5 ({calculateMinutesFromDollars("5")} min)</option>
            <option value="10">$10 ({calculateMinutesFromDollars("10")} min)</option>
            <option value="20">$20 ({calculateMinutesFromDollars("20")} min)</option>
            <option value="50">$50 ({calculateMinutesFromDollars("50")} min)</option>
          </select>

          <button
            onClick={handlePayment}
            disabled={isPurchasing || !selectedAmount}
            className="figma-buy-button"
          >
            <span className="figma-buy-button-text">
              {isPurchasing ? 'Processing...' : `Pay with ${paymentMethod === 'wallet' ? 'USDC' : 'Card'}`}
            </span>
          </button>
        </div>

        {/* Status Messages */}
        {paymentMethod === 'wallet' && !cryptoReady && (
          <div style={{
            fontSize: '11px',
            color: 'rgba(255, 200, 100, 0.8)',
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'Britti Sans'
          }}>
            Switch to Base or HyperLiquid to pay with USDC
          </div>
        )}

        {paymentMethod === 'wallet' && cryptoReady && parseFloat(usdcBalance) < parseFloat(selectedAmount || '0') && selectedAmount && (
          <div style={{
            fontSize: '11px',
            color: 'rgba(255, 100, 100, 0.8)',
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'Britti Sans'
          }}>
            Insufficient USDC balance
          </div>
        )}
      </div>
    </div>
  )
}