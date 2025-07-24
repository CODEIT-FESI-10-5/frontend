'use client';

import { cn } from '@/shared/lib/utils/cn';
import { LayoutGroup, motion } from 'framer-motion';
import NewTodo from '@/../public/assets/new-todo.svg';
import IconBack from '@/../public/assets/icon-back.svg';
import { useCreateTodoStore } from '../../../features/create-todo/model/store';
import Link from 'next/link';
import Todolist from './Todolist';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import divideTodoGroup from '@/entities/todolist/lib/utils/divideTodoGroup';
import { useEffect } from 'react';
import { useTodolistStore } from '@/entities/todolist/model/store';
import { useParams } from 'next/navigation';
import ConfirmButton from '@/features/create-todo/ui/ConfirmButton';

function BackButton({ studyId, goalId }: { studyId: string; goalId: string }) {
  return (
    <motion.div layout={'position'}>
      <Link
        href={`/dashbord/${studyId}/goal/${goalId}`}
        className="mx-10 flex cursor-pointer items-center gap-30 text-white transition hover:scale-105"
      >
        <IconBack stroke="white" />
        <p className="title-large">전체 투두 리스트</p>
      </Link>
    </motion.div>
  );
}

function TitleArea({ title = '목표' }: { title?: string }) {
  const toggleEditMode = useCreateTodoStore((state) => state.toggleEditMode);
  return (
    <motion.div
      layout={'position'}
      className="mb-40 flex w-full justify-between"
    >
      <p className="headline-large font-bold text-white">{title}</p>
      <ConfirmButton
        size="lg"
        color="bg-highlight"
        onClick={() => toggleEditMode()}
      >
        <NewTodo width={24} height={24} />
        <p className="label-small">세부 투두 생성</p>
      </ConfirmButton>
    </motion.div>
  );
}

export default function TodolistPanel() {
  const params = useParams<{ studyId: string; goalId: string }>();
  const { data, isLoading } = useTodolistQuery(params?.goalId);
  const { setAllGroup } = useTodolistStore();

  useEffect(() => {
    if (!data) return;
    const { newDone, newShared, newPersonal } = divideTodoGroup(data.todolist);

    setAllGroup(newDone, newShared, newPersonal);
  }, [data, setAllGroup]);

  if (!params || isLoading) return <>Loading</>;

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="bg-surface-1 flex h-full w-full flex-col items-start gap-50 rounded-md px-30 py-40"
      >
        <BackButton studyId={params.studyId} goalId={params.goalId} />
        <motion.div
          layout
          className={cn(
            'relative flex w-740 flex-col',
            'bg-surface-3 rounded-lg p-40 text-black shadow-lg',
          )}
        >
          <TitleArea title={data?.title} />
          <Todolist />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
