import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | HT Assurance",
  description:
    "Mentions légales, RCS, ORIAS, CNIL et politique de confidentialité de HT Assurance, courtier indépendant à Nice.",
  alternates: {
    canonical: "https://www.htassurance.fr/mentions-legales",
  },
  robots: { index: true, follow: true },
};

/* ─────────────────────────────────────────────────────────────────────
   À COMPLÉTER : remplace les valeurs entre [crochets] avec tes vraies
   informations. C'est OBLIGATOIRE pour un courtier en assurance (ORIAS,
   RCS, RC Pro, autorité de contrôle ACPR).
───────────────────────────────────────────────────────────────────── */

const COMPANY = {
  legalName: "[Raison sociale exacte — ex: HT Assurance SARL]",
  status: "[Forme juridique — ex: SARL au capital de 1 000 €]",
  address: "[Adresse complète du siège — ex: 12 rue X, 06000 Nice]",
  rcs: "[N° RCS Nice — ex: 123 456 789]",
  siret: "[SIRET — 14 chiffres]",
  tva: "[N° TVA intracommunautaire — ex: FR XX 123456789]",
  orias: "[N° ORIAS — 8 chiffres, vérifiable sur orias.fr]",
  rcPro: "[Compagnie RC Pro + n° police — ex: MMA n° XXXXX]",
  director: "Talel Hakimi",
  phone: "+33 9 86 11 32 57",
  email: "talelhakimi06@gmail.com",
  hostName: "Vercel Inc.",
  hostAddress: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Mentions légales
          </h1>
          <p className="text-slate-500 text-sm mb-10">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <Section title="Éditeur du site">
            <Field label="Raison sociale" value={COMPANY.legalName} />
            <Field label="Forme juridique" value={COMPANY.status} />
            <Field label="Siège social" value={COMPANY.address} />
            <Field label="RCS" value={COMPANY.rcs} />
            <Field label="SIRET" value={COMPANY.siret} />
            <Field label="TVA intracommunautaire" value={COMPANY.tva} />
            <Field label="Directeur de la publication" value={COMPANY.director} />
            <Field label="Téléphone" value={COMPANY.phone} />
            <Field label="Email" value={COMPANY.email} />
          </Section>

          <Section title="Activité de courtage en assurance">
            <p className="text-slate-700 leading-relaxed mb-3">
              HT Assurance est immatriculée au Registre unique des intermédiaires
              en assurance (ORIAS) sous le numéro :
            </p>
            <p className="font-mono text-lg font-bold text-slate-900 mb-4">
              {COMPANY.orias}
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              Vérifiable sur{" "}
              <a
                href="https://www.orias.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                orias.fr
              </a>
              .
            </p>
            <p className="text-slate-700 leading-relaxed">
              Activité soumise au contrôle de l&apos;Autorité de contrôle prudentiel
              et de résolution (ACPR) — 4 place de Budapest, CS 92459, 75436 Paris
              Cedex 09.
            </p>
          </Section>

          <Section title="Responsabilité civile professionnelle">
            <Field label="Compagnie & police" value={COMPANY.rcPro} />
            <p className="text-slate-700 leading-relaxed text-sm mt-3">
              Conformément aux articles L512-6 et L512-7 du Code des assurances.
            </p>
          </Section>

          <Section title="Hébergement">
            <Field label="Hébergeur" value={COMPANY.hostName} />
            <Field label="Adresse" value={COMPANY.hostAddress} />
          </Section>

          <Section title="Médiation de la consommation">
            <p className="text-slate-700 leading-relaxed">
              Conformément à l&apos;article L612-1 du Code de la consommation, en cas
              de litige non résolu, vous pouvez saisir gratuitement{" "}
              <strong>La Médiation de l&apos;Assurance</strong> :
            </p>
            <p className="mt-3">
              <a
                href="https://www.mediation-assurance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                www.mediation-assurance.org
              </a>
              <br />
              TSA 50110 — 75441 Paris Cedex 09
            </p>
          </Section>

          <Section title="Données personnelles (RGPD)">
            <p className="text-slate-700 leading-relaxed mb-3">
              Les données collectées via les formulaires de ce site servent
              uniquement à traiter votre demande de contact ou de devis. Elles
              ne sont jamais revendues ni cédées à des tiers commerciaux.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
              Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès,
              de rectification, d&apos;effacement, d&apos;opposition et de portabilité
              de vos données. Pour exercer ces droits, contactez :{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                {COMPANY.email}
              </a>
              .
            </p>
            <p className="text-slate-700 leading-relaxed">
              En cas de réponse insatisfaisante, vous pouvez introduire une
              réclamation auprès de la CNIL :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                cnil.fr
              </a>
              .
            </p>
          </Section>

          <Section title="Cookies">
            <p className="text-slate-700 leading-relaxed">
              Ce site utilise Google Analytics pour mesurer son audience de
              façon anonymisée. Aucun cookie publicitaire n&apos;est déposé. Vous
              pouvez configurer votre navigateur pour les refuser.
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p className="text-slate-700 leading-relaxed">
              L&apos;ensemble des contenus de ce site (textes, images, logos,
              graphismes) est la propriété exclusive de HT Assurance ou de ses
              partenaires. Toute reproduction sans autorisation préalable est
              interdite (article L122-4 du Code de la propriété intellectuelle).
            </p>
          </Section>
        </article>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-slate-700 leading-relaxed">
      <span className="font-semibold text-slate-900">{label} :</span>{" "}
      <span className="text-slate-600">{value}</span>
    </p>
  );
}
