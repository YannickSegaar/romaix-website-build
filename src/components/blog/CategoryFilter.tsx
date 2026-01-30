'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string | null) => {
    if (category === null) {
      // Clear category filter (show all)
      router.push('/blog');
    } else {
      // Set category filter
      router.push(`/blog?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? 'default' : 'outline'}
        onClick={() => handleCategoryClick(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
