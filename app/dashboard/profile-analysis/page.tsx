"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfileAnalysisPage() {
  const [resumeData, setResumeData] = useState("")
  const [skills, setSkills] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Share your details so our AI can prepare a customized interview experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resume or LinkedIn Profile</CardTitle>
              <CardDescription>
                Paste your resume text or LinkedIn profile URL. This helps our AI understand your background.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste your resume or LinkedIn profile URL here..." 
                className="h-[200px]"
                value={resumeData}
                onChange={(e) => setResumeData(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <Button>Upload Resume</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
              <CardDescription>
                Add your key skills and experience level to enhance your interview preparation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Primary Skills</Label>
                  <Input 
                    id="skills"
                    placeholder="e.g., JavaScript, React, Node.js" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter your main technical skills, separated by commas
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <select 
                    id="experience"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Select your experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6+ years)</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Save Skills</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Target Position</CardTitle>
              <CardDescription>
                Tell us about the position you're targeting to customize your interview preparation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle"
                    placeholder="e.g., Frontend Developer, Data Scientist" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description (optional)</Label>
                  <Textarea 
                    id="jobDescription"
                    placeholder="Paste the job description here for more specific interview preparation..."
                    className="h-[150px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2">Save as Draft</Button>
                <Button>Analyze Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}