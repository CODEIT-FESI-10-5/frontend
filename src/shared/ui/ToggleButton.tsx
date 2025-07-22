import { ReactNode } from 'react';
import { cn } from '../lib/utils/cn';
interface ToggleButtonProp {
  type?: 'sm' | 'md' | 'lg';
  styleProps?: string;
  isOn: boolean;
  children: ReactNode;
  toggleSwitch: () => void;
}

export default function ToggleButton({
  type = 'md',
  styleProps = '',
  isOn,
  children,
  toggleSwitch,
}: ToggleButtonProp) {
  return (
    <div
      className={cn(
        'body-small flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ECECEC] px-12 py-6',
        'transition hover:scale-105',
        styleProps,
        { '': type == 'sm' },
        { 'h-40 w-84': type == 'md' },
        { '': type == 'lg' },
      )}
      onClick={toggleSwitch}
    >
      <div className="relative">
        <div
          className={cn(
            'h-18 w-18 cursor-pointer rounded-sm border-2 shadow transition-colors hover:shadow-lg',
            isOn
              ? 'bg-surface-4 border-surface-4'
              : 'border-[#898989] bg-white',
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
