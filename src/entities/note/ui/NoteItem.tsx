'use client';

import { ReactNode } from 'react';
import { Note } from '@/entities/note/model/types';
import NoteOpenIcon from '@/assets/note-open.svg';
import parse from 'html-react-parser';
import { AnimatePresence, motion } from 'framer-motion';

interface NoteItemProps {
  note: Note;
  isExpanded: boolean;
  onToggle: () => void;
  actions: ReactNode;
}

export function NoteItem({
  note,
  isExpanded,
  onToggle,
  actions,
}: NoteItemProps) {
  return (
    <div
      className="bg-surface-2 cursor-pointer rounded-lg px-16 py-12"
      onClick={onToggle}
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
                style={{ display: 'inline-block' }}
              >
                <NoteOpenIcon />
              </motion.span>
            </span>
            <h3 className="text-lg font-semibold">{note.todoTitle}</h3>
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && actions}
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
