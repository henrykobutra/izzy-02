"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { 
  Play, 
  Briefcase, 
  MessageSquare, 
  Code, 
  CompassIcon, 
  CheckIcon, 
  ChevronsUpDown,
  MonitorIcon,
  ServerIcon,
  GanttChartIcon,
  Layers,
  ShieldCheck,
  Smartphone,
  Cloud,
  PenToolIcon,
  MousePointerClick,
  Paintbrush,
  BarChart3,
  Database,
  Brain,
  LineChart,
  Building2,
  GraduationCap,
  HeartPulse,
  Scale,
  Microscope,
  Landmark,
  DollarSign,
  Users,
  Eye
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList,
  CommandSeparator
} from "@/components/ui/command"

import data from "../data.json"

type Position = {
  id: string
  title: string
  company: string
  date: string
  match: number
}

type InterviewType = {
  id: string
  label: string
  icon: React.ReactNode
}

export default function PracticeInterviewPage() {
  const [selectedTab, setSelectedTab] = useState<string>("generic")
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [genericPosition, setGenericPosition] = useState<string | null>(null)
  const [interviewType, setInterviewType] = useState<string>("comprehensive")
  const [openPositionCombobox, setOpenPositionCombobox] = useState(false)
  const [openGenericCombobox, setOpenGenericCombobox] = useState(false)
  
  // Categorized generic positions
  const genericPositions = {
    popular: [
      { id: "frontend", title: "Frontend Developer", icon: <MonitorIcon className="h-4 w-4" />, count: 28 },
      { id: "backend", title: "Backend Developer", icon: <ServerIcon className="h-4 w-4" />, count: 24 },
      { id: "fullstack", title: "Full Stack Developer", icon: <Layers className="h-4 w-4" />, count: 32 },
      { id: "pm", title: "Product Manager", icon: <GanttChartIcon className="h-4 w-4" />, count: 18 },
    ],
    engineering: [
      { id: "devops", title: "DevOps Engineer", icon: <Cloud className="h-4 w-4" />, count: 15 },
      { id: "qa", title: "QA Engineer", icon: <ShieldCheck className="h-4 w-4" />, count: 12 },
      { id: "mobile", title: "Mobile Developer", icon: <Smartphone className="h-4 w-4" />, count: 14 },
      { id: "security", title: "Security Engineer", icon: <ShieldCheck className="h-4 w-4" />, count: 9 },
      { id: "sre", title: "Site Reliability Engineer", icon: <ServerIcon className="h-4 w-4" />, count: 13 },
    ],
    design: [
      { id: "ux", title: "UX Designer", icon: <MousePointerClick className="h-4 w-4" />, count: 16 },
      { id: "ui", title: "UI Designer", icon: <Paintbrush className="h-4 w-4" />, count: 14 },
      { id: "product", title: "Product Designer", icon: <PenToolIcon className="h-4 w-4" />, count: 13 },
    ],
    data: [
      { id: "data", title: "Data Scientist", icon: <BarChart3 className="h-4 w-4" />, count: 20 },
      { id: "data-engineer", title: "Data Engineer", icon: <Database className="h-4 w-4" />, count: 17 },
      { id: "ml-engineer", title: "ML Engineer", icon: <Brain className="h-4 w-4" />, count: 15 },
      { id: "analyst", title: "Data Analyst", icon: <LineChart className="h-4 w-4" />, count: 19 },
    ],
    ai: [
      { id: "ai-engineer", title: "AI Engineer", icon: <Brain className="h-4 w-4" />, count: 22 },
      { id: "robotics", title: "Robotics Engineer", icon: <Brain className="h-4 w-4" />, count: 14 },
      { id: "cv-engineer", title: "Computer Vision Engineer", icon: <Eye className="h-4 w-4" />, count: 10 },
      { id: "nlp-engineer", title: "NLP Engineer", icon: <MessageSquare className="h-4 w-4" />, count: 13 },
    ],
    nontech: [
      { id: "marketing", title: "Marketing Manager", icon: <Building2 className="h-4 w-4" />, count: 26 },
      { id: "teacher", title: "Teacher / Educator", icon: <GraduationCap className="h-4 w-4" />, count: 18 },
      { id: "healthcare", title: "Healthcare Professional", icon: <HeartPulse className="h-4 w-4" />, count: 22 },
      { id: "legal", title: "Legal Professional", icon: <Scale className="h-4 w-4" />, count: 15 },
      { id: "research", title: "Research Scientist", icon: <Microscope className="h-4 w-4" />, count: 12 },
      { id: "finance", title: "Finance Analyst", icon: <DollarSign className="h-4 w-4" />, count: 19 },
      { id: "hr", title: "HR Professional", icon: <Users className="h-4 w-4" />, count: 17 },
      { id: "government", title: "Government Official", icon: <Landmark className="h-4 w-4" />, count: 9 },
    ]
  }
  
  // Mock data for saved job targets/positions - in real app, fetch from API/database
  const targetPositions: Position[] = [
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
  ]
  
  const interviewTypes: InterviewType[] = [
    { id: "technical", label: "Technical", icon: <Code className="h-4 w-4 mr-2" /> },
    { id: "behavioral", label: "Behavioral", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { id: "comprehensive", label: "Comprehensive", icon: <CompassIcon className="h-4 w-4 mr-2" /> },
  ]

  // Reset selections when tab changes
  useEffect(() => {
    if (selectedTab === "generic") {
      setSelectedPosition(null)
    } else {
      setGenericPosition(null)
    }
  }, [selectedTab])

  const handleStartInterview = () => {
    // In a real app, this would navigate to the interview session or launch the interview
    if (selectedTab === "generic" && !genericPosition) {
      return // Can't start without selecting a generic position
    }
    
    if (selectedTab === "target" && !selectedPosition) {
      return // Can't start without selecting a target position
    }
    
    const position = selectedTab === "generic" 
      ? Object.values(genericPositions).flat().find(p => p.id === genericPosition)?.title 
      : selectedPosition?.title
      
    console.log("Starting interview:", { 
      positionType: selectedTab, 
      position,
      company: selectedPosition?.company,
      interviewType 
    })
  }

  const canStartInterview = 
    (selectedTab === "generic" && genericPosition) || 
    (selectedTab === "target" && selectedPosition);

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Practice Interview</h1>
        <p className="text-muted-foreground mb-6">
          Prepare for your next interview with targeted practice sessions
        </p>
      </div>

      <Card className="mx-4 lg:mx-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Configure Your Practice Interview
          </CardTitle>
          <CardDescription>
            Select position type, specific role, and interview format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Choose position type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Step 1: Select Position Type</Label>
            <Tabs 
              value={selectedTab} 
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generic">Generic Position</TabsTrigger>
                <TabsTrigger value="target">Target Position</TabsTrigger>
              </TabsList>
              <TabsContent value="generic" className="pt-4">
                <Label className="text-sm mb-2 block">Select a generic position type:</Label>
                <Popover open={openGenericCombobox} onOpenChange={setOpenGenericCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openGenericCombobox}
                      className="w-full justify-between"
                    >
                      {genericPosition
                        ? Object.values(genericPositions).flat().find((position) => position.id === genericPosition)?.title
                        : "Select position..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" side="bottom">
                    <Command className="w-full">
                      <CommandInput placeholder="Search position..." className="w-full" />
                      <CommandEmpty>No position found.</CommandEmpty>
                      <CommandList className="w-full max-h-[300px] overflow-auto">
                        <CommandGroup heading="Most Popular">
                          {genericPositions.popular.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                              className="w-full"
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-primary">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                <span className="ml-auto text-xs text-muted-foreground">
                                  {position.count} interviews
                                </span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        
                        <CommandGroup heading="Engineering">
                          {genericPositions.engineering.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-blue-500">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        
                        <CommandGroup heading="AI & Robotics">
                          {genericPositions.ai.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-purple-500">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        
                        <CommandGroup heading="Design">
                          {genericPositions.design.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-amber-500">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        
                        <CommandGroup heading="Data & Analytics">
                          {genericPositions.data.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-green-500">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        
                        <CommandGroup heading="Non-Tech Positions">
                          {genericPositions.nontech.map((position) => (
                            <CommandItem
                              key={position.id}
                              value={position.id}
                              onSelect={(currentValue) => {
                                setGenericPosition(currentValue)
                                setOpenGenericCombobox(false)
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="mr-2 text-orange-500">{position.icon}</div>
                                <span className="flex-1">{position.title}</span>
                                {genericPosition === position.id && (
                                  <CheckIcon className="ml-2 h-4 w-4 text-primary" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TabsContent>
              <TabsContent value="target" className="pt-4">
                <Label className="text-sm mb-2 block">Select one of your target positions:</Label>
                <Popover open={openPositionCombobox} onOpenChange={setOpenPositionCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPositionCombobox}
                      className="w-full justify-between"
                    >
                      {selectedPosition
                        ? `${selectedPosition.title} (${selectedPosition.company})`
                        : "Select position..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" side="bottom">
                    <Command className="w-full">
                      <CommandInput placeholder="Search target positions..." className="w-full" />
                      <CommandEmpty>No positions found. Add positions in Interview Strategy.</CommandEmpty>
                      <CommandList className="w-full max-h-[300px] overflow-auto">
                        <CommandGroup heading="Your Target Positions">
                          {targetPositions
                            .sort((a, b) => b.match - a.match) // Sort by match score descending
                            .map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.id}
                                onSelect={(currentValue) => {
                                  const selected = targetPositions.find(p => p.id === currentValue)
                                  setSelectedPosition(selected || null)
                                  setOpenPositionCombobox(false)
                                }}
                                className="w-full"
                              >
                                <div className="flex items-center w-full">
                                  <div className="flex-1">
                                    <div className="font-medium">{position.title}</div>
                                    <div className="text-muted-foreground text-xs">
                                      {position.company}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={position.match >= 85 ? 'success' : position.match >= 70 ? 'warning' : 'secondary'} 
                                      className="px-1.5 py-0 text-xs"
                                    >
                                      {position.match}% Match
                                    </Badge>
                                    {selectedPosition?.id === position.id && (
                                      <CheckIcon className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                </div>
                              </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <div className="py-1.5 px-2 text-xs text-muted-foreground italic">
                          These positions are from your Interview Strategy section.
                        </div>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Step 2: Interview Type */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium mb-3 block">Step 2: Select Interview Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {interviewTypes.map(type => (
                <div 
                  key={type.id}
                  className={`flex items-center p-3 rounded-md border cursor-pointer hover:bg-muted/50 ${interviewType === type.id ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setInterviewType(type.id)}
                >
                  <div className="flex items-center">
                    {type.icon}
                    <span className="font-medium">{type.label}</span>
                  </div>
                  {type.id === "comprehensive" && (
                    <Badge variant="outline" className="ml-auto text-xs">Recommended</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step 3: Start Button */}
          <div className="pt-4 border-t">
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={handleStartInterview}
              disabled={!canStartInterview}
            >
              <Play className="h-4 w-4 fill-current" /> 
              Start Interview Session
            </Button>
            {!canStartInterview && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Please select a position to start the interview
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="px-4 lg:px-6 mb-2">
          <h2 className="text-xl font-semibold tracking-tight">Recent Interviews</h2>
          <p className="text-muted-foreground">Your latest practice sessions and their results</p>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}