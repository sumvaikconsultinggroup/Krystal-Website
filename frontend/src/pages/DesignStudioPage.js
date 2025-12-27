import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { getColorFinishes, getGlassOptions, getHardware } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';

export default function DesignStudioPage() {
  const [colors, setColors] = useState([]);
  const [glass, setGlass] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colorsData, glassData, hardwareData] = await Promise.all([
          getColorFinishes(),
          getGlassOptions(),
          getHardware()
        ]);
        setColors(colorsData);
        setGlass(glassData);
        setHardware(hardwareData);
      } catch (error) {
        console.error('Failed to fetch design studio data:', error);
      }
    };
    fetchData();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Design Studio', url: '/design-studio' },
  ];

  const filteredColors = selectedCategory === 'all' 
    ? colors 
    : colors.filter(c => c.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Design Studio | Colours, Glass & Hardware | Krystal Magic World</title>
        <meta name="description" content="Explore 50+ laminate finishes, glass options, and premium hardware for your uPVC windows and doors. Create your perfect design at Krystal Magic World." />
        <link rel="canonical" href="https://krystalmagicworld.com/design-studio" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Design Studio"
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
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">Design Studio</h1>
              <p className="text-lg text-white/80">
                Customize your windows and doors with our range of finishes, glass options, and hardware.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <Tabs defaultValue="colours" className="w-full" data-testid="design-studio-tabs">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="colours">Colours & Finishes</TabsTrigger>
              <TabsTrigger value="glass">Glass Options</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
            </TabsList>

            {/* Colours & Finishes Tab */}
            <TabsContent value="colours">
              <div className="mb-8">
                <h2 className="font-serif text-3xl mb-4 text-center">Colours & Finishes</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                  Choose from wood grain textures, solid colours, and laminate finishes to match your interior design.
                </p>

                {/* Filter */}
                <div className="flex justify-center gap-2 mb-8">
                  {['all', 'wood_texture', 'solid', 'laminate'].map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'all' ? 'All' : cat === 'wood_texture' ? 'Wood Textures' : cat === 'solid' ? 'Solid Colors' : 'Laminate'}
                    </Button>
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredColors.map((color) => (
                    <motion.div
                      key={color.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={color.image}
                            alt={color.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{color.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.code }}
                            />
                            <span className="text-xs text-muted-foreground">{color.code}</span>
                          </div>
                          {color.is_popular && (
                            <span className="inline-block mt-2 text-xs text-[hsl(var(--accent))]">Popular Choice</span>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button className="btn-accent" asChild>
                    <Link to="/contact">Request Sample Kit</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Glass Options Tab */}
            <TabsContent value="glass">
              <div>
                <h2 className="font-serif text-3xl mb-4 text-center">Glass Options</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                  Select from clear, tinted, Low-E, laminated, and frosted glass for your specific needs.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {glass.map((option) => (
                    <Card key={option.id} className="overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                        <div className="space-y-2">
                          {option.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Hardware Tab */}
            <TabsContent value="hardware">
              <div>
                <h2 className="font-serif text-3xl mb-4 text-center">Hardware & Accessories</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                  Premium European hardware for smooth operation and lasting durability.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {hardware.map((item) => (
                    <Card key={item.id} className="text-center p-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </Card>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-secondary/50 rounded-lg text-center">
                  <h3 className="font-serif text-2xl mb-4">Premium Hardware Partners</h3>
                  <p className="text-muted-foreground mb-6">
                    We source hardware from leading European manufacturers including Hoppe, Roto, Siegenia, and GU.
                  </p>
                  <div className="flex justify-center gap-8 text-muted-foreground">
                    <span className="font-semibold">Hoppe</span>
                    <span className="font-semibold">Roto</span>
                    <span className="font-semibold">Siegenia</span>
                    <span className="font-semibold">GU</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <h2 className="font-serif text-3xl mb-8 text-center">Design Inspiration</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
              'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
              'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
              'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
            ].map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`Design inspiration ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Ready to Design Your Space?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Our experts will help you choose the perfect combination of finishes, glass, and hardware.
          </p>
          <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
            <Link to="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
