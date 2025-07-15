import type { Dashboard, StudyGroup } from "../../../entities/dashboard";

// Dashboard 조회 API
export const fetchDashboard = async (groupId: string, goalId: string): Promise<Dashboard> => {
  const response = await fetch(`/api/dashboard?groupId=${groupId}&goalId=${goalId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }
  return response.json();
};

// StudyGroup 조회 API
export const fetchStudyGroup = async (groupId: string): Promise<StudyGroup> => {
  const response = await fetch(`/api/study-group/${groupId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch study group");
  }
  return response.json();
};

// StudyGroup 기본 정보 수정 (제목, 설명)
export const updateStudyGroupInfo = async (groupId: string, title: string, description: string) => {
  const response = await fetch(`/api/studygroup/info/${groupId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to update study group info");
  }

  return response.json();
};

// StudyGroup 이미지 수정
export const updateStudyGroupImage = async (groupId: string, image: string) => {
  const response = await fetch(`/api/studygroup/image/${groupId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });

  if (!response.ok) {
    throw new Error("Failed to update study group image");
  }

  return response.json();
};

// 소주제(goal) 제목 업데이트 API
export const updateGoalTitle = async (groupId: string, goalId: string, newTitle: string) => {
  const response = await fetch(`/api/goal/title?groupId=${groupId}&goalId=${goalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo list title");
  }

  return response.json();
};

//todo 완료 체크 API
export const updateTodoCompletion = async (todoListId: string, todoId: string, completed: boolean) => {
  const response = await fetch(`/api/todo/completion?todoListId=${todoListId}&todoId=${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo completion");
  }

  return response.json();
};
