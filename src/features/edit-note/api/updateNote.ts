import { UpdateNoteRequest } from "@/features/edit-note/model/types";
import { NoteResponse } from "@/entities/note/model/types";

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
