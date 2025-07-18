export interface Note {
  id: number;
  title: string;
  content: string;
  studyGoalId: number;
  todoId: number;
  todoTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  note: Note;
}

export interface NoteListResponse {
  notes: Note[];
}
