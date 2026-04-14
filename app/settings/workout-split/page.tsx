'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';
import { useToast } from '@/lib/useToast';
import { ToastContainer } from '@/components/ToastContainer';

type SplitType = 'PPL' | 'Upper / Lower' | 'Arnold Split' | 'Hybrid Split';

interface Translations {
  workoutSplit: string;
  back: string;
  selectSplit: string;
  startingPosition: string;
  pushFirst: string;
  pullFirst: string;
  upperFirst: string;
  lowerFirst: string;
  pplFirst: string;
  upperLowerFirst: string;
  save: string;
  saved: string;
  ppl: string;
  upperLower: string;
  arnoldSplit: string;
  hybridSplit: string;
  pplDescription: string;
  upperLowerDescription: string;
  arnoldDescription: string;
  hybridDescription: string;
}

const SPLITS = [
  {
    name: 'PPL',
    description: 'Push Pull Legs separates training by movement pattern. Push focuses on pressing muscles like chest, shoulders, and triceps, pull targets back, biceps, and rear delts, and legs covers the lower body.',
  },
  {
    name: 'Upper / Lower',
    description: 'Upper / Lower divides training into upper-body sessions and lower-body sessions. Upper days combine muscles like chest, back, shoulders, and arms, while lower days focus on quads, hamstrings, glutes, and calves.',
  },
  {
    name: 'Arnold Split',
    description: 'The Arnold Split groups muscles by paired body parts, typically chest with back, shoulders with arms, and legs on their own. It is designed to create high training volume and strong muscle focus within each session.',
  },
  {
    name: 'Hybrid Split',
    description: 'A Hybrid Split combines elements from different training styles. For example, it may mix upper/lower sessions with push, pull, or leg-focused workouts depending on the goal.',
  },
];

export default function WorkoutSplitPage() {
  const { language, translate } = useTranslation();
  const { toasts, showToast, removeToast } = useToast();
  const [selectedSplit, setSelectedSplit] = useState<SplitType | null>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('workoutSplit') as SplitType) || null;
    }
    return null;
  });

  const [startingPosition, setStartingPosition] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('workoutSplitPosition') || '';
    }
    return '';
  });

  const [saved, setSaved] = useState(false);

  const [translations, setTranslations] = useState<Translations>({
    workoutSplit: 'Workout Split',
    back: 'Back',
    selectSplit: 'Select Your Workout Split',
    startingPosition: 'Starting Position',
    pushFirst: 'Push First',
    pullFirst: 'Pull First',
    upperFirst: 'Upper First',
    lowerFirst: 'Lower First',
    pplFirst: 'PPL First',
    upperLowerFirst: 'Upper/Lower First',
    save: 'Save Settings',
    saved: 'Settings saved!',
    ppl: 'PPL',
    upperLower: 'Upper / Lower',
    arnoldSplit: 'Arnold Split',
    hybridSplit: 'Hybrid Split',
    pplDescription: 'Push Pull Legs separates training by movement pattern.',
    upperLowerDescription: 'Upper / Lower divides training into upper-body and lower-body sessions.',
    arnoldDescription: 'Groups muscles by paired body parts for high training volume.',
    hybridDescription: 'Combines elements from different training styles.',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          workoutSplit: 'Workout Split',
          back: 'Back',
          selectSplit: 'Select Your Workout Split',
          startingPosition: 'Starting Position',
          pushFirst: 'Push First',
          pullFirst: 'Pull First',
          upperFirst: 'Upper First',
          lowerFirst: 'Lower First',
          pplFirst: 'PPL First',
          upperLowerFirst: 'Upper/Lower First',
          save: 'Save Settings',
          saved: 'Settings saved!',
          ppl: 'PPL',
          upperLower: 'Upper / Lower',
          arnoldSplit: 'Arnold Split',
          hybridSplit: 'Hybrid Split',
          pplDescription: 'Push Pull Legs separates training by movement pattern.',
          upperLowerDescription: 'Upper / Lower divides training into upper-body and lower-body sessions.',
          arnoldDescription: 'Groups muscles by paired body parts for high training volume.',
          hybridDescription: 'Combines elements from different training styles.',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Workout Split'),
        translate('Back'),
        translate('Select Your Workout Split'),
        translate('Starting Position'),
        translate('Push First'),
        translate('Pull First'),
        translate('Upper First'),
        translate('Lower First'),
        translate('PPL First'),
        translate('Upper/Lower First'),
        translate('Save Settings'),
        translate('Settings saved!'),
        translate('PPL'),
        translate('Upper / Lower'),
        translate('Arnold Split'),
        translate('Hybrid Split'),
        translate('Push Pull Legs separates training by movement pattern.'),
        translate('Upper / Lower divides training into upper-body and lower-body sessions.'),
        translate('Groups muscles by paired body parts for high training volume.'),
        translate('Combines elements from different training styles.'),
      ]);

      setTranslations({
        workoutSplit: translated[0],
        back: translated[1],
        selectSplit: translated[2],
        startingPosition: translated[3],
        pushFirst: translated[4],
        pullFirst: translated[5],
        upperFirst: translated[6],
        lowerFirst: translated[7],
        pplFirst: translated[8],
        upperLowerFirst: translated[9],
        save: translated[10],
        saved: translated[11],
        ppl: translated[12],
        upperLower: translated[13],
        arnoldSplit: translated[14],
        hybridSplit: translated[15],
        pplDescription: translated[16],
        upperLowerDescription: translated[17],
        arnoldDescription: translated[18],
        hybridDescription: translated[19],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const handleSave = () => {
    if (!selectedSplit) {
      showToast('Please select a workout split', 'error');
      return;
    }

    if (!startingPosition) {
      showToast('Please select a starting position', 'error');
      return;
    }

    // Save to localStorage (temporary, will migrate to database later)
    localStorage.setItem('workoutSplit', selectedSplit);
    localStorage.setItem('workoutSplitPosition', startingPosition);

    setSaved(true);
    showToast(translations.saved, 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  const getPositionOptions = () => {
    switch (selectedSplit) {
      case 'PPL':
        return [
          { value: 'push', label: translations.pushFirst },
          { value: 'pull', label: translations.pullFirst },
        ];
      case 'Upper / Lower':
        return [
          { value: 'upper', label: translations.upperFirst },
          { value: 'lower', label: translations.lowerFirst },
        ];
      case 'Hybrid Split':
        return [
          { value: 'ppl', label: translations.pplFirst },
          { value: 'upperLower', label: translations.upperLowerFirst },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6 pb-20">
      <Link href="/settings" className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4">
        <ChevronLeft size={20} />
        {translations.back}
      </Link>

      <h1 className="text-2xl font-bold">{translations.workoutSplit}</h1>

      {/* Split Selection */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">{translations.selectSplit}</h2>
        {SPLITS.map((split) => (
          <button
            key={split.name}
            onClick={() => {
              setSelectedSplit(split.name as SplitType);
              setStartingPosition(''); // Reset position when changing split
            }}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedSplit === split.name
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
            }`}
          >
            <h3 className="font-semibold">{split.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{split.description}</p>
          </button>
        ))}
      </div>

      {/* Position Selection - Only show if split selected and has position options */}
      {selectedSplit && getPositionOptions().length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">{translations.startingPosition}</h2>
          <div className="space-y-2">
            {getPositionOptions().map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 cursor-pointer">
                <input
                  type="radio"
                  name="position"
                  value={option.value}
                  checked={startingPosition === option.value}
                  onChange={(e) => setStartingPosition(e.target.value)}
                  className="w-4 h-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        {translations.save}
      </button>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
