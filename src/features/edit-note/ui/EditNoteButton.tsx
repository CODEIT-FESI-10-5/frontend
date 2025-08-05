'use client';

import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button';

interface EditNoteButtonProps {
  noteId: string | number;
}

export const EditNoteButton = ({ noteId }: EditNoteButtonProps) => {
  const router = useRouter();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/note/edit/${noteId}`);
  };

  return (
    <Button
      onClick={handleEditClick}
      label="노트 수정"
      size="md"
      theme="surface"
      className="text-text-primary border-border-emphasis w-full cursor-pointer border"
    />
  );
};
