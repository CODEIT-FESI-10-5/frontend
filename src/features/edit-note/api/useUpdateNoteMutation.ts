import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNoteRequest } from "@/entities/note/model/types"
import { patchNote } from "@/entities/note/api/noteApi";
import { noteKeys } from "@/entities/note/model/queryKeys";

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