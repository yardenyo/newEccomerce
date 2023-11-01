export interface PostBody {
  page?: number;
  resultsPerPage?: number;
  sortBy?: string;
  sortOrder?: number;
  searchKey?: string;
  searchValue?: string;
}

export interface User {
  _id: string;
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

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
  sold: number;
  images: string[];
  color: string;
  ratings: Rating[];
  totalRating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponse {
  status: string;
  data: {
    status: string;
    success: boolean;
    message: string;
  };
}

export interface Image {
  source: string;
  alt: string;
  title?: string;
}
