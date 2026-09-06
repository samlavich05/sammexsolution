import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Trash2, 
  Check, 
  AlertCircle,
  Camera
} from 'lucide-react';
import { useBrandLogo } from '../context/LogoContext';

interface LogoUploadModalProps {
  onTrackAction?: (actionType: string, description: string) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ onTrackAction }) => {
  const { logoUrl, updateLogo, isModalOpen, closeModal } = useBrandLogo();
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [inputUrl, setInputUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(logoUrl);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const handleFileSelect = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be under 5MB for optimal web performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
    };
    reader.onerror = () => {
      setError('Failed to read selected image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!inputUrl.trim()) {
      setError('Please enter a valid image URL.');
      return;
    }
    setError(null);
    setPreviewUrl(inputUrl.trim());
  };

  const handleSave = () => {
    updateLogo(previewUrl);
    if (onTrackAction) {
      onTrackAction('logo_updated', previewUrl ? 'Custom logo added to frame' : 'Logo removed from frame');
    }
    closeModal();
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setInputUrl('');
    updateLogo(null);
    if (onTrackAction) {
      onTrackAction('logo_removed', 'Brand logo removed from frame');
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A2A66] p-5 text-white flex items-center justify-between border-b border-black">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Add Brand Logo</h3>
              <p className="text-xs text-slate-300">Set your custom logo in the brand frame</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Tab Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => { setActiveTab('upload'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'upload' 
                  ? 'bg-white text-[#0A2A66] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image File</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('url'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'url' 
                  ? 'bg-white text-[#0A2A66] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image Web Link</span>
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Upload File Zone */}
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragOver 
                  ? 'border-[#0A2A66] bg-[#0A2A66]/5' 
                  : 'border-slate-300 hover:border-[#0A2A66] bg-slate-50 hover:bg-slate-100/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3 text-[#0A2A66]">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Click to browse or drag & drop your logo
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports PNG, SVG, JPG, WebP (Max 5MB)
              </p>
            </div>
          )}

          {/* Web URL input */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Direct Image Link
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A2A66] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-colors cursor-pointer"
                >
                  Preview
                </button>
              </div>
            </div>
          )}

          {/* Live Frame Preview */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Logo Frame Live Preview</span>
              {previewUrl && (
                <span className="text-emerald-600 font-bold normal-case flex items-center gap-1">
                  <Check className="w-3 h-3" /> Ready to apply
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Dark Brand Frame Preview */}
              <div className="p-3 rounded-lg bg-[#0A2A66] flex flex-col items-center justify-center gap-2 border border-black">
                <span className="text-[10px] text-slate-300 font-medium">Header / Navbar Frame</span>
                <div className="w-12 h-12 rounded-xl border-2 border-white/80 bg-white/10 flex items-center justify-center p-1 overflow-hidden shadow-inner">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Logo preview" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/70">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-[8px] font-bold mt-0.5 tracking-tighter uppercase">Empty</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Light Brand Frame Preview */}
              <div className="p-3 rounded-lg bg-white flex flex-col items-center justify-center gap-2 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-medium">Light Surface Frame</span>
                <div className="w-12 h-12 rounded-xl border-2 border-[#0A2A66] bg-slate-50 flex items-center justify-center p-1 overflow-hidden shadow-inner">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Logo preview" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-[8px] font-bold mt-0.5 tracking-tighter uppercase">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {previewUrl || logoUrl ? (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Logo</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!previewUrl && !logoUrl}
                className="px-5 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-white" />
                <span>Save Logo in Frame</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
