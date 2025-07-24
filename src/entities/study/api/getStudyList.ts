import { clientFetch } from '@/shared/api';
import { StudyListResponse, StudyListResponseApi } from '../model';
import { StudyListMapper } from '../model/study.mapper';

export const getStudyList = async (): Promise<StudyListResponse> => {
  const res = await clientFetch.get<StudyListResponseApi>(
    'api/sidebar/study-list',
  );
  return StudyListMapper(res);
};
