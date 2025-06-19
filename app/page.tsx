"use client"
import AppIdeaDirectory from "@/components/app-idea-directory"
import { LoadingScreen } from "@/components/loading-screen"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppIdeaDirectory />
    </Suspense>
  )
}
