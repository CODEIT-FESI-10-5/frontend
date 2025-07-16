// 노트 목록 응답
export interface NotesListResponse {
  totalCount: number;
  notes: NoteItem[];
}

export interface NoteItem {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// 노트 상세 응답
export interface NoteDetailResponse {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// 노트 생성 요청
export interface CreateNoteRequest {
  title: string;
  content: string;
}

// 노트 생성 응답
export interface CreateNoteResponse {
  id: number;
  title: string;
  content: string;
}

// 노트 수정 요청
export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}

// 노트 수정 응답
export interface UpdateNoteResponse {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// 노트 검색 쿼리 파라미터
export interface NoteSearchParams {
  note_search_query: string;
}
