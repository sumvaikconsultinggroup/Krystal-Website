import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, RotateCcw, Info, ChevronRight, Volume2, VolumeX, Maximize2, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

// Detailed Interactive Window/Door Component with Hotspots
const InteractiveProduct = ({ type, isPlaying, showHotspots = true }) => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const accentColor = '#00A8CC';
  const frameColor = '#F3F4F6';
  const glassColor = 'rgba(200, 230, 240, 0.5)';

  // Hotspot data with educational info
  const hotspots = {
    casement: [
      { id: 'frame', x: 30, y: 120, label: 'uPVC Frame', info: 'Multi-chamber design with 60mm profile depth. Provides excellent thermal insulation.' },
      { id: 'glass', x: 200, y: 120, label: 'Double Glazed Unit', info: '24mm sealed unit with argon gas fill. Reduces heat transfer by up to 50%.' },
      { id: 'handle', x: 110, y: 180, label: 'Espagnolette Handle', info: 'Activates multi-point locking for security. Turns 90° to unlock.' },
      { id: 'hinge', x: 335, y: 70, label: 'Friction Stay Hinge', info: 'Premium stainless steel. Holds window at any angle up to 90°.' },
      { id: 'gasket', x: 80, y: 50, label: 'EPDM Gaskets', info: 'Twin sealing system. Weatherproof rating: 600 Pa wind, 450 Pa water.' },
    ],
    sliding: [
      { id: 'frame', x: 30, y: 120, label: 'uPVC Frame', info: 'Reinforced 60mm profile with 2-3 track options for multiple panels.' },
      { id: 'roller', x: 200, y: 330, label: 'Tandem Rollers', info: 'Heavy-duty steel rollers with PTFE coating. Supports up to 200kg per sash.' },
      { id: 'interlock', x: 200, y: 180, label: 'Interlocking Stile', info: 'Overlapping design prevents drafts. Enhanced security at meeting point.' },
      { id: 'track', x: 100, y: 350, label: 'Aluminum Track', info: 'Precision-engineered track for smooth, quiet operation. Self-draining design.' },
    ],
    tiltTurn: [
      { id: 'frame', x: 30, y: 120, label: 'uPVC Frame', info: '70mm premium profile for enhanced insulation. European standard.' },
      { id: 'handle', x: 180, y: 180, label: 'Tilt-Turn Handle', info: '3-position handle: closed, tilt (90°), turn (180°). Child-safe locking option.' },
      { id: 'scissors', x: 330, y: 50, label: 'Scissor Stay', info: 'Enables both tilt and turn functions. German engineered mechanism.' },
      { id: 'mushroom', x: 60, y: 280, label: 'Mushroom Cams', info: 'RC2 security rating. Resists forced entry attempts.' },
    ],
    bifold: [
      { id: 'frame', x: 30, y: 120, label: 'Aluminum Frame', info: 'Slim 35mm sightlines for maximum glass area. Powder-coated finish.' },
      { id: 'hinge', x: 150, y: 180, label: 'Bi-fold Hinge', info: 'Marine-grade stainless steel. Allows 180° fold for maximum opening.' },
      { id: 'track', x: 200, y: 350, label: 'Bottom Track', info: 'Low threshold (24mm) for easy access. Concealed drainage.' },
      { id: 'magnet', x: 320, y: 280, label: 'Magnetic Seals', info: 'Self-aligning magnetic gaskets for weathertight closure.' },
    ],
  };

  const currentHotspots = hotspots[type] || hotspots.casement;

  // SVG Renderers for each type
  const renderCasement = () => (
    <g>
      {/* Main frame */}
      <rect x="20" y="20" width="320" height="320" fill="none" stroke="#374151" strokeWidth="8" rx="4" />
      
      {/* Frame profile */}
      <rect x="28" y="28" width="35" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="297" y="28" width="35" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="28" y="28" width="304" height="35" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="28" y="297" width="304" height="35" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      
      {/* Fixed pane */}
      <rect x="68" y="68" width="110" height="224" fill={glassColor} stroke="#93C5FD" strokeWidth="2" />
      
      {/* Opening sash with animation */}
      <motion.g
        style={{ originX: '293px', originY: '180px' }}
        animate={isPlaying ? {
          rotateY: [0, -25, -20, -25, 0],
          scale: [1, 1.02, 1.02, 1.02, 1]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
      >
        <rect x="183" y="68" width="110" height="224" fill="white" stroke="#374151" strokeWidth="3" />
        <rect x="188" y="73" width="100" height="214" fill={glassColor} stroke="#93C5FD" strokeWidth="1.5" />
        
        {/* Handle */}
        <rect x="193" y="170" width="12" height="40" rx="3" fill="#374151" />
        <rect x="195" y="175" width="8" height="8" rx="1" fill="#6B7280" />
      </motion.g>
      
      {/* Hinges */}
      <rect x="290" y="80" width="12" height="25" rx="2" fill="#6B7280" />
      <rect x="290" y="255" width="12" height="25" rx="2" fill="#6B7280" />
      
      {/* Division bar */}
      <rect x="175" y="28" width="10" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
    </g>
  );

  const renderSliding = () => (
    <g>
      {/* Main frame */}
      <rect x="20" y="20" width="320" height="320" fill="none" stroke="#374151" strokeWidth="8" rx="4" />
      
      {/* Frame profile */}
      <rect x="28" y="28" width="25" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="307" y="28" width="25" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="28" y="28" width="304" height="25" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      
      {/* Fixed pane */}
      <rect x="58" y="58" width="130" height="254" fill={glassColor} stroke="#93C5FD" strokeWidth="2" />
      
      {/* Sliding pane with animation */}
      <motion.g
        animate={isPlaying ? {
          x: [0, -60, -60, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      >
        <rect x="170" y="55" width="135" height="260" fill="white" stroke="#374151" strokeWidth="3" />
        <rect x="175" y="60" width="125" height="250" fill={glassColor} stroke="#93C5FD" strokeWidth="1.5" />
        
        {/* Handle */}
        <rect x="180" y="170" width="10" height="40" rx="2" fill="#374151" />
      </motion.g>
      
      {/* Track at bottom */}
      <rect x="28" y="312" width="304" height="8" fill="#9CA3AF" />
      <rect x="28" y="322" width="304" height="8" fill="#9CA3AF" />
      
      {/* Sliding arrows indicator */}
      {isPlaying && (
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path d="M130 180 L100 180 M100 180 L110 170 M100 180 L110 190" stroke={accentColor} strokeWidth="3" fill="none" />
        </motion.g>
      )}
    </g>
  );

  const renderTiltTurn = () => (
    <g>
      {/* Main frame */}
      <rect x="40" y="20" width="280" height="320" fill="none" stroke="#374151" strokeWidth="8" rx="4" />
      
      {/* Frame profile */}
      <rect x="48" y="28" width="25" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="287" y="28" width="25" height="304" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="48" y="28" width="264" height="25" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      <rect x="48" y="307" width="264" height="25" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
      
      {/* Sash with tilt animation */}
      <motion.g
        style={{ originX: '180px', originY: '332px', transformPerspective: 800 }}
        animate={isPlaying ? {
          rotateX: [0, 15, 15, 0, 0, 0],
          rotateY: [0, 0, 0, 0, -20, 0],
        } : {}}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 1 }}
      >
        <rect x="78" y="58" width="204" height="249" fill="white" stroke="#374151" strokeWidth="3" />
        <rect x="83" y="63" width="194" height="239" fill={glassColor} stroke="#93C5FD" strokeWidth="1.5" />
        
        {/* Center mullion */}
        <line x1="180" y1="63" x2="180" y2="302" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="8,4" />
        
        {/* Handle */}
        <rect x="170" y="170" width="20" height="45" rx="4" fill="#374151" />
        <circle cx="180" cy="180" r="5" fill="#6B7280" />
      </motion.g>
      
      {/* Mode indicator */}
      {isPlaying && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 1, times: [0, 0.1, 0.4, 0.5, 0.9, 1] }}
        >
          <text x="180" y="15" textAnchor="middle" fontSize="12" fill={accentColor} fontWeight="600">TILT MODE</text>
        </motion.g>
      )}
      {isPlaying && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 1, times: [0, 0.5, 0.55, 0.6, 0.7, 1] }}
        >
          <text x="180" y="15" textAnchor="middle" fontSize="12" fill={accentColor} fontWeight="600">TURN MODE</text>
        </motion.g>
      )}
    </g>
  );

  const renderBifold = () => (
    <g>
      {/* Main frame */}
      <rect x="10" y="20" width="340" height="320" fill="none" stroke="#374151" strokeWidth="6" rx="4" />
      
      {/* Track */}
      <rect x="10" y="332" width="340" height="8" fill="#6B7280" />
      
      {/* Panels with fold animation */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g
          key={i}
          style={{ originX: `${20 + i * 85}px`, originY: '180px' }}
          animate={isPlaying && i % 2 === 1 ? {
            scaleX: [1, 0.2, 0.2, 1],
            x: [0, -20, -20, 0],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <rect x={20 + i * 85} y="28" width="75" height="304" fill="white" stroke="#374151" strokeWidth="2" />
          <rect x={25 + i * 85} y="35" width="65" height="220" fill={glassColor} stroke="#93C5FD" strokeWidth="1" />
          <rect x={25 + i * 85} y="260" width="65" height="65" fill="white" stroke="#D1D5DB" strokeWidth="1" />
        </motion.g>
      ))}
      
      {/* Fold indicators */}
      {isPlaying && (
        <motion.g
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path d="M105 180 Q120 170 105 160" stroke={accentColor} strokeWidth="2" fill="none" />
          <path d="M275 180 Q260 170 275 160" stroke={accentColor} strokeWidth="2" fill="none" />
        </motion.g>
      )}
    </g>
  );

  const renderers = {
    casement: renderCasement,
    sliding: renderSliding,
    tiltTurn: renderTiltTurn,
    bifold: renderBifold,
  };

  return (
    <TooltipProvider>
      <svg viewBox="0 0 360 370" className="w-full h-full">
        {(renderers[type] || renderers.casement)()}
        
        {/* Hotspots */}
        {showHotspots && currentHotspots.map((hotspot) => (
          <Tooltip key={hotspot.id}>
            <TooltipTrigger asChild>
              <motion.g
                onMouseEnter={() => setHoveredPart(hotspot.id)}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
              >
                <motion.circle
                  cx={hotspot.x}
                  cy={hotspot.y}
                  r="12"
                  fill={accentColor}
                  opacity={hoveredPart === hotspot.id ? 1 : 0.8}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx={hotspot.x} cy={hotspot.y} r="5" fill="white" />
              </motion.g>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs p-3">
              <p className="font-semibold mb-1">{hotspot.label}</p>
              <p className="text-xs text-muted-foreground">{hotspot.info}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </svg>
    </TooltipProvider>
  );
};

// Main Interactive Showcase Component
export default function InteractiveProductShowcase({ category = 'windows' }) {
  const [activeType, setActiveType] = useState('casement');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  const windowTypes = [
    { id: 'casement', name: 'Casement', tagline: 'Side-hinged, opens outward for maximum ventilation' },
    { id: 'sliding', name: 'Sliding', tagline: 'Horizontal glide, ideal for compact spaces' },
    { id: 'tiltTurn', name: 'Tilt & Turn', tagline: 'European dual-mode for versatile operation' },
  ];

  const doorTypes = [
    { id: 'sliding', name: 'Sliding', tagline: 'Smooth horizontal movement for wide openings' },
    { id: 'bifold', name: 'Bi-fold', tagline: 'Folding panels for maximum opening width' },
    { id: 'casement', name: 'French', tagline: 'Classic hinged doors for elegant entrances' },
  ];

  const types = category === 'windows' ? windowTypes : doorTypes;
  const activeTypeData = types.find(t => t.id === activeType) || types[0];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border bg-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-serif text-2xl mb-1">Interactive {category === 'windows' ? 'Window' : 'Door'} Explorer</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Click types below • Hover hotspots for details • Watch animations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHotspots(!showHotspots)}
              className={cn(showHotspots && "bg-[hsl(var(--accent))]/10 border-[hsl(var(--accent))]" )}
            >
              <Info className="w-4 h-4 mr-1" />
              Hotspots {showHotspots ? 'On' : 'Off'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
        </div>
      </div>

      {/* Type Selector */}
      <div className="px-6 py-4 bg-gray-50 border-b border-border">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {types.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "px-5 py-3 rounded-lg text-left flex-shrink-0 transition-all min-w-[140px]",
                activeType === type.id
                  ? "bg-white shadow-md border-2 border-[hsl(var(--accent))]"
                  : "bg-white/50 border border-gray-200 hover:bg-white hover:shadow-sm"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={cn(
                "font-semibold block mb-0.5",
                activeType === type.id ? "text-[hsl(var(--accent))]" : "text-foreground"
              )}>
                {type.name}
              </span>
              <span className="text-xs text-muted-foreground line-clamp-2">{type.tagline}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Interactive SVG */}
        <div className="p-8 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
          <div className="w-full max-w-md aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <InteractiveProduct 
                  type={activeType} 
                  isPlaying={isPlaying} 
                  showHotspots={showHotspots}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Info Panel */}
        <div className="p-8 bg-white border-l border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-serif text-2xl mb-2">{activeTypeData.name} {category === 'windows' ? 'Windows' : 'Doors'}</h4>
              <p className="text-muted-foreground mb-6">{activeTypeData.tagline}</p>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Key Features</h5>
                {getFeatures(activeType, category).map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <span className="font-medium block">{feature.title}</span>
                      <span className="text-sm text-muted-foreground">{feature.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <Button className="w-full btn-accent" size="lg">
                  Get Quote for {activeTypeData.name} {category === 'windows' ? 'Windows' : 'Doors'}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Helper function for features
function getFeatures(type, category) {
  const features = {
    casement: [
      { title: 'Maximum Ventilation', desc: 'Opens up to 90° for full airflow' },
      { title: 'Easy Cleaning', desc: 'Sash swings inward for exterior access' },
      { title: 'Superior Sealing', desc: 'Compression seal against weather' },
      { title: 'Multi-point Locking', desc: '3-5 locking points for security' },
    ],
    sliding: [
      { title: 'Space Efficient', desc: 'No swing space required' },
      { title: 'Large Openings', desc: 'Up to 50% opening area' },
      { title: 'Smooth Operation', desc: 'Heavy-duty tandem rollers' },
      { title: 'Multiple Tracks', desc: '2, 3, or 4 track options' },
    ],
    tiltTurn: [
      { title: 'Dual Operation', desc: 'Tilt for ventilation, turn for cleaning' },
      { title: 'Child Safety', desc: 'Tilt mode allows secure ventilation' },
      { title: 'European Engineering', desc: 'Premium German hardware' },
      { title: 'All-Weather Sealing', desc: 'Triple seal system' },
    ],
    bifold: [
      { title: 'Maximum Opening', desc: 'Up to 90% opening width' },
      { title: 'Indoor-Outdoor Flow', desc: 'Seamless transition to outdoors' },
      { title: 'Flexible Configurations', desc: '2 to 7 panel options' },
      { title: 'Low Threshold', desc: 'Wheelchair accessible option' },
    ],
  };
  return features[type] || features.casement;
}

export { InteractiveProduct };
