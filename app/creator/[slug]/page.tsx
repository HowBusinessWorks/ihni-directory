import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home, User, Globe, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IdeaCard } from '@/components/idea-card'
import { FooterSection } from '@/components/sections/footer-section'
import { 
  getUniqueCreators, 
  getIdeasByCreator, 
  findCreatorFromSlug,
  createSlug 
} from '@/lib/seo-utils'
import type { Metadata } from 'next'

interface CreatorPageProps {
  params: { slug: string }
}

// Generate static params for all creators
export async function generateStaticParams() {
  const creators = await getUniqueCreators()
  
  return creators.map((creator) => ({
    slug: createSlug(creator),
  }))
}

// Generate metadata for each creator page
export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const creators = await getUniqueCreators()
  const creator = findCreatorFromSlug(params.slug, creators)
  
  if (!creator) {
    return {
      title: 'Creator Not Found | I Have No Idea'
    }
  }

  const ideas = await getIdeasByCreator(creator)
  
  return {
    title: `${creator}'s App Ideas | I Have No Idea`,
    description: `Explore ${ideas.length}+ app ideas shared by ${creator}. Discover innovative concepts from this thought leader in tech and startups.`,
    keywords: `${creator} app ideas, ${creator} startup ideas, ${creator} concepts`,
    openGraph: {
      title: `${creator}'s App Ideas | I Have No Idea`,
      description: `${ideas.length}+ curated app ideas from ${creator}`,
      type: 'profile',
    }
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const creators = await getUniqueCreators()
  const creator = findCreatorFromSlug(params.slug, creators)
  
  if (!creator) {
    notFound()
  }

  const ideas = await getIdeasByCreator(creator)
  
  // Calculate stats
  const totalClicks = ideas.reduce((sum, idea) => sum + idea.clicks, 0)
  const categories = [...new Set(ideas.map(idea => idea.category))]
  const types = [...new Set(ideas.map(idea => idea.type))]

  // Get a sample idea for creator info
  const sampleIdea = ideas[0]

  // Get sample ideas from other creators for their logos
  const otherCreatorsWithLogos = await Promise.all(
    creators
      .filter(c => c !== creator)
      .slice(0, 6)
      .map(async (creatorName) => {
        const creatorIdeas = await getIdeasByCreator(creatorName)
        return {
          name: creatorName,
          logo: creatorIdeas[0]?.sourceLogo || "/placeholder.svg"
        }
      })
  )

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
            <div className="flex items-center gap-6">
              {sampleIdea?.sourceLogo && (
                <img
                  src={sampleIdea.sourceLogo}
                  alt={creator}
                  className="h-20 w-20 border-4 border-black bg-white"
                />
              )}
              <div>
                <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase text-orange-500 leading-none">
                  {creator}
                </h1>
                <p className="text-xl text-white font-mono mt-2">
                  {ideas.length} shared ideas • {totalClicks.toLocaleString()} total views
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12">
          {/* Creator Stats */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 p-3 border-4 border-black">
                <User className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-black uppercase">CREATOR PROFILE</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="bg-purple-600 text-white border-4 border-black p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{ideas.length}</div>
                <div className="text-sm font-bold uppercase">Ideas Shared</div>
              </div>
              
              <div className="bg-green-600 text-white border-4 border-black p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{totalClicks.toLocaleString()}</div>
                <div className="text-sm font-bold uppercase">Total Views</div>
              </div>
              
              <div className="bg-orange-500 text-black border-4 border-black p-6 text-center">
                <User className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-black">{categories.length}</div>
                <div className="text-sm font-bold uppercase">Categories</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-black uppercase mb-2">CATEGORIES COVERED:</h3>
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
                  ALL IDEAS BY {creator.toUpperCase()}
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
                We haven't found any ideas from {creator} yet.
              </p>
              <Link href="/?scrollToResults=true">
                <Button className="bg-black text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  EXPLORE ALL IDEAS
                </Button>
              </Link>
            </div>
          )}

          {/* Other Creators */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
              EXPLORE OTHER CREATORS
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {otherCreatorsWithLogos.map((creatorData) => (
                <Link
                  key={creatorData.name}
                  href={`/creator/${createSlug(creatorData.name)}`}
                  className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={creatorData.logo}
                      alt={creatorData.name}
                      className="h-12 w-12 border-2 border-black flex-shrink-0"
                    />
                    <div className="font-black text-lg">{creatorData.name}</div>
                  </div>
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