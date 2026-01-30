import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogPostSchema, type BlogPostMetadata } from './schemas/blog';
import { readingTime } from 'reading-time-estimator';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const posts = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Validate frontmatter with Zod
    const metadata = blogPostSchema.parse(data);

    // Calculate read time if not provided
    const readTimeMinutes =
      metadata.readTime || Math.ceil(readingTime(content).minutes);

    return {
      slug,
      content,
      ...metadata,
      readTime: readTimeMinutes,
    };
  });

  // Sort by date descending (newest first)
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  try {
    const metadata = blogPostSchema.parse(data);
    const readTimeMinutes =
      metadata.readTime || Math.ceil(readingTime(content).minutes);

    return {
      slug,
      content,
      ...metadata,
      readTime: readTimeMinutes,
    };
  } catch (error) {
    console.error(`Error parsing post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from posts
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return categories.sort();
}

/**
 * Get all posts in a specific category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}
