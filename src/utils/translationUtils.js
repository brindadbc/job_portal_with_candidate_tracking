// Utilitaires pour la gestion des traductions

// Fonction pour détecter la langue préférée du navigateur
export const detectBrowserLanguage = () => {
  const languages = navigator.languages || [navigator.language];
  const supportedLanguages = ['fr', 'en', 'es', 'de'];
  
  for (const lang of languages) {
    const langCode = lang.split('-')[0];
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
  }
  
  return 'fr'; // Langue par défaut
};

// Fonction pour sauvegarder la langue dans le localStorage
export const saveLanguagePreference = (language) => {
  localStorage.setItem('preferred-language', language);
};

// Fonction pour récupérer la langue sauvegardée
export const getLanguagePreference = () => {
  return localStorage.getItem('preferred-language');
};

// Fonction pour formater les dates selon la langue
export const formatDate = (date, language) => {
  const locales = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };
  
  return new Date(date).toLocaleDateString(locales[language] || 'fr-FR');
};

// Fonction pour formater les nombres selon la langue
export const formatNumber = (number, language) => {
  const locales = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };
  
  return new Intl.NumberFormat(locales[language] || 'fr-FR').format(number);
};

// Fonction pour formater les devises selon la langue
export const formatCurrency = (amount, language, currency = 'EUR') => {
  const locales = {
    fr: 'fr-FR',
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE'
  };
  
  return new Intl.NumberFormat(locales[language] || 'fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Fonction pour obtenir la direction du texte (RTL/LTR)
export const getTextDirection = (language) => {
  const rtlLanguages = ['ar', 'he', 'fa'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

// Fonction pour valider les clés de traduction
export const validateTranslationKey = (key, translations) => {
  const keys = key.split('.');
  let current = translations;
  
  for (const k of keys) {
    if (current[k] === undefined) {
      return false;
    }
    current = current[k];
  }
  
  return true;
};

// Fonction pour obtenir toutes les traductions manquantes
export const getMissingTranslations = (baseTranslations, targetTranslations) => {
  const missing = [];
  
  const checkObject = (base, target, path = '') => {
    for (const key in base) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof base[key] === 'object' && base[key] !== null) {
        if (!target[key] || typeof target[key] !== 'object') {
          missing.push(currentPath);
        } else {
          checkObject(base[key], target[key], currentPath);
        }
      } else {
        if (!target[key]) {
          missing.push(currentPath);
        }
      }
    }
  };
  
  checkObject(baseTranslations, targetTranslations);
  return missing;
};