# AI-Driven PPL Personal Fitness App — 12-Week Roadmap

This document translates the product scope into a Copilot-friendly sprint plan for a **single-user, AI-assisted PWA** built with **Next.js, Tailwind CSS, Supabase, Gemini API, and Vercel**.

## Project Context

- **App type:** Personal Push-Pull-Legs workout tracking PWA
- **Primary user:** Single user during pilot stage
- **Frontend:** Next.js (App Router)
- **PWA:** `next-pwa`
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database/Auth:** Supabase (PostgreSQL)
- **ORM:** Prisma or Drizzle
- **AI logic:** Gemini API
- **Charts:** Recharts
- **Deployment:** Vercel
- **Media pipeline:** External AI image/GIF workflow managed separately

## Build Principles

- Keep each sprint limited to **3 concrete deliverables**.
- Prioritize a usable app as early as possible.
- Favor production-ready scaffolding over mock-only work.
- Use Copilot-friendly tasks with clear implementation targets.
- Ship vertical slices: UI + logic + persistence wherever possible.

---

## Phase 1 — Usable Skeleton (Weeks 1–3)

### Sprint 1 — Deployment and PWA Setup

#### Goals
Establish the app shell, installability, and live deployment.

#### Tasks
1. **Initialize the Next.js project**
   - Create a new Next.js app using the App Router.
   - Install and configure Tailwind CSS.
   - Set dark mode as the default visual theme for the pilot.

2. **Configure PWA support**
   - Install and configure `next-pwa`.
   - Add `manifest.json`, app icons, theme color, and offline behavior.
   - Make sure the app can be installed on Android and iOS.

3. **Deploy to Vercel**
   - Push the codebase to GitHub.
   - Connect the repository to Vercel.
   - Verify the app builds, deploys, and loads correctly on mobile.

#### Definition of Done
- The app is live on Vercel.
- The app can be installed to a phone home screen.
- Tailwind and dark mode are working.

---

### Sprint 2 — Authentication and Body Weight Tracking

#### Goals
Connect the app to Supabase, enable login, and store body weight entries.

#### Tasks
1. **Connect Supabase and create initial schema**
   - Connect the app to Supabase.
   - Create tables for `profiles` and `body_stats`.
   - Add fields for body weight value and measurement date.

2. **Build predefined login flow**
   - Create a login page.
   - Support pilot-stage predefined credentials.
   - Persist session state for the single-user workflow.

3. **Create the body weight input card**
   - Add a weight input card to the home screen.
   - Save body weight entries to the database.
   - Show the latest recorded value after save.

#### Definition of Done
- Login works.
- Body weight can be entered and stored.
- The latest body weight is visible on the dashboard.

---

### Sprint 3 — Exercise Library and PPL Engine

#### Goals
Create the first functional workout engine using seeded exercises and simple scheduling.

#### Tasks
1. **Seed the exercise database**
   - Create an `exercises` table.
   - Seed push, pull, and legs exercises.
   - Include metadata such as priority tier, muscle group, and active/inactive state.

2. **Build basic calendar logic**
   - Implement a PPL rotation based on a configurable starting point.
   - Support a simple recurring weekly training schedule.
   - Determine today’s training category from the defined plan.

3. **Render today’s exercise list**
   - Show today’s PPL label on the home screen.
   - Display the exercises assigned to today’s category.
   - Keep the first version simple and deterministic.

#### Definition of Done
- The database contains seeded exercises.
- The app can determine today’s workout type.
- The home screen shows a basic daily workout list.

---

## Phase 2 — Adaptive Coaching (Weeks 4–6)

### Sprint 4 — Gemini AI Integration

#### Goals
Introduce AI-generated workout logic and replace static workout generation.

#### Tasks
1. **Create the Gemini API route**
   - Add a Next.js server route for Gemini requests.
   - Store API credentials in environment variables.
   - Return structured JSON responses for workout generation.

2. **Write the coach prompt**
   - Build a prompt that considers previous workout history.
   - Ask Gemini to suggest today’s exercises, weights, reps, and rest times.
   - Keep output structured and schema-friendly.

3. **Replace static workouts with AI output**
   - Swap the basic daily list for AI-generated sessions.
   - Fall back gracefully if AI output fails.
   - Persist generated sessions for the current day.

#### Definition of Done
- Gemini is connected.
- The app can generate a structured workout for the day.
- The home screen displays AI-generated session data.

---

### Sprint 5 — Adaptive Session Toggles

#### Goals
Make the workout react to fatigue, time limits, and cardio preferences.

#### Tasks
1. **Add the tired-session modifier**
   - Create a UI toggle for a lighter session.
   - Pass this state into the workout generation logic.
   - Reduce intensity or working weight recommendations when active.

2. **Add the quick-session modifier**
   - Create a UI toggle for limited time.
   - Prioritize level 1 exercises and optionally level 2.
   - Drop lower-priority exercises when time is constrained.

3. **Add cardio and warm-up toggle support**
   - Add a cardio on/off control for the current session.
   - Show AI-generated warm-up instructions.
   - Let the daily workout reflect the cardio preference.

#### Definition of Done
- The session can be modified by toggles.
- Quick mode reduces the workout scope.
- Cardio and warm-up states affect the generated session.

---

### Sprint 6 — Predictive Analytics

#### Goals
Add early intelligence to session forecasting and recovery feedback.

#### Tasks
1. **Display predicted session duration**
   - Show estimated time on the main workout card.
   - Use AI output or deterministic calculations.
   - Keep the estimate visible before session start.

2. **Estimate calories burned**
   - Add session calorie estimation based on movement type, body weight, and load.
   - Store results with the session.
   - Show the estimate on the dashboard.

3. **Build the recovery indicator**
   - Track time since last completed workout.
   - Show a red/green readiness indicator.
   - Keep threshold rules configurable for later refinement.

#### Definition of Done
- The dashboard shows estimated duration and calories.
- The recovery state is visible.
- Recovery logic reads from completed session history.

---

## Phase 3 — Control and Customization (Weeks 7–9)

### Sprint 7 — Global Settings Page

#### Goals
Create the configuration surface for themes, exercise control, and volume preferences.

#### Tasks
1. **Build theme and split settings**
   - Add light, dark, and system theme options.
   - Allow the user to define the starting PPL split.
   - Make changes affect future scheduling only.

2. **Build exercise inventory management**
   - Show all exercises in a settings list.
   - Add ON/OFF toggles for exercise availability.
   - Ensure AI only uses active exercises.

3. **Add volume preference controls**
   - Add inputs for exercises per muscle group.
   - Add inputs for reps per muscle group.
   - Use these values in session generation.

#### Definition of Done
- Settings page is functional.
- Exercise inventory can be managed.
- Volume preferences affect future AI sessions.

---

### Sprint 8 — Scheduling and Gym Vacation Mode

#### Goals
Add more control over schedule behavior and intentional pauses.

#### Tasks
1. **Build Gym Vacation mode**
   - Add a clearly labeled pause toggle.
   - Let the user define a vacation date range.
   - Suspend scheduling, missed-day tracking, and consistency penalties during the active period.

2. **Support future schedule changes**
   - Allow the user to change workout frequency for future dates.
   - Support structures such as 3-day and 6-day routines.
   - Avoid rewriting historical logs.

3. **Add manual workout-type override**
   - Let the user change today’s workout category manually.
   - Support overrides like switching Push to Legs.
   - Save the override as part of the day’s session state.

#### Definition of Done
- Vacation mode pauses tracking correctly.
- Future schedule changes work without damaging history.
- Today’s workout type can be manually overridden.

---

### Sprint 9 — Workout Execution UI

#### Goals
Build the actual workout interaction flow for exercise details and logging.

#### Tasks
1. **Create the exercise detail view**
   - Build an exercise detail modal or page.
   - Show instructions, rest recommendations, and placeholder media states.
   - Keep the UI ready for future image/GIF integration.

2. **Build a rest timer component**
   - Add a countdown timer between exercises.
   - Prefill it using AI-suggested rest values.
   - Allow manual start and reset.

3. **Implement retroactive session logging**
   - Add per-exercise completion toggles.
   - Add a global “Complete All” action.
   - Allow the user to edit actual completed sets versus planned sets.

#### Definition of Done
- Exercise details can be opened.
- Rest timing works.
- The workout can be logged after the session is over.

---

## Phase 4 — Visuals and Progression (Weeks 10–12)

### Sprint 10 — Media Pipeline Integration

#### Goals
Integrate AI-generated exercise visuals into the workout experience.

#### Tasks
1. **Connect the external media pipeline**
   - Add a workflow for associating exercises with generated images.
   - Support fetching media assets for each exercise.
   - Keep generation logic separate from the main app if needed.

2. **Show image sequence and GIF**
   - Display the three-step instructional image sequence.
   - Display the movement GIF in the exercise detail view.
   - Handle loading, missing assets, and fallback states.

3. **Support muscle highlight visuals**
   - Ensure exercise visuals can highlight target muscle groups in red.
   - Store the necessary metadata for each exercise.
   - Keep the system compatible with future asset regeneration.

#### Definition of Done
- Exercise visuals can be attached and displayed.
- The detail view supports both stills and GIFs.
- Missing media is handled gracefully.

---

### Sprint 11 — Data and Analytics Tab

#### Goals
Turn stored workout history into usable visual insights.

#### Tasks
1. **Build the body weight chart**
   - Use Recharts to display body weight over time.
   - Plot values by recorded measurement date.
   - Show gain/loss trend visually.

2. **Build the strength progression chart**
   - Chart progression in exercise loads from baseline.
   - Support filtering by muscle group and PPL category.
   - Focus on clear week-over-week progress.

3. **Build attendance summaries**
   - Show completed versus missed sessions for the month.
   - Use scheduled days and logged sessions to calculate the percentage.
   - Respect Gym Vacation mode and manual overrides.

#### Definition of Done
- The analytics tab is live.
- Weight and strength charts are working.
- Monthly consistency stats are visible.

---

### Sprint 12 — Power Levels and Final Polish

#### Goals
Finalize progression systems and improve the overall PWA experience.

#### Tasks
1. **Implement the power level system**
   - Add Level 1–10 progression logic.
   - Base progression on starting baselines and progressive overload.
   - Keep thresholds configurable for later tuning.

2. **Finalize dashboard encouragement cards**
   - Show calorie totals, level progress, and weight delta.
   - Add next-level progress indicators.
   - Keep cards concise and motivational.

3. **Run final PWA polish pass**
   - Test install behavior and offline transitions.
   - Review mobile responsiveness and touch interactions.
   - Prepare the app for regular weekend-driven iteration.

#### Definition of Done
- Power level logic is visible in the UI.
- Dashboard cards are complete.
- The app feels stable as a mobile-first installable PWA.

---

## Suggested Copilot Prompting Pattern

Use prompts like these when implementing each sprint:

```md
Build Sprint X for my AI-driven PPL fitness PWA.

Stack:
- Next.js App Router
- Tailwind CSS
- Supabase
- Gemini API
- Recharts
- Vercel

Requirements:
- Follow the roadmap section for Sprint X exactly.
- Use clean TypeScript.
- Use server actions or route handlers where appropriate.
- Keep components modular.
- Add loading and empty states.
- Use mobile-first responsive UI.
- Do not remove existing functionality.
```

## Recommended Build Order Inside Each Sprint

For each sprint, ask Copilot to work in this order:

1. Database/schema changes
2. Server logic and API integration
3. UI components
4. State handling
5. Validation and error handling
6. Final cleanup and typing

## Notes

- The app should remain usable at the end of every sprint.
- Historical workout data should never be rewritten by future schedule changes.
- Gym Vacation mode must pause missed-day logic completely.
- AI-generated sessions should always have a fallback path in case the model fails.
- Media generation can remain external as long as the app supports media attachment and rendering.
