import { ButtonHTMLAttributes, SVGProps } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconName: React.FC<SVGProps<SVGSVGElement>>;
}

export default function IconButton({ onClick, IconName }: IconButtonProps) {
  return (
    <button
      className="flex h-32 w-32 cursor-pointer items-center justify-center transition hover:scale-110"
      onClick={onClick}
    >
      <IconName />
    </button>
  );
}
