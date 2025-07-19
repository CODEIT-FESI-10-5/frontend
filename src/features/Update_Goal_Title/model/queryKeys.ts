export const goalQueryKeys = {
  all: ['goal'] as const,
  detail: (goalId: string) => [...goalQueryKeys.all, 'detail', goalId] as const,
} as const;
