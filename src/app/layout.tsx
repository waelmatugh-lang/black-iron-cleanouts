import type { ReactNode } from 'react';

/**
 * Passthrough root layout. The real <html>/<body> live in
 * app/[locale]/layout.tsx so they can be localized (lang + dir),
 * while app/not-found.tsx renders its own shell for unmatched paths.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
