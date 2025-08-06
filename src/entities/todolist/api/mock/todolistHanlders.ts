import { http, HttpResponse } from 'msw';
import { myTodolists } from './mocks';
import { mockDashboard } from '@/entities/dashboard/model/mocks/mocks';

export const todolistHandlers = [
  // GET: 투두 리스트 내 투두 전체 가져오기
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, ({ request }) => {
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

    const todolist = targetTodolist.todolist;

    const orderedTodolist = todolist.sort(
      (a, b) => a.priorityOrder - b.priorityOrder,
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
    const maxPO = Math.max(
      ...targetTodolist.todolist.map((todo) => todo.priorityOrder),
    );
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
      priorityOrder: maxPO + 1,
    };

    targetTodolist.todolist.push(newTodo);

    return HttpResponse.json({ status: 201 });
  }),

  // PATCH: 투두 순서 수정
  http.patch('/api/todos/priority', async ({ request }) => {
    const body = (await request.json()) as {
      todoId: number;
      priorityOrder: number;
    };
    const { todoId, priorityOrder } = body;

    const targetTodolist = myTodolists[0];
    const targetTodoPrevOrder = targetTodolist.todolist.find(
      (todo) => todo.todoId === todoId,
    )?.priorityOrder;
    if (!targetTodoPrevOrder) {
      return HttpResponse.json(
        { error: `Mock todolist에서 todoId:${todoId}를 찾을 수 없습니다` },
        { status: 404 },
      );
    }

    // 앞 -> 뒤로 순서 옮기기
    if (targetTodoPrevOrder < priorityOrder) {
      targetTodolist.todolist.forEach((todo) => {
        if (todo.priorityOrder <= priorityOrder) {
          todo.priorityOrder -= 1;
        }
      });
    } else if (targetTodoPrevOrder > priorityOrder) {
      targetTodolist.todolist.forEach((todo) => {
        if (todo.priorityOrder >= priorityOrder) {
          todo.priorityOrder += 1;
        }
      });
    }
    targetTodolist.todolist.forEach((todo) => {
      if (todo.todoId == todoId) {
        todo.priorityOrder = priorityOrder;
      }
    });

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
    const targetTodoIndex = targetTodolist.todolist.findIndex(
      (todo) => todo.todoId === parseInt(todoId),
    );

    if (targetTodoIndex === -1) {
      return HttpResponse.json({ status: 404, message: 'Todo not found' });
    }

    // 기존 요소를 업데이트
    targetTodolist.todolist[targetTodoIndex] = {
      ...targetTodolist.todolist[targetTodoIndex], // 기존 필드 유지
      content: body.content,
      completed: body.completed, // 변경된 필드 덮어쓰기
      completedAt: String(Date.now()),
    };

    // mockDashboard 업데이트
    if (mockDashboard.data?.goal) {
      // 완료된 투두들과 진행중인 투두들 분류
      const completedTodos = targetTodolist.todolist.filter(
        (todo) => todo.completed,
      );
      const inProgressTodos = targetTodolist.todolist.filter(
        (todo) => !todo.completed,
      );

      // 최근 완료된 투두 업데이트 (가장 최근에 완료된 것)
      if (completedTodos.length > 0) {
        const mostRecentCompleted = completedTodos.reduce((latest, current) => {
          return current.completedAt &&
            (!latest.completedAt || current.completedAt > latest.completedAt)
            ? current
            : latest;
        });

        mockDashboard.data.goal.recentCompletedTodo = {
          id: String(mostRecentCompleted.todoId),
          content: mostRecentCompleted.content,
          createdAt: mostRecentCompleted.createdAt,
          completed: true,
          completedAt: mostRecentCompleted.completedAt,
          note: mostRecentCompleted.note,
          noteId: String(mostRecentCompleted.noteId),
          shared: mostRecentCompleted.shared,
        };
      } else {
        mockDashboard.data.goal.recentCompletedTodo = null;
      }

      // 진행중인 투두 업데이트 (우선순위가 가장 높은 것)
      if (inProgressTodos.length > 0) {
        const highestPriorityTodo = inProgressTodos.reduce(
          (highest, current) => {
            return current.priorityOrder < highest.priorityOrder
              ? current
              : highest;
          },
        );

        mockDashboard.data.goal.inProgressTodo = {
          id: String(highestPriorityTodo.todoId),
          content: highestPriorityTodo.content,
          createdAt: highestPriorityTodo.createdAt,
          completed: false,
          completedAt: undefined,
          note: highestPriorityTodo.note,
          noteId: String(highestPriorityTodo.noteId),
          shared: highestPriorityTodo.shared,
        };
      } else {
        mockDashboard.data.goal.inProgressTodo = null;
      }

      // 진행도 업데이트
      const totalTodos = targetTodolist.todolist.length;
      const completedCount = completedTodos.length;
      const progress =
        totalTodos > 0 ? Math.round((completedCount / totalTodos) * 100) : 0;

      mockDashboard.data.goal.progress = progress;
      mockDashboard.data.goal.completedCt = `${completedCount}/${totalTodos}`;
    }

    // 순서 반영하기
    // 완료: 가장 앞으로 당겨오되 완료된 투두중 가장 뒤에 배치
    if ((body as { completed: boolean }).completed) {
      const completedTodos = targetTodolist.todolist.filter(
        (todo) => todo.completed,
      );
      if (completedTodos.length > 0) {
        const lastOrderOfCompleted =
          Math.max(...completedTodos.map((todo) => todo.priorityOrder)) + 1;
        targetTodolist.todolist.forEach((todo) => {
          if (todo.priorityOrder >= lastOrderOfCompleted) {
            todo.priorityOrder += 1;
          }
        });
        targetTodolist.todolist[targetTodoIndex].priorityOrder =
          lastOrderOfCompleted;
      } else {
        targetTodolist.todolist.forEach((todo) => {
          todo.priorityOrder += 1;
        });
        targetTodolist.todolist[targetTodoIndex].priorityOrder =
          Math.min(...completedTodos.map((todo) => todo.priorityOrder)) - 1;
      }
    } else {
      // 취소: 가장 뒤로 밀려남
      targetTodolist.todolist[targetTodoIndex].priorityOrder =
        Math.max(...targetTodolist.todolist.map((todo) => todo.priorityOrder)) +
        1;
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
      return new HttpResponse(
        JSON.stringify({
          httpStatusCode: 404,
          errorCode: 'NOT_FOUND',
          errorMessage: '투두를 찾을 수 없습니다.',
        }),
        { status: 404 },
      );
    }

    targetTodolist.todolist.splice(index, 1);
    return HttpResponse.json({ status: 204 });
  }),
];
