export interface Note {
  id: number;
  content: string;
  studyGoalId: number;
  studyGoalTitle: string;
  todoId: number;
  todoTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  note: Note;
}

export interface NoteListResponse {
  studyGoalTitle: string;
  notes: Note[];
}
