import { http, HttpResponse } from 'msw';
import { goal } from './goalMock';

let idCounter = goal.todolist.length;

export const todoHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get('/api/goal/:goalId', () => {
    const mockData = goal;
    if (!mockData) {
      return HttpResponse.json({ message: 'Goal not found' }, { status: 404 });
    }
    return HttpResponse.json(mockData, { status: 200 });
  }),

  // POST: 새 투두 추가하기
  http.post('/api/goal/:goalId/todo', async (req) => {
    const body = await req.request.json();
    const newId = String(idCounter++).repeat(4);

    const newTodo = {
      id: newId,
      content: (body as { content: string; shared: boolean }).content,
      createdAt: new Date(Date.now()),
      completed: false,
      completedAt: new Date(Date.now()),
      note: false,
      shared: (body as { content: string; shared: boolean }).shared,
    };
    goal.todolist.push(newTodo);
    goal.order.push(newId);
    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 완료/취소, 내용 수정
  http.patch('/api/goal/:goalId/todo/:todoId', async ({ request, params }) => {
    const { todoId } = params;
    const body = await request.json();

    const targetIndexInTodolist = goal.todolist.findIndex(
      (todo) => todo.id === todoId,
    );

    if (targetIndexInTodolist === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    // 기존 요소를 업데이트
    goal.todolist[targetIndexInTodolist] = {
      ...goal.todolist[targetIndexInTodolist], // 기존 필드 유지
      completed: (body as { completed: boolean }).completed, // 변경된 필드 덮어쓰기
      completedAt: new Date(Date.now()),
    };

    const targetIndexInOrder = goal.order.findIndex(
      (currTodoId) => currTodoId === todoId,
    );
    goal.order.splice(targetIndexInOrder, 1);
    if ((body as { completed: boolean }).completed) {
      const lastCompletedIndex = goal.order.findIndex(
        (currTodoId) =>
          !goal.todolist.find((todo) => todo.id === currTodoId)?.completed,
      );
      goal.order.splice(lastCompletedIndex, 0, todoId as string);
    } else {
      goal.order.push(todoId as string);
    }

    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 순서 수정
  http.patch('/api/goal/:goalId/order', async ({ request }) => {
    const body = await request.json();

    console.log(body);
    goal.order = (body as { newOrder: Array<string> }).newOrder;

    return HttpResponse.json({ status: 201 });
  }),

  // DELETE: 투두 삭제
  http.delete('/api/goal/:goalId/todo/:todoId', async ({ params }) => {
    const { todoId } = params;
    const index = goal.todolist.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    goal.todolist.splice(index, 1);
    goal.order = goal.order.filter((id) => id !== todoId);

    return HttpResponse.json({ status: 204 });
  }),
];
