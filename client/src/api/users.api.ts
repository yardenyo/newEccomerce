import api from "@/api/Api";
import { PostBody } from "@/types";
const resource = "/users";

export default {
  getUsers: (payload?: PostBody, signal?: AbortSignal) =>
    api.post(`${resource}`, payload, {
      signal,
    }),
};
