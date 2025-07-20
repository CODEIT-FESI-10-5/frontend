import { AnimatePresence, motion } from 'framer-motion';
import EditTodoForm from './EditTodoForm';
import TodoCardDragGroup from './TodoCardDragGroup';
import { useEditTodoStore } from '../model/store/editTodoStore';
import { useTodolistStore } from '../model/store/todolistStore';

export default function Todolist() {
  const { done, shared, personal } = useTodolistStore();
  const isEditMode = useEditTodoStore((state) => state.isEditMode);

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
