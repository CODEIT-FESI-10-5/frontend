import { clientFetch } from '@/shared/api';

// export const fetchTodolist = async (
//   todolistId: string,
//   server: boolean = false,
// ) => {
//   let url = `/api/todolist/${todolistId}`;
//   if (server) url = `${process.env.NEXT_PUBLIC_MOCKSERVER_URL}` + url;
//   else url = `${process.env.NEXT_PUBLIC_BASE_URL}` + url;
//   console.log('fetch');

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error('Failed to fetch todolist');
//   }

//   return await response.json();
// };

export const fetchTodolist = async (todolistId: string) => {
  const endpoint = `/api/todolist/${todolistId}`;
  const parsedResponse = await clientFetch.get(endpoint);

  return parsedResponse;
};

export interface newTodoData {
  content: string;
  shared: boolean;
}
export const createTodo = async (todolistId: string, newTodo: newTodoData) => {
  const endpoint = `/api/todolist/${todolistId}/todo`;
  const parsedResponse = await clientFetch.post(endpoint, newTodo);

  return parsedResponse;
};

export interface newContent {
  content: string;
  completed: boolean;
}

export const updateTodo = async (
  todolistId: string,
  todoId: string,
  newContent: newContent,
) => {
  const endpoint = `/api/todolist/${todolistId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.patch(endpoint, newContent);

  return parsedResponse;
};

export const updateTodoOrder = async (
  todolistId: string,
  newOrder: Array<string>,
) => {
  const endpoint = `/api/todolist/${todolistId}/order`;
  const parsedResponse = await clientFetch.patch(endpoint, {
    newOrder: newOrder,
  });

  return parsedResponse;
};

export const deleteTodo = async (todolistId: string, todoId: string) => {
  const endpoint = `/api/todolist/${todolistId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.delete(endpoint);

  return parsedResponse;
};
