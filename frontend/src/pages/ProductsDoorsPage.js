import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Image as ImageIcon, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProducts } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';
import ImageGallery from '../components/common/ImageGallery';
import TechnicalDrawings from '../components/common/TechnicalDrawings';
import InteractiveProductShowcase from '../components/common/InteractiveProductShowcase';

// Premium uPVC Door Images
const doorGalleryImages = {
  designs: [
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Modern sliding glass doors to patio', caption: 'Sliding Doors - Patio Access', badge: 'Popular' },
    { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', alt: 'Bi-fold doors opening to garden', caption: 'Bi-fold Doors - Garden View' },
    { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80', alt: 'French doors with elegant design', caption: 'French Doors - Living Room' },
    { src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', alt: 'Lift and slide door system', caption: 'Lift & Slide - Premium' },
    { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Large sliding doors with view', caption: 'Sliding Doors - Scenic View' },
    { src: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80', alt: 'Pool area with glass doors', caption: 'Sliding Doors - Pool Area' },
  ],
  installations: [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Villa with bi-fold doors', caption: 'Villa Project - Gurgaon' },
    { src: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80', alt: 'Penthouse with sliding doors', caption: 'Penthouse - South Delhi' },
    { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Farmhouse entrance doors', caption: 'Farmhouse - Chattarpur' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Modern home with glass doors', caption: 'Modern Home - Noida' },
  ],
};

export default function ProductsDoorsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGalleryTab, setActiveGalleryTab] = useState('designs');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ category: 'doors' });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products/doors' },
    { name: 'Doors', url: '/products/doors' },
  ];

  const doorBenefits = [
    'Smooth operation with precision hardware',
    'Enhanced security with multi-point locking',
    'Superior thermal insulation',
    'Weather-resistant sealing',
    'Customizable designs and finishes',
  ];

  return (
    <>
      <Helmet>
        <title>uPVC Doors | Sliding, Bi-fold, Lift & Slide | Krystal Magic World</title>
        <meta name="description" content="Premium uPVC doors for Delhi NCR homes. Sliding doors, bi-fold doors, casement doors, and lift & slide systems with superior security and aesthetics." />
        <link rel="canonical" href="https://krystalmagicworld.com/products/doors" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section with Video */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=compress&cs=tinysrgb&w=1920&q=80"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/waaz0zj6_freepik__children-opens-the-complete-door-and-then-gone-ins__15013.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=compress&cs=tinysrgb&w=1920&q=80"
            alt="Premium uPVC Doors"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block px-4 py-1 bg-[hsl(var(--accent))] rounded-full text-sm font-medium mb-4">
                Premium Door Systems
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4">uPVC Doors</h1>
              <p className="text-lg text-white/80 mb-6">
                Create seamless connections between indoor and outdoor spaces. 
                Sliding, bi-fold, casement, and premium lift & slide doors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-accent" size="lg" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="#interactive-explorer">Explore Door Types</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-white border-b border-border py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            {doorBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product Explorer */}
      <section id="interactive-explorer" className="section-spacing bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">How Our Doors Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore each door type interactively. Watch the animations, hover over hotspots to learn about 
              components, and understand which style suits your space best.
            </p>
          </motion.div>
          
          <InteractiveProductShowcase category="doors" />
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-spacing bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Door Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of installed doors. Click any image to view in full screen.
            </p>
          </motion.div>

          <Tabs value={activeGalleryTab} onValueChange={setActiveGalleryTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-8">
              <TabsTrigger value="designs" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                Designs
              </TabsTrigger>
              <TabsTrigger value="installations" className="gap-2">
                <Layers className="w-4 h-4" />
                Projects
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="designs" className="mt-0">
              <ImageGallery 
                images={doorGalleryImages.designs} 
                columns={3}
                aspectRatio="4/3"
              />
            </TabsContent>
            <TabsContent value="installations" className="mt-0">
              <ImageGallery 
                images={doorGalleryImages.installations} 
                columns={4}
                aspectRatio="4/3"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Technical Specifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed profile sections, configurations, and glass options. Share these with your architect or builder.
            </p>
          </motion.div>
          
          <TechnicalDrawings category="doors" />
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-spacing bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Door Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From space-saving sliders to dramatic bi-folds, find the perfect door 
              for your entrance, patio, or balcony.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${product.slug}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow product-card" data-testid="product-card">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={product.hero_image}
                          alt={product.name}
                          className="w-full h-full object-cover product-image"
                        />
                        {product.is_featured && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-[hsl(var(--accent))] text-white text-xs font-medium rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-xl mb-2" data-testid="product-card-title">{product.name}</h3>
                        <p className="text-muted-foreground mb-4">
                          {product.short_description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features && product.features.slice(0, 3).map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-secondary text-xs rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center text-sm font-medium text-[hsl(var(--accent))]" data-testid="product-card-cta">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-spacing bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Perfect For Every Space</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Patio Access', desc: 'Sliding and bi-fold doors for garden connection', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
              { title: 'Balconies', desc: 'Space-saving sliding doors for high-rise living', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
              { title: 'Main Entrance', desc: 'Secure casement doors with premium hardware', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80' },
              { title: 'Pool Areas', desc: 'Weather-resistant doors for outdoor transitions', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Transform Your Living Space
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Let us help you choose the perfect door solution. Free site visit and consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:+919220905087">Call +91 9220905087</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
