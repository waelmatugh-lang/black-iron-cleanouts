import Link from 'next/link';

/** Root-level fallback for paths outside a known locale. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          background: '#0f2238',
          color: '#fff',
          margin: 0,
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', margin: 0 }}>404 — Page not found</h1>
        <p style={{ color: '#b0bcca', margin: 0 }}>The page you’re looking for doesn’t exist.</p>
        <Link href="/en" style={{ color: '#43a065', fontWeight: 700 }}>
          Go to homepage
        </Link>
      </body>
    </html>
  );
}
