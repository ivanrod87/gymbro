'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, BarChart3, Settings } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { language, translate } = useTranslation();
  const [translatedLabels, setTranslatedLabels] = useState({
    home: 'Home',
    workout: 'Workout',
    analytics: 'Analytics',
    settings: 'Settings',
  });

  const isActive = (path: string) => pathname?.startsWith(path);

  // Translate sidebar labels when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'EN') {
        setTranslatedLabels({
          home: 'Home',
          workout: 'Workout',
          analytics: 'Analytics',
          settings: 'Settings',
        });
      } else {
        const translated = await Promise.all([
          translate('Home'),
          translate('Workout'),
          translate('Analytics'),
          translate('Settings'),
        ]);
        setTranslatedLabels({
          home: translated[0],
          workout: translated[1],
          analytics: translated[2],
          settings: translated[3],
        });
      }
    };

    loadTranslations();
  }, [language, translate]);

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 hover:w-64 bg-white dark:bg-dark-900 flex-col items-stretch transition-all duration-200 z-50 group">
      {/* Logo/Branding Area */}
      <div className="h-20 flex items-center justify-center flex-shrink-0">
        <div className="text-2xl font-bold text-blue-500 group-hover:flex hidden">GB</div>
        <div className="text-xl font-bold text-blue-500 group-hover:hidden">💪</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
        <SidebarLink
          href="/home"
          icon={<Home size={24} />}
          label={translatedLabels.home}
          active={isActive('/home')}
        />
        <SidebarLink
          href="/workout"
          icon={<Dumbbell size={24} />}
          label={translatedLabels.workout}
          active={isActive('/workout')}
        />
        <SidebarLink
          href="/analytics"
          icon={<BarChart3 size={24} />}
          label={translatedLabels.analytics}
          active={isActive('/analytics')}
        />
        <SidebarLink
          href="/settings"
          icon={<Settings size={24} />}
          label={translatedLabels.settings}
          active={isActive('/settings')}
        />
      </nav>

      {/* Footer area */}
      <div className="h-20 flex items-center justify-center text-xs text-gray-400 group-hover:text-left group-hover:px-4">
        <span className="hidden group-hover:block">v1.0</span>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  // Determine if label should be bold (Workout, Analytics)
  const isBoldableLabel = href === '/workout' || href === '/analytics';

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
        active
          ? 'text-white'
          : 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-700'
      }`}
    >
      <span className="flex-shrink-0">
        {React.cloneElement(icon as React.ReactElement, {
          fill: 'none',
          strokeWidth: active ? 3 : 2,
        })}
      </span>
      <span className={`hidden group-hover:inline text-sm font-medium ${active && isBoldableLabel ? 'font-bold' : ''}`}>
        {label}
      </span>
    </Link>
  );
}
