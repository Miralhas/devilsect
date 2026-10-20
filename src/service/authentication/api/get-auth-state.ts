'use client'

import { decryptUser } from '@/lib/decrypt-jwt';
import { AuthState } from '@/types/authentication';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/utils/constants';
import Cookies from 'js-cookie';

export const getAuthState = async (): Promise<AuthState | null> => {
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