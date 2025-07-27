import { type NoteListResponse, type NoteResponse } from "@/entities/note/model/types"
import { clientFetch } from '@/shared/api';

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
  return clientFetch.get<NoteResponse>(`/api/notes/detail/${noteId}`);
};

