import { NoteEditPage } from '@/pages/note/ui/NoteEditPage';

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;
  return <NoteEditPage noteId={Number(noteId)} />;
}
