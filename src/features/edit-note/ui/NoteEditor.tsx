'use client';

import { useState, useEffect, useRef } from 'react';
import { Note } from '@/entities/note/model/types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

interface NoteEditorProps {
  initialNote?: Note;
  onAutoSave: (content: string) => void;
}

export function NoteEditor({ initialNote, onAutoSave }: NoteEditorProps) {
  const [status, setStatus] = useState<'idle' | 'typing' | 'saved'>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // TipTap 에디터 초기화
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: '노트 내용을 입력하세요...' }),
    ],
    content: initialNote?.content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setStatus('typing');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setStatus('saved');
        onAutoSave(html);
      }, 1500);
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  // initialNote 변경 시 에디터 내용 동기화
  useEffect(() => {
    if (editor && initialNote) {
      editor.commands.setContent(initialNote.content);
    }
  }, [editor, initialNote]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!editor) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-gray-300">
        <EditorContent
          editor={editor}
          className="min-h-[200px] p-4 focus:outline-none"
        />
      </div>
      {/* 상태 메시지 */}
      <div className="min-h-[1.5em] text-left text-sm">
        {status === 'typing' && (
          <span className="text-gray-400">작성 중...</span>
        )}
        {status === 'saved' && (
          <span className="text-green-600">작성 완료!</span>
        )}
      </div>
    </div>
  );
}
