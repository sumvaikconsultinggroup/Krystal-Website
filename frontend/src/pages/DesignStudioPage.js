import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Layers, Settings, Ruler, Check, ChevronRight, Info, 
  Search, Filter, X, Eye, Download, Share2, Sparkles, Shield,
  Volume2, Thermometer, Sun, Lock, ZoomIn, Grid3X3, List
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { getBreadcrumbSchema } from '../lib/seo';
import { cn } from '../lib/utils';
import { 
  COLOR_FINISHES_COMPREHENSIVE, 
  GLASS_OPTIONS_COMPREHENSIVE, 
  HARDWARE_COMPREHENSIVE, 
  PROFILE_SYSTEMS as PROFILE_SYSTEMS_DATA 
} from '../lib/staticData';

// ============================================================================
// DATA MAPPING
// ============================================================================

const COLOR_FINISHES = COLOR_FINISHES_COMPREHENSIVE.map(color => ({
  ...color,
  id: color.id.replace('color-', ''),
  popular: color.is_popular,
  useColorSwatch: true,
  isWoodgrain: color.category === 'wood_texture',
  isMetallic: color.category === 'metallic',
}));

const GLASS_OPTIONS = GLASS_OPTIONS_COMPREHENSIVE.map(glass => ({
  ...glass,
  uValue: glass.u_value,
  soundReduction: glass.sound_reduction,
  lightTransmission: glass.light_transmission,
  bestFor: glass.best_for,
}));

const HARDWARE_ITEMS = HARDWARE_COMPREHENSIVE.map(item => ({
  ...item,
  origin: 'Germany', // Placeholder, as origin is not in the new data
}));

const PROFILE_SYSTEMS = PROFILE_SYSTEMS_DATA.map(profile => ({
  ...profile,
  uValue: profile.u_value,
  soundClass: profile.sound_class,
  maxGlass: profile.max_glass,
  bestFor: profile.best_for,
}));

// ============================================================================
// COMPONENT: Color Swatch Card - Shows actual uPVC profile colors
// ============================================================================
const ColorSwatchCard = ({ color, isSelected, onClick, viewMode }) => {
  const isCompact = viewMode === 'grid';
  
  // Generate wood grain SVG pattern for woodgrain finishes
  const getWoodgrainPattern = (baseColor) => {
    return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grain' patternUnits='userSpaceOnUse' width='100' height='20'%3E%3Cpath d='M0 10 Q25 5, 50 10 T100 10' stroke='rgba(0,0,0,0.15)' fill='none' stroke-width='0.8'/%3E%3Cpath d='M0 15 Q30 12, 60 15 T100 15' stroke='rgba(0,0,0,0.1)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M0 5 Q20 2, 40 5 T100 5' stroke='rgba(0,0,0,0.1)' fill='none' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='${encodeURIComponent(baseColor)}'/%3E%3Crect width='100' height='100' fill='url(%23grain)'/%3E%3C/svg%3E")`;
  };

  // Generate metallic gradient for metallic finishes
  const getMetallicGradient = (baseColor) => {
    return `linear-gradient(135deg, ${baseColor} 0%, ${adjustBrightness(baseColor, 30)} 25%, ${baseColor} 50%, ${adjustBrightness(baseColor, -20)} 75%, ${baseColor} 100%)`;
  };

  // Helper to adjust color brightness
  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
  };

  // Determine background style based on color type
  const getSwatchStyle = () => {
    if (color.isWoodgrain) {
      return {
        background: getWoodgrainPattern(color.code),
        backgroundSize: 'cover',
      };
    }
    if (color.isMetallic) {
      return {
        background: getMetallicGradient(color.code),
      };
    }
    if (color.secondaryCode) {
      // Dual color - split diagonally
      return {
        background: `linear-gradient(135deg, ${color.code} 50%, ${color.secondaryCode} 50%)`,
      };
    }
    // Solid color
    return {
      backgroundColor: color.code,
    };
  };

  // Determine if text should be light or dark based on background
  const isLightColor = (hex) => {
    const c = hex.replace('#', '');
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 128;
  };

  const needsDarkText = isLightColor(color.code);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all",
        isSelected ? "border-[hsl(var(--accent))] shadow-lg ring-2 ring-[hsl(var(--accent))]/20" : "border-gray-200 hover:border-gray-400 hover:shadow-md"
      )}
      onClick={() => onClick(color)}
    >
      <Card className="overflow-hidden border-0 shadow-none">
        {/* Color Swatch Display - Shows actual color */}
        <div 
          className={cn(
            "relative overflow-hidden",
            isCompact ? "aspect-square" : "aspect-[4/3]"
          )}
          style={getSwatchStyle()}
        >
          {/* Subtle texture overlay for solid colors */}
          {!color.isWoodgrain && !color.isMetallic && !color.secondaryCode && (
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
            }} />
          )}
          
          {/* Border for very light colors */}
          {needsDarkText && !color.secondaryCode && (
            <div className="absolute inset-0 border border-gray-200 rounded-t-lg pointer-events-none" />
          )}
          
          {/* uPVC Profile Icon - shows it's a window/door finish */}
          <div className={cn(
            "absolute bottom-2 left-2 p-1.5 rounded-md backdrop-blur-sm",
            needsDarkText ? "bg-black/10" : "bg-white/20"
          )}>
            <svg 
              viewBox="0 0 24 24" 
              className={cn("w-5 h-5", needsDarkText ? "text-gray-700" : "text-white")}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <rect x="4" y="4" width="7" height="7" rx="0.5" />
              <rect x="13" y="4" width="7" height="7" rx="0.5" />
              <rect x="4" y="13" width="7" height="7" rx="0.5" />
              <rect x="13" y="13" width="7" height="7" rx="0.5" />
            </svg>
          </div>
          
          {color.popular && (
            <Badge className="absolute top-2 right-2 bg-[hsl(var(--accent))] text-white shadow-md">
              Popular
            </Badge>
          )}
          
          {isSelected && (
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center shadow-md">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Hover overlay with view details */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm",
              needsDarkText ? "bg-black/20 text-gray-800" : "bg-white/30 text-white"
            )}>
              View Profile
            </span>
          </div>
        </div>

        <CardContent className={cn("p-3 bg-white", isCompact && "p-2")}>
          <p className={cn("font-medium truncate text-gray-900", isCompact ? "text-xs" : "text-sm")}>{color.name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className={cn("text-muted-foreground capitalize", isCompact ? "text-[10px]" : "text-xs")}>
              {color.category === 'wood_texture' ? 'Wood Grain' : color.category === 'dual' ? 'Dual Color' : color.category}
            </p>
            {/* Small color preview circle */}
            <div className="flex -space-x-1">
              <div 
                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                style={{ backgroundColor: color.code }}
              />
              {color.secondaryCode && (
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                  style={{ backgroundColor: color.secondaryCode }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: Glass Option Card - Shows glass cross-section visualization
// ============================================================================
const GlassOptionCard = ({ glass, onSelect }) => {
  // Generate glass visualization based on type
  const getGlassVisualization = () => {
    const baseClasses = "w-full h-full relative overflow-hidden";
    
    switch(glass.id) {
      case 'clear-float':
        // Single clear glass pane
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-sky-50 to-blue-100`}>
            {/* Glass pane representation */}
            <div className="absolute inset-4 bg-gradient-to-br from-white/80 via-sky-100/60 to-blue-200/40 rounded-sm border border-sky-200/50 shadow-inner">
              {/* Light reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-sky-200/30 to-transparent" />
            </div>
            {/* Floating label */}
            <div className="absolute bottom-3 left-3 text-xs font-medium text-sky-800 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Single Pane
            </div>
          </div>
        );
        
      case 'dgu-standard':
      case 'dgu-argon':
        // Double glazed unit - two panes with gap
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-slate-100 to-slate-200`}>
            <div className="absolute inset-4 flex">
              {/* Outer pane */}
              <div className="w-[35%] bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-l-sm border-l border-t border-b border-sky-300/50 shadow-lg relative">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
              {/* Air/Argon gap */}
              <div className="flex-1 bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center border-t border-b border-dashed border-slate-300">
                <span className="text-[10px] text-slate-500 font-medium rotate-90 whitespace-nowrap">
                  {glass.id === 'dgu-argon' ? 'Argon Gas' : 'Air Gap'}
                </span>
              </div>
              {/* Inner pane */}
              <div className="w-[35%] bg-gradient-to-bl from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-r-sm border-r border-t border-b border-sky-300/50 shadow-lg relative">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-slate-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Double Glazed
            </div>
          </div>
        );
        
      case 'low-e':
        // Low-E glass with coating indication
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-emerald-50 to-teal-100`}>
            <div className="absolute inset-4 flex">
              {/* Outer pane with Low-E coating */}
              <div className="w-[35%] relative rounded-l-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 border-l border-t border-b border-sky-300/50" />
                {/* Low-E coating stripe */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent via-emerald-400/60 to-emerald-500/40" />
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
              {/* Gap */}
              <div className="flex-1 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/50 flex items-center justify-center border-t border-b border-dashed border-emerald-300">
                <span className="text-[10px] text-emerald-600 font-medium rotate-90 whitespace-nowrap">Low-E</span>
              </div>
              {/* Inner pane */}
              <div className="w-[35%] bg-gradient-to-bl from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-r-sm border-r border-t border-b border-sky-300/50 relative">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            </div>
            {/* Heat arrows */}
            <div className="absolute top-6 right-6 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-[8px] text-emerald-600">Heat</span>
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M5 12L9 8M5 12L9 16" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-emerald-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Low Emissivity
            </div>
          </div>
        );
        
      case 'triple-glazed':
        // Triple glazed - three panes
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-indigo-50 to-purple-100`}>
            <div className="absolute inset-4 flex">
              {/* Outer pane */}
              <div className="w-[22%] bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-l-sm border-l border-t border-b border-sky-300/50 shadow-lg" />
              {/* Gap 1 */}
              <div className="w-[12%] bg-gradient-to-b from-indigo-50/50 via-white to-indigo-50/50 border-t border-b border-dashed border-indigo-200" />
              {/* Middle pane */}
              <div className="w-[22%] bg-gradient-to-b from-sky-100/90 via-sky-200/70 to-blue-300/50 border-t border-b border-sky-300/50 shadow" />
              {/* Gap 2 */}
              <div className="w-[12%] bg-gradient-to-b from-indigo-50/50 via-white to-indigo-50/50 border-t border-b border-dashed border-indigo-200" />
              {/* Inner pane */}
              <div className="w-[22%] bg-gradient-to-bl from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-r-sm border-r border-t border-b border-sky-300/50 shadow-lg" />
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-indigo-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Triple Glazed
            </div>
          </div>
        );
        
      case 'laminated':
        // Laminated glass with PVB layer
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-amber-50 to-orange-100`}>
            <div className="absolute inset-4 flex items-stretch">
              {/* Outer glass */}
              <div className="w-[40%] bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-l-sm border-l border-t border-b border-sky-300/50 shadow relative">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
              {/* PVB interlayer */}
              <div className="w-[10%] bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200 flex items-center justify-center">
                <span className="text-[8px] text-amber-800 font-bold rotate-90">PVB</span>
              </div>
              {/* Inner glass */}
              <div className="w-[40%] bg-gradient-to-bl from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-r-sm border-r border-t border-b border-sky-300/50 shadow relative">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            </div>
            {/* Safety indicator */}
            <div className="absolute top-3 right-3">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-amber-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Safety Laminated
            </div>
          </div>
        );
        
      case 'toughened':
        // Toughened/tempered glass with stress pattern
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-slate-100 to-zinc-200`}>
            <div className="absolute inset-4 bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-sm border border-sky-300/50 shadow-lg relative overflow-hidden">
              {/* Stress pattern visualization */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                <pattern id="stress" patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="#64748b" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#stress)" />
              </svg>
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
            </div>
            {/* Strength indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1 text-slate-600">
              <span className="text-[10px] font-bold">4×</span>
              <Shield className="w-4 h-4" />
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-slate-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Tempered
            </div>
          </div>
        );
        
      case 'acoustic':
        // Acoustic glass with sound wave indication
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-violet-50 to-purple-100`}>
            <div className="absolute inset-4 flex items-stretch">
              {/* Outer glass */}
              <div className="w-[35%] bg-gradient-to-br from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-l-sm border-l border-t border-b border-sky-300/50 shadow" />
              {/* Acoustic PVB interlayer */}
              <div className="w-[15%] bg-gradient-to-b from-violet-300 via-purple-400 to-violet-300 flex items-center justify-center">
                <span className="text-[7px] text-white font-bold rotate-90 whitespace-nowrap">Acoustic PVB</span>
              </div>
              {/* Inner glass */}
              <div className="w-[35%] bg-gradient-to-bl from-sky-100/90 via-sky-200/70 to-blue-300/50 rounded-r-sm border-r border-t border-b border-sky-300/50 shadow" />
            </div>
            {/* Sound wave indicator */}
            <div className="absolute top-3 left-3">
              <svg className="w-6 h-6 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeOpacity="0.5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeOpacity="0.3" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 text-violet-600 text-xs font-bold">
              -47dB
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-violet-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Acoustic Laminated
            </div>
          </div>
        );
        
      case 'frosted':
        // Frosted/obscure glass with diffused effect
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-100 to-slate-200`}>
            <div className="absolute inset-4 bg-gradient-to-br from-white/95 via-gray-100/90 to-slate-200/80 rounded-sm border border-gray-300/50 shadow-lg relative overflow-hidden">
              {/* Frosted texture effect */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/40" />
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
                </filter>
                <rect width="100" height="100" filter="url(#noise)" />
              </svg>
              {/* Privacy icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-8 h-8 text-gray-400 opacity-50" strokeWidth="1" />
                <div className="absolute w-10 h-0.5 bg-gray-400/50 rotate-45" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Privacy Glass
            </div>
          </div>
        );
        
      case 'tinted':
        // Tinted/solar control glass
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-amber-100 to-yellow-200`}>
            <div className="absolute inset-4 bg-gradient-to-br from-amber-200/80 via-yellow-300/60 to-orange-200/50 rounded-sm border border-amber-300/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
            {/* Sun indicator */}
            <div className="absolute top-3 right-3">
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div className="absolute bottom-3 left-3 text-xs font-medium text-amber-800 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
              Solar Control
            </div>
          </div>
        );
        
      default:
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-sky-50 to-blue-100`}>
            <div className="absolute inset-4 bg-gradient-to-br from-white/80 via-sky-100/60 to-blue-200/40 rounded-sm border border-sky-200/50 shadow-inner" />
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-gray-200 hover:border-[hsl(var(--accent))]/30">
      <div className="relative aspect-video overflow-hidden">
        {getGlassVisualization()}
        {glass.popular && (
          <Badge className="absolute top-3 right-3 bg-[hsl(var(--accent))] text-white shadow-md z-10">
            Recommended
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-2">{glass.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{glass.description}</p>
        
        {/* Technical Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-secondary/50 rounded p-2">
            <span className="text-muted-foreground block">U-Value</span>
            <span className="font-semibold">{glass.uValue}</span>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <span className="text-muted-foreground block">Sound</span>
            <span className="font-semibold">{glass.soundReduction}</span>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <span className="text-muted-foreground block">Light</span>
            <span className="font-semibold">{glass.lightTransmission}</span>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <span className="text-muted-foreground block">Thickness</span>
            <span className="font-semibold text-[10px]">{glass.thickness.split('/')[0]}</span>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="space-y-1 mb-4">
          {glass.benefits.slice(0, 3).map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <Check className="w-3 h-3 text-[hsl(var(--accent))] flex-shrink-0" />
              <span className="text-muted-foreground">{benefit}</span>
          </div>
        ))}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Info className="w-4 h-4 mr-2" />
            Full Specifications
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{glass.name}</DialogTitle>
            <DialogDescription>{glass.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground text-sm">Thickness Options:</span><p className="font-medium">{glass.thickness}</p></div>
              <div><span className="text-muted-foreground text-sm">U-Value:</span><p className="font-medium">{glass.uValue}</p></div>
              <div><span className="text-muted-foreground text-sm">Light Transmission:</span><p className="font-medium">{glass.lightTransmission}</p></div>
              <div><span className="text-muted-foreground text-sm">Sound Reduction:</span><p className="font-medium">{glass.soundReduction}</p></div>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Best For:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {glass.bestFor.map((use, idx) => (
                  <Badge key={idx} variant="secondary">{use}</Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
  );
};

// ============================================================================
// COMPONENT: Hardware Card
// ============================================================================
const HardwareCard = ({ item }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
    <CardContent className="p-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <Settings className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="font-medium text-foreground">{item.brand}</span>
            <span>•</span>
            <span>{item.origin}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.features.slice(0, 2).map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// ============================================================================
// MAIN COMPONENT: Design Studio Page
// ============================================================================
export default function DesignStudioPage() {
  const [activeTab, setActiveTab] = useState('colours');
  const [colorCategory, setColorCategory] = useState('all');
  const [glassCategory, setGlassCategory] = useState('all');
  const [hardwareCategory, setHardwareCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Design Studio', url: '/design-studio' },
  ];

  // Filter colors
  const filteredColors = useMemo(() => {
    return COLOR_FINISHES.filter(color => {
      const matchesCategory = colorCategory === 'all' || color.category === colorCategory;
      const matchesSearch = color.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [colorCategory, searchQuery]);

  // Filter glass
  const filteredGlass = useMemo(() => {
    return GLASS_OPTIONS.filter(glass => {
      return glassCategory === 'all' || glass.category === glassCategory;
    });
  }, [glassCategory]);

  // Filter hardware
  const filteredHardware = useMemo(() => {
    return HARDWARE_ITEMS.filter(item => {
      return hardwareCategory === 'all' || item.category === hardwareCategory;
    });
  }, [hardwareCategory]);

  const colorCategories = [
    { id: 'all', label: 'All Colors', count: COLOR_FINISHES.length },
    { id: 'solid', label: 'Solid', count: COLOR_FINISHES.filter(c => c.category === 'solid').length },
    { id: 'wood_texture', label: 'Woodgrain', count: COLOR_FINISHES.filter(c => c.category === 'wood_texture').length },
    { id: 'metallic', label: 'Metallic', count: COLOR_FINISHES.filter(c => c.category === 'metallic').length },
    { id: 'dual', label: 'Dual Color', count: COLOR_FINISHES.filter(c => c.category === 'dual').length },
  ];

  const glassCategories = [
    { id: 'all', label: 'All Glass' },
    { id: 'basic', label: 'Basic' },
    { id: 'insulated', label: 'Insulated / DGU' },
    { id: 'safety', label: 'Safety' },
    { id: 'specialty', label: 'Specialty' },
  ];

  const hardwareCategories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'handles', label: 'Handles' },
    { id: 'locks', label: 'Locks' },
    { id: 'hinges', label: 'Hinges' },
    { id: 'sliding', label: 'Sliding Systems' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <>
      <Helmet>
        <title>Design Studio | 40+ Colours, Glass & Hardware | Krystal Magic World</title>
        <meta name="description" content="Explore 40+ laminate finishes, premium glass options, and German hardware for your uPVC windows and doors. Create your perfect design at Krystal Magic World." />
        <link rel="canonical" href="https://krystalmagicworld.com/design-studio" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img
          src="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/azaaditl_freepik__create-a-image-of-a-premium-luxury-glass-villa-sho__15014.jpeg"
          alt="Design Studio"
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
              <Badge className="mb-4 bg-[hsl(var(--accent))]">
                <Sparkles className="w-3 h-3 mr-1" />
                40+ Color Options
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4">Design Studio</h1>
              <p className="text-lg text-white/80 mb-6">
                Customize every detail. Explore our complete range of colors, glass technologies, 
                and premium European hardware. Create windows and doors that are uniquely yours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-accent" size="lg" asChild>
                  <a href="#studio">Start Exploring</a>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/contact">Request Sample Kit</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-border py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Palette, value: '40+', label: 'Color Finishes' },
              { icon: Layers, value: '10+', label: 'Glass Types' },
              { icon: Settings, value: '15+', label: 'Hardware Options' },
              { icon: Shield, value: '100%', label: 'German Engineering' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-[hsl(var(--accent))] mb-2" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Studio Content */}
      <section id="studio" className="section-spacing bg-background">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-4 max-w-lg">
                <TabsTrigger value="colours" className="gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Colours</span>
                </TabsTrigger>
                <TabsTrigger value="glass" className="gap-2">
                  <Layers className="w-4 h-4" />
                  <span className="hidden sm:inline">Glass</span>
                </TabsTrigger>
                <TabsTrigger value="hardware" className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Hardware</span>
                </TabsTrigger>
                <TabsTrigger value="profiles" className="gap-2">
                  <Ruler className="w-4 h-4" />
                  <span className="hidden sm:inline">Profiles</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* COLOURS TAB */}
            <TabsContent value="colours" className="mt-0">
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif text-3xl mb-2">Colours & Finishes</h2>
                    <p className="text-muted-foreground">
                      From classic whites to rich woodgrains - {COLOR_FINISHES.length} options to match any architectural style.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search colors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <div className="flex border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(viewMode === 'grid' && 'bg-secondary')}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(viewMode === 'list' && 'bg-secondary')}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {colorCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={colorCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setColorCategory(cat.id)}
                      className="gap-1"
                    >
                      {cat.label}
                      <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">
                        {cat.count}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Color Grid */}
                <motion.div 
                  layout
                  className={cn(
                    "grid gap-4",
                    viewMode === 'grid' 
                      ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8" 
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredColors.map((color) => (
                      <ColorSwatchCard
                        key={color.id}
                        color={color}
                        isSelected={selectedColor?.id === color.id}
                        onClick={setSelectedColor}
                        viewMode={viewMode}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredColors.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No colors match your search.</p>
                  </div>
                )}

                {/* Selected Color Detail */}
                <AnimatePresence>
                  {selectedColor && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-8 p-6 bg-secondary/30 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-16 h-16 rounded-lg border-2 border-white shadow-lg"
                            style={{ backgroundColor: selectedColor.code }}
                          />
                          <div>
                            <h3 className="font-semibold text-xl">{selectedColor.name}</h3>
                            <p className="text-muted-foreground capitalize">{selectedColor.category.replace('_', ' ')} finish</p>
                            <p className="text-sm font-mono mt-1">{selectedColor.code}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedColor(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 text-center">
                  <Button className="btn-accent" asChild>
                    <Link to="/contact">Request Physical Sample Kit</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* GLASS TAB */}
            <TabsContent value="glass" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-3xl mb-2">Glass Options</h2>
                <p className="text-muted-foreground mb-6">
                  From basic clear glass to triple-glazed acoustic units. Technical specifications for every application.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {glassCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={glassCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setGlassCategory(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">Understanding Glass Specifications</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <Thermometer className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5" />
                          <div>
                            <span className="font-medium">U-Value</span>
                            <p className="text-muted-foreground text-xs">Lower = better insulation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Volume2 className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5" />
                          <div>
                            <span className="font-medium">Sound Reduction</span>
                            <p className="text-muted-foreground text-xs">Higher dB = quieter</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sun className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5" />
                          <div>
                            <span className="font-medium">Light Transmission</span>
                            <p className="text-muted-foreground text-xs">% of light passing through</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-[hsl(var(--accent))] mt-0.5" />
                          <div>
                            <span className="font-medium">Safety Rating</span>
                            <p className="text-muted-foreground text-xs">Laminated/Toughened</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glass Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGlass.map((glass) => (
                    <GlassOptionCard key={glass.id} glass={glass} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* HARDWARE TAB */}
            <TabsContent value="hardware" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-3xl mb-2">Hardware & Accessories</h2>
                <p className="text-muted-foreground mb-6">
                  Premium European hardware from Hoppe, Roto, Siegenia, GU, and Yale. Engineered for decades of smooth operation.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {hardwareCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={hardwareCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setHardwareCategory(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>

                {/* Brand Logos */}
                <div className="flex flex-wrap justify-center gap-8 mb-10 py-6 bg-secondary/30 rounded-xl">
                  {['Hoppe', 'Roto Frank', 'Siegenia', 'GU', 'Yale'].map((brand) => (
                    <div key={brand} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white shadow flex items-center justify-center">
                        <Settings className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium">{brand}</span>
                    </div>
                  ))}
                </div>

                {/* Hardware Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHardware.map((item) => (
                    <HardwareCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* PROFILES TAB */}
            <TabsContent value="profiles" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-3xl mb-2">Profile Systems</h2>
                <p className="text-muted-foreground mb-8">
                  Choose the right profile depth based on your performance requirements. All profiles feature multi-chamber design and steel reinforcement.
                </p>

                {/* Profile Comparison Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {PROFILE_SYSTEMS.map((profile) => (
                    <Card key={profile.id} className={cn(
                      "relative overflow-hidden transition-shadow hover:shadow-lg",
                      profile.popular && "border-[hsl(var(--accent))] border-2"
                    )}>
                      {profile.popular && (
                        <Badge className="absolute top-4 right-4 bg-[hsl(var(--accent))]">
                          Most Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl">{profile.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">{profile.bestFor}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">Chambers</span>
                            <span className="font-semibold">{profile.chambers}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">U-Value</span>
                            <span className="font-semibold">{profile.uValue} W/m²K</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">Sound Reduction</span>
                            <span className="font-semibold">{profile.soundClass}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground">Max Glass</span>
                            <span className="font-semibold">{profile.maxGlass}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-6" variant={profile.popular ? 'default' : 'outline'} asChild>
                          <Link to="/contact">Get Quote</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Profile Illustration */}
                <Card className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-xl mb-2">Profile Cross-Section Features</h3>
                    <p className="text-muted-foreground text-sm">Every Krystal profile includes these premium features</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: Layers, title: 'Multi-Chamber', desc: '3-6 chambers for thermal insulation' },
                      { icon: Shield, title: 'Steel Reinforced', desc: 'Galvanized steel for structural strength' },
                      { icon: Lock, title: 'EPDM Gaskets', desc: 'Double/triple sealing system' },
                      { icon: Sun, title: 'UV Stabilized', desc: 'TiO2 additive prevents yellowing' },
                    ].map((feature, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-[hsl(var(--accent))]" />
                        </div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-[hsl(var(--accent))]">
        <div className="container text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">Ready to Design Your Space?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Our experts will help you choose the perfect combination of finishes, glass, and hardware for your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-[hsl(var(--accent))] hover:bg-white/90" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:+919220905087">Call +91 9220905087</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
