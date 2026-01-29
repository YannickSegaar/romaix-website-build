import { Mail, Phone, MapPin } from 'lucide-react'
import { FadeIn } from '@/components/motion'
import { ContactForm } from '@/components/forms'

export function Contact() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ready to transform your travel business with AI automation?
          Drop us a message and we'll get back to you within 24 hours.
        </p>
      </FadeIn>

      <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Why Work With Us?</h3>
            <p className="text-muted-foreground">
              We specialize in AI automation for travel businesses. Our solutions are
              tailored specifically to tour operators, travel agencies, and boutique hotels—
              helping you save time, reduce costs, and deliver exceptional customer experiences.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">hello@romaix.io</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Business Hours</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-muted/30 p-6 md:p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
