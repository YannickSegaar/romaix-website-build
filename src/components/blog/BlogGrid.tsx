import { BlogCard } from './BlogCard';
import { FadeIn } from '@/components/motion';
import type { BlogPost } from '@/lib/blog';

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <FadeIn key={post.slug} delay={index * 0.1}>
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
  );
}
