"use client"

import { useState } from "react"
import { TrendingUp, Globe, Users, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  totalIdeas: number
  newIdeasCount: number
  creatorsCount: number
}

export function HeroSection({ totalIdeas, newIdeasCount, creatorsCount }: HeroSectionProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('WELCOME TO THE HEIST CREW! 🏹')
        setEmail('')
      } else {
        const error = await response.json()
        setMessage(error.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-primary border-b-8 border-black">
      <div className="container py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase text-white leading-none">
                INTERNET'S APP IDEAS
                <br />
                <span className="text-orange-500">STOLEN LEGALLY</span>
              </h1>
              <p className="text-2xl text-white font-mono max-w-2xl">
                Ever noticed only rich people share app ideas online? I'm Robin Hood - taking from the rich and giving
                to the future rich.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-orange-500 border-4 border-black p-4 shadow-brutal rotate-3">
                  <TrendingUp className="h-8 w-8 mb-2" />
                  <div className="text-xl font-black">{newIdeasCount}</div>
                  <div className="text-xs font-bold uppercase">New This Week</div>
                </div>
                <div className="bg-purple-600 text-white border-4 border-black p-4 shadow-brutal -rotate-3">
                  <Globe className="h-8 w-8 mb-2" />
                  <div className="text-xl font-black">{totalIdeas}+</div>
                  <div className="text-xs font-bold uppercase">Ideas Tracked</div>
                </div>
                <div className="bg-black text-white border-4 border-black p-4 shadow-brutal-inverse rotate-6">
                  <Users className="h-8 w-8 mb-2" />
                  <div className="text-xl font-black">{creatorsCount}</div>
                  <div className="text-xs font-bold uppercase">Creators</div>
                </div>
                <div className="bg-white border-4 border-black p-4 shadow-brutal -rotate-6">
                  <Zap className="h-8 w-8 mb-2" />
                  <div className="text-xl font-black">WEEKLY</div>
                  <div className="text-xs font-bold uppercase">REPORTS</div>
                </div>
              </div>
            </div>

            <div className="bg-white border-8 border-black p-6 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2">JOIN THE HEIST:</h3>
              <form onSubmit={handleSubmit} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="robin.hood@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-4 border-black h-12 text-base font-mono shadow-brutal focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-purple-600"
                  required
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 border-4 border-black px-8 h-12 font-black text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? 'JOINING...' : 'GET IDEAS'}
                </Button>
              </form>
              {message && (
                <p className={`text-sm font-mono mt-3 ${message.includes('Successfully') || message.includes('WELCOME TO THE HEIST CREW') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
              <p className="text-sm font-mono mt-3 text-gray-600">
                Weekly "borrowed" app ideas delivered directly to your inbox
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}