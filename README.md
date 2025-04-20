# Izzy - AI-Powered Interview Prep Platform

Izzy is an intelligent interview preparation platform that helps job seekers practice and improve their interview skills through AI-driven mock interviews, personalized feedback, and targeted preparation strategies.

## Features

- **AI Mock Interviews**: Practice with realistic interview simulations tailored to specific job positions and interview types
- **Personalized Profile Analysis**: Get insights on your professional profile strengths and areas for improvement
- **Interview Strategy**: Receive customized preparation plans based on job descriptions and your profile
- **Comprehensive Feedback**: Review detailed performance metrics and improvement suggestions after each practice session
- **Progress Tracking**: Monitor your improvement over time with visual analytics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **UI Components**: shadcn/ui component library
- **Authentication**: Supabase Auth
- **Data Visualization**: Recharts
- **AI Integration**: OpenAI SDK

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/izzy.git

# Navigate to the project directory
cd izzy

# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Development

```bash
# Start the development server
pnpm dev
```

Visit `http://localhost:3000` to view the application.

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

- `/app`: Next.js pages and layouts (App Router)
- `/components`: Reusable UI components
- `/lib`: Utility functions and authentication
- `/utils`: Helper functions including Supabase client setup
- `/public`: Static assets

## License

[MIT](LICENSE)