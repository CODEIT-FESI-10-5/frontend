// import { authHandlers } from "./handlers/auth";
// import { dashboardHandlers } from "./handlers/dashboard";
// import { noteHandlers } from "./handlers/note";
// import { profileHandlers } from "./handlers/profile";
// import { todoHandlers } from "./handlers/todo";

import { todoHandlers } from '@/features/todo/api/mocks';

//export const handlers = [...authHandlers, ...dashboardHandlers, ...noteHandlers, ...profileHandlers, ...todoHandlers];

export const handlers = [...todoHandlers];
