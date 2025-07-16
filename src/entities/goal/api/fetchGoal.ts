import { clientFetch } from "../../../shared/api";
import { Dashboard } from "../model";

export const fetchDashboard = async (groupId: string, goalId: string): Promise<Dashboard> => {
  return clientFetch.get<Dashboard>('/dashboard', {
    params: { groupId, goalId }
  });
};