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
