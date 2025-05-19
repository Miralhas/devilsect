export type Role = "ADMIN" | "USER";

export type User = {
  id: number;
  username: string;
  email: string;
  roles: Role[]
}
