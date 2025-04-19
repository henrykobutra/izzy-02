"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Linkedin, Upload, FileText, CheckCircle, Calendar, Brain, BarChart3, Award, Briefcase, GraduationCap, MessageSquare, Mic } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfileAnalysisPage() {
  const [resumeContent, setResumeContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const handleAnalyzeProfile = () => {
    if (!resumeContent.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      window.scrollTo({ top: document.getElementById("analysis-results")?.offsetTop || 0, behavior: "smooth" })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Update your profile to get fresh analysis or view your current profile details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update Your Profile</CardTitle>
            <CardDescription>
              Paste your resume or connect with LinkedIn to let our AI analyze your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-sm font-medium">Choose how to update your profile</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-2">
              {/* Resume Paste - Takes 2/3 width */}
              <div className="lg:col-span-7 space-y-4 border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Option 1: Paste Your Resume</h3>
                </div>
                <Textarea 
                  placeholder="Paste your resume text here..." 
                  className="h-[180px] font-mono text-sm"
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAnalyzeProfile}
                    disabled={!resumeContent.trim() || isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Profile"}
                  </Button>
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="flex lg:hidden items-center justify-center my-4">
                <div className="border-t w-1/3 border-gray-200 dark:border-gray-700"></div>
                <div className="mx-4 text-xs text-muted-foreground">or</div>
                <div className="border-t w-1/3 border-gray-200 dark:border-gray-700"></div>
              </div>

              {/* Desktop Divider - Center Column */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
                <div className="flex h-full items-center justify-center">
                  <div className="border-r border-gray-200 dark:border-gray-700 h-24 absolute"></div>
                  <div className="bg-white dark:bg-gray-950 z-10 px-3 py-1 text-xs text-muted-foreground border border-gray-200 dark:border-gray-700 rounded-full">
                    or
                  </div>
                </div>
              </div>

              {/* Talk to Izzy - Takes 1/3 width */}
              <div className="lg:col-span-4 border bg-slate-50 dark:bg-slate-900/40 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Option 2: Talk to Izzy</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">
                    Build your profile through conversation with our AI assistant
                  </p>
                </div>
                <Button variant="default" className="gap-2">
                  <Mic className="h-4 w-4" />
                  Start Conversation
                </Button>
              </div>
            </div>

            <Separator className="my-6" />
            
            <div className="rounded-lg border bg-slate-50 dark:bg-slate-900/40 p-4">
              <h3 className="text-sm font-medium mb-3">More Profile Options</h3>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span>Upload Resume</span>
                  <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
                </div>
                
                <div className="inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <span>Sync with LinkedIn</span>
                  <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We're working on more ways to update your profile, including document uploads and LinkedIn integration.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mock of previously analyzed profile */}
        <div id="analysis-results">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>Your Profile Analysis</CardTitle>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last analyzed: April 15, 2025
                </div>
              </div>
              <CardDescription>
                AI-powered analysis of your professional profile and qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Professional Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Professional Summary
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-sm">
                    Experienced Full Stack Developer with 4+ years specializing in modern JavaScript frameworks and cloud technologies. 
                    Strong background in building scalable web applications with React, Node.js, and TypeScript. 
                    Demonstrated expertise in API development, database design, and CI/CD implementation.
                  </p>
                  <p className="text-sm">
                    Professional journey includes contributing to a high-traffic e-commerce platform, 
                    developing a healthcare data management system, and optimizing application performance 
                    at scale. Experienced in both startup and enterprise environments.
                  </p>
                </div>
              </div>
              
              {/* Technical Skills Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Technical Skills Profile
                </h3>
                <div className="pl-7 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Frontend Development</h4>
                      <div className="space-y-2">
                        {[
                          { name: "React/Next.js", value: 90 },
                          { name: "JavaScript/TypeScript", value: 85 },
                          { name: "HTML/CSS", value: 80 },
                          { name: "UI/UX Design", value: 65 }
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.value}%</span>
                            </div>
                            <Progress value={skill.value} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Backend Development</h4>
                      <div className="space-y-2">
                        {[
                          { name: "Node.js", value: 80 },
                          { name: "REST API Design", value: 85 },
                          { name: "SQL/NoSQL Databases", value: 75 },
                          { name: "Authentication/Security", value: 70 }
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.value}%</span>
                            </div>
                            <Progress value={skill.value} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium text-sm mb-2">Key Technical Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React", "TypeScript", "Node.js", "Express", "Next.js", "MongoDB", 
                        "PostgreSQL", "Redux", "REST APIs", "GraphQL", "Jest", "Docker", 
                        "AWS", "CI/CD", "Git", "Agile", "TailwindCSS", "Responsive Design"
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Experience Analysis
                </h3>
                <div className="pl-7 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Experience Level</h4>
                    <p className="text-sm">Mid-level professional with 4 years of relevant experience</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Industry Experience</h4>
                    <div className="flex flex-wrap gap-2">
                      {["E-commerce", "Healthcare", "FinTech"].map((industry) => (
                        <Badge key={industry} variant="outline" className="px-3 py-1">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Notable Projects</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Developed a scalable e-commerce platform serving 100K+ monthly users</li>
                      <li>Built a real-time healthcare data management system with HIPAA compliance</li>
                      <li>Implemented authentication system with multi-factor authentication</li>
                      <li>Led front-end performance optimization reducing load time by 40%</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Team Collaboration</h4>
                    <p className="text-sm">
                      Experience working in Agile teams of 5-10 developers. Collaborated with UX designers, 
                      product managers, and QA engineers. Participated in code reviews and technical planning.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Education & Certifications */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education & Certifications
                </h3>
                <div className="pl-7 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm">
                      Bachelor of Science in Computer Science, University of Technology, 2021
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Certifications</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>AWS Certified Developer - Associate</li>
                      <li>MongoDB Certified Developer</li>
                      <li>Professional Scrum Developer I</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4 bg-amber-50 dark:bg-amber-950/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-lg">Next Steps</h3>
                </div>
                <p className="text-sm">
                  Your profile has been analyzed. To receive tailored interview preparation, please provide information about the position
                  you're targeting in the next step.
                </p>
                <Button variant="outline" className="mt-3">
                  Set Target Position
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}