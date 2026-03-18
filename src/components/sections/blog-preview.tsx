import { getAllPosts } from '@/lib/ghost';
import { BlogCard } from '@/components/blog';
import { FadeIn } from '@/components/motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export async function BlogPreview() {
  const ghostPosts = await getAllPosts();

  const posts = ghostPosts.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.excerpt ?? '',
    date: p.published_at,
    category: p.primary_tag?.name ?? 'General',
    readTime: p.reading_time || 1,
    image: p.feature_image ?? '/blog-placeholder.jpg',
  }));

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our thoughts on AI automation and the travel industry
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={0.1 * index}>
              <BlogCard
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
                image={post.image}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/blog" className="inline-flex items-center gap-2">
                View all posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
