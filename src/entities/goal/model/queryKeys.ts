export const goalQueryKeys = {
  all: ['goal'] as const,
  list: () => [...goalQueryKeys.all, 'list'] as const,
  detail: (goalId: string) => [...goalQueryKeys.all, 'detail', goalId] as const,
} as const;
