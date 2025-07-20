'use client';

import Button from '@/shared/ui/TodoButton';
import { cn } from '@/shared/utils/cn';
import { LayoutGroup, motion } from 'framer-motion';
import IconAdd from '@/../public/assets/icon-add.svg';
import IconBack from '@/../public/assets/icon-back.svg';
import { useEditTodoStore } from '../model/store/editTodoStore';
import Link from 'next/link';
import Todolist from './Todolist';
import { useTodolistGroupInit } from '../model/hooks/useTodolistGroupInit';

const TEMP_TODOLIST_ID = '12345';

function BackButton() {
  return (
    <motion.div layout={'position'}>
      <Link
        href={`/dashbord/${TEMP_TODOLIST_ID}`}
        className="mx-10 flex cursor-pointer items-center gap-30 text-white transition hover:scale-105"
      >
        <IconBack stroke="white" />
        <p className="title-large">전체 투두 리스트</p>
      </Link>
    </motion.div>
  );
}

function TitleArea() {
  const toggleEditMode = useEditTodoStore((state) => state.toggleEditMode);
  return (
    <motion.div
      layout={'position'}
      className="mb-40 flex w-full justify-between"
    >
      <p className="headline-large font-bold text-white">투두 리스트 제목</p>
      <Button size="lg" color="bg-primary" onClick={() => toggleEditMode()}>
        <IconAdd width={19} height={19} fill="white" />
        <p className="label-small">세부 투두 생성</p>
      </Button>
    </motion.div>
  );
}

export default function TodolistPanel() {
  useTodolistGroupInit(TEMP_TODOLIST_ID);

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="bg-surface-1 flex h-full w-full flex-col items-start gap-50 rounded-md px-30 py-40"
      >
        <BackButton />
        <motion.div
          layout
          className={cn(
            'relative flex w-740 flex-col',
            'bg-surface-3 rounded-lg p-40 text-black shadow-lg',
          )}
        >
          <TitleArea />
          <Todolist />
        </motion.div>
        <div id="portal-backdrop" />
      </motion.div>
    </LayoutGroup>
  );
}
