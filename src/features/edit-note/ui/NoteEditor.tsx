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
  const [showStatus, setShowStatus] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      setShowStatus(true);
      setFadeOut(false);

      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      
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

  useEffect(() => {
    if (editor && initialNote) {
      editor.commands.setContent(initialNote.content);
    }
  }, [editor, initialNote]);

  useEffect(() => {
    if (status === 'typing') {
      setShowStatus(true);
      setFadeOut(false);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    }
    if (status === 'saved') {
      setShowStatus(true);
      setFadeOut(false);
      fadeTimerRef.current = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowStatus(false), 500);
      }, 1500);
    }
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [status]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
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
      <div className="min-h-[1.5em] text-left text-sm">
        {showStatus && (
          <span
            className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            {status === 'typing' && (
              <span className="text-gray-400">작성 중...</span>
            )}
            {status === 'saved' && (
              <span className="text-green-600">작성 완료!</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
