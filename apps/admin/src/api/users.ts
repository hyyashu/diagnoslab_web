import api from "../lib/api";
import { apiRoutes } from "./routes";

export const getUsers = async () => {
  const response = await api.get(apiRoutes.users);
  return response.data;
};
