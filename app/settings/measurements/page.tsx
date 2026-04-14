'use client';

import { useEffect, useState } from 'react';
import { Scale, ChevronLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';
import { useToast } from '@/lib/useToast';
import { ToastContainer } from '@/components/ToastContainer';
import {
  saveMeasurementEntry,
  getMeasurementHistory,
  calculateBMI,
  getBMICategory,
  MeasurementEntry,
} from '@/lib/ai-functions';

type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

interface Translations {
  measurements: string;
  back: string;
  height: string;
  currentWeight: string;
  bodyType: string;
  ectomorph: string;
  mesomorph: string;
  endomorph: string;
  save: string;
  saving: string;
  measurementHistory: string;
  no: string;
  enterHeight: string;
  enterWeight: string;
  ectomorphDesc: string;
  mesomorphDesc: string;
  endomorphDesc: string;
  weight: string;
  date: string;
  delete: string;
  bmi: string;
  emptyHistory: string;
}

export default function MeasurementsPage() {
  const { language, theme, translate } = useTranslation();
  const { toasts, showToast, removeToast } = useToast();
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('heightUnit') as 'cm' | 'inch') || 'cm';
    }
    return 'cm';
  });
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('weightUnit') as 'kg' | 'lbs') || 'kg';
    }
    return 'kg';
  });

  const [height, setHeight] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastHeight') || '';
    }
    return '';
  });
  const [weight, setWeight] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastWeight') || '';
    }
    return '';
  });
  const [bodyType, setBodyType] = useState<BodyType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lastBodyType') as BodyType) || 'mesomorph';
    }
    return 'mesomorph';
  });

  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<MeasurementEntry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const [translations, setTranslations] = useState<Translations>({
    measurements: 'Measurements',
    back: 'Back',
    height: 'Height',
    currentWeight: 'Current Weight',
    bodyType: 'Body Type',
    ectomorph: 'Ectomorph',
    mesomorph: 'Mesomorph',
    endomorph: 'Endomorph',
    save: 'Save Entry',
    saving: 'Saving...',
    measurementHistory: 'Measurement History',
    no: 'No',
    enterHeight: 'Enter height',
    enterWeight: 'Enter weight',
    ectomorphDesc: 'Lean, thin build',
    mesomorphDesc: 'Athletic, muscular build',
    endomorphDesc: 'Stocky, round build',
    weight: 'Weight',
    date: 'Date',
    delete: 'Delete',
    bmi: 'BMI',
    emptyHistory: 'No measurements saved yet',
  });

  useEffect(() => {
    // Load measurement history
    const measurementHistory = getMeasurementHistory();
    setHistory(measurementHistory);
  }, []);

  useEffect(() => {
    // Set hydration flag after client mount to fix hydration mismatch
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          measurements: 'Measurements',
          back: 'Back',
          height: 'Height',
          currentWeight: 'Current Weight',
          bodyType: 'Body Type',
          ectomorph: 'Ectomorph',
          mesomorph: 'Mesomorph',
          endomorph: 'Endomorph',
          save: 'Save Entry',
          saving: 'Saving...',
          measurementHistory: 'Measurement History',
          no: 'No',
          enterHeight: 'Enter height',
          enterWeight: 'Enter weight',
          ectomorphDesc: 'Lean, thin build',
          mesomorphDesc: 'Athletic, muscular build',
          endomorphDesc: 'Stocky, round build',
          weight: 'Weight',
          date: 'Date',
          delete: 'Delete',
          bmi: 'BMI',
          emptyHistory: 'No measurements saved yet',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Measurements'),
        translate('Back'),
        translate('Height'),
        translate('Current Weight'),
        translate('Body Type'),
        translate('Ectomorph'),
        translate('Mesomorph'),
        translate('Endomorph'),
        translate('Save Entry'),
        translate('Saving...'),
        translate('Measurement History'),
        translate('No'),
        translate('Enter height'),
        translate('Enter weight'),
        translate('Lean, thin build'),
        translate('Athletic, muscular build'),
        translate('Stocky, round build'),
        translate('Weight'),
        translate('Date'),
        translate('Delete'),
        translate('BMI'),
        translate('No measurements saved yet'),
      ]);

      setTranslations({
        measurements: translated[0],
        back: translated[1],
        height: translated[2],
        currentWeight: translated[3],
        bodyType: translated[4],
        ectomorph: translated[5],
        mesomorph: translated[6],
        endomorph: translated[7],
        save: translated[8],
        saving: translated[9],
        measurementHistory: translated[10],
        no: translated[11],
        enterHeight: translated[12],
        enterWeight: translated[13],
        ectomorphDesc: translated[14],
        mesomorphDesc: translated[15],
        endomorphDesc: translated[16],
        weight: translated[17],
        date: translated[18],
        delete: translated[19],
        bmi: translated[20],
        emptyHistory: translated[21],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const handleSaveEntry = async () => {
    if (!height || !weight) {
      showToast('Please enter height and weight', 'error');
      return;
    }

    setSaving(true);
    try {
      const entry: MeasurementEntry = {
        id: `${Date.now()}`,
        height: parseFloat(height),
        heightUnit,
        weight: parseFloat(weight),
        weightUnit,
        bodyType,
        dateTaken: new Date().toISOString(),
      };

      saveMeasurementEntry(entry);

      // Update local state
      setHistory([...history, entry]);

      // Persist last selected options
      localStorage.setItem('lastHeight', height);
      localStorage.setItem('lastWeight', weight);
      localStorage.setItem('lastBodyType', bodyType);

      showToast('Measurement saved successfully!', 'success');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('measurementHistory', JSON.stringify(updatedHistory));
  };

  const currentBMI = height && weight ? calculateBMI(parseFloat(height), heightUnit, parseFloat(weight), weightUnit) : null;
  const bmiInfo = currentBMI ? getBMICategory(currentBMI) : null;

  const bodyTypes = [
    { id: 'ectomorph', name: translations.ectomorph, desc: translations.ectomorphDesc },
    { id: 'mesomorph', name: translations.mesomorph, desc: translations.mesomorphDesc },
    { id: 'endomorph', name: translations.endomorph, desc: translations.endomorphDesc },
  ];

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
        {/* Height Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">{translations.height}</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                localStorage.setItem('lastHeight', e.target.value);
              }}
              placeholder={translations.enterHeight}
              className="flex-1 px-4 py-2 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600"
            />
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setHeightUnit('cm');
                  localStorage.setItem('heightUnit', 'cm');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  heightUnit === 'cm'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-50'
                }`}
              >
                cm
              </button>
              <button
                onClick={() => {
                  setHeightUnit('inch');
                  localStorage.setItem('heightUnit', 'inch');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  heightUnit === 'inch'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-50'
                }`}
              >
                in
              </button>
            </div>
          </div>
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">{translations.currentWeight}</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                localStorage.setItem('lastWeight', e.target.value);
              }}
              placeholder={translations.enterWeight}
              className="flex-1 px-4 py-2 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600"
            />
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setWeightUnit('kg');
                  localStorage.setItem('weightUnit', 'kg');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  weightUnit === 'kg'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-50'
                }`}
              >
                kg
              </button>
              <button
                onClick={() => {
                  setWeightUnit('lbs');
                  localStorage.setItem('weightUnit', 'lbs');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  weightUnit === 'lbs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-50'
                }`}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* BMI Display */}
        {isHydrated && currentBMI && bmiInfo && (
          <div className="p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{translations.bmi}:</span>
              <div className="text-right">
                <div className={`text-2xl font-bold ${bmiInfo.color}`}>{currentBMI}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{bmiInfo.category}</div>
              </div>
            </div>
          </div>
        )}

        {/* Body Type Selector */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-4">{translations.bodyType}</h3>
          <div className="space-y-3">
            {bodyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setBodyType(type.id as BodyType);
                  localStorage.setItem('lastBodyType', type.id);
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  bodyType === type.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-dark-500'
                    : 'border-gray-300 dark:border-dark-600 hover:border-gray-400 dark:hover:border-dark-500'
                }`}
              >
                <div className="font-semibold">{type.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveEntry}
          disabled={saving}
          className="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? translations.saving : translations.save}
        </button>

        {/* Measurement History */}
        <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
          <h4 className="font-semibold mb-3">{translations.measurementHistory}</h4>
          {history.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              {translations.emptyHistory}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-dark-600">
                    <th className="text-left p-2 font-semibold">{translations.weight}</th>
                    <th className="text-left p-2 font-semibold">{translations.bodyType}</th>
                    <th className="text-left p-2 font-semibold">{translations.bmi}</th>
                    <th className="text-left p-2 font-semibold">{translations.date}</th>
                    <th className="text-center p-2 font-semibold">{translations.delete}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => {
                    const bmi = calculateBMI(entry.height, entry.heightUnit, entry.weight, entry.weightUnit);
                    const bmiCat = getBMICategory(bmi);
                    return (
                      <tr key={entry.id} className="border-b border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600">
                        <td className="p-2">
                          {entry.weight} {entry.weightUnit}
                        </td>
                        <td className="p-2 capitalize">{entry.bodyType}</td>
                        <td className={`p-2 font-semibold ${bmiCat.color}`}>{bmi}</td>
                        <td className="p-2 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(entry.dateTaken).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 inline-flex"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
