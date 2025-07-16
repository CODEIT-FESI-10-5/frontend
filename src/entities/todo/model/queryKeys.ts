export const todoQueryKeys = {
  all: ['todo'] as const,
  // list: (todoListId: string) => [...todoQueryKeys.all, 'list', todoListId] as const,
} as const;
