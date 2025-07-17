'use client';
import { cn } from '../utils/cn';

interface CheckBoxProp {
  isChecked: boolean;
  handleClick: () => void;
}

export default function TodoCheckBox({ isChecked, handleClick }: CheckBoxProp) {
  return (
    <div
      className="relative inline-flex cursor-pointer items-center"
      onClick={() => handleClick()}
    >
      <div
        className={cn(
          'h-20 w-20 cursor-pointer rounded-full border border-slate-300 shadow transition-colors hover:shadow-lg',
          { 'border-green-600 bg-green-600': isChecked },
        )}
      />
      <span
        className={cn(
          `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white transition-all`,
          isChecked ? 'opacity-100' : 'opacity-0',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </div>
  );
}
