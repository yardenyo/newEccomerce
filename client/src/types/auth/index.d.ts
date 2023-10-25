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

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: Roles;
  isBlocked: boolean;
  cart: string | undefined;
  wishlist: string[];
  address: string[];
  userSettings: UserSettings;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpires: Date | undefined;
}

export interface AuthState {
  user?: User | null;
  accessToken?: string | null;
}
