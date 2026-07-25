import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────
   Garde d'authentification admin réutilisable côté route handler.

   Le middleware (middleware.ts) protège déjà /admin/* et
   /api/admin/stripe/*, mais on re-vérifie ici en défense en profondeur :
   une route sensible ne doit jamais dépendre uniquement du middleware.

   Cookie : ht-admin-auth === process.env.ADMIN_PASSWORD
───────────────────────────────────────────────────────────────────── */

const COOKIE_NAME = "ht-admin-auth";

/** Comparaison à temps constant pour éviter les attaques temporelles. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Retourne `null` si la requête est authentifiée admin, sinon une
 * NextResponse d'erreur prête à être renvoyée.
 *
 * Usage :
 *   const denied = requireAdmin(req);
 *   if (denied) return denied;
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD non configuré côté serveur" },
      { status: 503 }
    );
  }
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie || !safeEqual(cookie, expected)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}
