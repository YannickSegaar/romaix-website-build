import { ContactForm, AssessmentForm, DemoForm } from '@/components/forms'
import { FadeIn } from '@/components/motion'

export const metadata = {
  title: 'Contact Us | RomAIx',
  description: 'Get in touch with RomAIx for AI automation solutions for your travel business.',
}

type FormType = 'demo' | 'assessment' | 'contact'

interface ContactPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const formType: FormType =
    params.type === 'demo' || params.type === 'assessment'
      ? params.type
      : 'contact'

  // Dynamic content based on form type
  const content = {
    demo: {
      heading: 'Book a Demo',
      subheading:
        'See how RomAIx can transform your travel business. Schedule a personalized demo with our team.',
    },
    assessment: {
      heading: 'Get Your Free Assessment',
      subheading:
        'Discover how much time and money you could save with AI automation. Get your custom assessment today.',
    },
    contact: {
      heading: 'Get In Touch',
      subheading:
        'Ready to transform your travel business with AI automation? Drop us a message and we\'ll get back to you within 24 hours.',
    },
  }

  const { heading, subheading } = content[formType]

  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">{heading}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subheading}
        </p>
      </FadeIn>

      <div className="max-w-2xl mx-auto">
        <div className="bg-muted/30 p-6 md:p-8 rounded-lg">
          {formType === 'demo' && <DemoForm />}
          {formType === 'assessment' && <AssessmentForm />}
          {formType === 'contact' && <ContactForm />}
        </div>
      </div>
    </section>
  )
}
