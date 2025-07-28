'use client';
import TodoInfo from '@/entities/todo/ui/todoInfo';
import NoteIcon from '@/assets/note.svg';
import NewNoteIcon from '@/assets/note_new.svg';
import type { Todo } from '../model';
import UpdateTodoCompletionCheckbox from '@/features/update-todo/ui/update-todo';
import DeleteTodoDropDownButton from '@/features/delete-todo/ui/DeleteTodoDropDownButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Todo({ todo }: { todo: Todo }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  return (
    <div className="bg-surface-4 text-text-primary flex h-72 w-full items-center justify-between rounded-lg px-18">
      <div className="flex items-center justify-center gap-14">
        <UpdateTodoCompletionCheckbox
          completed={todo.completed}
          todoId={todo.id}
        />
        <TodoInfo todo={todo} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/note/edit/noteID"
          className="cursor-pointer transition hover:scale-110"
        >
          {todo.note ? (
            <NoteIcon width={32} height={32} />
          ) : (
            <NewNoteIcon width={32} height={32} />
          )}
        </Link>
        {!isDashboard && <DeleteTodoDropDownButton todoId={todo.id} />}
      </div>
    </div>
  );
}
