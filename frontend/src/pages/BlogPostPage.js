import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getBlogPost, getBlogPosts } from '../lib/api';
import { getArticleSchema, getBreadcrumbSchema } from '../lib/seo';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getBlogPost(slug);
        setPost(postData);
        
        const allPosts = await getBlogPosts();
        setRelatedPosts(
          allPosts
            .filter(p => p.slug !== slug && p.category === postData.category)
            .slice(0, 2)
        );
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title },
  ];

  // Simple markdown-style to HTML conversion
  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="font-serif text-2xl mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <p key={index} className="font-semibold mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      if (paragraph.match(/^\d+\./)) {
        const items = paragraph.split('\n').filter(line => line.match(/^\d+\./));
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">{item.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        );
      }
      return <p key={index} className="text-muted-foreground mb-4 leading-relaxed">{paragraph}</p>;
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.meta_title || `${post.title} | Krystal Magic World Blog`}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <link rel="canonical" href={`https://krystalmagicworld.com/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(getArticleSchema(post))}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={post.hero_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl text-white"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <span className="inline-block px-3 py-1 bg-[hsl(var(--accent))] text-white text-sm rounded mb-4 capitalize">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </span>
                <span>By {post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-neutral max-w-none"
              >
                {renderContent(post.content)}
              </motion.div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Share this article:</span>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <Card className="p-6 bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20">
                  <h3 className="font-semibold mb-3">Ready to Upgrade Your Windows?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get expert advice and a free quote for your home.
                  </p>
                  <Button className="w-full btn-accent" asChild>
                    <Link to="/contact">Get Free Quote</Link>
                  </Button>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.id}
                          to={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <Card className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-3">
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={related.hero_image}
                                  alt={related.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <CardContent className="col-span-2 p-4">
                                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                  {related.title}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {related.read_time} min read
                                </span>
                              </CardContent>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
