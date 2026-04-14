'use client';

import { useEffect, useState } from 'react';
import { Settings2, CalendarDays, Weight, BicepsFlexed, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  settings: string;
  preferences: string;
  measurements: string;
  trainingCalendar: string;
  workoutSplit: string;
  preferencesDesc: string;
  measurementsDesc: string;
  trainingCalendarDesc: string;
  workoutSplitDesc: string;
}

export default function SettingsPage() {
  const { language, translate } = useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    settings: 'Settings',
    preferences: 'Preferences',
    measurements: 'Measurements',
    trainingCalendar: 'Training Calendar',
    workoutSplit: 'Workout Split',
    preferencesDesc: 'Language and theme settings',
    measurementsDesc: 'Body weight and metrics',
    trainingCalendarDesc: 'Schedule and vacation mode',
    workoutSplitDesc: 'Choose your preferred workout split',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          settings: 'Settings',
          preferences: 'Preferences',
          measurements: 'Measurements',
          trainingCalendar: 'Training Calendar',
          workoutSplit: 'Workout Split',
          preferencesDesc: 'Language and theme settings',
          measurementsDesc: 'Body weight and metrics',
          trainingCalendarDesc: 'Schedule and vacation mode',
          workoutSplitDesc: 'Choose your preferred workout split',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Settings'),
        translate('Preferences'),
        translate('Measurements'),
        translate('Training Calendar'),
        translate('Workout Split'),
        translate('Language and theme settings'),
        translate('Body weight and metrics'),
        translate('Schedule and vacation mode'),
        translate('Choose your preferred workout split'),
      ]);

      setTranslations({
        settings: translated[0],
        preferences: translated[1],
        measurements: translated[2],
        trainingCalendar: translated[3],
        workoutSplit: translated[4],
        preferencesDesc: translated[5],
        measurementsDesc: translated[6],
        trainingCalendarDesc: translated[7],
        workoutSplitDesc: translated[8],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const settingsGroups = [
    {
      title: translations.preferences,
      description: translations.preferencesDesc,
      icon: Settings2,
      href: '/settings/preferences',
    },
    {
      title: translations.measurements,
      description: translations.measurementsDesc,
      icon: Weight,
      href: '/settings/measurements',
    },
    {
      title: translations.trainingCalendar,
      description: translations.trainingCalendarDesc,
      icon: CalendarDays,
      href: '/settings/training-calendar',
    },
    {
      title: translations.workoutSplit,
      description: translations.workoutSplitDesc,
      icon: BicepsFlexed,
      href: '/settings/workout-split',
    },
  ];

  return (
    <div className="max-w-[800px] mx-auto space-y-6 pb-20">
      <div className="space-y-3">
        {settingsGroups.map((group) => {
          const IconComponent = group.icon;
          return (
            <Link
              key={group.href}
              href={group.href}
              className="card-base block hover:shadow-md dark:hover:shadow-dark-900 transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-dark-800 rounded-lg">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.description}
                    </p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-gray-400 dark:text-gray-600" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
