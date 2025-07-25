// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { ChevronRight, MapPin, Clock, Users, Briefcase, Star, Eye, Heart } from 'lucide-react';

// const FeaturedJobsSection = () => {
//   const { t } = useTranslation();
//   const [visibleJobs, setVisibleJobs] = useState(4);
//   const [likedJobs, setLikedJobs] = useState(new Set());
//   const [viewedJobs, setViewedJobs] = useState(new Set());

//   // Données d'exemple des offres d'emploi
//   const featuredJobs = [
//     {
//       id: 1,
//       title: "Senior UX Designer",
//       company: "Google",
//       location: "Remote Work",
//       type: "Full Time",
//       salary: "$80k-$120k",
//       timePosted: "2 days remaining",
//       logo: "https://via.placeholder.com/60x60/4285f4/ffffff?text=G",
//       color: "bg-green-500",
//       featured: true,
//       tags: ["Design", "Remote", "Senior"]
//     },
//     {
//       id: 2,
//       title: "Software Engineer",
//       company: "Meta",
//       location: "San Francisco",
//       type: "Full Time",
//       salary: "$100k-$150k",
//       timePosted: "3 days remaining",
//       logo: "https://via.placeholder.com/60x60/1877f2/ffffff?text=M",
//       color: "bg-blue-600",
//       featured: true,
//       tags: ["Engineering", "JavaScript", "React"]
//     },
//     {
//       id: 3,
//       title: "Junior Graphic Designer",
//       company: "Adobe",
//       location: "New York",
//       type: "Part Time",
//       salary: "$50k-$70k",
//       timePosted: "5 days remaining",
//       logo: "https://via.placeholder.com/60x60/ff0000/ffffff?text=A",
//       color: "bg-red-500",
//       featured: false,
//       tags: ["Design", "Creative", "Junior"]
//     },
//     {
//       id: 4,
//       title: "Product Designer",
//       company: "Apple",
//       location: "Cupertino",
//       type: "Full Time",
//       salary: "$90k-$130k",
//       timePosted: "1 week remaining",
//       logo: "https://via.placeholder.com/60x60/000000/ffffff?text=A",
//       color: "bg-gray-800",
//       featured: false,
//       tags: ["Product", "Design", "iOS"]
//     },
//     {
//       id: 5,
//       title: "Frontend Developer",
//       company: "Microsoft",
//       location: "Seattle",
//       type: "Full Time",
//       salary: "$85k-$125k",
//       timePosted: "3 days remaining",
//       logo: "https://via.placeholder.com/60x60/0078d4/ffffff?text=M",
//       color: "bg-blue-500",
//       featured: true,
//       tags: ["Frontend", "React", "TypeScript"]
//     },
//     {
//       id: 6,
//       title: "Data Scientist",
//       company: "Netflix",
//       location: "Los Angeles",
//       type: "Full Time",
//       salary: "$110k-$160k",
//       timePosted: "2 days remaining",
//       logo: "https://via.placeholder.com/60x60/e50914/ffffff?text=N",
//       color: "bg-red-600",
//       featured: false,
//       tags: ["Data", "Python", "ML"]
//     }
//   ];

//   const handleLike = (jobId) => {
//     setLikedJobs(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(jobId)) {
//         newSet.delete(jobId);
//       } else {
//         newSet.add(jobId);
//       }
//       return newSet;
//     });
//   };

//   const handleView = (jobId) => {
//     setViewedJobs(prev => new Set(prev).add(jobId));
//   };

//   const loadMoreJobs = () => {
//     setVisibleJobs(prev => Math.min(prev + 2, featuredJobs.length));
//   };

//   const JobCard = ({ job, index }) => (
//     <div 
//       className={`job-card ${job.featured ? 'featured' : ''} ${viewedJobs.has(job.id) ? 'viewed' : ''}`}
//       style={{ 
//         animationDelay: `${index * 0.1}s`,
//         transform: `translateY(${index * 2}px)`
//       }}
//     >
//       {job.featured && (
//         <div className="featured-badge">
//           <Star className="w-3 h-3 mr-1" />
//           Featured
//         </div>
//       )}
      
//       <div className="job-card-header">
//         <div className="job-logo-container">
//           <div className={`job-logo ${job.color}`}>
//             <span className="text-white font-bold text-lg">
//               {job.company.charAt(0)}
//             </span>
//           </div>
//         </div>
        
//         <div className="job-actions">
//           <button 
//             className="action-btn view-btn"
//             onClick={() => handleView(job.id)}
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//           <button 
//             className={`action-btn like-btn ${likedJobs.has(job.id) ? 'liked' : ''}`}
//             onClick={() => handleLike(job.id)}
//           >
//             <Heart className={`w-4 h-4 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
//           </button>
//         </div>
//       </div>

//       <div className="job-content">
//         <h3 className="job-title">{job.title}</h3>
//         <p className="job-company">{job.company}</p>
        
//         <div className="job-details">
//           <div className="job-detail">
//             <MapPin className="w-4 h-4 text-gray-500" />
//             <span>{job.location}</span>
//           </div>
//           <div className="job-detail">
//             <Briefcase className="w-4 h-4 text-gray-500" />
//             <span>{job.type}</span>
//           </div>
//           <div className="job-detail">
//             <Clock className="w-4 h-4 text-gray-500" />
//             <span>{job.timePosted}</span>
//           </div>
//         </div>

//         <div className="job-tags">
//           {job.tags.map((tag, tagIndex) => (
//             <span key={tagIndex} className="job-tag">
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="job-footer">
//           <div className="job-salary">{job.salary}</div>
//           <button className="apply-btn">
//             Apply Now
//             <ChevronRight className="w-4 h-4 ml-1" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="featured-jobs-section">
//       <div className="container">
//         <div className="section-header">
//           <div className="section-title-container">
//             <h2 className="section-title">Featured Jobs</h2>
//             <div className="title-underline"></div>
//           </div>
//           <p className="section-subtitle">
//             Discover the best opportunities from top companies
//           </p>
//           <button className="view-all-btn">
//             View All Jobs
//             <ChevronRight className="w-4 h-4 ml-1" />
//           </button>
//         </div>

//         <div className="jobs-grid">
//           {featuredJobs.slice(0, visibleJobs).map((job, index) => (
//             <JobCard key={job.id} job={job} index={index} />
//           ))}
//         </div>

//         {visibleJobs < featuredJobs.length && (
//           <div className="load-more-container">
//             <button className="load-more-btn" onClick={loadMoreJobs}>
//               <Users className="w-4 h-4 mr-2" />
//               Load More Jobs
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .featured-jobs-section {
//           padding: 80px 0;
//           background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//           position: relative;
//           overflow: hidden;
//         }

//         .featured-jobs-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
//           pointer-events: none;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 20px;
//           position: relative;
//         }

//         .section-header {
//           text-align: center;
//           margin-bottom: 60px;
//           position: relative;
//         }

//         .section-title-container {
//           display: inline-block;
//           position: relative;
//           margin-bottom: 16px;
//         }

//         .section-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 8px;
//           background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .title-underline {
//           height: 4px;
//           background: linear-gradient(90deg, #3b82f6, #8b5cf6);
//           border-radius: 2px;
//           margin: 0 auto;
//           width: 80px;
//           animation: expandLine 1s ease-out;
//         }

//         @keyframes expandLine {
//           from { width: 0; }
//           to { width: 80px; }
//         }

//         .section-subtitle {
//           font-size: 1.125rem;
//           color: #64748b;
//           margin-bottom: 32px;
//           max-width: 600px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .view-all-btn {
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 12px;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
//         }

//         .view-all-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
//         }

//         .jobs-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//           gap: 24px;
//           margin-bottom: 48px;
//         }

//         .job-card {
//           background: white;
//           border-radius: 20px;
//           padding: 24px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           position: relative;
//           overflow: hidden;
//           opacity: 0;
//           animation: slideInUp 0.6s ease forwards;
//           border: 1px solid #e2e8f0;
//         }

//         .job-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
//         }

//         .job-card.featured {
//           border: 2px solid #3b82f6;
//           box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
//         }

//         .job-card.viewed {
//           opacity: 0.8;
//         }

//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .featured-badge {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
//           color: white;
//           padding: 4px 8px;
//           border-radius: 8px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           z-index: 2;
//         }

//         .job-card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 16px;
//         }

//         .job-logo-container {
//           position: relative;
//         }

//         .job-logo {
//           width: 60px;
//           height: 60px;
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease;
//         }

//         .job-card:hover .job-logo {
//           transform: scale(1.05);
//         }

//         .job-actions {
//           display: flex;
//           gap: 8px;
//         }

//         .action-btn {
//           width: 36px;
//           height: 36px;
//           border: none;
//           background: #f1f5f9;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           color: #64748b;
//         }

//         .action-btn:hover {
//           background: #e2e8f0;
//           transform: scale(1.05);
//         }

//         .like-btn.liked {
//           background: #fee2e2;
//           color: #dc2626;
//         }

//         .view-btn:hover {
//           background: #dbeafe;
//           color: #3b82f6;
//         }

//         .job-content {
//           flex: 1;
//         }

//         .job-title {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 4px;
//           line-height: 1.3;
//         }

//         .job-company {
//           color: #64748b;
//           font-weight: 500;
//           margin-bottom: 16px;
//         }

//         .job-details {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           margin-bottom: 16px;
//         }

//         .job-detail {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #64748b;
//           font-size: 0.875rem;
//         }

//         .job-tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//           margin-bottom: 20px;
//         }

//         .job-tag {
//           background: #f1f5f9;
//           color: #475569;
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 0.75rem;
//           font-weight: 500;
//           transition: all 0.3s ease;
//         }

//         .job-tag:hover {
//           background: #e2e8f0;
//           transform: translateY(-1px);
//         }

//         .job-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 20px;
//           padding-top: 20px;
//           border-top: 1px solid #e2e8f0;
//         }

//         .job-salary {
//           font-weight: 700;
//           color: #059669;
//           font-size: 1.125rem;
//         }

//         .apply-btn {
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 12px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
//         }

//         .apply-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
//         }

//         .load-more-container {
//           text-align: center;
//           margin-top: 48px;
//         }

//         .load-more-btn {
//           background: white;
//           border: 2px solid #3b82f6;
//           color: #3b82f6;
//           padding: 12px 32px;
//           border-radius: 12px;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .load-more-btn:hover {
//           background: #3b82f6;
//           color: white;
//           transform: translateY(-2px);
//         }

//         @media (max-width: 768px) {
//           .jobs-grid {
//             grid-template-columns: 1fr;
//             gap: 16px;
//           }
          
//           .section-title {
//             font-size: 2rem;
//           }
          
//           .job-card {
//             padding: 20px;
//           }
          
//           .job-details {
//             flex-direction: column;
//           }
          
//           .job-footer {
//             flex-direction: column;
//             gap: 12px;
//             align-items: stretch;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedJobsSection;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, MapPin, Clock, Users, Briefcase, Star, Eye, Heart, Bookmark, Share2, X, ArrowLeft, ExternalLink } from 'lucide-react';

const FeaturedJobsSection = () => {
  const [visibleJobs, setVisibleJobs] = useState(4);
    const navigate = useNavigate();
  const [likedJobs, setLikedJobs] = useState(new Set());
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [viewedJobs, setViewedJobs] = useState(new Set());
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Mock translation function
 
  const t = (key, options = {}) => {
    const translations = {
      'featuredJobs.title': 'Emplois en Vedette',
      'featuredJobs.subtitle': 'Découvrez les meilleures opportunités des entreprises de premier plan',
      'featuredJobs.viewAllJobs': 'Voir Tous les Emplois',
      'featuredJobs.loadMoreJobs': 'Charger Plus d\'Emplois',
      'featuredJobs.applyNow': 'Postuler Maintenant',
      'featuredJobs.featured': 'En Vedette',
      'featuredJobs.urgent': 'Urgent',
      'featuredJobs.remoteWork': 'Travail à Distance',
      'featuredJobs.fullTime': 'Temps Plein',
      'featuredJobs.partTime': 'Temps Partiel',
      'featuredJobs.daysRemaining': `${options.count} jours restants`,
      'featuredJobs.weekRemaining': `${options.count} semaine restante`,
      'featuredJobs.actions.view': 'Voir',
      'featuredJobs.actions.save': 'Sauvegarder',
      'featuredJobs.actions.like': 'Aimer',
      'featuredJobs.tags.design': 'Design',
      'featuredJobs.tags.remote': 'Remote',
      'featuredJobs.tags.senior': 'Senior',
      'featuredJobs.tags.engineering': 'Ingénierie',
      'featuredJobs.tags.javascript': 'JavaScript',
      'featuredJobs.tags.react': 'React',
      'featuredJobs.tags.creative': 'Créatif',
      'featuredJobs.tags.junior': 'Junior',
      'featuredJobs.tags.product': 'Produit',
      'featuredJobs.tags.ios': 'iOS',
      'featuredJobs.tags.frontend': 'Frontend',
      'featuredJobs.tags.typescript': 'TypeScript',
      'featuredJobs.tags.data': 'Data',
      'featuredJobs.tags.python': 'Python',
      'featuredJobs.tags.ml': 'ML'
    };
    return translations[key] || key;
  };

  // Données d'exemple des offres d'emploi étendues
  const featuredJobs = [
    {
      id: 1,
      title: "Senior UX Designer",
      company: "Google",
      location: t('featuredJobs.remoteWork'),
      type: t('featuredJobs.fullTime'),
      salary: "$80k-$120k",
      timePosted: t('featuredJobs.daysRemaining', { count: 2 }),
      logo: "https://via.placeholder.com/60x60/4285f4/ffffff?text=G",
      color: "bg-green-500",
      featured: true,
      urgent: false,
      tags: [t('featuredJobs.tags.design'), t('featuredJobs.tags.remote'), t('featuredJobs.tags.senior')],
      description: "Nous recherchons un UX Designer senior pour rejoindre notre équipe produit. Vous travaillerez sur des projets innovants et aurez l'opportunité de façonner l'expérience utilisateur de millions d'utilisateurs.",
      requirements: ["5+ ans d'expérience en UX Design", "Maîtrise de Figma et Adobe Suite", "Expérience en design thinking", "Portfolio solide requis"],
      benefits: ["Assurance santé complète", "Travail flexible", "Formation continue", "Stock options"]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Meta",
      location: "San Francisco",
      type: t('featuredJobs.fullTime'),
      salary: "$100k-$150k",
      timePosted: t('featuredJobs.daysRemaining', { count: 3 }),
      logo: "https://via.placeholder.com/60x60/1877f2/ffffff?text=M",
      color: "bg-blue-600",
      featured: true,
      urgent: true,
      tags: [t('featuredJobs.tags.engineering'), t('featuredJobs.tags.javascript'), t('featuredJobs.tags.react')],
      description: "Rejoignez notre équipe d'ingénieurs pour développer des applications révolutionnaires. Vous travaillerez sur des technologies de pointe dans un environnement collaboratif.",
      requirements: ["Diplôme en informatique", "3+ ans d'expérience en développement", "Maîtrise de React et Node.js", "Expérience avec les bases de données"],
      benefits: ["Salaire compétitif", "Bonus annuel", "Équipement fourni", "Congés illimités"]
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      company: "Adobe",
      location: "New York",
      type: t('featuredJobs.partTime'),
      salary: "$50k-$70k",
      timePosted: t('featuredJobs.daysRemaining', { count: 5 }),
      logo: "https://via.placeholder.com/60x60/ff0000/ffffff?text=A",
      color: "bg-red-500",
      featured: false,
      urgent: false,
      tags: [t('featuredJobs.tags.design'), t('featuredJobs.tags.creative'), t('featuredJobs.tags.junior')],
      description: "Opportunité parfaite pour débuter votre carrière en design graphique dans une entreprise leader du secteur créatif.",
      requirements: ["Diplôme en design graphique", "Maîtrise de la Creative Suite", "Portfolio créatif", "Passion pour le design"],
      benefits: ["Mentorat senior", "Formation Adobe", "Environnement créatif", "Croissance rapide"]
    },
    {
      id: 4,
      title: "Product Designer",
      company: "Apple",
      location: "Cupertino",
      type: t('featuredJobs.fullTime'),
      salary: "$90k-$130k",
      timePosted: t('featuredJobs.weekRemaining', { count: 1 }),
      logo: "https://via.placeholder.com/60x60/000000/ffffff?text=A",
      color: "bg-gray-800",
      featured: false,
      urgent: false,
      tags: [t('featuredJobs.tags.product'), t('featuredJobs.tags.design'), t('featuredJobs.tags.ios')],
      description: "Concevez l'avenir des produits Apple en créant des expériences utilisateur exceptionnelles pour des millions d'utilisateurs.",
      requirements: ["Master en Design", "5+ ans en product design", "Expérience mobile/iOS", "Vision produit forte"],
      benefits: ["Produits Apple gratuits", "Assurance premium", "Retraite généreuse", "Campus innovant"]
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Seattle",
      type: t('featuredJobs.fullTime'),
      salary: "$85k-$125k",
      timePosted: t('featuredJobs.daysRemaining', { count: 3 }),
      logo: "https://via.placeholder.com/60x60/0078d4/ffffff?text=M",
      color: "bg-blue-500",
      featured: true,
      urgent: false,
      tags: [t('featuredJobs.tags.frontend'), t('featuredJobs.tags.react'), t('featuredJobs.tags.typescript')],
      description: "Développez des interfaces utilisateur modernes et performantes pour nos applications web utilisées par des millions d'utilisateurs.",
      requirements: ["3+ ans en développement frontend", "Expert React/TypeScript", "Expérience Azure", "Tests automatisés"],
      benefits: ["Technologies cutting-edge", "Formation continue", "Équipe internationale", "Impact global"]
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Angeles",
      type: t('featuredJobs.fullTime'),
      salary: "$110k-$160k",
      timePosted: t('featuredJobs.daysRemaining', { count: 2 }),
      logo: "https://via.placeholder.com/60x60/e50914/ffffff?text=N",
      color: "bg-red-600",
      featured: false,
      urgent: true,
      tags: [t('featuredJobs.tags.data'), t('featuredJobs.tags.python'), t('featuredJobs.tags.ml')],
      description: "Utilisez les données pour améliorer l'expérience de nos 200+ millions d'abonnés à travers des recommandations personnalisées.",
      requirements: ["PhD/Master en Data Science", "Expert Python/R", "Machine Learning avancé", "Big Data (Spark, Hadoop)"],
      benefits: ["Données Netflix", "Recherche de pointe", "Conférences payées", "Culture data-driven"]
    },
    // Jobs supplémentaires pour la vue "Tous les emplois"
    {
      id: 7,
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Remote",
      type: "Full Time",
      salary: "$95k-$140k",
      timePosted: "4 jours restants",
      logo: "https://via.placeholder.com/60x60/ff9900/ffffff?text=A",
      color: "bg-orange-500",
      featured: false,
      urgent: false,
      tags: ["DevOps", "AWS", "Docker"],
      description: "Automatisez et optimisez nos infrastructures cloud pour supporter notre croissance mondiale.",
      requirements: ["5+ ans DevOps", "Expert AWS", "Docker/Kubernetes", "CI/CD pipelines"],
      benefits: ["AWS credits", "Télétravail", "Stock options", "Formation certifiée"]
    },
    {
      id: 8,
      title: "Mobile Developer",
      company: "Spotify",
      location: "Stockholm",
      type: "Full Time",
      salary: "$75k-$110k",
      timePosted: "1 semaine restante",
      logo: "https://via.placeholder.com/60x60/1db954/ffffff?text=S",
      color: "bg-green-600",
      featured: false,
      urgent: false,
      tags: ["Mobile", "iOS", "Android"],
      description: "Développez l'application mobile utilisée par 400+ millions d'utilisateurs pour écouter leur musique préférée.",
      requirements: ["3+ ans développement mobile", "Swift/Kotlin", "API REST", "Expérience audio"],
      benefits: ["Spotify Premium", "Équipe internationale", "Hackathons", "Musique illimitée"]
    }
  ];

  const handleLike = (jobId) => {
    setLikedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleSave = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleView = (jobId) => {
    setViewedJobs(prev => new Set(prev).add(jobId));
    const job = featuredJobs.find(j => j.id === jobId);
    setSelectedJob(job);
  };
  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleViewAllJobs = () => {
    setShowAllJobs(true);
    setVisibleJobs(featuredJobs.length);
  };

  const handleBackToFeatured = () => {
    setShowAllJobs(false);
    setVisibleJobs(4);
    setSelectedJob(null);
  };

  const loadMoreJobs = () => {
    setVisibleJobs(prev => Math.min(prev + 2, featuredJobs.length));
  };

  const submitApplication = (formData) => {
    // Simulation de soumission
    alert(`Candidature soumise pour ${selectedJob.title} chez ${selectedJob.company}!\n\nDétails:\n- Nom: ${formData.name}\n- Email: ${formData.email}\n- Téléphone: ${formData.phone}\n\nVous recevrez une confirmation par email.`);
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  const JobCard = ({ job, index }) => (
    <div 
      className={`job-card ${job.featured ? 'featured' : ''} ${viewedJobs.has(job.id) ? 'viewed' : ''}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: `translateY(${index * 2}px)`
      }}
    >
      {job.featured && (
        <div className="featured-badge">
          <Star className="w-3 h-3 mr-1" />
          {t('featuredJobs.featured')}
        </div>
      )}
      
      {job.urgent && (
        <div className="urgent-badge">
          <Clock className="w-3 h-3 mr-1" />
          {t('featuredJobs.urgent')}
        </div>
      )}
      
      <div className="job-card-header">
        <div className="job-logo-container">
          <div className={`job-logo ${job.color}`}>
            <span className="text-white font-bold text-lg">
              {job.company.charAt(0)}
            </span>
          </div>
        </div>
        
        <div className="job-actions">
          <button 
            className="action-btn view-btn"
            onClick={() => handleView(job.id)}
            title={t('featuredJobs.actions.view')}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            className={`action-btn save-btn ${savedJobs.has(job.id) ? 'saved' : ''}`}
            onClick={() => handleSave(job.id)}
            title={t('featuredJobs.actions.save')}
          >
            <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            className={`action-btn like-btn ${likedJobs.has(job.id) ? 'liked' : ''}`}
            onClick={() => handleLike(job.id)}
            title={t('featuredJobs.actions.like')}
          >
            <Heart className={`w-4 h-4 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="job-content">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
        
        <div className="job-details">
          <div className="job-detail">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{job.location}</span>
          </div>
          <div className="job-detail">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span>{job.type}</span>
          </div>
          <div className="job-detail">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{job.timePosted}</span>
          </div>
        </div>

        <div className="job-tags">
          {job.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="job-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="job-footer">
          <div className="job-salary">{job.salary}</div>
          <button className="apply-btn" onClick={() => handleApply(job)}>
            {t('featuredJobs.applyNow')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const JobDetailModal = ({ job, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="job-header-detail">
            <div className={`job-logo-large ${job.color}`}>
              <span className="text-white font-bold text-2xl">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="job-info-detail">
              <h2 className="job-title-large">{job.title}</h2>
              <p className="job-company-large">{job.company}</p>
              <div className="job-meta-detail">
                <span className="meta-item">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="meta-item">
                  <Briefcase className="w-4 h-4" />
                  {job.type}
                </span>
                <span className="meta-item">
                  <Clock className="w-4 h-4" />
                  {job.timePosted}
                </span>
              </div>
            </div>
            <div className="job-salary-large">{job.salary}</div>
          </div>

          <div className="job-description-section">
            <h3>Description du poste</h3>
            <p>{job.description}</p>
          </div>

          <div className="job-requirements-section">
            <h3>Exigences</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="job-benefits-section">
            <h3>Avantages</h3>
            <ul>
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="modal-actions">
            <button className="apply-btn-large" onClick={() => handleApply(job)}>
              Postuler à ce poste
              <ExternalLink className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationModal = ({ job, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name && formData.email) {
        onSubmit(formData);
      } else {
        alert('Veuillez remplir tous les champs obligatoires.');
      }
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="application-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Postuler pour {job.title}</h2>
            <button className="close-btn" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label>Nom complet *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                required
              />
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
              />
            </div>

            <div className="form-group">
              <label>Lettre de motivation</label>
              <label>CV (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData(prev => ({...prev, resume: e.target.files[0]}))}
              />
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({...prev, coverLetter: e.target.value}))}
                rows={4}
                placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
              />
            </div>

            <div className="form-group">
              <label>CV (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData(prev => ({...prev, resume: e.target.files[0]}))}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="submit-btn">
                Envoyer ma candidature
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <section className="featured-jobs-section">
      <div className="container">
        {showAllJobs && (
          <button className="back-btn" onClick={handleBackToFeatured}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux emplois en vedette
          </button>
        )}

        <div className="section-header">
          <div className="section-title-container">
            <h2 className="section-title">
              {showAllJobs ? 'Tous les Emplois' : t('featuredJobs.title')}
            </h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle">
            {showAllJobs 
              ? `${featuredJobs.length} opportunités disponibles`
              : t('featuredJobs.subtitle')
            }
          </p>
          {!showAllJobs && (
            <button className="view-all-btn" onClick={() => handleNavigation('/jobs')}>
              {t('featuredJobs.viewAllJobs')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        <div className="jobs-grid">
          {featuredJobs.slice(0, visibleJobs).map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {!showAllJobs && visibleJobs < featuredJobs.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMoreJobs}>
              <Users className="w-4 h-4 mr-2" />
              {t('featuredJobs.loadMoreJobs')}
            </button>
          </div>
        )}
      </div>

      {selectedJob && !showApplicationModal && (
        <JobDetailModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

      {showApplicationModal && selectedJob && (
        <ApplicationModal 
          job={selectedJob}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedJob(null);
          }}
          onSubmit={submitApplication}
        />
      )}

      <style jsx>{`
        .featured-jobs-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
          overflow: hidden;
        }

        .featured-jobs-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .section-title-container {
          display: inline-block;
          position: relative;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-underline {
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          margin: 0 auto;
          width: 80px;
          animation: expandLine 1s ease-out;
        }

        @keyframes expandLine {
          from { width: 0; }
          to { width: 80px; }
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .view-all-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .view-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .job-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: slideInUp 0.6s ease forwards;
          border: 1px solid #e2e8f0;
        }

        .job-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .job-card.featured {
          border: 2px solid #3b82f6;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }

        .job-card.viewed {
          opacity: 0.8;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          z-index: 2;
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .job-logo-container {
          position: relative;
        }

        .job-logo {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .job-card:hover .job-logo {
          transform: scale(1.05);
        }

        .job-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #64748b;
        }

        .action-btn:hover {
          background: #e2e8f0;
          transform: scale(1.05);
        }

        .like-btn.liked {
          background: #fee2e2;
          color: #dc2626;
        }

        .view-btn:hover {
          background: #dbeafe;
          color: #3b82f6;
        }

        .job-content {
          flex: 1;
        }

        .job-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .job-company {
          color: #64748b;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .job-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .job-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.875rem;
        }

        .job-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .job-tag {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .job-tag:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .job-salary {
          font-weight: 700;
          color: #059669;
          font-size: 1.125rem;
        }

        .apply-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .load-more-container {
          text-align: center;
          margin-top: 48px;
        }

        .load-more-btn {
          background: white;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          padding: 12px 32px;
          border-radius: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .load-more-btn:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .jobs-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .job-card {
            padding: 20px;
          }
          
          .job-details {
            flex-direction: column;
          }
          
          .job-footer {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedJobsSection;