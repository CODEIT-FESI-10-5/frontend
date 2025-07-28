import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import CheckTodoFillIcon from '@/assets/check_todo_fill.svg';
import { useUpdateTodoMutation } from '../model/hooks/useUpdateTodo';
import { useGoalId } from '@/shared/model/useGoalId';

export default function UpdateTodoCompletionCheckbox({
  completed,
  todoId,
}: {
  completed: boolean;
  todoId: string;
}) {
  const goalId = useGoalId();
  const updateTodo = useUpdateTodoMutation(goalId);

  return (
    <button
      onClick={() => {
        updateTodo.mutate({ todoId, newTodoState: { completed: !completed } });
      }}
    >
      {completed ? (
        <CheckTodoFillIcon width={30} height={30} />
      ) : (
        <CheckTodoBlankIcon width={30} height={30} />
      )}
    </button>
  );
}
