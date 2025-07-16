import { http, HttpResponse } from 'msw';
import { todolistSeperateOrder } from './todolistMockData';

export const todoHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get('/api/todolistSeperateOrder/:todolistId', () => {
    const mockData = todolistSeperateOrder;
    if (!mockData) {
      return HttpResponse.json(
        { message: 'TodolistSeperateOrder not found' },
        { status: 404 },
      );
    }
    return HttpResponse.json(mockData, { status: 200 });
  }),

  // POST: 새 투두 추가하기
  http.post('/api/todolist/:todolistId/todo', async (req) => {
    const body = await req.request.json();
    const idx = todolistSeperateOrder.todolist.length;

    const newTodo = {
      id: String(idx).repeat(8),
      content: (body as { content: string; shared: boolean }).content,
      createdAt: new Date(Date.now()),
      completed: false,
      completedAt: new Date(Date.now()),
      shared: (body as { content: string; shared: boolean }).shared,
    };
    todolistSeperateOrder.todolist.push(newTodo);
    todolistSeperateOrder.order.push(String(idx).repeat(8));
    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 완료/취소, 내용 수정
  http.patch(
    '/api/todolist/:todolistId/todo/:todoId',
    async ({ request, params }) => {
      const { todoId } = params;
      const body = await request.json();

      const index = todolistSeperateOrder.todolist.findIndex(
        (todo) => todo.id === todoId,
      );

      if (index === -1) {
        return HttpResponse.json({ status: 404, message: 'Todo not found' });
      }

      // 기존 요소를 업데이트
      todolistSeperateOrder.todolist[index] = {
        ...todolistSeperateOrder.todolist[index], // 기존 필드 유지
        ...(body as { content: string; completed: boolean }), // 변경된 필드 덮어쓰기
        completedAt: new Date(Date.now()),
      };

      return HttpResponse.json({ status: 201 });
    },
  ),

  // PATCH: 투두 순서 수정
  http.patch('/api/todolist/:todolistId/order', async ({ request }) => {
    const body = await request.json();

    todolistSeperateOrder.order = (
      body as { newOrder: Array<string> }
    ).newOrder;

    return HttpResponse.json({ status: 201 });
  }),

  // DELETE: 투두 삭제
  http.delete('/api/todolist/:todolistId/todo/:todoId', async ({ params }) => {
    const { todoId } = params;
    const index = todolistSeperateOrder.todolist.findIndex(
      (todo) => todo.id === todoId,
    );
    if (index === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    todolistSeperateOrder.todolist.splice(index, 1);
    todolistSeperateOrder.order = todolistSeperateOrder.order.filter(
      (id) => id !== todoId,
    );
    console.log(todolistSeperateOrder);

    return HttpResponse.json({ status: 204 });
  }),
];
