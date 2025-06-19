import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IdeaCard } from '@/components/idea-card'
import { FooterSection } from '@/components/sections/footer-section'
import { 
  getUniqueTypes, 
  getIdeasByType, 
  findTypeFromSlug,
  createSlug 
} from '@/lib/seo-utils'
import type { Metadata } from 'next'

interface TypePageProps {
  params: { slug: string }
}

// Generate static params for all types
export async function generateStaticParams() {
  const types = await getUniqueTypes()
  
  return types.map((type) => ({
    slug: createSlug(type),
  }))
}

// Generate metadata for each type page
export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
  const types = await getUniqueTypes()
  const type = findTypeFromSlug(params.slug, types)
  
  if (!type) {
    return {
      title: 'Business Type Not Found | I Have No Idea'
    }
  }

  const ideas = await getIdeasByType(type)
  
  return {
    title: `${type} App Ideas | I Have No Idea`,
    description: `Discover ${ideas.length}+ ${type.toLowerCase()} app ideas. Find innovative ${type.toLowerCase()} concepts and startup ideas from top entrepreneurs.`,
    keywords: `${type.toLowerCase()} app ideas, ${type.toLowerCase()} startup ideas, ${type.toLowerCase()} apps`,
    openGraph: {
      title: `${type} App Ideas | I Have No Idea`,
      description: `${ideas.length}+ curated ${type.toLowerCase()} app ideas from top creators`,
      type: 'website',
    }
  }
}

export default async function TypePage({ params }: TypePageProps) {
  const types = await getUniqueTypes()
  const type = findTypeFromSlug(params.slug, types)
  
  if (!type) {
    notFound()
  }

  const ideas = await getIdeasByType(type)

  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Header */}
      <header className="bg-primary border-b-8 border-black">
        <div className="container py-8">
          <div className="flex items-center gap-6">
            <Link href="/?scrollToResults=true">
              <Button className="bg-white border-4 border-black p-3 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-500 transition-all">
                <Home className="h-6 w-6 text-black" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase text-orange-500 leading-none">
                {type} IDEAS
              </h1>
              <p className="text-xl text-white font-mono mt-2">
                {ideas.length} curated {type.toLowerCase()} app concepts
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12">
          {/* Type Info */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-3xl font-black uppercase mb-4">About {type} Ideas</h2>
            <p className="text-lg font-mono leading-relaxed mb-6">
              Explore our collection of {type.toLowerCase()} app ideas sourced from top entrepreneurs, 
              developers, and thought leaders. Discover innovative {type.toLowerCase()} concepts across multiple categories.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-orange-500 text-black border-4 border-black px-4 py-2 font-bold">
                {ideas.length} IDEAS
              </div>
              <div className="bg-purple-600 text-white border-4 border-black px-4 py-2 font-bold">
                {[...new Set(ideas.map(idea => idea.category))].length} CATEGORIES
              </div>
              <div className="bg-green-600 text-white border-4 border-black px-4 py-2 font-bold">
                {[...new Set(ideas.map(idea => idea.sourceName))].length} CREATORS
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          {ideas.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          ) : (
            <div className="bg-yellow-500 border-8 border-black p-12 shadow-brutal text-center">
              <h3 className="text-3xl font-black uppercase mb-4">No Ideas Found</h3>
              <p className="text-xl font-mono mb-6">
                We haven't found any ideas in the {type} category yet.
              </p>
              <Link href="/?scrollToResults=true">
                <Button className="bg-black text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  EXPLORE ALL IDEAS
                </Button>
              </Link>
            </div>
          )}

          {/* Categories featuring this Business Type */}
          {[...new Set(ideas.map(idea => idea.category))].length > 0 && (
            <div className="bg-white border-8 border-black p-8 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
                CATEGORIES FEATURING {type.toUpperCase()}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...new Set(ideas.map(idea => idea.category))]
                  .map((category) => {
                    const categoryIdeas = ideas.filter(idea => idea.category === category)
                    return (
                      <Link
                        key={category}
                        href={`/category/${createSlug(category)}`}
                        className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                      >
                        <div className="font-black text-lg uppercase">{category}</div>
                        <div className="text-sm font-mono text-gray-600">
                          {categoryIdeas.length} idea{categoryIdeas.length !== 1 ? 's' : ''}
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Related Business Types */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
              EXPLORE OTHER BUSINESS TYPES
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {types
                .filter(t => t !== type)
                .slice(0, 6)
                .map((t) => (
                  <Link
                    key={t}
                    href={`/type/${createSlug(t)}`}
                    className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                  >
                    <div className="font-black text-lg uppercase">{t}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}