// import { authHandlers } from "./handlers/auth";
// import { dashboardHandlers } from "./handlers/dashboard";
// import { noteHandlers } from "./handlers/note";
// import { profileHandlers } from "./handlers/profile";
// import { todoHandlers } from "./handlers/todo";

//export const handlers = [...authHandlers, ...dashboardHandlers, ...noteHandlers, ...profileHandlers, ...todoHandlers];

import { sidebarProfileHandler } from '@/features/sidebar/profile/api/handler';
import { sidebarButtonHandler } from '@/features/sidebar/button/api/handler';
import { sidebarStudyHandler } from '@/features/sidebar/study/api/handler';
import { sidebarGoalHandler } from '@/features/sidebar/goal/api/handler';
export const handlers = [
  ...sidebarProfileHandler,
  ...sidebarButtonHandler,
  ...sidebarStudyHandler,
  ...sidebarGoalHandler,
];
