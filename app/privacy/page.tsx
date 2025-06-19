import Link from 'next/link'
import { FooterSection } from '@/components/sections/footer-section'

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </h1>

          <div className="space-y-8 text-black font-mono">
            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                1. GDPR COMPLIANCE
              </h2>
              <p className="mb-4">
                This privacy policy complies with the General Data Protection Regulation (GDPR) and other applicable EU privacy laws.
              </p>
              <p className="mb-4">
                We are committed to protecting your personal data and respecting your privacy rights as an EU citizen.
              </p>
              <p>
                You have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                2. DATA CONTROLLER
              </h2>
              <p className="mb-4">
                The data controller for your personal data is the operator of "I Have No Idea" website.
              </p>
              <p>
                We determine the purposes and means of processing your personal data in accordance with GDPR Article 4(7).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                3. WHAT DATA WE COLLECT
              </h2>
              <p className="mb-4">
                <strong>Email Addresses:</strong> When you subscribe to our newsletter, we collect your email address.
              </p>
              <p className="mb-4">
                <strong>Usage Data:</strong> We collect information about how you interact with our website (page views, clicks, time spent).
              </p>
              <p className="mb-4">
                <strong>Technical Data:</strong> IP addresses, browser type, device information, and cookies for website functionality.
              </p>
              <p>
                We do not collect sensitive personal data such as health information, political opinions, or biometric data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                4. LEGAL BASIS FOR PROCESSING
              </h2>
              <p className="mb-4">
                <strong>Newsletter Subscription:</strong> Your explicit consent (GDPR Article 6(1)(a)).
              </p>
              <p className="mb-4">
                <strong>Website Analytics:</strong> Legitimate interest in improving our service (GDPR Article 6(1)(f)).
              </p>
              <p className="mb-4">
                <strong>Essential Cookies:</strong> Necessary for website functionality (GDPR Article 6(1)(f)).
              </p>
              <p>
                You can withdraw consent at any time without affecting the lawfulness of processing based on consent before withdrawal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                5. HOW WE USE YOUR DATA
              </h2>
              <p className="mb-4">
                <strong>Email Marketing:</strong> To send you our weekly newsletter with curated app ideas (with your consent).
              </p>
              <p className="mb-4">
                <strong>Service Improvement:</strong> To analyze website usage and improve user experience.
              </p>
              <p className="mb-4">
                <strong>Legal Compliance:</strong> To comply with legal obligations and respond to lawful requests.
              </p>
              <p>
                We do not use your data for automated decision-making or profiling that produces legal effects.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                6. DATA SHARING AND TRANSFERS
              </h2>
              <p className="mb-4">
                <strong>Newsletter Service:</strong> We use Buttondown (US-based) for email marketing, covered by Standard Contractual Clauses.
              </p>
              <p className="mb-4">
                <strong>Website Hosting:</strong> Data may be processed by hosting providers with appropriate safeguards.
              </p>
              <p className="mb-4">
                <strong>No Sale of Data:</strong> We never sell, rent, or trade your personal data to third parties.
              </p>
              <p>
                All international transfers are protected by appropriate safeguards as required by GDPR Chapter V.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                7. DATA RETENTION
              </h2>
              <p className="mb-4">
                <strong>Newsletter Subscribers:</strong> Until you unsubscribe or request deletion.
              </p>
              <p className="mb-4">
                <strong>Website Analytics:</strong> Up to 26 months for statistical purposes.
              </p>
              <p className="mb-4">
                <strong>Legal Requirements:</strong> Some data may be retained longer to comply with legal obligations.
              </p>
              <p>
                We regularly review and delete data that is no longer necessary for our stated purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                8. YOUR RIGHTS UNDER GDPR
              </h2>
              <p className="mb-4">
                <strong>Right of Access:</strong> Request a copy of your personal data we hold.
              </p>
              <p className="mb-4">
                <strong>Right to Rectification:</strong> Request correction of inaccurate personal data.
              </p>
              <p className="mb-4">
                <strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten").
              </p>
              <p className="mb-4">
                <strong>Right to Restrict Processing:</strong> Request limitation of processing in certain circumstances.
              </p>
              <p className="mb-4">
                <strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.
              </p>
              <p className="mb-4">
                <strong>Right to Object:</strong> Object to processing based on legitimate interests.
              </p>
              <p>
                To exercise these rights, contact us through our website. We will respond within one month.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                9. COOKIES AND TRACKING
              </h2>
              <p className="mb-4">
                <strong>Essential Cookies:</strong> Required for website functionality and user experience.
              </p>
              <p className="mb-4">
                <strong>Analytics Cookies:</strong> Used to understand website usage and improve our service.
              </p>
              <p className="mb-4">
                You can control cookies through your browser settings, but this may affect website functionality.
              </p>
              <p>
                We comply with the ePrivacy Directive (Cookie Law) and obtain consent where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                10. DATA SECURITY
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal data.
              </p>
              <p className="mb-4">
                This includes encryption, access controls, and regular security assessments.
              </p>
              <p className="mb-4">
                In case of a data breach, we will notify the relevant supervisory authority within 72 hours.
              </p>
              <p>
                High-risk breaches will be communicated to affected individuals without undue delay.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                11. CHILDREN'S PRIVACY
              </h2>
              <p className="mb-4">
                Our service is not intended for children under 16 years of age.
              </p>
              <p className="mb-4">
                We do not knowingly collect personal data from children under 16.
              </p>
              <p>
                If you become aware that a child has provided personal data, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                12. UPDATES TO THIS POLICY
              </h2>
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
              </p>
              <p className="mb-4">
                Significant changes will be communicated through our website or email notifications.
              </p>
              <p>
                We encourage you to review this policy periodically for any updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                13. CONTACT AND COMPLAINTS
              </h2>
              <p className="mb-4">
                For privacy-related questions or to exercise your rights, contact us through our website.
              </p>
              <p className="mb-4">
                You have the right to lodge a complaint with your local data protection authority.
              </p>
              <p>
                EU citizens can find their local authority at: https://edpb.europa.eu/about-edpb/about-edpb/members_en
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