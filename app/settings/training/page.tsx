'use client';

import { useEffect, useState } from 'react';
import { Calendar, BicepsFlexed, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  training: string;
  back: string;
  trainingCalendar: string;
  trainingCalendarDesc: string;
  trainingSplit: string;
  trainingSplitDesc: string;
}

export default function TrainingPage() {
  const { language, translate } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [translations, setTranslations] = useState<Translations>({
    training: 'Training',
    back: 'Back',
    trainingCalendar: 'Training Calendar',
    trainingCalendarDesc: 'Schedule and vacation mode',
    trainingSplit: 'Training Split',
    trainingSplitDesc: 'Choose your preferred workout split',
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          training: 'Training',
          back: 'Back',
          trainingCalendar: 'Training Calendar',
          trainingCalendarDesc: 'Schedule and vacation mode',
          trainingSplit: 'Training Split',
          trainingSplitDesc: 'Choose your preferred workout split',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Training'),
        translate('Back'),
        translate('Training Calendar'),
        translate('Schedule and vacation mode'),
        translate('Training Split'),
        translate('Choose your preferred workout split'),
      ]);

      setTranslations({
        training: translated[0],
        back: translated[1],
        trainingCalendar: translated[2],
        trainingCalendarDesc: translated[3],
        trainingSplit: translated[4],
        trainingSplitDesc: translated[5],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const trainingOptions = [
    {
      title: translations.trainingCalendar,
      description: translations.trainingCalendarDesc,
      icon: Calendar,
      href: '/settings/training/training-calendar',
    },
    {
      title: translations.trainingSplit,
      description: translations.trainingSplitDesc,
      icon: BicepsFlexed,
      href: '/settings/training/training-split',
    },
  ];

  return (
    <div className="max-w-[800px] mx-auto space-y-6 pb-20">
      <Link href="/settings" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        <ChevronLeft size={20} />
        <span>{translations.back}</span>
      </Link>

      <div className="space-y-1" suppressHydrationWarning>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{translations.training}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your training schedule and workout split preferences</p>
      </div>

      {isHydrated && (
        <div className="space-y-3">
            {trainingOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className="card-base block hover:shadow-md dark:hover:shadow-dark-900 transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-dark-800 rounded-lg">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-gray-400 dark:text-gray-600" />
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
