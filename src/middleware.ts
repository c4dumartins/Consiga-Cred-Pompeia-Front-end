import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignora a própria página de login para não criar loop de redirect
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("adminToken")?.value;

  // Sem token → redireciona pro login com o path original como parâmetro
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token presente → deixa passar e injeta o token no header
  // (útil para Server Components que queiram ler req headers)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-token", token);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Aplica o middleware apenas nas rotas /admin/*
export const config = {
  matcher: ["/admin/:path*"],
};