import { supabase } from "./supabase"
import type { Idea } from "./supabase"

export async function getIdeas(): Promise<Idea[]> {
  const { data, error } = await supabase.from("ideas").select("*").order("sourceDate", { ascending: false })

  if (error) {
    console.error("Error fetching ideas:", error)
    return []
  }

  return data || []
}

export async function getIdeaById(id: string): Promise<Idea | null> {
  const { data, error } = await supabase.from("ideas").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching idea:", error)
    return null
  }

  return data
}

export async function incrementIdeaClicks(id: string): Promise<void> {
  const { error } = await supabase.rpc("increment_clicks", { idea_id: id })

  if (error) {
    console.error("Error incrementing clicks:", error)
  }
}

export async function getRelatedIdeas(currentIdea: Idea, limit: number = 3): Promise<Idea[]> {
  try {
    // Get ideas with similar tags, category, or type (excluding current idea)
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .neq("id", currentIdea.id)
      .or(`category.eq.${currentIdea.category},type.eq.${currentIdea.type}`)
      .order("clicks", { ascending: false })
      .limit(limit * 3) // Get more to filter by tags

    if (error) {
      console.error("Error fetching related ideas:", error)
      return []
    }

    if (!data) return []

    // Score ideas based on similarity
    const scoredIdeas = data.map(idea => {
      let score = 0
      
      // Same category gets 3 points
      if (idea.category === currentIdea.category) score += 3
      
      // Same type gets 2 points
      if (idea.type === currentIdea.type) score += 2
      
      // Shared tags get 1 point each
      const sharedTags = idea.subcategories.filter((tag: string) => 
        currentIdea.subcategories.includes(tag)
      )
      score += sharedTags.length
      
      return { ...idea, score }
    })

    // Sort by score (highest first) and return top results
    return scoredIdeas
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

  } catch (error) {
    console.error("Error in getRelatedIdeas:", error)
    return []
  }
}

export async function getTotalCreatorsCount(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("ideas")
      .select("sourceName")
    
    if (error) {
      console.error("Error fetching creators:", error)
      return 0
    }

    if (!data) return 0

    // Get unique creators
    const uniqueCreators = [...new Set(data.map(idea => idea.sourceName))]
    return uniqueCreators.length
  } catch (error) {
    console.error("Error in getTotalCreatorsCount:", error)
    return 0
  }
}

export async function getIdeasWithFilters({
  searchTerm = "",
  category = "All",
  type = "All",
  dateFilter = "All Time",
  sortBy = "Newest First",
  limit,
  offset = 0,
}: {
  searchTerm?: string
  category?: string
  type?: string
  dateFilter?: string
  sortBy?: string
  limit?: number
  offset?: number
}): Promise<{ ideas: Idea[]; count: number }> {
  let query = supabase.from("ideas").select("*", { count: "exact" })

  // Apply search filter
  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,sourceName.ilike.%${searchTerm}%`)
  }

  // Apply category filter
  if (category !== "All") {
    query = query.eq("category", category)
  }

  // Apply type filter
  if (type !== "All") {
    query = query.eq("type", type)
  }

  // Apply date filter
  if (dateFilter !== "All Time") {
    const now = new Date()
    let dateThreshold: Date

    switch (dateFilter) {
      case "Last Week":
        dateThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "Last Month":
        dateThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "Last 3 Months":
        dateThreshold = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case "Last 6 Months":
        dateThreshold = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
        break
      case "Last Year":
        dateThreshold = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        dateThreshold = new Date(0)
    }

    query = query.gte("sourceDate", dateThreshold.toISOString().split("T")[0])
  }

  // Apply sorting
  switch (sortBy) {
    case "Newest First":
      query = query.order("sourceDate", { ascending: false })
      break
    case "Oldest First":
      query = query.order("sourceDate", { ascending: true })
      break
    case "Most Clicked":
      query = query.order("clicks", { ascending: false })
      break
    case "Least Clicked":
      query = query.order("clicks", { ascending: true })
      break
  }

  // Apply pagination
  if (limit) {
    query = query.range(offset, offset + limit - 1)
  }

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching filtered ideas:", error)
    return { ideas: [], count: 0 }
  }

  return { ideas: data || [], count: count || 0 }
}
