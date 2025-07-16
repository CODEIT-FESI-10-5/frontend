export const goalQueryKeys = {
  all: ['goal'] as const,
  byStudy: (studyId: string) => [...goalQueryKeys.all, 'study', studyId] as const,
  detail: (goalId: string) => [...goalQueryKeys.all, 'detail', goalId] as const,
} as const;
