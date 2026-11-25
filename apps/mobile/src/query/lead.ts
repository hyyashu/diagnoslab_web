import type { AdminCreateLeadInput } from '@diagno/schemas';
import type { Lead } from '../components/leads/LeadCard';
import { useGet } from './useGet';
import { usePost } from './usePost';

/* The API wraps every response as { data, message }. */
type ApiResponse<T> = { data: T; message?: string };

export const useLeads = () => useGet<ApiResponse<Lead[]>>('/leads');
export const useCreateLead = () => usePost<ApiResponse<Lead>, AdminCreateLeadInput>('/leads');
