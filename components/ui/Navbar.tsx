'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, BarChart3, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-dark-800 dark:border-dark-700 safe-area-inset-bottom transition-colors duration-200">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around items-stretch">
          <NavLink
            href="/home"
            icon={<Home size={24} />}
            label="Home"
            active={isActive('/home')}
          />
          <NavLink
            href="/workout"
            icon={<Dumbbell size={24} />}
            label="Workout"
            active={isActive('/workout')}
          />
          <NavLink
            href="/analytics"
            icon={<BarChart3 size={24} />}
            label="Analytics"
            active={isActive('/analytics')}
          />
          <NavLink
            href="/settings"
            icon={<Settings size={24} />}
            label="Settings"
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
  return (
    <Link
      href={href}
      className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
        active
          ? 'text-blue-500 bg-blue-50 dark:bg-dark-700'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
