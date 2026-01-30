import { ImageResponse } from 'next/og';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #587C74 0%, #3d5752 100%)',
          }}
        >
          <div style={{ display: 'flex', fontSize: 64, color: 'white' }}>
            RomAIx Case Study
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Truncate title if too long
  const title =
    study.title.length > 50 ? study.title.slice(0, 47) + '...' : study.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #587C74 0%, #3d5752 100%)',
          padding: 60,
        }}
      >
        {/* Industry badge */}
        <div
          style={{
            display: 'flex',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 24,
              fontSize: 20,
            }}
          >
            {study.industry}
          </div>
        </div>

        {/* Hero metric */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1,
            }}
          >
            {study.metricValue}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: 8,
            }}
          >
            {study.metric}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: '100%',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            RomAIx Case Study
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {study.client}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  return {
    alt: study?.title || 'RomAIx Case Study',
  };
}
