import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Image as ImageIcon, Ruler, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProducts } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';
import ImageGallery from '../components/common/ImageGallery';
import TechnicalDrawings from '../components/common/TechnicalDrawings';
import InteractiveProductShowcase from '../components/common/InteractiveProductShowcase';

// Premium uPVC Window Images
const windowGalleryImages = {
  designs: [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Modern home with large casement windows', caption: 'Casement Windows - Living Room', badge: 'Popular' },
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Luxury bedroom with floor to ceiling windows', caption: 'Floor-to-ceiling Fixed Windows' },
    { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Kitchen with sliding windows', caption: 'Sliding Windows - Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', alt: 'Study room with tilt turn windows', caption: 'Tilt & Turn Windows - Study' },
    { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'French windows opening to garden', caption: 'French Windows - Garden View' },
    { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Bay window seating area', caption: 'Bay Windows - Seating Nook' },
    { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', alt: 'Double casement window exterior', caption: 'Double Casement - Exterior' },
    { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', alt: 'Bathroom with frosted glass window', caption: 'Fixed Window - Frosted Glass' },
  ],
  installations: [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Modern villa exterior with windows', caption: 'Villa Project - Gurgaon' },
    { src: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80', alt: 'Apartment building facade', caption: 'Apartment Complex - Noida' },
    { src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80', alt: 'Bungalow with large windows', caption: 'Bungalow - Delhi NCR' },
    { src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', alt: 'Office building windows', caption: 'Commercial Project' },
  ],
  colors: [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'White uPVC window frame', caption: 'Classic White', badge: 'Best Seller' },
    { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80', alt: 'Wood finish uPVC window', caption: 'Golden Oak Woodgrain' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Anthracite grey window', caption: 'Anthracite Grey' },
    { src: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80', alt: 'Walnut finish window', caption: 'Walnut Woodgrain' },
  ],
};

export default function ProductsWindowsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGalleryTab, setActiveGalleryTab] = useState('designs');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ category: 'windows' });
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
    { name: 'Products', url: '/products/windows' },
    { name: 'Windows', url: '/products/windows' },
  ];

  const windowBenefits = [
    'Superior noise reduction up to 47dB',
    'Thermal insulation (U-value as low as 1.0)',
    'Multi-point security locking',
    'Zero maintenance, no painting required',
    '10-year warranty on profiles',
  ];

  return (
    <>
      <Helmet>
        <title>uPVC Windows | Casement, Sliding, Tilt & Turn | Krystal Magic World</title>
        <meta name="description" content="Premium uPVC windows for Delhi NCR homes. Casement, sliding, tilt & turn, fixed, and French windows with superior acoustic and thermal performance." />
        <link rel="canonical" href="https://krystalmagicworld.com/products/windows" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section with Video */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
          poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=compress&cs=tinysrgb&w=1920&q=80"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/waaz0zj6_freepik__children-opens-the-complete-door-and-then-gone-ins__15013.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block px-4 py-1 bg-[hsl(var(--accent))] rounded-full text-sm font-medium mb-4">
                Premium Window Systems
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4">uPVC Windows</h1>
              <p className="text-lg text-white/80 mb-6">
                Engineered for quiet, light-filled spaces. Choose from casement, sliding, 
                tilt & turn, fixed, and French windows.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-accent" size="lg" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="#interactive-explorer">Explore Window Types</a>
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
            {windowBenefits.map((benefit) => (
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
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">How Our Windows Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore each window type interactively. Watch the animations, hover over hotspots to learn about 
              components, and understand which style suits your space best.
            </p>
          </motion.div>
          
          <InteractiveProductShowcase category="windows" />
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
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Window Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of installed windows. Click any image to view in full screen.
            </p>
          </motion.div>

          <Tabs value={activeGalleryTab} onValueChange={setActiveGalleryTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="designs" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                Designs
              </TabsTrigger>
              <TabsTrigger value="installations" className="gap-2">
                <Layers className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="colors" className="gap-2">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-200 to-gray-400" />
                Colors
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="designs" className="mt-0">
              <ImageGallery 
                images={windowGalleryImages.designs} 
                columns={4}
                aspectRatio="4/3"
              />
            </TabsContent>
            <TabsContent value="installations" className="mt-0">
              <ImageGallery 
                images={windowGalleryImages.installations} 
                columns={4}
                aspectRatio="4/3"
              />
            </TabsContent>
            <TabsContent value="colors" className="mt-0">
              <ImageGallery 
                images={windowGalleryImages.colors} 
                columns={4}
                aspectRatio="square"
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
          
          <TechnicalDrawings category="windows" />
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
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Window Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect window style for your space. Each type offers unique benefits 
              for ventilation, views, and functionality.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${product.slug}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow product-card" data-testid="product-card">
                      <div className="relative aspect-[4/3] overflow-hidden">
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
                        <h3 className="font-semibold text-lg mb-2" data-testid="product-card-title">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.short_description}
                        </p>
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

      {/* Comparison Guide */}
      <section className="section-spacing bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Choose the Right Window</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which window type suits your needs? Here's a quick guide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">For Maximum Ventilation</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Choose casement or tilt & turn windows. They open wide for full airflow.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  Casement Windows
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  Tilt & Turn Windows
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">For Compact Spaces</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Sliding windows don't swing out, perfect for balconies and tight areas.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  Sliding Windows
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  Fixed Windows
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">For Garden Views</h3>
              <p className="text-muted-foreground text-sm mb-4">
                French windows create dramatic floor-to-ceiling openings to the outdoors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  French Windows
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                  Bay Windows
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Our experts will visit your site, understand your requirements, and recommend 
            the perfect window solution. Free consultation.
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
