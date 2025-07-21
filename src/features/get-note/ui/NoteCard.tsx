'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Note } from '@/entities/note/model/types';
import NoteOpenIcon from '@/assets/note-open.svg';
import NoteClosedIcon from '@/assets/note-close.svg';

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
      className="mb-4 cursor-pointer rounded-lg border border-green-500 p-4"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            {/* 아이콘 */}
            <div className="flex items-center gap-8">
              <span className="mr-2 flex-shrink-0">
                {isExpanded ? <NoteOpenIcon /> : <NoteClosedIcon />}
              </span>
              <h3 className="text-lg font-semibold">{note.todoTitle}</h3>
            </div>

            {isExpanded && (
              <button
                onClick={handleEditClick}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
              >
                노트 수정
              </button>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4">
              <div className="relative rounded-md bg-gray-50 p-3">
                <p className="whitespace-pre-wrap text-gray-700">
                  {note.content}
                </p>
              </div>
              <div className="mt-2 text-sm text-white">
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
          )}
        </div>
      </div>
    </div>
  );
}
