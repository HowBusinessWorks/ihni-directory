import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="bg-black text-white border-t-8 border-black">
      <div className="container py-12">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-mono">© 2025 I Have No Idea</p>
            <p className="text-sm font-mono text-gray-400">All rights reserved</p>
          </div>

          <div className="flex gap-6 flex-wrap">
            <Link href="/about" className="text-white hover:text-yellow-500 font-bold text-lg transition-colors">
              ABOUT
            </Link>
            <Link href="/terms" className="text-white hover:text-yellow-500 font-bold text-lg transition-colors">
              TERMS
            </Link>
            <Link href="/privacy" className="text-white hover:text-yellow-500 font-bold text-lg transition-colors">
              PRIVACY
            </Link>
            <span className="text-white font-bold text-lg">
              robin.hood@ihavenoidea.ai
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}