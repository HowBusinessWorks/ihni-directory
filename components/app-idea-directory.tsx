"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { FiltersSection } from "@/components/sections/filters-section"
import { ResultsCount } from "@/components/sections/results-count"
import { IdeasGrid } from "@/components/sections/ideas-grid"
import { FooterSection } from "@/components/sections/footer-section"
import { getIdeasWithFilters, getTotalCreatorsCount } from "@/lib/ideas"
import { filterAndSortIdeas, isNewIdea } from "@/lib/filters"
import { categories, businessTypes, dateFilters, sortOptions } from "@/lib/constants"
import type { Idea } from "@/lib/supabase"

export default function AppIdeaDirectory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL parameters
  const initialSearch = searchParams.get('search') || ""
  const initialCategory = searchParams.get('category') || "All"
  const initialType = searchParams.get('type') || "All"
  const initialDate = searchParams.get('date') || "All Time"
  const initialSort = searchParams.get('sort') || "Newest First"
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1

  const [ideas, setIdeas] = useState<Idea[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalCreatorsCount, setTotalCreatorsCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedBusinessType, setSelectedBusinessType] = useState(initialType)
  const [selectedDateFilter, setSelectedDateFilter] = useState(initialDate)
  const [selectedSort, setSelectedSort] = useState(initialSort)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [shouldScrollToResults, setShouldScrollToResults] = useState(false)
  const itemsPerPage = 9

  // Fetch total creators count on mount
  useEffect(() => {
    const fetchTotalCreators = async () => {
      const count = await getTotalCreatorsCount()
      setTotalCreatorsCount(count)
    }
    fetchTotalCreators()
  }, [])

  // Function to update URL without navigation (preserves page position)
  const updateURL = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory !== 'All') params.set('category', selectedCategory)
    if (selectedBusinessType !== 'All') params.set('type', selectedBusinessType)
    if (selectedDateFilter !== 'All Time') params.set('date', selectedDateFilter)
    if (selectedSort !== 'Newest First') params.set('sort', selectedSort)
    if (currentPage > 1) params.set('page', currentPage.toString())
    
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.replaceState({}, '', newURL)
  }

  // Simple debounced search - only debounce the API call, not the input
  useEffect(() => {
    const timer = setTimeout(() => {
      // Fetch data with current search term
      const fetchIdeas = async () => {
        try {
          const { ideas: fetchedIdeas, count } = await getIdeasWithFilters({
            searchTerm,
            category: selectedCategory,
            type: selectedBusinessType,
            dateFilter: selectedDateFilter,
            sortBy: selectedSort,
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
          })
          setIdeas(fetchedIdeas)
          setTotalCount(count)
        } catch (error) {
          console.error("Error fetching ideas:", error)
          setIdeas([])
          setTotalCount(0)
        }
      }
      fetchIdeas()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, selectedBusinessType, selectedDateFilter, selectedSort, currentPage, itemsPerPage])

  // Update URL when state changes (but debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL()
    }, searchTerm !== initialSearch ? 500 : 0) // Delay URL update for search, immediate for others

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, selectedBusinessType, selectedDateFilter, selectedSort, currentPage])

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ""
    const urlCategory = searchParams.get('category') || "All"
    const urlType = searchParams.get('type') || "All"
    const urlDate = searchParams.get('date') || "All Time"
    const urlSort = searchParams.get('sort') || "Newest First"
    const urlPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1

    // Only update if different from current state
    if (searchTerm !== urlSearch) setSearchTerm(urlSearch)
    if (selectedCategory !== urlCategory) setSelectedCategory(urlCategory)
    if (selectedBusinessType !== urlType) setSelectedBusinessType(urlType)
    if (selectedDateFilter !== urlDate) setSelectedDateFilter(urlDate)
    if (selectedSort !== urlSort) setSelectedSort(urlSort)
    if (currentPage !== urlPage) setCurrentPage(urlPage)
  }, [searchParams])

  // Check for scroll trigger when URL changes
  useEffect(() => {
    const scrollToResults = searchParams.get('scrollToResults')
    if (scrollToResults === 'true') {
      setShouldScrollToResults(true)
      
      // Clean up URL parameter immediately
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete('scrollToResults')
      const newURL = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname
      window.history.replaceState({}, '', newURL)
    }
  }, [searchParams])

  // Scroll to results bar when ideas are loaded
  useEffect(() => {
    if (shouldScrollToResults && ideas.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const resultsBar = document.getElementById('results-bar')
        if (resultsBar) {
          resultsBar.scrollIntoView({ 
            behavior: 'instant',
            block: 'start'
          })
        }
        setShouldScrollToResults(false)
      }, 50)
    }
  }, [ideas, shouldScrollToResults])

  // Count new ideas
  const newIdeasCount = useMemo(() => {
    return ideas.filter((idea) => isNewIdea(idea.sourceDate)).length
  }, [ideas])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedBusinessType("All")
    setSelectedDateFilter("All Time")
    setSelectedSort("Newest First")
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage)


  return (
    <div className="min-h-screen bg-background font-mono">
      <HeroSection
        totalIdeas={totalCount}
        newIdeasCount={newIdeasCount}
        creatorsCount={totalCreatorsCount}
      />

      <section className="container py-16">
        <div className="space-y-12">
          <FiltersSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBusinessType={selectedBusinessType}
            setSelectedBusinessType={setSelectedBusinessType}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            onClearFilters={clearAllFilters}
            categories={categories}
            businessTypes={businessTypes}
            dateFilters={dateFilters}
            sortOptions={sortOptions}
          />

          <ResultsCount count={totalCount} />

          <IdeasGrid 
            ideas={ideas} 
            onClearFilters={clearAllFilters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            currentParams={searchParams.toString()}
          />
        </div>
      </section>

      <FooterSection />
    </div>
  )
}