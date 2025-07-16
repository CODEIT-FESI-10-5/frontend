export const fetchTodolistSeperateOrder = async (
  todolistId: string,
  server: boolean = false,
) => {
  let url = '';
  if (server)
    url = `${process.env.NEXT_PUBLIC_MOCKSERVER_URL}/api/todolistSeperateOrder/${todolistId}`;
  else
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/todolistSeperateOrder/${todolistId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch todolist');
  }

  return await response.json();
};

export interface newTodoData {
  content: string;
  shared: boolean;
}

export const createTodo = async (todolistId: string, newTodo: newTodoData) => {
  const url = `/api/todolist/${todolistId}/todo`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to create new todo.');
  }

  return await response.json();
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
  const url = `/api/todolist/${todolistId}/todo/${todoId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContent),
  });
  if (!response.ok) {
    throw new Error('Failed to update the todo.');
  }

  return await response.json();
};

export const updateTodoOrder = async (
  todolistId: string,
  newOrder: Array<string>,
) => {
  const url = `/api/todolist/${todolistId}/order/`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOrder),
  });
  if (!response.ok) {
    throw new Error('Failed to update the todolist order.');
  }

  return await response.json();
};

export const deleteTodo = async (todolistId: string, todoId: string) => {
  const url = `/api/todolist/${todolistId}/todo/${todoId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete the todo.');
  }

  return await response.json();
};
