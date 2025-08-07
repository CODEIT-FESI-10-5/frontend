import { mockGoalList } from '@/entities/goal/model/__mocks__/goal.mock';
import { http, HttpResponse } from 'msw';

export const sidebarDeleteGoal = [
  http.delete('/api/goals/:goalId', ({ params }) => {
    const goalId = Number(params.goalId);

    // goalId가 유효하지 않은 경우
    if (!goalId || isNaN(goalId)) {
      return HttpResponse.json(
        {
          httpStatusCode: 400,
          errorCode: 'INVALID_GOAL_ID',
          errorMessage: '유효하지 않은 목표 ID입니다.',
          fieldErrors: [],
          data: null,
        },
        { status: 400 },
      );
    }

    // 해당 goalId가 존재하지 않는 경우
    const goalExists = mockGoalList.data.goals.some(
      (goal) => goal.id === goalId,
    );

    if (!goalExists) {
      return HttpResponse.json(
        {
          httpStatusCode: 404,
          errorCode: 'GOAL_NOT_FOUND',
          errorMessage: '존재하지 않는 목표입니다.',
          fieldErrors: [],
          data: null,
        },
        { status: 404 },
      );
    }

    // 목표 삭제 (실제로는 목 데이터에서 제거)
    const goalIndex = mockGoalList.data.goals.findIndex(
      (goal) => goal.id === goalId,
    );

    if (goalIndex !== -1) {
      mockGoalList.data.goals.splice(goalIndex, 1);
      mockGoalList.data.totalCount = mockGoalList.data.goals.length;
    }

    // 성공 응답
    return HttpResponse.json(
      {
        httpStatusCode: 200,
        errorCode: '',
        errorMessage: '',
        fieldErrors: [],
        data: {
          message: '목표가 성공적으로 삭제되었습니다.',
          deletedGoalId: goalId,
        },
      },
      { status: 200 },
    );
  }),
];
