import { Todo } from '../../model';

export default function findInProgressTodoId(orderedTodolist: Array<Todo>) {
  return orderedTodolist.find((todo) => !todo.completed)?.id;
}
