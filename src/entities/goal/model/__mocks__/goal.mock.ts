import { GoalListResponseApi } from '../types';

export const mockGoalList: GoalListResponseApi = {
  httpStatusCode: 0,
  errorCode: 'string',
  data: {
    studyId: 1,
    goals: [
      {
        id: 1,
        title: '스프링 부트 마스터하기',
      },
    ],
    totalCount: 5,
  },
  errorMessage: 'string',
  fieldErrors: [
    {
      field: 'string',
      message: 'string',
    },
  ],
};
