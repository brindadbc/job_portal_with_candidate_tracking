import { useTranslation as useI18nTranslation } from 'react-i18next';

// Hook personnalisé pour simplifier l'utilisation des traductions
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const getAvailableLanguages = () => {
    return Object.keys(i18n.options.resources);
  };

  const isLanguageLoaded = (lng) => {
    return i18n.hasResourceBundle(lng, 'translation');
  };

  // Fonction pour traduire avec des paramètres
  const translate = (key, options = {}) => {
    return t(key, options);
  };

  // Fonction pour traduire avec pluralisation
  const translatePlural = (key, count, options = {}) => {
    return t(key, { count, ...options });
  };

  // Fonction pour traduire avec interpolation
  const translateWithValues = (key, values) => {
    return t(key, values);
  };

  return {
    t,
    translate,
    translatePlural,
    translateWithValues,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    isLanguageLoaded,
    i18n
  };
};

export default useTranslation;