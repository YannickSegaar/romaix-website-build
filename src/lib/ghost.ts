/**
 * Ghost Content API client — romaix.ai
 * Uses native fetch (no SDK). Configured via env vars.
 *
 * GHOST_URL=http://187.124.168.142:2368
 * GHOST_CONTENT_API_KEY=3cff02bcf6fc380d3adbf6b915
 */

const GHOST_URL =
  process.env.GHOST_URL || "http://187.124.168.142:2368";
const GHOST_KEY =
  process.env.GHOST_CONTENT_API_KEY || "3cff02bcf6fc380d3adbf6b915";

export type GhostTag = { id: string; name: string; slug: string };
export type GhostAuthor = {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
};

export type GhostPost = {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  primary_tag: GhostTag | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
};

async function ghostFetch(endpoint: string): Promise<Response> {
  const sep = endpoint.includes("?") ? "&" : "?";
  const url = `${GHOST_URL}/ghost/api/content/${endpoint}${sep}key=${GHOST_KEY}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Ghost API error: ${res.status} — ${url}`);
  return res;
}

/** All published posts, newest first, excluding the default "coming-soon" placeholder. */
export async function getAllPosts(): Promise<GhostPost[]> {
  const res = await ghostFetch(
    "posts/?limit=all&include=tags,authors&filter=visibility:public&order=published_at+DESC"
  );
  const data = await res.json();
  const posts: GhostPost[] = data.posts ?? [];
  return posts.filter((p) => p.slug !== "coming-soon");
}

/** Single post by slug. Returns null if not found. */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const res = await ghostFetch(`posts/slug/${slug}/?include=tags,authors`);
    const data = await res.json();
    return (data.posts?.[0] as GhostPost) ?? null;
  } catch {
    return null;
  }
}

/** All post slugs for generateStaticParams. */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

/** Unique tag/category names from all posts. */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const cats = posts.map((p) => p.primary_tag?.name ?? "General");
  return [...new Set(cats)].sort();
}
