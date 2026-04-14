// Cache for translations to avoid repeated API calls
const translationCache: Record<string, Record<string, string>> = {
  EN: {},
  PT: {},
  FR: {},
};

export type Language = 'EN' | 'PT' | 'FR';

const languageNames: Record<Language, string> = {
  EN: 'English',
  PT: 'Portuguese',
  FR: 'French',
};

export async function translateText(
  text: string,
  targetLang: Language
): Promise<string> {
  // Return original if target is English
  if (targetLang === 'EN') {
    return text;
  }

  // Check cache first
  if (translationCache[targetLang][text]) {
    return translationCache[targetLang][text];
  }

  try {
    // Call our Next.js API route (server-side, no CORS issues)
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        targetLang,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translated = data.translatedText || text;

    // Cache the result
    translationCache[targetLang][text] = translated;

    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export function getLanguageName(lang: Language): string {
  return languageNames[lang];
}

export const SUPPORTED_LANGUAGES: Language[] = ['EN', 'PT', 'FR'];
