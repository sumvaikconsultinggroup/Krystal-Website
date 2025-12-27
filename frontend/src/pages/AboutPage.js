import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Users, Factory, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getBreadcrumbSchema } from '../lib/seo';

const ABOUT_HERO = 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80';
const FACTORY_IMAGE = 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800&q=80';

const stats = [
  { value: '12+', label: 'Years Experience', icon: Award },
  { value: '5000+', label: 'Projects Completed', icon: Factory },
  { value: '150+', label: 'Team Members', icon: Users },
];

const milestones = [
  { year: '2012', title: 'Founded', description: 'Established in Gurugram with a vision to bring premium uPVC solutions to Delhi NCR.' },
  { year: '2015', title: 'Manufacturing Expansion', description: 'Opened state-of-the-art fabrication facility with German machinery.' },
  { year: '2018', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems.' },
  { year: '2020', title: '3000+ Installations', description: 'Crossed milestone of 3000 successful residential and commercial installations.' },
  { year: '2023', title: 'Regional Leader', description: 'Recognized as leading uPVC solutions provider in Delhi NCR region.' },
];

const values = [
  { title: 'Quality First', description: 'We never compromise on materials or workmanship. Every product meets international standards.' },
  { title: 'Customer Focus', description: 'Your satisfaction drives everything we do. From consultation to after-sales, we\'re with you.' },
  { title: 'Innovation', description: 'Continuously adopting new technologies and techniques to deliver better solutions.' },
  { title: 'Integrity', description: 'Transparent pricing, honest advice, and commitments we always keep.' },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Krystal Magic World - uPVC Experts Since 2012</title>
        <meta name="description" content="Learn about Krystal Magic World - Delhi NCR's trusted uPVC doors & windows manufacturer since 2012. Quality craftsmanship, German technology, ISO certified." />
        <link rel="canonical" href="https://krystalmagicworld.com/about" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={ABOUT_HERO}
          alt="Krystal Magic World - Premium uPVC Solutions"
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
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">About Krystal Magic World</h1>
              <p className="text-lg text-white/80">
                Crafting architectural excellence in uPVC since 2012
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-serif text-[hsl(var(--accent))] mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-spacing bg-background">
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
                  Krystal Magic World was founded in 2012 with a singular vision: to bring international-quality 
                  uPVC windows and doors to Indian homes. Starting from a small workshop in Gurugram, we've grown 
                  into one of Delhi NCR's most trusted names in architectural glazing solutions.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our journey began when our founders, experienced in the construction industry, recognized a gap 
                  in the market for premium yet accessible uPVC solutions. Traditional wooden and aluminum windows 
                  couldn't meet the acoustic, thermal, and maintenance-free expectations of modern homeowners.
                </p>
                <p className="text-muted-foreground">
                  Today, with over 5,000 successful installations across residential and commercial projects, 
                  we continue to set benchmarks in quality, service, and customer satisfaction. Our state-of-the-art 
                  manufacturing facility, equipped with German machinery, ensures every product meets the highest 
                  standards of precision and durability.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={FACTORY_IMAGE}
                alt="Krystal Magic World Manufacturing Facility"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-secondary/30" id="infrastructure">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="inline-block p-6 max-w-md">
                      <div className="text-[hsl(var(--accent))] font-semibold mb-2">{milestone.year}</div>
                      <h3 className="font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-[hsl(var(--accent))] z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Standards */}
      <section className="section-spacing bg-background" id="quality">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <Card key={value.title} className="p-6">
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-[hsl(var(--accent))] text-sm font-medium uppercase tracking-wider">Quality Commitment</span>
              <h2 className="font-serif text-3xl sm:text-4xl mt-2 mb-6">Excellence in Every Detail</h2>
              <p className="text-muted-foreground mb-6">
                At Krystal Magic World, quality isn't just a promise—it's embedded in everything we do. 
                From sourcing premium uPVC profiles to precision fabrication and meticulous installation, 
                every step is governed by strict quality controls.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'ISO 9001:2015 certified processes',
                  'Premium European profile systems',
                  'German precision machinery',
                  'Trained installation teams',
                  'Comprehensive warranty coverage'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing bg-[#1a1a1a] text-white" id="process">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">How We Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A streamlined process for perfect results every time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: 'Consult', desc: 'Understand your requirements and preferences' },
              { step: 2, title: 'Measure', desc: 'Precise digital measurement of all openings' },
              { step: 3, title: 'Design', desc: 'Custom solution design and quotation' },
              { step: 4, title: 'Fabricate', desc: 'Manufacturing with German precision' },
              { step: 5, title: 'Install', desc: 'Professional installation and handover' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white font-semibold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
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
              <Link to="/contact">Get in Touch</Link>
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
