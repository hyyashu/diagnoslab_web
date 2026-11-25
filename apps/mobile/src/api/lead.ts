import type { AdminCreateLeadInput, AdminUpdateLeadInput } from "@diagno/schemas";
import { api } from "./api";

export const getLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};

export const getLeadById = async (id: string) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

export const createLead = async (lead: AdminCreateLeadInput) => {
  const response = await api.post("/leads", lead);
  return response.data;
};

export const updateLead = async (id: string, lead: AdminUpdateLeadInput) => {
  /* The API only has PATCH for leads. */
  const response = await api.patch(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};