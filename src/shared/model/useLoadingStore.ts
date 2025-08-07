import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let startTime: number | null = null;

  return {
    isLoading: false,
    startLoading: () => {
      // 이전 timeout이 있다면 클리어
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      startTime = Date.now();
      set({ isLoading: true });
    },
    stopLoading: () => {
      const minLoadingTime = 1500;
      const elapsedTime = startTime ? Date.now() - startTime : 0;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      timeoutId = setTimeout(() => {
        set({ isLoading: false });
        timeoutId = null;
        startTime = null;
      }, remainingTime);
    },
  };
});
