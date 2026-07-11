/**
 * The `/studio` route — mounts the embedded Sanity Studio.
 * This is the page the site owner opens to edit content and images.
 *
 * Until a Sanity `projectId` is configured it shows a short setup notice
 * instead of crashing the build.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { sanityEnabled } from '../../../sanity/env';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          textAlign: 'center',
          color: '#1e293b',
          background: '#f8fafc',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Content Studio — almost ready
          </h1>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>
            Add your <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to the
            environment variables to activate the editor.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
