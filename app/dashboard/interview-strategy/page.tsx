"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Plus, Search, Briefcase, Eye, Play, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

export default function InterviewStrategyPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  // Mock data for saved job descriptions
  const [savedJobs, setSavedJobs] = useState([
    {
      id: "job-1",
      title: "Senior Frontend Engineer",
      company: "TechCorp Inc.",
      date: "April 15, 2025",
      match: 85
    },
    {
      id: "job-2",
      title: "Full Stack Developer",
      company: "InnovateSoft",
      date: "April 10, 2025",
      match: 92
    },
    {
      id: "job-3",
      title: "React Developer",
      company: "WebSolutions Ltd.",
      date: "April 5, 2025",
      match: 78
    }
  ])
  
  const handleAnalyzeJob = () => {
    if (!jobDescription.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      window.scrollTo({ top: document.getElementById("saved-jobs")?.offsetTop || 0, behavior: "smooth" })
    }, 2000)
  }
  
  const handleRemoveJob = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Interview Strategy</h1>
        <p className="text-muted-foreground mb-6">
          Analyze job descriptions to create tailored interview preparation
        </p>
      </div>

      <Card className="mx-4 lg:mx-6">
        <CardHeader>
          <CardTitle>Add New Job Target</CardTitle>
          <CardDescription>
            Paste a job description to analyze and create a tailored interview strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Paste Job Description</h3>
            </div>
            <Textarea 
              placeholder="Paste the job description here..." 
              className="h-[180px] font-mono text-sm"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleAnalyzeJob}
                disabled={!jobDescription.trim() || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Job"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-slate-50 dark:bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium mb-3">More Options</h3>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Link to Job Post</span>
                <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We're working on more ways to add job descriptions, including direct links to job posts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Saved Job Descriptions */}
      <div id="saved-jobs" className="mx-4 lg:mx-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <CardTitle>Your Target Positions</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search jobs..." 
                    className="pl-8 h-9 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full sm:w-auto"
                  />
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
            </div>
            <CardDescription>
              Job descriptions you've analyzed for interview preparation
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedJobs.map(job => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${job.match >= 85 ? 'text-green-600 dark:text-green-500' : job.match >= 70 ? 'text-amber-600 dark:text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>
                          {job.match}%
                        </span>
                        <Badge 
                          variant={job.match >= 85 ? 'success' : job.match >= 70 ? 'warning' : 'secondary'} 
                          className="px-1.5 py-0 text-xs"
                        >
                          {job.match >= 85 ? 'High' : job.match >= 70 ? 'Good' : 'Fair'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground" 
                          title="View Strategy"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-primary/80 hover:text-primary" 
                          title="Practice Interview"
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                          title="Remove"
                          onClick={() => handleRemoveJob(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}