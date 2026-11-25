import { getLeads } from "./leads";
import { getUsers } from "./users";

export const apiRoutes = {
  users: "/users",
  leads: "/leads",
  lead: "/lead/:id",
};

export { getLeads, getUsers };
