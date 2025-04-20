# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Code Style Guidelines
- **TypeScript**: Use strict typing, target ES2017
- **Imports**: Use absolute imports with `@/` prefix, group related imports
- **Components**: 
  - PascalCase for component names
  - kebab-case for file names
  - Use shadcn/ui patterns with className prop and cn() utility
  - Forward refs for component composition
- **Naming**: Prefix hooks with `use`, page components are `page.tsx`
- **CSS**: Use Tailwind with custom utility classes via cn()
- **Error Handling**: Return structured response objects with success/error properties
- **Forms**: Use React Hook Form with Zod validation
- **File Structure**: Follow Next.js App Router conventions