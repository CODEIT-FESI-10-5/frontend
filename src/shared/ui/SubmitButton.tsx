import { cva } from 'class-variance-authority';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  isActive: boolean;
  size?: 'sm' | 'lg';
}

const lgVariants = cva(
  'rounded-6 flex items-center body-medium justify-center w-442 h-54',
  {
    variants: {
      isActive: {
        true: 'bg-primary text-text-white',
        false: 'bg-disabled text-surface-4',
      },
    },
  },
);

const smVariants = cva(
  'rounded-4 flex items-center label-large justify-center w-auto h-auto px-12 py-6 text-text-white',
  {
    variants: {
      isActive: {
        true: 'bg-primary',
        false: 'bg-border-emphasis',
      },
    },
  },
);

export default function SubmitButton({
  name,
  isActive,
  size,
}: SubmitButtonProps) {
  const variantFn = size === 'lg' ? lgVariants : smVariants;

  return <button className={variantFn({ isActive })}>{name}</button>;
}
