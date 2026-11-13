import type { ProjectMeta } from "@/types";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES — Nombre d'images par galerie
   ════════════════════════════════════════════════════════════════ */
const GALLERY_COUNT = {
  unikin: 7,
  kinalert: 17,
  kimiaa: 6,
  leoon: 5,
  bkj: 10,
};

/**
 * Génère automatiquement un tableau de chemins d'images de galerie.
 */
function generateGallery(prefix: string, count: number, ext: string = "webp"): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/projects/gallery/${prefix}-${i + 1}.${ext}`
  );
}

/**
 * Liste des projets, dans l'ordre d'affichage souhaité.
 */
export const PROJECTS_META: ProjectMeta[] = [
  {
    id: "unikin",
    cover: "/images/projects/projet-1.webp",
    gallery: generateGallery("coupon", GALLERY_COUNT.unikin),
  },
  {
    id: "kinalert",
    cover: "/images/projects/projet-5.jpg",
    gallery: generateGallery("kin", GALLERY_COUNT.kinalert),
    links: [
      { labelKey: "viewUserApp", url: "https://kin-alert-mobile.vercel.app/" },
      { labelKey: "viewAdminApp", url: "https://kin-alert-admin.vercel.app/" },
    ],
  },
  {
    id: "kimia",
    cover: "/images/projects/projet-3.webp",
    gallery: generateGallery("kimiaa", GALLERY_COUNT.kimiaa),
    links: [{ labelKey: "viewDemo", url: "https://kimia-care.netlify.app/" }],
  },
  {
    id: "leon",
    cover: "/images/projects/projet-6.webp",
    gallery: generateGallery("leoon", GALLERY_COUNT.leoon),
    links: [{ labelKey: "viewDemo", url: "https://mdautowash-by-leo.vercel.app/" }],
  },
  {
    id: "bkj",
    cover: "/images/projects/projet-7.webp",
    gallery: generateGallery("bkj", GALLERY_COUNT.bkj),
    links: [{ labelKey: "viewDemo", url: "https://bkjservice.vercel.app/" }],
  },
];