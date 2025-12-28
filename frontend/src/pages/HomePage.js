import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Volume2, Thermometer, Wind, Clock, CheckCircle, Star, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import QuoteModal from '../components/common/QuoteModal';
import AnimatedHero from '../components/common/AnimatedHero';
import { getProducts, getProjects, getTestimonials, getFAQs } from '../lib/api';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/seo';

const features = [
  { icon: Volume2, title: 'Acoustic Comfort', description: 'Up to 47dB noise reduction for peaceful living' },
  { icon: Thermometer, title: 'Thermal Insulation', description: 'U-value as low as 1.0 for year-round comfort' },
  { icon: Wind, title: 'Dust & Weather', description: 'Multi-chamber sealing blocks dust & rain' },
  { icon: Shield, title: 'Security', description: 'Multi-point locking for enhanced protection' },
];

const processSteps = [
  { step: 1, title: 'Consultation', description: 'Free site visit and requirement discussion' },
  { step: 2, title: 'Measurement', description: 'Precise digital measurements of all openings' },
  { step: 3, title: 'Fabrication', description: 'Custom manufacturing in our Gurugram facility' },
  { step: 4, title: 'Installation', description: 'Professional fitting by trained experts' },
  { step: 5, title: 'Support', description: 'Lifetime support and maintenance assistance' },
];

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, projectsData, testimonialsData, faqsData] = await Promise.all([
          getProducts({ featured: true }),
          getProjects({ featured: true }),
          getTestimonials({ featured: true }),
          getFAQs({ featured: true })
        ]);
        setProducts(productsData.slice(0, 6));
        setProjects(projectsData.slice(0, 3));
        setTestimonials(testimonialsData.slice(0, 4));
        setFaqs(faqsData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Krystal Magic World | Premium uPVC Doors & Windows | Delhi NCR</title>
        <meta name="description" content="Premium uPVC doors & windows for Delhi NCR. Superior acoustic, thermal & dust protection since 2012. Get a free quote today." />
        <link rel="canonical" href="https://krystalmagicworld.com" />
        <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
        {faqs.length > 0 && <script type="application/ld+json">{JSON.stringify(getFAQSchema(faqs))}</script>}
      </Helmet>

      {/* Animated Hero Section */}
      <AnimatedHero onGetQuote={() => setQuoteModalOpen(true)} />

      {/* Trust Strip */}
      <section className="bg-white border-y border-border" data-testid="trust-strip">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="trust-years">
              <div className="text-3xl font-serif text-[hsl(var(--accent))]">12+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div data-testid="trust-installations">
              <div className="text-3xl font-serif text-[hsl(var(--accent))]">5000+</div>
              <div className="text-sm text-muted-foreground">Installations</div>
            </div>
            <div data-testid="trust-warranty">
              <div className="text-3xl font-serif text-[hsl(var(--accent))]">10 Yr</div>
              <div className="text-sm text-muted-foreground">Warranty</div>
            </div>
            <div data-testid="trust-certified">
              <div className="text-3xl font-serif text-[hsl(var(--accent))]">ISO</div>
              <div className="text-sm text-muted-foreground">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gateways - Interactive */}
      <section className="section-spacing bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium uPVC windows and doors engineered for Delhi NCR's demanding climate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Windows Gateway - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link to="/products/windows" className="group block">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 product-card border-0 bg-[#1a1a1a]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/839admza_freepik__image-1-is-logo-and-image-2-is-reference-image-cre__15011.jpeg"
                      alt="uPVC Windows"
                      className="w-full h-full object-contain product-image bg-[#1a1a1a]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Feature Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[hsl(var(--accent))]/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        5+ Styles
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        50+ Finishes
                      </motion.span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-2xl md:text-3xl mb-2">uPVC Windows</h3>
                      <p className="text-white/80 text-sm mb-4">Casement, Sliding, Tilt & Turn, Fixed, French</p>
                      <motion.span 
                        className="inline-flex items-center text-sm font-medium text-[hsl(var(--accent))] bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-[hsl(var(--accent))] group-hover:text-white transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Explore Windows <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Doors Gateway - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link to="/products/doors" className="group block">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 product-card border-0 bg-[#1a1a1a]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src="https://customer-assets.emergentagent.com/job_luxury-upvc/artifacts/rwhc06k5_freepik__image-1-is-logo-and-image-2-is-reference-image-cre__15010.jpeg"
                      alt="uPVC Doors"
                      className="w-full h-full object-contain product-image bg-[#1a1a1a]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Feature Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[hsl(var(--accent))]/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        4+ Styles
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        Premium Hardware
                      </motion.span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-2xl md:text-3xl mb-2">uPVC Doors</h3>
                      <p className="text-white/80 text-sm mb-4">Sliding, Casement, Bi-fold, Lift & Slide</p>
                      <motion.span 
                        className="inline-flex items-center text-sm font-medium text-[hsl(var(--accent))] bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-[hsl(var(--accent))] group-hover:text-white transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Explore Doors <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Designed for Comfort</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every Krystal product delivers on four key promises.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Studio Teaser */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Design Studio</span>
              <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-4">Customize Your Vision</h2>
              <p className="text-muted-foreground mb-6">
                Choose from 50+ laminate finishes, multiple glass options, and premium hardware 
                to create windows and doors that perfectly match your architectural style.
              </p>
              <ul className="space-y-3 mb-8">
                {['Wood grain & solid color finishes', 'Clear, tinted, Low-E & laminated glass', 'Premium European hardware'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="btn-accent">
                <Link to="/design-studio">
                  Explore Design Options
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/iuclvi9j_freepik__create-a-image-of-a-premium-upvc-doors-and-windows__15022.png"
                alt="Premium uPVC doors and windows"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/gmanoihn_freepik__create-a-image-of-a-premium-upvc-sliding-door-in-a__15021.jpeg"
                alt="Premium uPVC sliding door"
                className="rounded-lg w-full h-48 object-cover mt-8"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/l73a2ntp_freepik__create-a-image-of-a-premium-upvc-window-glasses-of__15020.png"
                alt="Premium uPVC window glasses"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/jvc98p0z_freepik__create-a-image-of-a-premium-upvc-door-handle-profi__15019.png"
                alt="Premium uPVC door handle"
                className="rounded-lg w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-spacing bg-[#1a1a1a] text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Our Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From consultation to installation, we handle everything with precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white font-semibold">
                  {step.step}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-gray-700" />
                )}
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Carousel */}
      {projects.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-8"
            >
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">See how we've transformed homes across Delhi NCR.</p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link to="/projects">
                  View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/projects/${project.slug}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-testid="project-card">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={project.hero_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground" data-testid="project-location">{project.location}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-spacing bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from homeowners and professionals who chose Krystal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Clients Section */}
      <section className="section-spacing bg-white" data-testid="our-clients-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Our Clients</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by India's leading real estate developers, institutions, and corporations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-items-center"
          >
            {[
              { name: 'DLF', logo: 'https://customer-assets.emergentagent.com/job_arch-windows/artifacts/kh7dw9ro_dlf-vector-logo-11573923316gzukkqawus.png' },
              { name: 'M3M', logo: 'https://customer-assets.emergentagent.com/job_arch-windows/artifacts/nxzfgnyx_logo%20%281%29.png' },
              { name: 'Suncity Projects', logo: null, color: '#b8860b' },
              { name: 'Amity University', logo: 'https://customer-assets.emergentagent.com/job_arch-windows/artifacts/rwnvn87y_amity-university9126%20%281%29.jpg' },
              { name: 'KIIT University', logo: 'https://customer-assets.emergentagent.com/job_arch-windows/artifacts/jpontb9c_kisspng-kalinga-institute-of-industrial-technology-entranc-5ae4656eb5c3a0.9424063815249176147445.jpg' },
              { name: 'Delta Group', logo: 'https://customer-assets.emergentagent.com/job_arch-windows/artifacts/z5k6h6gf_delta-electronics-logo-delta-air-lines-power-converters-electronics.jpg' },
              { name: 'Godrej Properties', logo: null, color: '#5a2d82' },
              { name: 'Power Grid', logo: null, color: '#0066b3' },
              { name: 'Suzuki', logo: null, color: '#c41e3a' },
              { name: 'Tata Motors', logo: null, color: '#00205b' },
              { name: 'BMW', logo: null, color: '#0066b1' },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center p-4 h-24 w-full rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
                data-testid={`client-logo-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-16 max-w-[140px] w-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span 
                    className="text-sm md:text-base font-bold text-center leading-tight transition-colors duration-300"
                    style={{ color: client.color }}
                  >
                    {client.name}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl sm:text-4xl mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-6">
                  Find answers to common questions about uPVC windows and doors.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/faqs">View All FAQs</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`item-${index}`} data-testid="faq-item">
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Get a free consultation and quote. Our experts will help you choose 
              the perfect windows and doors for your home.
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
          </motion.div>
        </div>
      </section>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </>
  );
}
