# Izzy 🤖 - Your AI Sidekick for Interview Mastery

Izzy is your intelligent interview preparation companion that transforms nervous job seekers into confident interviewees through AI-driven mock interviews, personalized feedback, and targeted preparation strategies. Never face an interview unprepared again!

## ✨ Features

- **AI Mock Interviews** 🎯: Practice with hyper-realistic interview simulations tailored to specific job positions (from engineering to design and beyond!)
- **Personalized Profile Analysis** 📊: Get deep insights on your professional strengths and improvement areas with collapsible detailed summaries
- **Interview Strategy** 🧠: Receive customized preparation plans based on job descriptions and your professional profile
- **Comprehensive Feedback** 🔄: Review detailed performance metrics and actionable improvement suggestions after each practice session
- **Progress Tracking** 📈: Visualize your improvement journey with beautiful analytics
- **Voice-Powered Interviews** 🎙️: Experience natural conversation with AI interviewers using VAPI's voice agents

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **UI Components**: shadcn/ui component library for sleek, accessible interfaces
- **State Management**: React Hooks and Context API
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI Integration**:
  - OpenAI SDK
  - Google Gemini Pro 2.5 Preview
  - VAPI for voice agents and conversational routing
- **Development**: Coded with Windsurf 🏄‍♂️

> **Good News!** This project can be run completely for free:
>
> - VAPI provides 1,000 free minutes for voice conversations
> - Google AI Studio offers free API access (with limits)
> - Supabase has a generous free tier

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm package manager (`npm install -g pnpm`)
- Supabase account (free tier works fine)
- VAPI account for voice agent features
- Google AI API key (for Gemini Pro)

### Installation

```bash
# Clone the repository
git clone https://github.com/henrykobutra/izzy-02.git

# Navigate to the project directory
cd izzy

# Install dependencies (required before first run)
pnpm install
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. After your project is created, go to Project Settings > API to find your project URL and anon key
3. Review the database schema in the `/supabase/migrations` directory and modify as needed
4. You can implement the migrations manually in your Supabase project or use the Supabase CLI

The database schema is defined in SQL migrations and can be customized to fit your requirements. The types for the database tables can be found in `/types/supabase.ts`.

### AI Services Setup

#### Google AI Studio

1. Visit [Google AI Studio](https://ai.google.dev/) to create an account
2. Generate an API key for Gemini Pro
3. It's recommended to test your agents in Google AI Studio before implementing them in the application

#### VAPI

1. Create an account at [VAPI](https://vapi.ai/)
2. Generate a web token for your project
3. You'll get 1,000 free minutes which is plenty for testing interview scenarios

### Environment Setup

Create a `.env.local` file in the root directory with these required variables:

```
# Supabase - Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AI - Get this from Google AI Studio
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# VAPI - Get this from your VAPI dashboard
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
```

### Development Workflow

```bash
# Make sure dependencies are installed
pnpm install

# Start the development server
pnpm dev

# Run linting
pnpm lint

# Type checking
pnpm exec tsc --noEmit
```

Visit `http://localhost:3000` to view the application.

### Production Build

```bash
# Make sure dependencies are installed
pnpm install

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

- `/app`: Next.js pages and layouts using the App Router
- `/components`: Reusable UI components including our collapsible profile interfaces
- `/constants`: Application constants including position definitions in `positions.ts`
- `/lib`: Utility functions and authentication helpers
  - `/lib/vapi`: VAPI voice agent configuration and utilities
- `/services`: Service integrations and agent setups
  - `/services/agents`: AI agent configurations for different interview scenarios
- `/supabase`: Supabase configurations and migrations
  - `/supabase/migrations`: SQL database schema definitions
- `/types`: TypeScript type definitions including Supabase schema types
- `/utils`: Helper functions and Supabase client setup
- `/public`: Static assets and images

## 🔍 Key Components

- **Profile Dashboard**: Features collapsible interface showing detailed professional summaries and industry experiences
- **Position Selection**: Comprehensive library of job positions organized by categories (engineering, design, data, etc.)
- **Mock Interview Interface**: Realistic interview simulation with real-time voice feedback powered by VAPI
- **Quick Interview**: Start an instant interview session from anywhere in the app
- **Educational Review**: Transparent about the project's educational nature and limitations

## 🧪 Testing

```bash
# Run tests
pnpm test
```

## 🤖 AI Agents & Configuration

### VAPI Voice Agents

The project uses VAPI for voice-powered interviews. The configuration for these agents can be found in `/lib/vapi/vapi.utils.ts`. You can customize:

- Voice selection
- Conversation parameters
- System instructions
- Timeout settings
- Model selection

Example configuration from the project:

```typescript
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
  // Additional configuration...
};
```

### Interview Agents

The `/services/agents` directory contains various agent implementations for different aspects of the interview process:

- Profile analysis
- Interview question generation
- Feedback evaluation
- Strategy planning

These agents use a combination of Google Gemini and OpenAI models with specialized prompts for each task.

## 👨‍💻 About the Project

Izzy AI began as a finals project for the Deep Learning class at Houston Community College System (HCCS), Spring 2025 term. It was created by Henry Kobutra as an opportunity to apply theoretical deep learning concepts to a practical application that can help real people with interview preparation.

### Our Mission

At Izzy AI, we're building intelligent interview preparation tools to help job seekers develop their skills, build confidence, and succeed in their career journeys. We're guided by core values:

- **Educational Impact**: Making interview preparation accessible to all learners
- **Ethical AI Development**: Building AI systems with transparency, fairness, and user privacy
- **Continuous Improvement**: Refining our agents based on educational research and feedback

### Project Timeline

- **March 2025**: Project inception as part of HCCS Deep Learning class
- **April 2025**: Design and implementation phase
- **May 2025**: Educational Preview Launch

## 📝 License

[MIT](LICENSE)

## ⚡ Fun Fact

Did you know? The average person changes jobs 12 times during their career. With Izzy, you'll nail every single interview along the way!
