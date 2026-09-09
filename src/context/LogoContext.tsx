import React, { createContext, useContext, useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface LogoContextType {
  logoUrl: string | null;
  updateLogo: (url: string | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

const STORAGE_KEY = 'sammex_brand_logo';

function getValidInitialLogo(): string {
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
    return SITE_CONFIG.brandLogoUrl;
  } catch {
    return SITE_CONFIG.brandLogoUrl;
  }
}

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(getValidInitialLogo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateLogo = (url: string | null) => {
    // If null or invalid, revert to permanent default
    const targetUrl = url && !url.startsWith('blob:') ? url : SITE_CONFIG.brandLogoUrl;
    setLogoUrl(targetUrl);
    try {
      if (url && !url.startsWith('blob:')) {
        localStorage.setItem(STORAGE_KEY, url);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Unable to persist logo to localStorage:', e);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <LogoContext.Provider
      value={{
        logoUrl,
        updateLogo,
        isModalOpen,
        openModal,
        closeModal
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useBrandLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useBrandLogo must be used within a LogoProvider');
  }
  return context;
};
