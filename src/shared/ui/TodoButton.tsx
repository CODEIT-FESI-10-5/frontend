import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  color:
    | 'bg-white'
    | 'bg-surface-400'
    | 'bg-frame-primary'
    | 'bg-frame-secondary';
}

export default function Button({
  size = 'md',
  color,
  children,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-1 rounded-md font-medium text-white',
        'transition hover:scale-105 hover:cursor-pointer active:scale-95',
        { 'px-3 py-1': size == 'sm' },
        { 'px-6 py-2': size == 'md' },
        { 'px-8 py-3': size == 'lg' },
        color,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
