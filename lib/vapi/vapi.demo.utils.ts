import { vapi } from './vapi.sdk';
import type { CreateAssistantDTO, Call } from '@vapi-ai/web/dist/api';
import { setupVapiEventListeners } from './vapi.events';
import type { VapiEventHandlers } from './vapi.events';
import {
  OpenAIMessage,
  pushSystemMessage
} from '@/utils/openai-message-utils';
import { genericPositions } from '@/constants/positions';
import type { GenericPositionEntry } from '@/constants/positions';

/**
 * Starts a demo Vapi assistant for showcasing the interview experience
 * This version works without any props and simulates a brief interview demo
 * @returns Promise with the call object or null
 */
export const startDemoVapiAssistant = async (): Promise<Call | null> => {
  try {
    const messagesConstruct: OpenAIMessage[] = [];

    // Configure the assistant's identity and behavior based on the prompt
    pushSystemMessage(messagesConstruct, `[Identity]  
You are a demo agent for an AI interview app designed to simulate interview experiences for users. This is a brief demo showcasing the app's capabilities.`);

    pushSystemMessage(messagesConstruct, `[Style]  
- Use a friendly and encouraging tone.  
- Keep the conversation professional and empathetic.  
- Address the user by name whenever possible for a personalized touch.`);

    pushSystemMessage(messagesConstruct, `[Response Guidelines]  
- Keep initial responses clear and concise.  
- Always start with a welcoming greeting.  
- Use simple, jargon-free language.  
- Maintain consistency in feedback delivery.  
- Ensure feedback is concise and to the point.`);

    pushSystemMessage(messagesConstruct, `[Task & Goals]  
1. Greet the user, let them know that this is going to be a brief demo session and ask how they're doing.  
2. Inquire if they are seeking to interview for a specific position.  
3. Ask the user to tell you about themselves as the first question.  
4. Ask a second question relevant to the specific position they mentioned.  
5. Provide concise feedback on the user's response to the second question.  
6. Suggest that the user explores the website for more information or sign up for personalized interviews.  
7. Politely say goodbye, addressing the caller by their name if available.`);

    pushSystemMessage(messagesConstruct, `[Error Handling / Fallback]  
- If the user's input is unclear or off-topic, politely ask clarifying questions.  
- If at any point, the user doesn't know how to proceed, guide them with gentle prompts.  
- In case of technical difficulties, apologize and suggest they try again later or contact support.`);

    // Add information about available positions to help the assistant
    const positionCategories = Object.keys(genericPositions);
    const allPositions = positionCategories.flatMap(
      category => genericPositions[category].map((p: GenericPositionEntry) => p.title)
    );

    pushSystemMessage(messagesConstruct, `Here are some common job positions you can suggest if the user is unsure: ${allPositions.join(', ')}`);

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
        voiceId: "Savannah", // Using Savannah voice as in the original
      },
      firstMessage: "Hi there! I'm Izzy, your AI interview assistant. This is a brief demo to showcase my interview simulation capabilities. How are you doing today?",
      firstMessageMode: "assistant-speaks-first",
      silenceTimeoutSeconds: 45,
      maxDurationSeconds: 600, // 10 minutes for demo
      endCallMessage: "Thank you for trying our demo! Feel free to explore our website for more information or sign up for personalized interview practice. Have a great day!",
      endCallPhrases: [
        "end interview",
        "end demo",
        "finish demo",
        "stop demo",
        "goodbye",
        "bye",
      ],
      messagePlan: {
        idleMessages: [
          "Are you still there?",
          "I'm waiting for your response. Do you need more time?",
          "If you're thinking about your answer, that's perfectly fine. Take your time.",
        ],
        idleTimeoutSeconds: 12,
      }
    };

    return await vapi.start(config);
  } catch (error) {
    console.error('Error starting demo Vapi assistant:', error);
    throw error;
  }
};

// Re-export the event handlers from vapi.events.ts
export { setupVapiEventListeners };
export type { VapiEventHandlers };
