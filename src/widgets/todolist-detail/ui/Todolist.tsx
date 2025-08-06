import { AnimatePresence, motion } from 'framer-motion';
import EditTodoForm from '../../../features/create-todo/ui/CreateTodoForm';
import { useCreateTodoStore } from '../../../features/create-todo/model/store';
import TodoCardDragGroup from './TodoCardDragGroup';
import { useTodolistStore } from '@/entities/todolist/model/store';

export default function Todolist() {
  const { done, shared, personal, getTodoCount } = useTodolistStore();
  const isCreateMode = useCreateTodoStore((state) => state.isCreateMode);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isCreateMode && (
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

        <AnimatePresence mode="popLayout">
          {getTodoCount() <= 0 && (
            <motion.div
              layout={'position'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface-4 text-text-primary flex h-72 w-full items-center justify-center rounded-lg px-18"
            >
              <span className="text-text-tertiary m-body-large md:body-medium">
                세부 투두를 추가해 목표를 구체화해보세요.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
