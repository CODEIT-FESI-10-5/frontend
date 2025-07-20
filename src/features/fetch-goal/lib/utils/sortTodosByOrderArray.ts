import { TodoData } from '@/entities/todo/model/types';

export default function sortTodosByOrderArray(
  todolist: Array<TodoData>,
  orderArray: Array<string>,
) {
  const orderedTodolist: Array<TodoData> = [];

  orderArray.map((todoId: string) => {
    const currTodo = todolist.find((todo: TodoData) => todo.id === todoId);
    if (!currTodo) throw Error('Not match todolist with order array');
    orderedTodolist.push(currTodo);
  });

  return orderedTodolist;
}
