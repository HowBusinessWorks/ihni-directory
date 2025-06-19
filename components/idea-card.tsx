import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createIdeaPath, createSlug } from "@/lib/seo-utils"
import type { Idea } from "@/lib/supabase"

interface IdeaCardProps {
  idea: Idea
  currentParams?: string
}

// Function to check if an idea is new (within 15 days)
const isNewIdea = (dateAdded: string) => {
  const addedDate = new Date(dateAdded)
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - addedDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 15
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

// Function to get pale category color for card backgrounds
const getPaleCategoryColor = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return "bg-orange-50"
    case "Lifestyle":
      return "bg-green-50"
    case "Education":
      return "bg-purple-50"
    case "Social":
      return "bg-pink-50"
    case "Productivity":
      return "bg-teal-50"
    case "Technology":
      return "bg-indigo-50"
    case "Business":
      return "bg-amber-50"
    default:
      return "bg-gray-50"
  }
}

// Function to get business type color
const getBusinessTypeColor = (businessType: string) => {
  switch (businessType) {
    case "SaaS":
      return "bg-slate-700 text-white"
    case "API Product":
      return "bg-emerald-700 text-white"
    case "Marketplace":
      return "bg-violet-700 text-white"
    case "Directory":
    case "Directory / Aggregator":
      return "bg-blue-700 text-white"
    case "Content Business":
      return "bg-rose-700 text-white"
    case "Community":
      return "bg-cyan-700 text-white"
    case "Mobile App":
    case "Mobile App Business":
      return "bg-yellow-700 text-white"
    case "Data Business":
      return "bg-stone-700 text-white"
    default:
      return "bg-gray-700 text-white"
  }
}

export function IdeaCard({ idea, currentParams }: IdeaCardProps) {
  return (
    <div
      className={`${getPaleCategoryColor(idea.category)} border-8 border-black shadow-brutal hover:translate-y-2 hover:shadow-none transition-all duration-200 flex flex-col h-full`}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Clicks and date section */}
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="bg-purple-400 text-black border-2 border-black px-2 py-1 font-bold">
            {(idea.clicks || 0).toLocaleString()} clicks
          </span>
          <span>{new Date(idea.sourceDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-black uppercase leading-tight flex-1">{idea.title}</h3>
          {isNewIdea(idea.sourceDate) && (
            <div className="bg-purple-600 text-white px-2 py-1 text-xs font-bold border-2 border-black ml-2">
              NEW
            </div>
          )}
        </div>

        <div className="flex-grow mb-6">
          <p className="text-base font-mono leading-relaxed">{idea.description}</p>
        </div>

        <div className="mt-auto">
          <div className="space-y-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <Link href={`/category/${createSlug(idea.category)}`}>
                <Badge className={`${getCategoryColor(idea.category)} border-2 border-black font-bold text-black hover:bg-orange-200 transition-colors cursor-pointer`}>
                  {idea.category}
                </Badge>
              </Link>
              <Link href={`/type/${createSlug(idea.type)}`}>
                <Badge className={`${getBusinessTypeColor(idea.type)} border-2 border-black font-bold hover:bg-orange-200 transition-colors cursor-pointer`}>
                  {idea.type}
                </Badge>
              </Link>
            </div>

            <div className="flex flex-wrap gap-1">
              {idea.subcategories.map((tag) => (
                <Link key={tag} href={`/tag/${createSlug(tag)}`}>
                  <span className="bg-gray-200 border-2 border-black px-2 py-1 text-xs font-bold hover:bg-orange-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Creator section */}
          <div className="border-t-4 border-black pt-5 flex items-center gap-4 mb-6">
            <img
              src={idea.sourceLogo || "/placeholder.svg"}
              alt={idea.sourceName}
              className="h-16 w-16 border-2 border-black"
            />
            <Link href={`/creator/${createSlug(idea.sourceName)}`}>
              <span className="font-bold text-xl hover:text-orange-500 transition-colors cursor-pointer">{idea.sourceName}</span>
            </Link>
          </div>

          <Link href={`${createIdeaPath(idea)}${currentParams ? `?${currentParams}` : ''}`}>
            <Button className="w-full bg-black text-white border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
              VIEW DETAILS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}