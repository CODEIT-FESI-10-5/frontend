import { http, HttpResponse } from 'msw';
import { notes } from '@/entities/note/model/mock/notes.mock';
import { Note } from '@/entities/note/model/types';

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

  // 노트 상세 조회 (기존)
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

  // 노트 단일 조회 (새로운 엔드포인트)
  http.get('/api/notes/:noteId', ({ params }) => {
    const { noteId } = params;
    const noteIdNum = Number(noteId);
    const note = notes.find(note => note.id === noteIdNum);

    if (!noteId || isNaN(noteIdNum) || !note) {
      return HttpResponse.json(
        { message: '노트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      noteId: note.id,
      noteContent: note.content,
      createAt: note.createdAt,
      updateAt: note.updatedAt,
      studyGoalTitle: note.studyGoalTitle,
      todoTitle: note.todoTitle
    });
  }),

  // 노트 수정
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