'use client';

import { useDashboardData, useToggleTask } from './api';

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();
  const toggleTaskMutation = useToggleTask();

  const handleToggleTask = (taskId: string) => {
    toggleTaskMutation.mutate(taskId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-700">대시보드 데이터가 없습니다.</p>
      </div>
    );
  }

  const { stats, recentTasks } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">작업 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">전체 작업</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalTasks}</p>
          <p className="text-sm text-gray-500 mt-1">총 작업 수</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">완료된 작업</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
          <p className="text-sm text-gray-500 mt-1">완료된 작업 수</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">진행 중인 작업</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingTasks}</p>
          <p className="text-sm text-gray-500 mt-1">진행 중인 작업 수</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">완료율</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
          <p className="text-sm text-gray-500 mt-1">완료 비율</p>
        </div>
      </div>

      {/* 최근 작업 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">최근 작업</h2>
        </div>
        <div className="divide-y">
          {recentTasks && recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    생성: {new Date(task.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              최근 작업이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 개발 모드 표시 */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">🔧 개발 모드</h3>
          <p className="text-sm text-blue-700">
            MSW(Mock Service Worker)를 사용하여 API 응답을 모킹하고 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
