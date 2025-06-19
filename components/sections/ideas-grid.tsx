import { Button } from "@/components/ui/button"
import { IdeaCard } from "@/components/idea-card"
import { Pagination } from "@/components/sections/pagination"
import type { Idea } from "@/lib/supabase"

interface IdeasGridProps {
  ideas: Idea[]
  onClearFilters: () => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  currentParams?: string
}

export function IdeasGrid({ ideas, onClearFilters, currentPage, totalPages, onPageChange, currentParams }: IdeasGridProps) {
  if (ideas.length === 0) {
    return (
      <div className="bg-yellow-500 border-8 border-black p-12 shadow-brutal text-center">
        <h3 className="text-3xl font-black uppercase mb-4">NO IDEAS FOUND</h3>
        <p className="text-xl font-mono mb-6">
          Try adjusting your filters or search terms to discover more app ideas.
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-black text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
        >
          RESET ALL FILTERS
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} currentParams={currentParams} />
        ))}
      </div>

      <Pagination
        key={`pagination-${currentPage}-${totalPages}`}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}