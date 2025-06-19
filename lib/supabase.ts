import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Idea = {
  id: number
  title: string
  description: string
  problem: string
  solution: string
  category: string
  subcategories: string[]
  type: string
  sourceName: string
  sourceLogo: string | null
  sourceDate: string
  sourceLink: string | null
  startTime: string | null
  endTime: string | null
  clicks: number
  created_at?: string
  updated_at?: string
}
