import 'server-only';

import { env } from '@/env';
import { ApiLoginResponse } from '@/types/api';
import { CustomJwtPayload } from '@/types/session';
import { importSPKI, jwtVerify, JWTVerifyResult } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';
import {
  MILLISECONDS,
  REFRESH_TOKEN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_ENCRYPTION_ALGORITHM
} from './constants';

const publicKeyPromise = importSPKI(env.PUBLIC_KEY, SESSION_ENCRYPTION_ALGORITHM);

export const getSesstion = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  if (!session) return undefined;
  return session;
}

export async function createSession(data: ApiLoginResponse) {
  const cookieStore = await cookies();

  const sessionExpiresAt = new Date(Date.now() + (data.accessTokenExpiresIn * MILLISECONDS));
  const refreshTokenExpiresAt = new Date(Date.now() + (data.refreshTokenExpiresIn * MILLISECONDS));

  cookieStore.set(SESSION_COOKIE_NAME, data.accessToken, {
    httpOnly: true,
    secure: true,
    expires: sessionExpiresAt,
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
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export const decrypt = cache(async (session: string | undefined = '') => {
  if (!session) return undefined;
  try {
    const publicKey = await publicKeyPromise;

    const { payload } = await jwtVerify(session, publicKey, {
      issuer: "stalkers"
    }) as JWTVerifyResult & { payload: CustomJwtPayload };

    return payload;
    // eslint-disable-next-line
  } catch (error) {
    console.log('Failed to verify session');
    return undefined;
  }
});