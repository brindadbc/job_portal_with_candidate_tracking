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
import { useTranslation } from 'react-i18next';
import { ChevronRight, MapPin, Clock, Users, Briefcase, Star, Eye, Heart, Bookmark, Share2 } from 'lucide-react';

const FeaturedJobsSection = () => {
  const { t } = useTranslation();
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [likedJobs, setLikedJobs] = useState(new Set());
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [viewedJobs, setViewedJobs] = useState(new Set());

  // Données d'exemple des offres d'emploi
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
      tags: [t('featuredJobs.tags.design'), t('featuredJobs.tags.remote'), t('featuredJobs.tags.senior')]
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
      tags: [t('featuredJobs.tags.engineering'), t('featuredJobs.tags.javascript'), t('featuredJobs.tags.react')]
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
      tags: [t('featuredJobs.tags.design'), t('featuredJobs.tags.creative'), t('featuredJobs.tags.junior')]
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
      tags: [t('featuredJobs.tags.product'), t('featuredJobs.tags.design'), t('featuredJobs.tags.ios')]
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
      tags: [t('featuredJobs.tags.frontend'), t('featuredJobs.tags.react'), t('featuredJobs.tags.typescript')]
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
      tags: [t('featuredJobs.tags.data'), t('featuredJobs.tags.python'), t('featuredJobs.tags.ml')]
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
  };

  const loadMoreJobs = () => {
    setVisibleJobs(prev => Math.min(prev + 2, featuredJobs.length));
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
          <button className="apply-btn">
            {t('featuredJobs.applyNow')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="featured-jobs-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-container">
            <h2 className="section-title">{t('featuredJobs.title')}</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle">
            {t('featuredJobs.subtitle')}
          </p>
          <button className="view-all-btn">
            {t('featuredJobs.viewAllJobs')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="jobs-grid">
          {featuredJobs.slice(0, visibleJobs).map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {visibleJobs < featuredJobs.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMoreJobs}>
              <Users className="w-4 h-4 mr-2" />
              {t('featuredJobs.loadMoreJobs')}
            </button>
          </div>
        )}
      </div>

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