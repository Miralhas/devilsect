import { decrypt, deleteSession, updateSession } from '@/lib/sessions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { isAdminCheck } from "./utils/api-utils";
import { SESSION_COOKIE_NAME } from './utils/constants';
import { env } from './env';

// has to be unauthenticated to access
const authRoutes = [
  "/login",
  "/signup",
  "/reset-password",
];

const protectedRoutes = [
  '/profile',
  '/profile/library',
  '/profile/history',
  '/profile/reviews',
  '/profile/comments',
  '/profile/inbox',
];

const adminRoutes = [
  "/dashboard"
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = cookie && !!session?.sub;

  const underMainantance = env.NEXT_PUBLIC_MAINANTANCE;
  console.log(underMainantance);

  if (underMainantance && path !== "/mainantance") {
    return NextResponse.redirect(new URL("/mainantance", req.nextUrl))
  }

  if (isAuthenticated) {
    await updateSession(cookie);
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isAdminRoute && !isAdminCheck(session?.user)) {
    if (isAuthenticated) return NextResponse.redirect(new URL('/', req.nextUrl));
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isProtectedRoute && !isAuthenticated) {
    await deleteSession();
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}