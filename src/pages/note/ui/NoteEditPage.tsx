'use client';

import { NoteEditor } from '@/features/update-note/ui/NoteEditor';
import { useGetNoteById, useUpdateNoteMutation } from '@/entities/note/api/noteQueries';
import NoteIcon from '@/assets/note-icon.svg';

export function NoteEditPage({ noteId }: { noteId: number }) {
  const { data: noteResponse, isLoading, isError } = useGetNoteById(noteId);
  const note = noteResponse?.data;
  const updateNoteMutation = useUpdateNoteMutation();

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
    <div className="md:bg-surface-1 md:border-border-subtle w-full max-w-[1208px] rounded-lg md:border">
      <div className="border-border-subtle hidden border px-22 py-12 md:block">
        <h1 className="text-text-tertiary m-headline-medium">
          노트 작성
        </h1>
      </div>

      <div className="px-30 py-34">
        {note ? (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <NoteIcon />
              <h1 className="m-headline-medium md:headline-large text-white">
                {note.studyGoalTitle}
              </h1>
            </div>
            <p className="m-body-small md:body-medium mb-24 text-white">
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
