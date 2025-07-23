import { cn } from '@/shared/utils/cn';
import { ReactNode } from 'react';
import CheckSquareBlankIcon from '@/assets/check_square_blank.svg';
import CheckSquareFillPrimaryIcon from '@/assets/check-square-fill-primary.svg';

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
        'bg-border-emphasis flex cursor-pointer items-center justify-center gap-2 rounded-sm px-12 py-6 text-white',
        'transition',
        styleProps,
        { '': type == 'sm' },
        { 'body-medium h-40 w-88': type == 'md' },
        { '': type == 'lg' },
      )}
      onClick={toggleSwitch}
    >
      {isOn ? (
        <CheckSquareFillPrimaryIcon width={28} height={28} />
      ) : (
        <CheckSquareBlankIcon width={28} height={28} />
      )}

      {children}
    </div>
  );
}
