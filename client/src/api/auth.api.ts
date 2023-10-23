import api from "@/api/Api";
import { SignUpPayload, SignInPayload } from "@/types/auth";

const auth = "/auth";

export default {
  signUp: (payload: SignUpPayload) => api.post(`${auth}/signup`, payload),
  signIn: (payload: SignInPayload) => api.post(`${auth}/signin`, payload),
  signOut: () => api.post(`${auth}/signout`),
};
