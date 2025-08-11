'use client';

import { useState, useEffect, useRef } from 'react';
import { Note } from '@/entities/note/model/types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { NoteEditorMenu } from './NoteEditorMenu';
import { cn } from '@/shared/lib/utils/cn';

interface NoteEditorProps {
  initialNote?: Note;
  onAutoSave: (content: string) => void;
}

export function NoteEditor({ initialNote, onAutoSave }: NoteEditorProps) {
  const [typingStatus, setTypingStatus] = useState<'idle' | 'typing' | 'saved'>('idle');
  const [isFadeOut, setIsFadeOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // TipTap 에디터 초기화
  const editor = useEditor({
    extensions: [
      Underline,
      Highlight,
      Placeholder.configure({ placeholder: '노트를 적어주세요!' }),
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
    ],
    content: initialNote?.content || '',
    onCreate: ({ editor }) => {
      editor.commands.focus('end');
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      setTypingStatus('typing');
      setIsFadeOut(false);

      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

      timerRef.current = setTimeout(() => {
        setTypingStatus('saved');
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
    if (typingStatus === 'saved') {
      setIsFadeOut(false);
      fadeTimerRef.current = setTimeout(() => {
        setIsFadeOut(true);
        setTimeout(() => setTypingStatus('idle'), 500);
      }, 1500);
    }
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [typingStatus]);

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
        {typingStatus !== 'idle' && (
          <span
            className={cn(
              'transition-opacity duration-500',
              isFadeOut ? 'opacity-0' : 'opacity-100',
              typingStatus === 'typing' && 'text-text-tertiary body-medium',
              typingStatus === 'saved' && 'body-medium text-highlight',
            )}
          >
            {typingStatus === 'typing' && '작성 중...'}
            {typingStatus === 'saved' && '자동 저장되었습니다.'}
          </span>
        )}
      </div>
    </div>
  );
}
