'use client';

import { useNoteById } from '@/features/get-note/api/getNoteQueries';
import { NoteEditor } from '@/features/edit-note';
import { useUpdateNote } from '@/features/edit-note/api/useUpdateNoteMutation';

export function NoteEditPage({ noteId }: { noteId: number }) {
  const {
    data: noteData,
    isLoading,
    isError,
  } = useNoteById(noteId, noteId > 0);

  const note = noteData?.note;
  const updateNoteMutation = useUpdateNote();

  const handleAutoSave = (content: string) => {
    if (!note) return;
    updateNoteMutation.mutate({ id: note.id, content });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">노트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-red-800">오류</h2>
          <p className="text-red-600">노트를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {note ? (
        <NoteEditor initialNote={note} onAutoSave={handleAutoSave} />
      ) : (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-yellow-800">
            노트를 찾을 수 없습니다
          </h2>
          <p className="text-yellow-600">요청하신 노트가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}
