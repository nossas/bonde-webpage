import React, { createContext } from 'react';

const LanguageContext = createContext('ptbr');

interface ProviderProps {
  locale: 'ptbr' | 'es'
}

export const LanguageProvider: React.FC<ProviderProps> = ({ children, locale }) => (
  <LanguageContext.Provider value={locale}>
    {children}
  </LanguageContext.Provider>
);

export default LanguageContext.Consumer;