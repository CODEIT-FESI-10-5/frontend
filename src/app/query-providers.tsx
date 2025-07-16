"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

interface QueryProvidersProps {
  children: React.ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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

export function QueryProviders({ children }: QueryProvidersProps) {
  const queryClient = getQueryClient();
  const [mswReady, setMswReady] = useState(false);

  // MSW 워커 초기화 (개발 환경에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      import("../shared/mocks/browser").then(({ worker }) => {
        worker
          .start({
            onUnhandledRequest: "bypass", // 처리되지 않은 요청은 그대로 통과
          })
          .then(() => {
            setMswReady(true);
          });
      });
    } else {
      setMswReady(true);
    }
  }, []);

  // MSW가 준비되지 않았으면 로딩 표시
  if (!mswReady) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}