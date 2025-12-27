import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Thermometer, Droplets, Wind, Volume2 } from 'lucide-react';
import { Button } from '../ui/button';

// The exact image provided by user
const HERO_IMAGE = 'https://customer-assets.emergentagent.com/job_luxury-upvc/artifacts/ddl3c2g4_freepik__attached-reference-posters-for-some-brand-image-3-__51788.jpeg';

// Feature icons with animation - Responsive sizes
const FeatureIcon = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center gap-1 sm:gap-2"
  >
    <motion.div 
      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
      animate={{ 
        boxShadow: ['0 0 0 0 rgba(255,255,255,0.3)', '0 0 0 10px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0)']
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity, delay: delay }
      }}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
    </motion.div>
    <span className="text-[10px] sm:text-xs text-white/80 font-medium text-center">{label}</span>
  </motion.div>
);

// Floating window/door element animation - Hidden on mobile
const FloatingElement = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hidden lg:block ${className}`}
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
      className="relative min-h-[100svh] sm:min-h-screen overflow-hidden bg-[#0a1628]" 
      data-testid="home-hero"
    >
      {/* Animated Background Image - Responsive positioning */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0"
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Premium uPVC Doors and Windows - The World at Your Doorstep"
          className="w-full h-[120%] object-cover object-center sm:object-right-top"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Gradient overlays - Responsive */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]/70 sm:via-[#0a1628]/90 sm:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </motion.div>

      {/* Floating decorative elements - Desktop only */}
      <FloatingElement className="w-32 h-48 top-[20%] right-[15%]" delay={0} />
      <FloatingElement className="w-24 h-36 top-[40%] right-[8%]" delay={0.5} />
      <FloatingElement className="w-20 h-28 bottom-[25%] right-[20%]" delay={1} />

      {/* Main Content - Fully responsive */}
      <div className="relative container h-full min-h-[100svh] sm:min-h-screen flex items-center py-20 sm:py-0">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="max-w-3xl w-full"
        >
          {/* Animated badge - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6"
          >
            <motion.span 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00d4ff]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm text-white/90 font-medium">Premium uPVC Solutions Since 2012</span>
          </motion.div>

          {/* Main headline - Fully responsive */}
          <motion.h1 
            className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white mb-4 sm:mb-6"
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

          {/* Subtitle - Responsive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl leading-relaxed"
          >
            Premium uPVC Doors & Windows. Weather Resistant & Durable. 
            Transforming Delhi NCR homes with German engineering.
          </motion.p>

          {/* Feature icons row - Responsive grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-4 md:gap-6 mb-6 sm:mb-10"
          >
            <FeatureIcon icon={Thermometer} label="Heat Resistant" delay={1.6} />
            <FeatureIcon icon={Droplets} label="Water Resistant" delay={1.7} />
            <FeatureIcon icon={Wind} label="Wind Resistant" delay={1.8} />
            <FeatureIcon icon={Volume2} label="Sound Resistant" delay={1.9} />
          </motion.div>

          {/* CTA Buttons - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                onClick={onGetQuote}
                className="w-full sm:w-auto bg-[#00d4ff] text-[#0a1628] hover:bg-[#00d4ff]/90 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-lg shadow-[#00d4ff]/20"
                data-testid="get-quote-button"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base backdrop-blur-sm"
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

      {/* Scroll indicator - Hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 hidden sm:flex"
      >
        <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 sm:p-2"
          animate={{ borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Animated corner accent - Desktop only */}
      <motion.div
        className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 pointer-events-none hidden md:block"
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
