import type { ReactNode } from 'react';

/**
 * The Studio renders its own full-page UI, so it needs a bare
 * <html>/<body> shell (the localized shell lives under [locale]).
 */
export const metadata = {
  title: 'Black Iron Cleanouts — Content Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
