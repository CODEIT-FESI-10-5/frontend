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

interface NoteEditorMenuProps {
  editor: Editor | null;
}

export function NoteEditorMenu({ editor }: NoteEditorMenuProps) {
  if (!editor) return null;

  return (
    <div className="mt-2 flex justify-center">
      <div className="inline-flex gap-1 rounded border border-gray-200 bg-white px-2 py-1 shadow">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1 ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="굵게"
        >
          <Bold size={16} />
        </button>
        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1 ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="기울임"
        >
          <Italic size={16} />
        </button>
        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded p-1 ${editor.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="밑줄"
        >
          <UnderlineIcon size={16} />
        </button>
        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`rounded p-1 ${editor.isActive('highlight') ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600'}`}
          title="형광펜"
        >
          <Highlighter size={16} />
        </button>
        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded p-1 ${editor.isActive('strike') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="취소선"
        >
          <Strikethrough size={16} />
        </button>
        {/* Heading 1~4 */}
        {([1, 2, 3, 4] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`rounded p-1 ${editor.isActive('heading', { level }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title={`제목 ${level}`}
          >
            {`H${level}`}
          </button>
        ))}
        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-1 ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="글머리 기호 목록"
        >
          <List size={16} />
        </button>
        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-1 ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          title="번호 매기기 목록"
        >
          <ListOrdered size={16} />
        </button>
      </div>
    </div>
  );
}
