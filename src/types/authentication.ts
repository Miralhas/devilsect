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