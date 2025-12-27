import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';

// Premium animated SVG designs for product pages
const ProductDesignShowcase = ({ category = 'windows' }) => {
  const [activeDesign, setActiveDesign] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const windowTypes = [
    {
      name: 'Casement',
      description: 'Side-hinged, opens outward',
      features: ['90° opening', 'Easy cleaning', 'Maximum ventilation'],
    },
    {
      name: 'Sliding',
      description: 'Horizontal sliding panels',
      features: ['Space-saving', 'Smooth operation', 'Multiple tracks'],
    },
    {
      name: 'Tilt & Turn',
      description: 'Dual-mode European style',
      features: ['Tilt for ventilation', 'Turn for cleaning', 'Child-safe'],
    },
    {
      name: 'Fixed',
      description: 'Non-opening, max light',
      features: ['Maximum glass area', 'Best insulation', 'Custom shapes'],
    },
  ];

  const doorTypes = [
    {
      name: 'Sliding',
      description: 'Smooth horizontal movement',
      features: ['Space efficient', 'Wide openings', 'Heavy-duty rollers'],
    },
    {
      name: 'Bi-fold',
      description: 'Folding panel system',
      features: ['Maximum opening', 'Dramatic views', '2-7 panels'],
    },
    {
      name: 'Casement',
      description: 'Traditional hinged doors',
      features: ['Classic design', 'Multi-point locking', 'Single/Double'],
    },
    {
      name: 'Lift & Slide',
      description: 'Premium lifting mechanism',
      features: ['Effortless operation', 'Large panels', 'Superior sealing'],
    },
  ];

  const types = category === 'windows' ? windowTypes : doorTypes;

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl mb-3">Interactive Design Explorer</h2>
        <p className="text-muted-foreground">Click on each type to see the opening mechanism</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {types.map((type, index) => (
          <motion.div
            key={type.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 overflow-hidden",
              activeDesign === index
                ? "border-[hsl(var(--accent))] shadow-xl"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => setActiveDesign(index)}
            whileHover={{ y: -4 }}
          >
            {/* Animated SVG Preview */}
            <div className="aspect-square mb-4 relative">
              <AnimatedProductSVG 
                type={type.name.toLowerCase().replace(' & ', '-').replace(' ', '-')} 
                category={category}
                isActive={activeDesign === index}
                isAnimating={isAnimating}
              />
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
            
            <ul className="space-y-1">
              {type.features.map((feature, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            {/* Active indicator */}
            {activeDesign === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute top-3 right-3 w-3 h-3 bg-[hsl(var(--accent))] rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Toggle Animation Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isAnimating ? 'Pause Animations' : 'Play Animations'}
        </button>
      </div>
    </div>
  );
};

// Animated SVG component for different product types
const AnimatedProductSVG = ({ type, category, isActive, isAnimating }) => {
  const strokeColor = isActive ? "#00A8CC" : "#6B7280";
  const fillColor = "rgba(255, 255, 255, 0.95)";
  const glassColor = "rgba(200, 230, 240, 0.4)";
  
  // Common animation variants
  const swingAnimation = isAnimating && isActive ? {
    rotate: [0, -30, -25, -30, 0],
    transition: { duration: 3, repeat: Infinity, repeatDelay: 1 }
  } : {};
  
  const slideAnimation = isAnimating && isActive ? {
    x: [0, -30, -30, 0],
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }
  } : {};
  
  const tiltAnimation = isAnimating && isActive ? {
    rotateX: [0, 20, 20, 0],
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 1 }
  } : {};
  
  const foldAnimation = isAnimating && isActive ? {
    scaleX: [1, 0.3, 0.3, 1],
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }
  } : {};

  if (category === 'windows') {
    switch (type) {
      case 'casement':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Frame */}
            <rect x="20" y="20" width="160" height="160" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            {/* Fixed part */}
            <rect x="25" y="25" width="70" height="150" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* Opening sash */}
            <motion.g
              style={{ originX: '155px', originY: '100px' }}
              animate={swingAnimation}
            >
              <rect x="100" y="25" width="75" height="150" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="105" y="30" width="65" height="140" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              {/* Handle */}
              <rect x="108" y="90" width="8" height="25" rx="2" fill={strokeColor} />
            </motion.g>
            {/* Hinge indicators */}
            <circle cx="175" cy="40" r="3" fill={strokeColor} />
            <circle cx="175" cy="160" r="3" fill={strokeColor} />
          </svg>
        );
        
      case 'sliding':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Frame */}
            <rect x="20" y="20" width="160" height="160" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            {/* Fixed panel */}
            <rect x="25" y="25" width="75" height="150" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* Sliding panel */}
            <motion.g animate={slideAnimation}>
              <rect x="100" y="25" width="75" height="150" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="105" y="30" width="65" height="140" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              <rect x="107" y="90" width="6" height="20" rx="1" fill={strokeColor} />
            </motion.g>
            {/* Track lines */}
            <line x1="20" y1="178" x2="180" y2="178" stroke={strokeColor} strokeWidth="2" />
            <line x1="20" y1="182" x2="180" y2="182" stroke={strokeColor} strokeWidth="2" />
            {/* Arrows */}
            {isActive && (
              <motion.g
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M85 100 L70 100 M70 100 L77 93 M70 100 L77 107" stroke={strokeColor} strokeWidth="2" fill="none" />
              </motion.g>
            )}
          </svg>
        );
        
      case 'tilt-turn':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ perspective: '200px' }}>
            {/* Frame */}
            <rect x="30" y="20" width="140" height="160" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            {/* Sash with tilt animation */}
            <motion.g
              style={{ originX: '100px', originY: '180px', transformStyle: 'preserve-3d' }}
              animate={tiltAnimation}
            >
              <rect x="35" y="25" width="130" height="150" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="40" y="30" width="120" height="140" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              {/* Handle */}
              <rect x="95" y="90" width="10" height="30" rx="2" fill={strokeColor} />
            </motion.g>
            {/* Tilt indicator */}
            {isActive && (
              <motion.path 
                d="M100 15 L100 5 M95 10 L100 5 L105 10" 
                stroke={strokeColor} 
                strokeWidth="2" 
                fill="none"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </svg>
        );
        
      case 'fixed':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Minimal frame */}
            <rect x="15" y="15" width="170" height="170" fill="none" stroke={strokeColor} strokeWidth="3" rx="2" />
            {/* Large glass area */}
            <motion.rect 
              x="20" y="20" width="160" height="160" 
              fill={glassColor} 
              stroke={strokeColor} 
              strokeWidth="1"
              animate={isActive ? { 
                fill: ['rgba(200, 230, 240, 0.4)', 'rgba(200, 230, 240, 0.6)', 'rgba(200, 230, 240, 0.4)'] 
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Reflection effect */}
            {isActive && (
              <motion.line 
                x1="30" y1="30" x2="80" y2="80" 
                stroke="white" 
                strokeWidth="2" 
                opacity="0.6"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {/* No handle - fixed */}
            <text x="100" y="105" textAnchor="middle" fontSize="10" fill={strokeColor} opacity="0.5">FIXED</text>
          </svg>
        );
        
      default:
        return null;
    }
  } else {
    // Door SVGs
    switch (type) {
      case 'sliding':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="10" y="10" width="180" height="180" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            {/* Fixed panel */}
            <rect x="15" y="15" width="85" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* Sliding door */}
            <motion.g animate={slideAnimation}>
              <rect x="100" y="15" width="85" height="170" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="105" y="25" width="75" height="100" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              <rect x="105" y="130" width="35" height="50" fill="none" stroke={strokeColor} strokeWidth="1" />
              <rect x="145" y="130" width="35" height="50" fill="none" stroke={strokeColor} strokeWidth="1" />
              <rect x="103" y="85" width="8" height="30" rx="2" fill={strokeColor} />
            </motion.g>
            <line x1="10" y1="192" x2="190" y2="192" stroke={strokeColor} strokeWidth="3" />
          </svg>
        );
        
      case 'bi-fold':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="10" y="10" width="180" height="180" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            {/* Folding panels */}
            {[0, 1, 2, 3].map((i) => (
              <motion.g key={i} animate={i % 2 === 1 ? foldAnimation : {}} style={{ originX: `${25 + i * 45}px` }}>
                <rect x={15 + i * 45} y="15" width="40" height="170" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                <rect x={18 + i * 45} y="25" width="34" height="120" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              </motion.g>
            ))}
            <line x1="10" y1="192" x2="190" y2="192" stroke={strokeColor} strokeWidth="3" />
          </svg>
        );
        
      case 'casement':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="20" y="10" width="160" height="180" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            <motion.g style={{ originX: '180px', originY: '100px' }} animate={swingAnimation}>
              <rect x="100" y="15" width="75" height="170" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="105" y="25" width="65" height="100" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              <rect x="105" y="130" width="65" height="50" fill="none" stroke={strokeColor} strokeWidth="1" />
              <circle cx="115" cy="100" r="5" fill={strokeColor} />
            </motion.g>
            <rect x="25" y="15" width="70" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
          </svg>
        );
        
      case 'lift-slide':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="10" y="10" width="180" height="180" fill="none" stroke={strokeColor} strokeWidth="4" rx="2" />
            <rect x="15" y="15" width="85" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* Lifting door with animation */}
            <motion.g 
              animate={isAnimating && isActive ? {
                y: [0, -5, -5, 0],
                x: [0, 0, -30, 0],
              } : {}}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <rect x="100" y="15" width="85" height="170" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
              <rect x="105" y="25" width="75" height="155" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
              <rect x="103" y="90" width="10" height="25" rx="2" fill={strokeColor} />
            </motion.g>
            {/* Lift indicator */}
            {isActive && (
              <motion.path 
                d="M145 8 L145 3 M140 5 L145 0 L150 5" 
                stroke={strokeColor} 
                strokeWidth="2" 
                fill="none"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </svg>
        );
        
      default:
        return null;
    }
  }
};

export default ProductDesignShowcase;
export { AnimatedProductSVG };
