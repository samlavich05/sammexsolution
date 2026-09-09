import React, { createContext, useContext, useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface FounderImageContextType {
  imageUrl: string | null;
  updateImage: (url: string | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FounderImageContext = createContext<FounderImageContextType | undefined>(undefined);

const STORAGE_KEY = 'sammex_founder_image';

function getValidInitialFounderImage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Ignore invalid values, empty strings, null literals, or expired blob URLs
    if (
      stored &&
      stored !== 'null' &&
      stored !== 'undefined' &&
      !stored.startsWith('blob:') &&
      stored.trim().length > 4
    ) {
      return stored;
    }
    // Clean up any stale or invalid blob entries
    if (stored && (stored.startsWith('blob:') || stored === 'null' || stored === 'undefined')) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return SITE_CONFIG.founderImageUrl;
  } catch {
    return SITE_CONFIG.founderImageUrl;
  }
}

export const FounderImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(getValidInitialFounderImage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateImage = (url: string | null) => {
    // If null or invalid, revert to permanent default
    const targetUrl = url && !url.startsWith('blob:') ? url : SITE_CONFIG.founderImageUrl;
    setImageUrl(targetUrl);
    try {
      if (url && !url.startsWith('blob:')) {
        localStorage.setItem(STORAGE_KEY, url);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Unable to persist founder image to localStorage:', e);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <FounderImageContext.Provider
      value={{
        imageUrl,
        updateImage,
        isModalOpen,
        openModal,
        closeModal
      }}
    >
      {children}
    </FounderImageContext.Provider>
  );
};

export const useFounderImage = () => {
  const context = useContext(FounderImageContext);
  if (!context) {
    throw new Error('useFounderImage must be used within a FounderImageProvider');
  }
  return context;
};
