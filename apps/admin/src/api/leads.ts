import api from "../lib/api";
import { apiRoutes } from "./routes";

export const getLeads = async () => {
  const response = await api.get(apiRoutes.leads);
  return response.data;
};

export const getLead = async (id: string) => {
  const response = await api.get(apiRoutes.lead.replace(":id", id));
  return response.data;
};

export const updateLeadStatusApi = async (id: string, status: string) => {
  const response = await api.patch(apiRoutes.lead.replace(":id", id), { status });
  return response.data;
};
