/**
 * Database Type Definitions
 * Auto-generated from Supabase schema or manually defined
 * Sprint 2+: Update as schema evolves
 */

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  current_weight: number | null;
  target_weight: number | null;
  body_fat_percentage: number | null;
  theme: 'light' | 'dark' | 'system';
  gym_vacation_mode: boolean;
  vacation_start_date: string | null;
  vacation_end_date: string | null;
}

export interface Exercise {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
  primary_muscle_group: string;
  secondary_muscle_groups: string[];
  priority: 1 | 2 | 3;
  is_active: boolean;
  ppl_category: 'push' | 'pull' | 'legs';
  default_weight: number | null;
  default_sets: number;
  default_reps: number;
  default_rest_seconds: number;
}

export interface WorkoutSession {
  id: string;
  created_at: string;
  updated_at: string;
  profile_id: string;
  session_date: string;
  ppl_category: 'push' | 'pull' | 'legs';
  estimated_duration_minutes: number;
  estimated_calories: number;
  actual_duration_minutes: number | null;
  actual_calories: number | null;
  completed: boolean;
  notes: string | null;
}

export interface WorkoutLog {
  id: string;
  created_at: string;
  updated_at: string;
  session_id: string;
  exercise_id: string;
  planned_sets: number;
  planned_reps: number;
  planned_weight: number;
  planned_rest_seconds: number;
  actual_sets: number | null;
  actual_reps: number | null;
  actual_weight: number | null;
  completed: boolean;
  notes: string | null;
}

export interface BodyStats {
  id: string;
  created_at: string;
  updated_at: string;
  profile_id: string;
  recorded_date: string;
  weight: number;
  body_fat_percentage: number | null;
  notes: string | null;
}

export interface SessionModifier {
  id: string;
  session_id: string;
  modifier_type: 'quick_session' | 'tired' | 'cardio';
  is_enabled: boolean;
}
