import { redirect } from 'next/navigation'
import { getIdeaById } from '@/lib/ideas'
import { createIdeaPath } from '@/lib/seo-utils'

interface OldIdeaPageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// This page handles redirects from the old URL structure to the new one
export default async function OldIdeaPage({ params, searchParams }: OldIdeaPageProps) {
  try {
    const idea = await getIdeaById(params.id)
    
    if (!idea) {
      // If idea doesn't exist, redirect to home
      redirect('/?scrollToResults=true')
    }
    
    // Create the new URL path
    const newPath = createIdeaPath(idea)
    
    // Preserve search parameters if any
    const searchParamsString = new URLSearchParams(searchParams as Record<string, string>).toString()
    const redirectUrl = searchParamsString ? `${newPath}?${searchParamsString}` : newPath
    
    // Redirect to the new URL structure
    redirect(redirectUrl)
  } catch (error) {
    console.error('Error in old idea page redirect:', error)
    redirect('/?scrollToResults=true')
  }
}