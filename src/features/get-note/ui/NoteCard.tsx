'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Note } from '@/entities/note/model/types';
import NoteOpenIcon from '@/assets/note-open.svg';
import NoteClosedIcon from '@/assets/note-close.svg';
import parse from 'html-react-parser';

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
          <div className="flex items-center gap-8">
            <span className="mr-2 flex-shrink-0">
              {isExpanded ? <NoteOpenIcon /> : <NoteClosedIcon />}
            </span>
            <h3 className="text-lg font-semibold">{note.todoTitle}</h3>
          </div>
          {isExpanded && (
            <button
              onClick={handleEditClick}
              className="text-text-primary border-border-emphasis hover:bg-surface-1 cursor-pointer rounded-md border px-10 py-10 text-sm transition-colors"
            >
              노트 수정
            </button>
          )}
        </div>
        {isExpanded && (
          <div className="mt-18">
            <div className="relative rounded-md">
              {/* script 태그 제거 후 html-react-parser로 파싱 */}
              <div className="text-text-primary prose prose-sm max-w-none">
                {parse(
                  // script 태그 제거
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
        )}
      </div>
    </div>
  );
}
