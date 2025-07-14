// import { authHandlers } from "./handlers/auth";
// import { dashboardHandlers } from "./handlers/dashboard";
// import { noteHandlers } from "./handlers/note";
// import { profileHandlers } from "./handlers/profile";
// import { todoHandlers } from "./handlers/todo";

// export const handlers = [...authHandlers, ...dashboardHandlers, ...noteHandlers, ...profileHandlers, ...todoHandlers];

import { dashboardHandlers } from "../../features/dashboard/handlers";

export const handlers = [...dashboardHandlers];
