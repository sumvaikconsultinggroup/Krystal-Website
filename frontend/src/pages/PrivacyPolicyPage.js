import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Krystal Magic World - uPVC Doors & Windows</title>
        <meta name="description" content="Privacy Policy for Krystal Magic World. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <Shield className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--accent))]" />
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">Privacy Policy</h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we handle your data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: December 2024
            </p>

            <div className="space-y-12">
              {/* Section 1 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Database className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <p className="text-muted-foreground mb-4">
                      We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li><strong>Contact Information:</strong> Name, email address, phone number, and address when you request a quote or contact us.</li>
                      <li><strong>Project Details:</strong> Information about your property, window/door requirements, and preferences.</li>
                      <li><strong>Communication Data:</strong> Records of your correspondence with us via email, phone, or WhatsApp.</li>
                      <li><strong>Website Usage:</strong> Information about how you use our website, including pages visited and time spent.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Eye className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Respond to your inquiries and provide quotes for our products and services.</li>
                      <li>Schedule site visits, measurements, and installations.</li>
                      <li>Communicate with you about your orders, deliveries, and after-sales service.</li>
                      <li>Send you updates about new products, offers, and promotions (with your consent).</li>
                      <li>Improve our website, products, and customer service.</li>
                      <li>Comply with legal obligations and protect our rights.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Lock className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
                    <p className="text-muted-foreground mb-4">
                      We implement appropriate technical and organizational measures to protect your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Secure SSL encryption for all data transmission on our website.</li>
                      <li>Access controls limiting who can view your information within our organization.</li>
                      <li>Regular security audits and updates to our systems.</li>
                      <li>Secure storage of physical documents containing personal information.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> With trusted partners who assist us in operating our business (e.g., installation teams, delivery services).</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements).</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you use our website. You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.
                </p>
              </div>

              {/* Section 7 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any linked websites you visit.
                </p>
              </div>

              {/* Section 8 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-[hsl(var(--accent))]/10 rounded-xl p-8 border border-[hsl(var(--accent))]/20">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <a href="mailto:privacy@krystalmagicworld.com" className="text-[hsl(var(--accent))] hover:underline">
                      privacy@krystalmagicworld.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <a href="tel:+919220905087" className="text-[hsl(var(--accent))] hover:underline">
                      +91 9220905087
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
