export const todolistQueryKeys = {
  todolist: (goalId: string) => [goalId, 'todolist'] as const,
} as const;
