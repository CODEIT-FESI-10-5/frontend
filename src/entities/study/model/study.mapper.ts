import {
  StudyItem,
  StudyListResponse,
  StudyItemApi,
  StudyListResponseApi,
} from './types';

export const StudyItemMapper = (item: StudyItemApi): StudyItem => ({
  id: String(item.studyId),
  title: item.title,
  description: item.description,
  role: item.role,
});
