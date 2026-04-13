Here is the comprehensive `PROJECT_SPEC.md` file based on your dictation. You should place this file at the root of your project directory (e.g., alongside your `package.json` or `README.md`). 

Whenever you start a new coding session, you can point Copilot to this file by saying: *"Please read `@PROJECT_SPEC.md` to understand the architecture and rules for the feature we are building today."*

***

```markdown
# PROJECT_SPEC.md: AI-Driven PPL Personal Fitness App

## 1. Project Vision & Scope
This is a hyper-personalized, AI-driven Push-Pull-Legs (PPL) tracking application built for a single user (Pilot Stage). The app acts as an intelligent coach, handling all programming, scheduling, and progression analytics dynamically based on user parameters.

**Development Paradigm:** Fully AI-driven stack (via Copilot/LLMs), supported by external hosting, databases, and AI API integrations.

## 2. System Architecture & Constraints
* **Target Audience:** Single user.
* **Authentication:** Hardcoded/pre-defined credentials stored in the DB (no complex RBAC required for pilot).
* **Data Principle:** Forward-facing execution. Changing the schedule or starting days applies only to *future* workouts. Historical data is immutable unless manually overridden.
* **Asynchronous Logging:** The user is not required to interact with the device *during* the workout. They must be able to log entire sessions (or modify completed sets) retroactively in one pass.

## 3. Core Modules & Features

### 3.1. The AI Automation Engine (The "Brain")
* **Workout Generation:** AI schedules training days and balances exercise selection based on the user's active inventory, target volume (reps/sets per muscle), and frequency.
* **Priority System (1-3):** Every exercise is strictly categorized.
  * *Level 1:* Essential/Compound.
  * *Level 2:* Secondary.
  * *Level 3:* Accessory/Isolation.
* **Session Modifiers:** * **"Quick Session":** AI automatically drops Level 3 (and potentially Level 2) exercises to fit a reduced time window.
  * **"Tired":** AI adjusts weights/volume for a lighter session.
* **Power Level:** An AI-calculated rank from Level 1 to 10 that updates automatically based on progressive overload and historical baselines.
* **Predictive Metrics:** AI estimates session duration and calculates expected caloric burn based on load, body weight, and exercise selection.

### 3.2. Settings & Configuration
* **Theme:** Light, Dark, System.
* **User Baseline:** Current body weight input.
* **Schedule Definition:** Target days per week and starting category (Push, Pull, or Legs).
* **Custom Rotations:** Ability to override standard PPL with custom 6-day structures (e.g., Pull, Push, Legs, Pull, Push, Legs).
* **Gym Vacation Mode:** A master toggle that pauses all AI scheduling, attendance tracking, and consistency penalties for a set date range.
* **Global Exercise Inventory:** A master list of AI-generated exercises with ON/OFF toggles. AI may *only* program exercises marked as ON.

### 3.3. Home Screen (Grid Dashboard)
* **The "Today" Card:** Dominant UI element. Shows today's split (e.g., "Push Day"), exercise count, estimated duration, expected calorie burn, and AI-generated warm-up/cardio guidance.
* **Consistency Tracker:** % of completed vs. missed sessions for the month. (Note: Unlogged scheduled days default to "Missed").
* **Calorie Summary:** Total calories burned over time and estimated weight loss equivalents.
* **Power Level Tracker:** Visual display of Current Level (1-10) and progress to the next tier.
* **Recovery Visualizer:** Red/Green zone indicator calculating readiness based on hours elapsed since the last session.
* **Weight Delta:** Latest body weight entry and variance from the previous baseline.

### 3.4. Workout Execution Interface
* **Toggles:** Activate/Deactivate Cardio, "Time Shortage", and "Tired" modifiers.
* **Exercise List:** Shows AI-suggested rest times, target weight, and target sets/reps.
* **Exercise Detail View:** Displays Title, AI-generated instructions, 3 sequential images (Start, Active, Return with target muscles highlighted in red), and a full-motion GIF.
* **Completion Controls:** Single-tap completion toggles, a global "Complete All" button, and inputs to edit actual sets/reps performed if they differ from the plan.

### 3.5. Data & Analytics
* **Body Weight Charts:** Time-series visualization of weight entries.
* **Strength Progression:** Granular charts mapping load increases (e.g., 10kg -> 12kg). Filterable by muscle group and PPL category.
* **Attendance:** System automatically tracks schedule adherence. Includes manual override capabilities for historical corrections.

## 4. Instructions for AI Coding Assistant (Copilot/Cursor)
1. **Reference this Spec:** Always ensure new features align with the "Asynchronous Logging" and "Priority System" rules defined above.
2. **Component Structure:** Build modular, reusable React components for the Grid Dashboard cards.
3. **Database Schema:** When generating SQL/Prisma schemas, ensure relationships exist between `User`, `WorkoutLogs`, `Exercises` (with priority and active status), and `BodyStats`.
4. **No Placeholder Styling:** Use functional, clean UI libraries (e.g., Tailwind CSS) adhering to the theme variables.

```