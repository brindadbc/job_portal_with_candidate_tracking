// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/common/Navbar';

// const CompanyPage = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulation de récupération des entreprises
//     const fetchCompanies = async () => {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const mockCompanies = [
//         {
//           id: 1,
//           name: 'TechCorp',
//           industry: 'Technologie',
//           location: 'Paris',
//           employees: '100-500',
//           description: 'Une entreprise innovante dans le domaine de la technologie...',
//           jobs: 12
//         },
//         {
//           id: 2,
//           name: 'Design Studio',
//           industry: 'Design',
//           location: 'Lyon',
//           employees: '10-50',
//           description: 'Studio de design créatif spécialisé dans l\'UX/UI...',
//           jobs: 5
//         },
//         {
//           id: 3,
//           name: 'Digital Agency',
//           industry: 'Marketing Digital',
//           location: 'Marseille',
//           employees: '50-100',
//           description: 'Agence digitale full-service pour les entreprises...',
//           jobs: 8
//         }
//       ];
      
//       setCompanies(mockCompanies);
//       setLoading(false);
//     };

//     fetchCompanies();
//   }, []);

//   return (
//     <div className="company-page">
//       <Navbar />
//       <div className="company-container">
//         <div className="company-header">
//           <h1>Entreprises partenaires</h1>
//           <p>Découvrez nos entreprises partenaires</p>
//         </div>
        
//         <div className="company-content">
//           {loading ? (
//             <div className="loading">Chargement des entreprises...</div>
//           ) : (
//             <div className="company-grid">
//               {companies.map(company => (
//                 <div key={company.id} className="company-card">
//                   <h3>{company.name}</h3>
//                   <p className="company-industry">{company.industry}</p>
//                   <p className="company-location">📍 {company.location}</p>
//                   <p className="company-employees">👥 {company.employees} employés</p>
//                   <p className="company-description">{company.description}</p>
//                   <div className="company-jobs">
//                     {company.jobs} emplois disponibles
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyPage;


