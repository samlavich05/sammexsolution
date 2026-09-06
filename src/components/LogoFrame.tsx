import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Plus } from 'lucide-react';
import { useBrandLogo } from '../context/LogoContext';

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
  editable = true,
  showTooltip = true
}) => {
  const { logoUrl, openModal, updateLogo } = useBrandLogo();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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

  return (
    <div 
      className="relative group inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role={editable ? 'button' : undefined}
        tabIndex={editable ? 0 : undefined}
        onKeyDown={(e) => {
          if (editable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openModal();
          }
        }}
        className={`
          ${sizeClasses}
          relative rounded-xl border-2 overflow-hidden flex items-center justify-center p-0.5
          transition-all duration-300 select-none
          ${variant === 'dark' 
            ? 'border-white/80 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:shadow-lg shadow-sm' 
            : 'border-[#0A2A66] bg-slate-50 text-[#0A2A66] hover:border-black hover:bg-slate-100 hover:shadow-md'
          }
          ${isDragOver ? 'ring-2 ring-emerald-400 scale-105' : ''}
          ${editable ? 'cursor-pointer' : ''}
          ${className}
        `}
        title={editable ? (logoUrl ? 'Click to change logo' : 'Click to add your logo to frame') : undefined}
        aria-label={logoUrl ? 'Brand Logo' : 'Add brand logo to frame'}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Sammex Solution Brand Logo"
            className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105"
          />
        ) : (
          /* Empty Frame Placeholder with Elegant Frame Mark */
          <div className="w-full h-full rounded-lg border border-dashed border-current/40 flex flex-col items-center justify-center relative p-0.5">
            <ImageIcon className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform" />
            <span className="text-[7px] font-extrabold tracking-tighter uppercase mt-0.5 opacity-90">
              Logo
            </span>
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
            {logoUrl ? (
              <Camera className="w-3.5 h-3.5 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Discreet tooltip hint when frame is empty */}
      {editable && showTooltip && !logoUrl && isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-black text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl z-50 pointer-events-none animate-fade-in border border-white/20">
          Click to add logo
        </div>
      )}
    </div>
  );
};
