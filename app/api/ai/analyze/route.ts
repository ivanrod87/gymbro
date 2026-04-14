import { NextRequest, NextResponse } from 'next/server';

// Google Gemini API endpoint (generative AI model)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    // Extract prompt from request body
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Get API key from environment
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    // Extract text content from Gemini API response
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.error('No content in Gemini response:', data);
      return NextResponse.json(
        { error: 'Invalid AI response format' },
        { status: 500 }
      );
    }

    // Parse JSON response (handle markdown code blocks)
    try {
      let jsonStr = content.trim();
      // Remove markdown code block wrappers if present (```json, ```, etc)
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.slice(7);
      }
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith('```')) {
        jsonStr = jsonStr.slice(0, -3);
      }
      jsonStr = jsonStr.trim();

      // Parse cleaned JSON response from AI
      const result = JSON.parse(jsonStr);
      return NextResponse.json({ result });
    } catch {
      console.error('Failed to parse Gemini response:', content);
      return NextResponse.json(
        { error: 'Invalid AI response format' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
