'use client';

import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';
import LottieComponent from './LottieComponent';
import LoadingSpinner from '@/lottie/loading-spinner.json';
import { useEffect, useRef, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  size: 'lg' | 'md' | 'sm' | 'xs';
  theme: 'primary' | 'tertiary' | 'highlight' | 'surface' | 'emphasis';
  className?: string;
  isPending?: boolean;
}

const buttonVariants = cva(
  'flex items-center justify-center text-text-white cursor-pointer',
  {
    variants: {
      size: {
        lg: 'py-16 h-55 w-full m-title-small md:body-medium rounded-6',
        md: 'px-18 py-13 w-fit h-50 m-title-small md:title-small rounded-6',
        sm: 'px-16 py-8 w-fit h-40 m-body-medium md:body-medium rounded-4',
        xs: 'px-12 py-6 w-fit h-32 m-body-small md:label-small  rounded-4',
      },
      theme: {
        primary: 'bg-primary',
        tertiary: 'bg-tertiary',
        highlight: 'bg-highlight',
        surface: 'bg-surface-2',
        emphasis: 'bg-border-emphasis',
      },
    },
  },
);

const disabledVariants = cva('', {
  variants: {
    size: {
      lg: 'bg-disabled text-surface-4 ',
      md: '',
      sm: 'bg-border-emphasis text-text-primary',
      xs: 'bg-border-emphasis text-text-primary',
    },
  },
});

const loadingIndicatorSize = {
  lg: 28,
  md: 28,
  sm: 26,
  xs: 22,
};

export default function Button({
  label,
  size,
  theme,
  className,
  disabled = false,
  isPending = false,
  ...props
}: ButtonProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const lottieWidth = loadingIndicatorSize[size]; // px 값이라고 가정
  const gap = 14;

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, [label]);

  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ size, theme }),
        disabled && disabledVariants({ size }),
        className,
      )}
    >
      {size === 'lg' ? (
        <div className="relative flex items-center justify-center">
          {isPending && (
            <div
              className={`absolute`}
              style={{
                left: `calc(50% - ${labelWidth / 2 + gap + lottieWidth}px)`,
                top: `calc(50% - ${lottieWidth / 2}px)`,
              }}
            >
              <LottieComponent
                animationData={LoadingSpinner}
                width={lottieWidth}
                height={lottieWidth}
              />
            </div>
          )}
          <div ref={labelRef}>{label}</div>
        </div>
      ) : isPending ? (
        <LottieComponent
          animationData={LoadingSpinner}
          width={lottieWidth}
          height={lottieWidth}
        />
      ) : (
        label
      )}
    </button>
  );
}
