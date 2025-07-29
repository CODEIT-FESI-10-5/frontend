import { type NoteListResponse, type NoteResponse } from "@/entities/note/model/types"
import { clientFetch } from '@/shared/api';

// 노트 목록 조회
export const getNotesByStudyGoalId = async (studyGoalId: number): Promise<NoteListResponse> => {
  return clientFetch.get<NoteListResponse>('/api/notes', {
    params: {
      goalId: studyGoalId,
      noteContent: null,
    },
  });
};

// 노트 상세 조회
export const getNoteById = async (noteId: number): Promise<NoteResponse> => {
  return clientFetch.get<NoteResponse>(`/api/notes/${noteId}`);
};

