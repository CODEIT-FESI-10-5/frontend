import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import CheckTodoFillIcon from '@/assets/check_todo_fill.svg';

export default function UpdateTodoCompletion({
  completed,
}: {
  completed: boolean;
}) {
  return completed ? (
    <CheckTodoFillIcon width={30} height={30} />
  ) : (
    <CheckTodoBlankIcon width={30} height={30} />
  );
}
