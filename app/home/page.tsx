'use client';

import { useEffect, useState } from 'react';
import { TreePalm } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  home: string;
  welcome: string;
  vacationModeActive: string;
  vacationModeMessage: string;
}

export default function HomePage() {
  const { language, translate } = useTranslation();
  const [vacationMode, setVacationMode] = useState(false);

  const [translations, setTranslations] = useState<Translations>({
    home: 'Home',
    welcome: 'Welcome to your dashboard',
    vacationModeActive: 'Vacation Mode Active',
    vacationModeMessage: 'Your training schedule is currently paused',
  });

  useEffect(() => {
    // Check vacation mode status
    const isVacationMode = localStorage.getItem('vacationMode') === 'true';
    setVacationMode(isVacationMode);

    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          home: 'Home',
          welcome: 'Welcome to your dashboard',
          vacationModeActive: 'Vacation Mode Active',
          vacationModeMessage: 'Your training schedule is currently paused',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Home'),
        translate('Welcome to your dashboard'),
        translate('Vacation Mode Active'),
        translate('Your training schedule is currently paused'),
      ]);

      setTranslations({
        home: translated[0],
        welcome: translated[1],
        vacationModeActive: translated[2],
        vacationModeMessage: translated[3],
      });
    };

    loadTranslations();
  }, [language, translate]);

  return (
    <div className="space-y-4 pb-20">
      <h1 className="text-3xl font-bold">{translations.home}</h1>
      <p className="text-gray-400">{translations.welcome}</p>

      {/* Vacation Mode Alert */}
      {vacationMode && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg flex gap-3">
          <TreePalm size={20} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
              {translations.vacationModeActive}
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {translations.vacationModeMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
