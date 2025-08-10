'use client';

import { useLoadingStore } from '@/shared/model/useLoadingStore';
import { createPortal } from 'react-dom';

export function GlobalLoadingInteractionBlock() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center" />,
    document.body,
  );
}
