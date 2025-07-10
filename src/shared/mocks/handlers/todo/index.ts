import { http, HttpResponse } from "msw";

export const todoHandlers = [
  http.get("/api/todos", () => {
    // 예시: 할 일 목록
    return HttpResponse.json({ todos: [{ id: 1, title: "할 일 1", completed: false }] });
  }),
];
