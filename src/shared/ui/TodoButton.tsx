import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  color: 'bg-white' | 'bg-surface-4' | 'bg-primary' | 'bg-secondary';
  styleProps?: string;
}

export default function Button({
  size = 'md',
  color,
  styleProps = '',
  children,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={cn(
        'body-small flex items-center justify-center gap-10 rounded-md px-12 py-6 text-white',
        'transition hover:scale-105 hover:cursor-pointer active:scale-95',
        styleProps,
        { 'px-3 py-1': size == 'sm' },
        { 'h-40 w-84': size == 'md' },
        { 'h-36 w-160': size == 'lg' },
        color,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
