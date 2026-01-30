import { CaseStudyCard } from './CaseStudyCard';

interface RelatedStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  metricValue: string;
  description: string;
}

interface RelatedCaseStudiesProps {
  studies: RelatedStudy[];
}

export function RelatedCaseStudies({ studies }: RelatedCaseStudiesProps) {
  if (studies.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Case Studies</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            slug={study.slug}
            title={study.title}
            client={study.client}
            industry={study.industry}
            metric={study.metric}
            metricValue={study.metricValue}
            description={study.description}
          />
        ))}
      </div>
    </section>
  );
}
