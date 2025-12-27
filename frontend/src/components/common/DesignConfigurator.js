import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ZoomIn, Maximize2, Grid3X3 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// SVG Window/Door Designs
const windowDesigns = {
  casement: [
    { id: 'c1', name: 'Single Panel', panels: 1, svg: 'single' },
    { id: 'c2', name: 'Double Panel', panels: 2, svg: 'double' },
    { id: 'c3', name: 'Triple Panel', panels: 3, svg: 'triple' },
    { id: 'c4', name: 'Fixed + Opening', panels: 2, svg: 'fixed-opening' },
    { id: 'c5', name: 'Triple with Fixed', panels: 3, svg: 'triple-fixed' },
    { id: 'c6', name: 'Four Panel', panels: 4, svg: 'quad' },
  ],
  sliding: [
    { id: 's1', name: '2 Track', panels: 2, svg: 'slide-2' },
    { id: 's2', name: '3 Track', panels: 3, svg: 'slide-3' },
    { id: 's3', name: '4 Track', panels: 4, svg: 'slide-4' },
    { id: 's4', name: '2+2 Configuration', panels: 4, svg: 'slide-2-2' },
  ],
  tiltTurn: [
    { id: 't1', name: 'Single Tilt & Turn', panels: 1, svg: 'tilt-single' },
    { id: 't2', name: 'Double Tilt & Turn', panels: 2, svg: 'tilt-double' },
    { id: 't3', name: 'Tilt + Fixed', panels: 2, svg: 'tilt-fixed' },
  ],
};

const doorDesigns = {
  sliding: [
    { id: 'ds1', name: '2 Panel Sliding', panels: 2, svg: 'door-slide-2' },
    { id: 'ds2', name: '3 Panel Sliding', panels: 3, svg: 'door-slide-3' },
    { id: 'ds3', name: '4 Panel Sliding', panels: 4, svg: 'door-slide-4' },
  ],
  casement: [
    { id: 'dc1', name: 'Single Door', panels: 1, svg: 'door-single' },
    { id: 'dc2', name: 'Double Door', panels: 2, svg: 'door-double' },
    { id: 'dc3', name: 'Door + Side Panel', panels: 2, svg: 'door-side' },
  ],
  bifold: [
    { id: 'db1', name: '3 Panel Bi-fold', panels: 3, svg: 'bifold-3' },
    { id: 'db2', name: '4 Panel Bi-fold', panels: 4, svg: 'bifold-4' },
    { id: 'db3', name: '5 Panel Bi-fold', panels: 5, svg: 'bifold-5' },
    { id: 'db4', name: '6 Panel Bi-fold', panels: 6, svg: 'bifold-6' },
  ],
};

// Animated SVG Components
const WindowSVG = ({ type, isHovered, isSelected }) => {
  const baseClass = "transition-all duration-500";
  const strokeColor = isSelected ? "#00A8CC" : isHovered ? "#00A8CC" : "#374151";
  const fillColor = isHovered || isSelected ? "rgba(0, 168, 204, 0.05)" : "rgba(255, 255, 255, 0.9)";
  
  const renderWindow = () => {
    switch(type) {
      case 'single':
        return (
          <g>
            <motion.rect 
              x="20" y="20" width="160" height="200" 
              fill={fillColor} stroke={strokeColor} strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line x1="100" y1="20" x2="100" y2="220" stroke={strokeColor} strokeWidth="2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }}
            />
            {/* Handle */}
            <motion.rect x="85" y="110" width="10" height="30" rx="2" fill={strokeColor}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}
            />
            {/* Arrow indicator for opening */}
            {(isHovered || isSelected) && (
              <motion.path 
                d="M60 120 L40 120 M40 120 L50 110 M40 120 L50 130" 
                stroke={strokeColor} strokeWidth="2" fill="none"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              />
            )}
          </g>
        );
      
      case 'double':
        return (
          <g>
            <motion.rect x="15" y="20" width="170" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            />
            <motion.line x1="100" y1="20" x2="100" y2="220" stroke={strokeColor} strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }}
            />
            <motion.line x1="57" y1="20" x2="57" y2="220" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="5,5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }}
            />
            <motion.line x1="142" y1="20" x2="142" y2="220" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="5,5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }}
            />
            {/* Handles */}
            <motion.rect x="75" y="110" width="8" height="25" rx="2" fill={strokeColor}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}
            />
            <motion.rect x="117" y="110" width="8" height="25" rx="2" fill={strokeColor}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
            />
            {(isHovered || isSelected) && (
              <>
                <motion.path d="M45 120 L25 120 M25 120 L35 110 M25 120 L35 130" 
                  stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
                <motion.path d="M155 120 L175 120 M175 120 L165 110 M175 120 L165 130" 
                  stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
              </>
            )}
          </g>
        );
      
      case 'triple':
        return (
          <g>
            <motion.rect x="10" y="20" width="180" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="70" y1="20" x2="70" y2="220" stroke={strokeColor} strokeWidth="2.5" />
            <motion.line x1="130" y1="20" x2="130" y2="220" stroke={strokeColor} strokeWidth="2.5" />
            <motion.rect x="55" y="110" width="6" height="20" rx="1" fill={strokeColor} />
            <motion.rect x="95" y="110" width="6" height="20" rx="1" fill={strokeColor} />
            <motion.rect x="138" y="110" width="6" height="20" rx="1" fill={strokeColor} />
          </g>
        );
        
      case 'slide-2':
        return (
          <g>
            <motion.rect x="15" y="20" width="170" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.rect x="20" y="25" width="80" height="190" fill="rgba(255,255,255,0.5)" stroke={strokeColor} strokeWidth="1.5" />
            <motion.rect x="100" y="25" width="80" height="190" fill="rgba(255,255,255,0.5)" stroke={strokeColor} strokeWidth="1.5" />
            {/* Sliding arrows */}
            {(isHovered || isSelected) && (
              <>
                <motion.path d="M60 215 L80 215 M80 215 L75 210 M80 215 L75 220" 
                  stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.path d="M140 215 L120 215 M120 215 L125 210 M120 215 L125 220" 
                  stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </>
            )}
            {/* Track lines */}
            <motion.line x1="15" y1="218" x2="185" y2="218" stroke={strokeColor} strokeWidth="2" />
            <motion.line x1="15" y1="222" x2="185" y2="222" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
        
      case 'slide-3':
        return (
          <g>
            <motion.rect x="10" y="20" width="180" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.rect x="15" y="25" width="55" height="190" fill="rgba(255,255,255,0.5)" stroke={strokeColor} strokeWidth="1.5" />
            <motion.rect x="72" y="25" width="55" height="190" fill="rgba(255,255,255,0.5)" stroke={strokeColor} strokeWidth="1.5" />
            <motion.rect x="129" y="25" width="55" height="190" fill="rgba(255,255,255,0.5)" stroke={strokeColor} strokeWidth="1.5" />
            <motion.line x1="10" y1="218" x2="190" y2="218" stroke={strokeColor} strokeWidth="2" />
            <motion.line x1="10" y1="222" x2="190" y2="222" stroke={strokeColor} strokeWidth="2" />
            <motion.line x1="10" y1="226" x2="190" y2="226" stroke={strokeColor} strokeWidth="2" />
          </g>
        );

      case 'tilt-single':
        return (
          <g>
            <motion.rect x="30" y="20" width="140" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="100" y1="20" x2="100" y2="220" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="5,5" />
            <motion.rect x="90" y="100" width="10" height="40" rx="2" fill={strokeColor} />
            {/* Tilt indicator */}
            {(isHovered || isSelected) && (
              <motion.g
                initial={{ rotate: 0, originX: "50%", originY: "100%" }}
                animate={{ rotate: [-5, 0, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.path d="M100 30 L100 10 M100 10 L90 20 M100 10 L110 20" 
                  stroke={strokeColor} strokeWidth="2" fill="none"
                />
              </motion.g>
            )}
          </g>
        );
        
      default:
        return (
          <g>
            <motion.rect x="20" y="20" width="160" height="200" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="100" y1="20" x2="100" y2="220" stroke={strokeColor} strokeWidth="2" />
          </g>
        );
    }
  };
  
  return (
    <svg viewBox="0 0 200 240" className={cn(baseClass, "w-full h-full")}>
      {renderWindow()}
    </svg>
  );
};

const DoorSVG = ({ type, isHovered, isSelected }) => {
  const strokeColor = isSelected ? "#00A8CC" : isHovered ? "#00A8CC" : "#374151";
  const fillColor = isHovered || isSelected ? "rgba(0, 168, 204, 0.05)" : "rgba(255, 255, 255, 0.9)";
  
  const renderDoor = () => {
    switch(type) {
      case 'door-single':
        return (
          <g>
            <motion.rect x="50" y="10" width="100" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.rect x="60" y="25" width="80" height="100" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            <motion.rect x="60" y="135" width="35" height="80" fill="none" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            <motion.rect x="105" y="135" width="35" height="80" fill="none" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            {/* Handle */}
            <motion.circle cx="135" cy="140" r="8" fill={strokeColor} />
            {(isHovered || isSelected) && (
              <motion.path d="M50 120 Q30 120 30 100 L30 80" 
                stroke={strokeColor} strokeWidth="2" fill="none" strokeDasharray="5,5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              />
            )}
          </g>
        );
        
      case 'door-double':
        return (
          <g>
            <motion.rect x="25" y="10" width="150" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="100" y1="10" x2="100" y2="230" stroke={strokeColor} strokeWidth="3" />
            {/* Left door glass */}
            <motion.rect x="35" y="25" width="55" height="90" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            {/* Right door glass */}
            <motion.rect x="110" y="25" width="55" height="90" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            {/* Lower panels */}
            <motion.rect x="35" y="125" width="55" height="90" fill="none" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            <motion.rect x="110" y="125" width="55" height="90" fill="none" stroke={strokeColor} strokeWidth="1.5" rx="2" />
            {/* Handles */}
            <motion.circle cx="88" cy="140" r="6" fill={strokeColor} />
            <motion.circle cx="112" cy="140" r="6" fill={strokeColor} />
          </g>
        );
        
      case 'bifold-3':
        return (
          <g>
            <motion.rect x="10" y="10" width="180" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="70" y1="10" x2="70" y2="230" stroke={strokeColor} strokeWidth="2" />
            <motion.line x1="130" y1="10" x2="130" y2="230" stroke={strokeColor} strokeWidth="2" />
            {/* Glass panels */}
            <motion.rect x="18" y="25" width="44" height="180" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1" rx="2" />
            <motion.rect x="78" y="25" width="44" height="180" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1" rx="2" />
            <motion.rect x="138" y="25" width="44" height="180" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1" rx="2" />
            {/* Fold indicators */}
            {(isHovered || isSelected) && (
              <>
                <motion.path d="M70 120 Q85 110 70 100" stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                />
                <motion.path d="M130 120 Q115 110 130 100" stroke={strokeColor} strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                />
              </>
            )}
            {/* Track */}
            <motion.line x1="10" y1="228" x2="190" y2="228" stroke={strokeColor} strokeWidth="3" />
          </g>
        );
        
      case 'bifold-4':
        return (
          <g>
            <motion.rect x="5" y="10" width="190" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.line x1="52" y1="10" x2="52" y2="230" stroke={strokeColor} strokeWidth="2" />
            <motion.line x1="100" y1="10" x2="100" y2="230" stroke={strokeColor} strokeWidth="2.5" />
            <motion.line x1="148" y1="10" x2="148" y2="230" stroke={strokeColor} strokeWidth="2" />
            {/* Glass panels */}
            {[12, 59, 107, 155].map((x, i) => (
              <motion.rect key={i} x={x} y="25" width="34" height="180" fill="rgba(200,230,240,0.3)" stroke={strokeColor} strokeWidth="1" rx="2" />
            ))}
            <motion.line x1="5" y1="228" x2="195" y2="228" stroke={strokeColor} strokeWidth="3" />
          </g>
        );

      case 'door-slide-2':
        return (
          <g>
            <motion.rect x="15" y="10" width="170" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
            <motion.rect x="20" y="15" width="80" height="210" fill="rgba(200,230,240,0.2)" stroke={strokeColor} strokeWidth="1.5" />
            <motion.rect x="100" y="15" width="80" height="210" fill="rgba(200,230,240,0.2)" stroke={strokeColor} strokeWidth="1.5" />
            {/* Handles */}
            <motion.rect x="90" y="100" width="8" height="40" rx="2" fill={strokeColor} />
            <motion.rect x="102" y="100" width="8" height="40" rx="2" fill={strokeColor} />
            {/* Sliding animation */}
            {(isHovered || isSelected) && (
              <motion.rect x="100" y="15" width="80" height="210" 
                fill="rgba(0, 168, 204, 0.1)" stroke="none"
                animate={{ x: [0, -30, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {/* Track */}
            <motion.line x1="15" y1="228" x2="185" y2="228" stroke={strokeColor} strokeWidth="3" />
          </g>
        );
        
      default:
        return (
          <g>
            <motion.rect x="40" y="10" width="120" height="220" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
          </g>
        );
    }
  };
  
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      {renderDoor()}
    </svg>
  );
};

export default function DesignConfigurator({ type = 'windows', productType = 'casement' }) {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [hoveredDesign, setHoveredDesign] = useState(null);
  const [view3D, setView3D] = useState(false);
  
  const designs = type === 'windows' ? windowDesigns : doorDesigns;
  const currentDesigns = designs[productType] || designs[Object.keys(designs)[0]];
  
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-2xl">Design Configurations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Explore different panel arrangements. Hover for animations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={view3D ? "default" : "outline"} 
            size="sm"
            onClick={() => setView3D(!view3D)}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            3D View
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {currentDesigns.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative aspect-[4/5] bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 cursor-pointer transition-all duration-300 overflow-hidden group",
              selectedDesign === design.id 
                ? "border-[hsl(var(--accent))] shadow-lg shadow-[hsl(var(--accent))]/20" 
                : "border-gray-200 hover:border-[hsl(var(--accent))]/50"
            )}
            style={{
              perspective: view3D ? '1000px' : 'none',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setHoveredDesign(design.id)}
            onMouseLeave={() => setHoveredDesign(null)}
            onClick={() => setSelectedDesign(design.id === selectedDesign ? null : design.id)}
            whileHover={view3D ? {
              rotateY: 10,
              rotateX: -5,
              scale: 1.02,
              transition: { duration: 0.3 }
            } : {
              scale: 1.02
            }}
            data-testid="design-config-item"
          >
            {/* 3D Lighting Effect */}
            {view3D && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none z-10" />
            )}
            
            <div className="p-3 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {type === 'windows' ? (
                  <WindowSVG 
                    type={design.svg} 
                    isHovered={hoveredDesign === design.id}
                    isSelected={selectedDesign === design.id}
                  />
                ) : (
                  <DoorSVG 
                    type={design.svg} 
                    isHovered={hoveredDesign === design.id}
                    isSelected={selectedDesign === design.id}
                  />
                )}
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium text-foreground">{design.name}</p>
                <p className="text-xs text-muted-foreground">{design.panels} Panel{design.panels > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            {/* Selection indicator */}
            <AnimatePresence>
              {selectedDesign === design.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-[hsl(var(--accent))]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Selected Design Details */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">
                  {currentDesigns.find(d => d.id === selectedDesign)?.name}
                </h4>
                <p className="text-sm text-muted-foreground">Click "Get Quote" to inquire about this configuration</p>
              </div>
              <Button className="btn-accent">
                Get Quote for This Design
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
