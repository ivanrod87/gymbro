/**
 * AI Functions for GymBro
 * Handles AI API calls and data processing
 */

import {
  BODY_WEIGHT_RECOMMENDATION_PROMPT,
  BODY_TYPE_ANALYSIS_PROMPT,
} from './ai-prompts';

interface BodyWeightRecommendation {
  recommendedWeightMin: number;
  recommendedWeightMax: number;
  reasoning: string;
  bmiRange: string;
  suggestion: string;
}

interface BodyTypeAnalysis {
  isConsistent: boolean;
  note: string;
}

/**
 * Calls Claude API to get body weight recommendation
 */
export async function getBodyWeightRecommendation(
  height: number,
  heightUnit: 'cm' | 'inch',
  currentWeight: number,
  weightUnit: 'kg' | 'lbs',
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph'
): Promise<BodyWeightRecommendation | null> {
  try {
    const prompt = BODY_WEIGHT_RECOMMENDATION_PROMPT(
      height,
      heightUnit,
      currentWeight,
      weightUnit,
      bodyType
    );

    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.result as BodyWeightRecommendation;
  } catch (error) {
    console.error('Error getting body weight recommendation:', error);
    return null;
  }
}

/**
 * Calls Claude API to analyze body type consistency
 */
export async function analyzeBodyTypeConsistency(
  height: number,
  weight: number,
  selectedBodyType: string
): Promise<BodyTypeAnalysis | null> {
  try {
    const prompt = BODY_TYPE_ANALYSIS_PROMPT(height, weight, selectedBodyType);

    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.result as BodyTypeAnalysis;
  } catch (error) {
    console.error('Error analyzing body type:', error);
    return null;
  }
}

/**
 * Type for measurement entry stored in JSON
 */
export interface MeasurementEntry {
  id: string;
  height: number;
  heightUnit: 'cm' | 'inch';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph';
  dateTaken: string; // ISO date string
  recommendedWeightMin?: number;
  recommendedWeightMax?: number;
}

/**
 * Save measurement entry to localStorage
 */
export function saveMeasurementEntry(entry: MeasurementEntry): void {
  try {
    const entries = getMeasurementHistory();
    entries.push(entry);
    localStorage.setItem('measurementHistory', JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving measurement entry:', error);
  }
}

/**
 * Get all measurement entries from localStorage
 */
export function getMeasurementHistory(): MeasurementEntry[] {
  try {
    const data = localStorage.getItem('measurementHistory');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving measurement history:', error);
    return [];
  }
}

/**
 * Get the latest measurement entry
 */
export function getLatestMeasurement(): MeasurementEntry | null {
  try {
    const entries = getMeasurementHistory();
    return entries.length > 0 ? entries[entries.length - 1] : null;
  } catch (error) {
    console.error('Error retrieving latest measurement:', error);
    return null;
  }
}

/**
 * Delete measurement entry by ID from history
 */
export function deleteMeasurementEntry(id: string): void {
  try {
    const entries = getMeasurementHistory();
    const filtered = entries.filter((e) => e.id !== id);
    localStorage.setItem('measurementHistory', JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting measurement entry:', error);
  }
}

/**
 * Calculate BMI using height and weight with unit conversion
 */
export function calculateBMI(
  height: number,
  heightUnit: 'cm' | 'inch',
  weight: number,
  weightUnit: 'kg' | 'lbs'
): number {
  // Convert to standard units: meters and kilograms
  const heightMeters = heightUnit === 'cm' ? height / 100 : (height * 2.54) / 100;
  const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
  // BMI = weight(kg) / height²(m)
  return Math.round((weightKg / (heightMeters * heightMeters)) * 10) / 10;
}

/**
 * Get BMI category and color code for UI display
 */
export function getBMICategory(
  bmi: number
): { category: string; color: string } {
  // Return category with color based on BMI ranges (WHO standards)
  if (bmi < 18.5) {
    return { category: 'Underweight', color: 'text-blue-600' };
  } else if (bmi < 25) {
    return { category: 'Normal Weight', color: 'text-green-600' };
  } else if (bmi < 30) {
    return { category: 'Overweight', color: 'text-yellow-600' };
  } else {
    return { category: 'Obese', color: 'text-red-600' };
  }
}
