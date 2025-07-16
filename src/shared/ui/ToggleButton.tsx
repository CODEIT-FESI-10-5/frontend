import { ReactNode } from 'react';
import { cn } from '../utils/cn';
interface ToggleButtonProp {
  type?: 'sm' | 'md' | 'lg';
  isOn: boolean;
  children: ReactNode;
  toggleSwitch: () => void;
}

export default function ToggleButton({
  type = 'md',
  isOn,
  children,
  toggleSwitch,
}: ToggleButtonProp) {
  return (
    <div
      className={cn(
        'border-border-emphasis flex cursor-pointer items-center justify-center gap-1 rounded-lg border',
        'transition hover:scale-105',
        { '': type == 'sm' },
        { 'px-4 py-2': type == 'md' },
        { '': type == 'lg' },
      )}
      onClick={toggleSwitch}
    >
      <div className="relative">
        <div
          className={cn(
            'border-surface-400 h-5 w-5 cursor-pointer rounded border shadow transition-colors hover:shadow-lg',
            isOn ? 'bg-surface-400' : 'bg-white',
          )}
        />
        <span
          className={cn(
            `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white transition-all`,
            isOn ? 'opacity-100' : 'opacity-0',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      {children}
    </div>
  );
}
