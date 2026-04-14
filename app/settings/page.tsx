'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';
import { SUPPORTED_LANGUAGES, getLanguageName } from '@/lib/translate';

interface Translations {
  settings: string;
  theme: string;
  light: string;
  dark: string;
  currentTheme: string;
  language: string;
  currentLanguage: string;
  bodyWeightBaseline: string;
  enterWeightKg: string;
  scheduleDefinition: string;
  standardPPL: string;
  custom6DaySplit: string;
  gymVacationMode: string;
  enableVacationMode: string;
}

export default function SettingsPage() {
  const { language, theme, setLanguage, setTheme, translate, isTranslating } =
    useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    settings: 'Settings',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    currentTheme: 'Current',
    language: 'Language',
    currentLanguage: 'Current Language',
    bodyWeightBaseline: 'Body Weight Baseline',
    enterWeightKg: 'Enter weight in kg',
    scheduleDefinition: 'Schedule Definition',
    standardPPL: 'Standard PPL (Push, Pull, Legs)',
    custom6DaySplit: 'Custom 6-Day Split',
    gymVacationMode: 'Gym Vacation Mode',
    enableVacationMode: 'Enable Vacation Mode',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          settings: 'Settings',
          theme: 'Theme',
          light: 'Light',
          dark: 'Dark',
          currentTheme: 'Current',
          language: 'Language',
          currentLanguage: 'Current Language',
          bodyWeightBaseline: 'Body Weight Baseline',
          enterWeightKg: 'Enter weight in kg',
          scheduleDefinition: 'Schedule Definition',
          standardPPL: 'Standard PPL (Push, Pull, Legs)',
          custom6DaySplit: 'Custom 6-Day Split',
          gymVacationMode: 'Gym Vacation Mode',
          enableVacationMode: 'Enable Vacation Mode',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Settings'),
        translate('Theme'),
        translate('Light'),
        translate('Dark'),
        translate('Current'),
        translate('Language'),
        translate('Current Language'),
        translate('Body Weight Baseline'),
        translate('Enter weight in kg'),
        translate('Schedule Definition'),
        translate('Standard PPL (Push, Pull, Legs)'),
        translate('Custom 6-Day Split'),
        translate('Gym Vacation Mode'),
        translate('Enable Vacation Mode'),
      ]);

      setTranslations({
        settings: translated[0],
        theme: translated[1],
        light: translated[2],
        dark: translated[3],
        currentTheme: translated[4],
        language: translated[5],
        currentLanguage: translated[6],
        bodyWeightBaseline: translated[7],
        enterWeightKg: translated[8],
        scheduleDefinition: translated[9],
        standardPPL: translated[10],
        custom6DaySplit: translated[11],
        gymVacationMode: translated[12],
        enableVacationMode: translated[13],
      });
    };

    loadTranslations();
  }, [language, translate]);

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold">{translations.settings}</h1>

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
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
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

        {/* Body Weight Baseline */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-3">{translations.bodyWeightBaseline}</h3>
          <input
            type="number"
            placeholder={translations.enterWeightKg}
            className="w-full px-4 py-2 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Schedule Definition */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-3">{translations.scheduleDefinition}</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 p-2 rounded">
              <input type="radio" name="schedule" defaultChecked className="w-4 h-4" />
              <span>{translations.standardPPL}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 p-2 rounded">
              <input type="radio" name="schedule" className="w-4 h-4" />
              <span>{translations.custom6DaySplit}</span>
            </label>
          </div>
        </div>

        {/* Gym Vacation Mode */}
        <div>
          <h3 className="font-semibold mb-3">{translations.gymVacationMode}</h3>
          <button className="w-full px-4 py-2 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-900 dark:text-gray-50 rounded-lg font-medium transition-colors duration-200 border border-gray-300 dark:border-dark-600">
            {translations.enableVacationMode}
          </button>
        </div>
      </div>
    </div>
  );
}
