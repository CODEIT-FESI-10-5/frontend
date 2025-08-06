import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Highlighter,
} from 'lucide-react';
import { EditorMenuButton } from '@/shared/ui/EditorMenuButton';
import { cn } from '@/shared/lib/utils/cn';

interface NoteEditorMenuProps {
  editor: Editor | null;
}

export function NoteEditorMenu({ editor }: NoteEditorMenuProps) {
  if (!editor) return null;

  return (
    <div className="mt-2 flex justify-center">
      <div className="flex w-full max-w-[360px] items-center justify-center gap-1 rounded bg-white px-2 py-2 sm:gap-2 sm:px-3">
        <div className="flex w-full items-center justify-center gap-1 overflow-x-auto sm:w-auto sm:gap-2">
          {/* Bold */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="굵게"
            className="flex-shrink-0 sm:flex-none"
          >
            <Bold size={18} />
          </EditorMenuButton>
          {/* Italic */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="기울임"
            className="flex-shrink-0 sm:flex-none"
          >
            <Italic size={18} />
          </EditorMenuButton>
          {/* Underline */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="밑줄"
            className="flex-shrink-0 sm:flex-none"
          >
            <UnderlineIcon size={18} />
          </EditorMenuButton>
          {/* Highlight */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive('highlight')}
            title="형광펜"
            className={cn(
              'flex-shrink-0 sm:flex-none',
              editor.isActive('highlight')
                ? 'bg-yellow-100 text-yellow-700'
                : '',
            )}
          >
            <Highlighter size={18} />
          </EditorMenuButton>
          {/* Strike */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="취소선"
            className="flex-shrink-0 sm:flex-none"
          >
            <Strikethrough size={18} />
          </EditorMenuButton>
          {/* Heading 1~4 */}
          {([1, 2, 3, 4] as const).map((level) => (
            <EditorMenuButton
              key={level}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              active={editor.isActive('heading', { level })}
              title={`제목 ${level}`}
              className="flex-shrink-0 text-sm font-semibold sm:flex-none"
            >
              {`H${level}`}
            </EditorMenuButton>
          ))}
          {/* Bullet List */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="글머리 기호 목록"
            className="flex-shrink-0 sm:flex-none"
          >
            <List size={18} />
          </EditorMenuButton>
          {/* Ordered List */}
          <EditorMenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="번호 매기기 목록"
            className="flex-shrink-0 sm:flex-none"
          >
            <ListOrdered size={18} />
          </EditorMenuButton>
        </div>
      </div>
    </div>
  );
}
