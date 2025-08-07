import { http, HttpResponse } from 'msw';
import { notes } from '../model/mock/notes.mock';
import { Note } from '../model/types';

export const noteHandlers = [
  // 노트 목록 조회 (쿼리 파라미터 사용하도록 수정)
  http.get('/api/notes', ({ request }) => {
    const url = new URL(request.url);
    const goalId = url.searchParams.get('goalId');

    const goalIdNum = Number(goalId);

    if (!goalId || isNaN(goalIdNum)) {
      return HttpResponse.json(
        {
          httpStatusCode: 400,
          errorCode: 'INVALID_GOAL_ID',
          data: null,
          errorMessage: '유효한 goalId가 쿼리 파라미터로 필요합니다.'
        },
        { status: 400 }
      );
    }

    const filteredNotes = notes.filter(note => note.goalId === goalIdNum);
    const studyGoalTitle = filteredNotes.length > 0 ? filteredNotes[0].studyGoalTitle : '';

    return HttpResponse.json({
      httpStatusCode: 200,
      errorCode: null,
      data: {
        studyGoalTitle,
        notes: filteredNotes
      },
      errorMessage: null
    });
  }),

  // 노트 단일 조회 (새로운 엔드포인트)
  http.get('/api/notes/:noteId', ({ params }) => {
    const { noteId } = params;
    const noteIdNum = Number(noteId);
    const note = notes.find(note => note.id === noteIdNum);

    if (!noteId || isNaN(noteIdNum) || !note) {
      return HttpResponse.json(
        {
          httpStatusCode: 404,
          errorCode: 'NOTE_NOT_FOUND',
          data: null,
          errorMessage: '노트를 찾을 수 없습니다.'
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      httpStatusCode: 200,
      errorCode: null,
      data: note,
      errorMessage: null
    });
  }),

  // 노트 수정
  http.patch('/api/notes/:noteId', async ({ params, request }) => {
    const { noteId } = params;
    const noteIdNum = Number(noteId);
    const body = await request.json() as { content: string };
    const { content } = body;

    if (!content) {
      return HttpResponse.json(
        {
          httpStatusCode: 400,
          errorCode: 'CONTENT_REQUIRED',
          data: null,
          errorMessage: '내용이 필요합니다.'
        },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex(note => note.id === noteIdNum);

    if (!noteId || isNaN(noteIdNum) || noteIndex === -1) {
      return HttpResponse.json(
        {
          httpStatusCode: 404,
          errorCode: 'NOTE_NOT_FOUND',
          data: null,
          errorMessage: '노트를 찾을 수 없습니다.'
        },
        { status: 404 }
      );
    }

    const updatedNote: Note = {
      ...notes[noteIndex],
      content,
      updatedAt: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;

    return HttpResponse.json({
      httpStatusCode: 200,
      errorCode: null,
      data: updatedNote,
      errorMessage: null
    });
  }),
]; 