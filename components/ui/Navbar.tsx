'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, BarChart3, Settings } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, translate } = useTranslation();
  const [translatedLabels, setTranslatedLabels] = useState({
    home: 'Home',
    workout: 'Workout',
    analytics: 'Analytics',
    settings: 'Settings',
  });

  const isActive = (path: string) => pathname?.startsWith(path);

  // Translate navbar labels when language changes
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-900 safe-area-inset-bottom transition-colors duration-200">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around items-stretch">
          <NavLink
            href="/home"
            icon={<Home size={24} />}
            label={translatedLabels.home}
            active={isActive('/home')}
          />
          <NavLink
            href="/workout"
            icon={<Dumbbell size={24} />}
            label={translatedLabels.workout}
            active={isActive('/workout')}
          />
          <NavLink
            href="/analytics"
            icon={<BarChart3 size={24} />}
            label={translatedLabels.analytics}
            active={isActive('/analytics')}
          />
          <NavLink
            href="/settings"
            icon={<Settings size={24} />}
            label={translatedLabels.settings}
            active={isActive('/settings')}
          />
        </div>
      </div>
    </nav>
  );
}

function NavLink({
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
  // Determine if icon should be filled (Home, Settings)
  const isFillableIcon = href === '/home' || href === '/settings';
  // Determine if label should be bold (Workout, Analytics)
  const isBoldableLabel = href === '/workout' || href === '/analytics';

  return (
    <Link
      href={href}
      className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors rounded-lg md:hover:bg-dark-800 ${
        active
          ? 'text-gray-500 dark:text-white'
          : 'text-gray-500 dark:text-white'
      }`}
    >
      <span className={`flex-shrink-0 ${active && isFillableIcon ? 'opacity-100' : ''}`}>
        {React.cloneElement(icon as React.ReactElement, {
          fill: active && isFillableIcon ? 'currentColor' : 'none',
          strokeWidth: active && isFillableIcon ? 2.5 : 2,
        })}
      </span>
      <span className={`text-xs font-medium ${active && isBoldableLabel ? 'font-bold' : ''}`}>
        {label}
      </span>
    </Link>
  );
}
