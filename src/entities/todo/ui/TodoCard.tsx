'use client';

import { useUpdateTodoMutation } from '@/features/todo/model/hooks/useTodolist';
import TodoCheckBox from '@/shared/ui/TodoCheckBox';
import { cn } from '@/shared/lib/utils/cn';
import dayjs from 'dayjs';
import IconDots from '@/../public/assets/icon-dots.svg';
import IconNote from '@/../public/assets/icon-note.svg';
import { useState } from 'react';
import IconButton from '@/shared/ui/IconButton';
import IconLink from '@/shared/ui/IconLink';
import FuncDropDown from './FuncDropDown';
import { TodoData } from '../model';
import PortalBackdrop from './PortalBackdrop';
import { useDeleteTodoMutation } from '@/features/delete-todo/model/hooks';

const TODOLIST_ID = '12345';

function LabelArea({
  content,
  completed,
  completedAt,
  shared,
}: {
  content: string;
  completed: boolean;
  completedAt: string;
  shared: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        {shared && (
          <div className="label-medium bg-highlight flex items-center rounded px-4">
            공통
          </div>
        )}

        <span className={cn('body-medium', { 'line-through': completed })}>
          {content}
        </span>
      </div>
      {completed && (
        <span className="label-small text-[#4D4D4D]">
          완료일시: {completedAt}
        </span>
      )}
    </div>
  );
}

export interface TodoCardProps {
  idx?: number;
  todo: TodoData;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateTodo = useUpdateTodoMutation();
  const handleCheck = () => {
    updateTodo.mutate({
      todolistId: TODOLIST_ID,
      todoId: todo.id,
      newContent: { content: todo.content, completed: !todo.completed },
    });
  };
  const deleteTodo = useDeleteTodoMutation();
  const handleDelete = () => {
    deleteTodo.mutate({ todolistId: TODOLIST_ID, todoId: todo.id });
  };

  return (
    <div
      className={cn(
        'flex min-h-70 min-w-650 items-center justify-between gap-16',
        'rounded-lg border-1 border-gray-400 bg-white px-16 py-8 shadow-2xl transition-colors',
      )}
    >
      <div className="flex items-start gap-16">
        <TodoCheckBox isChecked={todo.completed} handleClick={handleCheck} />
        <LabelArea
          content={todo.content}
          completed={todo.completed}
          completedAt={dayjs(todo.completedAt as Date).format(
            'YYYY-MM-DD HH:mm',
          )}
          shared={todo.shared}
        />
      </div>
      <div className="flex items-center gap-4">
        <IconLink href={`/todo/${todo.id}/note`} IconName={IconNote} />
        <div className="relative">
          <IconButton IconName={IconDots} onClick={() => setIsOpen(true)} />
          {isOpen && (
            <FuncDropDown
              items={[{ name: '투두 삭제', handleClick: () => handleDelete() }]}
            />
          )}
          <PortalBackdrop isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
