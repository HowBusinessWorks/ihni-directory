"use client"

import { Search, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersSectionProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedBusinessType: string
  setSelectedBusinessType: (type: string) => void
  selectedDateFilter: string
  setSelectedDateFilter: (filter: string) => void
  selectedSort: string
  setSelectedSort: (sort: string) => void
  onClearFilters: () => void
  categories: string[]
  businessTypes: string[]
  dateFilters: string[]
  sortOptions: string[]
}

export function FiltersSection({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedBusinessType,
  setSelectedBusinessType,
  selectedDateFilter,
  setSelectedDateFilter,
  selectedSort,
  setSelectedSort,
  onClearFilters,
  categories,
  businessTypes,
  dateFilters,
  sortOptions,
}: FiltersSectionProps) {
  return (
    <div className="bg-white border-8 border-black p-8 shadow-brutal">
      <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">FILTER & SEARCH</h2>

      {/* Search and Basic Filters */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 mb-8">
        <div className="space-y-2 md:col-span-2 lg:col-span-2">
          <label className="text-lg font-bold uppercase flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
            <Input
              placeholder="Search ideas, tags, creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-4 border-black h-14 text-lg font-mono pl-12 shadow-brutal focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-purple-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-bold uppercase">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-4 border-black h-14 text-lg font-mono shadow-brutal focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-4 border-black z-50 bg-white">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-lg font-mono">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-bold uppercase">Business Type</label>
          <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
            <SelectTrigger className="border-4 border-black h-14 text-lg font-mono shadow-brutal focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-4 border-black z-50 bg-white">
              {businessTypes.map((businessType) => (
                <SelectItem key={businessType} value={businessType} className="text-lg font-mono">
                  {businessType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-bold uppercase flex items-center gap-2">Date</label>
          <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
            <SelectTrigger className="border-4 border-black h-14 text-lg font-mono shadow-brutal focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-4 border-black z-50 bg-white">
              {dateFilters.map((filter) => (
                <SelectItem key={filter} value={filter} className="text-lg font-mono">
                  {filter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <div className="flex items-end gap-6">
          <div className="space-y-2">
            <label className="text-lg font-bold uppercase flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Sort By
            </label>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="border-4 border-black h-14 text-lg font-mono shadow-brutal focus:ring-0 focus:ring-offset-0 max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-4 border-black z-50 bg-white">
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-lg font-mono">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onClearFilters}
            className="bg-orange-500 border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all h-14"
          >
            CLEAR ALL FILTERS
          </Button>
        </div>
      </div>
    </div>
  )
}