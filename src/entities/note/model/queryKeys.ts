export const noteQueryKeys = {
  all: ['note'] as const,
  detail: (noteId: string) => [...noteQueryKeys.all, 'detail', noteId] as const,
} as const;
