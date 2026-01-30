import { ImageResponse } from 'next/og';

export const alt = 'RomAIx - AI Automation for Travel Industry';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #587C74 0%, #3d5752 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            RomAIx
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            AI Automation for Travel Industry
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
