'use client';
import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';
import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}
const baseStyle =
  'border-border-emphasis border-1 text-text-tertiary focus:border-border-input-focused focus:text-text-white';
const errorStyle = 'border-highlight text-text-white';
const textFieldVariants = cva(
  'bg-surface-3 rounded-6 border-1.5 h-51 w-442 p-16 outline-none', // 기본 클래스
  {
    variants: {
      error: {
        true: 'border-highlight text-text-white', // 에러일 때
        false:
          'border-border-emphasis border-1 text-text-tertiary focus:border-border-input-focused focus:text-text-white', // 기본
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
    <div className="flex flex-col gap-11">
      <label className="text-text-tertiary label-small">{label}</label>
      <input className={cn(textFieldVariants({ error }))} {...props}></input>
      {error && (
        <span className="text-highlight label-small">{errorMessage}</span>
      )}
    </div>
  );
}
