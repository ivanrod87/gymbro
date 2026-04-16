'use client';

import { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, TreePalm } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/TranslationContext';
import { useToast } from '@/lib/useToast';
import { ToastContainer } from '@/components/ToastContainer';

type ScheduleType = '3-day' | '5-day' | '6-day' | 'custom';
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface Translations {
  trainingCalendar: string;
  back: string;
  schedule: string;
  trainingSchedule: string;
  days3: string;
  days5: string;
  days6: string;
  custom: string;
  selectDays: string;
  weekdays: string;
  vacationMode: string;
  vacationModeDesc: string;
  enable: string;
  disable: string;
  vacationActive: string;
  selectScheduleFirst: string;
  atLeastOneDay: string;
  save: string;
  saved: string;
  weekdaysLabel: string;
}

const WEEKDAYS: Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SCHEDULE_PRESETS: Record<ScheduleType, Weekday[] | null> = {
  '3-day': ['Mon', 'Wed', 'Fri'],
  '5-day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '6-day': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  custom: null,
};

export default function TrainingCalendarPage() {
  const { language, translate } = useTranslation();
  const { toasts, showToast, removeToast } = useToast();
  const [schedule, setSchedule] = useState<ScheduleType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('trainingSchedule') as ScheduleType) || '3-day';
    }
    return '3-day';
  });

  const [selectedDays, setSelectedDays] = useState<Weekday[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trainingDays');
      return saved ? JSON.parse(saved) : SCHEDULE_PRESETS['3-day'] || [];
    }
    return SCHEDULE_PRESETS['3-day'] || [];
  });

  const [vacationMode, setVacationMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vacationMode') === 'true';
    }
    return false;
  });

  const [saved, setSaved] = useState(false);

  const [translations, setTranslations] = useState<Translations>({
    trainingCalendar: 'Training Calendar',
    back: 'Back',
    schedule: 'Schedule',
    trainingSchedule: 'Training Schedule',
    days3: '3-Day Split',
    days5: '5-Day Split',
    days6: '6-Day Split',
    custom: 'Custom',
    selectDays: 'Select Training Days',
    weekdays: 'Weekdays',
    vacationMode: 'Vacation Mode',
    vacationModeDesc: 'When enabled, your training schedule is paused',
    enable: 'Enable',
    disable: 'Disable',
    vacationActive: 'Active',
    selectScheduleFirst: 'Please select a schedule first',
    atLeastOneDay: 'Please select at least one training day',
    save: 'Save Settings',
    saved: 'Settings saved!',
    weekdaysLabel: 'Select your training days:',
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslations({
          trainingCalendar: 'Training Calendar',
          back: 'Back',
          schedule: 'Schedule',
          trainingSchedule: 'Training Schedule',
          days3: '3-Day Split',
          days5: '5-Day Split',
          days6: '6-Day Split',
          custom: 'Custom',
          selectDays: 'Select Training Days',
          weekdays: 'Weekdays',
          vacationMode: 'Vacation Mode',
          vacationModeDesc: 'When enabled, your training schedule is paused',
          enable: 'Enable',
          disable: 'Disable',
          vacationActive: 'Active',
          selectScheduleFirst: 'Please select a schedule first',
          atLeastOneDay: 'Please select at least one training day',
          save: 'Save Settings',
          saved: 'Settings saved!',
          weekdaysLabel: 'Select your training days:',
        });
        return;
      }

      const translated = await Promise.all([
        translate('Training Calendar'),
        translate('Back'),
        translate('Schedule'),
        translate('Training Schedule'),
        translate('3-Day Split'),
        translate('5-Day Split'),
        translate('6-Day Split'),
        translate('Custom'),
        translate('Select Training Days'),
        translate('Weekdays'),
        translate('Vacation Mode'),
        translate('When enabled, your training schedule is paused'),
        translate('Enable'),
        translate('Disable'),
        translate('Active'),
        translate('Please select a schedule first'),
        translate('Please select at least one training day'),
        translate('Save Settings'),
        translate('Settings saved!'),
        translate('Select your training days:'),
      ]);

      setTranslations({
        trainingCalendar: translated[0],
        back: translated[1],
        schedule: translated[2],
        trainingSchedule: translated[3],
        days3: translated[4],
        days5: translated[5],
        days6: translated[6],
        custom: translated[7],
        selectDays: translated[8],
        weekdays: translated[9],
        vacationMode: translated[10],
        vacationModeDesc: translated[11],
        enable: translated[12],
        disable: translated[13],
        vacationActive: translated[14],
        selectScheduleFirst: translated[15],
        atLeastOneDay: translated[16],
        save: translated[17],
        saved: translated[18],
        weekdaysLabel: translated[19],
      });
    };

    loadTranslations();
  }, [language, translate]);

  const handleScheduleChange = (newSchedule: ScheduleType) => {
    setSchedule(newSchedule);
    const preset = SCHEDULE_PRESETS[newSchedule];
    if (preset) {
      setSelectedDays(preset);
    } else {
      setSelectedDays([]);
    }
  };

  const handleDayToggle = (day: Weekday) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleVacationModeToggle = () => {
    setVacationMode(!vacationMode);
  };

  const handleSave = () => {
    if (selectedDays.length === 0) {
      showToast(translations.atLeastOneDay, 'error');
      return;
    }

    localStorage.setItem('trainingSchedule', schedule);
    localStorage.setItem('trainingDays', JSON.stringify(selectedDays));
    localStorage.setItem('vacationMode', vacationMode.toString());

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6 pb-20">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/settings/training"
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{translations.trainingCalendar}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Schedule and vacation mode</p>
        </div>
      </div>

      <div className="card-base space-y-6">
        {/* Training Schedule Selection */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            {translations.trainingSchedule}
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { id: '3-day' as ScheduleType, label: translations.days3 },
              { id: '5-day' as ScheduleType, label: translations.days5 },
              { id: '6-day' as ScheduleType, label: translations.days6 },
              { id: 'custom' as ScheduleType, label: translations.custom },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleScheduleChange(option.id)}
                className={`p-3 rounded-lg font-medium transition-all border-2 ${
                  schedule === option.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-dark-500 text-blue-900 dark:text-blue-100'
                    : 'border-gray-300 dark:border-dark-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weekday Selection */}
        <div className="pb-6 border-b border-gray-200 dark:border-dark-700">
          <h3 className="font-semibold mb-4">{translations.weekdaysLabel}</h3>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`p-3 rounded-lg font-semibold transition-all text-sm md:text-base flex items-center justify-center h-12 ${
                  selectedDays.includes(day)
                    ? 'bg-blue-600 text-white border-2 border-blue-600'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-dark-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-dark-600 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Selected: {selectedDays.length > 0 ? selectedDays.join(', ') : 'None'}
            </p>
          </div>
        </div>

        {/* Vacation Mode Toggle */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <TreePalm size={20} />
            {translations.vacationMode}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {translations.vacationModeDesc}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleVacationModeToggle}
              className={`relative inline-flex h-10 w-16 items-center rounded-full transition-colors ${
                vacationMode
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-300 dark:bg-dark-600 hover:bg-gray-400'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                  vacationMode ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`font-semibold ${
                vacationMode
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {vacationMode ? translations.vacationActive : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-white ${
            saved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saved ? translations.saved : translations.save}
        </button>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
