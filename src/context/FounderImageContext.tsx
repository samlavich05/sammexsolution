import React, { createContext, useContext, useState } from 'react';

interface FounderImageContextType {
  imageUrl: string | null;
  updateImage: (url: string | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const FounderImageContext = createContext<FounderImageContextType | undefined>(undefined);

const STORAGE_KEY = 'sammex_founder_image';

export const FounderImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateImage = (url: string | null) => {
    setImageUrl(url);
    try {
      if (url) {
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
