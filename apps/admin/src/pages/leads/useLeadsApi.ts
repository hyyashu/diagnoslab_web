import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type {
  BookLeadInput,
  CreateTaskInput,
  LogActivityInput,
  UpdateLeadInput,
} from "@diagno/schemas";
import api from "@/lib/api";
import type { WebsiteTap, LeadDetail, LeadRow, OpenTask } from "./leadTypes";

type Envelope<T> = { success: boolean; message: string; data: T };

const get = async <T,>(url: string) => (await api.get<Envelope<T>>(url)).data.data;

export const errorMessage = (e: unknown) => {
  if (isAxiosError(e)) {
    const body = e.response?.data as { message?: string; errors?: { message: string }[] } | undefined;
    return body?.errors?.[0]?.message ?? body?.message ?? e.message;
  }
  return e instanceof Error ? e.message : "Something went wrong";
};

export const useLeadList = () =>
  useQuery({
    queryKey: ["leads"],
    queryFn: () => get<LeadRow[]>("/leads"),
    refetchInterval: 60_000,
  });

export const useLead = (id: number | null) =>
  useQuery({
    queryKey: ["leads", id],
    queryFn: () => get<LeadDetail>(`/leads/${id}`),
    enabled: id != null,
  });

export const useOwners = () =>
  useQuery({
    queryKey: ["leads", "owners"],
    queryFn: () => get<{ id: number; name: string | null }[]>("/leads/owners"),
    staleTime: 5 * 60_000,
  });

export const useOpenTasks = () =>
  useQuery({
    queryKey: ["leads", "tasks"],
    queryFn: () => get<OpenTask[]>("/leads/tasks/open"),
    refetchInterval: 60_000,
  });

/* Every write refreshes the list, the open lead and the follow-ups. */
function useLeadWrite<V, R = unknown>(fn: (v: V) => Promise<R>, success?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      if (success) toast.success(success);
    },
    onError: (e) => toast.error(errorMessage(e)),
  });
}

export const useUpdateLead = (id: number) =>
  useLeadWrite((v: UpdateLeadInput) => api.patch(`/leads/${id}`, v));

export const useLogActivity = (id: number) =>
  useLeadWrite((v: LogActivityInput) => api.post(`/leads/${id}/activities`, v), "Saved");

export const useBookLead = (id: number) =>
  useLeadWrite((v: BookLeadInput) => api.post(`/leads/${id}/book`, v), "Marked as booked");

export const useCreateTask = (id: number) =>
  useLeadWrite((v: CreateTaskInput) => api.post(`/leads/${id}/tasks`, v), "Follow-up added");

export const useToggleTask = () =>
  useLeadWrite(({ taskId, done }: { taskId: number; done: boolean }) =>
    api.patch(`/leads/tasks/${taskId}`, { done }),
  );

export const useCreateLead = () =>
  useLeadWrite(
    (v: { name?: string; phone?: string; email?: string; message?: string; source: Record<string, string> }) =>
      api.post<Envelope<{ id: number }>>("/leads", v).then((r) => r.data.data),
    "Lead added",
  );

/* Website Call / WhatsApp taps waiting to be matched, or a ref code lookup. */
export const useWebsiteTaps = (ref?: string, enabled = true) =>
  useQuery({
    queryKey: ["leads", "taps", ref ?? ""],
    queryFn: () => get<WebsiteTap[]>(`/leads/taps${ref ? `?ref=${encodeURIComponent(ref)}` : ""}`),
    refetchInterval: 60_000,
    enabled,
  });

export const useMatchTap = () =>
  useLeadWrite(({ id, phone, name }: { id: number; phone: string; name?: string }) =>
    api
      .post<Envelope<{ leadId: number; reused: boolean }>>(`/leads/taps/${id}/match`, { phone, name: name || undefined })
      .then((r) => r.data.data),
  );

export const useDismissTap = () =>
  useLeadWrite((id: number) => api.post(`/leads/taps/${id}/dismiss`), "Hidden");
