import { clientFetch } from "../../../shared/api";

// 소주제(goal) 제목 업데이트 API
export const updateGoalTitle = async (groupId: string, goalId: string, newTitle: string) => {
  return clientFetch.patch(`/goal/title`, { title: newTitle }, {
    params: { groupId, goalId }
  });
};
