/**
 * Generic retry function that attempts an operation multiple times before failing
 * @param operation The async function to retry
 * @param maxAttempts Maximum number of retry attempts
 * @param delayMs Delay between retries in milliseconds
 * @returns Result of the operation
 */
export async function retry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // If this was the last attempt, don't delay, just throw
      if (attempt === maxAttempts) {
        break;
      }
      
      // Wait before the next attempt
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  throw lastError;
}
