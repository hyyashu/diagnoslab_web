import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { api } from '../api/api';

type PatchVars<T> = { id: string | number; data: T };

export function usePatch<TData = unknown, TBody = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, PatchVars<TBody>>, 'mutationFn'>
) {
  const qc = useQueryClient();
  return useMutation<TData, Error, PatchVars<TBody>>({
    mutationFn: ({ id, data }) =>
      api.patch<TData>(`${url}/${id}`, data).then((r) => r.data),
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: [url] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}
