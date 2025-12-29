import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getBlogPosts } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  const categories = ['all', ...(Array.isArray(posts) ? [...new Set(posts.map(p => p.category))] : [])];
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : (Array.isArray(posts) ? posts.filter(p => p.category === selectedCategory) : []);

  return (
    <>
      <Helmet>
        <title>Blog | uPVC Windows & Doors Tips | Krystal Magic World</title>
        <meta name="description" content="Expert guides on uPVC windows and doors. Learn about acoustic insulation, energy efficiency, maintenance tips, and design inspiration." />
        <link rel="canonical" href="https://krystalmagicworld.com/blog" />
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
            <h1 className="font-serif text-4xl sm:text-5xl mb-4">Blog & Resources</h1>
            <p className="text-muted-foreground text-lg">
              Expert guides, tips, and insights on uPVC windows, doors, and home improvement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border py-4">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {Array.isArray(categories) && categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="capitalize"
              >
                {cat === 'all' ? 'All Posts' : cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-spacing bg-background">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found in this category.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedCategory('all')}
              >
                View All Posts
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(filteredPosts) && filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block" data-testid="blog-card">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.hero_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-medium rounded capitalize">
                          {post.category}
                        </span>
                      </div>
                      <CardContent className="p-6">
                        <h2 className="font-semibold text-lg mb-2 line-clamp-2" data-testid="blog-card-title">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.read_time} min read
                          </div>
                          <span className="text-sm font-medium text-[hsl(var(--accent))] inline-flex items-center" data-testid="blog-card-read-button">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-spacing bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest tips, trends, and insights on uPVC windows and doors delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="btn-accent" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
