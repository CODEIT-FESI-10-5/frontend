import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getNoteById, getNotesByStudyGoalId, updateNote } from '@/features/note/api';
import { noteKeys, type UpdateNoteRequest, type NoteListResponse } from '@/features/note/model';


export const useNotesByStudyGoalId = (hasStudyGoalId: boolean) => {
  const searchParams = useSearchParams();
  const studyGoalId = hasStudyGoalId ? Number(searchParams.get("studyGoalId")) : null;

  return useQuery<NoteListResponse>({
    queryKey: noteKeys.list(studyGoalId || 0),
    queryFn: () => getNotesByStudyGoalId(studyGoalId!),
    enabled: hasStudyGoalId && studyGoalId !== null && studyGoalId > 0,
  });
};

export const useNoteById = (noteId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => getNoteById(noteId),
    enabled: enabled && noteId > 0,
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteData: UpdateNoteRequest) => updateNote(noteData),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        noteKeys.detail(variables.id),
        data
      );

      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('노트 수정 실패:', error);
    },
  });
};
