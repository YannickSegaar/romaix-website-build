import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

interface CaseStudyCardProps {
  slug: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  metricValue: string;
  description: string;
}

export function CaseStudyCard({
  slug,
  title,
  client,
  industry,
  metric,
  metricValue,
  description,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug}`} className="group block">
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="mb-2">
            <span className="text-4xl font-bold text-primary md:text-5xl">
              {metricValue}
            </span>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {metric}
            </p>
          </div>
          <CardDescription>
            {client} &bull; {industry}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-4 line-clamp-3 text-muted-foreground">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
            Read case study
            <ArrowRight className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
