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