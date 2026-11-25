import type { AxiosInstance } from 'axios';

export const createUsersClient = (client: AxiosInstance) => ({
  getAll: async () => (await client.get('/users')).data,
  getById: async (id: string | number) => (await client.get(`/users/${id}`)).data,
  create: async (data: unknown) => (await client.post('/users', data)).data,
});
