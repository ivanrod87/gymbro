'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, translateText } from './translate';

interface TranslationContextType {
  language: Language;
  theme: 'light' | 'dark';
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [isTranslating, setIsTranslating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    const initialLanguage = savedLanguage || 'EN';
    const initialTheme = savedTheme || 'dark';

    setLanguageState(initialLanguage);
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement;
    if (newTheme === 'light') {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const translate = async (text: string): Promise<string> => {
    if (language === 'EN') return text;

    setIsTranslating(true);
    try {
      const result = await translateText(text, language);
      return result;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        language,
        theme,
        setLanguage,
        setTheme,
        translate,
        isTranslating,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
