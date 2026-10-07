import type { ProjectMeta } from "@/types";

/* ════════════════════════════════════════════════════════════════
   🎛️  ZONE DE RÉGLAGES — Nombre d'images par galerie
   
   ⚠️ Si le nombre réel d'images diffère de ce qui est indiqué ici,
   change UNIQUEMENT le chiffre correspondant. Tout le reste du
   projet (la modale, le carrousel) s'adapte automatiquement.
   ════════════════════════════════════════════════════════════════ */
const GALLERY_COUNT = {
  unikin: 7,
  kinalert: 17,
  kimia: 6,
  jolka: 6,
};

/**
 * Génère automatiquement un tableau de chemins d'images de galerie.
 * Exemple : generateGallery("coupon", 7) retourne :
 * ["/images/projects/gallery/coupon-1.webp", ..., ".../coupon-7.webp"]
 *
 * Évite d'avoir à écrire les 7+17+6+6 = 36 chemins d'images à la main.
 */
function generateGallery(prefix: string, count: number, ext: string = "webp"): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/projects/gallery/${prefix}-${i + 1}.${ext}`
  );
}

/**
 * Liste des 4 projets, dans l'ordre d'affichage souhaité.
 * Le texte complet (titre, description, fonctionnalités...) vit dans
 * i18n/fr.json et i18n/en.json sous la clé "projects.items.<id>".
 */
export const PROJECTS_META: ProjectMeta[] = [
  {
    id: "unikin",
    cover: "/images/projects/projet-1.webp",
    gallery: generateGallery("coupon", GALLERY_COUNT.unikin),
  },
  {
    id: "kinalert",
    cover: "/images/projects/projet-2.webp",
    gallery: generateGallery("kin", GALLERY_COUNT.kinalert),
  },
  {
    id: "kimia",
    // ⚠️ Seule cette couverture est en .png — les autres sont en .webp
    cover: "/images/projects/projet-3.png",
    gallery: generateGallery("kimia", GALLERY_COUNT.kimia),
  },
  {
    id: "jolka",
    cover: "/images/projects/projet-4.webp",
    gallery: generateGallery("jolka", GALLERY_COUNT.jolka),
    demoUrl: "https://site-webnova.web.app/jolka",
  },
];