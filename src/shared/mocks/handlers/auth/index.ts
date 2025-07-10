import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/login", async ({ request }) => {
    // 예시: 로그인 성공
    return HttpResponse.json({ token: "mock-token", user: { id: 1, name: "홍길동" } });
  }),
];
