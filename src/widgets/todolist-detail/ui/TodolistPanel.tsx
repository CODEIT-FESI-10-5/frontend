'use client';

import { LayoutGroup, motion } from 'framer-motion';
import NewTodo from '@/assets/new-todo.svg';
import { useCreateTodoStore } from '../../../features/create-todo/model/store';
import Todolist from './Todolist';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import divideTodoGroup from '@/entities/todolist/lib/utils/divideTodoGroup';
import { useEffect } from 'react';
import { useTodolistStore } from '@/entities/todolist/model/store';
import ConfirmButton from '@/features/create-todo/ui/ConfirmButton';
import toast from 'react-hot-toast';
import { useGoalId } from '@/shared/model/useGoalId';
import { AppBar } from '@/shared/ui';

function TitleArea({ title = '목표' }: { title?: string }) {
  const toggleEditMode = useCreateTodoStore((state) => state.toggleEditMode);
  const getTodoCount = useTodolistStore((state) => state.getTodoCount);
  return (
    <motion.div
      layout={'position'}
      className="mb-40 flex w-full items-center justify-between"
    >
      <p className="m-headline-medium md:headline-large font-bold text-white">
        {title}
      </p>
      <ConfirmButton
        aria-label="open-todo-form-btn"
        size="lg"
        color="bg-highlight"
        onClick={() => {
          if (getTodoCount() >= 10) {
            toast.error('투두는 최대 10개까지 생성 가능합니다');
            return;
          }
          toggleEditMode();
        }}
      >
        <NewTodo width={24} height={24} />
        <p className="label-small">세부 투두 생성</p>
      </ConfirmButton>
    </motion.div>
  );
}

export default function TodolistPanel() {
  const goalId = useGoalId();
  const { data, isLoading, isError } = useTodolistQuery(goalId);
  const { setAllGroup } = useTodolistStore();

  useEffect(() => {
    if (!data) return;
    const { newDone, newShared, newPersonal } = divideTodoGroup(data.todolist);
    setAllGroup(newDone, newShared, newPersonal);
  }, [data, setAllGroup]);

  if (isLoading) return <>Todolist - 불러오는 중입니다</>;

  if (isError) return <>Todolist - 불러오는데 실패했습니다</>;

  return (
    <div className="bg-surface-2 flex min-h-screen w-full flex-col rounded-sm xl:min-h-fit xl:max-w-740">
      <LayoutGroup>
        <AppBar pageName="투두 상세" />
        <motion.div
          layout
          className="relative flex flex-col rounded-sm px-34 py-40"
        >
          <TitleArea title={data?.title} />
          <Todolist />
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
