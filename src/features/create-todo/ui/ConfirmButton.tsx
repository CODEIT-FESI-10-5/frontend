import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../shared/lib/utils/cn';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  color: 'bg-primary' | 'bg-highlight';
  styleProps?: string;
}

export default function ConfirmButton({
  size = 'md',
  color,
  styleProps = '',
  children,
  onClick = () => {},
}: ConfirmButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 rounded-sm px-12 py-6 text-white',
        'transition hover:cursor-pointer active:scale-95',
        styleProps,
        { '': size == 'sm' },
        { 'body-medium h-40 w-88': size == 'md' },
        { 'body-small h-36 w-136': size == 'lg' },
        color,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
