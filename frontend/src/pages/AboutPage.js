import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Award, Users, Factory, CheckCircle, ArrowRight, Shield, 
  Settings, Ruler, Wrench, Building2, Cog, Target, Clock,
  BadgeCheck, FileCheck, Gauge, Zap, Eye, Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getBreadcrumbSchema } from '../lib/seo';

const ABOUT_HERO = 'https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/hhqekiye_freepik__create-a-image-of-a-premium-luxury-glass-villa-sho__15015.jpeg';
const FACTORY_IMAGE = 'https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/0eoke1yt_freepik__create-a-image-of-a-premium-upvc-doors-and-window-__15023.jpeg';
const QUALITY_IMAGE = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=compress&cs=tinysrgb&w=800&q=80';

const stats = [
  { value: '12+', label: 'Years Experience', icon: Award },
  { value: '5000+', label: 'Projects Completed', icon: Factory },
  { value: '150+', label: 'Team Members', icon: Users },
  { value: '25000+', label: 'Sq.Ft Factory', icon: Building2 },
];

const milestones = [
  { year: '2012', title: 'Founded', description: 'Established in Gurugram with a vision to bring premium uPVC solutions to Delhi NCR.' },
  { year: '2015', title: 'Manufacturing Expansion', description: 'Opened state-of-the-art 15,000 sq.ft fabrication facility with German machinery.' },
  { year: '2018', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems.' },
  { year: '2020', title: '3000+ Installations', description: 'Crossed milestone of 3000 successful residential and commercial installations.' },
  { year: '2022', title: 'Facility Upgrade', description: 'Expanded to 25,000 sq.ft with fully automated production lines.' },
  { year: '2024', title: 'Regional Leader', description: 'Recognized as leading uPVC solutions provider in Delhi NCR region.' },
];

const values = [
  { title: 'Quality First', description: 'We never compromise on materials or workmanship. Every product meets international standards.', icon: Shield },
  { title: 'Customer Focus', description: 'Your satisfaction drives everything we do. From consultation to after-sales, we\'re with you.', icon: Heart },
  { title: 'Innovation', description: 'Continuously adopting new technologies and techniques to deliver better solutions.', icon: Zap },
  { title: 'Integrity', description: 'Transparent pricing, honest advice, and commitments we always keep.', icon: Eye },
];

const machinery = [
  { name: 'CNC Cutting Center', brand: 'Elumatec (Germany)', description: 'Precision cutting with ±0.1mm accuracy' },
  { name: 'Welding Machine', brand: 'Rotox (Germany)', description: '4-head simultaneous welding for perfect joints' },
  { name: 'Corner Cleaning', brand: 'Yilmaz (Turkey)', description: 'Automated corner finishing for seamless aesthetics' },
  { name: 'Glass Processing', brand: 'Lisec (Austria)', description: 'Automated glass cutting and edge polishing' },
  { name: 'Hardware Fitting', brand: 'Custom Jigs', description: 'Precision hardware installation stations' },
  { name: 'Quality Testing', brand: 'In-house Lab', description: 'Water, air, and structural testing equipment' },
];

const certifications = [
  { name: 'ISO 9001:2015', description: 'Quality Management System', icon: BadgeCheck },
  { name: 'ISI Marked Profiles', description: 'Bureau of Indian Standards certified', icon: Shield },
  { name: 'CE Certified Hardware', description: 'European conformity standards', icon: FileCheck },
  { name: 'Green Building Ready', description: 'IGBC & GRIHA compliant products', icon: Factory },
];

const processSteps = [
  { 
    step: 1, 
    title: 'Consultation', 
    desc: 'Free site visit to understand your requirements, preferences, and budget',
    details: ['On-site measurement', 'Style recommendations', 'Budget planning', 'Timeline discussion'],
    duration: '1-2 days'
  },
  { 
    step: 2, 
    title: 'Design & Quote', 
    desc: 'Custom design proposal with detailed technical drawings and pricing',
    details: ['3D visualization', 'Technical specifications', 'Material selection', 'Transparent pricing'],
    duration: '2-3 days'
  },
  { 
    step: 3, 
    title: 'Manufacturing', 
    desc: 'Precision fabrication at our facility using German machinery',
    details: ['CNC cutting', 'Welding & cleaning', 'Hardware fitting', 'Quality checks'],
    duration: '7-10 days'
  },
  { 
    step: 4, 
    title: 'Installation', 
    desc: 'Professional installation by trained technicians',
    details: ['Site preparation', 'Careful installation', 'Sealing & finishing', 'Debris cleanup'],
    duration: '1-3 days'
  },
  { 
    step: 5, 
    title: 'Handover', 
    desc: 'Final inspection, demonstration, and warranty documentation',
    details: ['Quality inspection', 'Operation training', 'Warranty card', 'After-sales support'],
    duration: '1 day'
  },
];

const qualityChecks = [
  { name: 'Profile Inspection', description: 'Incoming quality check for all uPVC profiles' },
  { name: 'Cutting Accuracy', description: 'Dimensional verification post-cutting' },
  { name: 'Weld Strength', description: 'Corner weld strength testing' },
  { name: 'Hardware Function', description: 'Operation testing of all hardware' },
  { name: 'Glass Integrity', description: 'Visual and seal inspection of DGU' },
  { name: 'Final Assembly', description: 'Complete unit functionality check' },
  { name: 'Water Tightness', description: 'Spray test for weather sealing' },
  { name: 'Packing Quality', description: 'Secure packaging for transport' },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Krystal - Premium uPVC Experts Since 2012</title>
        <meta name="description" content="Learn about Krystal - Delhi NCR's trusted uPVC doors & windows manufacturer since 2012. German machinery, ISO certified, 25,000 sq.ft manufacturing facility." />
        <link rel="canonical" href="https://krystalmagicworld.com/about" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={ABOUT_HERO}
          alt="Krystal - Premium uPVC Solutions"
          className="w-full h-full object-cover"
        />
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
                Since 2012
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">About Krystal</h1>
              <p className="text-lg text-white/80">
                Crafting architectural excellence in uPVC doors & windows for Delhi NCR
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--accent))]" />
                <div className="text-3xl md:text-4xl font-serif text-[hsl(var(--accent))] mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-spacing bg-background" id="about">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Our Story</span>
              <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-6">From Vision to Reality</h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-muted-foreground mb-4">
                  Krystal was founded in 2012 with a singular vision: to bring international-quality 
                  uPVC windows and doors to Indian homes. Starting from a small workshop in Gurugram, we've grown 
                  into one of Delhi NCR's most trusted names in architectural glazing solutions.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our journey began when our founders, experienced in the construction industry, recognized a gap 
                  in the market for premium yet accessible uPVC solutions. Traditional wooden and aluminum windows 
                  couldn't meet the acoustic, thermal, and maintenance-free expectations of modern homeowners.
                </p>
                <p className="text-muted-foreground">
                  Today, with a 25,000 sq.ft manufacturing facility, German machinery, and over 5,000 successful 
                  installations, we continue to set benchmarks in quality, service, and customer satisfaction.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-3">
                    <value.icon className="w-5 h-5 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">{value.title}</h4>
                      <p className="text-xs text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={FACTORY_IMAGE}
                alt="Krystal Manufacturing Facility"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="section-spacing bg-secondary/30" id="infrastructure">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Infrastructure</span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-4">World-Class Manufacturing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 25,000 sq.ft facility in Gurugram is equipped with state-of-the-art German and European machinery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {machinery.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Cog className="w-8 h-8 text-[hsl(var(--accent))] mb-4" />
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-[hsl(var(--accent))] mb-2">{item.brand}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-8 mt-12">
            <h3 className="font-serif text-2xl text-center mb-8">Our Journey</h3>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              
              <div className="space-y-8 md:space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="inline-block p-4 md:p-6 max-w-md">
                        <div className="text-[hsl(var(--accent))] font-semibold mb-1">{milestone.year}</div>
                        <h4 className="font-semibold mb-1">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="hidden md:flex w-4 h-4 rounded-full bg-[hsl(var(--accent))] z-10 flex-shrink-0" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Standards */}
      <section className="section-spacing bg-background" id="quality">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Quality & Standards</span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-4">Excellence at Every Step</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality is backed by international certifications and rigorous testing protocols
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Certifications */}
            <div>
              <h3 className="font-semibold text-xl mb-6">Certifications & Standards</h3>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 h-full">
                      <cert.icon className="w-8 h-8 text-[hsl(var(--accent))] mb-3" />
                      <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                      <p className="text-xs text-muted-foreground">{cert.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <img
                  src={QUALITY_IMAGE}
                  alt="Quality Control Process"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>

            {/* Quality Checks */}
            <div>
              <h3 className="font-semibold text-xl mb-6">8-Point Quality Check</h3>
              <p className="text-muted-foreground mb-6">
                Every unit passes through our rigorous 8-point quality inspection before dispatch
              </p>
              <div className="space-y-3">
                {qualityChecks.map((check, index) => (
                  <motion.div
                    key={check.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{check.name}</h4>
                      <p className="text-xs text-muted-foreground">{check.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-spacing bg-[#0a1628] text-white" id="process">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider">Our Process</span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-4">How We Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A transparent, streamlined process from consultation to completion
            </p>
          </motion.div>

          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-8 bg-white/10">
              {processSteps.map((step) => (
                <TabsTrigger 
                  key={step.step} 
                  value={step.step.toString()}
                  className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-[#0a1628] text-white/70"
                >
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.step}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {processSteps.map((step) => (
              <TabsContent key={step.step} value={step.step.toString()} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#00d4ff] flex items-center justify-center text-[#0a1628] font-bold text-xl flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                        <span className="text-sm text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 pt-4 border-t border-white/10">
                    <Clock className="w-4 h-4" />
                    <span>Typical duration: {step.duration}</span>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 max-w-3xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-semibold">
                  {step.step}
                </div>
                <h4 className="text-sm font-medium">{step.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Let's Build Something Beautiful Together
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Whether you're renovating your home or working on a new project, 
            our team is ready to help you find the perfect solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
              <Link to="/contact">Schedule a Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/products/windows">View Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
