# Portfolio Platform - Frontend

Beautiful, animated frontend for the AI-powered portfolio creation platform.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Custom neumorphic design system

## Setup

### Prerequisites

- Node.js 20+
- Git

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-portfolio-builder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start development server
```bash
npm run dev
```

App will run on http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- `/` - Landing page
- `/signup` - User registration
- `/login` - User login
- `/verify-email` - Email verification
- `/dashboard` - User dashboard (protected)
- `/auth/callback` - OAuth callback handler

## Project Structure
```
app/
├── (auth)/          # Authentication pages
├── auth/            # OAuth callback
├── components/      # React components
├── services/        # API services
└── page.tsx         # Landing page
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

See DEPLOYMENT.md for detailed instructions.

## License

MIT