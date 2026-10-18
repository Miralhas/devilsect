export type RoleStatus = "Admin" | "Member";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export type User = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export type UserInfo = User & {
  createdAt: string;
  readCount: number;
  bookmarkCount: number;
  completedCount: number;
  reviewsCount: number;
  lastActivity: string;
  registerType: string;
}

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
};

export type AuthState = {
  user: User;
  accessToken: string;
};
