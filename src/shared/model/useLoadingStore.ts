import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return {
    isLoading: false,
    startLoading: () => {
      // 이전 timeout이 있다면 클리어
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      set({ isLoading: true });
    },
    stopLoading: () => {
      // 1.5초 후 로딩 상태 종료
      timeoutId = setTimeout(() => {
        set({ isLoading: false });
        timeoutId = null;
      }, 1500);
    },
  };
}); 