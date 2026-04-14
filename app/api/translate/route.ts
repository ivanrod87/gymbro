import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLang } = body;

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Missing text or targetLang' },
        { status: 400 }
      );
    }

    // If target language is English, return original text
    if (targetLang === 'EN') {
      return NextResponse.json({
        translatedText: text,
      });
    }

    const langCodes: Record<string, string> = {
      PT: 'pt',
      FR: 'fr',
    };

    // Use MyMemory Translation API (free, no auth needed)
    const langCode = langCodes[targetLang];
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|${langCode}`
    );

    if (!response.ok) {
      throw new Error(`MyMemory API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText =
      data.responseData?.translatedText || text;

    return NextResponse.json({
      translatedText,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed', message: String(error) },
      { status: 500 }
    );
  }
}
