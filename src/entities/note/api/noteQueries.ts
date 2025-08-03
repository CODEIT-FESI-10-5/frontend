import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  getNoteById,
  getNoteListByStudyGoalId,
  patchNote,
} from '@/entities/note/api/noteApi';
import { NoteListResponse, UpdateNoteRequest } from '@/entities/note/model/types';
import { noteKeys } from '@/entities/note/model/queryKeys';

// 노트 목록 데이터 가져오기
export const useNotesByStudyGoalId = () => {
  const searchParams = useSearchParams();
  const studyGoalIdParam = searchParams?.get('studyGoalId');
  const studyGoalId = Number(studyGoalIdParam);

  return useQuery<NoteListResponse>({
    queryKey: noteKeys.list(studyGoalId),
    queryFn: () => getNoteListByStudyGoalId(studyGoalId),
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

// 노트 수정
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteData: UpdateNoteRequest) => patchNote(noteData),
    onSuccess: (data, variables) => {
      // 새로운 응답 구조에 맞게 캐시 업데이트
      queryClient.setQueryData(
        noteKeys.detail(variables.id),
        data
      );

      // 노트 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('노트 수정 실패:', error);
    },
  });
};