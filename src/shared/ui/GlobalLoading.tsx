'use client';

import { useLoading } from '@/app/query-provider';
import { createPortal } from 'react-dom';

export function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div className="h-40 w-40 animate-spin rounded-full border-b-2 border-white"></div>
    </div>,
    document.body,
  );
}
