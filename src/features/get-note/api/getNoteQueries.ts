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
  // URL 쿼리 파라미터에서 'studyGoalId'를 가져옵니다.
  const studyGoalIdParam = searchParams?.get('studyGoalId');
  // Number로 변환합니다. studyGoalIdParam이 null이거나 숫자가 아니면 NaN이 됩니다.
  const studyGoalId = Number(studyGoalIdParam);

  return useQuery<NoteListResponse>({
    // queryKey도 studyGoalId를 사용하도록 변경합니다.
    queryKey: noteKeys.list(studyGoalId),
    // queryFn에서 studyGoalId를 인자로 전달합니다.
    queryFn: () => getNotesByStudyGoalId(studyGoalId),
    // studyGoalId가 유효한 숫자인 경우에만 쿼리를 실행합니다.
    // isNaN(studyGoalId)는 studyGoalId가 null이거나 변환할 수 없는 문자열일 때 true가 됩니다.
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
