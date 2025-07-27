import { ReactNode } from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

interface EditorMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  active?: boolean;
  title?: string;
  className?: string;
  children: ReactNode;
}

const editorMenuButtonVariants = cva('rounded p-1.5 transition-colors', {
  variants: {
    active: {
      true: 'bg-blue-100 text-blue-600',
      false: 'text-gray-600 hover:bg-gray-100',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export function EditorMenuButton({
  onClick,
  active = false,
  title,
  className = '',
  children,
  ...rest
}: EditorMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(editorMenuButtonVariants({ active }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
