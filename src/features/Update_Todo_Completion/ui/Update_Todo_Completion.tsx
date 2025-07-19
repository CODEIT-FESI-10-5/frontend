import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import CheckTodoFillIcon from '@/assets/check_todo_fill.svg';

export default function UpdateTodoCompletion({
  completed,
}: {
  completed: boolean;
}) {
  return completed ? (
    <CheckTodoFillIcon width={28} height={28} />
  ) : (
    <CheckTodoBlankIcon width={28} height={28} />
  );
}
