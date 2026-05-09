import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | HT Assurance",
  description:
    "Politique de confidentialité HT Assurance : utilisation de vos données personnelles, cookies, Google Analytics, reCAPTCHA, Maps, et vos droits RGPD.",
  alternates: {
    canonical: "https://www.htassurance.fr/politique-confidentialite",
  },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            ← Retour
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 prose-slate">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-slate-500 text-sm mb-10">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <Section title="1. Responsable du traitement">
            <p>
              HT Assurance, cabinet de courtage en assurance, dont le siège est
              situé au 25 rue Trachel, 06000 Nice. Coordonnées de contact :
              <br />
              <a href="mailto:talelhakimi06@gmail.com" className="text-blue-600 underline">
                talelhakimi06@gmail.com
              </a>{" "}
              · <a href="tel:+33986113257" className="text-blue-600 underline">09 86 11 32 57</a>
            </p>
          </Section>

          <Section title="2. Données collectées et finalités">
            <p>Nous collectons et traitons vos données dans 4 cas précis :</p>
            <ul>
              <li>
                <strong>Formulaire de contact</strong> : prénom, téléphone,
                email, type d&apos;assurance souhaité. Finalité : vous recontacter
                pour vous proposer un audit ou un devis. Base légale : consentement.
              </li>
              <li>
                <strong>Comparateur ELIA</strong> : conversation, immatriculation
                ou SIRET si fournis. Finalité : produire un comparatif personnalisé.
                Base légale : exécution d&apos;une demande pré-contractuelle.
              </li>
              <li>
                <strong>Mesure d&apos;audience (Google Analytics 4)</strong> : page
                visitée, durée de visite, source, ville approximative.
                Finalité : améliorer le site. Base légale : consentement
                explicite via la bannière cookies.
              </li>
              <li>
                <strong>Protection anti-spam (reCAPTCHA v3)</strong> : Google
                analyse votre comportement sur la page (mouvements souris,
                vitesse de saisie). Finalité : empêcher l&apos;envoi automatique de
                formulaires. Base légale : intérêt légitime.
              </li>
            </ul>
          </Section>

          <Section title="3. Durée de conservation">
            <ul>
              <li>Demandes de contact : <strong>3 ans</strong> après le dernier échange.</li>
              <li>Devis non concrétisés : <strong>3 ans</strong>.</li>
              <li>Contrats souscrits : <strong>10 ans</strong> après la fin du contrat (article L114-1 du Code des assurances).</li>
              <li>Cookies de mesure d&apos;audience : <strong>13 mois maximum</strong>.</li>
            </ul>
          </Section>

          <Section title="4. Destinataires et sous-traitants">
            <p>Vos données sont traitées par :</p>
            <ul>
              <li><strong>HT Assurance</strong> (responsable de traitement).</li>
              <li><strong>Resend</strong> (envoi des emails depuis le formulaire) — Hébergé en Europe.</li>
              <li><strong>Google LLC</strong> (Analytics, reCAPTCHA, Maps) — Données potentiellement transférées hors UE, sous Data Privacy Framework.</li>
              <li><strong>Vercel Inc.</strong> (hébergeur du site) — USA, sous Standard Contractual Clauses.</li>
              <li><strong>Anthropic / OpenAI</strong> (via le comparateur ELIA) — Données strictement nécessaires à la conversation.</li>
            </ul>
            <p>
              Vos données ne sont <strong>jamais</strong> revendues ni
              transmises à des partenaires commerciaux à des fins de prospection.
            </p>
          </Section>

          <Section title="5. Cookies et traceurs">
            <p>
              Le détail exhaustif des cookies déposés est disponible sur la page{" "}
              <Link href="/cookies" className="text-blue-600 underline">/cookies</Link>.
              Vous pouvez à tout moment modifier votre consentement via le
              bouton <em>« Gérer mes cookies »</em> en bas de page.
            </p>
          </Section>

          <Section title="6. Services Google utilisés">
            <ul>
              <li>
                <strong>Google Analytics 4</strong> : mesure d&apos;audience anonymisée.
                IP tronquée, signaux publicitaires désactivés. Chargé{" "}
                <strong>uniquement après consentement explicite</strong>.
              </li>
              <li>
                <strong>Google reCAPTCHA v3</strong> : protection anti-spam des
                formulaires. Voir{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  policies.google.com/privacy
                </a>{" "}
                et{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  policies.google.com/terms
                </a>
                .
              </li>
              <li>
                <strong>Google Maps</strong> : affichage des plans d&apos;accès aux
                bureaux. Le chargement de la carte peut entraîner le dépôt de
                cookies par Google.
              </li>
            </ul>
          </Section>

          <Section title="7. Vos droits">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous
              disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d&apos;accès et de copie de vos données</li>
              <li>Droit de rectification</li>
              <li>Droit d&apos;effacement (« droit à l&apos;oubli »)</li>
              <li>Droit d&apos;opposition au traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit de retirer votre consentement à tout moment</li>
              <li>Droit d&apos;introduire une réclamation auprès de la CNIL</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:talelhakimi06@gmail.com" className="text-blue-600 underline">
                talelhakimi06@gmail.com
              </a>{" "}
              en précisant votre demande. Nous vous répondrons sous 30 jours.
            </p>
            <p>
              En cas de réponse insatisfaisante, vous pouvez introduire une
              réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                CNIL
              </a>
              .
            </p>
          </Section>

          <Section title="8. Sécurité">
            <p>
              Nous mettons en œuvre les mesures techniques et organisationnelles
              raisonnables pour protéger vos données : chiffrement en transit
              (HTTPS), accès restreint aux services internes, journaux d&apos;accès,
              rotation régulière des clés API, sauvegardes chiffrées.
            </p>
          </Section>
        </article>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9 text-slate-700 leading-relaxed [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:mb-3 [&_strong]:text-slate-900">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
