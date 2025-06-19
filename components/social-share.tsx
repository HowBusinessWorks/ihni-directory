"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, X, Copy, Check } from 'lucide-react'
import type { Idea } from '@/lib/supabase'

interface SocialShareProps {
  idea: Idea
}

export function SocialShare({ idea }: SocialShareProps) {
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // Construct shareable content
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this stolen app idea: "${idea.title}" - ${idea.description}`
  const shareTitle = `App Idea: ${idea.title}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToReddit = () => {
    const url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    window.open(url, '_blank')
  }

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  if (!showModal) {
    return (
      <Button 
        onClick={() => setShowModal(true)}
        className="w-full bg-black text-white border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
      >
        <Share2 size={20} />
        SHARE IDEA
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={() => setShowModal(false)}
      />
      
      {/* Share Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white border-8 border-black shadow-brutal max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black uppercase">SHARE THIS IDEA</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full bg-gray-100 border-4 border-black p-4 font-bold text-left shadow-brutal hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3"
              >
                {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
              </button>

              {/* Social Media Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={shareToTwitter}
                  className="bg-blue-400 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  TWITTER
                </button>
                
                <button
                  onClick={shareToLinkedIn}
                  className="bg-blue-600 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  LINKEDIN
                </button>
                
                <button
                  onClick={shareToFacebook}
                  className="bg-blue-800 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  FACEBOOK
                </button>
                
                <button
                  onClick={shareToReddit}
                  className="bg-orange-600 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  REDDIT
                </button>
                
                <button
                  onClick={shareToWhatsApp}
                  className="bg-green-500 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  WHATSAPP
                </button>
                
                <button
                  onClick={shareToTelegram}
                  className="bg-blue-500 text-white border-4 border-black p-3 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  TELEGRAM
                </button>
              </div>

              {/* Idea Preview */}
              <div className="border-4 border-black p-4 bg-gray-50 mt-6">
                <h4 className="font-black text-sm uppercase mb-2">SHARING:</h4>
                <p className="font-mono text-sm">{shareTitle}</p>
                <p className="font-mono text-xs text-gray-600 mt-1 truncate">{shareUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}