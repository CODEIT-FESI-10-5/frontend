'use client';

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/features/todo/model/hooks/useTodolist';
import TodoCheckBox from '@/shared/ui/TodoCheckBox';
import { cn } from '@/shared/utils/cn';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import IconDots from '@/../public/assets/icon-dots.svg';
import IconNote from '@/../public/assets/icon-note.svg';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@/shared/ui/IconButton';
import IconLink from '@/shared/ui/IconLink';
import FuncDropDown from './FuncDropDown';

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
          className="bg-surface-2 fixed inset-0"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('portal-backdrop')!,
  );
}

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
          <BackdropPortal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
