import { clientFetch } from "../../../shared/api";

// todo 완료 체크 API
export const updateTodoCompletion = async (todoListId: string, todoId: string, completed: boolean) => {
  return clientFetch.patch(`/todo/completion`, { completed }, {
    params: { todoListId, todoId }
  });
};
