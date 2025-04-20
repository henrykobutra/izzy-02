import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteStrategy } from "@/services/database/strategies/deleteStrategy"

export function useDeleteStrategy(id: string) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  
  const handleDelete = async () => {
    try {
      setDeleting(true)
      const success = await deleteStrategy(id)
      
      if (success) {
        toast.success("Strategy deleted successfully")
        // Only redirect after successful deletion and toast notification
        router.push("/dashboard/interview-strategy")
      } else {
        toast.error("Failed to delete strategy")
        setDeleting(false) // Reset deleting state on failure
      }
    } catch (error) {
      console.error("Error deleting strategy:", error)
      toast.error("Failed to delete strategy")
      setDeleting(false) // Reset deleting state on error
    }
  }
  
  return {
    deleting,
    handleDelete
  }
}
