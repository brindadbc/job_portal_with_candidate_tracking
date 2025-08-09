


// import React, { useState } from 'react';

// const JobCard = ({ job }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isDescriptionLong, setIsDescriptionLong] = useState(false);

//   // Formatage du salaire
//   const formatSalary = (salary) => {
//     if (!salary) return 'Salaire non spécifié';
        
//     if (typeof salary === 'string') return salary;
        
//     if (typeof salary === 'object' && salary !== null) {
//       const { min, max, currency = 'FCFA', period = 'year' } = salary;
      
//       // Mapping des devises
//       const currencySymbol = {
//         'FCFA': 'FCFA',
//         'EUR': '€',
//         'USD': '$',
//         'GBP': '£'
//       }[currency] || currency;
      
//       // Mapping des périodes
//       const periodText = {
//         'year': '/an',
//         'month': '/mois',
//         'day': '/jour',
//         'hour': '/h'
//       }[period] || '';
            
//       if (min && max) {
//         return `${parseInt(min).toLocaleString()} - ${parseInt(max).toLocaleString()} ${currencySymbol}${periodText}`;
//       }
//       if (min) return `À partir de ${parseInt(min).toLocaleString()} ${currencySymbol}${periodText}`;
//       if (max) return `Jusqu'à ${parseInt(max).toLocaleString()} ${currencySymbol}${periodText}`;
//     }
        
//     return 'Salaire non spécifié';
//   };

//   // Vérifie si la description est longue au montage
//   React.useEffect(() => {
//     if (job.description && job.description.length > 150) {
//       setIsDescriptionLong(true);
//     }
//   }, [job.description]);

//   return (
//     <div className="job-card">
//       <div className="job-header">
//         <h3 className="job-title">{job.title}</h3>
//         <span className="job-type">{job.type}</span>
//       </div>
            
//       <div className="job-company">
//         <strong>{job.company}</strong>
//       </div>
            
//       <div className="job-location">
//         📍 {job.location || 'Non spécifié'}
//       </div>

//       {/* AJOUT: Département */}
//       {job.department && (
//         <div className="job-department">
//           🏢 {job.department}
//         </div>
//       )}

//       {/* AJOUT: Niveau d'expérience */}
//       {job.experience && (
//         <div className="job-experience">
//           📊 {job.experience}
//         </div>
//       )}
            
//       <div className="job-salary">
//         💰 {formatSalary(job.salary)}
//       </div>
            
//       <div className="job-description">
//         {isDescriptionLong && !isExpanded 
//            ? `${job.description.substring(0, 150)}...`
//            : job.description}
//       </div>
            
//       {isDescriptionLong && (
//         <button 
//            onClick={() => setIsExpanded(!isExpanded)}
//           className="read-more-btn"
//         >
//           {isExpanded ? 'Voir moins' : 'Voir plus'}
//         </button>
//       )}

//       {/* Section des compétences */}
//       {job.skills && job.skills.length > 0 && (
//         <div className="job-skills">
//           <strong>Compétences requises:</strong>
//           <div className="skills-list">
//             {job.skills.map((skill, index) => (
//               <span key={index} className="skill-tag">{skill}</span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Section des exigences */}
//       {job.requirements && job.requirements.length > 0 && (
//         <div className="job-requirements">
//           <strong>Exigences:</strong>
//           <div className="requirements-list">
//             {job.requirements.map((req, index) => (
//               <span key={index} className="requirement-tag">{req}</span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Section des avantages */}
//       {job.benefits && job.benefits.length > 0 && (
//         <div className="job-benefits">
//           <strong>Avantages:</strong>
//           <div className="benefits-list">
//             {job.benefits.map((benefit, index) => (
//               <span key={index} className="benefit-tag">{benefit}</span>
//             ))}
//           </div>
//         </div>
//       )}
            
//       <div className="job-actions">
//         <button className="btn btn-primary">
//           Postuler
//         </button>
//         <button className="btn btn-secondary">
//           Sauvegarder
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const navigate = useNavigate();

  // Formatage du salaire
  const formatSalary = (salary) => {
    if (!salary) return 'Salaire non spécifié';
        
    if (typeof salary === 'string') return salary;
        
    if (typeof salary === 'object' && salary !== null) {
      const { min, max, currency = 'FCFA', period = 'year' } = salary;
      
      // Mapping des devises
      const currencySymbol = {
        'FCFA': 'FCFA',
        'EUR': '€',
        'USD': '$',
        'GBP': '£'
      }[currency] || currency;
      
      // Mapping des périodes
      const periodText = {
        'year': '/an',
        'month': '/mois',
        'day': '/jour',
        'hour': '/h'
      }[period] || '';
            
      if (min && max) {
        return `${parseInt(min).toLocaleString()} - ${parseInt(max).toLocaleString()} ${currencySymbol}${periodText}`;
      }
      if (min) return `À partir de ${parseInt(min).toLocaleString()} ${currencySymbol}${periodText}`;
      if (max) return `Jusqu'à ${parseInt(max).toLocaleString()} ${currencySymbol}${periodText}`;
    }
        
    return 'Salaire non spécifié';
  };

  // Fonction pour gérer la candidature
  const handleApply = () => {
    // Encoder les données de l'emploi pour les passer dans l'URL
    const jobData = encodeURIComponent(JSON.stringify({
      id: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: formatSalary(job.salary),
      description: job.description,
      skills: job.skills || [],
      requirements: job.requirements || [],
      benefits: job.benefits || [],
      department: job.department,
      experience: job.experience,
      postedDate: job.createdAt || job.postedDate || 'Récemment'
    }));
    
    // Naviguer vers la page de candidature avec les données de l'emploi
    // Changez '/job-application' par la route de votre page de candidature
    navigate(`/postuler?job=${jobData}`);
  };

  // Fonction pour sauvegarder l'emploi
  const handleSave = () => {
    try {
      // Sauvegarde dans le localStorage
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const isAlreadySaved = savedJobs.some(savedJob => savedJob._id === job._id);
      
      if (!isAlreadySaved) {
        const jobToSave = {
          ...job,
          savedAt: new Date().toISOString()
        };
        savedJobs.push(jobToSave);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        alert('Emploi sauvegardé avec succès !');
      } else {
        alert('Cet emploi est déjà dans vos favoris.');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde de l\'emploi.');
    }
  };

  // Vérifie si la description est longue au montage
  React.useEffect(() => {
    if (job.description && job.description.length > 150) {
      setIsDescriptionLong(true);
    }
  }, [job.description]);

  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-type">{job.type}</span>
      </div>
            
      <div className="job-company">
        <strong>{job.company}</strong>
      </div>
            
      <div className="job-location">
        📍 {job.location || 'Non spécifié'}
      </div>

      {/* Département */}
      {job.department && (
        <div className="job-department">
          🏢 {job.department}
        </div>
      )}

      {/* Niveau d'expérience */}
      {job.experience && (
        <div className="job-experience">
          📊 {job.experience}
        </div>
      )}
            
      <div className="job-salary">
        💰 {formatSalary(job.salary)}
      </div>
            
      <div className="job-description">
        {isDescriptionLong && !isExpanded 
           ? `${job.description.substring(0, 150)}...`
           : job.description}
      </div>
            
      {isDescriptionLong && (
        <button 
           onClick={() => setIsExpanded(!isExpanded)}
          className="read-more-btn"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}

      {/* Section des compétences */}
      {job.skills && job.skills.length > 0 && (
        <div className="job-skills">
          <strong>Compétences requises:</strong>
          <div className="skills-list">
            {job.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Section des exigences */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="job-requirements">
          <strong>Exigences:</strong>
          <div className="requirements-list">
            {job.requirements.map((req, index) => (
              <span key={index} className="requirement-tag">{req}</span>
            ))}
          </div>
        </div>
      )}

      {/* Section des avantages */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="job-benefits">
          <strong>Avantages:</strong>
          <div className="benefits-list">
            {job.benefits.map((benefit, index) => (
              <span key={index} className="benefit-tag">{benefit}</span>
            ))}
          </div>
        </div>
      )}
            
      <div className="job-actions">
        <button 
          className="btn btn-primary"
          onClick={handleApply}
        >
          Postuler
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default JobCard;
