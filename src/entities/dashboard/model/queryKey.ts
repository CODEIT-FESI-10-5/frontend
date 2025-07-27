export const dashboardQueryKeys = {
  goal: (goalId: string) => ['dashboard', goalId] as const,
} as const;
