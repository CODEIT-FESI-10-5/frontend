import { http, HttpResponse } from 'msw';
import { mockGoal, mockGoalNone } from '@/entities/goal/model/mocks';

export const goalHandlers = [
  // Goal 조회 API
  http.get('/goal', () => HttpResponse.json(mockGoal)),
  // http.get('/goal', () => HttpResponse.json(mockGoalNone)),

  // Goal 제목 업데이트 API
  http.patch('/goal/title', async ({ request }) => {
    const url = new URL(request.url);
    const groupId = url.searchParams.get('groupId');
    const goalId = url.searchParams.get('goalId');

    if (!groupId || !goalId) {
      return HttpResponse.json(
        { error: 'groupId and goalId are required' },
        { status: 400 },
      );
    }

    // 실제 mockGoal 데이터 업데이트
    try {
      const body = (await request.json()) as { title: string };
      if (!body.title || body.title.trim() === '') {
        return HttpResponse.json(
          { error: 'Title is required' },
          { status: 400 },
        );
      }
      mockGoal.studyGoal.title = body.title;
      return HttpResponse.json({
        message: 'Title updated successfully',
        studyGoal: {
          id: mockGoal.studyGoal.id,
          title: mockGoal.studyGoal.title,
        },
      });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }),

  // todo 완료 체크 API
  http.patch('/todo/completion', async ({ request }) => {
    const url = new URL(request.url);
    const todoListId = url.searchParams.get('todoListId');
    const todoId = url.searchParams.get('todoId');

    if (!todoListId || !todoId) {
      return HttpResponse.json(
        { error: 'todoListId and todoId are required' },
        { status: 400 },
      );
    }

    try {
      const body = (await request.json()) as { completed: boolean };
      if (typeof body.completed !== 'boolean') {
        return HttpResponse.json(
          { error: 'completed must be a boolean' },
          { status: 400 },
        );
      }
      const todoIndex = mockGoal.studyGoal.mytodoList.findIndex(
        (todo) => todo.id === todoId,
      );
      if (todoIndex === -1) {
        return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
      }
      mockGoal.studyGoal.mytodoList[todoIndex].completed = body.completed;
      if (body.completed) {
        mockGoal.studyGoal.mytodoList[todoIndex].completedAt = new Date();
      } else {
        mockGoal.studyGoal.mytodoList[todoIndex].completedAt = undefined;
      }
      // 완료 횟수 업데이트
      const completedCount = mockGoal.studyGoal.mytodoList.filter(
        (todo) => todo.completed,
      ).length;
      const totalCount = mockGoal.studyGoal.mytodoList.length;
      mockGoal.studyGoal.completedCt = `${completedCount}/${totalCount}`;
      return HttpResponse.json({
        message: 'Todo completion updated successfully',
        todo: mockGoal.studyGoal.mytodoList[todoIndex],
        completedCt: mockGoal.studyGoal.completedCt,
      });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }),
];
