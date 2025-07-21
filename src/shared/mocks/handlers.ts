import { noteHandlers } from "@/entities/note/model/mock/handler/noteHandler";
import { sidebarProfileHandler } from '@/features/get-profile/api/handler';
import { sidebarCreateStudyHandler } from '@/features/create-study/api/handler';
import { sidebarStudyHandler } from '@/features/get-study-list/api/handler';
import { sidebarGoalHandler } from '@/features/get-goal-list/api/handler';
import { sidebarCreateGoalHandler } from '@/features/create-goal/api/handler';
export const handlers = [
  ...sidebarProfileHandler,
  ...sidebarCreateStudyHandler,
  ...sidebarStudyHandler,
  ...sidebarGoalHandler,
  ...sidebarCreateGoalHandler,
  ...noteHandlers
];