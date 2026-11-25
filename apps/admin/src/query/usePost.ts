import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import api from '../lib/api';

export function usePost<TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  const qc = useQueryClient();
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data) => api.post<TData>(url, data).then((r) => r.data),
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: [url] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}
