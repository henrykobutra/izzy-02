/**
 * Utility functions for working with OpenAI message format
 */

// OpenAI message types used by Vapi
export type OpenAIMessageRole = "system" | "user" | "assistant" | "function" | "tool";

export interface OpenAIMessage {
  role: OpenAIMessageRole;
  content: string;
}

/**
 * Creates an OpenAI message object with the specified content and role
 * @param content The message content
 * @param role The message role (defaults to "assistant")
 * @returns An OpenAIMessage object
 */
export const createMessage = (content: string, role: OpenAIMessageRole = "assistant"): OpenAIMessage => {
  return { role, content };
};

/**
 * Creates a system message
 * @param content The system message content
 * @returns An OpenAIMessage object with role="system"
 */
export const systemMessage = (content: string): OpenAIMessage => {
  return { role: "system", content };
};

/**
 * Adds a system message directly to an array of messages
 * @param messages The messages array to add to
 * @param content The system message content
 */
export const pushSystemMessage = (messages: OpenAIMessage[], content: string): void => {
  messages.push(systemMessage(content));
};

/**
 * Adds a user message directly to an array of messages
 * @param messages The messages array to add to
 * @param content The user message content
 */
export const pushUserMessage = (messages: OpenAIMessage[], content: string): void => {
  messages.push(createMessage(content, "user"));
};

/**
 * Adds an assistant message directly to an array of messages
 * @param messages The messages array to add to
 * @param content The assistant message content
 */
export const pushAssistantMessage = (messages: OpenAIMessage[], content: string): void => {
  messages.push(createMessage(content, "assistant"));
};
