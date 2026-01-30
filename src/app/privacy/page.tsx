import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Privacy Policy | RomAIx',
  description: 'RomAIx Privacy Policy - Learn how we collect, use, and protect your data.',
  openGraph: {
    title: 'Privacy Policy | RomAIx',
    description: 'How RomAIx handles your data',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <article className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn>
        <div className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl">
          <h1>Privacy Policy</h1>

          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2>Introduction</h2>
          <p>
            RomAIx (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or use our AI automation consulting services for the travel industry.
          </p>
          <p>
            We are based in the European Union and comply with the General Data Protection Regulation (GDPR)
            and other applicable data protection laws. Please read this policy carefully. If you do not agree
            with the terms of this privacy policy, please do not access our website or use our services.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>We collect information that you voluntarily provide to us, including:</p>
          <ul>
            <li>
              <strong>Contact Form Submissions:</strong> Name, email address, company name, and message content
              when you reach out through our contact form.
            </li>
            <li>
              <strong>Free Assessment Requests:</strong> Business information including company name, business type,
              current technology stack, and automation goals when you request a free assessment.
            </li>
            <li>
              <strong>Demo Bookings:</strong> Name, email, company details, and preferred meeting times when you
              schedule a demonstration of our services.
            </li>
            <li>
              <strong>Email Communications:</strong> Any information you provide when corresponding with us via email.
            </li>
          </ul>

          <h3>Information Automatically Collected</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device and
            usage patterns, including:
          </p>
          <ul>
            <li>
              <strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, approximate location (country/region), and referring URLs.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies to ensure our website functions properly.
              See our Cookies section below for more details.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>
              <strong>Respond to Inquiries:</strong> Process and respond to your contact form submissions,
              assessment requests, and demo bookings.
            </li>
            <li>
              <strong>Provide Services:</strong> Deliver our AI automation consulting services and support
              ongoing client relationships.
            </li>
            <li>
              <strong>Send Updates:</strong> With your explicit consent, send you newsletters, service updates,
              and relevant industry insights.
            </li>
            <li>
              <strong>Improve Our Website:</strong> Analyze usage patterns to enhance user experience,
              optimize content, and improve our services.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes.
            </li>
          </ul>

          <h2>Legal Basis for Processing</h2>
          <p>Under GDPR, we process your personal data based on the following legal grounds:</p>
          <ul>
            <li>
              <strong>Consent:</strong> When you explicitly agree to receive marketing communications or
              submit information through our forms.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> To operate and improve our website, respond to inquiries,
              and provide our services, where these interests do not override your fundamental rights.
            </li>
            <li>
              <strong>Contract Performance:</strong> To fulfill our obligations when you engage our services
              or request a demo or assessment.
            </li>
            <li>
              <strong>Legal Obligation:</strong> When we need to process data to comply with applicable laws.
            </li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your
            information with the following service providers who assist us in operating our website and
            delivering our services:
          </p>
          <ul>
            <li>
              <strong>Vercel:</strong> Our website hosting provider, which may process technical data
              necessary for website delivery and performance.
            </li>
            <li>
              <strong>Resend:</strong> Our email delivery service, which processes email addresses and
              communication content to deliver our emails.
            </li>
          </ul>
          <p>
            These service providers are contractually obligated to protect your data and use it only for
            the purposes specified. They are selected based on their compliance with GDPR and commitment
            to data protection.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes
            outlined in this Privacy Policy:
          </p>
          <ul>
            <li>
              <strong>Contact Submissions:</strong> Retained for up to 3 years after your last interaction
              with us, unless you request earlier deletion.
            </li>
            <li>
              <strong>Client Data:</strong> Retained for the duration of our business relationship plus
              7 years for legal and accounting purposes.
            </li>
            <li>
              <strong>Analytics Data:</strong> Anonymized and retained for up to 26 months for website
              improvement purposes.
            </li>
            <li>
              <strong>Marketing Consent Records:</strong> Retained as long as you remain subscribed,
              plus 3 years after unsubscription for compliance records.
            </li>
          </ul>

          <h2>Your Rights</h2>
          <p>Under GDPR, you have the following rights regarding your personal data:</p>
          <ul>
            <li>
              <strong>Right of Access:</strong> Request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;).
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request limitation of how we process your data.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Request your data in a structured, commonly used,
              machine-readable format.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where we rely on
              consent for processing.
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing based on legitimate interests.
            </li>
            <li>
              <strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection
              authority if you believe we have violated your privacy rights.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:privacy@romaix.ai">privacy@romaix.ai</a>.
          </p>

          <h2>Cookies</h2>
          <p>Our website uses cookies to ensure basic functionality and improve your experience:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly. These cannot
              be disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.
              These are only set with your consent.
            </li>
          </ul>
          <p>
            You can manage your cookie preferences through your browser settings. Note that disabling certain
            cookies may affect website functionality.
          </p>

          <h2>Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS/SSL</li>
            <li>Secure hosting infrastructure with regular security updates</li>
            <li>Access controls limiting data access to authorized personnel</li>
            <li>Regular security assessments and monitoring</li>
          </ul>
          <p>
            While we strive to protect your personal information, no method of transmission over the internet
            or electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries outside the European Economic Area
            (EEA). When we transfer data outside the EEA, we ensure appropriate safeguards are in place, such as
            Standard Contractual Clauses approved by the European Commission.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal
            requirements. We will notify you of any material changes by:
          </p>
          <ul>
            <li>Posting the updated policy on this page with a new &quot;Last updated&quot; date</li>
            <li>Sending an email notification if you have provided your email address</li>
          </ul>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about how we protect
            your information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
            please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@romaix.ai">privacy@romaix.ai</a>
            </li>
            <li>
              <strong>General Inquiries:</strong>{' '}
              <a href="mailto:hello@romaix.ai">hello@romaix.ai</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="/contact">Contact Form</a>
            </li>
          </ul>
          <p>
            We aim to respond to all privacy-related inquiries within 30 days.
          </p>
        </div>
      </FadeIn>
    </article>
  )
}
