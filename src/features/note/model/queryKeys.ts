export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (studyGoalId: number) => [...noteKeys.lists(), studyGoalId] as const,
};