import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Terms of Service | RomAIx',
  description: 'RomAIx Terms of Service - Terms and conditions for using our services.',
  openGraph: {
    title: 'Terms of Service | RomAIx',
    description: 'Terms for RomAIx services',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <article className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn>
        <div className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl">
          <h1>Terms of Service</h1>

          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using the RomAIx website and services, you agree to be bound by these Terms
            of Service and all applicable laws and regulations. If you do not agree with any part of these
            terms, you should not use our website or services.
          </p>
          <p>
            These Terms apply to all visitors, users, and clients who access or use our website and services.
            Please read them carefully before engaging with RomAIx.
          </p>

          <h2>Description of Services</h2>
          <p>
            RomAIx provides AI automation consulting and development services specifically designed for the
            travel and hospitality industry. Our services include:
          </p>
          <ul>
            <li>
              <strong>AI Automation Consulting:</strong> Strategic guidance on implementing AI solutions
              to streamline operations and enhance customer experiences.
            </li>
            <li>
              <strong>Custom AI Agent Development:</strong> Design and development of intelligent automation
              agents tailored to your specific business needs.
            </li>
            <li>
              <strong>Workflow Automation:</strong> Implementation of automated workflows to reduce manual
              tasks, minimize errors, and improve efficiency.
            </li>
            <li>
              <strong>Integration Services:</strong> Seamless connection of AI solutions with your existing
              systems, booking platforms, and communication channels.
            </li>
          </ul>
          <p>
            Our services are designed for tour operators, travel agencies, destination management companies,
            and boutique hotels seeking to leverage AI technology for competitive advantage.
          </p>

          <h2>User Responsibilities</h2>
          <p>When using our website and services, you agree to:</p>
          <ul>
            <li>
              <strong>Provide Accurate Information:</strong> Supply truthful, current, and complete information
              in all forms, assessments, and communications.
            </li>
            <li>
              <strong>Lawful Use:</strong> Use our website and services only for lawful purposes and in
              accordance with these Terms.
            </li>
            <li>
              <strong>No Misrepresentation:</strong> Not impersonate any person or entity, or falsely state
              or misrepresent your affiliation with any person or entity.
            </li>
            <li>
              <strong>Respect Intellectual Property:</strong> Not copy, reproduce, distribute, or create
              derivative works from our website content without express permission.
            </li>
            <li>
              <strong>Security:</strong> Not attempt to gain unauthorized access to any portion of our
              website, systems, or networks.
            </li>
          </ul>

          <h2>Intellectual Property</h2>

          <h3>RomAIx Content</h3>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, and
            software, is the property of RomAIx or its content suppliers and is protected by international
            copyright and intellectual property laws.
          </p>

          <h3>Client Data</h3>
          <p>
            You retain full ownership of all data, information, and content you provide to us in connection
            with our services. We claim no intellectual property rights over your business data.
          </p>

          <h3>Custom Solutions</h3>
          <p>
            Ownership of custom AI solutions, code, and deliverables developed as part of our engagement
            will be specified in your individual service agreement. Typically:
          </p>
          <ul>
            <li>Custom code developed specifically for your project transfers to you upon full payment</li>
            <li>RomAIx retains rights to underlying methodologies, frameworks, and general knowledge</li>
            <li>Third-party components remain subject to their respective licenses</li>
          </ul>

          <h2>Service Engagement</h2>

          <h3>Free Assessments and Demos</h3>
          <p>
            Free assessments and product demonstrations are provided without obligation. Information shared
            during these sessions remains confidential and will not be used for purposes other than evaluating
            potential engagement.
          </p>

          <h3>Project Agreements</h3>
          <p>
            All paid services require a separate written agreement (proposal, contract, or statement of work)
            that outlines:
          </p>
          <ul>
            <li>Specific scope of services</li>
            <li>Project timeline and milestones</li>
            <li>Pricing and payment terms</li>
            <li>Deliverables and acceptance criteria</li>
            <li>Confidentiality obligations</li>
          </ul>

          <h2>Payment Terms</h2>
          <p>
            Payment terms for our services are as follows:
          </p>
          <ul>
            <li>
              <strong>Custom Quotes:</strong> All projects receive a custom quote based on scope and complexity.
            </li>
            <li>
              <strong>Payment Schedule:</strong> Specific payment milestones are defined in your service agreement,
              typically including an initial deposit and milestone-based payments.
            </li>
            <li>
              <strong>Invoicing:</strong> Invoices are payable within 30 days unless otherwise specified in
              your agreement.
            </li>
            <li>
              <strong>Late Payments:</strong> Overdue amounts may incur interest at the rate specified in
              your service agreement.
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law:
          </p>
          <ul>
            <li>
              <strong>Services &quot;As Is&quot;:</strong> Our website and services are provided on an &quot;as is&quot;
              and &quot;as available&quot; basis without warranties of any kind, either express or implied.
            </li>
            <li>
              <strong>No Indirect Damages:</strong> RomAIx shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of profits, data, or business
              opportunities.
            </li>
            <li>
              <strong>Maximum Liability:</strong> Our total liability for any claims arising from our services
              shall not exceed the total fees paid by you to RomAIx in the twelve (12) months preceding the claim.
            </li>
          </ul>
          <p>
            Nothing in these Terms excludes or limits liability for death or personal injury caused by
            negligence, fraud, or any other liability that cannot be excluded by law.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any proprietary or sensitive information shared during
            our engagement. This includes but is not limited to:
          </p>
          <ul>
            <li>Business strategies and plans</li>
            <li>Technical specifications and system details</li>
            <li>Customer data and analytics</li>
            <li>Pricing and financial information</li>
          </ul>
          <p>
            Confidentiality obligations survive the termination of our engagement for a period of three (3)
            years unless otherwise specified in your service agreement.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate the use of our services:
          </p>
          <ul>
            <li>
              <strong>Website Access:</strong> We reserve the right to terminate or suspend access to our
              website at any time, without prior notice, for conduct that violates these Terms.
            </li>
            <li>
              <strong>Service Agreements:</strong> Termination of paid services is governed by the terms
              of your individual service agreement.
            </li>
          </ul>
          <p>
            Upon termination:
          </p>
          <ul>
            <li>Any outstanding payments become immediately due</li>
            <li>We will provide reasonable assistance in transitioning work in progress</li>
            <li>Confidentiality obligations continue as specified</li>
            <li>You may request deletion of your data per our Privacy Policy</li>
          </ul>

          <h2>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the
            European Union and the applicable member state where RomAIx is established. Any disputes arising
            from these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
          </p>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will
            continue in full force and effect.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. When we make changes:
          </p>
          <ul>
            <li>We will update the &quot;Last updated&quot; date at the top of this page</li>
            <li>For material changes, we will provide notice through our website or via email</li>
            <li>Continued use of our website after changes constitutes acceptance of the updated Terms</li>
          </ul>
          <p>
            If you have an active service agreement, any changes to these Terms will not affect the terms
            of your existing agreement until renewal.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@romaix.ai">hello@romaix.ai</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="/contact">Contact Form</a>
            </li>
          </ul>
          <p>
            We are committed to addressing any questions or concerns promptly and professionally.
          </p>
        </div>
      </FadeIn>
    </article>
  )
}
