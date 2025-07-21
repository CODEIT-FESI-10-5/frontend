import TodoCard from '@/entities/todo/ui/TodoCard';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { GoalAction, useGoalStore } from '@/features/fetch-goal/model/store';
import { useUpdateTodoOrderMutation } from '@/features/update-todo-order/model/hooks';

interface TodoCardDragGroupProps {
  type: 'personal' | 'shared' | 'done';
}

export default function TodoCardDragGroup({ type }: TodoCardDragGroupProps) {
  const todoGroup = useGoalStore((state) => state[type]);
  const setFns = {
    personal: (state: GoalAction) => state.setPersonal,
    shared: (state: GoalAction) => state.setShared,
    done: (state: GoalAction) => state.setDone,
  };
  const setTodoGroup = useGoalStore((state) => setFns[type](state));
  const { goalId, getCurrOrder } = useGoalStore();
  const draggable = !(type === 'done');
  const updateOrder = useUpdateTodoOrderMutation();
  const handleDrop = () => {
    console.log('drop elem: post newOrder');
    updateOrder.mutate({
      goalId,
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
