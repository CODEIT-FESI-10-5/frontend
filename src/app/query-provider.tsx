'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, createContext, useContext, useEffect } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

// 로딩 상태를 관리할 Context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within QueryProvider');
  }
  return context;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      mutations: {
        onMutate: () => {
          // mutation 시작 시 로딩 상태를 true로 설정
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('setGlobalLoading', { detail: true });
            window.dispatchEvent(event);
          }
        },
        onSettled: () => {
          // mutation 완료 시 1.5초 후에 로딩 상태를 false로 설정
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              const event = new CustomEvent('setGlobalLoading', {
                detail: false,
              });
              window.dispatchEvent(event);
            }, 1500);
          }
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // 전역 로딩 상태 이벤트 리스너
  useEffect(() => {
    const handleGlobalLoading = (event: CustomEvent) => {
      setIsLoading(event.detail);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'setGlobalLoading',
        handleGlobalLoading as EventListener,
      );

      return () => {
        window.removeEventListener(
          'setGlobalLoading',
          handleGlobalLoading as EventListener,
        );
      };
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </LoadingContext.Provider>
  );
}
