'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement;
    if (newTheme === 'light') {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="card-base space-y-6">
        {/* Theme Setting */}
        <div className="pb-6 border-b border-dark-700">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sun size={20} />
            Theme
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleThemeChange('light')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-700 border border-dark-600 text-gray-50 hover:bg-dark-600'
              }`}
            >
              <Sun size={18} />
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-700 border border-dark-600 text-gray-50 hover:bg-dark-600'
              }`}
            >
              <Moon size={18} />
              Dark
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Current: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </p>
        </div>

        {/* Body Weight Baseline */}
        <div className="pb-6 border-b border-dark-700">
          <h3 className="font-semibold mb-3">Body Weight Baseline</h3>
          <input
            type="number"
            placeholder="Enter weight in kg"
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Schedule Definition */}
        <div className="pb-6 border-b border-dark-700">
          <h3 className="font-semibold mb-3">Schedule Definition</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-dark-700 p-2 rounded">
              <input type="radio" name="schedule" defaultChecked className="w-4 h-4" />
              <span>Standard PPL (Push, Pull, Legs)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-dark-700 p-2 rounded">
              <input type="radio" name="schedule" className="w-4 h-4" />
              <span>Custom 6-Day Split</span>
            </label>
          </div>
        </div>

        {/* Gym Vacation Mode */}
        <div>
          <h3 className="font-semibold mb-3">Gym Vacation Mode</h3>
          <button className="btn-secondary w-full">
            Enable Vacation Mode
          </button>
        </div>
      </div>
    </div>
  );
}
