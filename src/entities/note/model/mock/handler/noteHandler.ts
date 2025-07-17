import { http, HttpResponse } from 'msw';
import { notes } from '@/entities/note/model/mock/notes.mock';

export const noteHandlers = [
  // 노트 목록 조회
  http.get('/api/notes/:studyGoalId', ({ params }) => {
    const { studyGoalId } = params;
    const studyGoalIdNum = Number(studyGoalId);

    if (!studyGoalId || isNaN(studyGoalIdNum)) {
      return HttpResponse.json(
        { message: '유효한 studyGoalId가 필요합니다.' },
        { status: 400 }
      );
    }

    const filteredNotes = notes.filter(note => note.studyGoalId === studyGoalIdNum);

    return HttpResponse.json({ notes: filteredNotes });
  }),
]; 