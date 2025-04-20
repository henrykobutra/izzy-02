"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsFormSchema = z.object({
  interviewToughness: z.enum(["easy", "medium", "hard", "dynamic"]),
  seniorityLevel: z.enum(["junior", "mid-level", "senior", "staff", "dynamic"]),
  targetIndustry: z.enum([
    "tech",
    "finance",
    "healthcare",
    "education",
    "retail",
    "manufacturing",
    "dynamic",
    "other"
  ]),
  targetPosition: z.enum([
    "dynamic",
    "software-engineer",
    "frontend-developer",
    "backend-developer",
    "full-stack-developer",
    "devops-engineer",
    "data-scientist",
    "machine-learning-engineer",
    "product-manager",
    "designer",
    "other"
  ]),
  customPosition: z.string().min(2).max(100).optional(),
  feedbackDetail: z.enum(["concise", "standard", "detailed"]),
  languagePreference: z.enum(["english", "spanish", "french", "german", "chinese", "japanese"]),
  receiveNotifications: z.boolean().default(false),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock settings data - in real app, fetch from server
  const defaultValues: Partial<SettingsFormValues> = {
    interviewToughness: "dynamic",
    seniorityLevel: "dynamic",
    targetIndustry: "dynamic",
    targetPosition: "dynamic",
    feedbackDetail: "standard",
    languagePreference: "english",
    receiveNotifications: false,
  }

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })

  function onSubmit(data: SettingsFormValues) {
    setIsLoading(true)
    // In a real app, you would save settings via an API call here
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const watchTargetPosition = form.watch("targetPosition")
  const showCustomField = watchTargetPosition === "other"

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">Interview Settings</h1>
        <p className="text-muted-foreground">
          Customize your interview experience to match your preferences and goals
        </p>
      </div>

      <Tabs defaultValue="interview" className="w-[520px] space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="interview">Interview Settings</TabsTrigger>
          <TabsTrigger value="preferences">Other Preferences</TabsTrigger>
        </TabsList>
        
        <div className="w-[520px] mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="interview" className="space-y-6">
                <Card className="w-[520px]">
                  <CardHeader>
                    <CardTitle>Interview Configuration</CardTitle>
                    <CardDescription>
                      Adjust how your interviews are conducted
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="interviewToughness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Toughness Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select toughness level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dynamic">Dynamic (Recommended)</SelectItem>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Dynamic adjusts based on your performance during the interview
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seniorityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seniority Level Override</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select seniority level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dynamic">Dynamic (Based on resume)</SelectItem>
                              <SelectItem value="junior">Junior</SelectItem>
                              <SelectItem value="mid-level">Mid-level</SelectItem>
                              <SelectItem value="senior">Senior</SelectItem>
                              <SelectItem value="staff">Staff/Principal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Override if our system incorrectly identified your experience level
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Industry</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select target industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dynamic">Dynamic (Based on resume)</SelectItem>
                              <SelectItem value="tech">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the industry you&apos;re targeting for interviews
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Position</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select target position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dynamic">Dynamic (Based on resume)</SelectItem>
                              <SelectItem value="software-engineer">Software Engineer</SelectItem>
                              <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                              <SelectItem value="backend-developer">Backend Developer</SelectItem>
                              <SelectItem value="full-stack-developer">Full Stack Developer</SelectItem>
                              <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                              <SelectItem value="data-scientist">Data Scientist</SelectItem>
                              <SelectItem value="machine-learning-engineer">Machine Learning Engineer</SelectItem>
                              <SelectItem value="product-manager">Product Manager</SelectItem>
                              <SelectItem value="designer">UX/UI Designer</SelectItem>
                              <SelectItem value="other">Other (Specify)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the position you&apos;re interviewing for
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showCustomField && (
                      <FormField
                        control={form.control}
                        name="customPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specify Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your target position" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="w-[520px]">
                  <CardHeader>
                    <CardTitle>Additional Preferences</CardTitle>
                    <CardDescription>
                      Customize other aspects of your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="feedbackDetail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feedback Detail Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select feedback detail" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="concise">Concise</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Feedback detail customization is currently not supported.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languagePreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language Preference</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                              <SelectItem value="chinese">Chinese</SelectItem>
                              <SelectItem value="japanese">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Additional languages coming soon. Currently, interviews are only available in English.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="receiveNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive email notifications about new features and feedback
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save settings"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  )
}