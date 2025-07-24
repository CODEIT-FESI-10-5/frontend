'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Note } from '@/entities/note/model/types';
import NoteOpenIcon from '@/assets/note-open.svg';
import parse from 'html-react-parser';
import { AnimatePresence, motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/note/edit/${note.id}`);
  };

  return (
    <div
      className="bg-surface-2 cursor-pointer rounded-lg px-16 py-12"
      onClick={handleCardClick}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 py-10">
            <span className="mr-2 flex-shrink-0">
              <motion.span
                animate={{
                  rotate: isExpanded ? 0 : -180,
                  color: isExpanded ? '#7380E9' : '#fff',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  display: 'inline-block',
                  color: isExpanded ? '#7380E9' : '#fff',
                }}
              >
                <NoteOpenIcon />
              </motion.span>
            </span>
            <h3 className="text-lg font-semibold">{note.todoTitle}</h3>
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && (
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
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="note-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="mt-18">
                <div className="relative rounded-md">
                  <div className="text-text-primary prose prose-sm max-w-none">
                    {parse(
                      (note.content || '').replace(
                        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
                        '',
                      ),
                    )}
                  </div>
                </div>
                <div className="text-text-tertiary mt-2 text-sm">
                  <span>
                    생성일: {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  {note.updatedAt !== note.createdAt && (
                    <span className="ml-4">
                      수정일: {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
