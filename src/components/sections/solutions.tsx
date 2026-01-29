import { StaggerContainer, StaggerItem } from '@/components/motion'
import { FEATURES, INTEGRATIONS } from '@/data/solutions'
import {
  Bot,
  Workflow,
  Plug,
  MessageSquare,
  BarChart3,
  GitBranch,
} from 'lucide-react'
import Image from 'next/image'

// Map icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Bot,
  Workflow,
  Plug,
  MessageSquare,
  BarChart3,
  GitBranch,
}

export function Solutions() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Solutions That Transform
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            AI-powered automation tools designed specifically for tour operators
            and travel businesses
          </p>
        </div>

        {/* Feature Cards Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          delayChildren={0.2}
          className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Bot
            return (
              <StaggerItem key={feature.id}>
                <div
                  className={`group rounded-xl border-2 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    feature.isHero
                      ? 'border-primary/30 hover:border-primary/50 hover:scale-[1.05]'
                      : 'border-border hover:border-primary/20'
                  }`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg p-3 ${
                      feature.isHero
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    } transition-colors`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Integrations Section */}
        <div className="text-center">
          <p className="mb-8 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Integrates With Your Favorite Tools
          </p>
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="flex aspect-square items-center justify-center rounded-lg border bg-muted/30 p-4 grayscale transition-all hover:bg-muted/50 hover:grayscale-0"
                title={integration.name}
              >
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
