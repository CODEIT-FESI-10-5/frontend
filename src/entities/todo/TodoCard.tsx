'use client';

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/features/todo/hooks/useTodolist';
import TodoCheckBox from '@/shared/ui/TodoCheckBox';
import { cn } from '@/shared/utils/cn';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import IconDots from '@/../public/assets/icon-dots.svg';
import IconNote from '@/../public/assets/icon-note.svg';
import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const TODOLIST_ID = '12345';

interface DropdownPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function BackdropPortal({ isOpen, onClose, children }: DropdownPortalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          className="bg-surface-200 fixed inset-0"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('portal-backdrop')!,
  );
}

export interface TodoData {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | null;
  order: number;
  shared: boolean;
}

export interface TodoCardProps {
  idx?: number;
  todo: TodoData;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateTodo = useUpdateTodoMutation();
  const handleClick = () => {
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
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
    >
      <div
        className={cn(
          'flex min-h-[70px] min-w-[650px] items-center justify-between gap-4',
          'rounded-lg border-1 border-gray-400 bg-white px-4 py-2 shadow-2xl transition-colors',
          todo.completed ? 'text-gray-300' : 'text-black',
        )}
      >
        <div className="flex items-center gap-4">
          <TodoCheckBox isChecked={todo.completed} handleClick={handleClick} />
          <div className="gap flex flex-col">
            <div className="flex gap-1">
              {todo.shared && (
                <div className="flex items-center rounded bg-red-200 px-1 text-sm">
                  공통
                </div>
              )}

              <span className="text-md font-bold">{todo.content}</span>
            </div>
            {todo.completed && (
              <span className="text-sm">
                완료일시:{' '}
                {dayjs(todo.completedAt as Date).format('YYYY-MM-DD HH:mm')}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/todo/${todo.id}/note`}
            className="flex h-8 w-8 cursor-pointer items-center justify-center transition hover:scale-110"
          >
            <IconNote />
          </Link>
          <div className="relative">
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center transition hover:scale-110"
              onClick={() => setIsOpen(true)}
            >
              <IconDots />
            </button>
            {isOpen && (
              <button
                className="absolute top-1/2 right-1/2 z-10 cursor-pointer items-center justify-center rounded-lg bg-white px-8 py-3 whitespace-nowrap shadow-xl/35 transition hover:bg-gray-200"
                onClick={() => handleDelete()}
              >
                투두 삭제
              </button>
            )}
            <BackdropPortal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
