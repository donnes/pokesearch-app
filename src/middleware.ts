import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

const publicRoutes = ["/", "/signin"];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const supabase = createClient();

  const url = new URL("/", request.url);
  const nextUrl = request.nextUrl;

  const { data } = await supabase.auth.getUser();

  // Not authenticated, public routes
  if (!data.user && publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Not authenticated, private routes
  if (!data.user) {
    const encodedSearchParams = `${url.pathname.substring(1)}${url.search}`;
    const newUrl = new URL("/signin", url);
    newUrl.searchParams.append("return_to", encodedSearchParams);

    return NextResponse.redirect(newUrl);
  }

  // Authenticated
  if (data.user && nextUrl.pathname.includes("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
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
