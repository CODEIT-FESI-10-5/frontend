import { http, HttpResponse } from "msw";
import { StudyGroup, Dashboard } from "./types";

// 모킹용 데이터
const mockStudyGroup: StudyGroup = {
  id: "study-1",
  name: "스터디 제목이 여기에",
  description: "우리는 어떤 스터디를 같이 하는 모입입니다. 열공!",
  createdAt: new Date("2025-01-01T00:00:00Z"),
  image: "/images/study-background.jpg",
  teamProgress: 55,
  inviteLink: "A34B5fD",
  members: [
    {
      id: "member-1",
      name: "닉네임1",
      image: "/images/study-background.jpg",
    },
    {
      id: "member-2",
      name: "닉네임2",
      image: "/images/study-background.jpg",
    },
    {
      id: "member-3",
      name: "닉네임3",
      image: "/images/study-background.jpg",
    },
    {
      id: "member-4",
      name: "닉네임4",
      image: "/images/study-background.jpg",
    },
    {
      id: "member-5",
      name: "닉네임5",
      image: "/images/study-background.jpg",
    },
    {
      id: "member-6",
      name: "닉네임6",
      image: "/images/study-background.jpg",
    },
  ],
};

const mockDashboard: Dashboard = {
  studyGoal: {
    id: "goal-1",
    title: "피그마 툴 익히기",
    completedCt: "1/4",
    mytodoList: [
      {
        id: "todo-1",
        content: "튜토리얼 영상 1-3 시청",
        createdAt: new Date("2025-01-10T09:00:00Z"),
        completed: true,
        completedAt: new Date("2025-01-10T15:00:00Z"),
        note: "테스트 노트 내용 1",
        order: 1,
        shared: true,
      },
      {
        id: "todo-2",
        content: "사용자 인터뷰 실습 준비",
        createdAt: new Date("2025-01-10T10:00:00Z"),
        completed: false,
        completedAt: new Date("2025-01-11T14:00:00Z"),
        note: "",
        order: 2,
        shared: false,
      },
    ],
    teamProgress: [
      {
        name: "닉네임1",
        image: "/images/study-background.jpg",
        progress: 80,
        completedCt: [8, 10],
      },
      {
        name: "닉네임2",
        image: "/images/study-background.jpg",
        progress: 70,
        completedCt: [7, 10],
      },
      {
        name: "닉네임3",
        image: "/images/study-background.jpg",
        progress: 90,
        completedCt: [9, 10],
      },
      {
        name: "닉네임4",
        image: "/images/study-background.jpg",
        progress: 60,
        completedCt: [6, 10],
      },
    ],
  },
};

const mockDashboardNone: Dashboard = {
  studyGoal: {
    id: "goal-1",
    title: "",
    completedCt: "0/0",
    mytodoList: [],
    teamProgress: [],
  },
};

export const dashboardHandlers = [
  // 스터디 그룹 정보 조회
  http.get("/api/study-group/:id", ({ params }) => {
    const studyId = params.id as string;

    if (studyId !== mockStudyGroup.id) {
      return HttpResponse.json({ error: "Study group not found" }, { status: 404 });
    }

    return HttpResponse.json(mockStudyGroup);
  }),

  // 대시보드 데이터 조회
  http.get("/api/dashboard", ({ request }) => {
    const url = new URL(request.url);
    const groupId = url.searchParams.get("groupId");
    const goalId = url.searchParams.get("goalId");

    if (!groupId || !goalId) {
      return HttpResponse.json({ error: "groupId and goalId are required" }, { status: 400 });
    }

    if (groupId !== mockStudyGroup.id) {
      return HttpResponse.json({ error: "Study group not found" }, { status: 404 });
    }

    return HttpResponse.json(mockDashboard);
    // return HttpResponse.json(mockDashboardNone);
  }),

  // 투두 리스트 제목 업데이트
  http.patch("/api/study/:groupId/goal/:goalId/title", async ({ params, request }) => {
    const { groupId, goalId } = params;

    if (groupId !== mockStudyGroup.id) {
      return HttpResponse.json({ error: "Study group not found" }, { status: 404 });
    }

    if (goalId !== mockDashboard.studyGoal.id) {
      return HttpResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    try {
      const body = (await request.json()) as { title: string };

      if (!body.title || body.title.trim() === "") {
        return HttpResponse.json({ error: "Title is required" }, { status: 400 });
      }

      // 모킹용 데이터 업데이트
      mockDashboard.studyGoal.title = body.title;

      return HttpResponse.json({
        message: "Title updated successfully",
        studyGoal: {
          id: mockDashboard.studyGoal.id,
          title: mockDashboard.studyGoal.title,
        },
      });
    } catch (error) {
      return HttpResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
  }),
];
