import { type UpdateNoteRequest, type NoteListResponse, type NoteResponse } from "@/features/note/model";

export const getNotesByStudyGoalId = async (studyGoalId: number): Promise<NoteListResponse> => {
  const response = await fetch(`/api/notes/${studyGoalId}`, {
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

export const getNoteById = async (noteId: number): Promise<NoteResponse> => {
  const response = await fetch(`/api/notes/detail/${noteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('노트를 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const updateNote = async (noteData: UpdateNoteRequest): Promise<NoteResponse> => {
  const response = await fetch(`/api/notes/${noteData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: noteData.title,
      content: noteData.content,
    }),
  });

  if (!response.ok) {
    throw new Error('노트 수정에 실패했습니다.');
  }

  return response.json();
};
