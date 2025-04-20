"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  IconArrowLeft, 
  IconCalendar, 
  IconChartBar, 
  IconCheckbox, 
  IconMessageCircle, 
  IconPlayerPlay,
  IconThumbDown, 
  IconThumbUp
} from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import feedbackData from "../data.json";

// Define the type for a feedback item
interface FeedbackItem {
  id: number;
  interviewTitle: string;
  type: string;
  date: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  metrics: {
    [key: string]: number | undefined;
  };
}

export default function FeedbackDetail() {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<FeedbackItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the feedback entry with the matching ID
    const feedbackEntry = feedbackData.find(item => item.id.toString() === id);
    setFeedback(feedbackEntry || null); // Explicitly set null if undefined
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="px-6 py-8">Loading feedback details...</div>;
  }

  if (!feedback) {
    return (
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold">Feedback not found</h2>
        <p className="mt-2">The requested feedback entry could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/feedback">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Feedback
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6 flex flex-col gap-2">
        <Button variant="ghost" asChild className="w-fit -ml-2 mb-2">
          <Link href="/dashboard/feedback">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Feedback
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{feedback.interviewTitle}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{feedback.type}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <IconCalendar className="h-3.5 w-3.5 mr-1" />
                {new Date(feedback.date).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <IconPlayerPlay className="h-4 w-4 mr-2" />
              Replay Interview
            </Button>
            <Button size="sm">
              <IconMessageCircle className="h-4 w-4 mr-2" />
              Practice Again
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="flex-1">
        <div className="px-4 lg:px-6 mb-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="comparison">Progress Comparison</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Overall Score</h3>
                      <p className="text-sm text-muted-foreground">Performance assessment</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl font-bold text-primary">{feedback.overallScore}%</div>
                      <div className="h-16 w-16 rounded-full border-8 border-primary flex items-center justify-center">
                        {feedback.overallScore >= 80 ? (
                          <IconThumbUp className="h-8 w-8 text-primary" />
                        ) : (
                          <IconThumbDown className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Key Strengths</h3>
                      <ul className="space-y-2">
                        {feedback.strengths.map((strength: string, i: number) => (
                          <li key={i} className="flex gap-2">
                            <IconThumbUp className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Areas to Improve</h3>
                      <ul className="space-y-2">
                        {feedback.improvements.map((improvement: string, i: number) => (
                          <li key={i} className="flex gap-2">
                            <IconCheckbox className="h-5 w-5 text-amber-500 flex-shrink-0" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(feedback.metrics).map(([key, value]: [string, number | undefined], i: number) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-sm font-medium">{value}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-primary" 
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Interviewer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="mb-2">Candidate showed strong technical knowledge and communication skills.</p>
                    <p className="mb-2">Approach to problem-solving was methodical and well-structured.</p>
                    <p>Areas for improvement include optimizing solutions for performance and considering edge cases more thoroughly.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommended Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.improvements.map((improvement: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconChartBar className="h-4 w-4 text-primary" />
                        </div>
                        <span>Practice guide: {improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transcript">
          <div className="px-4 lg:px-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <p className="text-muted-foreground">Transcript will appear here after the interview is processed.</p>
                  <Button variant="outline">
                    Generate Transcript
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="px-4 lg:px-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <p className="text-muted-foreground">Progress comparison with previous interviews will appear here.</p>
                  <Button variant="outline">
                    Compare with Previous
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}