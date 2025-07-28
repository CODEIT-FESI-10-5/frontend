import { clientFetch } from '@/shared/api';

// 소주제(goal) 제목 업데이트 API
export const updateGoalTitle = async (goalId: string, newTitle: string) => {
  return clientFetch.patch(`/api/goals/${goalId}`, { title: newTitle });
};
