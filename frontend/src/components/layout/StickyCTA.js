import React, { useState } from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import QuoteModal from '../common/QuoteModal';

export default function StickyCTA() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-lg md:hidden"
        data-testid="sticky-cta-bar"
      >
        <div className="grid grid-cols-3 divide-x divide-border">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="flex flex-col items-center justify-center py-3 text-foreground hover:bg-secondary transition-colors"
            data-testid="sticky-cta-quote-button"
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Get Quote</span>
          </button>
          
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 text-[hsl(var(--accent))] hover:bg-secondary transition-colors"
            data-testid="sticky-cta-whatsapp-link"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          
          <a
            href="tel:+919876543210"
            className="flex flex-col items-center justify-center py-3 text-foreground hover:bg-secondary transition-colors"
            data-testid="sticky-cta-call-link"
          >
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Call</span>
          </a>
        </div>
      </div>
      
      {/* Add bottom padding on mobile to account for sticky bar */}
      <div className="h-16 md:hidden" />
      
      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </>
  );
}
