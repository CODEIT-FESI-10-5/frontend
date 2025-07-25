import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import CheckTodoFillIcon from '@/assets/check_todo_fill.svg';
import { useUpdateTodoMutation } from '../model/hooks/useUpdateTodo';

export default function UpdateTodoCompletionCheckbox({
  completed,
  goalId,
  todoId,
}: {
  completed: boolean;
  goalId: string;
  todoId: string;
}) {
  // return completed ? (
  //   <CheckTodoFillIcon width={30} height={30} />
  // ) : (
  //   <CheckTodoBlankIcon width={30} height={30} />
  // );
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
