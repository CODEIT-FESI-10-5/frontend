'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Note } from '@/entities/note/model';

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
      className="mb-4 cursor-pointer rounded-lg border border-gray-200 p-4"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold">{note.todoTitle}</h3>

          {isExpanded && (
            <div className="mt-4">
              <div className="relative rounded-md bg-gray-50 p-3">
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="text-md font-medium text-gray-800">
                    {note.title}
                  </h4>
                  <button
                    onClick={handleEditClick}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
                  >
                    노트 수정
                  </button>
                </div>
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
