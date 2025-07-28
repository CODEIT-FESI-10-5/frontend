export interface GoalListItem {
  id: string;
  title: string;
}

export interface GoalListResponse {
  studyId: string;
  goals: GoalListItem[];
}

export interface GoalListResponseApi {
  httpStatusCode: number;
  errorCode: string;
  data: {
    studyId: number;
    goals: [
      {
        id: number;
        title: string;
      },
    ];
    totalCount: number;
  };
  errorMessage: string;
  fieldErrors: [
    {
      field: string;
      message: string;
    },
  ];
}
