'use client';

import { useEffect, useState } from 'react';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  trainingCalendar: string;
  back: string;
  scheduleDefinition: string;
  standardPPL: string;
  custom6DaySplit: string;
  gymVacationMode: string;
  enableVacationMode: string;
}

export default function TrainingCalendarPage() {
  const { language, translate } = useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    trainingCalendar: 'Training Calendar',
    back: 'Back',
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
          trainingCalendar: 'Training Calendar',
          back: 'Back',
          scheduleDefinition: 'Schedule Definition',
          standardPPL: 'Standard PPL (Push, Pull, Legs)',
          custom6DaySplit: 'Custom 6-Day Split',
          gymVacationMode: 'Gym Vacation Mode',
          enableVacationMode: 'Enable Vacation Mode',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Training Calendar'),
        translate('Back'),
        translate('Schedule Definition'),
        translate('Standard PPL (Push, Pull, Legs)'),
        translate('Custom 6-Day Split'),
        translate('Gym Vacation Mode'),
        translate('Enable Vacation Mode'),
      ]);

      setTranslations({
        trainingCalendar: translated[0],
        back: translated[1],
        scheduleDefinition: translated[2],
        standardPPL: translated[3],
        custom6DaySplit: translated[4],
        gymVacationMode: translated[5],
        enableVacationMode: translated[6],
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
        <h1 className="text-3xl font-bold">{translations.trainingCalendar}</h1>
      </div>

      <div className="card-base space-y-6">
        {/* Schedule Definition */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            {translations.scheduleDefinition}
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 p-2 rounded transition-colors">
              <input type="radio" name="schedule" defaultChecked className="w-4 h-4" />
              <span>{translations.standardPPL}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 p-2 rounded transition-colors">
              <input type="radio" name="schedule" className="w-4 h-4" />
              <span>{translations.custom6DaySplit}</span>
            </label>
          </div>
        </div>

        {/* Gym Vacation Mode */}
        <div>
          <h3 className="font-semibold mb-4">{translations.gymVacationMode}</h3>
          <button className="w-full px-4 py-3 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-900 dark:text-gray-50 rounded-lg font-medium transition-colors duration-200 border border-gray-300 dark:border-dark-600">
            {translations.enableVacationMode}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Pause all training schedules and consistency tracking
          </p>
        </div>
      </div>
    </div>
  );
}
