'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';
import { useToast } from '@/lib/useToast';
import { ToastContainer } from '@/components/ToastContainer';

type SplitType = 'PPL' | 'Upper / Lower' | 'Arnold Split' | 'Hybrid Split';

interface Translations {
  trainingSplit: string;
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

export default function TrainingSplitPage() {
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
      const savedSplit = localStorage.getItem('workoutSplit') as SplitType;
      if (savedSplit) {
        return localStorage.getItem(`workoutSplitPosition_${savedSplit}`) || '';
      }
    }
    return '';
  });

  const [saved, setSaved] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const [translations, setTranslations] = useState<Translations>({
    trainingSplit: 'Training Split',
    back: 'Back',
    selectSplit: 'Select Your Training Split',
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
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          trainingSplit: 'Training Split',
          back: 'Back',
          selectSplit: 'Select Your Training Split',
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
        translate('Training Split'),
        translate('Back'),
        translate('Select Your Training Split'),
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
        trainingSplit: translated[0],
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
      showToast('Please select a training split', 'error');
      return;
    }

    const positionOptions = getPositionOptionsForSplit(selectedSplit);
    if (positionOptions.length > 0 && !startingPosition) {
      showToast('Please select a starting position', 'error');
      return;
    }

    // Save to localStorage (temporary, will migrate to database later)
    localStorage.setItem('workoutSplit', selectedSplit);
    if (startingPosition) {
      localStorage.setItem(`workoutSplitPosition_${selectedSplit}`, startingPosition);
    }

    setSaved(true);
    showToast(translations.saved, 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSplitSelect = (splitName: SplitType) => {
    setSelectedSplit(splitName);
    
    // Load saved position for this split or set first option as default
    const savedPosition = localStorage.getItem(`workoutSplitPosition_${splitName}`);
    if (savedPosition) {
      setStartingPosition(savedPosition);
    } else {
      // Get the first option for this split
      const options = getPositionOptionsForSplit(splitName);
      if (options.length > 0) {
        setStartingPosition(options[0].value);
      } else {
        setStartingPosition('');
      }
    }
  };

  const getPositionOptionsForSplit = (split: SplitType) => {
    switch (split) {
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
      <Link href="/settings/training" className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4">
        <ChevronLeft size={20} />
        {translations.back}
      </Link>

      {isHydrated && (
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{translations.trainingSplit}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred workout split</p>
        </div>
      )}

      {/* Only render after hydration to avoid SSR mismatch */}
      {isHydrated ? (
        <>
          {/* Split Selection with Accordion */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">{translations.selectSplit}</h2>
            {SPLITS.map((split) => {
              const isSelected = selectedSplit === split.name;
              const positionOptions = getPositionOptionsForSplit(split.name as SplitType);

              return (
                <div
                  key={split.name}
                  className="rounded-lg border-2 transition-all overflow-hidden"
                  style={{
                    borderColor: isSelected ? '#3b82f6' : '#e0e0e0',
                  }}
                >
                  {/* Split Header */}
                  <button
                    onClick={() => handleSplitSelect(split.name as SplitType)}
                    className={`w-full p-4 text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-800'
                    }`}
                  >
                    <h3 className="font-semibold">{split.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{split.description}</p>
                  </button>

                  {/* Position Options - Show under selected split */}
                  {isSelected && positionOptions.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800/50 p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        {translations.startingPosition}
                      </h4>
                      {positionOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="position"
                            value={option.value}
                            checked={startingPosition === option.value}
                            onChange={(e) => setStartingPosition(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            {translations.save}
          </button>
        </>
      ) : (
        <div className="h-40 flex items-center justify-center text-gray-400">Loading...</div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
