# BlindAI - AI-Arranged Blind Dating

Stop swiping. Start dating. Our AI arranges real blind dates with real chemistry.

## Features

- 🎯 **No Swiping** - AI analyzes compatibility and picks matches for you
- 🎭 **Blind Dates Only** - Meet face-to-face, no endless chatting
- ✨ **Deep Matching** - Values, communication style, life goals (not just photos)
- 📊 **Admin Dashboard** - Track users, matches, and success metrics

## Tech Stack

- **Frontend:** Next.js 15 + React + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (better-sqlite3)
- **AI:** Claude 3.5 Sonnet (Anthropic)
- **Deployment:** Vercel (recommended)

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Setup

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open app:**
   Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/blindai)

### Manual Deploy

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variable:**
   In Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key
   - Redeploy

## Database

The app uses SQLite with better-sqlite3. The database file (`blindai.db`) is created automatically on first run.

**Note:** SQLite works fine for MVP/testing, but for production with multiple regions, consider migrating to PostgreSQL or another server-based DB.

## Pages

- `/` - Landing page
- `/signup` - Onboarding questionnaire
- `/dashboard?userId=X` - User's matches
- `/admin` - Admin dashboard (all users + matches)

## API Routes

- `POST /api/signup` - Create new user
- `GET /api/matches?userId=X` - Get matches for user
- `POST /api/matches` - Accept/reject a match
- `GET /api/admin/users` - List all users (admin)
- `GET /api/admin/matches` - List all matches (admin)

## Matching Algorithm

The AI analyzes:
1. Value alignment (life goals, priorities)
2. Communication & conflict styles
3. Lifestyle compatibility (energy, routines)
4. Dealbreakers
5. Chemistry indicators (humor, romance styles)

Score > 60% = potential match

## Roadmap

### MVP (Current)
- [x] Questionnaire flow
- [x] AI matching engine
- [x] Match proposal system
- [x] Admin dashboard

### Phase 2
- [ ] Payments (Stripe)
- [ ] Email/SMS notifications
- [ ] ID verification
- [ ] Date scheduling + calendar integration
- [ ] Post-date feedback loop
- [ ] Safety features (check-in, reports)

### Phase 3
- [ ] Mobile apps (React Native)
- [ ] Multi-city expansion
- [ ] Referral program
- [ ] Premium tier
- [ ] Venue partnerships

## Business Model

- **Pay-per-date:** $10-25 per arranged date
- **Subscription:** 4 dates/month for $50
- **Premium:** Priority matching, coaching, feedback
- **Venue partnerships:** Kickbacks from restaurants/bars

## Contributing

This is a commercial project. Contact the owner for partnership/investment opportunities.

## License

Proprietary - All rights reserved

## Contact

Questions? Email: [your-email]
