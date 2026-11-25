import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from '../api/api';

export function useGet<T = unknown>(
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T>({
    queryKey: [url],
    queryFn: () => api.get<T>(url).then((r) => r.data),
    ...options,
  });
}
