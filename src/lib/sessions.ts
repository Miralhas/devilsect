import 'server-only';

import { ApiError } from '@/service/api-error';
import { refreshTokenRequest } from '@/service/authentication/api/refresh-token';
import { AuthState, LoginResponse } from "@/types/authentication";
import { cookies } from 'next/headers';
import { cache } from 'react';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  MILLISECONDS,
  REFRESH_TOKEN_COOKIE_NAME
} from '../utils/constants';
import { decryptUser } from './decrypt-jwt';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
type Tokens = {
  accessToken?: string;
  refreshToken?: string;
  hasRefreshToken: boolean;
  hasAccessToken: boolean;
}

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
  return session;
}

export const getAuthTokens = async (): Promise<Tokens> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const hasAccessToken = !!accessToken;
  const hasRefreshToken = !!refreshToken;
  return { accessToken, refreshToken, hasAccessToken, hasRefreshToken };
}

export const getAuthState = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const user = decryptUser(accessToken);
  if (!user) return null;

  const authState: AuthState = {
    user,
    accessToken
  }

  return authState;
}

export const createSession = async (data: LoginResponse, defaultCookieStore?: ResponseCookies) => {
  let cookieStore = defaultCookieStore ? defaultCookieStore : await cookies();

  const accessTokenExpiresAt = new Date(Date.now() + (data.accessTokenExpiresIn * 1000));
  const refreshTokenExpiresAt = new Date(Date.now() + (data.refreshTokenExpiresIn * 1000));

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, data.accessToken, {
    httpOnly: false,
    secure: true,
    expires: accessTokenExpiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, data.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshTokenExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export const refreshTokens = async (
  refreshToken: string,
  defaultCookieStore?: ResponseCookies,
) => {
  try {
    const response = await refreshTokenRequest(refreshToken);
    await deleteSession();
    await createSession(response, defaultCookieStore);
    return response;
  } catch (err) {
    if (err instanceof ApiError) {
      console.log(err.detail);
    }
    await deleteSession();
  }
}

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const user = decryptUser(accessToken);
  return user;
})