'use client';

import { useEffect, useState } from 'react';
import { Settings, Sliders, Scale, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  settings: string;
  preferences: string;
  measurements: string;
  trainingCalendar: string;
  preferencesDesc: string;
  measurementsDesc: string;
  trainingCalendarDesc: string;
}

export default function SettingsPage() {
  const { language, translate } = useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    settings: 'Settings',
    preferences: 'Preferences',
    measurements: 'Measurements',
    trainingCalendar: 'Training Calendar',
    preferencesDesc: 'Language and theme settings',
    measurementsDesc: 'Body weight and metrics',
    trainingCalendarDesc: 'Schedule and vacation mode',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          settings: 'Settings',
          preferences: 'Preferences',
          measurements: 'Measurements',
          trainingCalendar: 'Training Calendar',
          preferencesDesc: 'Language and theme settings',
          measurementsDesc: 'Body weight and metrics',
          trainingCalendarDesc: 'Schedule and vacation mode',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Settings'),
        translate('Preferences'),
        translate('Measurements'),
        translate('Training Calendar'),
        translate('Language and theme settings'),
        translate('Body weight and metrics'),
        translate('Schedule and vacation mode'),
      ]);

      setTranslations({
        settings: translated[0],
        preferences: translated[1],
        measurements: translated[2],
        trainingCalendar: translated[3],
        preferencesDesc: translated[4],
        measurementsDesc: translated[5],
        trainingCalendarDesc: translated[6],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const settingsGroups = [
    {
      title: translations.preferences,
      description: translations.preferencesDesc,
      icon: Sliders,
      href: '/settings/preferences',
    },
    {
      title: translations.measurements,
      description: translations.measurementsDesc,
      icon: Scale,
      href: '/settings/measurements',
    },
    {
      title: translations.trainingCalendar,
      description: translations.trainingCalendarDesc,
      icon: Calendar,
      href: '/settings/training-calendar',
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
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <IconComponent size={24} className="text-blue-600 dark:text-blue-400" />
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
