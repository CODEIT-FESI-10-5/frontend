import dayjs from 'dayjs';
import { Todo } from '../model';
export default function TodoInfo(props: { todo: Todo }) {
  const { todo } = props;

  {
    /*TODO 디자인 미완성 완성후 다시 구현 */
  }
  //완료된 투두일때
  if (todo.completed) {
    return (
      <div className="flex flex-col gap-4">
        {/*투두 내용*/}
        <div className="flex items-center justify-center gap-6">
          {todo.shared && <SharedText />}
          <div className="text-base font-bold line-through">{todo.content}</div>
        </div>
        {/*완료 일자*/}
        <div className="text-sm font-medium text-[#4d4d4d]">
          완료일시:
          {todo.completedAt
            ? dayjs(todo.completedAt).format(' YYYY.MM.DD H:mm')
            : '알 수 없음'}
        </div>
      </div>
    );
  }

  //진행중인 투두일때
  return (
    <div className="flex flex-col">
      {/*투두 내용*/}
      <div className="flex items-center justify-center gap-1">
        {todo.shared && <SharedText />}
        <div className="text-base font-bold">{todo.content}</div>
      </div>
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
