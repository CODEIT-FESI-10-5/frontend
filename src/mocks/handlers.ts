import { http, HttpResponse } from "msw";

export const handlers = [
  // 예시 API 핸들러
  http.get("/api/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
      },
    ]);
  }),

  http.post("/api/users", async ({ request }) => {
    const newUser = (await request.json()) as { name: string; email: string };
    return HttpResponse.json(
      {
        id: Date.now(),
        ...newUser,
      },
      { status: 201 }
    );
  }),
];
