import {
  getCaseStudyBySlug,
  getAllCaseStudies,
  getRelatedCaseStudies,
} from '@/lib/case-studies';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { FadeIn } from '@/components/motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  MetricsDisplay,
  TestimonialBlock,
  WorkflowComparison,
  RelatedCaseStudies,
} from '@/components/case-study';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {};
  }

  return {
    title: `${study.title} | RomAIx Case Studies`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = getRelatedCaseStudies(slug, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/case-studies"
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Case Studies
      </Link>

      <FadeIn>
        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {study.industry}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold">{study.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{study.client}</span>
              <span>&middot;</span>
              <time dateTime={study.date}>
                {format(new Date(study.date), 'MMMM yyyy')}
              </time>
            </div>
          </header>

          {/* Hero Metric */}
          <div className="mb-12 rounded-lg bg-primary/5 p-8">
            <div className="mb-2 text-6xl font-bold text-primary">
              {study.metricValue}
            </div>
            <div className="text-xl text-muted-foreground">{study.metric}</div>
          </div>

          {/* MDX Content */}
          <div className="prose prose-slate mx-auto mb-12 max-w-4xl lg:prose-lg dark:prose-invert">
            <MDXRemote source={study.content} />
          </div>

          {/* Before/After Workflow */}
          {study.beforeWorkflow && study.afterWorkflow && (
            <WorkflowComparison
              beforeImage={study.beforeWorkflow}
              afterImage={study.afterWorkflow}
            />
          )}

          {/* Quantified Results */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">The Results</h2>
            <MetricsDisplay results={study.results} />
          </section>

          {/* Client Testimonial */}
          <TestimonialBlock testimonial={study.testimonial} />

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <RelatedCaseStudies studies={relatedStudies} />
          )}
        </article>
      </FadeIn>
    </div>
  );
}
