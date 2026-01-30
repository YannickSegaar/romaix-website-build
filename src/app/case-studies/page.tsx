import { getAllCaseStudies, getAllIndustries } from '@/lib/case-studies';
import { CaseStudyCard, IndustryFilter } from '@/components/case-study';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | RomAIx',
  description:
    'See how we\'ve helped travel businesses save time, increase conversions, and deliver better customer experiences with AI automation.',
};

interface CaseStudiesPageProps {
  searchParams: Promise<{ industry?: string }>;
}

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const params = await searchParams;
  const selectedIndustry = params.industry;

  const allStudies = getAllCaseStudies();
  const industries = getAllIndustries();

  // Filter studies by industry if provided
  const filteredStudies = selectedIndustry
    ? allStudies.filter((study) => study.industry === selectedIndustry)
    : allStudies;

  // Format page title and subtitle
  const pageTitle = selectedIndustry
    ? `Case Studies: ${selectedIndustry}`
    : 'Case Studies';
  const pageSubtitle = selectedIndustry
    ? `${filteredStudies.length} ${filteredStudies.length === 1 ? 'case study' : 'case studies'} in ${selectedIndustry}`
    : 'Real results from real travel businesses';

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">{pageTitle}</h1>
          <p className="text-lg text-muted-foreground">{pageSubtitle}</p>
        </header>
      </FadeIn>

      <IndustryFilter
        industries={industries}
        selectedIndustry={selectedIndustry}
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudies.map((study) => (
          <StaggerItem key={study.slug}>
            <CaseStudyCard
              slug={study.slug}
              title={study.title}
              client={study.client}
              industry={study.industry}
              metric={study.metric}
              metricValue={study.metricValue}
              description={study.description}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filteredStudies.length === 0 && selectedIndustry && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No case studies found in this industry.
          </p>
        </div>
      )}
    </div>
  );
}
