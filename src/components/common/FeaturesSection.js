// import React from 'react';

// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: '🔍',
//       title: 'Recherche avancée',
//       description: 'Filtrez les offres par secteur, localisation, salaire et compétences pour trouver l\'emploi qui vous correspond parfaitement.'
//     },
//     {
//       icon: '📈',
//       title: 'Tableau de bord complet',
//       description: 'Visualisez vos candidatures, entretiens et réponses dans un tableau de bord intuitif et personnalisé.'
//     },
//     {
//       icon: '🤝',
//       title: 'Réseau professionnel',
//       description: 'Connectez-vous avec des recruteurs et des professionnels de votre secteur pour élargir vos opportunités.'
//     },
//     {
//       icon: '⚡',
//       title: 'Candidature express',
//       description: 'Postulez en un clic avec votre profil pré-rempli et gagnez du temps dans vos démarches.'
//     },
//     {
//       icon: '🎓',
//       title: 'Formation continue',
//       description: 'Accédez à des ressources de formation pour développer vos compétences et booster votre profil.'
//     },
//     {
//       icon: '🔔',
//       title: 'Alertes intelligentes',
//       description: 'Recevez des notifications personnalisées pour les offres qui correspondent à vos critères de recherche.'
//     }
//   ];

//   return (
//     <section className="features-section">
//       <div className="features-container">
//         <h2 className="section-title">Pourquoi choisir JobTracks ?</h2>
//         <p className="section-subtitle">
//           Découvrez les fonctionnalités qui font de JobTracks la solution de référence 
//           pour votre recherche d'emploi et vos recrutements
//         </p>
//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div key={index} className="feature-card">
//               <div className="feature-icon">{feature.icon}</div>
//               <h3 className="feature-title">{feature.title}</h3>
//               <p className="feature-text">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;




import React from 'react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🔍',
      title: t('features.items.search.title'),
      description: t('features.items.search.description')
    },
    {
      icon: '📈',
      title: t('features.items.dashboard.title'),
      description: t('features.items.dashboard.description')
    },
    {
      icon: '🤝',
      title: t('features.items.network.title'),
      description: t('features.items.network.description')
    },
    {
      icon: '⚡',
      title: t('features.items.express.title'),
      description: t('features.items.express.description')
    },
    {
      icon: '🎓',
      title: t('features.items.training.title'),
      description: t('features.items.training.description')
    },
    {
      icon: '🔔',
      title: t('features.items.alerts.title'),
      description: t('features.items.alerts.description')
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="section-title">{t('features.title')}</h2>
        <p className="section-subtitle">
          {t('features.subtitle')}
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
