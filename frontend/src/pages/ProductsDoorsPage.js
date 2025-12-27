import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProducts } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';
import DesignConfigurator from '../components/common/DesignConfigurator';
import ProductDesignShowcase from '../components/common/ProductDesignShowcase';

export default function ProductsDoorsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Premium uPVC Doors"
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
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">uPVC Doors</h1>
              <p className="text-lg text-white/80 mb-6">
                Create seamless connections between indoor and outdoor spaces. 
                Sliding, bi-fold, casement, and premium lift & slide doors.
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
            {doorBenefits.map((benefit) => (
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
                          {product.features.slice(0, 3).map((feature) => (
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

      {/* Interactive Design Explorer */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ProductDesignShowcase category="doors" />
        </div>
      </section>

      {/* Design Configurator */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Door Panel Configurations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore different panel arrangements with interactive 3D previews. Click to select your preferred design.
            </p>
          </motion.div>
          
          <Tabs defaultValue="sliding" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="sliding">Sliding</TabsTrigger>
              <TabsTrigger value="bifold">Bi-fold</TabsTrigger>
              <TabsTrigger value="casement">Casement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sliding">
              <DesignConfigurator type="doors" productType="sliding" />
            </TabsContent>
            <TabsContent value="bifold">
              <DesignConfigurator type="doors" productType="bifold" />
            </TabsContent>
            <TabsContent value="casement">
              <DesignConfigurator type="doors" productType="casement" />
            </TabsContent>
          </Tabs>
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
              { title: 'Patio Access', desc: 'Sliding and bi-fold doors for garden connection', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&q=80' },
              { title: 'Balconies', desc: 'Space-saving sliding doors for high-rise living', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&q=80' },
              { title: 'Main Entrance', desc: 'Secure casement doors with premium hardware', image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400&q=80' },
              { title: 'Pool Areas', desc: 'Weather-resistant doors for outdoor transitions', image: 'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=400&q=80' },
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
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
          </div>
        </div>
      </section>
    </>
  );
}
