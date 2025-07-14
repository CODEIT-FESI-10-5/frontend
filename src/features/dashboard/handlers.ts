import { http, HttpResponse } from 'msw';
import { DashboardData, DashboardStats, Task } from './types';

// 모킹용 데이터
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'MSW 설정 완료하기',
    description: 'Mock Service Worker를 프로젝트에 설정',
    completed: true,
    priority: 'high',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-10T10:30:00Z',
  },
  {
    id: '2',
    title: '대시보드 UI 구현',
    description: '사용자 대시보드 인터페이스 개발',
    completed: false,
    priority: 'high',
    createdAt: '2025-01-10T11:00:00Z',
    updatedAt: '2025-01-10T11:00:00Z',
  },
  {
    id: '3',
    title: 'API 연동 테스트',
    description: 'React Query와 MSW 연동 테스트',
    completed: false,
    priority: 'medium',
    createdAt: '2025-01-10T14:00:00Z',
    updatedAt: '2025-01-10T14:00:00Z',
  },
  {
    id: '4',
    title: '컴포넌트 테스트 작성',
    description: 'React Testing Library로 컴포넌트 테스트',
    completed: false,
    priority: 'medium',
    createdAt: '2025-01-11T09:00:00Z',
    updatedAt: '2025-01-11T09:00:00Z',
  },
  {
    id: '5',
    title: '스토리북 설정',
    description: '컴포넌트 문서화를 위한 스토리북 설정',
    completed: false,
    priority: 'low',
    createdAt: '2025-01-11T15:00:00Z',
    updatedAt: '2025-01-11T15:00:00Z',
  },
];

const calculateStats = (tasks: Task[]): DashboardStats => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    lastUpdated: new Date().toISOString(),
  };
};

export const dashboardHandlers = [
  // 대시보드 전체 데이터 조회
  http.get('/api/dashboard', () => {
    const stats = calculateStats(mockTasks);
    const recentTasks = mockTasks.slice(0, 5);

    const dashboardData: DashboardData = {
      stats,
      recentTasks,
    };

    return HttpResponse.json(dashboardData);
  }),

  // 대시보드 통계만 조회
  http.get('/api/dashboard/stats', () => {
    const stats = calculateStats(mockTasks);
    return HttpResponse.json(stats);
  }),

  // 최근 작업 목록 조회
  http.get('/api/dashboard/recent-tasks', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '5', 10);
    
    const recentTasks = mockTasks
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);

    return HttpResponse.json(recentTasks);
  }),

  // 작업 완료 상태 토글
  http.patch('/api/tasks/:id/toggle', ({ params }) => {
    const taskId = params.id as string;
    const task = mockTasks.find(t => t.id === taskId);

    if (!task) {
      return HttpResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString();

    return HttpResponse.json(task);
  }),

  // 새 작업 추가
  http.post('/api/tasks', async ({ request }) => {
    const taskData = await request.json() as {
      title: string;
      description?: string;
      priority: 'low' | 'medium' | 'high';
    };

    const newTask: Task = {
      id: (mockTasks.length + 1).toString(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      priority: taskData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTasks.unshift(newTask);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  // 작업 삭제
  http.delete('/api/tasks/:id', ({ params }) => {
    const taskId = params.id as string;
    const taskIndex = mockTasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return HttpResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    mockTasks.splice(taskIndex, 1);

    return HttpResponse.json({ success: true });
  }),
];
