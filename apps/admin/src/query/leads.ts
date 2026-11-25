import { useGet } from './useGet';
import { usePost } from './usePost';
import { usePatch } from './usePatch';
import { useDelete } from './useDelete';

export const useGetLeads = () => useGet('/leads');
export const useLeads = () => useGet('/leads');
export const useCreateLead = () => usePost('/leads');
export const useUpdateLead = () => usePatch('/leads');
export const useDeleteLead = () => useDelete('/leads');
