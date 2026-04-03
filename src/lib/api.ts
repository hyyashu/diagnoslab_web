import axios from "axios";
import { LeadFormSubmitData } from "@/app/components/leadForm";

export const api = axios.create({
  baseURL: "http://diangos-api-jg2j3d-244a7b-91-108-111-112.traefik.me/",
  // baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitLeadForm = async (data: LeadFormSubmitData) => {
  const response = await api.post("/leads", data);
  return response.data;
};
