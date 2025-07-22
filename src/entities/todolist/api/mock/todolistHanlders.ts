import { http, HttpResponse } from 'msw';
import { myTodolist } from './mocks';

let idCounter = myTodolist.todolist.length;

export const todolistHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get('/api/goal/:goalId/todolist', () => {
    const mockData = myTodolist;
    if (!mockData) {
      return HttpResponse.json({ message: 'Goal not found' }, { status: 404 });
    }

    const order = myTodolist.order;
    const todolist = myTodolist.todolist;

    const orderedTodolist = order.map((currTodoId) =>
      todolist.find((todo) => todo.id === currTodoId),
    );

    const orderedMockData = {
      goalId: myTodolist.goalId,
      title: myTodolist.title,
      todolist: orderedTodolist,
    };

    return HttpResponse.json(orderedMockData, { status: 200 });
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
    myTodolist.todolist.push(newTodo);
    myTodolist.order.push(newId);
    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 완료/취소, 내용 수정
  http.patch('/api/goal/:goalId/todo/:todoId', async ({ request, params }) => {
    const { todoId } = params;
    const body = await request.json();

    const targetIndexInTodolist = myTodolist.todolist.findIndex(
      (todo) => todo.id === todoId,
    );

    if (targetIndexInTodolist === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    // 기존 요소를 업데이트
    myTodolist.todolist[targetIndexInTodolist] = {
      ...myTodolist.todolist[targetIndexInTodolist], // 기존 필드 유지
      completed: (body as { completed: boolean }).completed, // 변경된 필드 덮어쓰기
      completedAt: new Date(Date.now()),
    };

    // 순서 반영하기
    // 완료: 가장 앞으로 당겨오되 완료된 투두중 가장 뒤에 배치
    // 취소: 가장 뒤로 밀려남
    const targetIndexInOrder = myTodolist.order.findIndex(
      (currTodoId) => currTodoId === todoId,
    );
    myTodolist.order.splice(targetIndexInOrder, 1);
    if ((body as { completed: boolean }).completed) {
      const lastCompletedIndex = myTodolist.order.findIndex(
        (currTodoId) =>
          !myTodolist.todolist.find((todo) => todo.id === currTodoId)
            ?.completed,
      );
      myTodolist.order.splice(lastCompletedIndex, 0, todoId as string);
    } else {
      myTodolist.order.push(todoId as string);
    }

    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 순서 수정
  http.patch('/api/goal/:goalId/todolist/order', async ({ request }) => {
    const body = await request.json();

    console.log(body);
    myTodolist.order = (body as { newOrder: Array<string> }).newOrder;

    return HttpResponse.json({ status: 201 });
  }),

  // DELETE: 투두 삭제
  http.delete('/api/goal/:goalId/todo/:todoId', async ({ params }) => {
    const { todoId } = params;
    const index = myTodolist.todolist.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    myTodolist.todolist.splice(index, 1);
    myTodolist.order = myTodolist.order.filter((id) => id !== todoId);

    return HttpResponse.json({ status: 204 });
  }),
];
