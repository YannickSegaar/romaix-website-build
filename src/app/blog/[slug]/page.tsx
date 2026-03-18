import { getPostBySlug, getAllPostSlugs } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { FadeIn } from '@/components/motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { blogPostingSchema } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 60;
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.published_at,
      authors: post.authors?.map((a) => a.name),
      images: post.feature_image ? [{ url: post.feature_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd schema={blogPostingSchema(post)} />

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <FadeIn>
          <article>
            {/* Header */}
            <header className="mb-8">
              {post.primary_tag && (
                <div className="mb-4">
                  <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.primary_tag.name}
                  </span>
                </div>
              )}
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm flex-wrap">
                <time dateTime={post.published_at}>
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </time>
                {post.authors?.[0] && (
                  <>
                    <span>·</span>
                    <span>{post.authors[0].name}</span>
                  </>
                )}
                {post.reading_time > 0 && (
                  <>
                    <span>·</span>
                    <span>{post.reading_time} min read</span>
                  </>
                )}
              </div>
            </header>

            {/* Feature Image */}
            {post.feature_image && (
              <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Ghost HTML content */}
            <div
              className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl"
              dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs bg-muted px-3 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </FadeIn>
      </div>
    </>
  );
}
