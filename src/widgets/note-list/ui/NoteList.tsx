'use client';

import { useState } from 'react';
import { NoteItem } from '@/entities/note/ui/NoteItem';
import { Note } from '@/entities/note/model/types';
import { EditNoteButton } from '@/features/edit-note';
import NoteIcon from '@/assets/note-icon.svg';

interface NoteListProps {
  title: string;
  notes: Note[];
}

export function NoteList({ title, notes }: NoteListProps) {
  const [expandedNoteId, setExpandedNoteId] = useState<string | number | null>(
    null,
  );

  const handleToggle = (noteId: string | number) => {
    setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
  };

  return (
    <section>
      <div className="mb-24 flex items-center gap-10">
        <NoteIcon />
        <h1 className="m-headline-medium md:headline-large line-clamp-2 text-white">
          {title}
        </h1>
      </div>

      {notes.length !== 0 ? (
        <ul className="space-y-12">
          {notes.map((note) => (
            <li key={note.id}>
              <NoteItem
                note={note}
                isExpanded={expandedNoteId === note.id}
                onToggle={() => handleToggle(note.id)}
                actions={<EditNoteButton noteId={note.id} />}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-lg text-gray-500">
            아직 작성된 노트가 없습니다.
          </div>
        </div>
      )}
    </section>
  );
}
