'use client'

import { AuthState } from "@/types/authentication";
import { getAuthState } from "./authentication/api/get-auth-state";

export function withAuth<TArgs extends any[], TReturn>(
  fn: (auth: AuthState, ...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    await fetch('') // Dummy fetch just to trigger the proxy(middleware) and refresh the tokens, if necessary.
    const auth = await getAuthState();

    if (!auth) throw new Error('no auth');

    return await fn(auth, ...args);
  };
}