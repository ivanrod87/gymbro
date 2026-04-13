# Sprint 1 Setup Guide

## ✅ Foundation Complete

Your GymBro PWA has been initialized with the Sprint 1 foundational structure. Here's what's included:

### 🏗️ Folder Structure (Three-Map Hierarchy)

```
gymbro/
├── app/
│   ├── (auth)/login/           # Login page
│   ├── (dashboard)/
│   │   ├── home/               # Dashboard home
│   │   ├── settings/           # User settings
│   │   └── analytics/          # Analytics dashboard
│   ├── layout.tsx              # Root layout with dark mode + navbar
│   ├── globals.css             # Tailwind + dark mode styles
│   └── page.tsx                # Redirect to dashboard
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Navbar.tsx          # Mobile-first navigation
│   │   ├── Button.tsx          # Styled button component
│   │   └── Toggle.tsx          # Toggle switch component
│   ├── workout/                # Workout-related components
│   │   └── ExerciseCard.tsx    # Exercise display card
│   └── dashboard/              # Dashboard components
│       └── MetricCard.tsx      # Metric display card
├── lib/
│   ├── supabaseClient.ts       # Supabase initialization
│   └── utils.ts                # AI helper functions
├── types/
│   └── database.types.ts       # TypeScript database definitions
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/                  # App icons (placeholder)
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Dark mode as default
├── next.config.mjs             # Next.js + next-pwa config
├── postcss.config.js           # Postprocessing
└── .env.example                # Environment variables template
```

### 🎨 Tailwind Dark Mode Setup

- Dark mode is configured as the **default** theme
- Custom dark color palette (dark-50 to dark-900)
- CSS utilities for safe area insets (mobile notch support)
- Base component layers: `.card-base`, `.btn-primary`, `.btn-secondary`

### 📱 PWA Configuration

- **Manifest**: `public/manifest.json` with:
  - Standalone display mode for full-screen InstallApp
  - Dark theme colors (#0f0f0f)
  - App shortcuts for quick actions
  - Placeholder icons (add your gym icons to `public/icons/`)
- **next-pwa**: Configured in `next.config.mjs` for offline support

### 🧩 Component Structure

**UI Components** (`/components/ui/`):
- `Navbar.tsx`: Mobile bottom navigation with Lucide icons
- `Button.tsx`: Reusable button with variants (primary, secondary, outline)
- `Toggle.tsx`: Toggle switch for session modifiers (tired, quick session, etc.)

**Workout Components** (`/components/workout/`):
- `ExerciseCard.tsx`: Display exercise with sets/reps/weight and priority level

**Dashboard Components** (`/components/dashboard/`):
- `MetricCard.tsx`: Display key metrics (power level, consistency, etc.)

### 📚 Lib & Types

**Lib** (`/lib/`):
- `supabaseClient.ts`: Supabase client initialization (requires env vars)
- `utils.ts`: AI helper functions (power level, calorie estimation, PPL category, etc.)

**Types** (`/types/`):
- `database.types.ts`: Full TypeScript definitions for all database tables

### 🚀 Next Steps (Sprint 1 Continued)

1. **Add Gym Icons to PWA**:
   - Add 192x192 and 512x512 PNG icons to `public/icons/`
   - Update manifest.json icon paths

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`

4. **Set Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials (or mock them for now)

5. **Deploy to Vercel**:
   - Push to GitHub
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy!

### 📋 Mobile Responsiveness

- Navbar fixed to bottom with safe area support (handles iPhone notches/Android gestures)
- Container constrained to max-width for better UX on large screens
- Grid layouts use responsive utilities (grid-cols-1, gap-4, etc.)

### 🔐 Authentication (Sprint 2)

Placeholder login page ready at `/auth/login`
- Sprint 2 will integrate Supabase Auth with predefined pilot credentials

---

**Sprint 1 Definition of Done** ✅:
- Next.js 14 App Router initialized
- Tailwind with dark mode as default
- PWA manifest and next-pwa configured
- Folder structure established
- Mobile-first layout with responsive navbar
- Ready for deployment to Vercel
