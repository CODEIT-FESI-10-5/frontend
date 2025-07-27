import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { ReactNode } from 'react';

export const renderWithQueryClient = (
  ui: React.ReactElement,
  options?: RenderOptions,
) => {
  const queryClient = new QueryClient();

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
