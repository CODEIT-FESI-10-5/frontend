'use client';

import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '../lib/utils/cn';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const textFieldVariants = cva(
  'bg-surface-3 rounded-6 h-51 w-full max-w-442 p-16 outline-none',
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
export default function TextField({
  label,
  error,
  errorMessage,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-11">
      {label && (
        <label className="text-text-tertiary m-body-small md:label-small">
          {label}
        </label>
      )}
      <input className={cn(textFieldVariants({ error }))} {...props}></input>
      {error && (
        <span className="text-highlight label-small">{errorMessage}</span>
      )}
    </div>
  );
}
