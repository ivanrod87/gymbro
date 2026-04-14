'use client';

import { useEffect, useState } from 'react';
import { Scale, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';

interface Translations {
  measurements: string;
  back: string;
  bodyWeightBaseline: string;
  enterWeightKg: string;
}

export default function MeasurementsPage() {
  const { language, translate } = useTranslation();
  const [translations, setTranslations] = useState<Translations>({
    measurements: 'Measurements',
    back: 'Back',
    bodyWeightBaseline: 'Body Weight Baseline',
    enterWeightKg: 'Enter weight in kg',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          measurements: 'Measurements',
          back: 'Back',
          bodyWeightBaseline: 'Body Weight Baseline',
          enterWeightKg: 'Enter weight in kg',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Measurements'),
        translate('Back'),
        translate('Body Weight Baseline'),
        translate('Enter weight in kg'),
      ]);

      setTranslations({
        measurements: translated[0],
        back: translated[1],
        bodyWeightBaseline: translated[2],
        enterWeightKg: translated[3],
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
        <h1 className="text-3xl font-bold">{translations.measurements}</h1>
      </div>

      <div className="card-base space-y-6">
        {/* Body Weight Baseline */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Scale size={20} />
            {translations.bodyWeightBaseline}
          </h3>
          <input
            type="number"
            placeholder={translations.enterWeightKg}
            className="w-full px-4 py-2 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Your current baseline weight for fitness tracking
          </p>
        </div>
      </div>
    </div>
  );
}
