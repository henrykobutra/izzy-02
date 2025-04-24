import Vapi from '@vapi-ai/web'

// This ensures vapi is only instantiated once even in development
// with hot module reloading
export const vapi = globalThis.vapiInstance || 
  (globalThis.vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!))

// Prevent multiple instantiations during Fast Refresh
if (process.env.NODE_ENV !== 'production') {
  globalThis.vapiInstance = vapi
}