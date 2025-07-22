import { noteHandlers } from '@/entities/note/model/mock/handler/noteHandler';
import { sidebarProfileHandler } from '@/features/get-profile/api/handler';
import { sidebarCreateStudyHandler } from '@/features/create-study/api/handler';
import { sidebarStudyHandler } from '@/features/get-study-list/api/handler';
import { sidebarGoalHandler } from '@/features/get-goal-list/api/handler';
import { sidebarCreateGoalHandler } from '@/features/create-goal/api/handler';
import { studyHandlers } from '@/entities/study/api';
import { goalHandlers } from '@/entities/goal/api';
import { todolistHandlers } from '@/entities/todolist/api/mock';

export const handlers = [
  ...sidebarProfileHandler,
  ...sidebarCreateStudyHandler,
  ...sidebarStudyHandler,
  ...sidebarGoalHandler,
  ...sidebarCreateGoalHandler,
  ...noteHandlers,
  ...goalHandlers,
  ...studyHandlers,
  ...todolistHandlers,
];
