'use client';

import { useState, useEffect, useRef } from 'react';
import { Note } from '@/entities/note/model/types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { NoteEditorMenu } from './NoteEditorMenu';

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
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Highlight,
      Placeholder.configure({ placeholder: '노트를 적어주세요!' }),
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

  // 에디터가 준비되면 자동으로 focus
  useEffect(() => {
    if (editor) {
      const timer = setTimeout(() => {
        editor.commands.focus('end');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [editor]);

  // 초기 노트 내용 설정 및 커서 위치 설정
  useEffect(() => {
    if (editor && initialNote) {
      const { from, to } = editor.state.selection;

      editor.commands.setContent(initialNote.content, {
        emitUpdate: false,
        parseOptions: {
          preserveWhitespace: 'full',
        },
        errorOnInvalidContent: true,
      });

      editor.commands.setTextSelection({ from, to });
    }
  }, [editor, initialNote]);

  // 상태 메시지 표시 및 페이드 아웃
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

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  if (!editor) return null;

  return (
    <div className="space-y-6">
      <div className="bg-surface-3 rounded-md">
        <EditorContent
          editor={editor}
          className="h-[300px] overflow-y-auto px-16 py-34 text-white focus:outline-none md:px-36"
        />
        <NoteEditorMenu editor={editor} />
      </div>
      {/* 상태 메시지 */}
      <div className="min-h-30 text-left">
        {showStatus && (
          <span
            className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            {status === 'typing' && (
              <span className="text-text-tertiary body-medium">작성 중...</span>
            )}
            {status === 'saved' && (
              <span className="body-medium text-highlight">
                자동 저장되었습니다.
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
