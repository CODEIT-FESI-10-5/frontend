import { studyHandlers } from '@/entities/study/api';
import { goalHandlers } from '@/entities/goal/api';

export const handlers = [...goalHandlers, ...studyHandlers];
