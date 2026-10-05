// Icône GitHub en SVG pur (officielle, simplifiée), aucune dépendance externe.
// "currentColor" permet de changer sa couleur via une classe Tailwind (text-*)
export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.18c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.6-3.37-1.21-3.37-1.21-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.54 2.34 1.09 2.91.84.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.12-4.56-4.97 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 2.5-.34c.85 0 1.71.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.4.2 2.43.1 2.69.64.7 1.03 1.59 1.03 2.69 0 3.86-2.34 4.71-4.57 4.96.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.18C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}