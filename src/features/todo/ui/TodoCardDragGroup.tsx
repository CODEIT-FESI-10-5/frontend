import TodoCard from '@/entities/todo/ui/TodoCard';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { TodolistAction, useTodolistStore } from '../model/store/todolistStore';
import { useUpdateOrderMutation } from '../model/hooks/useTodolist';

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
  const { todolistId, getCurrOrder } = useTodolistStore();
  const draggable = !(type === 'done');
  const updateOrder = useUpdateOrderMutation();
  const handleDrop = () => {
    console.log('drop elem: post newOrder');
    updateOrder.mutate({
      todolistId,
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
        {todoGroup.map((todo, idx) => (
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
              <TodoCard idx={idx + 1} todo={todo} />
            </Reorder.Item>
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
