import TodoInfo from '@/entities/todo/ui/todoInfo';
import { Todo } from '../model';
import CompleteTodoCheckIcon from '@/features/Complete_Todo_Check_Icon/ui/complete_Todo_Check_Icon';
import NavigateNoteIcon from '@/features/Navigate_Note/ui/navigate_note';

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="flex h-72 w-full items-center justify-between rounded-lg bg-white px-18 text-[#313131]">
      <div className="flex items-center justify-center gap-10">
        <CompleteTodoCheckIcon completed={todo.completed} />
        <TodoInfo todo={todo} />
      </div>
      <NavigateNoteIcon note={todo.note} />
    </div>
  );
}
