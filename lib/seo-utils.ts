import { supabase } from "./supabase"
import type { Idea } from "./supabase"

// Utility function to create URL-friendly slugs
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Generate idea slug from title and ID
export function createIdeaSlug(title: string, id: string): string {
  const titleSlug = createSlug(title)
  return `${titleSlug}-${id}`
}

// Create full idea URL path
export function createIdeaPath(idea: Idea): string {
  const categorySlug = createSlug(idea.category)
  const typeSlug = createSlug(idea.type)
  const ideaSlug = createIdeaSlug(idea.title, idea.id)
  return `/${categorySlug}/${typeSlug}/${ideaSlug}`
}

// Get all unique categories from database
export async function getUniqueCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('category')
      .order('category')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    const uniqueCategories = [...new Set(data?.map(item => item.category) || [])]
    return uniqueCategories.filter(Boolean)
  } catch (error) {
    console.error('Error in getUniqueCategories:', error)
    return []
  }
}

// Get all unique types from database
export async function getUniqueTypes(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('type')
      .order('type')

    if (error) {
      console.error('Error fetching types:', error)
      return []
    }

    const uniqueTypes = [...new Set(data?.map(item => item.type) || [])]
    return uniqueTypes.filter(Boolean)
  } catch (error) {
    console.error('Error in getUniqueTypes:', error)
    return []
  }
}

// Get all unique creators from database
export async function getUniqueCreators(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('sourceName')
      .order('sourceName')

    if (error) {
      console.error('Error fetching creators:', error)
      return []
    }

    const uniqueCreators = [...new Set(data?.map(item => item.sourceName) || [])]
    return uniqueCreators.filter(Boolean)
  } catch (error) {
    console.error('Error in getUniqueCreators:', error)
    return []
  }
}

// Get all unique tags from subcategories
export async function getUniqueTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('subcategories')

    if (error) {
      console.error('Error fetching tags:', error)
      return []
    }

    const allTags: string[] = []
    data?.forEach(item => {
      if (Array.isArray(item.subcategories)) {
        allTags.push(...item.subcategories)
      }
    })

    const uniqueTags = [...new Set(allTags)]
    return uniqueTags.filter(Boolean).sort()
  } catch (error) {
    console.error('Error in getUniqueTags:', error)
    return []
  }
}

// Get ideas by category
export async function getIdeasByCategory(category: string): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('category', category)
      .order('clicks', { ascending: false })

    if (error) {
      console.error('Error fetching ideas by category:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getIdeasByCategory:', error)
    return []
  }
}

// Get ideas by type
export async function getIdeasByType(type: string): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('type', type)
      .order('clicks', { ascending: false })

    if (error) {
      console.error('Error fetching ideas by type:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getIdeasByType:', error)
    return []
  }
}

// Get ideas by creator
export async function getIdeasByCreator(creator: string): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('sourceName', creator)
      .order('clicks', { ascending: false })

    if (error) {
      console.error('Error fetching ideas by creator:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getIdeasByCreator:', error)
    return []
  }
}

// Get ideas by tag
export async function getIdeasByTag(tag: string): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .contains('subcategories', [tag])
      .order('clicks', { ascending: false })

    if (error) {
      console.error('Error fetching ideas by tag:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getIdeasByTag:', error)
    return []
  }
}

// Find category from slug
export function findCategoryFromSlug(slug: string, categories: string[]): string | null {
  return categories.find(category => createSlug(category) === slug) || null
}

// Find creator from slug
export function findCreatorFromSlug(slug: string, creators: string[]): string | null {
  return creators.find(creator => createSlug(creator) === slug) || null
}

// Find tag from slug
export function findTagFromSlug(slug: string, tags: string[]): string | null {
  return tags.find(tag => createSlug(tag) === slug) || null
}

// Find type from slug
export function findTypeFromSlug(slug: string, types: string[]): string | null {
  return types.find(type => createSlug(type) === slug) || null
}