import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
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
            RomAIx Blog
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Truncate title if too long
  const title =
    post.title.length > 60 ? post.title.slice(0, 57) + '...' : post.title;

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
        {/* Category badge */}
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
            {post.category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 700,
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
            RomAIx Blog
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {post.readTime} min read
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
  const post = getPostBySlug(slug);
  return {
    alt: post?.title || 'RomAIx Blog',
  };
}
