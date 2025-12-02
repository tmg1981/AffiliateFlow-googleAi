
import React, { createContext, useContext, ReactNode } from 'react';

interface SettingsContextType {
  apiKey: string | null;
  saveApiKey: (key: string) => void;
  isKeySet: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const GenerateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // FIX: All logic for API key management removed as per guidelines.
  // The API key is now expected to be in process.env.API_KEY.
  const value: SettingsContextType = {
    apiKey: null, // No longer sourced from UI
    saveApiKey: () => {}, // No-op
    isKeySet: true, // Assume key is set via environment variables
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a GenerateProvider');
  }
  return context;
};
