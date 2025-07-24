'use client';

import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { useUpdateTodoOrderMutation } from '@/features/update-todo-order/model/hooks';
import Todo from '@/widgets/todo/ui/todo';
import {
  TodolistAction,
  useTodolistStore,
} from '@/entities/todolist/model/store';
import { useParams } from 'next/navigation';

interface TodoCardDragGroupProps {
  type: 'personal' | 'shared' | 'done';
}

export default function TodoCardDragGroup({ type }: TodoCardDragGroupProps) {
  const params = useParams<{ goalId: string }>();
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
  const handleDrop = () => {
    if (!params) return;
    updateOrder.mutate({
      goalId: params.goalId,
      newOrder: getCurrOrder(),
    });
  };

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
              onDragEnd={() => handleDrop()}
            >
              <Todo todo={todo} />
            </Reorder.Item>
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
