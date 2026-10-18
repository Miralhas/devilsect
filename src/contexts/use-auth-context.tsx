'use client'

import { loginAction, logoutAction } from "@/service/authentication/actions/login-action";
import { useGetAuthState } from "@/service/user/queries/use-get-current-user";
import { AuthState, LoginResponse } from "@/types/authentication";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  authState: AuthState | null;
  isLoading: boolean;
}

type AuthActions = {
  logout: () => Promise<void>;
  login: (data: LoginResponse, redirectUri?: string) => Promise<void>;
}

const { ContextProvider, useContext } = createContext<AuthActions & AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const authStateQuery = useGetAuthState();
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    await logoutAction();

    // Clear all react query cache.
    queryClient.clear();

    // refresh to force the middleware to scan the route again. 
    // Sometimes the current route is protected. 
    // If there is no refresh, the unauthenticated user can still use the protected route.
    router.refresh();
  }

  const login = async (data: LoginResponse, redirectUri = "/") => {
    await loginAction(data);
    await authStateQuery.refetch();
    router.push(redirectUri);
  }

  return (
    <ContextProvider value={{
      login,
      logout,
      authState: authStateQuery.data!,
      isLoading: authStateQuery.isLoading,
    }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;

// Overview:

// AccessToken can be accessed from client components.
// RefreshToken can only be accessed via Server components

// In the Middleware, check if the accesstoken cookie is expiring.
// If so, delete it from the cookies, get the refreshToken and refresh both tokens.

// If the refresh request is successfull, update the access and refresh token cookies.
// RefreshToken should be http-only and AccessToken not.

// All the verification and refresh should be done in the Middleware.

// How to:

// 1. In the Middleware, for every route request, check if the accessToken is expiring.
// 2. If the accessToken is expired or to be expired in 5 minutes or less, then we need to refresh it.
// 3. Since we are in the Middleware, we have access to the refreshToken stored as a http-only cookie.
// 4. Retrieve the refreshToken, make an http request to ${BACKEND_URL}/api/auth/refresh-token with the refreshToken as its body.
// 5. If the request is successfull (2xx), then store the refreshed tokens as cookies (refreshToken as http-only)
// 6. If the request is not successfull, then just delete all cookies and unauthenticate the user.