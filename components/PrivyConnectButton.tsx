'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useState, useEffect, useRef } from 'react'

export function PrivyConnectButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside - must be before any returns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  if (!ready) {
    return (
      <button className="rainbow-connect-button" disabled>
        Loading...
      </button>
    )
  }

  if (!authenticated) {
    return (
      <button onClick={login} className="rainbow-connect-button">
        Login
      </button>
    )
  }

  // Show user info or wallet address with truncation
  const truncateEmail = (email: string) => {
    const [name, domain] = email.split('@')

    // Check if mobile on initial load (people don't resize browsers)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767

    if (isMobile) {
      // Mobile: aggressive truncation for 110px button
      if (email.length <= 12) return email
      return `${name.slice(0, 3)}...@${domain.slice(0, 3)}`
    } else {
      // Desktop: keep full domain, truncate username only
      if (email.length <= 20) return email
      if (name.length <= 8) return email
      return `${name.slice(0, 6)}...@${domain}`
    }
  }

  const displayName = (user?.email?.address && truncateEmail(user.email.address)) ||
                      (user?.google?.email && truncateEmail(user.google.email)) ||
                      (user?.wallet?.address && user.wallet.address.slice(0, 6) + '...' + user.wallet.address.slice(-4)) ||
                      'Connected'

  const handleDisconnect = () => {
    if (confirm('Are you sure you want to disconnect?')) {
      logout()
    }
    setShowDropdown(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="rainbow-connect-button"
      >
        {displayName}
      </button>

      {showDropdown && (
        <div
          className="absolute top-full mt-2 right-0 bg-black border border-gray-600 rounded-lg p-2 min-w-[200px] z-50"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="text-white text-sm p-2 border-b border-gray-600">
            {user?.email?.address && <div>Email: {user.email.address}</div>}
            {user?.wallet?.address && (
              <div>Wallet: {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}</div>
            )}
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full text-left text-red-400 hover:text-red-300 p-2 rounded text-sm"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}