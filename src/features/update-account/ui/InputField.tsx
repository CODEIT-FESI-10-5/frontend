'use client';
import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

const inputFieldVariants = cva(
  'bg-surface-3 rounded-6 h-51 w-full p-16 outline-none',
  {
    variants: {
      error: {
        true: 'border-highlight border-1.5 text-text-white',
        false:
          'border-border-emphasis border-1 text-text-tertiary focus:border-border-input-focused focus:border-1.5 focus:text-text-white', // 기본
      },
    },
  },
);
export default function InputField({
  label,
  error,
  errorMessage,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex w-full flex-col gap-11">
      <input className={cn(inputFieldVariants({ error }))} {...props}></input>
      {error && (
        <span className="text-highlight label-small">{errorMessage}</span>
      )}
    </div>
  );
}
