import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import QuoteModal from '../components/common/QuoteModal';
import { getCity, getProducts } from '../lib/api';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '../lib/seo';

export default function ServiceAreaPage({ type }) {
  const { city: citySlug } = useParams();
  const [cityData, setCityData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityInfo, productsData] = await Promise.all([
          getCity(citySlug),
          getProducts({ category: type === 'windows' ? 'windows' : 'doors', featured: true })
        ]);
        setCityData(cityInfo);
        setProducts(Array.isArray(productsData) ? productsData.slice(0, 4) : []);
      } catch (error) {
        console.error('Failed to fetch city data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [citySlug, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--accent))]"></div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">City Not Found</h1>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const productLabel = type === 'windows' ? 'Windows' : 'Doors';
  const pageTitle = `uPVC ${productLabel} in ${cityData.name}`;
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: `Products`, url: `/products/${type}` },
    { name: pageTitle },
  ];

  const benefits = [
    `Premium uPVC ${type} with superior insulation`,
    'Expert installation by trained professionals',
    '10-year warranty on profiles',
    'Free site visit and measurement',
    'After-sales support and maintenance',
    'Customizable designs and finishes',
  ];

  return (
    <>
      <Helmet>
        <title>{cityData.meta_title || `${pageTitle} | Krystal Magic World`}</title>
        <meta name="description" content={cityData.meta_description || `Premium uPVC ${type} installation in ${cityData.name}. Superior noise reduction, thermal insulation, and dust protection. Free consultation and quote.`} />
        <link rel="canonical" href={`https://krystalmagicworld.com/upvc-${type}-in-${citySlug}`} />
        <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
        {cityData.faqs?.length > 0 && <script type="application/ld+json">{JSON.stringify(getFAQSchema(cityData.faqs))}</script>}
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={type === 'windows' 
            ? 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80'
            : 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80'
          }
          alt={pageTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{cityData.name}, {cityData.state}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">{pageTitle}</h1>
              <p className="text-lg text-white/80 mb-6">
                {cityData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => setQuoteModalOpen(true)}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Get Free Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/contact">Book Site Visit</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">
                Serving {cityData.name}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-6">
                Why Choose Krystal for uPVC {productLabel} in {cityData.name}?
              </h2>
              <p className="text-muted-foreground mb-6">
                We understand the unique requirements of homes in {cityData.name}. From noise pollution 
                to extreme weather, our uPVC solutions are designed to deliver comfort and peace of mind.
              </p>
              <ul className="space-y-3">
                {Array.isArray(benefits) && benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="p-6 text-center">
                <div className="text-3xl font-serif text-[hsl(var(--accent))] mb-2">47dB</div>
                <p className="text-sm text-muted-foreground">Noise Reduction</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-serif text-[hsl(var(--accent))] mb-2">1.0</div>
                <p className="text-sm text-muted-foreground">U-Value (Best)</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-serif text-[hsl(var(--accent))] mb-2">10 Yr</div>
                <p className="text-sm text-muted-foreground">Warranty</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-serif text-[hsl(var(--accent))] mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Installations</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="section-spacing bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Popular uPVC {productLabel} in {cityData.name}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our range of premium {type} solutions for your home.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(products) && products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${product.slug}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={product.hero_image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.short_description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to={`/products/${type}`}>
                  View All {productLabel} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {cityData.projects?.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <h2 className="font-serif text-3xl mb-8">Our Work in {cityData.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(cityData.projects) && cityData.projects.map((project) => (
                <Link key={project.id} to={`/projects/${project.slug}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.hero_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {cityData.testimonials?.length > 0 && (
        <section className="section-spacing bg-secondary/30">
          <div className="container">
            <h2 className="font-serif text-3xl mb-8 text-center">What Our {cityData.name} Clients Say</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {Array.isArray(cityData.testimonials) && cityData.testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {cityData.faqs?.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl mb-8 text-center">
                FAQs About uPVC {productLabel} in {cityData.name}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {Array.isArray(cityData.faqs) && cityData.faqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Ready for Premium uPVC {productLabel} in {cityData.name}?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Get a free consultation and quote. Our experts will visit your site to understand your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setQuoteModalOpen(true)}
              className="bg-white text-[hsl(var(--accent))] hover:bg-white/90"
            >
              Get Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:+919220905087">Call +91 9220905087</a>
            </Button>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </>
  );
}
