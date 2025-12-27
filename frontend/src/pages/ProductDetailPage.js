import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Download, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import QuoteModal from '../components/common/QuoteModal';
import { getProduct, getProducts, getFAQs } from '../lib/api';
import { getProductSchema, getBreadcrumbSchema } from '../lib/seo';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProduct(slug);
        setProduct(productData);
        
        // Fetch related products
        const allProducts = await getProducts({ category: productData.category });
        setRelatedProducts(allProducts.filter(p => p.slug !== slug).slice(0, 3));
        
        // Fetch FAQs for this product category
        const faqData = await getFAQs({ category: productData.category });
        setFaqs(faqData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--accent))]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products/windows">View All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: `/products/${product.category}` },
    { name: product.category === 'windows' ? 'Windows' : 'Doors', url: `/products/${product.category}` },
    { name: product.name },
  ];

  const allImages = [product.hero_image, ...product.gallery.filter(img => img !== product.hero_image)];

  return (
    <>
      <Helmet>
        <title>{product.meta_title || `${product.name} | Krystal Magic World`}</title>
        <meta name="description" content={product.meta_description || product.short_description} />
        <link rel="canonical" href={`https://krystalmagicworld.com/products/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(getProductSchema(product))}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-muted-foreground">/</span>}
                {crumb.url ? (
                  <Link to={crumb.url} className="text-muted-foreground hover:text-foreground">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src={allImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-[hsl(var(--accent))]' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to={`/products/${product.category}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {product.category === 'windows' ? 'Windows' : 'Doors'}
              </Link>
              
              <h1 className="font-serif text-3xl sm:text-4xl mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Key Benefits */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Key Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--accent))]" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.use_cases.map((useCase) => (
                    <span key={useCase} className="px-3 py-1 bg-secondary text-sm rounded-full">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Button size="lg" className="btn-accent" onClick={() => setQuoteModalOpen(true)}>
                  Get Quote
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Book Site Visit</Link>
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex items-center gap-4 text-sm">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]/80"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="p-6">
                <h3 className="font-serif text-2xl mb-6">Features & Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                      <Check className="w-5 h-5 text-[hsl(var(--accent))] mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specifications">
              <Card className="p-6">
                <h3 className="font-serif text-2xl mb-6">Technical Specifications</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Specification</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.specs.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{spec.label}</TableCell>
                        <TableCell>{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="faqs">
              <Card className="p-6">
                <h3 className="font-serif text-2xl mb-6">Frequently Asked Questions</h3>
                {faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">No FAQs available for this product.</p>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <h2 className="font-serif text-3xl mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/products/${related.slug}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={related.hero_image}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{related.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.short_description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </>
  );
}
