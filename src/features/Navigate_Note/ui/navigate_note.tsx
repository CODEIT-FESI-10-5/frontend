import NoteIcon from '@/assets/note.svg';
import NewNoteIcon from '@/assets/note_new.svg';
import DotsIcon from '@/assets/dots.svg';

//노트 여부에 따라 2가지 아이콘 + 더보기 아이콘
export default function NavigateNoteIcon(props: { note: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {props.note ? (
        <NoteIcon width={32} height={32} />
      ) : (
        <NewNoteIcon width={32} height={32} />
      )}
      <DotsIcon width={32} height={32} />
    </div>
  );
}
