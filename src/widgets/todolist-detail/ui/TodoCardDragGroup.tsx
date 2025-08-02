'use client';

import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { useUpdateTodoOrderMutation } from '@/features/update-todo-order/model/hooks';
import TodoCard from '@/widgets/todo/ui/TodoCard';
import {
  TodolistAction,
  useTodolistStore,
} from '@/entities/todolist/model/store';
import { useRef } from 'react';
import { useGoalId } from '@/shared/model/useGoalId';
import { Todo } from '@/entities/todolist/model';

interface TodoCardDragGroupProps {
  type: 'personal' | 'shared' | 'done';
}

export default function TodoCardDragGroup({ type }: TodoCardDragGroupProps) {
  const goalId = useGoalId();
  const todoGroup = useTodolistStore((state) => state[type]);
  const setFns = {
    personal: (state: TodolistAction) => state.setPersonal,
    shared: (state: TodolistAction) => state.setShared,
    done: (state: TodolistAction) => state.setDone,
  };
  const setTodoGroup = useTodolistStore((state) => setFns[type](state));
  const draggable = !(type === 'done');
  const updateOrder = useUpdateTodoOrderMutation(goalId);
  const handleDrop = (targetId: string) => {
    const dropIndex = todoGroup.findIndex(
      (todo) => todo.id === targetTodo.current,
    );
    const targetPriorityOrder = prevSnapshot.current[dropIndex].priorityOrder;
    updateOrder.mutate({
      todoId: targetId,
      newOrder: targetPriorityOrder,
    });
  };

  const targetTodo = useRef<string | null>(null);
  const prevSnapshot = useRef<Todo[]>([]);

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
                prevSnapshot.current = [...todoGroup];
              }}
              onDragEnd={() => {
                if (!targetTodo.current) return;
                handleDrop(targetTodo.current);
                targetTodo.current = null;
                prevSnapshot.current = [];
              }}
            >
              <TodoCard todo={todo} />
            </Reorder.Item>
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
