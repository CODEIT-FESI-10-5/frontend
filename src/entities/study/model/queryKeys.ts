export const studyQueryKeys = {
  all: ['study'] as const,
  list: () => [...studyQueryKeys.all, 'list'] as const,
  detail: (studyId: string) =>
    [...studyQueryKeys.all, 'detail', studyId] as const,
} as const;
