import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home, Tag, TrendingUp, Users, FolderOpen, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IdeaCard } from '@/components/idea-card'
import { FooterSection } from '@/components/sections/footer-section'
import { 
  getUniqueTags, 
  getIdeasByTag, 
  findTagFromSlug,
  createSlug 
} from '@/lib/seo-utils'
import type { Metadata } from 'next'

interface TagPageProps {
  params: { slug: string }
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getUniqueTags()
  
  return tags.map((tag) => ({
    slug: createSlug(tag),
  }))
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tags = await getUniqueTags()
  const tag = findTagFromSlug(params.slug, tags)
  
  if (!tag) {
    return {
      title: 'Tag Not Found | I Have No Idea'
    }
  }

  const ideas = await getIdeasByTag(tag)
  
  return {
    title: `${tag} App Ideas | I Have No Idea`,
    description: `Discover ${ideas.length}+ app ideas tagged with ${tag}. Find innovative concepts across categories featuring ${tag.toLowerCase()}.`,
    keywords: `${tag} app ideas, ${tag} startup ideas, ${tag} concepts, ${tag} apps`,
    openGraph: {
      title: `${tag} App Ideas | I Have No Idea`,
      description: `${ideas.length}+ curated app ideas featuring ${tag}`,
      type: 'website',
    }
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tags = await getUniqueTags()
  const tag = findTagFromSlug(params.slug, tags)
  
  if (!tag) {
    notFound()
  }

  const ideas = await getIdeasByTag(tag)
  
  // Calculate stats
  const totalClicks = ideas.reduce((sum, idea) => sum + idea.clicks, 0)
  const categories = [...new Set(ideas.map(idea => idea.category))]
  const creators = [...new Set(ideas.map(idea => idea.sourceName))]
  const types = [...new Set(ideas.map(idea => idea.type))]

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
                #{tag} IDEAS
              </h1>
              <p className="text-xl text-white font-mono mt-2">
                {ideas.length} ideas featuring {tag.toLowerCase()} across {categories.length} categories
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12">
          {/* Tag Stats */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 p-3 border-4 border-black">
                <Tag className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-black uppercase">#{tag} OVERVIEW</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <div className="bg-purple-600 text-white border-4 border-black p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{ideas.length}</div>
                <div className="text-sm font-bold uppercase">Ideas</div>
              </div>
              
              <div className="bg-green-600 text-black border-4 border-black p-6 text-center">
                <FolderOpen className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{categories.length}</div>
                <div className="text-sm font-bold uppercase">Categories</div>
              </div>
              
              <div className="bg-orange-500 text-black border-4 border-black p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{creators.length}</div>
                <div className="text-sm font-bold uppercase">Creators</div>
              </div>
              
              <div className="bg-blue-600 text-black border-4 border-black p-6 text-center">
                <Eye className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{totalClicks.toLocaleString()}</div>
                <div className="text-sm font-bold uppercase">Total Views</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-black uppercase mb-2">CATEGORIES FEATURING #{tag}:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${createSlug(category)}`}
                      className="bg-gray-200 border-2 border-black px-3 py-1 text-sm font-bold hover:bg-orange-200 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-black uppercase mb-2">BUSINESS TYPES:</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Link
                      key={type}
                      href={`/type/${createSlug(type)}`}
                      className="bg-gray-200 border-2 border-black px-3 py-1 text-sm font-bold hover:bg-orange-200 transition-colors"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          {ideas.length > 0 ? (
            <>
              <div className="bg-black text-white border-8 border-black p-6 shadow-brutal-inverse">
                <h3 className="text-2xl font-black uppercase">
                  ALL #{tag.toUpperCase()} IDEAS
                </h3>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {ideas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-yellow-500 border-8 border-black p-12 shadow-brutal text-center">
              <h3 className="text-3xl font-black uppercase mb-4">No Ideas Found</h3>
              <p className="text-xl font-mono mb-6">
                We haven't found any ideas tagged with #{tag} yet.
              </p>
              <Link href="/?scrollToResults=true">
                <Button className="bg-black text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  EXPLORE ALL IDEAS
                </Button>
              </Link>
            </div>
          )}

          {/* Related Tags */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
              EXPLORE OTHER TAGS
            </h3>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tags
                .filter(t => t !== tag)
                .slice(0, 12)
                .map((t) => (
                  <Link
                    key={t}
                    href={`/tag/${createSlug(t)}`}
                    className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all text-center"
                  >
                    <div className="font-black text-lg">#{t}</div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Top Creators for this Tag */}
          {creators.length > 0 && (
            <div className="bg-white border-8 border-black p-8 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
                TOP CREATORS FOR #{tag.toUpperCase()}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {creators.slice(0, 6).map((creator) => {
                  const creatorIdeas = ideas.filter(idea => idea.sourceName === creator)
                  const creatorLogo = creatorIdeas[0]?.sourceLogo || "/placeholder.svg"
                  return (
                    <Link
                      key={creator}
                      href={`/creator/${createSlug(creator)}`}
                      className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={creatorLogo}
                          alt={creator}
                          className="h-12 w-12 border-2 border-black flex-shrink-0"
                        />
                        <div className="font-black text-lg">{creator}</div>
                      </div>
                      <div className="text-sm font-mono text-gray-600">
                        {creatorIdeas.length} idea{creatorIdeas.length !== 1 ? 's' : ''}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}