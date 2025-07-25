// import React, { useState, useEffect } from 'react';
// import '../styles/pages/candidateDashboard.css';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   Filter,
//   ArrowUp,
//   ArrowDown,
//   Users,
//   Building,
//   Award,
//   Activity,
//   BarChart3,
//   Upload,
//   Plus,
//   Star,
//   Heart
// } from 'lucide-react';

// const RecruiterDashboard = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('6m');
//   const [animatedStats, setAnimatedStats] = useState({});

//   // Animation des statistiques
//   useEffect(() => {
//     const animateValue = (start, end, duration, key) => {
//       const range = end - start;
//       const increment = range / (duration / 16);
//       let current = start;
      
//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= end) {
//           current = end;
//           clearInterval(timer);
//         }
//         setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
//       }, 16);
//     };

//     animateValue(0, 45, 1000, 'activeJobs');
//     animateValue(0, 234, 1000, 'applications');
//     animateValue(0, 67, 1000, 'candidates');
//     animateValue(0, 12, 1000, 'hired');
//   }, []);

//   const recruiterStats = [
//     { 
//       id: 'activeJobs', 
//       label: 'Offres actives', 
//       value: animatedStats.activeJobs || 0, 
//       change: '+15%',
//       trend: 'up',
//       icon: Briefcase,
//       color: 'bg-blue-500'
//     },
//     { 
//       id: 'applications', 
//       label: 'Candidatures', 
//       value: animatedStats.applications || 0, 
//       change: '+28%',
//       trend: 'up',
//       icon: FileText,
//       color: 'bg-green-500'
//     },
//     { 
//       id: 'candidates', 
//       label: 'Candidats', 
//       value: animatedStats.candidates || 0, 
//       change: '+18%',
//       trend: 'up',
//       icon: Users,
//       color: 'bg-purple-500'
//     },
//     { 
//       id: 'hired', 
//       label: 'Recrutés', 
//       value: animatedStats.hired || 0, 
//       change: '+40%',
//       trend: 'up',
//       icon: Award,
//       color: 'bg-orange-500'
//     }
//   ];

//   const recentJobPostings = [
//     { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Actif', date: '2024-01-15', location: 'Paris' },
//     { id: 2, title: 'UX Designer', applicants: 23, status: 'Actif', date: '2024-01-12', location: 'Remote' },
//     { id: 3, title: 'Product Manager', applicants: 67, status: 'Fermé', date: '2024-01-10', location: 'Lyon' },
//     { id: 4, title: 'DevOps Engineer', applicants: 34, status: 'Actif', date: '2024-01-08', location: 'Marseille' }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Actif': return 'bg-blue-100 text-blue-800';
//       case 'Fermé': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const StatCard = ({ stat, index }) => (
//     <div 
//       className="stat-card group"
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className="stat-icon-container">
//         <div className={`stat-icon ${stat.color}`}>
//           <stat.icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//       <div className="stat-content">
//         <div className="stat-value">{stat.value}</div>
//         <div className="stat-label">{stat.label}</div>
//         <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
//           {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
//           {stat.change}
//         </div>
//       </div>
//     </div>
//   );

//   const Sidebar = () => (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <div className="logo-icon">JT</div>
//           <span className="logo-text">JobTracks</span>
//         </div>
//       </div>
      
//       <div className="sidebar-nav">
//         <div className="nav-section">
//           <div className="nav-item active">
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="nav-item">
//             <Building className="w-5 h-5" />
//             <span>Profil entreprise</span>
//           </div>
//           <div className="nav-item">
//             <Briefcase className="w-5 h-5" />
//             <span>Mes offres</span>
//           </div>
//           <div className="nav-item">
//             <Users className="w-5 h-5" />
//             <span>Candidats</span>
//           </div>
//           <div className="nav-item">
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//             <span className="nav-badge">5</span>
//           </div>
//           <div className="nav-item">
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//           </div>
//         </div>
        
//         <div className="nav-section">
//           <div className="nav-item">
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="nav-item">
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="dashboard">
//       <Sidebar />
      
//       <div className="main-content">
//         <div className="top-bar">
//           <div className="breadcrumb">
//             <span className="breadcrumb-item">Accueil</span>
//             <span className="breadcrumb-separator">/</span>
//             <span className="breadcrumb-item active">Tableau de bord Recruteur</span>
//           </div>
          
//           <div className="top-actions">
//             <div className="search-box">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher..."
//                 className="search-input"
//               />
//             </div>
            
//             <button className="notification-btn">
//               <Bell className="w-5 h-5" />
//               <span className="notification-dot"></span>
//             </button>
            
//             <div className="user-avatar">
//               <img src="https://via.placeholder.com/32x32" alt="Avatar" />
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-content">
//           <div className="dashboard-header">
//             <div>
//               <h1 className="dashboard-title">Tableau de bord Recruteur</h1>
//               <p className="dashboard-subtitle">Gérez vos offres et candidatures</p>
//             </div>
//             <div className="header-actions">
//               <button className="btn-secondary">
//                 <Upload className="w-4 h-4 mr-2" />
//                 Importer candidats
//               </button>
//               <button className="btn-primary">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Publier une offre
//               </button>
//             </div>
//           </div>

//           <div className="stats-grid">
//             {recruiterStats.map((stat, index) => (
//               <StatCard key={stat.id} stat={stat} index={index} />
//             ))}
//           </div>

//           <div className="dashboard-grid">
//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Offres d'emploi</h3>
//                 <button className="btn-icon">
//                   <Filter className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="jobs-list">
//                 {recentJobPostings.map((job) => (
//                   <div key={job.id} className="job-item">
//                     <div className="job-info">
//                       <div className="job-title">{job.title}</div>
//                       <div className="job-meta">
//                         <span className="job-location">{job.location}</span>
//                         <span className="job-date">{job.date}</span>
//                       </div>
//                     </div>
//                     <div className="job-stats">
//                       <div className="job-applicants">
//                         <Users className="w-4 h-4" />
//                         {job.applicants} candidatures
//                       </div>
//                       <span className={`status-badge ${getStatusColor(job.status)}`}>
//                         {job.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Candidatures par mois</h3>
//                 <select 
//                   className="period-select"
//                   value={selectedPeriod}
//                   onChange={(e) => setSelectedPeriod(e.target.value)}
//                 >
//                   <option value="6m">6 mois</option>
//                   <option value="1y">1 an</option>
//                   <option value="2y">2 ans</option>
//                 </select>
//               </div>
//               <div className="chart-container">
//                 <div className="chart-placeholder">
//                   <Activity className="w-12 h-12 text-gray-400" />
//                   <p className="chart-text">Graphique des candidatures</p>
//                 </div>
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Candidats à examiner</h3>
//                 <button className="btn-text">Voir tout</button>
//               </div>
//               <div className="candidates-list">
//                 <div className="candidate-item">
//                   <div className="candidate-avatar">
//                     <img src="https://via.placeholder.com/40x40" alt="Candidat" />
//                   </div>
//                   <div className="candidate-info">
//                     <div className="candidate-name">Marie Dubois</div>
//                     <div className="candidate-position">Senior React Developer</div>
//                     <div className="candidate-match">
//                       <Star className="w-3 h-3 text-yellow-500" />
//                       95% match
//                     </div>
//                   </div>
//                   <div className="candidate-actions">
//                     <button className="btn-primary-sm">Examiner</button>
//                     <button className="btn-icon">
//                       <Heart className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="candidate-item">
//                   <div className="candidate-avatar">
//                     <img src="https://via.placeholder.com/40x40" alt="Candidat" />
//                   </div>
//                   <div className="candidate-info">
//                     <div className="candidate-name">Jean Martin</div>
//                     <div className="candidate-position">UX Designer</div>
//                     <div className="candidate-match">
//                       <Star className="w-3 h-3 text-yellow-500" />
//                       89% match
//                     </div>
//                   </div>
//                   <div className="candidate-actions">
//                     <button className="btn-primary-sm">Examiner</button>
//                     <button className="btn-icon">
//                       <Heart className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Performance des offres</h3>
//               </div>
//               <div className="performance-list">
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Taux de conversion</div>
//                     <div className="metric-value">12.5%</div>
//                   </div>
//                   <div className="performance-change positive">
//                     <ArrowUp className="w-3 h-3" />
//                     +2.3%
//                   </div>
//                 </div>
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Temps de recrutement</div>
//                     <div className="metric-value">23 jours</div>
//                   </div>
//                   <div className="performance-change negative">
//                     <ArrowDown className="w-3 h-3" />
//                     -1.5 jours
//                   </div>
//                 </div>
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Satisfaction candidats</div>
//                     <div className="metric-value">4.8/5</div>
//                   </div>
//                   <div className="performance-change positive">
//                     <ArrowUp className="w-3 h-3" />
//                     +0.2
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/pages/candidateDashboard.css';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   Filter,
//   ArrowUp,
//   ArrowDown,
//   Users,
//   Building,
//   Award,
//   Activity,
//   BarChart3,
//   Upload,
//   Plus,
//   Star,
//   Heart,
//   Eye,
//   Edit,
//   Trash2,
//   MapPin,
//   Calendar,
//   Clock
// } from 'lucide-react';
// import Navbar from '../components/common/Navbar';

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();
//   const [selectedPeriod, setSelectedPeriod] = useState('6m');
//   const [animatedStats, setAnimatedStats] = useState({});
//   const [likedCandidates, setLikedCandidates] = useState(new Set());
//   const [notifications, setNotifications] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Animation des statistiques
//   useEffect(() => {
//     const animateValue = (start, end, duration, key) => {
//       const range = end - start;
//       const increment = range / (duration / 16);
//       let current = start;
      
//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= end) {
//           current = end;
//           clearInterval(timer);
//         }
//         setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
//       }, 16);
//     };

//     animateValue(0, 45, 1000, 'activeJobs');
//     animateValue(0, 234, 1000, 'applications');
//     animateValue(0, 67, 1000, 'candidates');
//     animateValue(0, 12, 1000, 'hired');
//   }, []);

//   const recruiterStats = [
//     { 
//       id: 'activeJobs', 
//       label: 'Offres actives', 
//       value: animatedStats.activeJobs || 0, 
//       change: '+15%',
//       trend: 'up',
//       icon: Briefcase,
//       color: 'bg-blue-500'
//     },
//     { 
//       id: 'applications', 
//       label: 'Candidatures', 
//       value: animatedStats.applications || 0, 
//       change: '+28%',
//       trend: 'up',
//       icon: FileText,
//       color: 'bg-green-500'
//     },
//     { 
//       id: 'candidates', 
//       label: 'Candidats', 
//       value: animatedStats.candidates || 0, 
//       change: '+18%',
//       trend: 'up',
//       icon: Users,
//       color: 'bg-purple-500'
//     },
//     { 
//       id: 'hired', 
//       label: 'Recrutés', 
//       value: animatedStats.hired || 0, 
//       change: '+40%',
//       trend: 'up',
//       icon: Award,
//       color: 'bg-orange-500'
//     }
//   ];

//   const [recentJobPostings, setRecentJobPostings] = useState([
//     { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Actif', date: '2024-01-15', location: 'Paris' },
//     { id: 2, title: 'UX Designer', applicants: 23, status: 'Actif', date: '2024-01-12', location: 'Remote' },
//     { id: 3, title: 'Product Manager', applicants: 67, status: 'Fermé', date: '2024-01-10', location: 'Lyon' },
//     { id: 4, title: 'DevOps Engineer', applicants: 34, status: 'Actif', date: '2024-01-08', location: 'Marseille' }
//   ]);

//   const candidates = [
//     { 
//       id: 1, 
//       name: 'Marie Dubois', 
//       position: 'Senior React Developer', 
//       match: 95, 
//       avatar: 'https://via.placeholder.com/40x40',
//       experience: '5 ans',
//       skills: ['React', 'JavaScript', 'Node.js']
//     },
//     { 
//       id: 2, 
//       name: 'Jean Martin', 
//       position: 'UX Designer', 
//       match: 89, 
//       avatar: 'https://via.placeholder.com/40x40',
//       experience: '3 ans',
//       skills: ['Figma', 'Adobe XD', 'Prototyping']
//     },
//     { 
//       id: 3, 
//       name: 'Sophie Laurent', 
//       position: 'Product Manager', 
//       match: 92, 
//       avatar: 'https://via.placeholder.com/40x40',
//       experience: '7 ans',
//       skills: ['Agile', 'Scrum', 'Analytics']
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Actif': return 'bg-blue-100 text-blue-800';
//       case 'Fermé': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleLikeCandidate = (candidateId) => {
//     setLikedCandidates(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(candidateId)) {
//         newSet.delete(candidateId);
//       } else {
//         newSet.add(candidateId);
//       }
//       return newSet;
//     });
//   };

//   const handleJobAction = (action, jobId) => {
//     switch(action) {
//       case 'view':
//         navigate(`/job/${jobId}`);
//         break;
//       case 'edit':
//         navigate(`/job/edit/${jobId}`);
//         break;
//       case 'delete':
//         setRecentJobPostings(prev => prev.filter(job => job.id !== jobId));
//         break;
//     }
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const StatCard = ({ stat, index }) => (
//     <div 
//       className="stat-card group hover:scale-105 transition-transform duration-300"
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className="stat-icon-container">
//         <div className={`stat-icon ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
//           <stat.icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//       <div className="stat-content">
//         <div className="stat-value">{stat.value}</div>
//         <div className="stat-label">{stat.label}</div>
//         <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
//           {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
//           {stat.change}
//         </div>
//       </div>
//     </div>
//   );

//   const Sidebar = () => (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <div className="logo-icon">JT</div>
//           <span className="logo-text">JobTracks</span>
//         </div>
//       </div>
      
//       <div className="sidebar-nav">
//         <div className="nav-section">
//           <div className="nav-item active">
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/company-profile')}>
//             <Building className="w-5 h-5" />
//             <span>Profil entreprise</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/my-jobs')}>
//             <Briefcase className="w-5 h-5" />
//             <span>Mes offres</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/candidates')}>
//             <Users className="w-5 h-5" />
//             <span>Candidats</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/messages')}>
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//             <span className="nav-badge">5</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/notifications')}>
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//             {notifications > 0 && <span className="nav-badge">{notifications}</span>}
//           </div>
//         </div>
        
//         <div className="nav-section">
//           <div className="nav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/')}>
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
 
//     <div className="dashboard">

//       <Sidebar />
      
      
//       <div className="main-content">
//         <div className="top-bar">
//           {/* <div className="breadcrumb">
//             <span className="breadcrumb-item">Accueil</span>
//             <span className="breadcrumb-separator">/</span>
//             <span className="breadcrumb-item active">Tableau de bord Recruteur</span>
//           </div> */}
//           <div className="breadcrumb">
//   <span 
//     className="breadcrumb-item clickable" 
//     onClick={() => navigate('/')}
//     style={{ cursor: 'pointer' }}
//   >
//     Accueil
//   </span>
//   <span className="breadcrumb-separator">/</span>
//   <span className="breadcrumb-item active">Tableau de bord Recruteur</span>
// </div>
          
//           <div className="top-actions">
//             <div className="search-box">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher..."
//                 className="search-input"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <button 
//               className="notification-btn"
//               onClick={() => handleNavigation('/notifications')}
//             >
//               <Bell className="w-5 h-5" />
//               {notifications > 0 && <span className="notification-dot"></span>}
//             </button>
            
//             <div className="user-avatar" onClick={() => handleNavigation('/profile')}>
//               <img src="https://via.placeholder.com/32x32" alt="Avatar" />
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-content">
//           <div className="dashboard-header">
//             <div>
//               <h1 className="dashboard-title">Tableau de bord Recruteur</h1>
//               <p className="dashboard-subtitle">Gérez vos offres et candidatures</p>
//             </div>
//             <div className="header-actions">
//               <button 
//                 className="btns-secondary"
//                 onClick={() => handleNavigation('/import-candidates')}
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 Importer candidats
//               </button>
//               <button 
//                 className="btn-primary"
//                 onClick={() => handleNavigation('/create-job')}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Publier une offre
//               </button>
//             </div>
//           </div>

//           <div className="stats-grid">
//             {recruiterStats.map((stat, index) => (
//               <StatCard key={stat.id} stat={stat} index={index} />
//             ))}
//           </div>

//           <div className="dashboard-grid">
//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Offres d'emploi</h3>
//                 <div className="card-actions">
//                   <button 
//                     className="btn-icon"
//                     onClick={() => handleNavigation('/jobs-filter')}
//                   >
//                     <Filter className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//               <div className="jobs-list">
//                 {recentJobPostings.map((job) => (
//                   <div key={job.id} className="job-item group hover:bg-gray-50 transition-colors duration-200">
//                     <div className="job-info">
//                       <div className="job-title">{job.title}</div>
//                       <div className="job-meta">
//                         <span className="job-location flex items-center">
//                           <MapPin className="w-3 h-3 mr-1" />
//                           {job.location}
//                         </span>
//                         <span className="job-date flex items-center">
//                           <Calendar className="w-3 h-3 mr-1" />
//                           {job.date}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="job-stats">
//                       <div className="job-applicants">
//                         <Users className="w-4 h-4" />
//                         {job.applicants} candidatures
//                       </div>
//                       <span className={`status-badge ${getStatusColor(job.status)}`}>
//                         {job.status}
//                       </span>
//                     </div>
//                     <div className="job-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                       <button 
//                         className="btn-icon"
//                         onClick={() => handleJobAction('view', job.id)}
//                         title="Voir l'offre"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button 
//                         className="btn-icon"
//                         onClick={() => handleJobAction('edit', job.id)}
//                         title="Modifier l'offre"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button 
//                         className="btn-icon text-red-500"
//                         onClick={() => handleJobAction('delete', job.id)}
//                         title="Supprimer l'offre"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Candidatures par mois</h3>
//                 <select 
//                   className="period-select"
//                   value={selectedPeriod}
//                   onChange={(e) => setSelectedPeriod(e.target.value)}
//                 >
//                   <option value="6m">6 mois</option>
//                   <option value="1y">1 an</option>
//                   <option value="2y">2 ans</option>
//                 </select>
//               </div>
//               <div className="chart-container">
//                 <div className="chart-placeholder">
//                   <Activity className="w-12 h-12 text-gray-400" />
//                   <p className="chart-text">Graphique des candidatures</p>
//                 </div>
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Candidats à examiner</h3>
//                 <button 
//                   className="btn-text"
//                   onClick={() => handleNavigation('/candidates')}
//                 >
//                   Voir tout
//                 </button>
//               </div>
//               <div className="candidates-list">
//                 {candidates.map((candidate) => (
//                   <div key={candidate.id} className="candidate-item group hover:bg-gray-50 transition-colors duration-200">
//                     <div className="candidate-avatar">
//                       <img src={candidate.avatar} alt="Candidat" />
//                     </div>
//                     <div className="candidate-info">
//                       <div className="candidate-name">{candidate.name}</div>
//                       <div className="candidate-position">{candidate.position}</div>
//                       <div className="candidate-meta">
//                         <span className="candidate-experience">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {candidate.experience}
//                         </span>
//                         <div className="candidate-match">
//                           <Star className="w-3 h-3 text-yellow-500" />
//                           {candidate.match}% match
//                         </div>
//                       </div>
//                       <div className="candidate-skills">
//                         {candidate.skills.slice(0, 3).map((skill, index) => (
//                           <span key={index} className="skill-tag">{skill}</span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="candidate-actions">
//                       <button 
//                         className="btn-primary-sm"
//                         onClick={() => navigate(`/candidate/${candidate.id}`)}
//                       >
//                         Examiner
//                       </button>
//                       <button 
//                         className={`btn-icon ${likedCandidates.has(candidate.id) ? 'text-red-500' : 'text-gray-400'}`}
//                         onClick={() => handleLikeCandidate(candidate.id)}
//                       >
//                         <Heart className={`w-4 h-4 ${likedCandidates.has(candidate.id) ? 'fill-current' : ''}`} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="dashboard-card">
//               <div className="card-header">
//                 <h3 className="card-title">Performance des offres</h3>
//                 <button 
//                   className="btn-text"
//                   onClick={() => handleNavigation('/analytics')}
//                 >
//                   Voir détails
//                 </button>
//               </div>
//               <div className="performance-list">
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Taux de conversion</div>
//                     <div className="metric-value">12.5%</div>
//                   </div>
//                   <div className="performance-change positive">
//                     <ArrowUp className="w-3 h-3" />
//                     +2.3%
//                   </div>
//                 </div>
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Temps de recrutement</div>
//                     <div className="metric-value">23 jours</div>
//                   </div>
//                   <div className="performance-change negative">
//                     <ArrowDown className="w-3 h-3" />
//                     -1.5 jours
//                   </div>
//                 </div>
//                 <div className="performance-item">
//                   <div className="performance-metric">
//                     <div className="metric-label">Satisfaction candidats</div>
//                     <div className="metric-value">4.8/5</div>
//                   </div>
//                   <div className="performance-change positive">
//                     <ArrowUp className="w-3 h-3" />
//                     +0.2
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import '../styles/pages/candidateDashboard.css';
import { 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Users,
  Building,
  Award,
  Activity,
  BarChart3,
  Upload,
  Plus,
  Star,
  Heart,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import Navbar from '../components/common/Navbar';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Récupération des données utilisateur
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [animatedStats, setAnimatedStats] = useState({});
  const [likedCandidates, setLikedCandidates] = useState(new Set());
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour obtenir le prénom de l'utilisateur
  const getUserFirstName = () => {
    if (!user || !user.name) return 'Utilisateur';
    return user.name.split(' ')[0];
  };

  // Fonction pour obtenir le message de bienvenue selon l'heure
  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const firstName = getUserFirstName();
    
    if (hour < 12) {
      return `Bonjour ${firstName} !`;
    } else if (hour < 18) {
      return `Bon après-midi ${firstName} !`;
    } else {
      return `Bonsoir ${firstName} !`;
    }
  };

  // Animation des statistiques
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    animateValue(0, 45, 1000, 'activeJobs');
    animateValue(0, 234, 1000, 'applications');
    animateValue(0, 67, 1000, 'candidates');
    animateValue(0, 12, 1000, 'hired');
  }, []);

  const recruiterStats = [
    { 
      id: 'activeJobs', 
      label: 'Offres actives', 
      value: animatedStats.activeJobs || 0, 
      change: '+15%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    { 
      id: 'applications', 
      label: 'Candidatures', 
      value: animatedStats.applications || 0, 
      change: '+28%',
      trend: 'up',
      icon: FileText,
      color: 'bg-green-500'
    },
    { 
      id: 'candidates', 
      label: 'Candidats', 
      value: animatedStats.candidates || 0, 
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    { 
      id: 'hired', 
      label: 'Recrutés', 
      value: animatedStats.hired || 0, 
      change: '+40%',
      trend: 'up',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const [recentJobPostings, setRecentJobPostings] = useState([
    { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Actif', date: '2024-01-15', location: 'Paris' },
    { id: 2, title: 'UX Designer', applicants: 23, status: 'Actif', date: '2024-01-12', location: 'Remote' },
    { id: 3, title: 'Product Manager', applicants: 67, status: 'Fermé', date: '2024-01-10', location: 'Lyon' },
    { id: 4, title: 'DevOps Engineer', applicants: 34, status: 'Actif', date: '2024-01-08', location: 'Marseille' }
  ]);

  const candidates = [
    { 
      id: 1, 
      name: 'Marie Dubois', 
      position: 'Senior React Developer', 
      match: 95, 
      avatar: 'https://via.placeholder.com/40x40',
      experience: '5 ans',
      skills: ['React', 'JavaScript', 'Node.js']
    },
    { 
      id: 2, 
      name: 'Jean Martin', 
      position: 'UX Designer', 
      match: 89, 
      avatar: 'https://via.placeholder.com/40x40',
      experience: '3 ans',
      skills: ['Figma', 'Adobe XD', 'Prototyping']
    },
    { 
      id: 3, 
      name: 'Sophie Laurent', 
      position: 'Product Manager', 
      match: 92, 
      avatar: 'https://via.placeholder.com/40x40',
      experience: '7 ans',
      skills: ['Agile', 'Scrum', 'Analytics']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'bg-blue-100 text-blue-800';
      case 'Fermé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLikeCandidate = (candidateId) => {
    setLikedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(candidateId)) {
        newSet.delete(candidateId);
      } else {
        newSet.add(candidateId);
      }
      return newSet;
    });
  };

  const handleJobAction = (action, jobId) => {
    switch(action) {
      case 'view':
        navigate(`/job/${jobId}`);
        break;
      case 'edit':
        navigate(`/job/edit/${jobId}`);
        break;
      case 'delete':
        setRecentJobPostings(prev => prev.filter(job => job.id !== jobId));
        break;
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const StatCard = ({ stat, index }) => (
    <div 
      className="stat-card group hover:scale-105 transition-transform duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="stat-icon-container">
        <div className={`stat-icon ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="stat-content">
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
        <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
          {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {stat.change}
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">JT</div>
          <span className="logo-text">JobTracks</span>
        </div>
      </div>
      
      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-item active">
            <BarChart3 className="w-5 h-5" />
            <span>Tableau de bord</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/company-profile')}>
            <Building className="w-5 h-5" />
            <span>Profil entreprise</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/my-jobs')}>
            <Briefcase className="w-5 h-5" />
            <span>Mes offres</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/candidates')}>
            <Users className="w-5 h-5" />
            <span>Candidats</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/messages')}>
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <span className="nav-badge">5</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/notifications')}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            {notifications > 0 && <span className="nav-badge">{notifications}</span>}
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item" onClick={() => handleNavigation('/settings')}>
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/')}>
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span 
              className="breadcrumb-item clickable" 
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              Accueil
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Tableau de bord Recruteur</span>
          </div>
          
          <div className="top-actions">
            <div className="search-box">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              className="notification-btn"
              onClick={() => handleNavigation('/notifications')}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && <span className="notification-dot"></span>}
            </button>
            
            <div className="user-avatar" onClick={() => handleNavigation('/profile')}>
              <img src="https://via.placeholder.com/32x32" alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Message de bienvenue personnalisé */}
          <div className="welcome-section" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="welcome-content">
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {getWelcomeMessage()}
              </h1>
              <p style={{
                fontSize: '1.1rem',
                opacity: '0.9',
                marginBottom: '0'
              }}>
                Ravi de vous revoir ! Voici un aperçu de vos activités de recrutement.
              </p>
              {user?.email && (
                <p style={{
                  fontSize: '0.9rem',
                  opacity: '0.8',
                  marginTop: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  Connecté en tant que : {user.email}
                </p>
              )}
            </div>
            <div className="welcome-decoration" style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: '0.1',
              fontSize: '4rem'
            }}>
              👋
            </div>
          </div>

          <div className="dashboard-header">
            <div>
              <h2 className="dashboard-title">Tableau de bord Recruteur</h2>
              <p className="dashboard-subtitle">Gérez vos offres et candidatures</p>
            </div>
            <div className="header-actions">
              <button 
                className="btns-secondary"
                onClick={() => handleNavigation('/import-candidates')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importer candidats
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleNavigation('/create-job')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Publier une offre
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {recruiterStats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Offres d'emploi</h3>
                <div className="card-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => handleNavigation('/jobs-filter')}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="jobs-list">
                {recentJobPostings.map((job) => (
                  <div key={job.id} className="job-item group hover:bg-gray-50 transition-colors duration-200">
                    <div className="job-info">
                      <div className="job-title">{job.title}</div>
                      <div className="job-meta">
                        <span className="job-location flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </span>
                        <span className="job-date flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.date}
                        </span>
                      </div>
                    </div>
                    <div className="job-stats">
                      <div className="job-applicants">
                        <Users className="w-4 h-4" />
                        {job.applicants} candidatures
                      </div>
                      <span className={`status-badge ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="job-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        className="btn-icon"
                        onClick={() => handleJobAction('view', job.id)}
                        title="Voir l'offre"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleJobAction('edit', job.id)}
                        title="Modifier l'offre"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="btn-icon text-red-500"
                        onClick={() => handleJobAction('delete', job.id)}
                        title="Supprimer l'offre"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Candidatures par mois</h3>
                <select 
                  className="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="6m">6 mois</option>
                  <option value="1y">1 an</option>
                  <option value="2y">2 ans</option>
                </select>
              </div>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <Activity className="w-12 h-12 text-gray-400" />
                  <p className="chart-text">Graphique des candidatures</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Candidats à examiner</h3>
                <button 
                  className="btn-text"
                  onClick={() => handleNavigation('/candidates')}
                >
                  Voir tout
                </button>
              </div>
              <div className="candidates-list">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="candidate-item group hover:bg-gray-50 transition-colors duration-200">
                    <div className="candidate-avatar">
                      <img src={candidate.avatar} alt="Candidat" />
                    </div>
                    <div className="candidate-info">
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-position">{candidate.position}</div>
                      <div className="candidate-meta">
                        <span className="candidate-experience">
                          <Clock className="w-3 h-3 mr-1" />
                          {candidate.experience}
                        </span>
                        <div className="candidate-match">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {candidate.match}% match
                        </div>
                      </div>
                      <div className="candidate-skills">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="candidate-actions">
                      <button 
                        className="btn-primary-sm"
                        onClick={() => navigate(`/candidate/${candidate.id}`)}
                      >
                        Examiner
                      </button>
                      <button 
                        className={`btn-icon ${likedCandidates.has(candidate.id) ? 'text-red-500' : 'text-gray-400'}`}
                        onClick={() => handleLikeCandidate(candidate.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedCandidates.has(candidate.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Performance des offres</h3>
                <button 
                  className="btn-text"
                  onClick={() => handleNavigation('/analytics')}
                >
                  Voir détails
                </button>
              </div>
              <div className="performance-list">
                <div className="performance-item">
                  <div className="performance-metric">
                    <div className="metric-label">Taux de conversion</div>
                    <div className="metric-value">12.5%</div>
                  </div>
                  <div className="performance-change positive">
                    <ArrowUp className="w-3 h-3" />
                    +2.3%
                  </div>
                </div>
                <div className="performance-item">
                  <div className="performance-metric">
                    <div className="metric-label">Temps de recrutement</div>
                    <div className="metric-value">23 jours</div>
                  </div>
                  <div className="performance-change negative">
                    <ArrowDown className="w-3 h-3" />
                    -1.5 jours
                  </div>
                </div>
                <div className="performance-item">
                  <div className="performance-metric">
                    <div className="metric-label">Satisfaction candidats</div>
                    <div className="metric-value">4.8/5</div>
                  </div>
                  <div className="performance-change positive">
                    <ArrowUp className="w-3 h-3" />
                    +0.2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;









// import React, { useState, useEffect } from 'react';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   Filter,
//   ArrowUp,
//   ArrowDown,
//   Users,
//   Building,
//   Award,
//   Activity,
//   BarChart3,
//   Upload,
//   Plus,
//   Star,
//   Heart,
//   Edit,
//   Trash2,
//   Eye,
//   Calendar,
//   Clock,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   Save,
//   X,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Download,
//   Send,
//   MoreHorizontal,
//   UserPlus,
//   Zap,
//   Target,
//   TrendingUp,
//   Archive,
//   RefreshCw,
//   Camera,
//   Link,
//   Shield,
//   Palette,
//   Database,
//   Code,
//   Layers,
//   Monitor,
//   Smartphone,
//   Headphones,
//   Home,
//   Coffee,
//   Plane,
//   Car,
//   Wifi,
//   DollarSign,
//   Percent,
//   BookOpen,
//   Users2,
//   MessageCircle,
//   ThumbsUp,
//   ThumbsDown,
//   Flag,
//   Share2,
//   Copy,
//   ExternalLink,
//   ChevronRight,
//   ChevronLeft,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';

// const RecruiterDashboard = () => {
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [selectedPeriod, setSelectedPeriod] = useState('6m');
//   const [animatedStats, setAnimatedStats] = useState({});
//   const [showNewJobForm, setShowNewJobForm] = useState(false);
//   const [showEditProfileForm, setShowEditProfileForm] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   // Animation des statistiques
//   useEffect(() => {
//     const animateValue = (start, end, duration, key) => {
//       const range = end - start;
//       const increment = range / (duration / 16);
//       let current = start;
      
//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= end) {
//           current = end;
//           clearInterval(timer);
//         }
//         setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
//       }, 16);
//     };

//     animateValue(0, 45, 1000, 'activeJobs');
//     animateValue(0, 234, 1000, 'applications');
//     animateValue(0, 67, 1000, 'candidates');
//     animateValue(0, 12, 1000, 'hired');
//   }, []);

//   const recruiterStats = [
//     { 
//       id: 'activeJobs', 
//       label: 'Offres actives', 
//       value: animatedStats.activeJobs || 0, 
//       change: '+15%',
//       trend: 'up',
//       icon: Briefcase,
//       color: 'bg-blue-500'
//     },
//     { 
//       id: 'applications', 
//       label: 'Candidatures', 
//       value: animatedStats.applications || 0, 
//       change: '+28%',
//       trend: 'up',
//       icon: FileText,
//       color: 'bg-green-500'
//     },
//     { 
//       id: 'candidates', 
//       label: 'Candidats', 
//       value: animatedStats.candidates || 0, 
//       change: '+18%',
//       trend: 'up',
//       icon: Users,
//       color: 'bg-purple-500'
//     },
//     { 
//       id: 'hired', 
//       label: 'Recrutés', 
//       value: animatedStats.hired || 0, 
//       change: '+40%',
//       trend: 'up',
//       icon: Award,
//       color: 'bg-orange-500'
//     }
//   ];

//   const jobPostings = [
//     { 
//       id: 1, 
//       title: 'Senior React Developer', 
//       applicants: 45, 
//       status: 'Actif', 
//       date: '2024-01-15', 
//       location: 'Paris',
//       type: 'CDI',
//       salary: '50-70k€',
//       description: 'Nous recherchons un développeur React expérimenté pour rejoindre notre équipe technique.',
//       requirements: ['5+ ans d\'expérience React', 'Maîtrise TypeScript', 'Expérience API REST'],
//       benefits: ['Télétravail hybride', 'Tickets restaurant', 'Mutuelle'],
//       views: 234,
//       saves: 12
//     },
//     { 
//       id: 2, 
//       title: 'UX Designer', 
//       applicants: 23, 
//       status: 'Actif', 
//       date: '2024-01-12', 
//       location: 'Remote',
//       type: 'CDI',
//       salary: '45-55k€',
//       description: 'Designer UX/UI passionné pour concevoir des expériences utilisateur exceptionnelles.',
//       requirements: ['3+ ans d\'expérience UX', 'Maîtrise Figma', 'Portfolio solide'],
//       benefits: ['100% remote', 'Équipement fourni', 'Formation continue'],
//       views: 189,
//       saves: 8
//     },
//     { 
//       id: 3, 
//       title: 'Product Manager', 
//       applicants: 67, 
//       status: 'Fermé', 
//       date: '2024-01-10', 
//       location: 'Lyon',
//       type: 'CDI',
//       salary: '60-80k€',
//       description: 'Product Manager pour piloter la stratégie produit et coordonner les équipes.',
//       requirements: ['5+ ans en Product Management', 'Expérience Agile', 'Esprit analytique'],
//       benefits: ['Stock options', 'Flex office', 'Congés illimités'],
//       views: 456,
//       saves: 23
//     },
//     { 
//       id: 4, 
//       title: 'DevOps Engineer', 
//       applicants: 34, 
//       status: 'Actif', 
//       date: '2024-01-08', 
//       location: 'Marseille',
//       type: 'CDI',
//       salary: '55-65k€',
//       description: 'Ingénieur DevOps pour optimiser notre infrastructure et processus de déploiement.',
//       requirements: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD'],
//       benefits: ['Horaires flexibles', 'Budget formation', 'Télétravail'],
//       views: 178,
//       saves: 15
//     }
//   ];

//   const candidates = [
//     {
//       id: 1,
//       name: 'Marie Dubois',
//       position: 'Senior React Developer',
//       experience: '6 ans',
//       location: 'Paris',
//       email: 'marie.dubois@email.com',
//       phone: '+33 1 23 45 67 89',
//       match: 95,
//       status: 'Nouveau',
//       avatar: 'https://via.placeholder.com/40x40',
//       skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
//       education: 'Master Informatique - École Polytechnique',
//       appliedDate: '2024-01-15',
//       jobApplied: 'Senior React Developer',
//       summary: 'Développeur passionné avec 6 ans d\'expérience en React et écosystème JavaScript moderne.',
//       lastActivity: '2 heures'
//     },
//     {
//       id: 2,
//       name: 'Jean Martin',
//       position: 'UX Designer',
//       experience: '4 ans',
//       location: 'Lyon',
//       email: 'jean.martin@email.com',
//       phone: '+33 6 98 76 54 32',
//       match: 89,
//       status: 'En cours',
//       avatar: 'https://via.placeholder.com/40x40',
//       skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
//       education: 'Master Design - École des Beaux-Arts',
//       appliedDate: '2024-01-12',
//       jobApplied: 'UX Designer',
//       summary: 'Designer UX avec une approche centrée utilisateur et une expérience en design thinking.',
//       lastActivity: '1 jour'
//     },
//     {
//       id: 3,
//       name: 'Sarah Chen',
//       position: 'Product Manager',
//       experience: '7 ans',
//       location: 'Remote',
//       email: 'sarah.chen@email.com',
//       phone: '+33 7 12 34 56 78',
//       match: 92,
//       status: 'Entretien',
//       avatar: 'https://via.placeholder.com/40x40',
//       skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
//       education: 'MBA - HEC Paris',
//       appliedDate: '2024-01-10',
//       jobApplied: 'Product Manager',
//       summary: 'Product Manager expérimentée avec un track record de lancement de produits réussis.',
//       lastActivity: '3 heures'
//     }
//   ];

//   const messages = [
//     {
//       id: 1,
//       sender: 'Marie Dubois',
//       subject: 'Question sur le poste Senior React Developer',
//       preview: 'Bonjour, j\'aimerais en savoir plus sur les technologies utilisées...',
//       time: '10:30',
//       unread: true,
//       avatar: 'https://via.placeholder.com/40x40',
//       content: 'Bonjour,\n\nJ\'ai vu votre offre pour le poste de Senior React Developer et je suis très intéressée. J\'aimerais en savoir plus sur les technologies utilisées au quotidien et l\'équipe technique.\n\nPourriez-vous me donner plus de détails sur le projet principal sur lequel je travaillerais ?\n\nCordialement,\nMarie Dubois'
//     },
//     {
//       id: 2,
//       sender: 'Jean Martin',
//       subject: 'Disponibilité pour entretien',
//       preview: 'Bonjour, je suis disponible cette semaine pour un entretien...',
//       time: '09:15',
//       unread: true,
//       avatar: 'https://via.placeholder.com/40x40',
//       content: 'Bonjour,\n\nSuite à notre échange téléphonique, je confirme ma disponibilité pour un entretien cette semaine.\n\nJe suis libre mardi et jeudi après-midi.\n\nMerci,\nJean Martin'
//     },
//     {
//       id: 3,
//       sender: 'Sarah Chen',
//       subject: 'Merci pour l\'entretien',
//       preview: 'Merci pour l\'entretien d\'hier, j\'ai été ravie de discuter...',
//       time: 'Hier',
//       unread: false,
//       avatar: 'https://via.placeholder.com/40x40',
//       content: 'Bonjour,\n\nMerci pour l\'entretien d\'hier, j\'ai été ravie de discuter du poste de Product Manager avec vous.\n\nComme convenu, je vous envoie en pièce jointe mes références.\n\nCordialement,\nSarah Chen'
//     }
//   ];

//   const notifications = [
//     {
//       id: 1,
//       type: 'application',
//       title: 'Nouvelle candidature',
//       message: 'Marie Dubois a postulé pour Senior React Developer',
//       time: '5 min',
//       read: false,
//       icon: Users,
//       color: 'text-blue-500'
//     },
//     {
//       id: 2,
//       type: 'message',
//       title: 'Nouveau message',
//       message: 'Jean Martin a envoyé un message',
//       time: '1h',
//       read: false,
//       icon: MessageSquare,
//       color: 'text-green-500'
//     },
//     {
//       id: 3,
//       type: 'interview',
//       title: 'Entretien programmé',
//       message: 'Entretien avec Sarah Chen demain 14h',
//       time: '2h',
//       read: true,
//       icon: Calendar,
//       color: 'text-purple-500'
//     }
//   ];

//   const companyProfile = {
//     name: 'TechCorp Solutions',
//     logo: 'https://via.placeholder.com/80x80',
//     industry: 'Technologie',
//     size: '50-200 employés',
//     founded: '2018',
//     location: 'Paris, France',
//     website: 'https://techcorp.com',
//     description: 'Nous sommes une startup technologique innovante spécialisée dans le développement de solutions SaaS pour les entreprises.',
//     mission: 'Simplifier la vie des entreprises grâce à la technologie',
//     values: ['Innovation', 'Collaboration', 'Excellence', 'Transparence'],
//     benefits: [
//       'Télétravail hybride',
//       'Tickets restaurant',
//       'Mutuelle premium',
//       'Budget formation 2000€/an',
//       'Stock options',
//       'Congés illimités'
//     ],
//     stats: {
//       employees: 78,
//       offices: 3,
//       clients: 150,
//       growth: '+40%'
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Actif': return 'bg-blue-100 text-blue-800';
//       case 'Fermé': return 'bg-red-100 text-red-800';
//       case 'Brouillon': return 'bg-gray-100 text-gray-800';
//       case 'Nouveau': return 'bg-green-100 text-green-800';
//       case 'En cours': return 'bg-yellow-100 text-yellow-800';
//       case 'Entretien': return 'bg-purple-100 text-purple-800';
//       case 'Rejeté': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const StatCard = ({ stat, index }) => (
//     <div 
//       className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className={`p-2 rounded-lg ${stat.color}`}>
//             <stat.icon className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//             <div className="text-sm text-gray-500">{stat.label}</div>
//           </div>
//         </div>
//         <div className={`flex items-center space-x-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
//           {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
//           {stat.change}
//         </div>
//       </div>
//     </div>
//   );

//   const Sidebar = () => (
//     <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-full fixed left-0 top-0 z-30">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold">JT</span>
//           </div>
//           <span className="text-xl font-bold text-gray-900">JobTracks</span>
//         </div>
//       </div>
      
//       <div className="p-4 space-y-2">
//         <div className="space-y-1">
//           <button 
//             onClick={() => setCurrentPage('dashboard')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </button>
          
//           <button 
//             onClick={() => setCurrentPage('company')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'company' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Building className="w-5 h-5" />
//             <span>Profil entreprise</span>
//           </button>
          
//           <button 
//             onClick={() => setCurrentPage('jobs')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'jobs' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Briefcase className="w-5 h-5" />
//             <span>Mes offres</span>
//           </button>
          
//           <button 
//             onClick={() => setCurrentPage('candidates')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'candidates' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Users className="w-5 h-5" />
//             <span>Candidats</span>
//           </button>
          
//           <button 
//             onClick={() => setCurrentPage('messages')}
//             className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <div className="flex items-center space-x-3">
//               <MessageSquare className="w-5 h-5" />
//               <span>Messages</span>
//             </div>
//             <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
//           </button>
          
//           <button 
//             onClick={() => setCurrentPage('notifications')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//           </button>
//         </div>
        
//         <div className="pt-4 border-t border-gray-200 space-y-1">
//           <button 
//             onClick={() => setCurrentPage('settings')}
//             className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//               currentPage === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </button>
          
//           <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const TopBar = () => (
//     <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//       <div className="flex items-center space-x-2 text-sm text-gray-500">
//         <span>Accueil</span>
//         <ChevronRight className="w-4 h-4" />
//         <span className="text-gray-900 font-medium">
//           {currentPage === 'dashboard' && 'Tableau de bord Recruteur'}
//           {currentPage === 'company' && 'Profil entreprise'}
//           {currentPage === 'jobs' && 'Mes offres'}
//           {currentPage === 'candidates' && 'Candidats'}
//           {currentPage === 'messages' && 'Messages'}
//           {currentPage === 'notifications' && 'Notifications'}
//           {currentPage === 'settings' && 'Paramètres'}
//         </span>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         <div className="relative">
//           <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//           <input 
//             type="text" 
//             placeholder="Rechercher..."
//             className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <button className="relative p-2 text-gray-500 hover:text-gray-700">
//           <Bell className="w-5 h-5" />
//           <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//         </button>
        
//         <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
//           <img src="https://via.placeholder.com/32x32" alt="Avatar" className="w-full h-full object-cover" />
//         </div>
//       </div>
//     </div>
//   );

//   const DashboardPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Recruteur</h1>
//           <p className="text-gray-500">Gérez vos offres et candidatures</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//             <Upload className="w-4 h-4" />
//             <span>Importer candidats</span>
//           </button>
//           <button 
//             onClick={() => setShowNewJobForm(true)}
//             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Publier une offre</span>
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {recruiterStats.map((stat, index) => (
//           <StatCard key={stat.id} stat={stat} index={index} />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Offres d'emploi</h3>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="space-y-4">
//             {jobPostings.slice(0, 4).map((job) => (
//               <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                 <div className="flex-1">
//                   <div className="font-medium text-gray-900">{job.title}</div>
//                   <div className="text-sm text-gray-500 flex items-center space-x-4">
//                     <span>{job.location}</span>
//                     <span>{job.date}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-1 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     <span>{job.applicants}</span>
//                   </div>
//                   <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
//                     {job.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Candidatures par mois</h3>
//             <select 
//               className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//             >
//               <option value="6m">6 mois</option>
//               <option value="1y">1 an</option>
//               <option value="2y">2 ans</option>
//             </select>
//           </div>
//           <div className="h-64 flex items-center justify-center text-gray-400">
//             <div className="text-center">
//               <Activity className="w-12 h-12 mx-auto mb-2" />
//               <p>Graphique des candidatures</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Candidats à examiner</h3>
//             <button className="text-blue-600 hover:text-blue-700 text-sm">Voir tout</button>
//           </div>
//           <div className="space-y-4">
//             {candidates.slice(0, 3).map((candidate) => (
//               <div key={candidate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                 <div className="flex items-center space-x-3">
//                   <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full" />
//                   <div>
//                     <div className="font-medium text-gray-900">{candidate.name}</div>
//                     <div className="text-sm text-gray-500">{candidate.position}</div>
//                     <div className="flex items-center space-x-1 text-sm text-yellow-600">
//                       <Star className="w-3 h-3 fill-current" />
//                       <span>{candidate.match}% match</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
//                     Examiner
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg">
//                     <Heart className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Performance des offres</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//               <div>
//                 <div className="text-sm text-gray-500">Taux de conversion</div>
//                 <div className="text-xl font-bold text-gray-900">12.5%</div>
//               </div>
//               <div className="flex items-center space-x-1 text-green-600">
//                 <ArrowUp className="w-3 h-3" />
//                 <span className="text-sm">+2.3%</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//               <div>
//                 <div className="text-sm text-gray-500">Temps de recrutement</div>

// <div className="text-xl font-bold text-gray-900">8 jours</div>
//               </div>
//               <div className="flex items-center space-x-1 text-green-600">
//                 <ArrowDown className="w-3 h-3" />
//                 <span className="text-sm">-1.2j</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//               <div>
//                 <div className="text-sm text-gray-500">Satisfaction candidats</div>
//                 <div className="text-xl font-bold text-gray-900">4.8/5</div>
//               </div>
//               <div className="flex items-center space-x-1 text-green-600">
//                 <ArrowUp className="w-3 h-3" />
//                 <span className="text-sm">+0.2</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CompanyPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Profil entreprise</h1>
//           <p className="text-gray-500">Gérez les informations de votre entreprise</p>
//         </div>
//         <button 
//           onClick={() => setShowEditProfileForm(true)}
//           className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           <Edit className="w-4 h-4" />
//           <span>Modifier le profil</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <div className="flex items-start space-x-6">
//           <img src={companyProfile.logo} alt={companyProfile.name} className="w-20 h-20 rounded-lg" />
//           <div className="flex-1">
//             <h2 className="text-xl font-bold text-gray-900">{companyProfile.name}</h2>
//             <p className="text-gray-500 mb-2">{companyProfile.industry}</p>
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <div className="flex items-center space-x-1">
//                 <Building className="w-4 h-4" />
//                 <span>{companyProfile.size}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Fondée en {companyProfile.founded}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <MapPin className="w-4 h-4" />
//                 <span>{companyProfile.location}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Globe className="w-4 h-4" />
//                 <a href={companyProfile.website} className="text-blue-600 hover:underline">{companyProfile.website}</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
//           <p className="text-gray-700 mb-4">{companyProfile.description}</p>
//           <div className="space-y-3">
//             <div>
//               <h4 className="font-medium text-gray-900">Mission</h4>
//               <p className="text-gray-600">{companyProfile.mission}</p>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900">Valeurs</h4>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {companyProfile.values.map((value, index) => (
//                   <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {value}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Avantages</h3>
//           <div className="space-y-2">
//             {companyProfile.benefits.map((benefit, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//                 <span className="text-gray-700">{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//           <div className="text-2xl font-bold text-blue-600">{companyProfile.stats.employees}</div>
//           <div className="text-sm text-gray-500">Employés</div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//           <div className="text-2xl font-bold text-green-600">{companyProfile.stats.offices}</div>
//           <div className="text-sm text-gray-500">Bureaux</div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//           <div className="text-2xl font-bold text-purple-600">{companyProfile.stats.clients}</div>
//           <div className="text-sm text-gray-500">Clients</div>
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//           <div className="text-2xl font-bold text-orange-600">{companyProfile.stats.growth}</div>
//           <div className="text-sm text-gray-500">Croissance</div>
//         </div>
//       </div>
//     </div>
//   );

//   const JobsPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Mes offres d'emploi</h1>
//           <p className="text-gray-500">Gérez vos offres et suivez les candidatures</p>
//         </div>
//         <button 
//           onClick={() => setShowNewJobForm(true)}
//           className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Nouvelle offre</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher une offre..."
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select 
//               className="px-3 py-2 border border-gray-200 rounded-lg"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">Tous les statuts</option>
//               <option value="Actif">Actif</option>
//               <option value="Fermé">Fermé</option>
//               <option value="Brouillon">Brouillon</option>
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Filter className="w-4 h-4" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Download className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {jobPostings.map((job) => (
//             <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-3">
//                     <h3 className="font-semibold text-gray-900">{job.title}</h3>
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
//                       {job.status}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-500 mt-1 flex items-center space-x-4">
//                     <div className="flex items-center space-x-1">
//                       <MapPin className="w-4 h-4" />
//                       <span>{job.location}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <DollarSign className="w-4 h-4" />
//                       <span>{job.salary}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{job.date}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="text-center">
//                     <div className="text-lg font-semibold text-gray-900">{job.applicants}</div>
//                     <div className="text-xs text-gray-500">Candidatures</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-semibold text-gray-900">{job.views}</div>
//                     <div className="text-xs text-gray-500">Vues</div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button 
//                       onClick={() => setSelectedJob(job)}
//                       className="p-2 hover:bg-gray-100 rounded-lg"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg">
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg">
//                       <MoreHorizontal className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const CandidatesPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Candidats</h1>
//           <p className="text-gray-500">Gérez et suivez vos candidats</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//             <Upload className="w-4 h-4" />
//             <span>Importer</span>
//           </button>
//           <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             <UserPlus className="w-4 h-4" />
//             <span>Ajouter candidat</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher un candidat..."
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select 
//               className="px-3 py-2 border border-gray-200 rounded-lg"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">Tous les statuts</option>
//               <option value="Nouveau">Nouveau</option>
//               <option value="En cours">En cours</option>
//               <option value="Entretien">Entretien</option>
//               <option value="Rejeté">Rejeté</option>
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Filter className="w-4 h-4" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Download className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {candidates.map((candidate) => (
//             <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-center space-x-3 mb-3">
//                 <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
//                   <p className="text-sm text-gray-500">{candidate.position}</p>
//                 </div>
//                 <button className="p-1 hover:bg-gray-100 rounded">
//                   <Heart className="w-4 h-4" />
//                 </button>
//               </div>
              
//               <div className="space-y-2 mb-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Match</span>
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-3 h-3 text-yellow-400 fill-current" />
//                     <span className="text-yellow-600 font-medium">{candidate.match}%</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Expérience</span>
//                   <span className="text-gray-700">{candidate.experience}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Localisation</span>
//                   <span className="text-gray-700">{candidate.location}</span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-1 mb-3">
//                 {candidate.skills.slice(0, 3).map((skill, index) => (
//                   <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                     {skill}
//                   </span>
//                 ))}
//                 {candidate.skills.length > 3 && (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                     +{candidate.skills.length - 3}
//                   </span>
//                 )}
//               </div>

//               <div className="flex items-center justify-between">
//                 <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(candidate.status)}`}>
//                   {candidate.status}
//                 </span>
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={() => setSelectedCandidate(candidate)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
//                   >
//                     Voir profil
//                   </button>
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <MessageSquare className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const MessagesPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
//           <p className="text-gray-500">Communiquez avec vos candidats</p>
//         </div>
//         <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           <Send className="w-4 h-4" />
//           <span>Nouveau message</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96">
//         <div className="flex h-full">
//           <div className="w-1/3 border-r border-gray-200">
//             <div className="p-4 border-b border-gray-200">
//               <div className="relative">
//                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input 
//                   type="text" 
//                   placeholder="Rechercher un message..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="overflow-y-auto">
//               {messages.map((message) => (
//                 <div 
//                   key={message.id} 
//                   className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
//                     selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
//                   }`}
//                   onClick={() => setSelectedMessage(message)}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <img src={message.avatar} alt={message.sender} className="w-10 h-10 rounded-full" />
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium text-gray-900 truncate">{message.sender}</h3>
//                         <span className="text-xs text-gray-500">{message.time}</span>
//                       </div>
//                       <p className="text-sm text-gray-600 truncate">{message.subject}</p>
//                       <p className="text-xs text-gray-500 truncate">{message.preview}</p>
//                     </div>
//                     {message.unread && (
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex-1 flex flex-col">
//             {selectedMessage ? (
//               <>
//                 <div className="p-4 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="w-10 h-10 rounded-full" />
//                       <div>
//                         <h3 className="font-medium text-gray-900">{selectedMessage.sender}</h3>
//                         <p className="text-sm text-gray-500">{selectedMessage.subject}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 hover:bg-gray-100 rounded-lg">
//                         <Archive className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg">
//                         <Flag className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex-1 p-4 overflow-y-auto">
//                   <div className="whitespace-pre-wrap text-gray-700">
//                     {selectedMessage.content}
//                   </div>
//                 </div>
                
//                 <div className="p-4 border-t border-gray-200">
//                   <div className="flex items-center space-x-2">
//                     <textarea 
//                       placeholder="Tapez votre réponse..."
//                       className="flex-1 p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       rows="3"
//                     />
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                       Envoyer
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex items-center justify-center text-gray-500">
//                 <div className="text-center">
//                   <MessageSquare className="w-12 h-12 mx-auto mb-2" />
//                   <p>Sélectionnez un message pour le lire</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const NotificationsPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//           <p className="text-gray-500">Restez informé des dernières activités</p>
//         </div>
//         <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//           <CheckCircle className="w-4 h-4" />
//           <span>Marquer tout comme lu</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-4">
//             <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
//               Toutes
//             </button>
//             <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
//               Non lues
//             </button>
//             <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
//               Candidatures
//             </button>
//             <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
//               Messages
//             </button>
//           </div>
//         </div>
        
//         <div className="divide-y divide-gray-200">
//           {notifications.map((notification) => (
//             <div 
//               key={notification.id} 
//               className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
//                   <notification.icon className={`w-5 h-5 ${notification.color}`} />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium text-gray-900">{notification.title}</h3>
//                     <span className="text-xs text-gray-500">{notification.time}</span>
//                   </div>
//                   <p className="text-sm text-gray-600">{notification.message}</p>
//                 </div>
//                 {!notification.read && (
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

// const SettingsPage = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
//           <p className="text-gray-500">Configurez votre compte et préférences</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Profil personnel</h3>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <img src="https://via.placeholder.com/60x60" alt="Avatar" className="w-15 h-15 rounded-full" />
//               <div>
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
//                   Changer photo
//                 </button>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
//               <input 
//                 type="text" 
//                 defaultValue="Jean Dupont"
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input 
//                 type="email" 
//                 defaultValue="jean.dupont@techcorp.com"
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
//               <input 
//                 type="tel" 
//                 defaultValue="+33 1 23 45 67 89"
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Sauvegarder
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-medium text-gray-900">Nouvelles candidatures</div>
//                 <div className="text-sm text-gray-500">Recevoir un email pour chaque candidature</div>
//               </div>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-medium text-gray-900">Messages candidats</div>
//                 <div className="text-sm text-gray-500">Notifications pour les nouveaux messages</div>
//               </div>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-medium text-gray-900">Rappels entretiens</div>
//                 <div className="text-sm text-gray-500">Rappel 1h avant les entretiens</div>
//               </div>
//               <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-medium text-gray-900">Rapport hebdomadaire</div>
//                 <div className="text-sm text-gray-500">Résumé des activités de la semaine</div>
//               </div>
//               <input type="checkbox" className="w-4 h-4 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
//           <div className="space-y-4">
//             <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//               <span>Changer le mot de passe</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//             <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//               <span>Authentification à deux facteurs</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//             <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//               <span>Sessions actives</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//             <div className="pt-4 border-t border-gray-200">
//               <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
//                 Supprimer le compte
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Modals
//   const NewJobModal = () => (
//     showNewJobForm && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">Nouvelle offre d'emploi</h2>
//             <button 
//               onClick={() => setShowNewJobForm(false)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Titre du poste</label>
//               <input 
//                 type="text" 
//                 placeholder="Ex: Développeur React Senior"
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
//                 <input 
//                   type="text" 
//                   placeholder="Paris, France"
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
//                 <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option>CDI</option>
//                   <option>CDD</option>
//                   <option>Freelance</option>
//                   <option>Stage</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Salaire minimum</label>
//                 <input 
//                   type="number" 
//                   placeholder="45000"
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Salaire maximum</label>
//                 <input 
//                   type="number" 
//                   placeholder="65000"
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description du poste</label>
//               <textarea 
//                 rows="4"
//                 placeholder="Décrivez le poste et les responsabilités..."
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Compétences requises</label>
//               <textarea 
//                 rows="3"
//                 placeholder="Listez les compétences et qualifications requises..."
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Avantages</label>
//               <textarea 
//                 rows="3"
//                 placeholder="Télétravail, tickets restaurant, mutuelle..."
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div className="flex items-center justify-end space-x-3 pt-4">
//               <button 
//                 type="button"
//                 onClick={() => setShowNewJobForm(false)}
//                 className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 Annuler
//               </button>
//               <button 
//                 type="button"
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//               >
//                 Sauvegarder comme brouillon
//               </button>
//               <button 
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Publier l'offre
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );

//   const EditProfileModal = () => (
//     showEditProfileForm && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">Modifier le profil entreprise</h2>
//             <button 
//               onClick={() => setShowEditProfileForm(false)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <form className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <img src={companyProfile.logo} alt="Logo" className="w-16 h-16 rounded-lg" />
//               <button 
//                 type="button"
//                 className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 Changer le logo
//               </button>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
//               <input 
//                 type="text" 
//                 defaultValue={companyProfile.name}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
//                 <input 
//                   type="text" 
//                   defaultValue={companyProfile.industry}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Taille de l'entreprise</label>
//                 <select 
//                   defaultValue={companyProfile.size}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>1-10 employés</option>
//                   <option>11-50 employés</option>
//                   <option>51-200 employés</option>
//                   <option>201-500 employés</option>
//                   <option>500+ employés</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Année de création</label>
//                 <input 
//                   type="text" 
//                   defaultValue={companyProfile.founded}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
//                 <input 
//                   type="text" 
//                   defaultValue={companyProfile.location}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
//               <input 
//                 type="url" 
//                 defaultValue={companyProfile.website}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea 
//                 rows="4"
//                 defaultValue={companyProfile.description}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
//               <textarea 
//                 rows="2"
//                 defaultValue={companyProfile.mission}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div className="flex items-center justify-end space-x-3 pt-4">
//               <button 
//                 type="button"
//                 onClick={() => setShowEditProfileForm(false)}
//                 className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 Annuler
//               </button>
//               <button 
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Sauvegarder
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );

//   const CandidateModal = () => (
//     selectedCandidate && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900">Profil candidat</h2>
//             <button 
//               onClick={() => setSelectedCandidate(null)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-6">
//               <div className="flex items-center space-x-4">
//                 <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-20 h-20 rounded-full" />
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h3>
//                   <p className="text-gray-600">{selectedCandidate.position}</p>
//                   <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                     <div className="flex items-center space-x-1">
//                       <MapPin className="w-4 h-4" />
//                       <span>{selectedCandidate.location}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Briefcase className="w-4 h-4" />
//                       <span>{selectedCandidate.experience}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                   <span className="text-xl font-bold text-yellow-600">{selectedCandidate.match}%</span>
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-gray-900 mb-2">Résumé</h4>
//                 <p className="text-gray-700">{selectedCandidate.summary}</p>
//               </div>
              
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-3">Compétences</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedCandidate.skills.map((skill, index) => (
//                     <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Formation</h4>
//                 <p className="text-gray-700">{selectedCandidate.education}</p>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   <MessageSquare className="w-4 h-4" />
//                   <span>Envoyer un message</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                   <Calendar className="w-4 h-4" />
//                   <span>Programmer entretien</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//                   <Download className="w-4 h-4" />
//                   <span>Télécharger CV</span>
//                 </button>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="bg-white border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Informations de contact</h4>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Mail className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">{selectedCandidate.email}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Phone className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">{selectedCandidate.phone}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Statut de candidature</h4>
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Statut</span>
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCandidate.status)}`}>
//                       {selectedCandidate.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Poste</span>
//                     <span className="text-sm text-gray-900">{selectedCandidate.jobApplied}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Candidature</span>
//                     <span className="text-sm text-gray-900">{selectedCandidate.appliedDate}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Dernière activité</span>
//                     <span className="text-sm text-gray-900">{selectedCandidate.lastActivity}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Actions rapides</h4>
//                 <div className="space-y-2">
//                   <button className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
//                     Accepter candidature
//                   </button>
//                   <button className="w-full px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
//                     Mettre en attente
//                   </button>
//                   <button className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">
//                     Rejeter candidature
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );

//   const JobModal = () => (
//     selectedJob && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900">Détails de l'offre</h2>
//             <button 
//               onClick={() => setSelectedJob(null)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-6">
//               <div>
//                 <div className="flex items-center space-x-3 mb-4">
//                   <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
//                   <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedJob.status)}`}>
//                     {selectedJob.status}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
//                   <div className="flex items-center space-x-1">
//                     <MapPin className="w-4 h-4" />
//                     <span>{selectedJob.location}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Briefcase className="w-4 h-4" />
//                     <span>{selectedJob.type}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <DollarSign className="w-4 h-4" />
//                     <span>{selectedJob.salary}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{selectedJob.date}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Description du poste</h4>
//                 <p className="text-gray-700">{selectedJob.description}</p>
//               </div>
              
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Compétences requises</h4>
//                 <ul className="list-disc list-inside text-gray-700 space-y-1">
//                   {selectedJob.requirements.map((req, index) => (
//                     <li key={index}>{req}</li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-2">Avantages</h4>
//                 <ul className="list-disc list-inside text-gray-700 space-y-1">
//                   {selectedJob.benefits.map((benefit, index) => (
//                     <li key={index}>{benefit}</li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   <Edit className="w-4 h-4" />
//                   <span>Modifier l'offre</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//                   <Copy className="w-4 h-4" />
//                   <span>Dupliquer</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
//                   <Share2 className="w-4 h-4" />
//                   <span>Partager</span>
//                 </button>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="bg-white border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Statistiques</h4>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Candidatures</span>
//                     <span className="text-lg font-semibold text-blue-600">{selectedJob.applicants}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Vues</span>
//                     <span className="text-lg font-semibold text-green-600">{selectedJob.views}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Sauvegardes</span>
//                     <span className="text-lg font-semibold text-purple-600">{selectedJob.saves}</span>
//                   </div>

                  
