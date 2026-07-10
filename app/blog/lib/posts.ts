import type { Post } from "./types";
import { getMdPosts } from "./mdPosts";

import * as p1 from "../posts/assurance-decennale-etancheite";
import * as p2 from "../posts/assurance-decennale-auto-entrepreneur";
import * as p3 from "../posts/prix-assurance-decennale-artisan";
import * as p4 from "../posts/assurance-decennale-sans-experience";
import * as p5 from "../posts/courtier-assurance-decennale-nice";
import * as p6 from "../posts/assurance-vtc-obligatoire";
import * as p7 from "../posts/assurance-vtc-pas-chere";
import * as p8 from "../posts/assurance-vtc-uber-chauffeur";
import * as p9 from "../posts/assurance-vtc-resilie";
import * as p10 from "../posts/meilleure-assurance-vtc";
import * as p11 from "../posts/rc-pro-consultant";
import * as p12 from "../posts/rc-pro-freelance";
import * as p13 from "../posts/rc-pro-restaurant";
import * as p14 from "../posts/rc-pro-auto-entrepreneur";
import * as p15 from "../posts/changer-assurance-emprunteur";
import * as p16 from "../posts/assurance-emprunteur-moins-chere";
import * as p17 from "../posts/refus-assurance-emprunteur-que-faire";
import * as p18 from "../posts/assurance-locataire-obligatoire";
import * as p19 from "../posts/assurance-pno-definition";
import * as p20 from "../posts/degat-des-eaux-assurance-que-faire";
// Habitation (ajouts)
import * as p21 from "../posts/assurance-residence-secondaire-cote-azur";
import * as p22 from "../posts/multirisque-habitation-garanties-essentielles";
// Sinistres
import * as s1 from "../posts/assurance-refuse-sinistre-que-faire";
import * as s2 from "../posts/motifs-refus-assurance-habitation";
import * as s3 from "../posts/degat-des-eaux-assurance-refuse";
import * as s4 from "../posts/contre-expertise-assurance-comment-faire";
import * as s5 from "../posts/mediateur-assurance-saisine-guide";
import * as s6 from "../posts/lettre-mise-en-demeure-assureur-modele";
import * as s7 from "../posts/sinistre-auto-refuse-assurance-recours";
import * as s8 from "../posts/fissures-secheresse-assurance-catastrophe-naturelle";
import * as s9 from "../posts/assurance-refuse-vol-cambriolage";
import * as s10 from "../posts/indemnisation-insuffisante-assurance-contester";
// Pharmacien
import * as ph1 from "../posts/assurance-pharmacie-officine-garanties";
import * as ph2 from "../posts/assurance-installation-reprise-pharmacie-officine";
import * as ph3 from "../posts/rc-pro-pharmacien-responsabilite-titulaire";

const tsxPosts: Post[] = [
  { ...p1.meta, Content: p1.default },
  { ...p2.meta, Content: p2.default },
  { ...p3.meta, Content: p3.default },
  { ...p4.meta, Content: p4.default },
  { ...p5.meta, Content: p5.default },
  { ...p6.meta, Content: p6.default },
  { ...p7.meta, Content: p7.default },
  { ...p8.meta, Content: p8.default },
  { ...p9.meta, Content: p9.default },
  { ...p10.meta, Content: p10.default },
  { ...p11.meta, Content: p11.default },
  { ...p12.meta, Content: p12.default },
  { ...p13.meta, Content: p13.default },
  { ...p14.meta, Content: p14.default },
  { ...p15.meta, Content: p15.default },
  { ...p16.meta, Content: p16.default },
  { ...p17.meta, Content: p17.default },
  { ...p18.meta, Content: p18.default },
  { ...p19.meta, Content: p19.default },
  { ...p20.meta, Content: p20.default },
  // Habitation (ajouts)
  { ...p21.meta, Content: p21.default },
  { ...p22.meta, Content: p22.default },
  // Sinistres
  { ...s1.meta, Content: s1.default },
  { ...s2.meta, Content: s2.default },
  { ...s3.meta, Content: s3.default },
  { ...s4.meta, Content: s4.default },
  { ...s5.meta, Content: s5.default },
  { ...s6.meta, Content: s6.default },
  { ...s7.meta, Content: s7.default },
  { ...s8.meta, Content: s8.default },
  { ...s9.meta, Content: s9.default },
  { ...s10.meta, Content: s10.default },
  // Pharmacien
  { ...ph1.meta, Content: ph1.default },
  { ...ph2.meta, Content: ph2.default },
  { ...ph3.meta, Content: ph3.default },
];

const tsxSlugs = new Set(tsxPosts.map((p) => p.slug));
const mdPosts: Post[] = getMdPosts().filter((p) => !tsxSlugs.has(p.slug));

export const posts: Post[] = [...tsxPosts, ...mdPosts];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllMeta() {
  return posts.map(({ Content: _Content, ...meta }) => meta);
}
