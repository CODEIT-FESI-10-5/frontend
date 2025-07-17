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

export interface NoteListResponse {
  notes: Note[];
}

export interface NoteResponse {
  note: Note;
}

export interface UpdateNoteRequest {
  id: number;
  title: string;
  content: string;
} 