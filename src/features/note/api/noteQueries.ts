import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getNoteById, getNotesByStudyGoalId } from '@/features/note/api';
import { noteKeys, type NoteListResponse } from '@/features/note/model';

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


