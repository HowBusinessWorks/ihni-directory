"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true
    }
    savePreferences(allPreferences)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false
    }
    savePreferences(essentialOnly)
    setShowBanner(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: Date.now()
    }))
    
    // Dispatch custom event for analytics tracking
    window.dispatchEvent(new CustomEvent('cookieConsent', { detail: prefs }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white border-8 border-black shadow-brutal p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-black uppercase">
                COOKIE POLICY
              </h2>
              <button
                onClick={() => setShowBanner(false)}
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 font-mono text-sm space-y-2">
              <p>
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              </p>
              <p>
                By clicking "ACCEPT", you consent to our use of cookies. Learn more in our{' '}
                <Link href="/privacy" className="underline font-bold hover:text-purple-600">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleAcceptAll}
                className="bg-primary text-white border-4 border-black px-6 py-2 font-black text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
              >
                ACCEPT
              </Button>
              <Button
                onClick={handleRejectAll}
                className="bg-white text-black border-4 border-black px-6 py-2 font-black text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
              >
                REJECT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}