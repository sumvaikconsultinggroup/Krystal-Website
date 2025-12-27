import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Thermometer, Droplets, Wind, Volume2 } from 'lucide-react';
import { Button } from '../ui/button';

// The exact image provided by user
const HERO_IMAGE = 'https://customer-assets.emergentagent.com/job_luxury-upvc/artifacts/ddl3c2g4_freepik__attached-reference-posters-for-some-brand-image-3-__51788.jpeg';

// Feature icons with animation
const FeatureIcon = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center gap-2"
  >
    <motion.div 
      className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
      animate={{ 
        boxShadow: ['0 0 0 0 rgba(255,255,255,0.3)', '0 0 0 10px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0)']
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity, delay: delay }
      }}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.div>
    <span className="text-xs text-white/80 font-medium">{label}</span>
  </motion.div>
);

// Floating window/door element animation
const FloatingElement = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      y: [0, -10, 0],
      scale: [1, 1.02, 1]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut"
    }}
  />
);

export default function AnimatedHero({ onGetQuote }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section 
      ref={heroRef} 
      className="relative h-[100vh] min-h-[700px] overflow-hidden bg-[#1a2b3c]" 
      data-testid="home-hero"
    >
      {/* Animated Background Image */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0"
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Premium uPVC Doors and Windows - The World at Your Doorstep"
          className="w-full h-[120%] object-cover object-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Animated gradient overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 via-[#0a1628]/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-[#0a1628]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <FloatingElement className="w-32 h-48 top-[20%] right-[15%]" delay={0} />
      <FloatingElement className="w-24 h-36 top-[40%] right-[8%]" delay={0.5} />
      <FloatingElement className="w-20 h-28 bottom-[25%] right-[20%]" delay={1} />

      {/* Main Content */}
      <div className="relative container h-full flex items-center">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="max-w-3xl"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-[#00d4ff]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-white/90 font-medium">Premium uPVC Solutions Since 2012</span>
          </motion.div>

          {/* Main headline with word-by-word animation */}
          <motion.h1 
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6"
          >
            {['THE', 'WORLD', 'AT YOUR', 'DOORSTEP.'].map((word, index) => (
              <motion.span
                key={index}
                className={`block ${index === 1 ? 'text-[#00d4ff]' : ''}`}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.15,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle with fade-in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
          >
            Premium uPVC Doors & Windows. Weather Resistant & Durable. 
            Transforming Delhi NCR homes with German engineering.
          </motion.p>

          {/* Feature icons row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            <FeatureIcon icon={Thermometer} label="Heat Resistant" delay={1.6} />
            <FeatureIcon icon={Droplets} label="Water Resistant" delay={1.7} />
            <FeatureIcon icon={Wind} label="Wind Resistant" delay={1.8} />
            <FeatureIcon icon={Volume2} label="Sound Resistant" delay={1.9} />
          </motion.div>

          {/* CTA Buttons with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={onGetQuote}
                className="bg-[#00d4ff] text-[#0a1628] hover:bg-[#00d4ff]/90 font-semibold px-8 py-6 text-base shadow-lg shadow-[#00d4ff]/20"
                data-testid="get-quote-button"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base backdrop-blur-sm"
                asChild
                data-testid="explore-range-button"
              >
                <Link to="/products/windows">
                  Explore Range
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          animate={{ borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/80"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <motion.path
            d="M400 0 L400 150 Q400 200 350 200 L200 200"
            fill="none"
            stroke="rgba(0,212,255,0.2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M400 0 L400 100 Q400 120 380 120 L280 120"
            fill="none"
            stroke="rgba(0,212,255,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
