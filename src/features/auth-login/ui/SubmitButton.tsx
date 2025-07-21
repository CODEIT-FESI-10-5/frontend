import clsx from 'clsx';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  isActive: boolean;
}

export default function SubmitButton({
  name,
  isActive,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-6 flex h-54 w-442 items-center justify-center',
        isActive ? 'bg-primary text-text-white' : 'bg-white text-black',
      )}
    >
      {name}
    </button>
  );
}
