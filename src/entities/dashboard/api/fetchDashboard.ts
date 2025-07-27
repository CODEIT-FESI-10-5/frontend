import { clientFetch } from '@/shared/api';
import { DashboardResponse } from '@/entities/dashboard';

export const fetchDashboard = async (
  goalId: string,
): Promise<DashboardResponse> => {
  return clientFetch.get<DashboardResponse>('/dashboard', {
    params: { goalId },
  });
};
