// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/common/Navbar';
// import JobCard from '../components/jobs/JobCard';
// import JobFilters from '../components/jobs/JobFilters';
// import '../styles/pages/JobsPage.css';

// const JobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [filters, setFilters] = useState({
//     search: '',
//     location: '',
//     category: '',
//     type: '',
//     salary: ''
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulation de récupération des emplois
//     const fetchJobs = async () => {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const mockJobs = [
//         {
//           id: 1,
//           title: 'Développeur Full Stack',
//           company: 'TechCorp',
//           location: 'Paris',
//           type: 'CDI',
//           salary: '45000-55000 CFA',
//           category: 'tech',
//           description: 'Nous recherchons un développeur full stack expérimenté...',
//           requirements: ['React', 'Node.js', 'PostgreSQL'],
//           posted: '2024-01-15'
//         },
//         {
//           id: 2,
//           title: 'UX/UI Designer',
//           company: 'Design Studio',
//           location: 'Lyon',
//           type: 'CDI',
//           salary: '38000-45000 CFA',
//           category: 'design',
//           description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
//           requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
//           posted: '2024-01-14'
//         },
//         {
//           id: 3,
//           title: 'Chef de Projet Digital',
//           company: 'Digital Agency',
//           location: 'Marseille',
//           type: 'CDI',
//           salary: '42000-50000 CFA',
//           category: 'management',
//           description: 'Nous cherchons un chef de projet digital dynamique...',
//           requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
//           posted: '2024-01-13'
//         },
//         {
//       id: 4,
//       title: "Senior UX Designer",
//       company: "Google",
//       location: ('featuredJobs.remoteWork'),
//       type: 'stage',
//       salary: "$80k-$120k",
//       category: 'UX Designer',
//           description: 'Nous cherchons un responsable de projet digital dynamique...',
//           requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
//           posted: '2024-01-13'
//     },
//     {
//       id: 5,
//       title: "Software Engineer",
//       company: "Meta",
//       location: "San Francisco",
//       type: 'CDI',
//       salary: "$100k-$150k",
//       category: 'management',
//           description: 'Nous cherchons un chef de projet digital dynamique...',
//           requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
//           posted: '2024-01-13'
//     },
//     {
//       id: 6,
//       title: "Junior Graphic Designer",
//       company: "Adobe",
//       location: "New York",
//       type: 'freeland',
//       salary: "$50k-$70k",
//       category: 'management',
//           description: 'Nous cherchons un chef de projet digital dynamique...',
//           requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
//           posted: '2024-01-13'
//     },
//     {
//       id: 7,
//       title: "Product Designer",
//       company: "Apple",
//       location: "Cupertino",
//       type: 'freeland',
//       salary: "$90k-$130k",
//       category: 'tech',
//           description: 'Nous recherchons un développeur full stack expérimenté...',
//           requirements: ['React', 'Node.js', 'PostgreSQL'],
//           posted: '2024-01-15'
//     },
//     {
//       id: 8,
//       title: "Frontend Developer",
//       company: "Microsoft",
//       location: "Seattle",
//       type: 'CDI',
//       salary: "$85k-$125k",
//       category: 'design',
//           description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
//           requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
//           posted: '2024-01-14'
//     },
//     {
//       id: 9,
//       title: "Data Scientist",
//       company: "Netflix",
//       location: "Los Angeles",
//       type: 'stage',
//       salary: "$110k-$160k",
//      category: 'design',
//           description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
//           requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
//           posted: '2024-01-14'
      
//     }
//       ];
      
//       setJobs(mockJobs);
//       setFilteredJobs(mockJobs);
//       setLoading(false);
//     };

//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     // Filtrage des emplois
//     let filtered = jobs;

//     if (filters.search) {
//       filtered = filtered.filter(job => 
//         job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         job.company.toLowerCase().includes(filters.search.toLowerCase())
//       );
//     }

//     if (filters.location) {
//       filtered = filtered.filter(job => 
//         job.location.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     if (filters.category) {
//       filtered = filtered.filter(job => job.category === filters.category);
//     }

//     if (filters.type) {
//       filtered = filtered.filter(job => job.type === filters.type);
//     }

//     setFilteredJobs(filtered);
//   }, [filters, jobs]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="jobs-page">
//       <Navbar />
//       <div className="jobs-container">
//         <div className="jobs-header">
//           <h1>Emplois disponibles</h1>
//           <p>Trouvez l'emploi qui vous correspond</p>
//         </div>
        
//         <JobFilters filters={filters} onFilterChange={handleFilterChange} />
        
//         <div className="jobs-content">
//           {loading ? (
//             <div className="loading">Chargement des emplois...</div>
//           ) : (
//             <div className="jobs-grid">
//               {filteredJobs.map(job => (
//                 <JobCard key={job.id} job={job} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobsPage;

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import { useJobs } from '../contexts/JobsContext';
import '../styles/pages/JobsPage.css';

const JobsPage = () => {
  const {
    publicJobs,
    loading,
    error,
    fetchPublicJobs
  } = useJobs();
  
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    experience: '',
    department: '',
    type: '',
    company: '',
    salary: ''
  });

  // Charger tous les emplois une seule fois au début
  useEffect(() => {
    fetchPublicJobs();
  }, []);

  // Debug: afficher les données des emplois dans la console
  useEffect(() => {
    if (publicJobs.length > 0) {
      console.log('Premier emploi:', publicJobs[0]);
      console.log('Expériences trouvées:', [...new Set(publicJobs.map(job => job.experience).filter(Boolean))]);
      console.log('Départements trouvés:', [...new Set(publicJobs.map(job => job.department).filter(Boolean))]);
    }
  }, [publicJobs]);

  // Filtrage côté client
  const filteredJobs = useMemo(() => {
    return publicJobs.filter(job => {
      // Debug: log du job en cours de filtrage
      // console.log('Filtrage job:', job.title, 'Experience:', job.experience, 'Department:', job.department);

      // Filtrage par recherche textuelle
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchIn = [
          job.title || '',
          job.company || '',
          job.description || '',
          job.skills?.join(' ') || '',
          job.location || '',
          job.experience || '',
          job.department || ''
        ].join(' ').toLowerCase();
        
        if (!searchIn.includes(searchTerm)) {
          return false;
        }
      }

      // Filtrage par ville
      if (filters.location && job.location !== filters.location) {
        return false;
      }

      // Filtrage par expérience - CORRIGÉ
      if (filters.experience) {
        const jobExperience = job.experience || job.level || job.experienceLevel;
        if (!jobExperience || jobExperience !== filters.experience) {
          return false;
        }
      }

      // Filtrage par département - CORRIGÉ
      if (filters.department) {
        const jobDepartment = job.department || job.departmentName;
        if (!jobDepartment || jobDepartment !== filters.department) {
          return false;
        }
      }

      // Filtrage par type
      if (filters.type && job.type !== filters.type) {
        return false;
      }

      // Filtrage par entreprise
      if (filters.company && job.company !== filters.company) {
        return false;
      }

      return true;
    });
  }, [publicJobs, filters]);

  const handleFilterChange = (newFilters) => {
    console.log('Nouveaux filtres:', newFilters);
    setFilters(newFilters);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des emplois...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>Erreur: {error}</p>
          <button onClick={() => fetchPublicJobs()} className="btn btn-primary">
            Réessayer
          </button>
        </div>
      );
    }

    if (filteredJobs.length === 0 && publicJobs.length > 0) {
      return (
        <div className="empty-state">
          <h3>Aucune offre d'emploi ne correspond à vos critères</h3>
          <p>Essayez de modifier vos filtres de recherche.</p>
          {/* Debug info */}
          <small style={{color: '#666', marginTop: '10px', display: 'block'}}>
            Filtres actifs: {JSON.stringify(filters)}
          </small>
        </div>
      );
    }

    if (publicJobs.length === 0) {
      return (
        <div className="empty-state">
          <h3>Aucune offre d'emploi trouvée</h3>
          <p>Revenez plus tard pour voir les nouvelles offres.</p>
        </div>
      );
    }

    return (
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    );
  };

  return (
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-container">
        <div className="jobs-header">
          <h1>Emplois disponibles</h1>
          <p>
            Trouvez l'emploi qui vous correspond - {filteredJobs.length} offre(s) sur {publicJobs.length} total
          </p>
        </div>
        
        <JobFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          jobs={publicJobs}
        />
        
        <div className="jobs-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;






