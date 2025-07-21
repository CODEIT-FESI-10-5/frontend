'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}
const baseStyle =
  'border-border-emphasis border-1 text-text-tertiary focus:border-border-input-focused focus:text-text-white';
const errorStyle = 'border-highlight border-1.5 text-text-white';

export default function TextField({
  label,
  error,
  errorMessage,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-11">
      <label className="text-text-tertiary label-small">{label}</label>
      <input
        className={clsx(
          'bg-surface-3 rounded-6 h-51 w-442 p-16 outline-none',
          error ? errorStyle : baseStyle,
        )}
        {...props}
      ></input>
      {error && (
        <span className="text-highlight label-small">{errorMessage}</span>
      )}
    </div>
  );
}
