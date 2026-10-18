'use client'

import { AuthState } from '@/types/authentication';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { decryptUser } from '@/lib/decrypt-jwt';
import Cookies from 'js-cookie';

export const getAuthState = async (): Promise<AuthState | null> => {
  await fetch("/api/trigger"); // Trigger middleware so it refresh the tokens if necessary
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  if (!accessToken) return null;
  
  const user = decryptUser(accessToken);
  if (!user) return null;

  const authState: AuthState = {
    user,
    accessToken
  }

  return authState;
}