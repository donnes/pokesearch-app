import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

const publicRoutes = ["/", "/pokemon/[id]", "/signin"];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const supabase = createClient();

  const url = new URL("/", request.url);
  const nextUrl = request.nextUrl;

  const { data } = await supabase.auth.getUser();

  // Not authenticated, public routes
  if (
    !data.user &&
    publicRoutes.some((route) => nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Not authenticated, private routes
  if (!data.user) {
    return NextResponse.redirect(new URL("/signin", url));
  }

  // Authenticated
  if (data.user && nextUrl.pathname.includes("/signin")) {
    return NextResponse.redirect(new URL("/", url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
