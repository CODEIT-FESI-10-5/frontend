import { http, HttpResponse } from 'msw';
import { notes } from '@/entities/note/model/mock/notes.mock';
import { Note } from '@/entities/note/model/types';

export const noteHandlers = [
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

  http.get('/api/notes/detail/:id', ({ params }) => {
    const { id } = params;
    const idNum = Number(id);
    const note = notes.find(note => note.id === idNum);

    if (!id || isNaN(idNum) || !note) {
      return HttpResponse.json(
        { message: '노트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ note });
  }),

  http.patch('/api/notes/:id', async ({ params, request }) => {
    const { id } = params;
    const idNum = Number(id);
    const body = await request.json() as { content: string };
    const { content } = body;

    if (!content) {
      return HttpResponse.json(
        { message: '내용이 필요합니다.' },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex(note => note.id === idNum);

    if (!id || isNaN(idNum) || noteIndex === -1) {
      return HttpResponse.json(
        { message: '노트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const updatedNote: Note = {
      ...notes[noteIndex],
      content,
      updatedAt: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;

    return HttpResponse.json({ note: updatedNote });
  }),
]; 