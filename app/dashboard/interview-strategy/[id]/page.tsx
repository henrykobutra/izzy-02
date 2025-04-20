"use client"

import React from "react"
import { useStrategy } from "./hooks/useStrategy"
import { useDeleteStrategy } from "./hooks/useDeleteStrategy"
import { StrategyLoader } from "./components/StrategyLoader"
import { StrategyError } from "./components/StrategyError"
import { StrategyHero } from "./components/StrategyHero"
import { StrategyTabs } from "./components/StrategyTabs"

// Updated type definition for Next.js 15.3.1 params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function StrategyViewPage({ params }: PageProps) {
  // Unwrap params Promise with React.use()
  const { id } = React.use(params)
  
  // Use custom hooks for data fetching and deletion
  const { strategy, loading, error } = useStrategy(id)
  const { deleting, handleDelete } = useDeleteStrategy(id)
  
  // Handle loading state
  if (loading) {
    return <StrategyLoader />
  }
  
  // Handle error state
  if (error) {
    return <StrategyError error={error} />
  }
  
  // Null check for strategy
  if (!strategy) return null
  
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-4 pb-20">
      {/* Hero section with job details and match score */}
      <StrategyHero 
        strategy={strategy} 
        id={id} 
        deleting={deleting} 
        onDelete={handleDelete} 
      />
      
      {/* Content tabs */}
      <StrategyTabs strategy={strategy} />
    </div>
  )
}
