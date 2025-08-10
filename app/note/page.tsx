import { Suspense } from 'react';
import { NoteListPage } from '@/pages/note/ui/NoteListPage';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NoteListPage />
    </Suspense>
  );
}
