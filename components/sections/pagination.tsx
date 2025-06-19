import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 4) {
        pages.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push("...")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="bg-white border-8 border-black p-8 shadow-brutal">
      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-black text-white border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal disabled:hover:bg-black"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          PREV
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-3 font-mono font-bold text-lg"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`
                  ${
                    isActive
                      ? "bg-primary text-white border-4 border-black"
                      : "bg-white text-black border-4 border-black hover:bg-secondary hover:text-white"
                  }
                  font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all min-w-[3rem]
                `}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-black text-white border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal disabled:hover:bg-black"
        >
          NEXT
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-6">
        <span className="font-mono text-lg">
          Page <span className="font-bold text-primary">{currentPage}</span> of{" "}
          <span className="font-bold text-primary">{totalPages}</span>
        </span>
      </div>
    </div>
  )
}