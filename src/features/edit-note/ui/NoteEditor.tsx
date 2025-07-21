'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/entities/note/model/types';

interface NoteEditorProps {
  initialNote?: Note;
  onSubmit: (content: string) => void;
  submitButtonText: string;
  isLoading?: boolean;
}

export function NoteEditor({
  initialNote,
  onSubmit,
  submitButtonText,
  isLoading = false,
}: NoteEditorProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialNote) {
      setContent(initialNote.content);
    }
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="노트 내용을 입력하세요"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? '처리 중...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}
