export const studyQueryKeys = {
  all: ['study'] as const,
  list: () => [...studyQueryKeys.all] as const,
  detail: (studyId: string) =>
    [...studyQueryKeys.all, 'detail', studyId] as const,
} as const;
