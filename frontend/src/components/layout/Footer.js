import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_luxury-upvc/artifacts/5hyi3l5x_Black%20and%20White%20Minimalist%20Professional%20Initial%20Logo.png';

const footerLinks = {
  products: [
    { name: 'Casement Windows', href: '/products/casement-windows' },
    { name: 'Sliding Windows', href: '/products/sliding-windows' },
    { name: 'Tilt & Turn Windows', href: '/products/tilt-turn-windows' },
    { name: 'Sliding Doors', href: '/products/sliding-doors' },
    { name: 'Bi-fold Doors', href: '/products/bifold-doors' },
    { name: 'All Products', href: '/products/windows' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'uPVC Windows in Gurugram', href: '/upvc-windows-in-gurugram' },
    { name: 'uPVC Windows in Delhi', href: '/upvc-windows-in-delhi' },
    { name: 'uPVC Windows in Noida', href: '/upvc-windows-in-noida' },
    { name: 'uPVC Doors in Gurugram', href: '/upvc-doors-in-gurugram' },
    { name: 'uPVC Doors in Delhi', href: '/upvc-doors-in-delhi' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white" data-testid="site-footer">
      {/* Main Footer - Compact Layout */}
      <div className="container">
        {/* Top Row - Logo and Description */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-white/10 overflow-hidden">
          <Link to="/" className="inline-block" style={{ marginTop: '-60px', marginBottom: '-80px' }}>
            <img 
              src={LOGO_URL} 
              alt="Krystal - uPVC Doors & Windows" 
              className="w-auto brightness-0 invert"
              loading="lazy"
              style={{ height: '380px' }}
            />
          </Link>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed mb-3" style={{ marginTop: '15px' }}>
            Architectural luxury uPVC doors & windows for Delhi NCR since 2012. 
            Superior acoustic, thermal & dust protection for discerning homes.
          </p>
          {/* Contact Info Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <a
              href="tel:+919220905087"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 text-[hsl(var(--accent))]" />
              <span>+91 9220905087</span>
            </a>
            <a
              href="mailto:sales@krystalmagicworld.com"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 text-[hsl(var(--accent))]" />
              <span>sales@krystalmagicworld.com</span>
            </a>
            <a
              href="https://wa.me/919599614440"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-[hsl(var(--accent))] transition-colors"
              data-testid="footer-whatsapp-link"
            >
              <MessageCircle className="w-5 h-5 text-[hsl(var(--accent))]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Bottom Row - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Products Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Products</h3>
            <ul className="space-y-2.5" data-testid="footer-products-links">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Company</h3>
            <ul className="space-y-2.5" data-testid="footer-company-links">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Service Areas</h3>
            <ul className="space-y-2.5" data-testid="footer-service-links">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Address Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Head Office</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-400 leading-relaxed">
                <p>403, 4th Floor, Greenwood Plaza,</p>
                <p>Sector-45, Near HSBC Building,</p>
                <p>Gurgaon - 122003 (Haryana)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-[hsl(var(--accent))]">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white">Ready to transform your space?</h3>
              <p className="text-white/80 text-sm">Get a free consultation and quote today.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[hsl(var(--accent))] font-medium rounded-md hover:bg-white/90 transition-colors"
              data-testid="footer-cta-button"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {currentYear} Krystal Magic World. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
