import { vapi } from './vapi.sdk';

// Interface for UI event handlers
export interface VapiEventHandlers {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeLevel?: (volume: number) => void;
  onMessage?: (message: Record<string, unknown>) => void;
  onError?: (error: Error | unknown) => void;
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
