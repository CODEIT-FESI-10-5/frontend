import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNoteRequest } from "@/features/edit-note/model/types";
import { updateNote } from "@/features/edit-note/api/updateNote";
import { noteKeys } from "@/entities/note/model/queryKeys";

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