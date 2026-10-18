import { User } from "@/types/authentication";
import { CustomJwtPayload } from "@/types/session";
import { jwtDecode } from "jwt-decode";

export const decryptJwt = (token?: string) => {
  if (!token) return null;
  const decoded = jwtDecode(token) as CustomJwtPayload;
  return decoded;
}

export const decryptUser = (token?: string): User | undefined => {
  const decoded = decryptJwt(token);
  return decoded?.user;
}