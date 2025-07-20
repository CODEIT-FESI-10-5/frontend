import { AnimatePresence, motion } from 'framer-motion';
import EditTodoForm from '../../create-todo/ui/CreateTodoForm';
import TodoCardDragGroup from './TodoCardDragGroup';
import { useCreateTodoStore } from '../../create-todo/model/store';
import { useGoalStore } from '@/features/fetch-goal/model/store';

export default function Todolist() {
  const { done, shared, personal } = useGoalStore();
  const isEditMode = useCreateTodoStore((state) => state.isCreateMode);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isEditMode && (
          <motion.div
            layout={'position'}
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
    </>
  );
}
