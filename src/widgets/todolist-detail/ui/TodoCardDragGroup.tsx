'use client';

import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { useUpdateTodoOrderMutation } from '@/features/update-todo-order/model/hooks';
import Todo from '@/widgets/todo/ui/todo';
import {
  TodolistAction,
  useTodolistStore,
} from '@/entities/todolist/model/store';
import { useRef } from 'react';

interface TodoCardDragGroupProps {
  type: 'personal' | 'shared' | 'done';
}

export default function TodoCardDragGroup({ type }: TodoCardDragGroupProps) {
  const todoGroup = useTodolistStore((state) => state[type]);
  const setFns = {
    personal: (state: TodolistAction) => state.setPersonal,
    shared: (state: TodolistAction) => state.setShared,
    done: (state: TodolistAction) => state.setDone,
  };
  const setTodoGroup = useTodolistStore((state) => setFns[type](state));
  const { getCurrOrder } = useTodolistStore();
  const draggable = !(type === 'done');
  const updateOrder = useUpdateTodoOrderMutation();
  const handleDrop = (targetId: string) => {
    updateOrder.mutate({
      todoId: targetId,
      newOrder: getCurrOrder().findIndex((todoId) => todoId === targetId) + 1,
    });
  };

  const targetTodo = useRef<string | null>(null);

  return (
    <Reorder.Group
      className="relative flex flex-col gap-16"
      axis="y"
      onReorder={setTodoGroup}
      values={todoGroup}
    >
      <AnimatePresence mode="popLayout">
        {todoGroup.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Reorder.Item
              value={todo}
              dragListener={draggable}
              onDragStart={() => {
                targetTodo.current = todo.id;
              }}
              onDragEnd={() => {
                if (!targetTodo.current) return;
                handleDrop(targetTodo.current);
                targetTodo.current = null;
              }}
            >
              <Todo todo={todo} />
            </Reorder.Item>
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
