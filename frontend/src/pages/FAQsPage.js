import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Link } from 'react-router-dom';
import { getFAQs } from '../lib/api';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/seo';

export default function FAQsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQs', url: '/faqs' },
  ];

  const categories = ['all', ...new Set(faqs.map(f => f.category))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>FAQs | uPVC Windows & Doors Questions | Krystal Magic World</title>
        <meta name="description" content="Find answers to common questions about uPVC windows and doors. Learn about pricing, installation, maintenance, warranties, and more." />
        <link rel="canonical" href="https://krystalmagicworld.com/faqs" />
        {faqs.length > 0 && <script type="application/ld+json">{JSON.stringify(getFAQSchema(faqs))}</script>}
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl sm:text-5xl mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Find answers to common questions about uPVC windows, doors, and our services.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border py-4">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="capitalize"
              >
                {cat === 'all' ? 'All Questions' : cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No questions found matching your search.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem value={`item-${index}`} data-testid="faq-item">
                      <AccordionTrigger className="text-left">
                        <span className="pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-accent" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
