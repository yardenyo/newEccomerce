import { User } from "@/types";

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  auth: {
    user?: User | null;
    accessToken?: string | null;
  };
}
