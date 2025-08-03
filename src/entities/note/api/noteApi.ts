import { clientFetch } from '@/shared/api';
import { NoteListResponse, NoteResponse, UpdateNoteRequest } from '../model/types';

// 노트 목록 조회
export const getNoteListByStudyGoalId = async (studyGoalId: number): Promise<NoteListResponse> => {
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

// 노트 수정
export const patchNote = async (
  noteData: UpdateNoteRequest,
): Promise<NoteResponse> => {
  return clientFetch.patch<NoteResponse>(`/api/notes/${noteData.id}`, {
    content: noteData.content,
  });
};
