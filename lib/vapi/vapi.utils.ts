import { vapi } from './vapi.sdk';
import type { CreateAssistantDTO, AssistantOverrides } from '@vapi-ai/web/dist/api';
import type { InterviewSession } from '@/types/interview-session';
import { setupVapiEventListeners } from './vapi.events';
import type { VapiEventHandlers } from './vapi.events';
import { getUserInfo } from '@/services/user/getUserInfo';
import { formatInterviewQuestionsForAI, InterviewQuestion } from '@/utils/format-interview-questions';
import {
  OpenAIMessage,
  pushSystemMessage
} from '@/utils/openai-message-utils';
import type { StrategyAnalysis } from '@/types/strategy';
import { getStrategyById } from '@/services/database/strategies/getStrategy';

// This type definition assumes Vapi SDK uses specific string literals
// If we had access to @vapi-ai/web types, we would import them directly
interface DeepgramTranscriber {
  provider: "deepgram";
  model: string;
  language: "en-US"; // Using hardcoded value to match expected type
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

    let strategy: StrategyAnalysis | null = null

    if (session.interview_strategy_id) {
      strategy = await getStrategyById(session.interview_strategy_id)
    }

    if (debug) {
      console.log('Starting Vapi assistant with session data:', session);
    }

    const { firstName } = await getUserInfo();

    // Format the interview questions if they exist
    const formattedQuestions = session.suggested_interview_questions
      ? formatInterviewQuestionsForAI(session.suggested_interview_questions as InterviewQuestion[])
      : "";

    let messagesConstruct: OpenAIMessage[] = []

    pushSystemMessage(messagesConstruct, `You are a friendly, and excited professional interviewer. Your name is Izzy.`);
    pushSystemMessage(messagesConstruct, `You will be interviewing ${firstName}.`);
    pushSystemMessage(messagesConstruct, `The candidate is interviewing for the role of: ${session.job_title}`);
    if (session.interview_strategy_id && strategy) pushSystemMessage(messagesConstruct, `You will act as an interviewer of the company: ${strategy.job_company} ... and act according to the company culture. The company is also known to be in the ${strategy.job_industry} industry.`);
    pushSystemMessage(messagesConstruct, `You will be asking exactly ${session.interview_question_amount} questions.`);
    pushSystemMessage(messagesConstruct, `You will be asking the following questions: ${formattedQuestions} (in that order). These questions have been desinged based on the job profile and the candidate's profile by a professional interview question writer.`);
    pushSystemMessage(messagesConstruct, `If the candidate's answer are unclear, you will ask follow up questions to clarify.`);
    pushSystemMessage(messagesConstruct, `When giving feedback, be honest, constructive, yet professional`);
    pushSystemMessage(messagesConstruct, `You will be concise in your feedback and follow up questions`);
    pushSystemMessage(messagesConstruct, `Your are allowed to chit-chat with the candidate a little in the beginning.`);
    pushSystemMessage(messagesConstruct, `At the end, ask if the candidate has any questions about the role or the company.`);
    pushSystemMessage(messagesConstruct, `You will only speak for your self as the interviewer, and not for the candidate ${firstName}.`);
    pushSystemMessage(messagesConstruct, `When the candidate wants to end the interview, or at the end, you can let them know that they click the end interview button below.`);

    const config: CreateAssistantDTO = {
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: messagesConstruct,
      },
      voice: {
        provider: "vapi",
        voiceId: "Savannah",
      },
      firstMessage: `Hi ${firstName}, My name is Izzy, I'm here to help you prepare for your interview. How are you doing by the way?`,
      firstMessageMode: "assistant-speaks-first",
      silenceTimeoutSeconds: 45,
      maxDurationSeconds: 600,
      endCallMessage: "That concludes our interview. If you'd like to try again, feel free to start again! Have a nice day!",
      endCallPhrases: ["end interview", "end interview now", "end interview please", "end interview button", "end interview button please", "good bye", "bye bye", "have a good day", "have a nice day"],
      messagePlan: {
        idleMessages: [
          `Hi ${firstName}, You still there?`,
          `I haven't heard you for a while, ${firstName}, are you still there?`,
          `Are you still there?`,
        ],
        idleTimeoutSeconds: 12,
      }
    };
    return await vapi.start(config);

  } catch (error) {
    console.error('Error starting Vapi assistant:', error);
    throw error;
  }
};

// Re-export the event handlers from vapi.events.ts
export { setupVapiEventListeners };
export type { VapiEventHandlers };
