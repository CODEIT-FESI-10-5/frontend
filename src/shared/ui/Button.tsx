import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  size: 'lg' | 'md' | 'sm' | 'xs';
  theme: 'primary' | 'tertiary' | 'highlight' | 'surface';
  className?: string;
}

const buttonVariants = cva('flex items-center justify-center text-text-white', {
  variants: {
    size: {
      lg: 'py-16 h-55 w-full body-medium rounded-6',
      md: 'px-18 py-13 w-fit h-50 title-small rounded-6',
      sm: 'px-16 py-8 w-fit h-40 body-medium rounded-4',
      xs: 'px-12 py-6 w-fit h-32 label-large rounded-4',
    },
    theme: {
      primary: 'bg-primary',
      tertiary: 'bg-tertiary',
      highlight: 'bg-highlight',
      surface: 'bg-surface-2',
    },
  },
});

const disabledVariants = cva('', {
  variants: {
    size: {
      lg: 'bg-disabled text-surface-4 ',
      md: '',
      sm: 'bg-border-emphasis text-text-primary',
      xs: 'bg-border-emphasis text-text-primary',
    },
  },
});

export default function Button({
  label,
  size,
  theme,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ size, theme }),
        disabled && disabledVariants({ size }),
        className,
      )}
    >
      {label}
    </button>
  );
}
