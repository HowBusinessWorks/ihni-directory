import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { categories, businessTypes } from '@/lib/constants'
import { createIdeaPath, createSlug } from '@/lib/seo-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ihavenoidea.ai'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    // Fetch ideas for dynamic routes
    const { data: ideas } = await supabase
      .from('ideas')
      .select('id, title, updated_at, category, type, sourceName')
      .order('updated_at', { ascending: false })

    // Generate idea pages using the correct URL structure
    const ideaPages: MetadataRoute.Sitemap = ideas?.map(idea => ({
      url: `${baseUrl}${createIdeaPath(idea)}`,
      lastModified: new Date(idea.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || []

    // Generate category pages (excluding "All")
    const categoryPages: MetadataRoute.Sitemap = categories
      .filter(cat => cat !== 'All')
      .map(category => ({
        url: `${baseUrl}/category/${createSlug(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    // Generate type pages (excluding "All")
    const typePages: MetadataRoute.Sitemap = businessTypes
      .filter(type => type !== 'All')
      .map(type => ({
        url: `${baseUrl}/type/${createSlug(type)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    // Generate creator pages
    const uniqueCreators = [...new Set(ideas?.map(idea => idea.sourceName) || [])]
    const creatorPages: MetadataRoute.Sitemap = uniqueCreators.map(creator => ({
      url: `${baseUrl}/creator/${createSlug(creator)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [...staticPages, ...ideaPages, ...categoryPages, ...typePages, ...creatorPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if database fails
    return staticPages
  }
}