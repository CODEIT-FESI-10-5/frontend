import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardData, DashboardStats, Task } from './types';

// API 함수들
const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('/api/dashboard/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
};

const fetchRecentTasks = async (limit = 5): Promise<Task[]> => {
  const response = await fetch(`/api/dashboard/recent-tasks?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent tasks');
  }
  return response.json();
};

const toggleTask = async (taskId: string): Promise<Task> => {
  const response = await fetch(`/api/tasks/${taskId}/toggle`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle task');
  }
  return response.json();
};

const createTask = async (taskData: {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}): Promise<Task> => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

const deleteTask = async (taskId: string): Promise<void> => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

// React Query 훅들
export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 2 * 60 * 1000, // 2분
    retry: 2,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    staleTime: 1 * 60 * 1000, // 1분
  });
};

export const useRecentTasks = (limit = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-tasks', limit],
    queryFn: () => fetchRecentTasks(limit),
    staleTime: 30 * 1000, // 30초
  });
};

export const useToggleTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      // 관련 쿼리들을 무효화하여 리페치
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // 관련 쿼리들을 무효화하여 리페치
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // 관련 쿼리들을 무효화하여 리페치
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
