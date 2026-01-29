// Placeholder logos - replace with actual client logos
// Using descriptive names that match what real travel industry clients would be
const logos = [
  { name: 'TravelTech Partners', src: '/logos/placeholder-1.svg' },
  { name: 'Adventure Tours Global', src: '/logos/placeholder-2.svg' },
  { name: 'Coastal Retreats', src: '/logos/placeholder-3.svg' },
  { name: 'Euro Expeditions', src: '/logos/placeholder-4.svg' },
  { name: 'Island Escapes', src: '/logos/placeholder-5.svg' },
  { name: 'Mountain Adventures', src: '/logos/placeholder-6.svg' },
]

export function SocialProof() {
  return (
    <section className="py-12 overflow-hidden bg-muted/30">
      <div className="container px-4 md:px-6 text-center mb-8">
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Trusted by leading travel businesses
        </p>
      </div>

      <div className="relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Marquee container - duplicated logos for seamless loop */}
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              {/* Placeholder: colored div with company initial */}
              {/* Replace with actual Image component when logos are available */}
              <div
                className="h-8 md:h-10 w-24 md:w-32 bg-muted-foreground/20 rounded flex items-center justify-center text-xs text-muted-foreground font-medium grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                title={logo.name}
              >
                {logo.name.split(' ').map(w => w[0]).join('')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative: Uncomment when real logos are available
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
            <Image
              src={logo.src}
              alt={logo.name}
              width={128}
              height={40}
              className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
      */}
    </section>
  )
}
