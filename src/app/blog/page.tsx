import { getAllPosts, getAllCategories } from '@/lib/blog';
import { BlogGrid, CategoryFilter } from '@/components/blog';
import { FadeIn } from '@/components/motion';
import type { Metadata } from 'next';

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

  const allPosts = getAllPosts();
  const categories = getAllCategories();

  // Filter posts by category if provided
  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  // Format page title
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

      <BlogGrid posts={filteredPosts} />

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
