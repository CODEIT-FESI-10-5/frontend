import { TodoData } from '@/entities/todo/model/types';

export default function divideTodolistGroup(orderedTodolist: Array<TodoData>) {
  const newShared: Array<TodoData> = [];
  const newPersonal: Array<TodoData> = [];
  const newDone: Array<TodoData> = [];

  orderedTodolist.map((todo: TodoData) => {
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
