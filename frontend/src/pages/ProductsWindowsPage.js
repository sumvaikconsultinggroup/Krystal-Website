import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getProducts } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';

export default function ProductsWindowsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
          alt="Premium uPVC Windows"
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
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">uPVC Windows</h1>
              <p className="text-lg text-white/80 mb-6">
                Engineered for quiet, light-filled spaces. Choose from casement, sliding, 
                tilt & turn, fixed, and French windows.
              </p>
              <Button className="btn-accent" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
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
      <section className="section-spacing bg-secondary/30">
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
              <a href="tel:+919876543210">Call +91 98765 43210</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
