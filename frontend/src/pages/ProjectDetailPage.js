import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Check, Star, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getProject, getProjects } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProject(slug);
        setProject(projectData);
        
        const allProjects = await getProjects();
        setRelatedProjects(allProjects.filter(p => p.slug !== slug).slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch project:', error);
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title },
  ];

  return (
    <>
      <Helmet>
        <title>{project.meta_title || `${project.title} | Krystal Magic World`}</title>
        <meta name="description" content={project.meta_description || project.challenge.substring(0, 155)} />
        <link rel="canonical" href={`https://krystalmagicworld.com/projects/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={project.hero_image}
          alt={project.title}
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
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <span className="inline-block px-3 py-1 bg-white/20 text-sm rounded mb-4 capitalize">
                {project.project_type}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">{project.title}</h1>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5" />
                {project.location}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">The Challenge</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">What the client needed</h2>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Our Solution</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">How we delivered</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{project.solution}</p>
              
              {/* Products Used */}
              <div className="flex flex-wrap gap-2">
                {project.product_types.map((type) => (
                  <span key={type} className="px-3 py-1 bg-secondary text-sm rounded-full capitalize">
                    {type.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">The Outcome</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">Results achieved</h2>
              <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
            </motion.div>

            {/* Testimonial */}
            {project.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-secondary/30">
                  <Quote className="w-10 h-10 text-[hsl(var(--accent))]/30 mb-4" />
                  <blockquote className="font-serif text-xl mb-4">
                    "{project.testimonial}"
                  </blockquote>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                    ))}
                  </div>
                  <cite className="text-sm text-muted-foreground not-italic">
                    — {project.testimonial_author}
                  </cite>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="section-spacing bg-secondary/30">
          <div className="container">
            <h2 className="font-serif text-3xl mb-8 text-center">Project Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, index) => (
                <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-spacing bg-background">
          <div className="container">
            <h2 className="font-serif text-3xl mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((related) => (
                <Link key={related.id} to={`/projects/${related.slug}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={related.hero_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col justify-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 capitalize">
                          {related.project_type}
                        </span>
                        <h3 className="font-semibold text-lg mb-2">{related.title}</h3>
                        <p className="text-sm text-muted-foreground">{related.location}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Start Your Project</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Let us help you achieve similar results for your home or business.
          </p>
          <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
