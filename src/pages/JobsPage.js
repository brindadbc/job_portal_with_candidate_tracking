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
//           salary: '45000-55000',
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
//           salary: '38000-45000',
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
//           salary: '42000-50000',
//           category: 'management',
//           description: 'Nous cherchons un chef de projet digital dynamique...',
//           requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
//           posted: '2024-01-13'
//         }
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
