// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import heroImage from '../../assets/images/pers3.png';

// const HeroSection = () => {
//   useEffect(() => {
//     // Animation des statistiques
//     const animateStats = () => {
//       const statNumbers = document.querySelectorAll('.stat-number');
//       statNumbers.forEach((stat) => {
//         const finalValue = stat.textContent;
//         const isPercentage = finalValue.includes('%');
//         const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
//         let currentValue = 0;
//         const increment = numericValue / 50;
        
//         const timer = setInterval(() => {
//           currentValue += increment;
//           if (currentValue >= numericValue) {
//             currentValue = numericValue;
//             clearInterval(timer);
//           }
          
//           if (isPercentage) {
//             stat.textContent = Math.floor(currentValue) + '%';
//           } else if (numericValue >= 1000) {
//             stat.textContent = Math.floor(currentValue / 1000) + 'K+';
//           } else {
//             stat.textContent = Math.floor(currentValue);
//           }
//         }, 50);
//       });
//     };

//     setTimeout(animateStats, 1000);
//   }, []);

//   return (
//     <section className="hero-section">
//       <div className="hero-content">
//         <div className="hero-text">
//           <h1 className="hero-title">
//             Trouvez votre emploi idéal avec JobTracks
//           </h1>
//           <p className="hero-subtitle">
//             La plateforme complète pour connecter talents et entreprises. 
//             Suivez vos candidatures, gérez vos recrutements et accélérez votre carrière.
//           </p>
//           <div className="hero-actions">
//             <Link to="/jobs" className="btn btn-primary">
//               Parcourir les emplois
//             </Link>
//             <Link to="/demo" className="btn btn-secondary">
//               Voir la démo
//             </Link>
//           </div>
//           <div className="stats-grid">
//             <div className="stat-item">
//               <span className="stat-number">10000</span>
//               <span className="stat-label">Emplois actifs</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">5000</span>
//               <span className="stat-label">Entreprises</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">50000</span>
//               <span className="stat-label">Candidats</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">95</span>
//               <span className="stat-label">Taux de satisfaction</span>
//             </div>
//           </div>
//         </div>
//         <div className="hero-visual">
//           <img src={heroImage} alt="Personne travaillant" className="hero-image" />
//           <div className="floating-cards-container">
//             <div className="floating-card">
//               <div className="card-icon">📊</div>
//               <div className="card-title">Suivi en temps réel</div>
//               <div className="card-text">Suivez l'évolution de vos candidatures</div>
//             </div>
//             <div className="floating-card">
//               <div className="card-icon">📱</div>
//               <div className="card-title">Interface moderne</div>
//               <div className="card-text">Expérience utilisateur optimisée</div>
//             </div>
//             <div className="floating-card">
//               <div className="card-icon">🎯</div>
//               <div className="card-title">Matching intelligent</div>
//               <div className="card-text">Trouvez les profils parfaits</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroImage from '../../assets/images/kk.png';

const HeroSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Animation des statistiques
    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }
          
          if (isPercentage) {
            stat.textContent = Math.floor(currentValue) + '%';
          } else if (numericValue >= 1000) {
            stat.textContent = Math.floor(currentValue / 1000) + 'K+';
          } else {
            stat.textContent = Math.floor(currentValue);
          }
        }, 50);
      });
    };

    setTimeout(animateStats, 1000);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/jobs" className="btn btn-primary">
              {t('hero.browseJobs')}
            </Link>
            <Link to="/demo" className="btn btn-secondary">
              {t('hero.viewDemo')}
            </Link>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10000</span>
              <span className="stat-label">{t('hero.stats.activeJobs')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000</span>
              <span className="stat-label">{t('hero.stats.companies')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50000</span>
              <span className="stat-label">{t('hero.stats.candidates')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95</span>
              <span className="stat-label">{t('hero.stats.satisfaction')}</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img src={heroImage} alt="Personne travaillant" className="hero-image" />
          <div className="floating-cards-container">
            <div className="floating-card">
              <div className="card-icon">📊</div>
              <div className="card-title">{t('hero.cards.realTime.title')}</div>
              <div className="card-text">{t('hero.cards.realTime.text')}</div>
            </div>
            <div className="floating-card">
              <div className="card-icon">📱</div>
              <div className="card-title">{t('hero.cards.modern.title')}</div>
              <div className="card-text">{t('hero.cards.modern.text')}</div>
            </div>
            <div className="floating-card">
              <div className="card-icon">🎯</div>
              <div className="card-title">{t('hero.cards.matching.title')}</div>
              <div className="card-text">{t('hero.cards.matching.text')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
