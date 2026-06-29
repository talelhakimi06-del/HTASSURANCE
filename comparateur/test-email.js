const fs = require("fs");
const env = fs.readFileSync(".env.local", "utf8");
const key = env.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();
if (!key) { console.log("RESEND_API_KEY non trouvee"); process.exit(1); }
console.log("Cle trouvee, longueur:", key.length);
const { Resend } = require("resend");
const r = new Resend(key);
r.emails.send({
  from: "ELIA <onboarding@resend.dev>",
  to: "talelhakimi06@gmail.com",
  subject: "TEST - les notifications marchent",
  html: "<h1>OK</h1><p>Les emails de leads sont operationnels.</p>"
}).then(d => console.log("Resultat:", JSON.stringify(d)))
  .catch(e => console.error("Erreur:", e));
