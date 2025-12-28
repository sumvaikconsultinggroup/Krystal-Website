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

// ============================================================================
// COMPREHENSIVE COLOR DATA - 40+ Industry Standard Colors
// Using 'useColorSwatch: true' to render the actual color instead of an image
// ============================================================================
const COLOR_FINISHES = [
  // SOLID COLORS
  { id: 'brilliant-white', name: 'Brilliant White', code: '#FFFFFF', category: 'solid', popular: true, useColorSwatch: true, description: 'Classic pure white - the most popular choice for modern homes' },
  { id: 'cream-white', name: 'Cream White', code: '#FFFEF0', category: 'solid', useColorSwatch: true, description: 'Soft warm white with subtle cream undertone' },
  { id: 'ivory', name: 'Ivory', code: '#FFFFF0', category: 'solid', useColorSwatch: true, description: 'Warm off-white shade for traditional architecture' },
  { id: 'champagne', name: 'Champagne', code: '#F7E7CE', category: 'solid', useColorSwatch: true, description: 'Luxurious champagne gold undertone' },
  { id: 'anthracite-grey', name: 'Anthracite Grey', code: '#383E42', category: 'solid', popular: true, useColorSwatch: true, description: 'Deep charcoal grey - a modern classic' },
  { id: 'slate-grey', name: 'Slate Grey', code: '#708090', category: 'solid', useColorSwatch: true, description: 'Medium grey with blue undertone' },
  { id: 'agate-grey', name: 'Agate Grey', code: '#B5B5B5', category: 'solid', useColorSwatch: true, description: 'Light silver grey, subtle and refined' },
  { id: 'quartz-grey', name: 'Quartz Grey', code: '#6C6C6C', category: 'solid', useColorSwatch: true, description: 'Neutral mid-grey, versatile for any style' },
  { id: 'jet-black', name: 'Jet Black', code: '#0A0A0A', category: 'solid', popular: true, useColorSwatch: true, description: 'Premium black finish for bold statements' },
  { id: 'smooth-black', name: 'Smooth Black', code: '#1C1C1C', category: 'solid', useColorSwatch: true, description: 'Deep black with smooth satin texture' },
  { id: 'racing-green', name: 'Racing Green', code: '#0B3D0B', category: 'solid', useColorSwatch: true, description: 'Classic British racing green' },
  { id: 'steel-blue', name: 'Steel Blue', code: '#4682B4', category: 'solid', useColorSwatch: true, description: 'Deep steel blue, coastal inspired' },
  
  // WOODGRAIN TEXTURES - These show wood grain pattern preview
  { id: 'golden-oak', name: 'Golden Oak', code: '#B5651D', category: 'woodgrain', popular: true, useColorSwatch: true, isWoodgrain: true, description: 'Classic golden oak with visible grain pattern' },
  { id: 'irish-oak', name: 'Irish Oak', code: '#A0522D', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Lighter oak with reddish undertones' },
  { id: 'natural-oak', name: 'Natural Oak', code: '#C4A76D', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Light natural oak, Scandinavian style' },
  { id: 'rustic-oak', name: 'Rustic Oak', code: '#8B7355', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Weathered oak with character marks' },
  { id: 'winchester-oak', name: 'Winchester Oak', code: '#6B4423', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Deep amber oak, rich and traditional' },
  { id: 'walnut', name: 'Walnut', code: '#5D4037', category: 'woodgrain', popular: true, useColorSwatch: true, isWoodgrain: true, description: 'Dark chocolate walnut, luxurious' },
  { id: 'dark-walnut', name: 'Dark Walnut', code: '#3E2723', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Extra-dark walnut, dramatic appeal' },
  { id: 'mahogany', name: 'Mahogany', code: '#4E0000', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Rich red-brown mahogany' },
  { id: 'rosewood', name: 'Rosewood', code: '#65000B', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Deep rose-tinted exotic wood' },
  { id: 'cherry', name: 'Cherry', code: '#7B3F00', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Warm cherry wood tones' },
  { id: 'teak', name: 'Teak', code: '#6E4C1E', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Classic teak, tropical warmth' },
  { id: 'sheesham', name: 'Sheesham', code: '#8B4513', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Indian rosewood pattern' },
  { id: 'grey-oak', name: 'Grey Oak', code: '#808069', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Weathered grey oak, contemporary rustic' },
  { id: 'white-oak', name: 'White Oak', code: '#D2B48C', category: 'woodgrain', useColorSwatch: true, isWoodgrain: true, description: 'Pale blonde oak, Scandinavian feel' },
  
  // METALLIC
  { id: 'brushed-aluminium', name: 'Brushed Aluminium', code: '#A8A9AD', category: 'metallic', useColorSwatch: true, isMetallic: true, description: 'Industrial brushed metal look' },
  { id: 'silver-grey', name: 'Silver Grey', code: '#C0C0C0', category: 'metallic', useColorSwatch: true, isMetallic: true, description: 'Clean silver metallic' },
  { id: 'bronze', name: 'Bronze', code: '#CD7F32', category: 'metallic', useColorSwatch: true, isMetallic: true, description: 'Warm bronze metallic' },
  { id: 'copper', name: 'Copper', code: '#B87333', category: 'metallic', useColorSwatch: true, isMetallic: true, description: 'Antique copper finish' },
  
  // DUAL COLOR
  { id: 'white-grey', name: 'White / Anthracite Grey', code: '#FFFFFF', category: 'dual', popular: true, secondaryCode: '#383E42', useColorSwatch: true, description: 'White interior, Grey exterior' },
  { id: 'white-oak-dual', name: 'White / Golden Oak', code: '#FFFFFF', category: 'dual', secondaryCode: '#B5651D', useColorSwatch: true, description: 'White interior, Oak exterior' },
  { id: 'white-black', name: 'White / Jet Black', code: '#FFFFFF', category: 'dual', secondaryCode: '#0A0A0A', useColorSwatch: true, description: 'White interior, Black exterior' },
];

// ============================================================================
// GLASS OPTIONS DATA with Full Technical Specs
// ============================================================================
const GLASS_OPTIONS = [
  {
    id: 'clear-float',
    name: 'Clear Float Glass',
    category: 'basic',
    description: 'Standard transparent glass for maximum light transmission and clear views.',
    thickness: '4mm / 5mm / 6mm / 8mm',
    uValue: '5.8 W/m²K',
    lightTransmission: '89%',
    soundReduction: '26-30 dB',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    benefits: ['Maximum natural light', 'Crystal clear views', 'Cost effective'],
    bestFor: ['Interior partitions', 'Mild climates', 'Budget projects'],
  },
  {
    id: 'dgu-standard',
    name: 'Double Glazed Unit (DGU)',
    category: 'insulated',
    popular: true,
    description: 'Two panes with air-filled gap. The standard for energy-efficient windows.',
    thickness: '24mm (4+16+4)',
    uValue: '2.8 W/m²K',
    lightTransmission: '81%',
    soundReduction: '30-35 dB',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    benefits: ['50% better insulation', 'Reduced condensation', 'Lower energy bills'],
    bestFor: ['All residential windows', 'Bedrooms', 'Living areas'],
  },
  {
    id: 'dgu-argon',
    name: 'Argon-Filled DGU',
    category: 'insulated',
    description: 'Double glazed unit with argon gas for enhanced insulation.',
    thickness: '24mm (4+16+4)',
    uValue: '2.5 W/m²K',
    lightTransmission: '81%',
    soundReduction: '31-36 dB',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    benefits: ['15% better than air-filled DGU', 'Lower U-value', 'Professional grade'],
    bestFor: ['Premium residences', 'Energy-efficient homes'],
  },
  {
    id: 'low-e',
    name: 'Low-E Glass',
    category: 'insulated',
    popular: true,
    description: 'Microscopic metallic coating reflects heat while allowing light through.',
    thickness: 'In DGU: 24mm / 28mm',
    uValue: '1.1-1.6 W/m²K',
    lightTransmission: '72-78%',
    soundReduction: '31-36 dB',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    benefits: ['Reflects heat inside in winter', 'Blocks solar heat in summer', '99% UV block'],
    bestFor: ['All climates', 'Large glazed areas'],
  },
  {
    id: 'triple-glazed',
    name: 'Triple Glazed Unit',
    category: 'insulated',
    description: 'Three panes for ultimate thermal and acoustic performance.',
    thickness: '36mm (4+10+4+10+4)',
    uValue: '0.8-1.0 W/m²K',
    lightTransmission: '68-72%',
    soundReduction: '38-45 dB',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    benefits: ['Maximum insulation', 'Superior noise reduction', 'Condensation-free'],
    bestFor: ['Cold climates', 'Near airports/highways'],
  },
  {
    id: 'laminated',
    name: 'Laminated Safety Glass',
    category: 'safety',
    popular: true,
    description: 'Two panes bonded with PVB interlayer. Holds together if broken.',
    thickness: '6.38mm / 8.38mm / 10.38mm',
    uValue: '5.6 W/m²K (single)',
    lightTransmission: '87%',
    soundReduction: '35-40 dB',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    benefits: ['Safety if shattered', 'Burglar resistant', '99% UV blocking'],
    bestFor: ['Ground floor windows', 'Overhead glazing', 'Schools'],
  },
  {
    id: 'toughened',
    name: 'Toughened / Tempered Glass',
    category: 'safety',
    description: 'Heat-treated glass, 4-5x stronger. Shatters into safe small pieces.',
    thickness: '5mm / 6mm / 8mm / 10mm',
    uValue: '5.8 W/m²K (single)',
    lightTransmission: '89%',
    soundReduction: '26-30 dB',
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80',
    benefits: ['4x stronger', 'Safe breakage pattern', 'Scratch resistant'],
    bestFor: ['Large panes', 'Doors', 'Areas prone to impact'],
  },
  {
    id: 'acoustic',
    name: 'Acoustic Laminated Glass',
    category: 'specialty',
    description: 'Special PVB interlayer optimized for maximum sound dampening.',
    thickness: '10.8mm / 12.8mm / In DGU',
    uValue: '5.5 W/m²K (single)',
    lightTransmission: '86%',
    soundReduction: '40-47 dB',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    benefits: ['Maximum noise reduction', 'All safety benefits of laminated'],
    bestFor: ['Near highways', 'Airport areas', 'Home theaters'],
  },
  {
    id: 'frosted',
    name: 'Frosted / Obscure Glass',
    category: 'specialty',
    description: 'Privacy glass that diffuses light while obscuring views.',
    thickness: '4mm / 5mm / 6mm',
    uValue: '5.8 W/m²K (single)',
    lightTransmission: '85%',
    soundReduction: '26-30 dB',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
    benefits: ['Privacy without blocking light', 'Soft diffused lighting'],
    bestFor: ['Bathrooms', 'Front doors', 'Office partitions'],
  },
  {
    id: 'tinted',
    name: 'Tinted / Solar Control Glass',
    category: 'specialty',
    description: 'Color-tinted glass for solar control. Available in bronze, grey, green, blue.',
    thickness: '4mm / 5mm / 6mm / 8mm',
    uValue: '5.5 W/m²K (single)',
    lightTransmission: '45-70%',
    soundReduction: '27-31 dB',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    benefits: ['Reduces solar heat', 'Glare reduction', 'Privacy enhancement'],
    bestFor: ['West/South facing', 'Commercial buildings'],
  },
];

// ============================================================================
// HARDWARE DATA
// ============================================================================
const HARDWARE_ITEMS = [
  // Handles
  { id: 'hoppe-secustic', name: 'Hoppe Secustic Handle', category: 'handles', brand: 'Hoppe', origin: 'Germany', features: ['Anti-jemmy device', '10-year warranty', 'Multiple finishes'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 'roto-swing', name: 'Roto Swing Handle', category: 'handles', brand: 'Roto Frank', origin: 'Germany', features: ['Ergonomic design', 'Child-safe lock option', 'Corrosion resistant'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 'siegenia-favorit', name: 'Siegenia Favorit Handle', category: 'handles', brand: 'Siegenia-Aubi', origin: 'Germany', features: ['TBT safety mechanism', 'Soft-close compatible', 'DIN tested'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  
  // Locks
  { id: 'gu-multilock', name: 'GU Multi-Point Lock', category: 'locks', brand: 'GU', origin: 'Germany', features: ['3-5 point locking', 'Anti-drill protection', 'Smooth mechanism'], image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80' },
  { id: 'roto-safe', name: 'Roto Safe Door Lock', category: 'locks', brand: 'Roto Frank', origin: 'Germany', features: ['RC2 certified', 'Mushroom cam bolts', 'Anti-pick cylinder'], image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80' },
  { id: 'yale-cylinder', name: 'Yale Euro Cylinder', category: 'locks', brand: 'Yale', origin: 'UK', features: ['Anti-snap protection', 'Anti-pick pins', 'Insurance approved'], image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80' },
  
  // Hinges
  { id: 'roto-nt', name: 'Roto NT Tilt & Turn Hinge', category: 'hinges', brand: 'Roto Frank', origin: 'Germany', features: ['Dual-mode operation', '3-plane adjustable', 'Up to 130kg sash'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'friction-stay', name: 'Premium Friction Stay', category: 'hinges', brand: 'Various', origin: 'UK', features: ['Stainless steel', 'Fire-exit option', '90° opening'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'child-restrictor', name: 'Child Safety Restrictor', category: 'hinges', brand: 'Various', origin: 'UK', features: ['100mm max opening', 'Key override', 'Fire compliant'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  
  // Sliding
  { id: 'tandem-roller', name: 'Heavy-Duty Tandem Rollers', category: 'sliding', brand: 'Various', origin: 'Germany', features: ['200kg max weight', 'PTFE coated', 'Adjustable height'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'lift-slide', name: 'Lift & Slide System', category: 'sliding', brand: 'Siegenia', origin: 'Germany', features: ['400kg panel weight', 'Compression seal', 'Premium feel'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  
  // Accessories
  { id: 'mesh-fiberglass', name: 'Fiberglass Insect Mesh', category: 'accessories', brand: 'Various', origin: 'India', features: ['18x16 mesh', 'UV resistant', 'Pet-proof option'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'mesh-ss', name: 'SS Security Mesh', category: 'accessories', brand: 'Various', origin: 'Australia', features: ['316 marine grade', 'Cut resistant', 'Fire safe'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'mesh-pleated', name: 'Pleated Retractable Screen', category: 'accessories', brand: 'Various', origin: 'Italy', features: ['Retractable', 'No visible track', 'Custom sizes'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 'trickle-vent', name: 'Trickle Ventilator', category: 'accessories', brand: 'Various', origin: 'UK', features: ['5000mm² airflow', 'Acoustic options', 'Weatherproof'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
];

// ============================================================================
// PROFILE SYSTEMS DATA
// ============================================================================
const PROFILE_SYSTEMS = [
  {
    id: '60mm',
    name: '60mm Classic',
    chambers: 3,
    uValue: '1.5',
    soundClass: '30-35 dB',
    maxGlass: '28mm',
    bestFor: 'Budget projects, mild climates',
  },
  {
    id: '70mm',
    name: '70mm Premium',
    chambers: 5,
    uValue: '1.2',
    soundClass: '35-40 dB',
    maxGlass: '40mm',
    bestFor: 'Most residential applications',
    popular: true,
  },
  {
    id: '82mm',
    name: '82mm Passive House',
    chambers: 6,
    uValue: '0.95',
    soundClass: '40-45 dB',
    maxGlass: '52mm',
    bestFor: 'Passive houses, extreme climates',
  },
];

// ============================================================================
// COMPONENT: Color Swatch Card
// ============================================================================
const ColorSwatchCard = ({ color, isSelected, onClick, viewMode }) => {
  const isCompact = viewMode === 'grid';
  
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
        isSelected ? "border-[hsl(var(--accent))] shadow-lg" : "border-transparent hover:border-gray-300"
      )}
      onClick={() => onClick(color)}
    >
      <Card className="overflow-hidden border-0 shadow-none">
        <div className={cn("relative overflow-hidden bg-gray-100", isCompact ? "aspect-square" : "aspect-[4/3]")}>
          <img
            src={color.image}
            alt={color.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Color preview overlay */}
          <div 
            className="absolute bottom-2 left-2 w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color.code }}
          />
          {color.secondaryCode && (
            <div 
              className="absolute bottom-2 left-8 w-8 h-8 rounded-full border-2 border-white shadow-md -ml-2"
              style={{ backgroundColor: color.secondaryCode }}
            />
          )}
          
          {color.popular && (
            <Badge className="absolute top-2 right-2 bg-[hsl(var(--accent))]">
              Popular
            </Badge>
          )}
          
          {isSelected && (
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <CardContent className={cn("p-3", isCompact && "p-2")}>
          <p className={cn("font-medium truncate", isCompact ? "text-xs" : "text-sm")}>{color.name}</p>
          {!isCompact && (
            <p className="text-xs text-muted-foreground mt-1 capitalize">{color.category.replace('_', ' ')}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: Glass Option Card
// ============================================================================
const GlassOptionCard = ({ glass, onSelect }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={glass.image}
        alt={glass.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {glass.popular && (
        <Badge className="absolute top-3 right-3 bg-[hsl(var(--accent))]">
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
    { id: 'woodgrain', label: 'Woodgrain', count: COLOR_FINISHES.filter(c => c.category === 'woodgrain').length },
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
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=compress&cs=tinysrgb&w=1920&q=80"
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
