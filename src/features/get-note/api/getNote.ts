import { type NoteListResponse, type NoteResponse } from "@/entities/note/model/types"
import { clientFetch } from '@/shared/api';

export const getNotesByStudyGoalId = async (studyGoalId: number): Promise<NoteListResponse> => {
  return clientFetch.get<NoteListResponse>(`/api/notes/${studyGoalId}`);
};

export const getNoteById = async (noteId: number): Promise<NoteResponse> => {
  return clientFetch.get<NoteResponse>(`/api/notes/detail/${noteId}`);
};

