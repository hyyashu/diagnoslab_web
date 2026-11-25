import { useGet } from './useGet';
import { usePost } from './usePost';

export const useGetUsers = () => useGet('/users');
export const useUsers = () => useGet('/users');
export const useCreateUser = () => usePost('/users');
