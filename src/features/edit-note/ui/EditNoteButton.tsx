'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
    <motion.button
      onClick={handleEditClick}
      className="text-text-primary border-border-emphasis hover:bg-surface-1 cursor-pointer rounded-md border px-10 py-10 text-sm transition-colors"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      whileHover={{ scale: 1.05 }}
    >
      노트 수정
    </motion.button>
  );
};
