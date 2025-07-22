import { AnimatePresence, motion } from 'framer-motion';
import EditTodoForm from '../../../features/create-todo/ui/CreateTodoForm';
import { useCreateTodoStore } from '../../../features/create-todo/model/store';
import TodoCardDragGroup from './TodoCardDragGroup';
import { useTodolistStore } from '@/entities/todolist/model/store';

export default function Todolist() {
  const { done, shared, personal } = useTodolistStore();
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
