import { notFound } from 'next/navigation'
import { Home, Calendar, User, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getIdeaById, incrementIdeaClicks } from "@/lib/ideas"
import { SocialShare } from "@/components/social-share"
import { RelatedIdeas } from "@/components/related-ideas"
import { FooterSection } from "@/components/sections/footer-section"
import { 
  getUniqueCategories, 
  getUniqueTypes, 
  getIdeasByCategory,
  findCategoryFromSlug,
  findTypeFromSlug,
  createSlug,
  createIdeaSlug
} from '@/lib/seo-utils'
import type { Idea } from "@/lib/supabase"
import type { Metadata } from 'next'

interface IdeaPageProps {
  params: { 
    category: string
    type: string
    slug: string 
  }
}

// Generate static params for all idea pages
export async function generateStaticParams() {
  try {
    const categories = await getUniqueCategories()
    const types = await getUniqueTypes()
    
    const allParams = []
    
    for (const category of categories) {
      const ideas = await getIdeasByCategory(category)
      const categoryTypes = [...new Set(ideas.map(idea => idea.type))]
      
      for (const type of categoryTypes) {
        const typeIdeas = ideas.filter(idea => idea.type === type)
        
        for (const idea of typeIdeas) {
          allParams.push({
            category: createSlug(category),
            type: createSlug(type),
            slug: createIdeaSlug(idea.title, idea.id.toString())
          })
        }
      }
    }
    
    return allParams
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for each idea page
export async function generateMetadata({ params }: IdeaPageProps): Promise<Metadata> {
  try {
    const categories = await getUniqueCategories()
    const types = await getUniqueTypes()
    const category = findCategoryFromSlug(params.category, categories)
    const type = findTypeFromSlug(params.type, types)
    
    if (!category || !type) {
      return {
        title: 'Page Not Found | I Have No Idea'
      }
    }

    // Extract idea ID from slug (last part after final dash)
    const slugParts = params.slug.split('-')
    const ideaId = slugParts[slugParts.length - 1]
    
    const idea = await getIdeaById(ideaId)
    
    if (!idea) {
      return {
        title: 'Idea Not Found | I Have No Idea'
      }
    }

    return {
      title: `${idea.title} | ${category} ${type} Idea | I Have No Idea`,
      description: `${idea.description} - A ${type.toLowerCase()} idea in the ${category.toLowerCase()} category by ${idea.sourceName}.`,
      keywords: `${idea.title}, ${category.toLowerCase()}, ${type.toLowerCase()}, app idea, startup idea, ${idea.sourceName}`,
      openGraph: {
        title: `${idea.title} | I Have No Idea`,
        description: idea.description,
        type: 'article',
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'I Have No Idea'
    }
  }
}

// Function to get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return "bg-orange-600 text-white"
    case "Lifestyle":
      return "bg-green-600 text-white"
    case "Education":
      return "bg-purple-600 text-white"
    case "Social":
      return "bg-pink-600 text-white"
    case "Productivity":
      return "bg-teal-600 text-white"
    case "Technology":
      return "bg-indigo-600 text-white"
    case "Business":
      return "bg-amber-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const categories = await getUniqueCategories()
  const types = await getUniqueTypes()
  const category = findCategoryFromSlug(params.category, categories)
  const type = findTypeFromSlug(params.type, types)
  
  if (!category || !type) {
    notFound()
  }

  // Extract idea ID from slug (last part after final dash)
  const slugParts = params.slug.split('-')
  const ideaId = slugParts[slugParts.length - 1]
  
  const idea = await getIdeaById(ideaId)
  
  if (!idea || idea.category !== category || idea.type !== type) {
    notFound()
  }

  // Increment click count
  await incrementIdeaClicks(ideaId)

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
                IDEA DETAILS
              </h1>
              <p className="text-xl text-white font-mono mt-2">Deep dive into stolen brilliance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="space-y-12">
          {/* Idea Header */}
          <div className="bg-white border-8 border-black p-8 shadow-brutal">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-black uppercase leading-tight mb-4">{idea.title}</h2>
                <div className="flex flex-wrap gap-3 mb-4 items-center">
                  <Link href={`/category/${createSlug(idea.category)}`}>
                    <span className={`${getCategoryColor(idea.category)} border-2 border-black font-bold text-lg px-4 py-2 text-black hover:bg-orange-200 transition-colors cursor-pointer inline-block rounded-full`}>
                      {idea.category}
                    </span>
                  </Link>
                  <Link href={`/type/${createSlug(idea.type)}`}>
                    <span className="bg-gray-700 text-white border-2 border-black font-bold text-lg px-4 py-2 inline-block rounded-full hover:bg-orange-200 hover:text-black transition-colors cursor-pointer">
                      {idea.type}
                    </span>
                  </Link>
                  {idea.subcategories.map((tag) => (
                    <Link key={tag} href={`/tag/${createSlug(tag)}`}>
                      <span className="bg-gray-200 border-2 border-black px-4 py-2 text-lg font-bold hover:bg-orange-200 transition-colors cursor-pointer inline-block">
                        #{tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="bg-purple-400 text-black border-2 border-black px-4 py-2 font-bold text-lg mb-2">
                  {(idea.clicks || 0).toLocaleString()} VIEWS
                </div>
                <div className="text-sm font-mono text-gray-600">{new Date(idea.sourceDate).toLocaleDateString()}</div>
              </div>
            </div>
            <p className="text-lg font-mono leading-relaxed">{idea.description}</p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Problem Section */}
              <div className="bg-white border-8 border-black p-8 shadow-brutal flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500 p-3 border-4 border-black">
                    <Target className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-3xl font-black uppercase">THE PROBLEM</h3>
                </div>
                <p className="text-lg font-mono leading-relaxed">{idea.problem}</p>
              </div>

              {/* Solution Section */}
              <div className="bg-black text-white border-8 border-black p-8 shadow-brutal-inverse flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary p-3 border-4 border-white">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black uppercase">THE SOLUTION</h3>
                </div>
                <p className="text-lg font-mono leading-relaxed">{idea.solution}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-8">
              {/* Source Info */}
              <div className="bg-white border-8 border-black p-6 shadow-brutal flex-1 flex flex-col">
                <h4 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">SOURCE INFO</h4>

                <div className="space-y-6 flex-1">
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <img
                      src={idea.sourceLogo || "/placeholder.svg"}
                      alt={idea.sourceName}
                      className="h-16 w-16 border-4 border-black"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase">Creator</span>
                      </div>
                      <Link href={`/creator/${createSlug(idea.sourceName)}`}>
                        <div className="font-bold text-lg hover:text-orange-500 transition-colors cursor-pointer">
                          {idea.sourceName}
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase">Published</span>
                    </div>
                    <div className="font-mono text-lg">
                      {new Date(idea.sourceDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Timestamp */}
                  {idea.startTime && idea.endTime && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase">Timestamp</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-green-200 border-2 border-black px-2 py-1 font-mono text-sm">
                          {idea.startTime}
                        </div>
                        <span className="font-mono">-</span>
                        <div className="bg-red-200 border-2 border-black px-2 py-1 font-mono text-sm">{idea.endTime}</div>
                      </div>
                    </div>
                  )}

                  {/* Source Link */}
                  {idea.sourceLink && (
                    <div>
                      <a href={idea.sourceLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full bg-purple-600 text-white border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-orange-500 transition-all">
                          VIEW SOURCE
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white border-8 border-black p-6 shadow-brutal">
                <h4 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">ACTIONS</h4>
                <div className="space-y-4">
                  <SocialShare idea={idea} />
                </div>
              </div>
            </div>
          </div>

          {/* Related Ideas */}
          <RelatedIdeas currentIdea={idea} currentParams="" />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}