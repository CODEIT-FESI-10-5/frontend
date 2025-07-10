import { http, HttpResponse } from "msw";

export const profileHandlers = [
  http.get("/api/profile", () => {
    // 예시: 프로필 정보
    return HttpResponse.json({ id: 1, name: "홍길동", email: "test@example.com" });
  }),
];
