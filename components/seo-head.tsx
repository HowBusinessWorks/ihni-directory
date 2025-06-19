"use client"

import { useEffect } from 'react'
import type { Idea } from '@/lib/supabase'

interface SEOHeadProps {
  idea: Idea
}

export function SEOHead({ idea }: SEOHeadProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Update document title
    const title = `${idea.title} - I Have No Idea | App Ideas Directory`
    document.title = title

    // Create or update meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    const description = `${idea.description.substring(0, 155)}...`
    updateMetaTag('description', description)
    updateMetaTag('keywords', `app idea, ${idea.category}, ${idea.type}, ${idea.subcategories.join(', ')}, startup ideas`)

    // Open Graph tags
    updateMetaTag('', title, 'og:title')
    updateMetaTag('', description, 'og:description')
    updateMetaTag('', 'article', 'og:type')
    updateMetaTag('', window.location.href, 'og:url')
    updateMetaTag('', 'I Have No Idea', 'og:site_name')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)

    // Article specific tags
    updateMetaTag('', idea.category, 'article:section')
    updateMetaTag('', idea.subcategories.join(','), 'article:tag')
    updateMetaTag('', new Date(idea.sourceDate).toISOString(), 'article:published_time')
    updateMetaTag('', idea.sourceName, 'article:author')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.href.split('?')[0])

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": idea.title,
      "description": idea.description,
      "creator": {
        "@type": "Person",
        "name": idea.sourceName
      },
      "dateCreated": idea.sourceDate,
      "genre": idea.category,
      "keywords": idea.subcategories.join(', '),
      "url": window.location.href,
      "isBasedOn": idea.sourceLink || undefined,
      "about": {
        "@type": "Thing",
        "name": idea.type
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ViewAction",
        "userInteractionCount": idea.clicks
      }
    }

    // Add or update JSON-LD script
    let jsonLd = document.querySelector('script[type="application/ld+json"]')
    if (jsonLd) {
      jsonLd.textContent = JSON.stringify(structuredData)
    } else {
      jsonLd = document.createElement('script')
      jsonLd.type = 'application/ld+json'
      jsonLd.textContent = JSON.stringify(structuredData)
      document.head.appendChild(jsonLd)
    }

  }, [idea])

  return null // This component doesn't render anything
}