import React, { useState, useEffect } from 'react';
import { Camera, Plus } from 'lucide-react';
import { useBrandLogo } from '../context/LogoContext';
import { SITE_CONFIG } from '../config/siteConfig';

interface LogoFrameProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
  editable?: boolean;
  showTooltip?: boolean;
}

export const LogoFrame: React.FC<LogoFrameProps> = ({
  size = 'md',
  variant = 'dark',
  className = '',
  editable = false,
  showTooltip = false
}) => {
  const { logoUrl, openModal, updateLogo } = useBrandLogo();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset error state when logoUrl changes
  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }[size];

  const handleDrop = (e: React.DragEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          updateLogo(result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (editable) {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    }
  };

  // Determine which image src to use
  const activeSrc = !imgError && logoUrl ? logoUrl : null;

  return (
    <div 
      className="relative group inline-block"
      onMouseEnter={() => { if (editable) setIsHovered(true); }}
      onMouseLeave={() => { if (editable) setIsHovered(false); }}
    >
      <div
        onClick={editable ? handleClick : undefined}
        onDrop={editable ? handleDrop : undefined}
        onDragOver={editable ? handleDragOver : undefined}
        onDragLeave={editable ? handleDragLeave : undefined}
        role={editable ? 'button' : undefined}
        tabIndex={editable ? 0 : undefined}
        onKeyDown={editable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        } : undefined}
        className={`
          ${sizeClasses}
          relative rounded-xl border-2 overflow-hidden flex items-center justify-center p-0.5
          transition-all duration-300 select-none
          ${variant === 'dark' 
            ? 'border-white/80 bg-white/10 text-white shadow-sm' 
            : 'border-[#0A2A66] bg-slate-50 text-[#0A2A66] shadow-sm'
          }
          ${editable && variant === 'dark' ? 'hover:border-white hover:bg-white/20 hover:shadow-lg' : ''}
          ${editable && variant === 'light' ? 'hover:border-black hover:bg-slate-100 hover:shadow-md' : ''}
          ${isDragOver ? 'ring-2 ring-emerald-400 scale-105' : ''}
          ${editable ? 'cursor-pointer' : ''}
          ${className}
        `}
        title={editable ? (logoUrl ? 'Click to change logo' : 'Click to add your logo to frame') : 'Sammex Solution'}
        aria-label="Sammex Solution Brand Logo"
      >
        {activeSrc ? (
          <img
            src={activeSrc}
            alt="Sammex Solution Brand Logo"
            referrerPolicy="no-referrer"
            onError={() => {
              setImgError(true);
            }}
            className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105"
          />
        ) : (
          /* Permanent Brand Identity Monogram (Always Crisp, Never Broken) */
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#0A2A66] to-[#051533] flex items-center justify-center relative shadow-inner">
            <span className="text-white font-black text-base sm:text-lg tracking-tight font-heading leading-none">
              S
            </span>
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black/40" />
          </div>
        )}

        {/* Hover overlay with edit/camera trigger */}
        {editable && (
          <div 
            className={`
              absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg transition-opacity duration-200
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {activeSrc ? (
              <Camera className="w-3.5 h-3.5 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Discreet tooltip hint when frame is empty */}
      {editable && showTooltip && !activeSrc && isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-black text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl z-50 pointer-events-none animate-fade-in border border-white/20">
          Click to add logo
        </div>
      )}
    </div>
  );
};
