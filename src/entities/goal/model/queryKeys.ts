export const goalQueryKeys = {
  all: ['goal'] as const,
  list: (studyId: number) => [...goalQueryKeys.all, 'list', studyId] as const,
} as const;
