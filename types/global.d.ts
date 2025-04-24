// Type declaration for globalThis.vapiInstance
import type Vapi from '@vapi-ai/web';
declare global {
  // Allow attaching vapiInstance to globalThis
  var vapiInstance: InstanceType<typeof Vapi> | undefined;
}
export {};
