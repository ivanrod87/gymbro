'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Globe, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';
import { SUPPORTED_LANGUAGES, getLanguageName } from '@/lib/translate';

interface Translations {
  preferences: string;
  back: string;
  theme: string;
  light: string;
  dark: string;
  currentTheme: string;
  language: string;
  currentLanguage: string;
}

export default function PreferencesPage() {
  const { language, theme, setLanguage, setTheme, translate, isTranslating } =
    useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    preferences: 'Preferences',
    back: 'Back',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    currentTheme: 'Current',
    language: 'Language',
    currentLanguage: 'Current Language',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          preferences: 'Preferences',
          back: 'Back',
          theme: 'Theme',
          light: 'Light',
          dark: 'Dark',
          currentTheme: 'Current',
          language: 'Language',
          currentLanguage: 'Current Language',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Preferences'),
        translate('Back'),
        translate('Theme'),
        translate('Light'),
        translate('Dark'),
        translate('Current'),
        translate('Language'),
        translate('Current Language'),
      ]);

      setTranslations({
        preferences: translated[0],
        back: translated[1],
        theme: translated[2],
        light: translated[3],
        dark: translated[4],
        currentTheme: translated[5],
        language: translated[6],
        currentLanguage: translated[7],
      });
    };

    loadTranslations();
  }, [language, translate]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/settings"
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold">{translations.preferences}</h1>
      </div>

      <div className="card-base space-y-6">
        {/* Language Setting */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} />
            {translations.language}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                disabled={isTranslating}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  language === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-dark-600'
                } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {translations.currentLanguage}: {getLanguageName(language)}
            {isTranslating && ' (translating...)'}
          </p>
        </div>

        {/* Theme Setting */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sun size={20} />
            {translations.theme}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <Sun size={18} />
              {translations.light}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <Moon size={18} />
              {translations.dark}
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {translations.currentTheme}: {theme === 'light' ? translations.light : translations.dark}
          </p>
        </div>
      </div>
    </div>
  );
}
