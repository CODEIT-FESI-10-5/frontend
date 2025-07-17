import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getNotesByStudyGoalId } from '@/features/note/api';
import { noteKeys } from '@/features/note/model';
import { type NoteListResponse } from '@/features/note/model';

export const useNotesByStudyGoalId = (hasStudyGoalId: boolean) => {
  const searchParams = useSearchParams();
  const studyGoalId = hasStudyGoalId ? Number(searchParams.get("studyGoalId")) : null;

  return useQuery<NoteListResponse>({
    queryKey: noteKeys.list(studyGoalId || 0),
    queryFn: () => getNotesByStudyGoalId(studyGoalId!),
    enabled: hasStudyGoalId && studyGoalId !== null && studyGoalId > 0,
  });
};
