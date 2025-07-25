import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  isActive: boolean;
}

const submitButtonVariants = cva(
  'rounded-6 flex h-54 w-442 items-center body-medium justify-center',
  {
    variants: {
      isActive: {
        true: 'bg-primary text-text-white',
        false: 'bg-disabled text-surface-4',
      },
    },
  },
);

export default function SubmitButton({ name, isActive }: SubmitButtonProps) {
  return (
    <button className={cn(submitButtonVariants({ isActive }))}>{name}</button>
  );
}
