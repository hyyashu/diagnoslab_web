import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { api } from '../api/api';

export function useDelete<TData = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, string | number>, 'mutationFn'>
) {
  const qc = useQueryClient();
  return useMutation<TData, Error, string | number>({
    mutationFn: (id) => api.delete<TData>(`${url}/${id}`).then((r) => r.data),
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: [url] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}
