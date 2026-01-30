import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
}

export function BlogCard({
  slug,
  title,
  description,
  date,
  category,
  readTime,
  image,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-primary">{category}</span>
            <span className="text-muted-foreground">•</span>
            <time className="text-muted-foreground" dateTime={date}>
              {format(new Date(date), 'MMM d, yyyy')}
            </time>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{readTime} min read</span>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-4 line-clamp-3 text-muted-foreground">
            {description}
          </p>
          <span className="inline-flex items-center text-sm font-medium text-primary">
            Read more →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
