import dayjs from 'dayjs';
import { Todo } from '../model';
export default function TodoInfo({ todo }: { todo: Todo }) {
  {
    /*TODO 디자인 미완성 완성후 다시 구현 */
  }
  //완료된 투두일때
  if (todo.completed) {
    return (
      <div className="flex flex-col gap-4">
        {/*투두 내용*/}
        <div className="body-medium flex items-center justify-start gap-6 line-through">
          {todo.shared && <SharedText />}
          <div>{todo.content}</div>
        </div>
        {/*완료 일자*/}
        <div className="text-text-primary label-medium">
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
      <div className="body-medium flex items-center justify-center gap-6">
        {todo.shared && <SharedText />}
        <div>{todo.content}</div>
      </div>
    </div>
  );
}

function SharedText() {
  return <span>[공통]</span>;
}
