import TodoCard from '@/entities/todo/TodoCard';
import { Reorder } from 'framer-motion';
import { useTodolistStore } from './store/todolistStore';

interface TodoCardDragGroupProps {
  type: 'personal' | 'shared';
}

export default function TodoCardDragGroup({ type }: TodoCardDragGroupProps) {
  const todoGroup = useTodolistStore((state) => state[type]);
  const setTodoGroup = useTodolistStore(
    (state) => state[type === 'personal' ? 'setPersonal' : 'setShared'],
  );

  return (
    <Reorder.Group
      className="flex flex-col gap-4"
      axis="y"
      onReorder={setTodoGroup}
      values={todoGroup}
    >
      {todoGroup.map((todo, idx) => (
        <Reorder.Item key={todo.id} value={todo}>
          <TodoCard idx={idx + 1} todo={todo} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
