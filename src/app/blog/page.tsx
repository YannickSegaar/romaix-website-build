import { getAllPosts } from '@/lib/ghost';
import { BlogGrid, CategoryFilter } from '@/components/blog';
import { FadeIn } from '@/components/motion';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AI automation, workflow optimization, and technology for tour operators, travel agencies, and boutique hotels.',
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category;

  const ghostPosts = await getAllPosts();

  // Map GhostPost → shape expected by BlogCard / BlogGrid
  const allPosts = ghostPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.excerpt ?? '',
    date: p.published_at,
    category: p.primary_tag?.name ?? 'General',
    readTime: p.reading_time || 1,
    image: p.feature_image ?? '/blog-placeholder.jpg',
    // Keep extra fields for compat
    content: '',
    author: p.authors?.[0]?.name ?? 'RomAIx Team',
    tags: p.tags?.map((t) => t.name) ?? [],
  }));

  const categories = [...new Set(allPosts.map((p) => p.category))].sort();

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  const pageTitle = selectedCategory ? `Blog: ${selectedCategory}` : 'Blog';
  const pageSubtitle = selectedCategory
    ? `${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} in ${selectedCategory}`
    : 'Insights on AI automation, workflow optimization, and travel industry technology';

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">{pageTitle}</h1>
          <p className="text-lg text-muted-foreground">{pageSubtitle}</p>
        </header>
      </FadeIn>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
      />

      {/* BlogGrid accepts any array with BlogPost-compatible shape */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <BlogGrid posts={filteredPosts as any} />

      {filteredPosts.length === 0 && selectedCategory && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No posts found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
