import { User } from "./authentication";

export type CustomJwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  jti?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  user?: User;
}