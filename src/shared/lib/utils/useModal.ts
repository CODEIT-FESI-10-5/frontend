import { useModalStore } from '@/shared/model/useModalStore';

export function useModal() {
  const { open, close } = useModalStore();
  return {
    open,
    close,
  };
}
