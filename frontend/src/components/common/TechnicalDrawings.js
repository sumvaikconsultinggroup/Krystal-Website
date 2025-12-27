import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Info, Maximize2, Eye, Layers, Square } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

// Profile Section Drawing - Cross-section of uPVC profiles
const ProfileSectionSVG = ({ type = 'casement', isActive, showLabels = true }) => {
  const accentColor = '#00A8CC';
  const frameColor = '#E5E7EB';
  const chamberColor = '#F9FAFB';
  const gasketColor = '#374151';
  const glassColor = 'rgba(200, 230, 240, 0.6)';
  const reinforcementColor = '#9CA3AF';

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Main Frame Profile */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer frame */}
        <rect x="20" y="20" width="260" height="260" fill="none" stroke={accentColor} strokeWidth="3" rx="4" />
        
        {/* uPVC Frame (multi-chamber) */}
        <rect x="25" y="25" width="50" height="250" fill={frameColor} stroke="#D1D5DB" strokeWidth="1" />
        
        {/* Air chambers in frame */}
        <rect x="30" y="35" width="15" height="60" fill={chamberColor} stroke="#E5E7EB" rx="2" />
        <rect x="30" y="105" width="15" height="60" fill={chamberColor} stroke="#E5E7EB" rx="2" />
        <rect x="30" y="175" width="15" height="60" fill={chamberColor} stroke="#E5E7EB" rx="2" />
        
        <rect x="50" y="35" width="20" height="90" fill={chamberColor} stroke="#E5E7EB" rx="2" />
        <rect x="50" y="135" width="20" height="130" fill={chamberColor} stroke="#E5E7EB" rx="2" />
        
        {/* Steel reinforcement */}
        <rect x="32" y="40" width="10" height="50" fill={reinforcementColor} rx="1" />
        <rect x="32" y="180" width="10" height="50" fill={reinforcementColor} rx="1" />
        
        {/* Gaskets */}
        <rect x="73" y="30" width="4" height="240" fill={gasketColor} rx="2" />
        <rect x="85" y="30" width="4" height="240" fill={gasketColor} rx="2" />
        
        {/* Glass Unit */}
        <rect x="95" y="35" width="180" height="230" fill={glassColor} stroke="#93C5FD" strokeWidth="2" />
        
        {/* Double glazing spacer */}
        <line x1="140" y1="35" x2="140" y2="265" stroke="#D1D5DB" strokeWidth="2" />
        <line x1="230" y1="35" x2="230" y2="265" stroke="#D1D5DB" strokeWidth="2" />
        
        {/* Labels */}
        {showLabels && (
          <g className="text-xs" fill="#6B7280">
            {/* Multi-chamber label */}
            <motion.g
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <line x1="5" y1="80" x2="25" y2="80" stroke={accentColor} strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="5" cy="80" r="3" fill={accentColor} />
              <text x="8" y="70" fontSize="8" fill={accentColor}>Multi-chamber</text>
              <text x="8" y="78" fontSize="7" fill="#6B7280">insulation</text>
            </motion.g>
            
            {/* Steel reinforcement label */}
            <motion.g
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <line x1="5" y1="200" x2="30" y2="200" stroke={accentColor} strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="5" cy="200" r="3" fill={accentColor} />
              <text x="8" y="215" fontSize="8" fill={accentColor}>Steel</text>
              <text x="8" y="223" fontSize="7" fill="#6B7280">reinforcement</text>
            </motion.g>
            
            {/* Gasket label */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <line x1="80" y1="15" x2="80" y2="28" stroke={accentColor} strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="80" cy="15" r="3" fill={accentColor} />
              <text x="60" y="10" fontSize="8" fill={accentColor}>EPDM Gaskets</text>
            </motion.g>
            
            {/* Double glazing label */}
            <motion.g
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <line x1="185" y1="15" x2="185" y2="33" stroke={accentColor} strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="185" cy="15" r="3" fill={accentColor} />
              <text x="150" y="10" fontSize="8" fill={accentColor}>Double Glazed Unit</text>
            </motion.g>
          </g>
        )}
      </motion.g>
      
      {/* Dimension lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0.3 }}
        transition={{ delay: 0.7 }}
      >
        {/* Width dimension */}
        <line x1="25" y1="290" x2="275" y2="290" stroke="#9CA3AF" strokeWidth="1" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
        <text x="140" y="298" fontSize="10" fill="#6B7280" textAnchor="middle">60mm profile</text>
      </motion.g>
      
      <defs>
        <marker id="arrowStart" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" fill="none" stroke="#9CA3AF" strokeWidth="1" />
        </marker>
        <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#9CA3AF" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
};

// Window Configuration Drawing
const ConfigurationSVG = ({ config = '2-panel', showDimensions = true }) => {
  const strokeColor = '#374151';
  const accentColor = '#00A8CC';
  const glassColor = 'rgba(200, 230, 240, 0.4)';

  const configs = {
    '1-panel': (
      <g>
        <rect x="40" y="30" width="120" height="180" fill={glassColor} stroke={strokeColor} strokeWidth="3" />
        <line x1="100" y1="30" x2="100" y2="210" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="5,5" />
        <rect x="90" y="100" width="8" height="30" rx="2" fill={strokeColor} />
        <text x="100" y="230" textAnchor="middle" fontSize="11" fill="#6B7280">Single Casement</text>
        {showDimensions && (
          <g>
            <text x="100" y="20" textAnchor="middle" fontSize="9" fill="#9CA3AF">900mm</text>
            <text x="25" y="120" textAnchor="middle" fontSize="9" fill="#9CA3AF" transform="rotate(-90, 25, 120)">1200mm</text>
          </g>
        )}
      </g>
    ),
    '2-panel': (
      <g>
        <rect x="20" y="30" width="160" height="180" fill="none" stroke={strokeColor} strokeWidth="3" />
        <line x1="100" y1="30" x2="100" y2="210" stroke={strokeColor} strokeWidth="3" />
        <rect x="25" y="35" width="70" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
        <rect x="105" y="35" width="70" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
        <rect x="85" y="100" width="6" height="25" rx="1" fill={strokeColor} />
        <rect x="109" y="100" width="6" height="25" rx="1" fill={strokeColor} />
        <text x="100" y="230" textAnchor="middle" fontSize="11" fill="#6B7280">Double Casement</text>
      </g>
    ),
    '3-panel': (
      <g>
        <rect x="15" y="30" width="170" height="180" fill="none" stroke={strokeColor} strokeWidth="3" />
        <line x1="72" y1="30" x2="72" y2="210" stroke={strokeColor} strokeWidth="2.5" />
        <line x1="128" y1="30" x2="128" y2="210" stroke={strokeColor} strokeWidth="2.5" />
        <rect x="20" y="35" width="47" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
        <rect x="77" y="35" width="46" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
        <rect x="133" y="35" width="47" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
        <text x="100" y="230" textAnchor="middle" fontSize="11" fill="#6B7280">Triple Panel</text>
      </g>
    ),
    'fixed-opening': (
      <g>
        <rect x="20" y="30" width="160" height="180" fill="none" stroke={strokeColor} strokeWidth="3" />
        <line x1="90" y1="30" x2="90" y2="210" stroke={strokeColor} strokeWidth="3" />
        <rect x="25" y="35" width="60" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1" />
        <rect x="95" y="35" width="80" height="170" fill={glassColor} stroke={strokeColor} strokeWidth="1.5" />
        <text x="55" y="125" textAnchor="middle" fontSize="9" fill="#9CA3AF">FIXED</text>
        <rect x="130" y="100" width="6" height="25" rx="1" fill={strokeColor} />
        <motion.path 
          d="M165 110 L175 110 M175 110 L172 105 M175 110 L172 115" 
          stroke={accentColor} strokeWidth="1.5" fill="none"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="100" y="230" textAnchor="middle" fontSize="11" fill="#6B7280">Fixed + Opening</text>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 200 250" className="w-full h-full">
      {configs[config] || configs['2-panel']}
    </svg>
  );
};

// Glass Options SVG
const GlassOptionsSVG = ({ type = 'single' }) => {
  const types = {
    single: {
      name: 'Single Glass',
      thickness: '5mm',
      uValue: '5.8',
      svg: (
        <g>
          <rect x="80" y="30" width="40" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="2" />
          <text x="100" y="125" textAnchor="middle" fontSize="10" fill="#6B7280">5mm</text>
        </g>
      )
    },
    double: {
      name: 'Double Glazed',
      thickness: '24mm (5+14+5)',
      uValue: '2.8',
      svg: (
        <g>
          <rect x="60" y="30" width="12" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1.5" />
          <rect x="72" y="30" width="56" height="180" fill="rgba(249, 250, 251, 0.8)" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="128" y="30" width="12" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1.5" />
          <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#9CA3AF">Air Gap</text>
          <text x="100" y="125" textAnchor="middle" fontSize="8" fill="#9CA3AF">14mm</text>
          <line x1="60" y1="220" x2="140" y2="220" stroke="#9CA3AF" strokeWidth="1" />
          <text x="100" y="235" textAnchor="middle" fontSize="9" fill="#6B7280">24mm total</text>
        </g>
      )
    },
    triple: {
      name: 'Triple Glazed',
      thickness: '36mm (4+10+4+10+4)',
      uValue: '1.0',
      svg: (
        <g>
          <rect x="45" y="30" width="8" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1" />
          <rect x="53" y="30" width="32" height="180" fill="rgba(249, 250, 251, 0.8)" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="85" y="30" width="8" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1" />
          <rect x="93" y="30" width="32" height="180" fill="rgba(249, 250, 251, 0.8)" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="125" y="30" width="8" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1" />
          <text x="69" y="120" textAnchor="middle" fontSize="7" fill="#9CA3AF">Argon</text>
          <text x="109" y="120" textAnchor="middle" fontSize="7" fill="#9CA3AF">Argon</text>
          <line x1="45" y1="220" x2="133" y2="220" stroke="#9CA3AF" strokeWidth="1" />
          <text x="89" y="235" textAnchor="middle" fontSize="9" fill="#6B7280">36mm total</text>
        </g>
      )
    },
    laminated: {
      name: 'Laminated Safety',
      thickness: '6.38mm (3+0.38+3)',
      uValue: '5.6',
      svg: (
        <g>
          <rect x="70" y="30" width="20" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1.5" />
          <rect x="90" y="30" width="3" height="180" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.5" />
          <rect x="93" y="30" width="20" height="180" fill="rgba(200, 230, 240, 0.6)" stroke="#93C5FD" strokeWidth="1.5" />
          <text x="91" y="120" textAnchor="middle" fontSize="7" fill="#92400E" transform="rotate(-90 91 120)">PVB</text>
          <line x1="70" y1="220" x2="113" y2="220" stroke="#9CA3AF" strokeWidth="1" />
          <text x="91" y="235" textAnchor="middle" fontSize="9" fill="#6B7280">6.38mm</text>
        </g>
      )
    },
  };

  const option = types[type] || types.double;

  return (
    <svg viewBox="0 0 200 250" className="w-full h-full">
      {option.svg}
    </svg>
  );
};

// Main Technical Drawings Component
export default function TechnicalDrawings({ category = 'windows' }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedConfig, setSelectedConfig] = useState('2-panel');
  const [selectedGlass, setSelectedGlass] = useState('double');

  const configurations = [
    { id: '1-panel', name: 'Single Panel' },
    { id: '2-panel', name: 'Double Panel' },
    { id: '3-panel', name: 'Triple Panel' },
    { id: 'fixed-opening', name: 'Fixed + Opening' },
  ];

  const glassOptions = [
    { id: 'single', name: 'Single', uValue: '5.8 W/m²K', best: false },
    { id: 'double', name: 'Double Glazed', uValue: '2.8 W/m²K', best: true },
    { id: 'triple', name: 'Triple Glazed', uValue: '1.0 W/m²K', best: false },
    { id: 'laminated', name: 'Laminated Safety', uValue: '5.6 W/m²K', best: false },
  ];

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-serif text-xl mb-1">Technical Specifications</h3>
              <p className="text-sm text-muted-foreground">Detailed drawings & cross-sections</p>
            </div>
            <TabsList className="grid grid-cols-3 w-auto">
              <TabsTrigger value="profile" className="gap-2">
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Profile Section</span>
              </TabsTrigger>
              <TabsTrigger value="configs" className="gap-2">
                <Square className="w-4 h-4" />
                <span className="hidden sm:inline">Configurations</span>
              </TabsTrigger>
              <TabsTrigger value="glass" className="gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Glass Options</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="profile" className="p-6 m-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square max-w-md mx-auto w-full">
              <ProfileSectionSVG type="casement" isActive={true} showLabels={true} />
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Premium uPVC Profile Features</h4>
                <ul className="space-y-3">
                  {[
                    { title: 'Multi-Chamber Design', desc: 'Up to 6 chambers for maximum insulation' },
                    { title: 'Steel Reinforcement', desc: 'Galvanized steel for structural strength' },
                    { title: 'EPDM Gaskets', desc: 'Twin sealing system for air & water tightness' },
                    { title: 'Lead-Free Formula', desc: '100% eco-friendly calcium-zinc stabilizers' },
                    { title: 'UV Resistant', desc: 'TiO2 additive prevents yellowing' },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 mt-2 rounded-full bg-[hsl(var(--accent))] flex-shrink-0" />
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <span className="text-muted-foreground text-sm block">{item.desc}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="configs" className="p-6 m-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {configurations.map((config) => (
              <motion.button
                key={config.id}
                onClick={() => setSelectedConfig(config.id)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all",
                  selectedConfig === config.id
                    ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-square mb-2">
                  <ConfigurationSVG config={config.id} showDimensions={false} />
                </div>
                <span className="text-sm font-medium">{config.name}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square max-w-sm mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedConfig}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full h-full"
                  >
                    <ConfigurationSVG config={selectedConfig} showDimensions={true} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  {configurations.find(c => c.id === selectedConfig)?.name}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Click on different configurations above to see detailed technical drawings.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Min Width</span>
                    <span className="font-medium">450mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Max Width</span>
                    <span className="font-medium">4100mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Max Height</span>
                    <span className="font-medium">2400mm</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Profile System</span>
                    <span className="font-medium">60mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="glass" className="p-6 m-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {glassOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedGlass(option.id)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all relative",
                  selectedGlass === option.id
                    ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.best && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[hsl(var(--accent))] text-white text-[10px] rounded-full">
                    Recommended
                  </span>
                )}
                <div className="aspect-square mb-2">
                  <GlassOptionsSVG type={option.id} />
                </div>
                <span className="text-sm font-medium block">{option.name}</span>
                <span className="text-xs text-muted-foreground">U-Value: {option.uValue}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold mb-1">Understanding U-Value</h5>
                <p className="text-sm text-muted-foreground">
                  U-Value measures heat loss through glass. Lower values mean better insulation. 
                  For Delhi NCR's climate, we recommend double glazed units (U-Value: 2.8 W/m²K) 
                  for optimal balance of cost and performance.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { ProfileSectionSVG, ConfigurationSVG, GlassOptionsSVG };
