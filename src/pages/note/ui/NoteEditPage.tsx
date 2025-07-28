'use client';

import { useGetNoteById } from '@/features/get-note/api/getNoteQueries';
import { NoteEditor } from '@/features/edit-note';
import { useUpdateNote } from '@/features/edit-note/api/useUpdateNoteMutation';
import NoteListPageIcon from '@/assets/note-list-page-icon.svg';

export function NoteEditPage({ noteId }: { noteId: number }) {
  const { data: noteResponse, isLoading, isError } = useGetNoteById(noteId);

  const note = noteResponse?.data?.note;
  const updateNoteMutation = useUpdateNote();

  const handleAutoSave = (content: string) => {
    if (!note) return;
    updateNoteMutation.mutate({ id: note.id, content });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-400">노트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-4">
            <h2 className="mb-2 text-lg font-semibold text-red-400">오류</h2>
            <p className="text-red-300">노트를 불러오는데 실패했습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-1 border-border-subtle max-w-[1208px] rounded-lg border">
      <div className="border-border-subtle border px-22 py-12">
        <h1 className="text-text-tertiary headline-medium text-lg">
          노트 작성
        </h1>
      </div>

      <div className="container mx-auto px-30 py-34">
        {note ? (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <NoteListPageIcon />
              <h1 className="headline-large text-2xl text-white">
                {note.studyGoalTitle}
              </h1>
            </div>
            <p className="body-medium mb-24 text-white">
              현재 투두: {note.todoTitle}
            </p>
            <NoteEditor initialNote={note} onAutoSave={handleAutoSave} />
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border border-yellow-600 bg-yellow-900/20 p-4">
              <h2 className="mb-2 text-lg font-semibold text-yellow-400">
                노트를 찾을 수 없습니다
              </h2>
              <p className="text-yellow-300">
                요청하신 노트가 존재하지 않습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
