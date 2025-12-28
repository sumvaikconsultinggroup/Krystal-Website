import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import QuoteModal from '../common/QuoteModal';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_luxury-upvc/artifacts/5hyi3l5x_Black%20and%20White%20Minimalist%20Professional%20Initial%20Logo.png';

const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Infrastructure', href: '/about#infrastructure' },
    { name: 'Quality & Standards', href: '/about#quality' },
    { name: 'Our Process', href: '/about#process' },
  ],
  windows: [
    { name: 'All Windows', href: '/products/windows' },
    { name: 'Casement Windows', href: '/products/casement-windows' },
    { name: 'Sliding Windows', href: '/products/sliding-windows' },
    { name: 'Tilt & Turn Windows', href: '/products/tilt-turn-windows' },
    { name: 'Fixed Windows', href: '/products/fixed-windows' },
    { name: 'French Windows', href: '/products/french-windows' },
  ],
  doors: [
    { name: 'All Doors', href: '/products/doors' },
    { name: 'Sliding Doors', href: '/products/sliding-doors' },
    { name: 'Casement Doors', href: '/products/casement-doors' },
    { name: 'Bi-fold Doors', href: '/products/bifold-doors' },
    { name: 'Lift & Slide Doors', href: '/products/lift-slide-doors' },
  ],
  resources: [
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Design Studio', href: '/design-studio' },
  ],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  const NavDropdown = ({ label, items, menuKey }) => (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(menuKey)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        className="flex items-center gap-1 py-2 text-sm font-medium text-foreground hover:text-[hsl(var(--accent))] transition-colors nav-link"
        data-testid={`nav-${menuKey}-link`}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === menuKey ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {openMenu === menuKey && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg border border-border p-4 min-w-[220px]">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white'
        }`}
        data-testid="site-header"
      >
        {/* Top Bar */}
        <div className="hidden lg:block border-b border-border">
          <div className="container py-2 flex justify-between items-center text-sm">
            <div className="flex items-center gap-6 text-muted-foreground">
              <span>Serving Delhi NCR since 2012</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="tel:+919220905087"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 9220905087
              </a>
              <a
                href="https://wa.me/919599614440"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]/80 transition-colors"
                data-testid="header-whatsapp-link"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Made larger for better visibility */}
            <Link to="/" className="flex-shrink-0" data-testid="header-logo">
              <img
                src={LOGO_URL}
                alt="Krystal - uPVC Doors & Windows"
                className="h-14 sm:h-16 lg:h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavDropdown label="Company" items={navigation.company} menuKey="company" />
              <NavDropdown label="Windows" items={navigation.windows} menuKey="windows" />
              <NavDropdown label="Doors" items={navigation.doors} menuKey="doors" />
              <Link
                to="/design-studio"
                className="py-2 text-sm font-medium text-foreground hover:text-[hsl(var(--accent))] transition-colors nav-link"
                data-testid="nav-design-studio-link"
              >
                Design Studio
              </Link>
              <NavDropdown label="Resources" items={navigation.resources} menuKey="resources" />
              <Link
                to="/contact"
                className="py-2 text-sm font-medium text-foreground hover:text-[hsl(var(--accent))] transition-colors nav-link"
                data-testid="nav-contact-link"
              >
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setQuoteModalOpen(true)}
                data-testid="nav-get-quote-button"
              >
                Get Quote
              </Button>
              <Button
                className="btn-accent"
                asChild
              >
                <Link to="/contact" data-testid="nav-book-visit-button">
                  Book Site Visit
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-button">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 flex flex-col h-full">
                {/* Fixed Header with Larger Logo */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0 bg-black">
                  <img src={LOGO_URL} alt="Krystal" className="h-24 sm:h-28 w-auto object-contain" />
                </div>
                
                {/* Scrollable Navigation */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4">
                  <nav className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Company</h3>
                      <ul className="space-y-3">
                        {navigation.company.map((item) => (
                          <li key={item.href}>
                            <Link to={item.href} className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Windows</h3>
                      <ul className="space-y-3">
                        {navigation.windows.map((item) => (
                          <li key={item.href}>
                            <Link to={item.href} className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Doors</h3>
                      <ul className="space-y-3">
                        {navigation.doors.map((item) => (
                          <li key={item.href}>
                            <Link to={item.href} className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Resources</h3>
                      <ul className="space-y-3">
                        {navigation.resources.map((item) => (
                          <li key={item.href}>
                            <Link to={item.href} className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Links</h3>
                      <ul className="space-y-3">
                        <li>
                          <Link to="/design-studio" className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                            Design Studio
                          </Link>
                        </li>
                        <li>
                          <Link to="/contact" className="text-foreground hover:text-[hsl(var(--accent))] block py-1">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                
                {/* Fixed Footer with CTAs */}
                <div className="p-6 pt-4 border-t border-border space-y-3 flex-shrink-0 bg-white">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      setQuoteModalOpen(true);
                    }}
                  >
                    Get Quote
                  </Button>
                  <Button className="w-full btn-accent" asChild>
                    <Link to="/contact">Book Site Visit</Link>
                  </Button>
                  <a
                    href="https://wa.me/919599614440"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 text-[hsl(var(--accent))]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-[104px]" />
      
      {/* Quote Modal */}
      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </>
  );
}
