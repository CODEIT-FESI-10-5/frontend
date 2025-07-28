export const todolistQueryKeys = {
  todolist: (goalId: string) => ['todolist', goalId] as const,
} as const;
