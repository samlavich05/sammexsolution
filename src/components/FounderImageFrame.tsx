import React, { useState } from 'react';
import { Camera, User, Plus } from 'lucide-react';
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
  editable = true,
  showTooltip = true
}) => {
  const { imageUrl, openModal, updateImage } = useFounderImage();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
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
          ${roundedClasses}
          relative border-2 overflow-hidden flex items-center justify-center p-0.5
          transition-all duration-300 select-none shadow-md
          ${variant === 'dark' 
            ? 'border-white bg-[#0A2A66] text-white hover:border-white hover:bg-black' 
            : 'border-[#0A2A66] bg-white text-[#0A2A66] hover:border-black hover:bg-slate-50'
          }
          ${isDragOver ? 'ring-4 ring-emerald-400 scale-105' : ''}
          ${editable ? 'cursor-pointer hover:shadow-xl' : ''}
          ${className}
        `}
        title={editable ? (imageUrl ? 'Click to change profile image' : 'Click to add your photo to frame') : undefined}
        aria-label={imageUrl ? `${SITE_CONFIG.founderName} Profile Photo` : 'Add profile photo to frame'}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={SITE_CONFIG.founderName}
            className={`w-full h-full object-cover ${innerRoundedClasses} transition-transform group-hover:scale-105`}
          />
        ) : (
          /* Empty Portrait Frame with Camera / Portrait Icon */
          <div className={`w-full h-full ${innerRoundedClasses} border border-dashed border-current/40 flex flex-col items-center justify-center relative p-1`}>
            {size === 'sm' ? (
              <User className="w-4 h-4 opacity-80" />
            ) : (
              <>
                <Camera className="w-5 h-5 opacity-80 group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold tracking-tight uppercase mt-0.5 opacity-90 leading-none">
                  Add Image
                </span>
              </>
            )}
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
            {imageUrl ? (
              <Camera className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Tooltip hint when frame is empty */}
      {editable && showTooltip && !imageUrl && isHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl z-50 pointer-events-none animate-fade-in border border-white/20">
          Click to add your image
        </div>
      )}
    </div>
  );
};
