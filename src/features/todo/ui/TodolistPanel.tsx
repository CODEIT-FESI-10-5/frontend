'use client';

import Button from '@/shared/ui/TodoButton';
import { cn } from '@/shared/utils/cn';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTodolistStore } from '../model/store/todolistStore';
import { TodoData } from '@/entities/todo/ui/TodoCard';
import { useTodolistQuery } from '../model/hooks/useTodolist';
import TodoCardDragGroup from './TodoCardDragGroup';
import IconAdd from '@/../public/assets/icon-add.svg';
import IconBack from '@/../public/assets/icon-back.svg';
import EditTodoForm from '@/features/todo/ui/EditTodoForm';
import { useEditTodoStore } from '../model/store/editTodoStore';
import Link from 'next/link';

const TEMP_TODOLIST_ID = '12345';

export default function TodolistPanel() {
  const { data } = useTodolistQuery(TEMP_TODOLIST_ID);
  const setTodolist = useTodolistStore((state) => state.setTodolist);
  const { personal, setPersonal } = useTodolistStore();
  const { shared, setShared } = useTodolistStore();
  const { done, setDone } = useTodolistStore();
  const setOrder = useTodolistStore((state) => state.setOrder);
  const { isEditMode, toggleEditMode } = useEditTodoStore();

  useEffect(() => {
    console.log('todoData fetching:', data);
    if (data) {
      const shared: TodoData[] = [];
      const personal: TodoData[] = [];
      const done: TodoData[] = [];
      setOrder(data.order);

      data.order?.forEach((currId: string) => {
        const currTodo = data.todolist.find(
          (todo: TodoData) => todo.id === currId,
        );
        if (currTodo.completed) done.push(currTodo);
        else if (currTodo.shared) shared.push(currTodo);
        else personal.push(currTodo);
      });
      setTodolist(data.todolist);
      setDone(done);
      setShared(shared);
      setPersonal(personal);
    }
  }, [data]);

  return (
    <motion.div
      layout
      className="bg-surface-1 flex h-full w-full flex-col items-start gap-50 rounded-md px-30 py-40"
    >
      <Link
        href={`/dashbord/${TEMP_TODOLIST_ID}`}
        className="mx-10 flex cursor-pointer items-center gap-30 text-white transition hover:scale-105"
      >
        <IconBack stroke="white" />
        <p className="title-large">전체 투두 리스트</p>
      </Link>
      <motion.div
        layout
        className={cn(
          'flex w-740 flex-col items-start',
          'bg-surface-3 rounded-lg p-40 text-black shadow-lg',
        )}
      >
        <div className="mb-40 flex w-full justify-between">
          <p className="headline-large font-bold text-white">
            투두 리스트 제목
          </p>
          <Button size="lg" color="bg-primary" onClick={() => toggleEditMode()}>
            <IconAdd width={19} height={19} fill="white" />
            <p className="label-small">세부 투두 생성</p>
          </Button>
        </div>
        <LayoutGroup>
          <AnimatePresence>
            {isEditMode && (
              <motion.div
                key="edit-frame"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EditTodoForm />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-16">
            {done.length > 0 && <TodoCardDragGroup type={'done'} />}
            {shared.length > 0 && <TodoCardDragGroup type={'shared'} />}
            {personal.length > 0 && <TodoCardDragGroup type={'personal'} />}
          </div>
        </LayoutGroup>
        <div id="portal-backdrop"></div>
      </motion.div>
    </motion.div>
  );
}
