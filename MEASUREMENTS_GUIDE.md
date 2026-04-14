# Measurements Page - Implementation Guide

## Overview
The Measurements page provides a comprehensive body tracking system with AI-powered recommendations for ideal body weight based on user metrics and body type.

## Features Implemented

### 1. **Height & Weight Input**
- Input fields for height and weight with flexible unit selection
- Height: Centimeters (cm) or Inches (in)  
- Weight: Kilograms (kg) or Pounds (lbs)
- Units are synced with user preferences from Preferences page

### 2. **Body Type Selector**
- Three body type options with descriptions:
  - **Ectomorph**: Lean, thin build
  - **Mesomorph**: Athletic, muscular build  
  - **Endomorph**: Stocky, round build
- Visual button-based selection with feedback styling
- Future support for body type images (when provided)

### 3. **BMI Calculator**
- Real-time BMI calculation based on height/weight inputs
- Color-coded BMI categories:
  - Blue: Underweight (< 18.5)
  - Green: Normal Weight (18.5-24.9)
  - Yellow: Overweight (25-29.9)
  - Red: Obese (≥ 30)

### 4. **AI-Powered Recommendations**
- Calculates personalized body weight recommendations
- Considers:
  - User's height and current weight
  - Selected body type (body composition factors)
  - Healthy BMI ranges
  - Realistic muscle-building potential
- Returns:
  - Recommended weight range (min-max)
  - Reasoning for the recommendation
  - Actionable suggestions for fitness goals

### 5. **Data Persistence**
- Saves measurement entries to localStorage as JSON
- Each entry includes:
  ```json
  {
    "id": "timestamp",
    "height": 180,
    "heightUnit": "cm",
    "weight": 75,
    "weightUnit": "kg",
    "bodyType": "mesomorph",
    "dateTaken": "2026-04-14T...",
    "recommendedWeightMin": 72,
    "recommendedWeightMax": 82
  }
  ```

### 6. **History Tracking**
- Displays last saved measurement
- Shows date of last entry
- All historical data stored for future progress tracking

## File Structure

```
lib/
├── ai-prompts.tsx           # AI prompt templates
└── ai-functions.tsx         # AI API calls and data management

app/
├── settings/
│   └── measurements/
│       └── page.tsx         # Measurements page component
└── api/
    └── ai/
        └── analyze/
            └── route.ts     # API endpoint for AI analysis
```

## Setup Instructions

### 1. Get Claude API Key
1. Visit [Anthropic Console](https://console.anthropic.com)
2. Sign up or log in
3. Create a new API key
4. Copy the key

### 2. Configure Environment Variables
Add to `.env`:
```
ANTHROPIC_API_KEY="your_anthropic_api_key_here"
```

### 3. Restart Dev Server
```bash
npm run dev
```

## How to Use

### Using the Measurements Page
1. Navigate to Settings → Measurements
2. Enter your height (select cm or inch)
3. Enter your current weight (select kg or lbs)
4. Select your body type from the three options
5. Press "Get AI Recommendation" to see personalized weight goals
6. Press "Save Entry" to store the measurement

### AI Recommendation Details
- The AI analyzes body composition potential based on body type
- Recommendations follow WHO healthy BMI guidelines
- Accounts for natural muscle-building capacity:
  - **Ectomorphs**: Lighter ideal weight ranges
  - **Mesomorphs**: Greater muscle potential, moderate weight ranges
  - **Endomorphs**: Heavier builds, higher weight ranges

## Data Flow

```
User Input (Height/Weight/BodyType)
       ↓
BMI Calculation (instant display)
       ↓
AI Analysis Request
       ↓
Claude API → ai-functions.tsx
       ↓
Parse JSON Response
       ↓
Display Recommendation
       ↓
Save to localStorage
```

## API Endpoint

### POST `/api/ai/analyze`
**Request:**
```json
{
  "prompt": "..."
}
```

**Response:**
```json
{
  "result": {
    "recommendedWeightMin": 72,
    "recommendedWeightMax": 82,
    "reasoning": "...",
    "suggestion": "..."
  }
}
```

## Future Enhancements

- [ ] Body type image selection (visual picker)
- [ ] Progress graph over time
- [ ] Macronutrient recommendations based on body type
- [ ] Workout program suggestions
- [ ] Export measurement history
- [ ] Comparison with body composition metrics

## Translations Supported

All UI strings support multi-language translation via the TranslationContext:
- Height
- Current Weight
- Body Type options
- BMI labels
- Recommendation display
- Button labels

## Notes

- All preferences (height unit, weight unit) are persisted to localStorage
- AI recommendations require ANTHROPIC_API_KEY to be set
- If API key is missing, recommendations will fail gracefully  
- Measurements are stored locally only (no database backup yet)
- All calculations support both metric and imperial units
