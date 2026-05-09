import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Connexion admin — HT Assurance",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900 mb-1">Espace admin</h1>
          <p className="text-sm text-slate-500">
            Mot de passe requis pour accéder au dashboard SEO.
          </p>
        </div>
        <Suspense fallback={<div className="h-32" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
