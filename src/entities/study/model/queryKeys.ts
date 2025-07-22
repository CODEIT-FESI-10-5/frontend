export const studyQueryKeys = {
  all: ['study'] as const,
  detail: (studyId: string) =>
    [...studyQueryKeys.all, 'detail', studyId] as const,
} as const;
