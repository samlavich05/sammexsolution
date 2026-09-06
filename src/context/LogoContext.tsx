import React, { createContext, useContext, useState, useEffect } from 'react';

interface LogoContextType {
  logoUrl: string | null;
  updateLogo: (url: string | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

const STORAGE_KEY = 'sammex_brand_logo';

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateLogo = (url: string | null) => {
    setLogoUrl(url);
    try {
      if (url) {
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
