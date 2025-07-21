import { http, HttpResponse } from 'msw';
import { mockGoal } from './mockGoal';

let idCounter = mockGoal.todolist.length;

export const todoHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get('/api/goal/:goalId', () => {
    const mockData = mockGoal;
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
    mockGoal.todolist.push(newTodo);
    mockGoal.order.push(newId);
    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 완료/취소, 내용 수정
  http.patch('/api/goal/:goalId/todo/:todoId', async ({ request, params }) => {
    const { todoId } = params;
    const body = await request.json();

    const targetIndexInTodolist = mockGoal.todolist.findIndex(
      (todo) => todo.id === todoId,
    );

    if (targetIndexInTodolist === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    // 기존 요소를 업데이트
    mockGoal.todolist[targetIndexInTodolist] = {
      ...mockGoal.todolist[targetIndexInTodolist], // 기존 필드 유지
      completed: (body as { completed: boolean }).completed, // 변경된 필드 덮어쓰기
      completedAt: new Date(Date.now()),
    };

    const targetIndexInOrder = mockGoal.order.findIndex(
      (currTodoId) => currTodoId === todoId,
    );
    mockGoal.order.splice(targetIndexInOrder, 1);
    if ((body as { completed: boolean }).completed) {
      const lastCompletedIndex = mockGoal.order.findIndex(
        (currTodoId) =>
          !mockGoal.todolist.find((todo) => todo.id === currTodoId)?.completed,
      );
      mockGoal.order.splice(lastCompletedIndex, 0, todoId as string);
    } else {
      mockGoal.order.push(todoId as string);
    }

    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 순서 수정
  http.patch('/api/goal/:goalId/order', async ({ request }) => {
    const body = await request.json();

    console.log(body);
    mockGoal.order = (body as { newOrder: Array<string> }).newOrder;

    return HttpResponse.json({ status: 201 });
  }),

  // DELETE: 투두 삭제
  http.delete('/api/goal/:goalId/todo/:todoId', async ({ params }) => {
    const { todoId } = params;
    const index = mockGoal.todolist.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    mockGoal.todolist.splice(index, 1);
    mockGoal.order = mockGoal.order.filter((id) => id !== todoId);

    return HttpResponse.json({ status: 204 });
  }),
];
