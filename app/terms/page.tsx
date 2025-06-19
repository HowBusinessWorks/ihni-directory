import Link from 'next/link'
import { FooterSection } from '@/components/sections/footer-section'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-6 py-3 font-black text-sm uppercase border-4 border-black shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
          >
            ← BACK TO HEIST
          </Link>
        </div>

        <div className="bg-white border-8 border-black p-8 shadow-brutal">
          <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">
            TERMS AND CONDITIONS
          </h1>

          <div className="space-y-8 text-black font-mono">
            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                1. ACCEPTANCE OF TERMS
              </h2>
              <p className="mb-4">
                By accessing and using this website ("I Have No Idea"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p>
                These terms comply with European Union regulations including the Digital Services Act (DSA) and Consumer Rights Directive.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                2. DESCRIPTION OF SERVICE
              </h2>
              <p className="mb-4">
                This website provides a directory of publicly shared app ideas and business concepts. All content is sourced from publicly available information.
              </p>
              <p>
                We operate as an information service provider under EU law. Users can subscribe to our newsletter for curated content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                3. USER OBLIGATIONS
              </h2>
              <p className="mb-4">
                You agree to use this service only for lawful purposes and in accordance with these terms.
              </p>
              <p className="mb-4">
                You must not use the service to engage in any activity that violates EU laws or regulations.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of any account information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                4. INTELLECTUAL PROPERTY
              </h2>
              <p className="mb-4">
                All original content on this website is protected by copyright and other intellectual property laws.
              </p>
              <p className="mb-4">
                Third-party content remains the property of its respective owners. We provide links and references under fair use provisions.
              </p>
              <p>
                Users may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                5. NEWSLETTER SUBSCRIPTION
              </h2>
              <p className="mb-4">
                By subscribing to our newsletter, you consent to receive marketing communications.
              </p>
              <p className="mb-4">
                You can unsubscribe at any time using the link provided in our emails.
              </p>
              <p>
                Subscription data is processed in accordance with our Privacy Policy and GDPR requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                6. LIMITATION OF LIABILITY
              </h2>
              <p className="mb-4">
                We provide this service "as is" without warranties of any kind, express or implied.
              </p>
              <p className="mb-4">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              <p>
                Our maximum liability is limited to the extent permitted by EU consumer protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                7. DISPUTE RESOLUTION
              </h2>
              <p className="mb-4">
                Any disputes arising from these terms shall be resolved through EU-compliant dispute resolution mechanisms.
              </p>
              <p className="mb-4">
                EU consumers have the right to access the European Commission's Online Dispute Resolution platform.
              </p>
              <p>
                These terms are governed by the laws of the European Union and the country of our establishment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                8. CONSUMER RIGHTS
              </h2>
              <p className="mb-4">
                EU consumers have the right to withdraw from newsletter subscriptions within 14 days.
              </p>
              <p className="mb-4">
                You have the right to receive clear information about our services and pricing (where applicable).
              </p>
              <p>
                These terms do not affect your statutory consumer rights under EU law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                9. CHANGES TO TERMS
              </h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time.
              </p>
              <p className="mb-4">
                Significant changes will be communicated to users with appropriate notice periods as required by EU law.
              </p>
              <p>
                Continued use of the service after changes constitutes acceptance of new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                10. CONTACT INFORMATION
              </h2>
              <p className="mb-4">
                For questions about these terms, please contact us through our website.
              </p>
              <p>
                EU users have the right to contact their local consumer protection authorities.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t-4 border-black">
              <p className="text-sm">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-EU')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}