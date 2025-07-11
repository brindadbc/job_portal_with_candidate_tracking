import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  detectBrowserLanguage, 
  saveLanguagePreference, 
  getLanguagePreference 
} from '../utils/translationUtils';

const TranslationContext = createContext();

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);

  const supportedLanguages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  useEffect(() => {
    // Initialiser la langue au chargement
    const savedLanguage = getLanguagePreference();
    const browserLanguage = detectBrowserLanguage();
    const initialLanguage = savedLanguage || browserLanguage || 'fr';
    
    if (initialLanguage !== i18n.language) {
      changeLanguage(initialLanguage);
    }
  }, [i18n.language]);

  const changeLanguage = async (languageCode) => {
    if (languageCode === currentLanguage) return;

    setIsLoading(true);
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      saveLanguagePreference(languageCode);
      
      // Mettre à jour l'attribut lang du document
      document.documentElement.lang = languageCode;
      
      // Optionnel : Mettre à jour la direction du texte
      document.documentElement.dir = languageCode === 'ar' || languageCode === 'he' ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLanguageInfo = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  };

  const value = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    getCurrentLanguageInfo,
    isLoading
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;