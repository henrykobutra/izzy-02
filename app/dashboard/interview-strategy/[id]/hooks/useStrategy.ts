import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getStrategyById } from "@/services/database/strategies/getStrategy"
import type { StrategyAnalysis } from "@/types/strategy"

export function useStrategy(id: string) {
  const router = useRouter()
  const [strategy, setStrategy] = useState<StrategyAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getStrategyById(id)
        
        if (!data) {
          setError("Strategy not found")
          toast.error("Strategy not found")
          router.push("/dashboard/interview-strategy")
          return
        }
        
        setStrategy(data)
      } catch (error) {
        console.error("Error fetching strategy:", error)
        setError("Failed to load interview strategy")
        toast.error("Failed to load interview strategy")
      } finally {
        setLoading(false)
      }
    }
    
    fetchStrategy()
  }, [id, router])
  
  return { strategy, loading, error }
}
