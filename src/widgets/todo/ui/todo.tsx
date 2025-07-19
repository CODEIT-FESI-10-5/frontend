import TodoInfo from '@/entities/todo/ui/todoInfo';
import UpdateTodoCompletion from '@/features/Update_Todo_Completion/ui/Update_Todo_Completion';
import NoteIcon from '@/assets/note.svg';
import NewNoteIcon from '@/assets/note_new.svg';
import DotsIcon from '@/assets/dots.svg';
import type { Todo } from '@/shared/model';

export default function Todo({ todo }: { todo: Todo }) {
  return (
    <div className="flex h-72 w-full items-center justify-between rounded-lg bg-white px-18 text-[#313131]">
      <div className="flex items-center justify-center gap-10">
        <UpdateTodoCompletion completed={todo.completed} />
        <TodoInfo todo={todo} />
      </div>
      <div className="flex items-center justify-center gap-4">
        {todo.note ? (
          <NoteIcon width={32} height={32} />
        ) : (
          <NewNoteIcon width={32} height={32} />
        )}
        <DotsIcon width={32} height={32} />
      </div>
    </div>
  );
}
