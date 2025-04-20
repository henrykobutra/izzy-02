import { FeedbackOverviewCards } from "@/components/feedback/overview-cards";
import { FeedbackTable } from "@/components/feedback/feedback-table";
import { FeedbackMetrics } from "@/components/feedback/metrics";

import feedbackDataRaw from "./data.json";

// Use 'unknown' to break the typing chain, then cast to a compatible format
// This satisfies TypeScript while allowing potential runtime differences
const feedbackData = (feedbackDataRaw as unknown) as Array<{
  id: number;
  interviewTitle: string;
  type: string;
  date: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  metrics: Record<string, number>;
}>;

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Interview Feedback & Evaluation</h1>
        <p className="text-muted-foreground">
          Review detailed feedback and track your progress
        </p>
      </div>
      
      <FeedbackOverviewCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="md:col-span-2">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Performance Metrics</h2>
            <p className="text-sm text-muted-foreground">Key interview skills assessment</p>
          </div>
          <FeedbackMetrics />
        </div>
        
        <div className="bg-card rounded-lg p-4 shadow">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Improvement Areas</h2>
            <p className="text-sm text-muted-foreground">Focus on these skills</p>
          </div>
          <div className="space-y-4">
            {[
              { skill: "System Design", score: 65, action: "Practice architecture diagrams" },
              { skill: "Algorithm Efficiency", score: 72, action: "Review Big O notation" },
              { skill: "Behavioral Scenarios", score: 78, action: "Prepare more STAR examples" }
            ].map((area, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{area.skill}</span>
                  <span className="text-sm text-muted-foreground">{area.score}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${area.score}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{area.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="px-4 lg:px-6 mb-2">
          <h2 className="text-lg font-semibold">Interview History</h2>
          <p className="text-sm text-muted-foreground">Feedback from practice sessions</p>
        </div>
        <FeedbackTable data={feedbackData} />
      </div>
    </div>
  );
}