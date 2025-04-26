"use client"

import { useState, useEffect } from "react"
import { useGenerateProfile } from "@/hooks/agents/useGenerateProfile";
import { useProfiles } from "@/hooks/profile/useProfiles";
import type { ProfileAnalysis } from "@/types/profile";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Linkedin,
  Upload,
  FileText,
  CheckCircle,
  Calendar,
  Brain,
  BarChart3,
  Award,
  Briefcase,
  GraduationCap,
  Mic,
  UserSquare2,
  ChevronUp,
  RefreshCw,
  Check,
  ChevronsUpDown
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "sonner"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { profileAnalysisLoadingStates } from "@/constants/loadingStates"
import { SampleProfile, sampleProfiles } from "@/constants/sampleProfiles"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
}
  from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export default function ProfileAnalysisPage() {
  const [resumeContent, setResumeContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [highlightProfileCard, setHighlightProfileCard] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<ProfileAnalysis | null>(null)
  const [openSampleProfilesCombobox, setOpenSampleProfilesCombobox] = useState(false)
  const [selectedSampleProfile, setSelectedSampleProfile] = useState<SampleProfile | null>(null)
  const { generateProfile, error: generateProfileError } = useGenerateProfile();
  const { profile, loading: profileLoading, exists: profileExists } = useProfiles();

  // Control collapsible state based on profile existence
  useEffect(() => {
    // Open by default when no profile exists, close when profile exists
    setIsUpdateOpen(!profileExists)
  }, [profileExists]);

  const handleAnalyzeProfile = async () => {
    if (!resumeContent.trim()) return

    setIsAnalyzing(true)
    setAnalysisResult(null)

    try {
      const result = await generateProfile(resumeContent);

      if (!result || generateProfileError) {
        toast("Failed to generate profile", {
          description: generateProfileError ? (generateProfileError as string) : "Please try again.",
        })
        return
      }

      setAnalysisResult({ ...result, is_removed: false });

      // Close the update panel after successful analysis
      setIsUpdateOpen(false);
    } catch (err) {
      toast("Failed to generate profile", {
        description: err instanceof Error ? err.message : "Please try again.",
      })
    } finally {
      setIsAnalyzing(false)
      window.scrollTo({ top: document.getElementById("analysis-results")?.offsetTop || 0, behavior: "smooth" })
    }
  }

  const handleSelectSampleProfile = (profile: SampleProfile) => {
    setSelectedSampleProfile(profile)
    setResumeContent(profile.content)
    setOpenSampleProfilesCombobox(false)
  }

  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-bold tracking-tight mb-4">Profile Analysis</h1>
          <p className="text-muted-foreground mb-6">
            Update your profile to get fresh analysis or view your current profile details
          </p>
        </div>

        <Card className={`mx-4 lg:mx-6 transition-all ${highlightProfileCard ? 'ring-2 ring-primary ring-offset-2 animate-pulse' : ''}`}>
          <Collapsible open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Profile Update</CardTitle>
                <CardDescription className="mt-1.5">
                  {profileExists
                    ? "Update your existing profile with new information"
                    : "Create your profile by pasting your resume or using our AI assistant"}
                </CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant={isUpdateOpen ? "ghost" : "outline"} size={isUpdateOpen ? "icon" : "default"} className={isUpdateOpen ? "h-8 w-8" : ""}>
                  {isUpdateOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>{profileExists ? "Update Profile" : "Create Profile"}</span>
                    </div>
                  )}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>

            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-medium">Choose how to update your profile</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-2">
                  {/* Resume Paste - Takes 2/3 width */}
                  <div className="lg:col-span-7 space-y-4 border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Paste Your Resume</h3>
                    </div>
                    <Textarea
                      placeholder="Paste your resume text here..."
                      className="h-[180px] font-mono text-sm"
                      value={resumeContent}
                      onChange={(e) => setResumeContent(e.target.value)}
                      disabled={isAnalyzing}
                    />
                    <div className="flex justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setResumeContent('');
                          setSelectedSampleProfile(null);
                        }}
                        disabled={!resumeContent.trim() || isAnalyzing}
                        className={(!resumeContent.trim() || isAnalyzing) ? '' : 'cursor-pointer'}
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={handleAnalyzeProfile}
                        disabled={!resumeContent.trim() || isAnalyzing}
                        className={(!resumeContent.trim() || isAnalyzing) ? '' : 'cursor-pointer'}
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

                  {/* Insert Sample Profile - Takes 1/3 width */}
                  <div className="lg:col-span-4 border bg-slate-50 dark:bg-slate-900/40 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="mb-4 w-full">
                      <div className="flex items-center justify-center">
                        <div className="inline-flex h-8 items-center text-primary font-medium text-sm">
                          <FileText className="h-4 w-4 mr-1.5 flex-shrink-0" />
                          <span className="text-white">Sample Profiles</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground px-1 mt-2">
                        Try with a sample profile to see how the analysis works
                      </p>
                    </div>

                    <div className="w-full space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                      <div className="relative">
                        <Popover open={openSampleProfilesCombobox} onOpenChange={setOpenSampleProfilesCombobox}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSampleProfilesCombobox}
                              className="w-full justify-between border-dashed h-9 sm:h-11 text-xs sm:text-sm"
                              disabled={isAnalyzing}
                            >
                              {selectedSampleProfile ? (
                                <span className="font-medium truncate max-w-[200px]">{selectedSampleProfile.label}</span>
                              ) : (
                                <span>Choose from the list...</span>
                              )}
                              <ChevronsUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50 flex-shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] sm:w-[300px] p-0" align="center">
                            <Command>
                              <CommandEmpty>No sample profile found.</CommandEmpty>
                              <CommandGroup>
                                {sampleProfiles.map((profile) => (
                                  <CommandItem
                                    key={profile.value}
                                    value={profile.value}
                                    onSelect={() => handleSelectSampleProfile(profile)}
                                    className="flex items-center gap-2 text-xs sm:text-sm"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0",
                                        selectedSampleProfile?.value === profile.value
                                          ? "opacity-100 text-primary"
                                          : "opacity-0"
                                      )}
                                    />
                                    <span className="truncate">{profile.label}</span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>


                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="rounded-lg border bg-slate-50 dark:bg-slate-900/40 p-4">
                  <h3 className="text-sm font-medium mb-3">More Profile Options</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className={`inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2 cursor-not-allowed select-none ${isAnalyzing ? 'opacity-40' : 'opacity-60'}`}>
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span>Upload Resume</span>
                      <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
                    </div>

                    <div className={`inline-flex items-center text-sm bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 gap-2 cursor-not-allowed select-none ${isAnalyzing ? 'opacity-40' : 'opacity-60'}`}>
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <span>Sync with LinkedIn</span>
                      <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">Coming Soon</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We&apos;re working on more ways to update your profile, including document uploads and LinkedIn integration.
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <MultiStepLoader
          loadingStates={profileAnalysisLoadingStates}
          loading={isAnalyzing}
          duration={1800}
          loop={false}
        />

        {/* Profile Analysis Results */}
        <div id="analysis-results">
          {isAnalyzing ? (
            <></>
          ) : analysisResult ? (
            <Card className="mx-4 lg:mx-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle>New Profile Analysis</CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Just now</span>
                  </div>
                </div>
                <CardDescription>
                  AI-powered analysis of your professional profile and qualifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Success Message */}
                <div className="rounded-lg border overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/30 p-4 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-semibold">Analysis Complete</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your profile has been successfully analyzed and saved to your account.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-950">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 cursor-pointer"
                        onClick={() => window.location.reload()}
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        View Saved Profile
                      </Button>

                      <Link href="/dashboard/interview-strategy">
                        <Button
                          size="sm"
                          className="gap-1.5 bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        >
                          <BarChart3 className="h-3.5 w-3.5" />
                          Set Target Position
                        </Button>
                      </Link>

                      <Link href="/dashboard/practice-interview">
                        <Button
                          size="sm"
                          className="gap-1.5 bg-purple-500 hover:bg-purple-600 cursor-pointer"
                        >
                          <Mic className="h-3.5 w-3.5" />
                          Practice Interview
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Professional Summary
                  </h3>
                  <div className="pl-7 space-y-2">
                    <p className="text-sm whitespace-pre-line">
                      {analysisResult?.professional_summary}
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
                      {analysisResult?.skills?.primary_category_name && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{analysisResult.skills.primary_category_name}</h4>
                          <div className="space-y-2">
                            {analysisResult.skills.primary.map((skill) => (
                              <div key={skill.skill} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{skill.skill}</span>
                                  <span className="text-muted-foreground">{skill.rating}%</span>
                                </div>
                                <Progress value={skill.rating} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {analysisResult?.skills?.secondary_category_name && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{analysisResult.skills.secondary_category_name}</h4>
                          <div className="space-y-2">
                            {analysisResult.skills.secondary.map((skill) => (
                              <div key={skill.skill} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{skill.skill}</span>
                                  <span className="text-muted-foreground">{skill.rating}%</span>
                                </div>
                                <Progress value={skill.rating} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {analysisResult?.skills?.other && analysisResult.skills.other.length > 0 && (
                      <div className="pt-2">
                        <h4 className="font-medium text-sm mb-2">Other Technical Competencies</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.skills.other.map((skill) => (
                            <Badge key={skill.skill} variant="secondary" className="px-3 py-1">
                              {skill.skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : profileLoading ? (
            <></>
          ) : !profileExists ? (
            <Card className="mx-4 lg:mx-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserSquare2 className="h-5 w-5 text-primary" />
                  <CardTitle>No Profile Found</CardTitle>
                </div>
                <CardDescription>
                  You don&apos;t have a profile yet. Complete the form above to create your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-10">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="rounded-full bg-muted p-6">
                    <UserSquare2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Create Your Profile</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      To get started, paste your resume or use one of the other options above to create your professional profile.
                    </p>
                  </div>
                  <Button onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setHighlightProfileCard(true);
                    setIsUpdateOpen(true);
                    setTimeout(() => setHighlightProfileCard(false), 1500);
                  }}
                    className="cursor-pointer"
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mx-4 lg:mx-6">
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
                    <p className="text-sm whitespace-pre-line">
                      {profile?.professional_summary}
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
                      {profile?.skills?.primary_category_name && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{profile.skills.primary_category_name}</h4>
                          <div className="space-y-2">
                            {profile.skills.primary.map((skill) => (
                              <div key={skill.skill} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{skill.skill}</span>
                                  <span className="text-muted-foreground">{skill.rating}%</span>
                                </div>
                                <Progress value={skill.rating} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {profile?.skills?.secondary_category_name && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{profile.skills.secondary_category_name}</h4>
                          <div className="space-y-2">
                            {profile.skills.secondary.map((skill) => (
                              <div key={skill.skill} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{skill.skill}</span>
                                  <span className="text-muted-foreground">{skill.rating}%</span>
                                </div>
                                <Progress value={skill.rating} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {profile?.skills?.other && profile.skills.other.length > 0 && (
                      <div className="pt-2">
                        <h4 className="font-medium text-sm mb-2">Other Technical Competencies</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.other.map((skill) => (
                            <Badge key={skill.skill} variant="secondary" className="px-3 py-1">
                              {skill.skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
                      <Badge key={profile?.experience_level} className="px-3 py-1 capitalize" variant="outline">
                        {profile?.experience_level}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{profile?.experience_level_summary}</p>
                    </div>

                    {profile?.industries && profile.industries.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Industry Experience</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.industries.map((industry) => (
                            <Badge key={industry} variant="outline" className="px-3 py-1">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {profile?.achievements && profile.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Notable Achievements</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {profile.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {profile?.experience && profile.experience.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Work Experience</h4>
                        <div className="space-y-4">
                          {profile.experience.map((exp, idx) => (
                            <div key={idx} className="space-y-1 border-l-2 border-muted pl-4">
                              <div className="flex items-baseline justify-between">
                                <h5 className="font-medium text-sm">{exp.title}</h5>
                                <span className="text-xs text-muted-foreground">{exp.years} {exp.years === 1 ? 'year' : 'years'}</span>
                              </div>
                              {exp.company && <p className="text-xs">{exp.company}</p>}
                              <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education & Certifications
                  </h3>
                  <div className="pl-7 space-y-3">
                    {profile?.education && profile.education.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Education</h4>
                        <ul className="space-y-1">
                          {profile.education.map((edu, idx) => (
                            <li key={idx} className="text-sm">
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {profile?.certifications && profile.certifications.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Certifications</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {profile.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/30 p-4 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold text-lg">Continue Your Interview Prep</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your profile analysis is ready. Where would you like to go next?
                    </p>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card 1: Set Target Position */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-950">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/40 p-2.5">
                          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Set Target Position</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Receive tailored interview preparation specific to your target job
                          </p>
                        </div>
                      </div>
                      <Link href="/dashboard/interview-strategy" className="w-full">
                        <Button
                          className="w-full mt-3 bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        >
                          Continue
                        </Button>
                      </Link>
                    </div>

                    {/* Card 2: Practice Interview */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-950">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 p-2.5">
                          <Mic className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Practice Interview</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Start practicing right away with AI-powered interview simulations
                          </p>
                        </div>
                      </div>
                      <Link href="/dashboard/practice-interview" className="w-full">
                        <Button
                          className="w-full mt-3 bg-purple-500 hover:bg-purple-600 cursor-pointer"
                        >
                          Start Practice
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}