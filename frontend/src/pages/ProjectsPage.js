import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getProjects, getCities } from '../lib/api';
import { getBreadcrumbSchema } from '../lib/seo';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: 'all',
    projectType: 'all'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, citiesData] = await Promise.all([
          getProjects(),
          getCities()
        ]);
        setProjects(projectsData);
        setCities(citiesData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
  ];

  const filteredProjects = Array.isArray(projects) ? projects.filter(project => {
    if (filters.city !== 'all' && project.city !== filters.city) return false;
    if (filters.projectType !== 'all' && project.project_type !== filters.projectType) return false;
    return true;
  }) : [];

  const projectTypes = Array.isArray(projects) ? [...new Set(projects.map(p => p.project_type))] : [];

  return (
    <>
      <Helmet>
        <title>Our Projects | Case Studies | Krystal Magic World</title>
        <meta name="description" content="Explore our portfolio of residential and commercial uPVC installations across Delhi NCR. See how we've transformed homes in Gurugram, Delhi, and Noida." />
        <link rel="canonical" href="https://krystalmagicworld.com/projects" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/6s4mqcsj_freepik__create-a-image-of-a-premium-indian-office-located-__15024.png"
          alt="Krystal Projects"
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
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">Our Projects</h1>
              <p className="text-lg text-white/80">
                Transforming homes and businesses across Delhi NCR with premium uPVC solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border py-6">
        <div className="container">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
            <Select
              value={filters.city}
              onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {Array.isArray(cities) ? cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                )) : null}
              </SelectContent>
            </Select>

            <Select
              value={filters.projectType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, projectType: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {projectTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-spacing bg-background">
        <div className="container">
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
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFilters({ city: 'all', projectType: 'all' })}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/projects/${project.slug}`} className="group block" data-testid="project-card">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={project.hero_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-medium rounded capitalize">
                          {project.project_type}
                        </span>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3" data-testid="project-location">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {project.challenge.substring(0, 100)}...
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-[hsl(var(--accent))]" data-testid="project-read-case-study-link">
                          Read Case Study <ArrowRight className="w-4 h-4 ml-1" />
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

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Your Project Could Be Next</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Let's discuss how we can transform your space with premium uPVC solutions.
          </p>
          <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
