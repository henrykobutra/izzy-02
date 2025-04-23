import Vapi from '@vapi-ai/web'

// Create a global variable to store the vapi instance
declare global {
  var vapiInstance: typeof Vapi.prototype | undefined
}

// This ensures vapi is only instantiated once even in development
// with hot module reloading
export const vapi = global.vapiInstance || 
  (global.vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!))

// Prevent multiple instantiations during Fast Refresh
if (process.env.NODE_ENV !== 'production') {
  global.vapiInstance = vapi
}