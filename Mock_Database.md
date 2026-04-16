# Mock Database Structure

This document describes the structure and purpose of all mock database files used for development and migration-readiness in the GymBro app.

---

## 1. User Data
- **users.json**: List of user accounts (id, email, name, createdAt)
- **user-preferences.json**: User preferences (theme, language, units, pplOrder)
- **user-training-settings.json**: User training calendar settings (scheduleType, trainingDays, vacationMode)
- **measurement-entries.json**: Measurement history entries (height, weight, bodyType, dateTaken)

## 2. Training Metadata
- **splits.json**: List of available workout/training splits and their descriptions (now loaded via repository, no hardcoded splits in code)
- **schedule-presets.json**: Preset training schedules (3-day, 5-day, 6-day, custom) (now loaded via repository, no hardcoded presets in code)

## 3. Planned Extensions
- **user-split.json**: (Planned) User's selected split and starting position
- **user-training-calendar.json**: (Planned) User's selected schedule, days, and vacation mode (if separated from settings)
- **last-measurement-inputs.json**: (Planned) Last entered height, weight, and body type for each user
- **exercises.json**: (Planned) List of exercises and metadata
- **workouts.json**: (Planned) Demo workout routines
- **metrics.json**: (Planned) Dashboard metrics (power level, consistency, etc.)

---

## Example Structure

### users.json
```
[
  { "id": "user-1", "email": "demo@gymbro.app", "name": "Ivan", "createdAt": "2026-04-01T12:00:00.000Z" }
]
```

### splits.json
```
[
  { "name": "PPL", "description": "Push Pull Legs ..." },
  ...
]
```

### schedule-presets.json
```
{
  "3-day": ["Mon", "Wed", "Fri"],
  ...
}
```

---

## Usage
- All mock data is loaded via the repository layer. There are no hardcoded splits or schedule presets in any component; all such metadata is sourced from the mock database.
- UI components/pages must not import JSON directly.
- All runtime writes are persisted to localStorage (browser) or in-memory (server), with seed fallback from these files.
- This structure is migration-ready for future local DB or Supabase integration.
