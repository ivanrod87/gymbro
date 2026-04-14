/**
 * AI Prompts for GymBro
 * Centralized prompts used for AI-powered features
 * Optimized for Google Gemini API
 */

export const BODY_WEIGHT_RECOMMENDATION_PROMPT = (
  height: number,
  heightUnit: 'cm' | 'inch',
  currentWeight: number,
  weightUnit: 'kg' | 'lbs',
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph'
) => {
  // Convert to standard units for calculation
  const heightCm = heightUnit === 'cm' ? height : height * 2.54;
  const weightKg = weightUnit === 'kg' ? currentWeight : currentWeight / 2.20462;

  return `You are a professional fitness coach and nutritionist. Based on the following user information, calculate and recommend a healthy target body weight range.

User Information:
- Height: ${heightCm.toFixed(1)} cm (${height} ${heightUnit})
- Current Weight: ${weightKg.toFixed(1)} kg (${currentWeight} ${weightUnit})
- Body Type: ${bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}

Calculate the recommended body weight range considering:
1. Healthy BMI ranges (18.5-24.9 for normal, up to 29.9 for slightly overweight)
2. Body type and muscle mass potential (ectomorphs have lighter builds, mesomorphs have athletic builds, endomorphs have stockier builds)
3. Realistic and healthy weight goals

Return ONLY valid JSON with this exact structure:
{
  "recommendedWeightMin": 72,
  "recommendedWeightMax": 82,
  "reasoning": "brief explanation based on body type",
  "bmiRange": "current BMI category",
  "suggestion": "actionable suggestion"
}`;
};

export const BODY_TYPE_ANALYSIS_PROMPT = (
  height: number,
  weight: number,
  selectedBodyType: string
) => {
  return `You are a fitness expert. Analyze if these measurements align with the selected body type:

Height: ${height} cm
Weight: ${weight} kg
Selected Body Type: ${selectedBodyType}

Provide a brief assessment in valid JSON format only:
{
  "isConsistent": true,
  "note": "brief note about alignment"
}`;
};
