import { http, HttpResponse } from "msw";

export const noteHandlers = [
  http.get("/api/notes/:id", ({ params }) => {
    // 예시: 노트 상세
    return HttpResponse.json({ id: params.id, title: "노트 제목", content: "노트 내용" });
  }),
];
