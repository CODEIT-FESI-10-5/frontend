# API Client 사용법

이 폴더는 API 호출을 위한 fetch 래퍼와 관련 타입들을 포함합니다.

## 📁 파일 구조

```
shared/api/
├── clientFetch.ts    # 클라이언트 사이드 API 호출
├── serverFetch.ts    # 서버 사이드 API 호출
├── types.ts          # API 관련 타입 정의
├── index.ts          # 내보내기 설정
└── README.md         # 사용법 가이드
```

## 🚀 기본 사용법

### 가져오기

```typescript
import { clientFetch, serverFetch } from '@/shared/api';
```

### 환경 변수 설정

`.env.local` 파일에 API URL을 설정하세요:

```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
```

## 📖 메서드별 사용 예시

### 1. GET 요청

```typescript
// 기본 GET 요청
const users = await clientFetch.get<User[]>('/users');

// 쿼리 파라미터와 함께
const filteredUsers = await clientFetch.get<User[]>('/users', {
  params: { 
    page: 1, 
    limit: 10,
    search: 'john' 
  }
});

// 커스텀 헤더와 함께
const profile = await clientFetch.get<Profile>('/profile', {
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### 2. POST 요청 (데이터 생성)

```typescript
// 기본 POST 요청
const newUser = await clientFetch.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// 로그인 요청 (쿠키 제외)
const loginResponse = await clientFetch.post<AuthResponse>('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
}, {
  includeCredentials: false
});

// 파일 업로드
const uploadResponse = await clientFetch.post<UploadResponse>('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

### 3. PATCH 요청 (부분 업데이트)

```typescript
// 사용자 정보 부분 업데이트
const updatedUser = await clientFetch.patch<User>(`/users/${userId}`, {
  name: 'Updated Name'
});

// 목표 상태 업데이트
const updatedGoal = await clientFetch.patch<Goal>(`/goals/${goalId}`, {
  status: 'completed'
});
```

### 4. PUT 요청 (전체 업데이트)

```typescript
// 사용자 정보 전체 업데이트
const replacedUser = await clientFetch.put<User>(`/users/${userId}`, {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  department: 'Engineering'
});

// 설정 전체 교체
const newSettings = await clientFetch.put<Settings>('/settings', {
  theme: 'dark',
  notifications: true,
  language: 'ko'
});
```

### 5. DELETE 요청 (데이터 삭제)

```typescript
// 기본 DELETE 요청
await clientFetch.delete(`/users/${userId}`);

// 응답 데이터가 있는 DELETE
const deletedNote = await clientFetch.delete<Note>(`/notes/${noteId}`);

// 쿼리 파라미터와 함께
await clientFetch.delete('/cache', {
  params: { 
    type: 'all' 
  }
});
```

## ⚙️ 설정 옵션

### RequestConfig 인터페이스

```typescript
interface RequestConfig {
  params?: Record<string, any>;     // URL 쿼리 파라미터
  headers?: Record<string, string>; // 추가 HTTP 헤더
  includeCredentials?: boolean;     // HTTP Only 쿠키 포함 여부 (기본값: true)
}
```

### 쿠키 설정

```typescript
// HTTP Only 쿠키 포함 (기본값)
const data = await clientFetch.get('/protected-route');

// 쿠키 제외 (로그인 등)
const authData = await clientFetch.post('/auth/login', loginData, {
  includeCredentials: false
});
```

## 🌐 클라이언트 vs 서버 사이드

### 클라이언트 사이드 (clientFetch)

```typescript
// 브라우저에서 실행
import { clientFetch } from '@/shared/api';

// 컴포넌트 내에서 사용
const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await clientFetch.get<User>('/user/profile');
      setUser(userData);
    };
    
    fetchUser();
  }, []);
  
  return <div>{user?.name}</div>;
};
```

### 서버 사이드 (serverFetch)

```typescript
// 서버 컴포넌트에서 실행
import { serverFetch } from '@/shared/api';

// 서버 컴포넌트
const UserListPage = async () => {
  const users = await serverFetch.get<User[]>('/users');
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

## 🔧 실제 사용 예시

### 1. 목표 관리 API

```typescript
// 목표 목록 조회
const goals = await clientFetch.get<Goal[]>('/goals', {
  params: { status: 'active' }
});

// 새 목표 생성
const newGoal = await clientFetch.post<Goal>('/goals', {
  title: '매일 운동하기',
  description: '하루 30분 이상 운동',
  deadline: '2025-12-31'
});

// 목표 상태 업데이트
const completedGoal = await clientFetch.patch<Goal>(`/goals/${goalId}`, {
  status: 'completed'
});

// 목표 삭제
await clientFetch.delete(`/goals/${goalId}`);
```

### 2. 노트 관리 API

```typescript
// 노트 검색
const notes = await clientFetch.get<Note[]>('/notes', {
  params: { 
    q: 'react',
    page: 1,
    limit: 20
  }
});

// 노트 생성
const newNote = await clientFetch.post<Note>('/notes', {
  title: 'React 학습 노트',
  content: '오늘 배운 내용...',
  tags: ['react', 'frontend']
});

// 노트 수정
const updatedNote = await clientFetch.patch<Note>(`/notes/${noteId}`, {
  content: '수정된 내용...'
});
```

### 3. 사용자 관리 API

```typescript
// 프로필 조회
const profile = await clientFetch.get<Profile>('/user/profile');

// 프로필 업데이트
const updatedProfile = await clientFetch.patch<Profile>('/user/profile', {
  bio: '안녕하세요, 프론트엔드 개발자입니다.'
});

// 비밀번호 변경
await clientFetch.patch('/user/password', {
  currentPassword: 'old123',
  newPassword: 'new456'
});
```

## 🚨 에러 처리

```typescript
try {
  const data = await clientFetch.get<User>('/users/123');
} catch (error) {
  if (error instanceof Error) {
    console.error('API 호출 실패:', error.message);
    // HTTP error! status: 404
  }
}
```

## 💡 팁

1. **타입 안전성**: 항상 제네릭 타입을 명시하여 타입 안전성을 확보하세요.
2. **에러 처리**: try-catch 블록을 사용하여 적절한 에러 처리를 구현하세요.
3. **쿠키 관리**: 로그인 요청에서는 `includeCredentials: false`를 사용하세요.
4. **환경 변수**: API URL을 환경 변수로 관리하여 환경별 설정을 쉽게 변경하세요.

## 📚 관련 파일

- `src/shared/api/types.ts` - API 관련 타입 정의
- `src/entities/*/api/` - 각 엔티티별 API 함수들
- `src/entities/*/model/queryKeys.ts` - React Query 키 팩토리
