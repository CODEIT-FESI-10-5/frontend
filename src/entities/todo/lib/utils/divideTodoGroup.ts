import { Todo } from '@/entities/todo/model/types';

export default function divideTodoGroup(orderedTodolist: Array<Todo>) {
  const newShared: Array<Todo> = [];
  const newPersonal: Array<Todo> = [];
  const newDone: Array<Todo> = [];

  orderedTodolist.map((todo: Todo) => {
    if (todo.completed) newDone.push(todo);
    else if (todo.shared) newShared.push(todo);
    else newPersonal.push(todo);
  });

  return {
    newShared,
    newPersonal,
    newDone,
  };
}
