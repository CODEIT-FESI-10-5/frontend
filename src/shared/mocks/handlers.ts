import { goalHandlers } from './handlers/goalHandlers';
import { studyHandlers } from './handlers/studyHandlers';
import { todoHandlers } from './handlers/todoHandlers';

export const handlers = [...goalHandlers, ...studyHandlers, ...todoHandlers];
