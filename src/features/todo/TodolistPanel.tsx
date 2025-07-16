'use client';

import EditTodoCard from '@/entities/todo/EditTodoCard';
import Button from '@/shared/ui/Button';
import { cn } from '@/shared/utils/cn';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTodolistStore } from './store/todolistStore';
import { TodoData } from '@/entities/todo/TodoCard';
import { useTodolistSeperateOrderQuery } from './hooks/useTodolist';
import TodoCardGroup from './TodoCardDragGroup';
import TodoCardStaticGroup from './TodoCardStaticGroup';
import IconAdd from '@/../public/assets/icon-add.svg';

const TEMP_ID = '12345';

export default function TodolistPanel() {
  const { data } = useTodolistSeperateOrderQuery(TEMP_ID);
  const setTodolist = useTodolistStore((state) => state.setTodolist);
  const setPersonal = useTodolistStore((state) => state.setPersonal);
  const setShared = useTodolistStore((state) => state.setShared);
  const setDone = useTodolistStore((state) => state.setDone);
  const setOrder = useTodolistStore((state) => state.setOrder);
  const shared = useTodolistStore((state) => state.shared);
  const personal = useTodolistStore((state) => state.personal);
  const done = useTodolistStore((state) => state.done);
  // const editMode = useEditTodoStore((state) => state.editMode);
  // const toggleEditMode = useEditTodoStore((state) => state.toggleEditMode);
  const [editMode, toggleEditMode] = useState<boolean>(false);

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
    <div
      className={cn(
        'flex flex-col items-start',
        'bg-surface-400 rounded-xl p-8 text-black shadow-lg transition duration-100',
      )}
    >
      <div className="mb-6 flex w-full justify-between">
        <div className="text-3xl font-bold text-white">투두 리스트 제목</div>
        <Button
          size="md"
          color="bg-frame-primary"
          onClick={() => toggleEditMode(!editMode)}
        >
          <IconAdd fill="white" />
          세부 투두 생성
        </Button>
      </div>
      <AnimatePresence>
        <LayoutGroup>
          {editMode && (
            <motion.div
              key="edit-frame"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
            >
              <EditTodoCard />
            </motion.div>
          )}

          <motion.div className="flex flex-col gap-4">
            {done.length > 0 && <TodoCardStaticGroup type={'done'} />}
            {shared.length > 0 && <TodoCardGroup type={'shared'} />}
            {personal.length > 0 && <TodoCardGroup type={'personal'} />}
          </motion.div>
        </LayoutGroup>
      </AnimatePresence>
      <div id="portal-backdrop"></div>
    </div>
  );
}
