import type { Idea } from "./supabase"

// Function to check if an idea is new (within 15 days)
export const isNewIdea = (dateAdded: string): boolean => {
  const addedDate = new Date(dateAdded)
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - addedDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 15
}

// Function to check if idea matches date filter
export const matchesDateFilter = (dateAdded: string, filter: string): boolean => {
  if (filter === "All Time") return true

  const addedDate = new Date(dateAdded)
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - addedDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  switch (filter) {
    case "Last Week":
      return diffDays <= 7
    case "Last Month":
      return diffDays <= 30
    case "Last 3 Months":
      return diffDays <= 90
    case "Last 6 Months":
      return diffDays <= 180
    case "Last Year":
      return diffDays <= 365
    default:
      return true
  }
}

// Function to filter and sort ideas
export const filterAndSortIdeas = (
  ideas: Idea[],
  searchTerm: string,
  selectedCategory: string,
  selectedBusinessType: string,
  selectedDateFilter: string,
  selectedSort: string
): Idea[] => {
  const filtered = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.subcategories.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      idea.sourceName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory
    const matchesBusinessType = selectedBusinessType === "All" || idea.type === selectedBusinessType
    const matchesDate = matchesDateFilter(idea.sourceDate, selectedDateFilter)

    return matchesSearch && matchesCategory && matchesBusinessType && matchesDate
  })

  // Apply sorting
  filtered.sort((a, b) => {
    switch (selectedSort) {
      case "Newest First":
        return new Date(b.sourceDate).getTime() - new Date(a.sourceDate).getTime()
      case "Oldest First":
        return new Date(a.sourceDate).getTime() - new Date(b.sourceDate).getTime()
      case "Most Clicked":
        return b.clicks - a.clicks
      case "Least Clicked":
        return a.clicks - b.clicks
      default:
        return 0
    }
  })

  return filtered
}