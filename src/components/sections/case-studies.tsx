import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from '@/components/motion'
import { caseStudies } from '@/data/case-studies'

export function CaseStudies() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Real Results for Travel Businesses
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          See how we&apos;ve helped businesses like yours save time, increase conversions, and deliver better customer experiences.
        </p>
      </FadeIn>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <StaggerItem key={study.id}>
            <Card className="h-full border-border hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                {/* Metric prominently displayed with animation */}
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter
                    value={study.metricData.value}
                    prefix={study.metricData.prefix}
                    suffix={study.metricData.suffix}
                    duration={1.5}
                  />
                </div>
                <CardTitle className="text-lg">{study.metric}</CardTitle>
                <CardDescription className="text-sm">
                  {study.client} &middot; {study.industry}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {study.description}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read case study
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
