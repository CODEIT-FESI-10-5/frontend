import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  getNoteById,
  getNoteListByStudyGoalId,
  patchNote,
} from '../api/noteApi';
import { NoteListResponse, NoteResponse, UpdateNoteRequest } from '../model/types';
import { noteKeys } from '../model/queryKeys';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

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
export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useCustomMutation<UpdateNoteRequest, NoteResponse>({
    mutationFn: (noteData: UpdateNoteRequest) => patchNote(noteData),
    invalidateQueryKeys: [[...noteKeys.lists()]],
    // successMessage: '노트가 수정되었습니다!',
    mutationOptions: {
      onSuccess: (data, variables) => {
        // 새로운 응답 구조에 맞게 캐시 업데이트
        queryClient.setQueryData(
          noteKeys.detail(variables.id),
          data
        );
      },
    },
  });
};