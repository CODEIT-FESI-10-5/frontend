import { NoteListResponse } from "@/entities/note";

export const getNotesByStudyGoalId = async (studyGoalId: number): Promise<NoteListResponse> => {
  const response = await fetch(`api/notes/${studyGoalId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('노트 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
};

