import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'
import { Target, Compass, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the RomAIx team and learn about our mission to transform the travel industry with intelligent AI automation solutions.',
}

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We measure success by your business outcomes. Every solution we build is designed to deliver measurable ROI through time savings, cost reduction, and improved guest satisfaction.',
  },
  {
    icon: Compass,
    title: 'Travel Expertise',
    description: 'We understand the unique challenges of tour operators, travel agencies, and boutique hotels. Our solutions are built specifically for the travel industry, not generic tools adapted from other sectors.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We stay at the forefront of AI technology to bring you cutting-edge automation solutions. From intelligent booking assistants to personalized guest experiences, we leverage the latest advances.',
  },
]

const teamMembers = [
  {
    name: 'Team Member',
    role: 'Founder & CEO',
    initials: 'TM',
    bio: 'Passionate about leveraging AI to transform how travel businesses operate and serve their guests.',
  },
  {
    name: 'Team Member',
    role: 'CTO',
    initials: 'TM',
    bio: 'Experienced technologist focused on building scalable AI solutions that deliver real business value.',
  },
  {
    name: 'Team Member',
    role: 'Head of Operations',
    initials: 'TM',
    bio: 'Dedicated to ensuring smooth implementation and ongoing success for all our travel industry clients.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About RomAIx
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Transforming travel businesses with intelligent automation
          </p>
        </FadeIn>
      </section>

      {/* Mission Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24 border-t">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We exist to help travel businesses thrive in the digital age. Tour operators,
              travel agencies, and boutique hotels face unique challenges: high customer
              expectations, complex booking processes, and the need to deliver personalized
              experiences at scale.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              RomAIx brings the power of AI automation to solve these challenges. We help
              you save time on repetitive tasks, reduce operational costs, and deliver
              exceptional guest experiences that drive loyalty and growth.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Who We Serve</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Tour Operators</span>
                    <p className="text-sm text-muted-foreground">
                      Automate booking confirmations, itinerary updates, and customer communications
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Travel Agencies</span>
                    <p className="text-sm text-muted-foreground">
                      Streamline inquiries, manage multi-channel support, and personalize recommendations
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Boutique Hotels</span>
                    <p className="text-sm text-muted-foreground">
                      Enhance guest experiences with AI concierge and automated service delivery
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <div className="bg-background rounded-lg p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dedicated professionals committed to your success
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.role} delay={index * 0.1}>
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}
