import { http, HttpResponse } from "msw";

export const dashboardHandlers = [
  http.get("/api/dashboard/stats", () => {
    // 예시: 대시보드 통계
    return HttpResponse.json({ totalTodos: 10, completed: 5 });
  }),
];
