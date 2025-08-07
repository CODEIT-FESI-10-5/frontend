export interface Note {
  id: number;
  content: string;
  goalId: number;
  studyGoalTitle: string;
  todoTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  httpStatusCode: number;
  errorCode: string | null;
  data: Note;
  errorMessage: string | null;
}

export interface NoteListResponse {
  httpStatusCode: number;
  errorCode: string | null;
  data: {
    studyGoalTitle: string;
    notes: Note[];
  };
  errorMessage: string | null;
}

export interface UpdateNoteRequest {
  id: number;
  content: string;
}