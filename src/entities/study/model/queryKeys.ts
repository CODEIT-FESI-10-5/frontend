export const studyQueryKeys = {
  all: ['user'] as const,
  detail : (studyId: string) => [...studyQueryKeys.all, 'detail', studyId] as const,
} as const;
