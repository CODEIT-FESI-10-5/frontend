import { studyHandlers } from '@/entities/study/api';
import { goalHandlers } from './handlers/goalHandlers';
import { todoHandlers } from './handlers/todoHandlers';

export const handlers = [...goalHandlers, ...studyHandlers, ...todoHandlers];
