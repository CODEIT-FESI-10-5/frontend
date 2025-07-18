import dayjs from 'dayjs';
import { Todo } from '../model';
import NoteIcon from '@/assets/note.svg';
import NewNoteIcon from '@/assets/note_new.svg';
import DotsIcon from '@/assets/dots.svg';
import CheckBlankIcon from '@/assets/check_blank.svg';
import CheckFillIcon from '@/assets/check_fill.svg';

export default function TodoCard(props: { todo: Todo }) {
  const { todo } = props;

  {
    /*TODO 디자인 미완성 완성후 다시 구현 */
  }
  //완료된 투두일때
  if (todo.completed) {
    return (
      <div className="flex h-72 w-full items-center justify-between rounded-lg bg-white px-18 text-[#313131]">
        <div className="flex items-center justify-center gap-10">
          {/*체크 박스*/}
          <CheckFillIcon width={28} height={28} />
          <div className="flex flex-col gap-4">
            {/*투두 내용*/}
            <div className="flex items-center justify-center gap-6">
              {todo.shared && <SharedText />}
              <div className="text-base font-bold line-through">
                {todo.content}
              </div>
            </div>
            {/*완료 일자*/}
            {/*TODO : 날짜는 day js 설치되면 */}
            <div className="text-sm font-medium text-[#4d4d4d]">
              완료일시:
              {todo.completedAt
                ? dayjs(todo.completedAt).format(' YYYY.MM.DD H:mm')
                : '알 수 없음'}
            </div>
          </div>
        </div>
        {/* 노트 아이콘 + 더보기 아이콘 */}
        <Note note={todo.note} />
      </div>
    );
  }

  //진행중인 투두일때
  return (
    <div className="flex h-72 w-full items-center justify-between rounded-lg bg-white px-18 text-[#313131]">
      <div className="flex items-center justify-center gap-16">
        {/*체크 박스*/}
        <CheckBlankIcon width={28} height={28} />
        <div className="flex flex-col">
          {/*투두 내용*/}
          <div className="flex items-center justify-center gap-1">
            {todo.shared && <SharedText />}
            <div className="text-base font-bold">{todo.content}</div>
          </div>
          {/*생성 일자*/}
          {/* <div className="text-sm font-medium text-[#4d4d4d]">생성일시: {new Date(todo.createdAt).toLocaleDateString()}</div> */}
        </div>
      </div>
      {/* 노트 아이콘 + 더보기 아이콘 */}
      <Note note={todo.note} />
    </div>
  );
}

//노트 여부에 따라 2가지 아이콘 + 더보기 아이콘
function Note(props: { note: string }) {
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

function SharedText() {
  return (
    <div className="label-small rounded-md border border-solid border-[#ffbe73] bg-[#ffd4a3] px-6 py-3">
      공통
    </div>
  );
}
