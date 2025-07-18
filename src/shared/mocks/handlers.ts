// import { authHandlers } from "./handlers/auth";
// import { dashboardHandlers } from "./handlers/dashboard";
// import { noteHandlers } from "./handlers/note";
// import { profileHandlers } from "./handlers/profile";
// import { todoHandlers } from "./handlers/todo";

//export const handlers = [...authHandlers, ...dashboardHandlers, ...noteHandlers, ...profileHandlers, ...todoHandlers];

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
];
