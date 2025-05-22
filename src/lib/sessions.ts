import 'server-only';

import { env } from '@/env';
import { ApiLoginResponse } from '@/types/api';
import { CustomJwtPayload } from '@/types/session';
import { importSPKI, jwtVerify, JWTVerifyResult } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';
import {
  MILLISECONDS,
  SESSION_COOKIE_NAME,
  SESSION_ENCRYPTION_ALGORITHM
} from './constants';

const publicKeyPromise = importSPKI(env.PUBLIC_KEY, SESSION_ENCRYPTION_ALGORITHM);
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session;
}

export async function createSession(data: ApiLoginResponse) {
  const cookieStore = await cookies();

  const sessionExpiresAt = new Date(Date.now() + (SESSION_EXPIRATION_SECONDS * MILLISECONDS));

  cookieStore.set(SESSION_COOKIE_NAME, data.accessToken, {
    httpOnly: true,
    secure: true,
    expires: sessionExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession(session: string) {
  const cookieStore = await cookies();
  
  const sessionExpiresAt = new Date(Date.now() + (SESSION_EXPIRATION_SECONDS * MILLISECONDS));

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: sessionExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
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