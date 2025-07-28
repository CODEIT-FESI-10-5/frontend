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

interface NoteEditorMenuProps {
  editor: Editor | null;
}

export function NoteEditorMenu({ editor }: NoteEditorMenuProps) {
  if (!editor) return null;

  return (
    <div className="mt-2 flex justify-center">
      <div className="inline-flex h-[42px] w-[360px] items-center justify-center gap-2 rounded bg-white px-3 py-2">
        {/* Bold */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="굵게"
        >
          <Bold size={18} />
        </EditorMenuButton>
        {/* Italic */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="기울임"
        >
          <Italic size={18} />
        </EditorMenuButton>
        {/* Underline */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="밑줄"
        >
          <UnderlineIcon size={18} />
        </EditorMenuButton>
        {/* Highlight */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          title="형광펜"
          className={
            editor.isActive('highlight') ? 'bg-yellow-100 text-yellow-700' : ''
          }
        >
          <Highlighter size={18} />
        </EditorMenuButton>
        {/* Strike */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="취소선"
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
            className="text-sm font-semibold"
          >
            {`H${level}`}
          </EditorMenuButton>
        ))}
        {/* Bullet List */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="글머리 기호 목록"
        >
          <List size={18} />
        </EditorMenuButton>
        {/* Ordered List */}
        <EditorMenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="번호 매기기 목록"
        >
          <ListOrdered size={18} />
        </EditorMenuButton>
      </div>
    </div>
  );
}
