import { ContactForm, AssessmentForm, DemoForm } from '@/components/forms'
import { FadeIn } from '@/components/motion'
import { Mail, Clock, MapPin, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with RomAIx for AI automation solutions. Book a demo, request a free assessment, or send us a message.',
}

type FormType = 'demo' | 'assessment' | 'contact'

interface ContactPageProps {
  searchParams: Promise<{ type?: string }>
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@romaix.com',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
  },
  {
    icon: Calendar,
    label: 'Office Hours',
    value: 'Monday - Friday, 9am - 6pm CET',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Based in Europe, serving clients worldwide',
  },
]

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
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Contact Information */}
        <div>
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold">{heading}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {subheading}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right: Form */}
        <FadeIn delay={0.2}>
          <div className="bg-muted/30 p-6 md:p-8 rounded-lg">
            {formType === 'demo' && <DemoForm />}
            {formType === 'assessment' && <AssessmentForm />}
            {formType === 'contact' && <ContactForm />}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
