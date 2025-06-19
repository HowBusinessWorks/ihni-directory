"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getRelatedIdeas } from '@/lib/ideas'
import { createIdeaPath } from '@/lib/seo-utils'
import type { Idea } from '@/lib/supabase'

interface RelatedIdeasProps {
  currentIdea: Idea
  currentParams?: string
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

export function RelatedIdeas({ currentIdea, currentParams }: RelatedIdeasProps) {
  const [relatedIdeas, setRelatedIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedIdeas = async () => {
      try {
        const ideas = await getRelatedIdeas(currentIdea, 3)
        setRelatedIdeas(ideas)
      } catch (error) {
        console.error('Error fetching related ideas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedIdeas()
  }, [currentIdea])

  if (loading) {
    return (
      <div className="bg-white border-8 border-black p-8 shadow-brutal">
        <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
          RELATED IDEAS
        </h3>
        <div className="text-center py-8">
          <p className="font-mono text-gray-600">Loading related ideas...</p>
        </div>
      </div>
    )
  }

  if (relatedIdeas.length === 0) {
    return null // Don't show section if no related ideas
  }

  return (
    <div className="bg-white border-8 border-black p-8 shadow-brutal">
      <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        RELATED IDEAS
      </h3>
      
      <div className="grid gap-6 md:grid-cols-3">
        {relatedIdeas.map((idea) => (
          <Link 
            key={idea.id} 
            href={`${createIdeaPath(idea)}${currentParams ? `?${currentParams}` : ''}`}
            className="block group"
          >
            <div className={`${getPaleCategoryColor(idea.category)} border-4 border-black shadow-brutal hover:translate-y-1 hover:shadow-none transition-all duration-200 h-full`}>
              <div className="p-4">
                {/* Clicks and category */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="bg-purple-400 text-black border-2 border-black px-2 py-1 font-bold">
                    {(idea.clicks || 0).toLocaleString()} clicks
                  </span>
                  <Badge className={`${getCategoryColor(idea.category)} border-2 border-black font-bold text-xs`}>
                    {idea.category}
                  </Badge>
                </div>

                {/* Title */}
                <h4 className="text-lg font-black uppercase leading-tight mb-3 group-hover:text-purple-600 transition-colors">
                  {idea.title}
                </h4>

                {/* Description */}
                <p className="text-sm font-mono leading-relaxed text-gray-700 mb-4 line-clamp-3">
                  {idea.description}
                </p>

                {/* Shared tags */}
                <div className="flex flex-wrap gap-1">
                  {idea.subcategories
                    .filter(tag => currentIdea.subcategories.includes(tag))
                    .slice(0, 2)
                    .map((tag) => (
                      <span key={tag} className="bg-gray-200 border-2 border-black px-2 py-1 text-xs font-bold">
                        #{tag}
                      </span>
                    ))}
                  {idea.subcategories.filter(tag => currentIdea.subcategories.includes(tag)).length > 2 && (
                    <span className="text-xs font-bold text-gray-500">
                      +{idea.subcategories.filter(tag => currentIdea.subcategories.includes(tag)).length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}