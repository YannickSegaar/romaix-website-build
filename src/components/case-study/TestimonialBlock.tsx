import { Quote } from 'lucide-react';
import { FadeIn } from '@/components/motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialBlockProps {
  testimonial: Testimonial;
}

export function TestimonialBlock({ testimonial }: TestimonialBlockProps) {
  return (
    <FadeIn>
      <section className="bg-muted/50 rounded-lg p-8 my-12">
        <Quote className="h-12 w-12 text-primary/20 mb-4" />
        <blockquote className="text-xl italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <p className="text-muted-foreground">
          {testimonial.author}, {testimonial.role} at {testimonial.company}
        </p>
      </section>
    </FadeIn>
  );
}
