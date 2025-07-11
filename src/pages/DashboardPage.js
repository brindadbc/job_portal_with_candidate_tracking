// import React from 'react';
// import Navbar from '../components/common/Navbar';
// import DashboardStats from '../components/dashboard/DashboardStats';
// import RecentApplications from '../components/dashboard/RecentApplications';
// import QuickActions from '../components/dashboard/QuickActions';
// import { useAuth } from '../contexts/AuthContext';
// import '../styles/pages/DashboardPage.css';

// const DashboardPage = () => {
//   const { user } = useAuth();

//   return (
//     <div className="dashboard-page">
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="dashboard-header">
//           <h1>Tableau de bord</h1>
//           <p>Bienvenue, {user?.name}</p>
//         </div>
        
//         <div className="dashboard-content">
//           <DashboardStats />
//           <div className="dashboard-grid">
//             <RecentApplications />
//             <QuickActions />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;














// import React, { useState, useEffect } from 'react';

// import Navbar from '../components/common/Navbar';
// import DashboardStats from '../components/dashboard/DashboardStats';
// import { useAuth } from '../contexts/AuthContext';
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
//   MoreHorizontal,
//   TrendingUp,
//   Eye,
//   Heart,
//   Bookmark,
//   Send,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   Users,
//   Building,
//   Calendar,
//   DollarSign,
//   Target,
//   Award,
//   Activity,
//   BarChart3,
//   PieChart,
//   ArrowUp,
//   ArrowDown,
//   Star,
//   MapPin,
//   Download,
//   Upload,
//   Plus,
//   X
// } from 'lucide-react';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('candidate');
//   const [selectedPeriod, setSelectedPeriod] = useState('7d');
//   const [notifications, setNotifications] = useState([]);
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

//     if (activeTab === 'candidate') {
//       animateValue(0, 23, 1000, 'applications');
//       animateValue(0, 8, 1000, 'interviews');
//       animateValue(0, 156, 1000, 'profileViews');
//       animateValue(0, 92, 1000, 'matchRate');
//     } else {
//       animateValue(0, 45, 1000, 'activeJobs');
//       animateValue(0, 234, 1000, 'applications');
//       animateValue(0, 67, 1000, 'candidates');
//       animateValue(0, 12, 1000, 'hired');
//     }
//   }, [activeTab]);

//   const candidateStats = [
//     { 
//       id: 'applications', 
//       label: 'Candidatures', 
//       value: animatedStats.applications || 0, 
//       change: '+12%',
//       trend: 'up',
//       icon: FileText,
//       color: 'bg-blue-500'
//     },
//     { 
//       id: 'interviews', 
//       label: 'Entretiens', 
//       value: animatedStats.interviews || 0, 
//       change: '+5%',
//       trend: 'up',
//       icon: MessageSquare,
//       color: 'bg-green-500'
//     },
//     { 
//       id: 'profileViews', 
//       label: 'Vues du profil', 
//       value: animatedStats.profileViews || 0, 
//       change: '+23%',
//       trend: 'up',
//       icon: Eye,
//       color: 'bg-purple-500'
//     },
//     { 
//       id: 'matchRate', 
//       label: 'Taux de match', 
//       value: `${animatedStats.matchRate || 0}%`, 
//       change: '+8%',
//       trend: 'up',
//       icon: Target,
//       color: 'bg-orange-500'
//     }
//   ];

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

//   const recentApplications = [
//     { id: 1, company: 'Google', position: 'Senior UX Designer', status: 'En cours', date: '2024-01-15', salary: '80k-120k' },
//     { id: 2, company: 'Meta', position: 'Frontend Developer', status: 'Entretien', date: '2024-01-12', salary: '90k-130k' },
//     { id: 3, company: 'Apple', position: 'Product Manager', status: 'Refusé', date: '2024-01-10', salary: '100k-150k' },
//     { id: 4, company: 'Microsoft', position: 'Data Scientist', status: 'Accepté', date: '2024-01-08', salary: '95k-135k' }
//   ];

//   const recentJobPostings = [
//     { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Actif', date: '2024-01-15', location: 'Paris' },
//     { id: 2, title: 'UX Designer', applicants: 23, status: 'Actif', date: '2024-01-12', location: 'Remote' },
//     { id: 3, title: 'Product Manager', applicants: 67, status: 'Fermé', date: '2024-01-10', location: 'Lyon' },
//     { id: 4, title: 'DevOps Engineer', applicants: 34, status: 'Actif', date: '2024-01-08', location: 'Marseille' }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'En cours': case 'Actif': return 'bg-blue-100 text-blue-800';
//       case 'Entretien': return 'bg-yellow-100 text-yellow-800';
//       case 'Accepté': return 'bg-green-100 text-green-800';
//       case 'Refusé': case 'Fermé': return 'bg-red-100 text-red-800';
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

//   const CandidateDashboard = () => (
//     <div className="dashboard-content">
//       <div className="dashboard-header">
//         <div>
//           <h1 className="dashboard-title">Tableau de bord Candidat</h1>
//           <p className="dashboard-subtitle">Suivez l'évolution de vos candidatures</p>
//         </div>
//         <div className="header-actions">
//           <button className="btn-secondary">
//             <Download className="w-4 h-4 mr-2" />
//             Exporter CV
//           </button>
//           <button className="btn-primary">
//             <Plus className="w-4 h-4 mr-2" />
//             Nouvelle candidature
//           </button>
//         </div>
//       </div>

//       <div className="stats-grid">
//         {candidateStats.map((stat, index) => (
//           <StatCard key={stat.id} stat={stat} index={index} />
//         ))}
//       </div>

//       <div className="dashboard-grid">
//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Candidatures récentes</h3>
//             <button className="btn-icon">
//               <MoreHorizontal className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="applications-list">
//             {recentApplications.map((app) => (
//               <div key={app.id} className="application-item">
//                 <div className="application-info">
//                   <div className="application-company">{app.company}</div>
//                   <div className="application-position">{app.position}</div>
//                   <div className="application-meta">
//                     <span className="application-salary">{app.salary}</span>
//                     <span className="application-date">{app.date}</span>
//                   </div>
//                 </div>
//                 <div className="application-actions">
//                   <span className={`status-badge ${getStatusColor(app.status)}`}>
//                     {app.status}
//                   </span>
//                   <button className="btn-icon">
//                     <Eye className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Progression des candidatures</h3>
//             <select 
//               className="period-select"
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//             >
//               <option value="7d">7 jours</option>
//               <option value="30d">30 jours</option>
//               <option value="3m">3 mois</option>
//             </select>
//           </div>
//           <div className="chart-container">
//             <div className="chart-placeholder">
//               <BarChart3 className="w-12 h-12 text-gray-400" />
//               <p className="chart-text">Graphique des candidatures</p>
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Prochains entretiens</h3>
//             <button className="btn-text">Voir tout</button>
//           </div>
//           <div className="interviews-list">
//             <div className="interview-item">
//               <div className="interview-time">
//                 <div className="interview-date">15 Jan</div>
//                 <div className="interview-hour">14:00</div>
//               </div>
//               <div className="interview-details">
//                 <div className="interview-company">Google</div>
//                 <div className="interview-type">Entretien technique</div>
//                 <div className="interview-location">
//                   <MapPin className="w-3 h-3" />
//                   Visioconférence
//                 </div>
//               </div>
//               <button className="btn-primary-sm">Rejoindre</button>
//             </div>
//             <div className="interview-item">
//               <div className="interview-time">
//                 <div className="interview-date">18 Jan</div>
//                 <div className="interview-hour">10:30</div>
//               </div>
//               <div className="interview-details">
//                 <div className="interview-company">Meta</div>
//                 <div className="interview-type">Entretien RH</div>
//                 <div className="interview-location">
//                   <MapPin className="w-3 h-3" />
//                   Paris, France
//                 </div>
//               </div>
//               <button className="btn-secondary-sm">Détails</button>
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Recommandations</h3>
//           </div>
//           <div className="recommendations-list">
//             <div className="recommendation-item">
//               <div className="recommendation-icon">
//                 <Target className="w-5 h-5 text-blue-500" />
//               </div>
//               <div className="recommendation-content">
//                 <div className="recommendation-title">Optimisez votre profil</div>
//                 <div className="recommendation-text">Ajoutez 3 compétences pour augmenter vos chances</div>
//               </div>
//               <button className="btn-text">Optimiser</button>
//             </div>
//             <div className="recommendation-item">
//               <div className="recommendation-icon">
//                 <FileText className="w-5 h-5 text-green-500" />
//               </div>
//               <div className="recommendation-content">
//                 <div className="recommendation-title">Nouveau CV suggéré</div>
//                 <div className="recommendation-text">Basé sur vos dernières expériences</div>
//               </div>
//               <button className="btn-text">Télécharger</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const RecruiterDashboard = () => (
//     <div className="dashboard-content">
//       <div className="dashboard-header">
//         <div>
//           <h1 className="dashboard-title">Tableau de bord Recruteur</h1>
//           <p className="dashboard-subtitle">Gérez vos offres et candidatures</p>
//         </div>
//         <div className="header-actions">
//           <button className="btn-secondary">
//             <Upload className="w-4 h-4 mr-2" />
//             Importer candidats
//           </button>
//           <button className="btn-primary">
//             <Plus className="w-4 h-4 mr-2" />
//             Publier une offre
//           </button>
//         </div>
//       </div>

//       <div className="stats-grid">
//         {recruiterStats.map((stat, index) => (
//           <StatCard key={stat.id} stat={stat} index={index} />
//         ))}
//       </div>

//       <div className="dashboard-grid">
//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Offres d'emploi</h3>
//             <button className="btn-icon">
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="jobs-list">
//             {recentJobPostings.map((job) => (
//               <div key={job.id} className="job-item">
//                 <div className="job-info">
//                   <div className="job-title">{job.title}</div>
//                   <div className="job-meta">
//                     <span className="job-location">{job.location}</span>
//                     <span className="job-date">{job.date}</span>
//                   </div>
//                 </div>
//                 <div className="job-stats">
//                   <div className="job-applicants">
//                     <Users className="w-4 h-4" />
//                     {job.applicants} candidatures
//                   </div>
//                   <span className={`status-badge ${getStatusColor(job.status)}`}>
//                     {job.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Candidatures par mois</h3>
//             <select 
//               className="period-select"
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//             >
//               <option value="6m">6 mois</option>
//               <option value="1y">1 an</option>
//               <option value="2y">2 ans</option>
//             </select>
//           </div>
//           <div className="chart-container">
//             <div className="chart-placeholder">
//               <Activity className="w-12 h-12 text-gray-400" />
//               <p className="chart-text">Graphique des candidatures</p>
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Candidats à examiner</h3>
//             <button className="btn-text">Voir tout</button>
//           </div>
//           <div className="candidates-list">
//             <div className="candidate-item">
//               <div className="candidate-avatar">
//                 <img src="https://via.placeholder.com/40x40" alt="Candidat" />
//               </div>
//               <div className="candidate-info">
//                 <div className="candidate-name">Marie Dubois</div>
//                 <div className="candidate-position">Senior React Developer</div>
//                 <div className="candidate-match">
//                   <Star className="w-3 h-3 text-yellow-500" />
//                   95% match
//                 </div>
//               </div>
//               <div className="candidate-actions">
//                 <button className="btn-primary-sm">Examiner</button>
//                 <button className="btn-icon">
//                   <Heart className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//             <div className="candidate-item">
//               <div className="candidate-avatar">
//                 <img src="https://via.placeholder.com/40x40" alt="Candidat" />
//               </div>
//               <div className="candidate-info">
//                 <div className="candidate-name">Jean Martin</div>
//                 <div className="candidate-position">UX Designer</div>
//                 <div className="candidate-match">
//                   <Star className="w-3 h-3 text-yellow-500" />
//                   89% match
//                 </div>
//               </div>
//               <div className="candidate-actions">
//                 <button className="btn-primary-sm">Examiner</button>
//                 <button className="btn-icon">
//                   <Heart className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h3 className="card-title">Performance des offres</h3>
//           </div>
//           <div className="performance-list">
//             <div className="performance-item">
//               <div className="performance-metric">
//                 <div className="metric-label">Taux de conversion</div>
//                 <div className="metric-value">12.5%</div>
//               </div>
//               <div className="performance-change positive">
//                 <ArrowUp className="w-3 h-3" />
//                 +2.3%
//               </div>
//             </div>
//             <div className="performance-item">
//               <div className="performance-metric">
//                 <div className="metric-label">Temps de recrutement</div>
//                 <div className="metric-value">23 jours</div>
//               </div>
//               <div className="performance-change negative">
//                 <ArrowDown className="w-3 h-3" />
//                 -1.5 jours
//               </div>
//             </div>
//             <div className="performance-item">
//               <div className="performance-metric">
//                 <div className="metric-label">Satisfaction candidats</div>
//                 <div className="metric-value">4.8/5</div>
//               </div>
//               <div className="performance-change positive">
//                 <ArrowUp className="w-3 h-3" />
//                 +0.2
//               </div>
//             </div>
//           </div>
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
//             <User className="w-5 h-5" />
//             <span>{activeTab === 'candidate' ? 'Mon profil' : 'Profil entreprise'}</span>
//           </div>
//           <div className="nav-item">
//             <Briefcase className="w-5 h-5" />
//             <span>{activeTab === 'candidate' ? 'Mes candidatures' : 'Mes offres'}</span>
//           </div>
//           <div className="nav-item">
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//             <span className="nav-badge">3</span>
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
//        <Navbar />
      
//       <div className="main-content">
//         <div className="top-bar">
//           <div className="breadcrumb">
//             <span className="breadcrumb-item">Accueil</span>
//             <span className="breadcrumb-separator">/</span>
//             <span className="breadcrumb-item active">Tableau de bord</span>
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
            
//             <div className="user-toggle">
//               <button 
//                 className={`toggle-btn ${activeTab === 'candidate' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('candidate')}
//               >
//                 <User className="w-4 h-4" />
//                 Candidat
//               </button>
//               <button 
//                 className={`toggle-btn ${activeTab === 'recruiter' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('recruiter')}
//               >
//                 <Building className="w-4 h-4" />
//                 Recruteur
//               </button>
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

//         {activeTab === 'candidate' ? <CandidateDashboard /> : <RecruiterDashboard />}
//       </div>

//       <style jsx>{`
//         .dashboard {
//           display: flex;
//           min-height: 100vh;
//           background: #f8fafc;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .sidebar {
//           width: 260px;
//           background: white;
//           border-right: 1px solid #e2e8f0;
//           position: fixed;
//           height: 100vh;
//           z-index: 100;
//         }

//         .sidebar-header {
//           padding: 24px;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .logo {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .logo-icon {
//           width: 40px;
//           height: 40px;
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: 700;
//           font-size: 16px;
//         }

//         .logo-text {
//           font-size: 18px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         .sidebar-nav {
//           padding: 24px 0;
//         }

//         .nav-section {
//           margin-bottom: 32px;
//         }

//         .nav-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 24px;
//           color: #64748b;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           position: relative;
//         }

//         .nav-item:hover {
//           background: #f1f5f9;
//           color: #3b82f6;
//         }

//         .nav-item.active {
//           background: #eff6ff;
//           color: #3b82f6;
//           border-right: 3px solid #3b82f6;
//         }

//         .nav-badge {
//           background: #ef4444;
//           color: white;
//           font-size: 12px;
//           padding: 2px 8px;
//           border-radius: 10px;
//           margin-left: auto;
//         }

//         .main-content {
//           flex: 1;
//           margin-left: 260px;
//         }

//         .top-bar {
//           background: white;
//           border-bottom: 1px solid #e2e8f0;
//           padding: 16px 24px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           position: sticky;
//           top: 0;
//           z-index: 50;
//         }

//         .breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #64748b;
//           font-size: 14px;
//         }

//         .breadcrumb-item.active {
//           color: #1e293b;
//         }

//         .breadcrumb-separator {
//           color: #cbd5e1;
//         }

//         .top-actions {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .search-box {
//           position: relative;
//           display: flex;
//           align-items: center;
//         }

//         .search-input {
//           width: 300px;
//           padding: 8px 12px 8px 36px;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           font-size: 14px;
//           background: #f8fafc;
//           transition: all 0.2s ease;
//         }

//         .search-input:focus {
//           outline: none;
//           border-color: #3b82f6;
//           background: white;
//         }

//         .search-box svg {
//           position: absolute;
//           left: 12px;
//           pointer-events: none;
//         }

//         .user-toggle {
//           display: flex;
//           background: #f1f5f9;
//           border-radius: 8px;
//           padding: 2px;
//         }

//         .toggle-btn {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 16px;
//           border: none;
//           background: transparent;
//           color: #64748b;
//           font-size: 14px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .toggle-btn.active {
//           background: white;
//           color: #3b82f6;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }

//         .notification-btn {
//           position: relative;
//           width: 40px;
//           height: 40px;
//           border: none;
//           background: #f8fafc;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .notification-btn:hover {
//           background: #e2e8f0;
//         }

//         .notification-dot {
//           position: absolute;
//           top: 8px;
//           right: 8px;
//           width: 8px;
//           height: 8px;
//           background: #ef4444;
//           border-radius: 50%;
//           border: 2px solid white;
//         }

//         .user-avatar img {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           object-fit: cover;
//         }

//         .dashboard-content {
//           padding: 24px;
//         }

//         .dashboard-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 32px;
//         }

//         .dashboard-title {
//           font-size: 28px;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 4px;
//         }

//         .dashboard-subtitle {
//           color: #64748b;
//           font-size: 16px;
//         }

//         .header-actions {
//           display: flex;
//           gap: 12px;
//         }

//        .btn-primary, .btn-secondary {
//           display: flex;
//           align-items: center;
//           padding: 12px 20px;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           text-decoration: none;
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           color: white;
//         }

//         .btn-primary:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
//         }

//         .btn-secondary {
//           background: white;
//           color: #64748b;
//           border: 1px solid #e2e8f0;
//         }

//         .btn-secondary:hover {
//           background: #f8fafc;
//           border-color: #cbd5e1;
//         }

//         .btn-primary-sm, .btn-secondary-sm {
//           padding: 8px 16px;
//           font-size: 12px;
//           border-radius: 6px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           border: none;
//           text-decoration: none;
//         }

//         .btn-primary-sm {
//           background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           color: white;
//         }

//         .btn-primary-sm:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
//         }

//         .btn-secondary-sm {
//           background: white;
//           color: #64748b;
//           border: 1px solid #e2e8f0;
//         }

//         .btn-secondary-sm:hover {
//           background: #f8fafc;
//         }

//         .btn-text {
//           background: none;
//           border: none;
//           color: #3b82f6;
//           font-size: 14px;
//           cursor: pointer;
//           padding: 4px 8px;
//           border-radius: 4px;
//           transition: all 0.2s ease;
//         }

//         .btn-text:hover {
//           background: #eff6ff;
//         }

//         .btn-icon {
//           width: 32px;
//           height: 32px;
//           border: none;
//           background: none;
//           color: #64748b;
//           border-radius: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .btn-icon:hover {
//           background: #f1f5f9;
//           color: #3b82f6;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 24px;
//           margin-bottom: 32px;
//         }

//         .stat-card {
//           background: white;
//           padding: 24px;
//           border-radius: 16px;
//           border: 1px solid #e2e8f0;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           transition: all 0.3s ease;
//           opacity: 0;
//           transform: translateY(20px);
//           animation: slideInUp 0.6s ease forwards;
//         }

//         @keyframes slideInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
//           border-color: #cbd5e1;
//         }

//         .stat-icon-container {
//           position: relative;
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           overflow: hidden;
//         }

//         .stat-icon::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: inherit;
//           opacity: 0.1;
//           border-radius: inherit;
//         }

//         .stat-content {
//           flex: 1;
//         }

//         .stat-value {
//           font-size: 28px;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 4px;
//         }

//         .stat-label {
//           font-size: 14px;
//           color: #64748b;
//           margin-bottom: 8px;
//         }

//         .stat-change {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .stat-change.positive {
//           color: #10b981;
//         }

//         .stat-change.negative {
//           color: #ef4444;
//         }

//         .dashboard-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 24px;
//         }

//         .dashboard-card {
//           background: white;
//           border-radius: 16px;
//           border: 1px solid #e2e8f0;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }

//         .dashboard-card:hover {
//           box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
//           border-color: #cbd5e1;
//         }

//         .card-header {
//           padding: 20px 24px;
//           border-bottom: 1px solid #f1f5f9;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .card-title {
//           font-size: 18px;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .period-select {
//           padding: 6px 12px;
//           border: 1px solid #e2e8f0;
//           border-radius: 6px;
//           font-size: 14px;
//           background: white;
//           cursor: pointer;
//         }

//         .period-select:focus {
//           outline: none;
//           border-color: #3b82f6;
//         }

//         .applications-list, .jobs-list, .candidates-list, .interviews-list, .recommendations-list, .performance-list {
//           padding: 0 24px 24px;
//         }

//         .application-item, .job-item, .candidate-item, .interview-item, .recommendation-item, .performance-item {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 16px 0;
//           border-bottom: 1px solid #f1f5f9;
//           transition: all 0.2s ease;
//         }

//         .application-item:last-child, .job-item:last-child, .candidate-item:last-child, .interview-item:last-child, .recommendation-item:last-child, .performance-item:last-child {
//           border-bottom: none;
//         }

//         .application-item:hover, .job-item:hover, .candidate-item:hover, .interview-item:hover, .recommendation-item:hover, .performance-item:hover {
//           background: #f8fafc;
//           margin: 0 -24px;
//           padding: 16px 24px;
//           border-radius: 8px;
//         }

//         .application-info, .job-info, .candidate-info, .interview-details, .recommendation-content, .performance-metric {
//           flex: 1;
//         }

//         .application-company, .job-title, .candidate-name, .interview-company, .recommendation-title, .metric-label {
//           font-weight: 600;
//           color: #1e293b;
//           margin-bottom: 4px;
//         }

//         .application-position, .job-meta, .candidate-position, .interview-type, .recommendation-text, .metric-value {
//           color: #64748b;
//           font-size: 14px;
//           margin-bottom: 8px;
//         }

//         .application-meta, .job-meta, .candidate-match, .interview-location {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           font-size: 12px;
//           color: #94a3b8;
//         }

//         .application-salary, .job-location, .job-applicants {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .application-actions, .job-stats, .candidate-actions {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .status-badge {
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .interview-time {
//           text-align: center;
//           margin-right: 16px;
//         }

//         .interview-date {
//           font-size: 12px;
//           color: #64748b;
//         }

//         .interview-hour {
//           font-size: 16px;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .candidate-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           overflow: hidden;
//           margin-right: 12px;
//         }

//         .candidate-avatar img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .recommendation-icon {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: #f8fafc;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-right: 12px;
//         }

//         .performance-change {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           font-weight: 500;
//           padding: 4px 8px;
//           border-radius: 4px;
//         }

//         .performance-change.positive {
//           color: #10b981;
//           background: #ecfdf5;
//         }

//         .performance-change.negative {
//           color: #ef4444;
//           background: #fef2f2;
//         }

//         .chart-container {
//           padding: 40px 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-height: 200px;
//         }

//         .chart-placeholder {
//           text-align: center;
//           color: #94a3b8;
//         }

//         .chart-text {
//           margin-top: 12px;
//           font-size: 14px;
//         }

//         .metric-value {
//           font-size: 20px;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         /* Animations avancées */
//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//         }

//         .dashboard-card {
//           animation: fadeInScale 0.6s ease forwards;
//         }

//         .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
//         .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
//         .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
//         .dashboard-card:nth-child(4) { animation-delay: 0.4s; }

//         .notification-dot {
//           animation: pulse 2s infinite;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .sidebar {
//             width: 220px;
//           }
          
//           .main-content {
//             margin-left: 220px;
//           }
          
//           .dashboard-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .stats-grid {
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           }
//         }

//         @media (max-width: 768px) {
//           .sidebar {
//             width: 100%;
//             position: fixed;
//             left: -100%;
//             transition: left 0.3s ease;
//             z-index: 1000;
//           }
          
//           .sidebar.open {
//             left: 0;
//           }
          
//           .main-content {
//             margin-left: 0;
//           }
          
//           .dashboard-content {
//             padding: 16px;
//           }
          
//           .dashboard-header {
//             flex-direction: column;
//             gap: 16px;
//             align-items: flex-start;
//           }
          
//           .header-actions {
//             width: 100%;
//             justify-content: space-between;
//           }
          
//           .stats-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .top-actions {
//             flex-wrap: wrap;
//             gap: 8px;
//           }
          
//           .search-input {
//             width: 200px;
//           }
//         }

//         /* Effets de survol avancés */
//         .stat-card:hover .stat-icon {
//           transform: scale(1.1);
//         }

//         .nav-item:hover {
//           transform: translateX(4px);
//         }

//         .btn-primary:hover {
//           background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
//         }

//         /* Transitions fluides */
//         * {
//           transition: all 0.2s ease;
//         }

//         /* Scrollbar personnalisée */
//         .applications-list::-webkit-scrollbar,
//         .jobs-list::-webkit-scrollbar,
//         .candidates-list::-webkit-scrollbar {
//           width: 4px;
//         }

//         .applications-list::-webkit-scrollbar-track,
//         .jobs-list::-webkit-scrollbar-track,
//         .candidates-list::-webkit-scrollbar-track {
//           background: #f1f5f9;
//         }

//         .applications-list::-webkit-scrollbar-thumb,
//         .jobs-list::-webkit-scrollbar-thumb,
//         .candidates-list::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 2px;
//         }

//         /* États de focus améliorés */
//         .search-input:focus,
//         .period-select:focus {
//           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//         }

//         /* Animations de chargement */
//         @keyframes shimmer {
//           0% {
//             background-position: -200px 0;
//           }
//           100% {
//             background-position: calc(200px + 100%) 0;
//           }
//         }

//         .loading-shimmer {
//           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//           background-size: 200px 100%;
//           animation: shimmer 1.5s infinite;
//         }

//         /* Micro-interactions */
//         .btn-primary:active {
//           transform: translateY(1px);
//         }

//         .stat-card:active {
//           transform: translateY(-2px);
//         }

//         /* Couleurs de thème */
//         :root {
//           --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//           --success-color: #10b981;
//           --warning-color: #f59e0b;
//           --error-color: #ef4444;
//           --info-color: #3b82f6;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DashboardPage;


