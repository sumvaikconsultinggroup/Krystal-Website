import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Truck, CreditCard, Wrench, Mail, Phone } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Krystal Magic World - uPVC Doors & Windows</title>
        <meta name="description" content="Terms of Service for Krystal Magic World. Read our terms and conditions for purchasing uPVC doors and windows." />
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
              <FileText className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--accent))]" />
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">Terms of Service</h1>
              <p className="text-white/80 max-w-2xl mx-auto">
                Please read these terms carefully before using our services.
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
                  <CheckCircle className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing our website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, customers, and users of our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Wrench className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
                    <p className="text-muted-foreground mb-4">
                      Krystal Magic World provides:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Premium uPVC windows and doors</li>
                      <li>Professional measurement and consultation services</li>
                      <li>Expert installation by trained technicians</li>
                      <li>After-sales support and maintenance services</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      All products are manufactured to high quality standards and comply with relevant industry specifications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">3. Quotations and Pricing</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All quotations are valid for 30 days from the date of issue unless otherwise specified.</li>
                  <li>Prices are subject to change based on material costs and specifications.</li>
                  <li>Final pricing will be confirmed after site measurement and detailed specification review.</li>
                  <li>GST and other applicable taxes will be added as per government regulations.</li>
                  <li>Custom designs or non-standard specifications may incur additional charges.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li><strong>Booking Advance:</strong> 50% of the total order value at the time of order confirmation.</li>
                      <li><strong>Before Dispatch:</strong> 40% before the products are dispatched for installation.</li>
                      <li><strong>After Installation:</strong> Remaining 10% upon successful completion of installation.</li>
                      <li>We accept payment via bank transfer, cheque, UPI, and major credit/debit cards.</li>
                      <li>Orders will not proceed to manufacturing without receipt of the booking advance.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Truck className="w-8 h-8 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">5. Delivery and Installation</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Standard delivery time is 3-4 weeks from order confirmation, subject to specifications.</li>
                      <li>Installation will be scheduled within 3-5 business days of delivery.</li>
                      <li>The customer must ensure clear access to the installation site.</li>
                      <li>Any civil work required will be the customer's responsibility unless agreed otherwise.</li>
                      <li>Delays due to customer-side issues may result in additional storage charges.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">6. Warranty</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>uPVC Profiles:</strong> 10-year warranty against manufacturing defects.</li>
                  <li><strong>Hardware:</strong> 2-year warranty on handles, locks, and hinges.</li>
                  <li><strong>Glass:</strong> 5-year warranty on sealed units against fogging.</li>
                  <li><strong>Installation:</strong> 1-year warranty on installation workmanship.</li>
                  <li>Warranty does not cover damage from misuse, accidents, or natural disasters.</li>
                  <li>Regular maintenance as per our guidelines is required to maintain warranty validity.</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">7. Cancellation and Refunds</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Orders may be cancelled within 48 hours of confirmation for a full refund.</li>
                      <li>Cancellation after 48 hours but before manufacturing: 80% refund.</li>
                      <li>Cancellation after manufacturing has begun: 50% refund.</li>
                      <li>No refunds for custom or non-standard orders once manufacturing has started.</li>
                      <li>Refunds will be processed within 15 business days.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 8 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">8. Customer Responsibilities</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate measurements and site access for our team.</li>
                  <li>Ensure the installation area is clear and ready before scheduled installation.</li>
                  <li>Report any issues or defects within 7 days of installation.</li>
                  <li>Follow the maintenance guidelines provided by Krystal Magic World.</li>
                  <li>Obtain necessary permissions from housing societies or authorities if required.</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Krystal Magic World's liability is limited to the value of the products and services purchased. We are not liable for any indirect, incidental, or consequential damages. Our maximum liability shall not exceed the total amount paid by the customer for the specific order in question.
                </p>
              </div>

              {/* Section 10 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">10. Dispute Resolution</h2>
                <p className="text-muted-foreground">
                  Any disputes arising from these terms or our services shall be resolved through amicable negotiation first. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana, India.
                </p>
              </div>

              {/* Section 11 */}
              <div className="bg-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">11. Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the modified terms.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-[hsl(var(--accent))]/10 rounded-xl p-8 border border-[hsl(var(--accent))]/20">
                <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Krystal Magic World</strong><br />
                    403, 4th Floor, Greenwood Plaza,<br />
                    Sector-45, Near HSBC Building,<br />
                    Gurgaon - 122003 (Haryana)
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Mail className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <a href="mailto:legal@krystalmagicworld.com" className="text-[hsl(var(--accent))] hover:underline">
                      legal@krystalmagicworld.com
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
