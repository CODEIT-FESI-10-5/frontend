import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  getNoteById,
  getNotesByStudyGoalId,
} from '@/features/get-note/api/getNote';
import { type NoteListResponse } from '@/entities/note/model/types';
import { noteKeys } from '@/entities/note/model/queryKeys';

// 노트 목록 데이터 가져오기
export const useNotesByStudyGoalId = (hasStudyGoalId: boolean) => {
  const searchParams = useSearchParams();
  const studyGoalId = hasStudyGoalId
    ? Number(searchParams?.get('studyGoalId'))
    : null;

  return useQuery<NoteListResponse>({
    queryKey: noteKeys.list(studyGoalId || 0),
    queryFn: () => getNotesByStudyGoalId(studyGoalId!),
    enabled: hasStudyGoalId && studyGoalId !== null && studyGoalId > 0,
  });
};

// 노트 데이터 가져오기
export const useNoteById = (noteId: number) => {
  return useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => getNoteById(noteId),
  });
};
