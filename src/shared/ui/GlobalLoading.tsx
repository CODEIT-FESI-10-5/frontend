'use client';

import { useLoadingStore } from '@/shared/model/useLoadingStore';
import { createPortal } from 'react-dom';

export function GlobalLoading() {
  const { isLoading } = useLoadingStore();

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
