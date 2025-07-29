import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  getNoteById,
  getNotesByStudyGoalId,
} from '@/features/get-note/api/getNote';
import { type NoteListResponse } from '@/entities/note/model/types';
import { noteKeys } from '@/entities/note/model/queryKeys';

// 노트 목록 데이터 가져오기
export const useNotesByStudyGoalId = () => {
  const searchParams = useSearchParams();
  const studyGoalIdParam = searchParams?.get('studyGoalId');
  const studyGoalId = Number(studyGoalIdParam);

  return useQuery<NoteListResponse>({
    queryKey: noteKeys.list(studyGoalId),
    queryFn: () => getNotesByStudyGoalId(studyGoalId),
    enabled: !isNaN(studyGoalId) && studyGoalId > 0,
  });
};

// 노트 데이터 가져오기
export const useGetNoteById = (noteId: number) => {
  return useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => getNoteById(noteId),
  });
};
