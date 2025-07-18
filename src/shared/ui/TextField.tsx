'use client';
import clsx from 'clsx';
import React, { useState } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export default function TextField({
  label,
  error,
  errorMessage,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const baseStyle = 'border-border-emphasis border-1 text-text-tertiary';
  const focusStyle =
    'outline-border-input-focused focus:outline-1.5 text-text-white';
  const errorStyle = 'border-highlight border-1.5 text-text-white outline-none';
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  return (
    <div className="flex flex-col gap-11">
      <label className="text-text-tertiary label-small">{label}</label>
      <input
        className={clsx(
          'bg-surface-3 rounded-6 h-51 w-442 p-16',
          error && errorStyle,
          isFocused && focusStyle,
          !isFocused && !error && baseStyle,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      ></input>
      {error && (
        <span className="text-highlight label-small">{errorMessage}</span>
      )}
    </div>
  );
}
