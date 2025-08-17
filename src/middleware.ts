import { decrypt, deleteSession, updateSession } from '@/lib/sessions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib/constants';

const protectedRoutes = ['/account'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (cookie && session?.sub) {
    await updateSession(cookie);
  }

  if (isProtectedRoute && !session?.sub) {
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