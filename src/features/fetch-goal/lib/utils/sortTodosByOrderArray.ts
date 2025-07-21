import { Todo } from '@/entities/todo/model/types';

export default function sortTodosByOrderArray(
  todolist: Array<Todo>,
  orderArray: Array<string>,
) {
  const orderedTodolist: Array<Todo> = [];

  orderArray.map((todoId: string) => {
    const currTodo = todolist.find((todo: Todo) => todo.id === todoId);
    if (!currTodo) throw Error('Not match todolist with order array');
    orderedTodolist.push(currTodo);
  });

  return orderedTodolist;
}
