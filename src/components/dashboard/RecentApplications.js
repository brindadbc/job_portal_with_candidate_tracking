// import React from 'react';

// const RecentApplications = () => {
//   const applications = [
//     {
//       id: 1,
//       jobTitle: 'Développeur Full Stack',
//       company: 'TechCorp',
//       status: 'En cours',
//       date: '2024-01-15'
//     },
//     {
//       id: 2,
//       jobTitle: 'UX/UI Designer',
//       company: 'Design Studio',
//       status: 'Entretien',
//       date: '2024-01-14'
//     },
//     {
//       id: 3,
//       jobTitle: 'Chef de Projet',
//       company: 'Digital Agency',
//       status: 'Refusé',
//       date: '2024-01-13'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'En cours': return 'orange';
//       case 'Entretien': return 'blue';
//       case 'Accepté': return 'green';
//       case 'Refusé': return 'red';
//       default: return 'gray';
//     }
//   };

//   return (
//     <div className="recent-applications">
//       <h2>Candidatures récentes</h2>
//       <div className="applications-list">
//         {applications.map(app => (
//           <div key={app.id} className="application-item">
//             <div className="application-info">
//               <h4>{app.jobTitle}</h4>
//               <p>{app.company}</p>
//               <span className="application-date">{app.date}</span>
//             </div>
//             <div className={`application-status ${getStatusColor(app.status)}`}>
//               {app.status}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentApplications;
