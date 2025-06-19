import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IdeaCard } from '@/components/idea-card'
import { FooterSection } from '@/components/sections/footer-section'
import { 
  getUniqueCategories, 
  getIdeasByCategory, 
  findCategoryFromSlug,
  createSlug 
} from '@/lib/seo-utils'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: { slug: string }
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getUniqueCategories()
  
  return categories.map((category) => ({
    slug: createSlug(category),
  }))
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getUniqueCategories()
  const category = findCategoryFromSlug(params.slug, categories)
  
  if (!category) {
    return {
      title: 'Category Not Found | I Have No Idea'
    }
  }

  const ideas = await getIdeasByCategory(category)
  
  return {
    title: `${category} App Ideas | I Have No Idea`,
    description: `Discover ${ideas.length}+ ${category.toLowerCase()} app ideas. Find SaaS, mobile apps, and startup concepts in the ${category.toLowerCase()} category.`,
    keywords: `${category.toLowerCase()} app ideas, ${category.toLowerCase()} startup ideas, ${category.toLowerCase()} apps`,
    openGraph: {
      title: `${category} App Ideas | I Have No Idea`,
      description: `${ideas.length}+ curated ${category.toLowerCase()} app ideas from top creators`,
      type: 'website',
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getUniqueCategories()
  const category = findCategoryFromSlug(params.slug, categories)
  
  if (!category) {
    notFound()
  }

  const ideas = await getIdeasByCategory(category)

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
                {category} IDEAS
              </h1>
              <p className="text-xl text-white font-mono mt-2">
                {ideas.length} curated {category.toLowerCase()} app concepts
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12">
          {/* Category Info */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h2 className="text-3xl font-black uppercase mb-4">About {category} Ideas</h2>
            <p className="text-lg font-mono leading-relaxed mb-6">
              Explore our collection of {category.toLowerCase()} app ideas sourced from top entrepreneurs, 
              developers, and thought leaders. From SaaS platforms to mobile apps, find your next big idea in the {category.toLowerCase()} space.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-orange-500 text-black border-4 border-black px-4 py-2 font-bold">
                {ideas.length} IDEAS
              </div>
              <div className="bg-purple-600 text-white border-4 border-black px-4 py-2 font-bold">
                {[...new Set(ideas.map(idea => idea.type))].length} TYPES
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
                We haven't found any ideas in the {category} category yet.
              </p>
              <Link href="/?scrollToResults=true">
                <Button className="bg-black text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  EXPLORE ALL IDEAS
                </Button>
              </Link>
            </div>
          )}

          {/* Business Types in this Category */}
          {[...new Set(ideas.map(idea => idea.type))].length > 0 && (
            <div className="bg-white border-8 border-black p-8 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
                BUSINESS TYPES IN {category.toUpperCase()}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...new Set(ideas.map(idea => idea.type))]
                  .map((type) => {
                    const typeIdeas = ideas.filter(idea => idea.type === type)
                    return (
                      <Link
                        key={type}
                        href={`/type/${createSlug(type)}`}
                        className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                      >
                        <div className="font-black text-lg">{type}</div>
                        <div className="text-sm font-mono text-gray-600">
                          {typeIdeas.length} idea{typeIdeas.length !== 1 ? 's' : ''}
                        </div>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Related Categories */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
              EXPLORE OTHER CATEGORIES
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories
                .filter(cat => cat !== category)
                .slice(0, 6)
                .map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${createSlug(cat)}`}
                    className="bg-gray-100 border-4 border-black p-4 shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-200 transition-all"
                  >
                    <div className="font-black text-lg uppercase">{cat}</div>
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