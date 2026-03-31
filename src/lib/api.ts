import axios from "axios";
import { LeadFormSubmitData } from "@/app/components/leadForm";

export const api = axios.create({
  baseURL: "https://api.diagnoslab.in",
  // baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitLeadForm = async (data: LeadFormSubmitData) => {
  const response = await api.post("/leads", data);
  return response.data;
};
