import { clientFetch } from '@/shared/api';
import { NoteResponse } from '@/entities/note/model/types';

export interface UpdateNoteRequest {
  id: number;
  content: string;
}

export const updateNote = async (
  noteData: UpdateNoteRequest,
): Promise<NoteResponse> => {
  return clientFetch.patch<NoteResponse>(`/api/notes/${noteData.id}`, {
    content: noteData.content,
  });
};
