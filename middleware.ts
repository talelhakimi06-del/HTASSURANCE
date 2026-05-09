import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────
   Protection des routes /admin/* et /api/admin/seo-stats par cookie.

   Mot de passe : process.env.ADMIN_PASSWORD
   Cookie : ht-admin-auth (httpOnly, signé via comparaison constante)
───────────────────────────────────────────────────────────────────── */

export const config = {
  matcher: ["/admin/:path*", "/api/admin/seo-stats"],
};

const PROTECTED_PUBLIC_PATHS = ["/admin/login"]; // accessibles sans cookie

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Routes login/logout exemptées
  if (PROTECTED_PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("ht-admin-auth")?.value;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    // Pas de mot de passe configuré → accès interdit par défaut
    return new NextResponse("Admin protégé non configuré (ADMIN_PASSWORD).", {
      status: 503,
    });
  }

  if (!cookie || cookie !== expected) {
    // /admin/* → redirection login ; /api/* → 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
