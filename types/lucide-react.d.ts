declare module 'lucide-react' {
  import { FC, ReactNode } from 'react';

  export interface IconProps {
    [key: string]: any;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
    children?: ReactNode;
  }

  export const Home: React.ComponentType<any>;
  export const Dumbbell: React.ComponentType<any>;
  export const BarChart3: React.ComponentType<any>;
  export const Settings: React.ComponentType<any>;
  export const Sun: React.ComponentType<any>;
  export const Moon: React.ComponentType<any>;
  export const Globe: React.ComponentType<any>;
  export const ChevronLeft: React.ComponentType<any>;
  export const Ruler: React.ComponentType<any>;
  export const Scale: React.ComponentType<any>;
  export const Calendar: React.ComponentType<any>;
  export const ChevronRight: React.ComponentType<any>;
  export const Sliders: React.ComponentType<any>;
  export const AlertCircle: React.ComponentType<any>;
  export const AlertTriangle: React.ComponentType<any>;
  export const TreePalm: React.ComponentType<any>;
  export const CalendarDays: React.ComponentType<any>;
  export const Settings2: React.ComponentType<any>;
  export const Weight: React.ComponentType<any>;
  export const BicepsFlexed: React.ComponentType<any>;
  export const Trash2: React.ComponentType<any>;
  export const Check: React.ComponentType<any>;
  export const X: React.ComponentType<any>;
  export const Copy: React.ComponentType<any>;
}
