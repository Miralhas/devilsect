import { getAuthTokens, getCurrentUser, refreshTokens } from '@/lib/sessions';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';
import { isAdminCheck } from "./utils/api-utils";
import { LoginResponse } from './types/authentication';
import { ACCESS_TOKEN_COOKIE_NAME } from './utils/constants';

// has to be unauthenticated to access
const authRoutes = [
  "/login",
  "/signup",
  "/reset-password",
];

const protectedDynamicRoutes = [
  '/profile',
];

const adminRoutes = [
  "/dashboard"
];

const redirectToHome = [
  "/series"
]

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const underMaintenance = env.NEXT_PUBLIC_MAINTENANCE;
  const isProtectedDynamicRoute = protectedDynamicRoutes.some(r => path.includes(r));
  const isAdminRoute = adminRoutes.includes(path);
  const isUnauthenticatedOnly = authRoutes.includes(path);
  const isRedirectToHome = redirectToHome.includes(path);

  const { hasAccessToken, hasRefreshToken, refreshToken } = await getAuthTokens();

  // Access Token expired and user has the refresh token stored in cookies.
  if (!hasAccessToken && hasRefreshToken) {
    await refreshTokens(refreshToken!);
  }

  const user = await getCurrentUser();

  if (isAdminRoute && !isAdminCheck(user)) {
    if (!user) return NextResponse.redirect(new URL('/login', request.nextUrl));
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (underMaintenance && path !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.nextUrl))
  }

  if (isRedirectToHome) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (user && isUnauthenticatedOnly) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!user && isProtectedDynamicRoute) {
    return NextResponse.redirect(new URL(`/login?redirect=${path}`, request.nextUrl));
  }

  return NextResponse.next(
);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}