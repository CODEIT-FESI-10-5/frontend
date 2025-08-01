'use client';
import TodoInfo from '@/entities/todo/ui/todoInfo';
import NoteIcon from '@/assets/note.svg';
import NewNoteIcon from '@/assets/note_new.svg';
import type { Todo } from '../model';
import UpdateTodoCompletionCheckbox from '@/features/update-todo/ui/update-todo';
import DeleteTodoDropDownButton from '@/features/delete-todo/ui/DeleteTodoDropDownButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils/cn';

export default function Todo({
  todo,
  inProgress,
}: {
  todo: Todo;
  inProgress?: boolean;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  return (
    <div
      aria-label="todo-card"
      className={cn(
        'text-text-primary flex h-70 w-full items-center justify-between rounded-lg px-12 md:h-72 md:px-14',
        `${inProgress ? 'bg-secondary' : 'bg-surface-4'}`,
      )}
    >
      <div className="flex items-center justify-center gap-14">
        <UpdateTodoCompletionCheckbox
          todoId={todo.id}
          completed={todo.completed}
          content={todo.content}
        />
        <TodoInfo todo={todo} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href={`/note/edit/${todo.noteId}`}
          className="cursor-pointer transition hover:scale-110"
        >
          {todo.note ? (
            <NoteIcon className="h-26 w-26 md:h-32 md:w-32" />
          ) : (
            <NewNoteIcon className="h-26 w-26 md:h-32 md:w-32" />
          )}
        </Link>
        {!isDashboard && <DeleteTodoDropDownButton todoId={todo.id} />}
      </div>
    </div>
  );
}
