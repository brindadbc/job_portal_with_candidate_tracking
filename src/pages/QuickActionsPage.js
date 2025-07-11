// import React from 'react';
// import { Link } from 'react-router-dom';

// const QuickActions = () => {
//   const actions = [
//     {
//       title: 'Parcourir les emplois',
//       description: 'Découvrez de nouvelles opportunités',
//       link: '/jobs',
//       icon: '🔍',
//       color: 'blue'
//     },
//     {
//       title: 'Mettre à jour mon profil',
//       description: 'Gardez vos informations à jour',
//       link: '/profile',
//       icon: '👤',
//       color: 'green'
//     },
//     {
//       title: 'Voir les entreprises',
//       description: 'Explorez nos partenaires',
//       link: '/company',
//       icon: '🏢',
//       color: 'purple'
//     }
//   ];

//   return (
//     <div className="quick-actions">
//       <h2>Actions rapides</h2>
//       <div className="actions-grid">
//         {actions.map((action, index) => (
//           <Link key={index} to={action.link} className={`action-card ${action.color}`}>
//             <div className="action-icon">{action.icon}</div>
//             <div className="action-info">
//               <h4>{action.title}</h4>
//               <p>{action.description}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuickActions;
