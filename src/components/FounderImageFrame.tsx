import React, { useState, useEffect } from 'react';
import { Camera, Plus } from 'lucide-react';
import { useFounderImage } from '../context/FounderImageContext';
import { SITE_CONFIG } from '../config/siteConfig';

interface FounderImageFrameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'circle';
  variant?: 'dark' | 'light';
  className?: string;
  editable?: boolean;
  showTooltip?: boolean;
}

export const FounderImageFrame: React.FC<FounderImageFrameProps> = ({
  size = 'lg',
  shape = 'rounded',
  variant = 'dark',
  className = '',
  editable = false,
  showTooltip = false
}) => {
  const { imageUrl, openModal, updateImage } = useFounderImage();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset error state when imageUrl changes
  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }[size];

  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm font-bold',
    lg: 'text-base font-extrabold',
    xl: 'text-xl font-black'
  }[size];

  const roundedClasses = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';
  const innerRoundedClasses = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

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
          updateImage(result);
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

  // Determine active image source
  const activeSrc = !imgError && imageUrl ? imageUrl : null;

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
          ${roundedClasses}
          relative border-2 overflow-hidden flex items-center justify-center p-0.5
          transition-all duration-300 select-none shadow-md
          ${variant === 'dark' 
            ? 'border-white bg-[#0A2A66] text-white shadow-md' 
            : 'border-[#0A2A66] bg-white text-[#0A2A66] shadow-sm'
          }
          ${editable && variant === 'dark' ? 'hover:border-white hover:bg-black' : ''}
          ${editable && variant === 'light' ? 'hover:border-black hover:bg-slate-50' : ''}
          ${isDragOver ? 'ring-4 ring-emerald-400 scale-105' : ''}
          ${editable ? 'cursor-pointer hover:shadow-xl' : ''}
          ${className}
        `}
        title={editable ? (imageUrl ? 'Click to change profile image' : 'Click to add your photo to frame') : `${SITE_CONFIG.founderName} - ${SITE_CONFIG.founderRole}`}
        aria-label={`${SITE_CONFIG.founderName} Profile Photo`}
      >
        {activeSrc ? (
          <img
            src={activeSrc}
            alt={SITE_CONFIG.founderName}
            referrerPolicy="no-referrer"
            onError={() => {
              setImgError(true);
            }}
            className={`w-full h-full object-cover ${innerRoundedClasses} transition-transform group-hover:scale-105`}
          />
        ) : (
          /* Permanent Executive Founder Monogram Avatar (Always Crisp, Never Broken) */
          <div className={`w-full h-full ${innerRoundedClasses} bg-gradient-to-br from-[#0A2A66] via-[#103E99] to-[#0A2A66] flex items-center justify-center relative shadow-inner text-white`}>
            <span className={`${fontSizes} tracking-tight font-heading leading-none select-none font-black`}>
              AS
            </span>
            <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white/50" />
          </div>
        )}

        {/* Hover overlay with edit/camera trigger */}
        {editable && (
          <div 
            className={`
              absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center ${innerRoundedClasses} transition-opacity duration-200
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {activeSrc ? (
              <Camera className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Discreet tooltip hint when frame is empty */}
      {editable && showTooltip && !activeSrc && isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-black text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl z-50 pointer-events-none animate-fade-in border border-white/20">
          Click to add photo
        </div>
      )}
    </div>
  );
};
