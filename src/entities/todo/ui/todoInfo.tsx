import dayjs from 'dayjs';
import { Todo } from '../model';
export default function TodoInfo({ todo }: { todo: Todo }) {
  {
    /*TODO 디자인 미완성 완성후 다시 구현 */
  }
  //완료된 투두일때
  if (todo.completed) {
    return (
      <div className="flex min-w-0 flex-col gap-4">
        {/*투두 내용*/}
        <div className="m-body-large md:body-medium flex min-w-0 items-center justify-start gap-6 line-through">
          <span
            aria-label="todo-content"
            className="line-clamp-2 min-w-0 flex-1 text-balance"
          >
            {todo.shared && <>[공통] </>}
            {todo.content}
          </span>
        </div>
        {/*완료 일자*/}
        <div className="text-text-primary m-label-small md:label-medium">
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
    <div className="flex min-w-0 flex-col">
      {/*투두 내용*/}
      <div className="m-body-large md:body-medium flex min-w-0 items-center justify-center gap-6">
        <span
          aria-label="todo-content"
          className="line-clamp-2 min-w-0 flex-1 text-balance"
        >
          {todo.shared && <>[공통] </>}
          {todo.content}
        </span>
      </div>
    </div>
  );
}
