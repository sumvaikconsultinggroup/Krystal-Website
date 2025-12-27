import React from 'react';
import { cn } from '../../lib/utils';

// Krystal Logo Component - Clean text-based logo
export default function KrystalLogo({ 
  variant = 'default', // 'default' | 'light' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const variantClasses = {
    default: 'text-[#0a1628]',
    light: 'text-white',
    dark: 'text-[#0a1628]',
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon - stylized K */}
      <div className={cn(
        "relative flex items-center justify-center font-bold",
        sizeClasses[size],
        "w-10 h-10",
        size === 'sm' && "w-8 h-8",
        size === 'lg' && "w-12 h-12"
      )}>
        <svg viewBox="0 0 40 40" className="w-full h-full">
          {/* Background */}
          <rect 
            x="2" y="2" width="36" height="36" rx="4" 
            fill={variant === 'light' ? 'white' : '#0a1628'}
          />
          {/* K letterform */}
          <path 
            d="M12 10 L12 30 M12 20 L24 10 M17 20 L26 30" 
            stroke={variant === 'light' ? '#0a1628' : '#00d4ff'} 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Accent line */}
          <line 
            x1="28" y1="10" x2="28" y2="18" 
            stroke={variant === 'light' ? '#0a1628' : '#00d4ff'} 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className={cn(
          "font-bold tracking-wide",
          sizeClasses[size],
          variantClasses[variant]
        )}>
          KRYSTAL
        </span>
        <span className={cn(
          "text-[9px] tracking-[0.2em] uppercase",
          variant === 'light' ? 'text-white/70' : 'text-muted-foreground',
          size === 'lg' && "text-[10px]",
          size === 'sm' && "text-[8px]"
        )}>
          uPVC Doors & Windows
        </span>
      </div>
    </div>
  );
}

// Alternate simpler logo - just text
export function KrystalLogoText({ 
  variant = 'default', 
  size = 'md',
  className = '' 
}) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn("flex items-baseline gap-1", className)}>
      <span className={cn(
        "font-bold tracking-tight",
        sizeClasses[size],
        variant === 'light' ? 'text-white' : 'text-[#0a1628]'
      )}>
        <span className="text-[#00d4ff]">K</span>RYSTAL
      </span>
    </div>
  );
}
