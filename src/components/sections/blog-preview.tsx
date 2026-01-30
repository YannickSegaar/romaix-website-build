import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog';
import { FadeIn } from '@/components/motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  // Don't render section if no posts exist
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our thoughts on AI automation and the travel industry
            </p>
          </div>
        </FadeIn>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={0.1 * index}>
              <BlogCard
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                category={post.category}
                readTime={post.readTime || 5}
                image={post.image}
              />
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
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
