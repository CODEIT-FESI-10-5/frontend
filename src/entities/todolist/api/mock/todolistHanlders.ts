import { http, HttpResponse } from 'msw';
import { myTodolists } from './mocks';

export const todolistHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get('/api/todos', ({ request }) => {
    const goalId = new URL(request.url).searchParams.get('goalId') as string;
    const mockData = myTodolists;
    if (!mockData) {
      return HttpResponse.json(
        { error: 'Mock 데이터가 없습니다' },
        { status: 404 },
      );
    }

    const targetTodolist = myTodolists.find(
      (tl) => tl.goalId === parseInt(goalId),
    );
    if (!targetTodolist) {
      return HttpResponse.json(
        { error: `Mock에서 Study GoalId:${goalId}를 찾을 수 없습니다` },
        { status: 404 },
      );
    }

    const order = targetTodolist.order;
    const todolist = targetTodolist.todolist;

    const orderedTodolist = order.map((currTodoId) =>
      todolist.find((todo) => todo.todoId === currTodoId),
    );

    const orderedMockData = {
      data: {
        goalTitle: targetTodolist.goalTitle,
        myTodoList: orderedTodolist,
        userRole: targetTodolist.userRole as 'LEADER' | 'MEMBER',
      },
    };
    return HttpResponse.json(orderedMockData, { status: 200 });
  }),

  // POST: 새 투두 추가하기
  http.post('/api/todos', async ({ request }) => {
    const body = (await request.json()) as {
      goalId: number;
      content: string;
      shared: boolean;
    };
    const { goalId, content, shared } = body;

    const targetTodolist = myTodolists.find((tl) => tl.goalId === goalId);
    if (!targetTodolist) {
      return HttpResponse.json(
        { error: `Mock에서 Study GoalId:${goalId}를 찾을 수 없습니다` },
        { status: 404 },
      );
    }

    targetTodolist.count += 1;
    const newId = targetTodolist.count;
    const newTodo = {
      todoId: newId,
      content: content,
      createdAt: String(Date.now()),
      completed: false,
      completedAt: undefined,
      note: '',
      noteId: 1,
      shared: shared,
    };

    targetTodolist.order.push(newId);
    targetTodolist.todolist.push(newTodo);

    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 순서 수정
  http.patch('/api/todos/priority', async ({ request }) => {
    const body = (await request.json()) as {
      todoId: number;
      priorityOrder: number;
    };

    const targetTodolist = myTodolists[0];
    const deletedOrder = targetTodolist.order.filter(
      (todoId) => todoId !== body.todoId,
    );
    deletedOrder.splice(body.priorityOrder - 1, 0, body.todoId);
    targetTodolist.order = deletedOrder;
    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 완료/취소, 내용 수정
  http.patch('/api/todos/:todoId', async ({ request, params }) => {
    const { todoId } = params as { todoId: string };
    const body = (await request.json()) as {
      goalId: number;
      content: string;
      completed: boolean;
    };

    const targetTodolist = myTodolists.find((tl) => tl.goalId === body.goalId);
    if (!targetTodolist) {
      return HttpResponse.json(
        { error: `Mock에서 Study GoalId:${body.goalId}를 찾을 수 없습니다` },
        { status: 404 },
      );
    }
    const targetIndexInTodolist = targetTodolist.todolist.findIndex(
      (todo) => todo.todoId === parseInt(todoId),
    );

    if (targetIndexInTodolist === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    // 기존 요소를 업데이트
    targetTodolist.todolist[targetIndexInTodolist] = {
      ...targetTodolist.todolist[targetIndexInTodolist], // 기존 필드 유지
      content: body.content,
      completed: body.completed, // 변경된 필드 덮어쓰기
      completedAt: String(Date.now()),
    };

    // 순서 반영하기
    const targetIndexInOrder = targetTodolist.order.findIndex(
      (currTodoId) => currTodoId === parseInt(todoId),
    );
    targetTodolist.order.splice(targetIndexInOrder, 1);

    // 완료: 가장 앞으로 당겨오되 완료된 투두중 가장 뒤에 배치
    if ((body as { completed: boolean }).completed) {
      const lastCompletedIndex = targetTodolist.order.findIndex(
        (currTodoId) =>
          !targetTodolist.todolist.find((todo) => todo.todoId === currTodoId)
            ?.completed,
      );
      if (lastCompletedIndex < 0) {
        targetTodolist.order.push(parseInt(todoId));
      } else {
        targetTodolist.order.splice(lastCompletedIndex, 0, parseInt(todoId));
      }
    } else {
      // 취소: 가장 뒤로 밀려남
      targetTodolist.order.push(parseInt(todoId));
    }
    return HttpResponse.json({ status: 201 });
  }),

  // DELETE: 투두 삭제
  http.delete('/api/todos/:todoId', async ({ params }) => {
    const { todoId } = params as { todoId: string };
    const targetTodolist = myTodolists[0];
    const index = targetTodolist.todolist.findIndex(
      (todo) => todo.todoId === parseInt(todoId),
    );
    if (index === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    targetTodolist.todolist.splice(index, 1);
    targetTodolist.order = targetTodolist.order.filter(
      (id) => id !== parseInt(todoId),
    );
    return HttpResponse.json({ status: 204 });
  }),
];
