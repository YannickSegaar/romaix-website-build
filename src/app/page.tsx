import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Spacer to enable scrolling for animation testing */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Scroll down to test animations</h1>
      </div>

      {/* FadeIn test */}
      <section className="py-16 px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-4">FadeIn Animation</h2>
          <p className="text-muted-foreground">This content fades in when scrolled into view.</p>
        </FadeIn>
      </section>

      {/* SlideIn test */}
      <section className="py-16 px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <Card>
              <CardHeader>
                <CardTitle>Slide from Left</CardTitle>
              </CardHeader>
              <CardContent>Content slides in from the left.</CardContent>
            </Card>
          </SlideIn>
          <SlideIn direction="right" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Slide from Right</CardTitle>
              </CardHeader>
              <CardContent>Content slides in from the right with delay.</CardContent>
            </Card>
          </SlideIn>
        </div>
      </section>

      {/* StaggerContainer test */}
      <section className="py-16 px-8">
        <h2 className="text-2xl font-bold mb-8">Staggered Grid</h2>
        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <StaggerItem key={i}>
              <Card>
                <CardHeader>
                  <CardTitle>Card {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>Action</Button>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Component test section (preserved) */}
      <section className="py-16 px-8 space-y-8">
        <h2 className="text-2xl font-bold mb-8">Component Test</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Buttons</h3>
          <div className="flex gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Card</h3>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content with brand styling.</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Form Elements</h3>
          <div className="max-w-md space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">End of animation test</p>
      </div>
    </main>
  )
}
