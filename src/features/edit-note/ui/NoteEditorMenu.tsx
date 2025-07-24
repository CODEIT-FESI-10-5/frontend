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
      <div className="inline-flex h-[42px] w-[360px] items-center justify-center gap-2 rounded bg-white px-3 py-2">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1.5 ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="굵게"
        >
          <Bold size={18} />
        </button>
        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1.5 ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="기울임"
        >
          <Italic size={18} />
        </button>
        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded p-1.5 ${editor.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="밑줄"
        >
          <UnderlineIcon size={18} />
        </button>
        {/* Highlight */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`rounded p-1.5 ${editor.isActive('highlight') ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}`}
          title="형광펜"
        >
          <Highlighter size={18} />
        </button>
        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded p-1.5 ${editor.isActive('strike') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="취소선"
        >
          <Strikethrough size={18} />
        </button>
        {/* Heading 1~4 */}
        {([1, 2, 3, 4] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`rounded p-1.5 text-sm font-semibold ${editor.isActive('heading', { level }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            title={`제목 ${level}`}
          >
            {`H${level}`}
          </button>
        ))}
        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-1.5 ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="글머리 기호 목록"
        >
          <List size={18} />
        </button>
        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-1.5 ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="번호 매기기 목록"
        >
          <ListOrdered size={18} />
        </button>
      </div>
    </div>
  );
}
