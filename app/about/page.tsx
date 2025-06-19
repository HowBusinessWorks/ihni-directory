"use client"

import { useEffect } from "react"
import { ArrowLeft, Globe, Users, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Header */}
      <header className="bg-primary border-b-8 border-black">
        <div className="container py-8">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button className="bg-white border-4 border-black p-3 shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                <ArrowLeft className="h-6 w-6 text-black" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase text-orange-500 leading-none">
                ABOUT THE HEIST
              </h1>
              <p className="text-xl text-white font-mono mt-2">The story behind the stolen ideas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12 max-w-4xl mx-auto">
          {/* What We Do */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500 p-3 border-4 border-black">
                <Target className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-black uppercase">WHAT WE DO</h2>
            </div>
            <div className="space-y-6">
              <p className="text-xl font-mono leading-relaxed">
                We don't create ideas. We don't steal them either (legally speaking). We simply{" "}
                <span className="bg-yellow-500 px-2 py-1 border-2 border-black font-bold">CENTRALIZE</span> brilliant
                app concepts from all corners of the internet.
              </p>
              <p className="text-lg font-mono leading-relaxed">
                Think of us as your personal idea curator - we scour the web, find the gems, and present them in one
                organized place. No more endless scrolling through Twitter, Reddit, or obscure tech blogs. We've done
                the hunting for you.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-black text-white border-8 border-black p-8 shadow-brutal-inverse">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-600 p-3 border-4 border-white">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase">OUR MISSION</h2>
            </div>
            <div className="space-y-6">
              <p className="text-xl font-mono leading-relaxed">
                Great ideas shouldn't be buried in the depths of the internet. They should be accessible, discoverable,
                and ready to inspire the next generation of builders.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-cyan-400 text-black border-4 border-white p-4">
                  <Globe className="h-6 w-6 mb-2" />
                  <div className="font-bold">DISCOVER</div>
                  <div className="text-sm">Find ideas from everywhere</div>
                </div>
                <div className="bg-lime-400 text-black border-4 border-white p-4">
                  <Users className="h-6 w-6 mb-2" />
                  <div className="font-bold">ORGANIZE</div>
                  <div className="text-sm">Curate and categorize</div>
                </div>
                <div className="bg-fuchsia-500 text-white border-4 border-white p-4">
                  <Target className="h-6 w-6 mb-2" />
                  <div className="font-bold">SHARE</div>
                  <div className="text-sm">Make them accessible</div>
                </div>
              </div>
            </div>
          </div>

          {/* Who is Robin Hood */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">WHO IS ROBIN HOOD?</h2>
            <div className="space-y-6">
              <div className="bg-yellow-500 border-4 border-black p-6">
                <p className="text-xl font-mono leading-relaxed">
                  Never met the guy, but he seemed to have good intentions. Taking from the rich and giving to the poor
                  - sounds like a solid business model.
                </p>
              </div>
              <div className="bg-gray-100 border-4 border-black p-6">
                <p className="text-lg font-mono leading-relaxed">
                  But if you're wondering who actually built this site, that would be{" "}
                  <a
                    href="https://x.com/roby_nel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 px-2 py-1 border-2 border-black font-bold hover:bg-yellow-500 transition-colors"
                  >
                    RobyN
                  </a>.
                </p>
                <p className="text-base font-mono mt-4 text-gray-600">
                  Just someone who got tired of losing great ideas in browser bookmarks and decided to do something
                  about it.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}

          {/* Call to Action */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal text-center">
            <h2 className="text-3xl font-black uppercase mb-4">READY TO JOIN THE HEIST?</h2>
            <p className="text-xl font-mono mb-8 max-w-2xl mx-auto">
              Start exploring curated app ideas from the brightest minds on the internet.
            </p>
            <Link href="/">
              <Button className="bg-orange-500 border-4 border-black px-12 py-6 font-black text-2xl shadow-brutal hover:translate-y-2 hover:shadow-none transition-all">
                EXPLORE IDEAS
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t-8 border-black">
        <div className="container py-12">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-mono">© 2025 I Have No Idea</p>
              <p className="text-sm font-mono text-gray-400">All rights reserved</p>
            </div>

            <div className="flex gap-6">
              <Link href="/about" className="text-white hover:text-yellow-500 font-bold text-lg transition-colors">
                ABOUT
              </Link>
              <a
                href="mailto:robin.hood@ihavenoidea.ai"
                className="text-white hover:text-yellow-500 font-bold text-lg transition-colors"
              >
                robin.hood@ihavenoidea.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
