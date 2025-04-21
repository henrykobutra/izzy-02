import { vapi } from './vapi.sdk';
import type { InterviewSession } from '@/types/interview-session';

// This type definition assumes Vapi SDK uses specific string literals
// If we had access to @vapi-ai/web types, we would import them directly
interface DeepgramTranscriber {
  provider: "deepgram";
  model: string;
  language: "en-US"; // Using hardcoded value to match expected type
}

// OpenAI message types used by Vapi
type OpenAIMessageRole = "system" | "user" | "assistant" | "function" | "tool";
interface OpenAIMessage {
  role: OpenAIMessageRole;
  content: string;
}

interface AssistantOverrides {
  transcriber?: DeepgramTranscriber;
  recordingEnabled?: boolean;
  variableValues?: Record<string, any>;
}

interface CreateAssistantConfig {
  transcriber?: DeepgramTranscriber;
  model: {
    provider: string;
    model: string;
    messages: OpenAIMessage[];
  };
  voice: {
    provider: string;
    voiceId: string;
  };
  name?: string;
}

// Interface for UI event handlers
export interface VapiEventHandlers {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeLevel?: (volume: number) => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}

/**
 * Sets up event listeners for the Vapi instance
 * @param handlers Object containing event handler functions
 * @returns A cleanup function to remove all event listeners
 */
export function setupVapiEventListeners(handlers: VapiEventHandlers): () => void {
  // Set up all event handlers
  if (handlers.onCallStart) {
    vapi.on("call-start", handlers.onCallStart);
  }
  
  if (handlers.onCallEnd) {
    vapi.on("call-end", handlers.onCallEnd);
  }
  
  if (handlers.onSpeechStart) {
    vapi.on("speech-start", handlers.onSpeechStart);
  }
  
  if (handlers.onSpeechEnd) {
    vapi.on("speech-end", handlers.onSpeechEnd);
  }
  
  if (handlers.onVolumeLevel) {
    vapi.on("volume-level", handlers.onVolumeLevel);
  }
  
  if (handlers.onMessage) {
    vapi.on("message", handlers.onMessage);
  }
  
  if (handlers.onError) {
    vapi.on("error", handlers.onError);
  }
  
  // Return a cleanup function
  return () => {
    // Remove all event handlers
    if (handlers.onCallStart) {
      vapi.off("call-start", handlers.onCallStart);
    }
    
    if (handlers.onCallEnd) {
      vapi.off("call-end", handlers.onCallEnd);
    }
    
    if (handlers.onSpeechStart) {
      vapi.off("speech-start", handlers.onSpeechStart);
    }
    
    if (handlers.onSpeechEnd) {
      vapi.off("speech-end", handlers.onSpeechEnd);
    }
    
    if (handlers.onVolumeLevel) {
      vapi.off("volume-level", handlers.onVolumeLevel);
    }
    
    if (handlers.onMessage) {
      vapi.off("message", handlers.onMessage);
    }
    
    if (handlers.onError) {
      vapi.off("error", handlers.onError);
    }
  };
}

/**
 * Starts the Vapi assistant using session data from useInterviewSession
 * @param session The interview session data
 * @param debug Whether to log debug information
 * @returns Promise with the call object
 */
export const startVapiAssistant = async (session: InterviewSession | null, debug = false): Promise<any> => {
  try {
    if (!session) {
      throw new Error('No session data provided');
    }
    
    if (debug) {
      console.log('Starting Vapi assistant with session data:', session);
    }

    // Check for a custom property that might store the assistant ID
    // Checking multiple possible property names since it's not in the InterviewSession type
    const assistantId = (session as any).assistant_id || 
                       (session as any).vapi_assistant_id || 
                       null;

    if (assistantId) {
      const overrides: AssistantOverrides = {
        variableValues: {
          jobTitle: session.job_title || 'Software Engineer',
          interviewType: session.interview_type || 'behavioral',
          questionAmount: session.interview_question_amount || 3,
        }
      };
      
      if (debug) {
        console.log('Using existing assistant ID with overrides:', overrides);
      }
      
      return await vapi.start(assistantId, overrides);
    } else {
      // Create an inline configuration for the assistant
      const config: CreateAssistantConfig = {
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US"
        },
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [
            {
              role: "system", // Now using the specific OpenAIMessageRole type
              content: `You are an interviewer for a ${session.job_title || 'Software Engineer'} position. 
                        This is a ${session.interview_type || 'behavioral'} interview with ${session.interview_question_amount || 3} questions.
                        Ask relevant questions and provide helpful feedback.`,
            },
          ],
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer", // Choose appropriate voice
        },
        name: `${session.interview_type || 'Behavioral'} Interview Assistant`,
      };
      
      if (debug) {
        console.log('Creating assistant with config:', config);
      }
      
      // Cast to 'any' to bypass strict typing issues with the Vapi SDK
      // This is a workaround until we have proper types from the SDK
      return await vapi.start(config as any);
    }
  } catch (error) {
    console.error('Error starting Vapi assistant:', error);
    throw error;
  }
};
