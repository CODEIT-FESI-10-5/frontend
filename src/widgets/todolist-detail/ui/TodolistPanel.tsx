'use client';

import { LayoutGroup, motion } from 'framer-motion';
import NewTodo from '@/assets/new-todo.svg';
import { useCreateTodoStore } from '../../../features/create-todo/model/store';
import Todolist from './Todolist';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import divideTodoGroup from '@/entities/todolist/lib/utils/divideTodoGroup';
import { useEffect } from 'react';
import { useTodolistStore } from '@/entities/todolist/model/store';
import toast from 'react-hot-toast';
import { useGoalId } from '@/shared/model/useGoalId';
import { AppBar, Button } from '@/shared/ui';
import findInProgressTodoId from '@/entities/todolist/lib/utils/findInProgressTodo';

function TitleArea({ title = '목표' }: { title?: string }) {
  const toggleEditMode = useCreateTodoStore((state) => state.toggleEditMode);
  const getTodoCount = useTodolistStore((state) => state.getTodoCount);
  return (
    <motion.div
      layout={'position'}
      className="mb-26 flex w-full items-center justify-between md:mb-40"
    >
      <p className="m-headline-medium md:headline-large font-bold text-white">
        {title}
      </p>
      <Button
        aria-label="open-todo-form-btn"
        label={
          <div className="flex items-center justify-center gap-4">
            <NewTodo width={20} height={20} />
            {'세부 투두 생성'}
          </div>
        }
        size={'xs'}
        theme={'highlight'}
        onClick={() => {
          if (getTodoCount() >= 10) {
            toast.error('투두는 최대 10개까지 생성 가능합니다');
            return;
          }
          toggleEditMode();
        }}
      />
    </motion.div>
  );
}

export default function TodolistPanel() {
  const goalId = useGoalId();
  const { data, isLoading, isError } = useTodolistQuery(goalId);
  const { setAllGroup, setInProgressTodoId } = useTodolistStore();

  useEffect(() => {
    if (!data) return;
    const { newDone, newShared, newPersonal } = divideTodoGroup(data.todolist);
    setAllGroup(newDone, newShared, newPersonal);
    const inProgressTodoId = findInProgressTodoId([
      ...newDone,
      ...newShared,
      ...newPersonal,
    ]);
    setInProgressTodoId(inProgressTodoId);
  }, [data, setAllGroup, setInProgressTodoId]);

  if (isLoading) return <>Todolist - 불러오는 중입니다</>;

  if (isError) return <>Todolist - 불러오는데 실패했습니다</>;

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="bg-surface-2 flex min-h-screen w-full flex-col rounded-sm xl:min-h-fit xl:max-w-740"
      >
        <AppBar pageName="투두 상세" />
        <div className="relative flex flex-col rounded-sm px-16 py-18 md:px-34 md:py-40">
          <TitleArea title={data?.title} />
          <Todolist />
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
