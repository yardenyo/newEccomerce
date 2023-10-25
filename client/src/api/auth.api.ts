import api from "@/api/Api";
import { SignUpPayload, SignInPayload } from "@/types/auth";

const resource = "/auth";

export default {
  signUp: (payload: SignUpPayload) => api.post(`${resource}/signup`, payload),
  signIn: (payload: SignInPayload) => api.post(`${resource}/signin`, payload),
  signOut: () => api.get(`${resource}/signout`),
  refreshToken: () => api.get(`${resource}/refresh-token`),
};
