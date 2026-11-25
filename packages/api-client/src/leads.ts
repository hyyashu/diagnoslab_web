import type { AxiosInstance } from 'axios';

export const createLeadsClient = (client: AxiosInstance) => ({
  getAll: async () => (await client.get('/leads')).data,
  getById: async (id: string | number) => (await client.get(`/leads/${id}`)).data,
  create: async (data: unknown) => (await client.post('/leads', data)).data,
  update: async (id: string | number, data: unknown) => (await client.put(`/leads/${id}`, data)).data,
  delete: async (id: string | number) => (await client.delete(`/leads/${id}`)).data,
});
