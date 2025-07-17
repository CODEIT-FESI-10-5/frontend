import TodoCard from '@/entities/todo/ui/TodoCard';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { TodolistAction, useTodolistStore } from '../model/store/todolistStore';

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
  const draggable = !(type === 'done');

  return (
    <Reorder.Group
      className="flex flex-col gap-16"
      axis="y"
      onReorder={setTodoGroup}
      values={todoGroup}
    >
      <AnimatePresence>
        {todoGroup.map((todo, idx) => (
          <Reorder.Item
            key={todo.id}
            value={todo}
            dragListener={draggable}
            onDragEnd={() => console.log('drop elem: post newOrder')}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TodoCard idx={idx + 1} todo={todo} />
            </motion.div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
