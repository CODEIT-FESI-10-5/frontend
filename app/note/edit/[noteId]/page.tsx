import { NoteEditPage } from '@/pages/note/ui/NoteEditPage';

export default function Page({ params }: { params: { noteId: string } }) {
  return <NoteEditPage noteId={Number(params.noteId)} />;
}
