import TodoCard from '@/entities/todo/TodoCard';
import { useTodolistStore } from './store/todolistStore';
import { motion } from 'framer-motion';

interface TodoCardStaticGroupProps {
  type: 'done';
}

export default function TodoCardStaticGroup({
  type,
}: TodoCardStaticGroupProps) {
  const todos = useTodolistStore((state) => state[type]);

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo, idx) => (
        <motion.div key={todo.id}>
          <TodoCard key={todo.id} idx={idx + 1} todo={todo} />
        </motion.div>
      ))}
    </div>
  );
}
