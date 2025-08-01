import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import CheckTodoFillIcon from '@/assets/check_todo_fill.svg';
import { useUpdateTodoMutation } from '../model/hooks/useUpdateTodo';
import { useGoalId } from '@/shared/model/useGoalId';

export default function UpdateTodoCompletionCheckbox({
  todoId,
  completed,
  content,
}: {
  todoId: string;
  completed: boolean;
  content: string;
}) {
  const goalId = useGoalId();
  const updateTodo = useUpdateTodoMutation(goalId);

  return (
    <button
      aria-label="update-todo-completion-checkbox"
      onClick={() => {
        updateTodo.mutate({
          todoId,
          newTodoState: { completed: !completed, content },
        });
      }}
    >
      {completed ? (
        <CheckTodoFillIcon className="h-24 w-24 md:h-[30px] md:w-[30px]" />
      ) : (
        <CheckTodoBlankIcon className="h-24 w-24 md:h-[30px] md:w-[30px]" />
      )}
    </button>
  );
}
