/**
 * AI Logic Helpers - Utilities for AI-driven features
 * Sprint 2+: These will integrate with Gemini API
 */

/**
 * Calculate power level based on workout history
 * @param workoutsCompleted - Number of completed workouts this month
 * @param avgProgressiveOverload - Average weight increase percentage
 * @returns Power level from 1-10
 */
export function calculatePowerLevel(
  workoutsCompleted: number,
  avgProgressiveOverload: number = 0
): number {
  // Simple baseline: min(1 + (workouts / 5) + (progressive overload), 10)
  const basePower = 1 + workoutsCompleted / 5;
  const withOverload = basePower + avgProgressiveOverload / 10;
  return Math.min(Math.round(withOverload), 10);
}

/**
 * Estimate session duration based on exercises
 * @param exerciseCount - Number of exercises
 * @param totalSets - Total sets across all exercises
 * @returns Estimated duration in minutes
 */
export function estimateSessionDuration(
  exerciseCount: number,
  totalSets: number
): number {
  // Rough estimate: 2 min per exercise + 2 min per set
  return Math.ceil(exerciseCount * 2 + totalSets * 2);
}

/**
 * Calculate estimated calories burned
 * @param bodyWeight - User body weight in kg
 * @param durationMinutes - Session duration in minutes
 * @param intensityMultiplier - Intensity factor (0.8-1.5)
 * @returns Estimated calories burned
 */
export function estimateCaloriesBurned(
  bodyWeight: number,
  durationMinutes: number,
  intensityMultiplier: number = 1.0
): number {
  // Rough estimate: 5 kcal/min per 70kg at moderate intensity
  const baseCalories = (bodyWeight / 70) * 5 * durationMinutes;
  return Math.ceil(baseCalories * intensityMultiplier);
}

/**
 * Determine recovery status based on hours since last workout
 * @param hoursSinceLastWorkout - Hours elapsed since last completion
 * @returns Status: 'red' (fatigued) | 'yellow' (recovering) | 'green' (ready)
 */
export function getRecoveryStatus(hoursSinceLastWorkout: number): 'red' | 'yellow' | 'green' {
  if (hoursSinceLastWorkout < 24) return 'red';
  if (hoursSinceLastWorkout < 48) return 'yellow';
  return 'green';
}

/**
 * Filter exercises by priority level
 * @param exercises - Array of exercises
 * @param allowedLevels - Array of allowed priority levels (1, 2, or 3)
 * @returns Filtered exercises
 */
export function filterExercisesByPriority<T extends { priority: number }>(
  exercises: T[],
  allowedLevels: number[]
): T[] {
  return exercises.filter((ex) => allowedLevels.includes(ex.priority));
}

/**
 * Get PPL category for a given day index
 * @param dayIndex - Day index in the current cycle (0-based)
 * @param startingCategory - Starting category: 'push' | 'pull' | 'legs'
 * @returns Category for the day
 */
export function getPPLCategory(
  dayIndex: number,
  startingCategory: 'push' | 'pull' | 'legs' = 'push'
): 'push' | 'pull' | 'legs' {
  const categories: ('push' | 'pull' | 'legs')[] = ['push', 'pull', 'legs'];
  const startIdx = categories.indexOf(startingCategory);
  return categories[(startIdx + dayIndex) % 3];
}
