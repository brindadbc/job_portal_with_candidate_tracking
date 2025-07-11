// // // import React from 'react';

// // // const DashboardStats = () => {
// // //   const stats = [
// // //     {
// // //       title: 'Candidatures envoyées',
// // //       value: 12,
// // //       icon: '📝',
// // //       color: 'blue'
// // //     },
// // //     {
// // //       title: 'Entretiens programmés',
// // //       value: 3,
// // //       icon: '🗣️',
// // //       color: 'green'
// // //     },
// // //     {
// // //       title: 'Réponses reçues',
// // //       value: 8,
// // //       icon: '📧',
// // //       color: 'purple'
// // //     },
// // //     {
// // //       title: 'Offres sauvegardées',
// // //       value: 15,
// // //       icon: '❤️',
// // //       color: 'red'
// // //     }
// // //   ];

// // //   return (
// // //     <div className="dashboard-stats">
// // //       <div className="stats-grid">
// // //         {stats.map((stat, index) => (
// // //           <div key={index} className={`stat-card ${stat.color}`}>
// // //             <div className="stat-icon">{stat.icon}</div>
// // //             <div className="stat-info">
// // //               <h3>{stat.value}</h3>
// // //               <p>{stat.title}</p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DashboardStats;



// // import React, { useState, useEffect } from 'react';
// // import '../styles/pages/DashboardPage.css';
// // import { 
// //   Briefcase, 
// //   FileText, 
// //   Star, 
// //   TrendingUp, 
// //   MessageCircle, 
// //   Eye, 
// //   Calendar,
// //   MapPin,
// //   Clock,
// //   ChevronRight,
// //   Bell,
// //   User,
// //   Settings,
// //   Download,
// //   Upload,
// //   Search,
// //   Filter,
// //   Heart,
// //   Building,
// //   DollarSign,
// //   CheckCircle,
// //   AlertCircle,
// //   XCircle
// // } from 'lucide-react';

// // const CandidateDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [applications, setApplications] = useState([]);
// //   const [savedJobs, setSavedJobs] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [notifications, setNotifications] = useState([]);

// //   // Données d'exemple
// //   const user = {
// //     name: "Jean Dupont",
// //     role: "candidate",
// //     avatar: null
// //   };

// //   useEffect(() => {
// //     // Charger les données du candidat
// //     loadCandidateData();
// //   }, []);

// //   const loadCandidateData = () => {
// //     // Données d'exemple des candidatures
// //     setApplications([
// //       {
// //         id: 1,
// //         jobTitle: "Frontend Developer",
// //         company: "TechCorp",
// //         companyLogo: "https://via.placeholder.com/40x40/3b82f6/ffffff?text=TC",
// //         appliedDate: "2024-01-15",
// //         status: "in_review",
// //         salary: "$70k-$90k",
// //         location: "Paris, France",
// //         type: "Full-time",
// //         interviewDate: "2024-01-20"
// //       },
// //       {
// //         id: 2,
// //         jobTitle: "UX Designer",
// //         company: "DesignStudio",
// //         companyLogo: "https://via.placeholder.com/40x40/8b5cf6/ffffff?text=DS",
// //         appliedDate: "2024-01-10",
// //         status: "accepted",
// //         salary: "$65k-$85k",
// //         location: "Remote",
// //         type: "Full-time"
// //       },
// //       {
// //         id: 3,
// //         jobTitle: "Product Manager",
// //         company: "InnovateCorp",
// //         companyLogo: "https://via.placeholder.com/40x40/10b981/ffffff?text=IC",
// //         appliedDate: "2024-01-12",
// //         status: "rejected",
// //         salary: "$80k-$100k",
// //         location: "Lyon, France",
// //         type: "Full-time"
// //       }
// //     ]);

// //     // Données d'exemple des emplois sauvegardés
// //     setSavedJobs([
// //       {
// //         id: 1,
// //         title: "Senior React Developer",
// //         company: "WebTech Solutions",
// //         location: "Paris, France",
// //         salary: "$75k-$95k",
// //         type: "Full-time",
// //         postedDate: "2024-01-18",
// //         urgent: true
// //       },
// //       {
// //         id: 2,
// //         title: "Mobile App Developer",
// //         company: "MobileFirst",
// //         location: "Remote",
// //         salary: "$70k-$90k",
// //         type: "Full-time",
// //         postedDate: "2024-01-16",
// //         urgent: false
// //       }
// //     ]);

// //     // Messages
// //     setMessages([
// //       {
// //         id: 1,
// //         sender: "TechCorp HR",
// //         subject: "Interview Schedule",
// //         preview: "Your interview is scheduled for tomorrow at 2 PM...",
// //         time: "2 hours ago",
// //         unread: true
// //       },
// //       {
// //         id: 2,
// //         sender: "DesignStudio",
// //         subject: "Application Update",
// //         preview: "We're pleased to inform you that your application...",
// //         time: "1 day ago",
// //         unread: false
// //       }
// //     ]);

// //     // Notifications
// //     setNotifications([
// //       {
// //         id: 1,
// //         type: "interview",
// //         message: "Upcoming interview with TechCorp tomorrow at 2 PM",
// //         time: "1 hour ago",
// //         read: false
// //       },
// //       {
// //         id: 2,
// //         type: "application",
// //         message: "Your application for UX Designer has been accepted",
// //         time: "2 days ago",
// //         read: true
// //       }
// //     ]);
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'pending': return 'status-pending';
// //       case 'in_review': return 'status-review';
// //       case 'interview': return 'status-interview';
// //       case 'accepted': return 'status-accepted';
// //       case 'rejected': return 'status-rejected';
// //       default: return 'status-default';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'pending': return <Clock className="w-4 h-4" />;
// //       case 'in_review': return <Eye className="w-4 h-4" />;
// //       case 'interview': return <Calendar className="w-4 h-4" />;
// //       case 'accepted': return <CheckCircle className="w-4 h-4" />;
// //       case 'rejected': return <XCircle className="w-4 h-4" />;
// //       default: return <AlertCircle className="w-4 h-4" />;
// //     }
// //   };

// //   const DashboardOverview = () => (
// //     <div className="dashboard-content">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon applications">
// //             <FileText className="w-6 h-6" />
// //           </div>
// //           <div className="stat-content">
// //             <div className="stat-number">{applications.length}</div>
// //             <div className="stat-label">Candidatures</div>
// //           </div>
// //         </div>
        
// //         <div className="stat-card">
// //           <div className="stat-icon saved">
// //             <Star className="w-6 h-6" />
// //           </div>
// //           <div className="stat-content">
// //             <div className="stat-number">{savedJobs.length}</div>
// //             <div className="stat-label">Emplois sauvegardés</div>
// //           </div>
// //         </div>
        
// //         <div className="stat-card">
// //           <div className="stat-icon messages">
// //             <MessageCircle className="w-6 h-6" />
// //           </div>
// //           <div className="stat-content">
// //             <div className="stat-number">{messages.filter(m => m.unread).length}</div>
// //             <div className="stat-label">Messages non lus</div>
// //           </div>
// //         </div>
        
// //         <div className="stat-card">
// //           <div className="stat-icon profile">
// //             <TrendingUp className="w-6 h-6" />
// //           </div>
// //           <div className="stat-content">
// //             <div className="stat-number">85%</div>
// //             <div className="stat-label">Profil complet</div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Activité récente</h3>
// //         <div className="activity-list">
// //           <div className="activity-item">
// //             <div className="activity-icon interview">
// //               <Calendar className="w-4 h-4" />
// //             </div>
// //             <div className="activity-content">
// //               <div className="activity-title">Entretien programmé</div>
// //               <div className="activity-description">TechCorp - Frontend Developer</div>
// //               <div className="activity-time">Demain à 14:00</div>
// //             </div>
// //           </div>
          
// //           <div className="activity-item">
// //             <div className="activity-icon accepted">
// //               <CheckCircle className="w-4 h-4" />
// //             </div>
// //             <div className="activity-content">
// //               <div className="activity-title">Candidature acceptée</div>
// //               <div className="activity-description">DesignStudio - UX Designer</div>
// //               <div className="activity-time">Il y a 2 jours</div>
// //             </div>
// //           </div>
          
// //           <div className="activity-item">
// //             <div className="activity-icon new">
// //               <Bell className="w-4 h-4" />
// //             </div>
// //             <div className="activity-content">
// //               <div className="activity-title">Nouveau message</div>
// //               <div className="activity-description">De TechCorp HR</div>
// //               <div className="activity-time">Il y a 2 heures</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const ApplicationsTab = () => (
// //     <div className="dashboard-content">
// //       <div className="content-header">
// //         <h3>Mes candidatures</h3>
// //         <div className="header-actions">
// //           <button className="btn btn-secondary">
// //             <Filter className="w-4 h-4" />
// //             Filtrer
// //           </button>
// //         </div>
// //       </div>
      
// //       <div className="applications-list">
// //         {applications.map(app => (
// //           <div key={app.id} className="application-card">
// //             <div className="application-header">
// //               <div className="company-info">
// //                 <div className="company-logo">
// //                   <img src={app.companyLogo} alt={app.company} />
// //                 </div>
// //                 <div className="job-info">
// //                   <h4>{app.jobTitle}</h4>
// //                   <p>{app.company}</p>
// //                 </div>
// //               </div>
// //               <div className={`status-badge ${getStatusColor(app.status)}`}>
// //                 {getStatusIcon(app.status)}
// //                 <span>{app.status}</span>
// //               </div>
// //             </div>
            
// //             <div className="application-details">
// //               <div className="detail-item">
// //                 <MapPin className="w-4 h-4" />
// //                 <span>{app.location}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <Briefcase className="w-4 h-4" />
// //                 <span>{app.type}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <DollarSign className="w-4 h-4" />
// //                 <span>{app.salary}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <Calendar className="w-4 h-4" />
// //                 <span>Candidature: {app.appliedDate}</span>
// //               </div>
// //             </div>
            
// //             {app.interviewDate && (
// //               <div className="interview-info">
// //                 <Calendar className="w-4 h-4" />
// //                 <span>Entretien: {app.interviewDate}</span>
// //               </div>
// //             )}
            
// //             <div className="application-actions">
// //               <button className="btn btn-outline">Voir détails</button>
// //               <button className="btn btn-primary">Contacter</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   const SavedJobsTab = () => (
// //     <div className="dashboard-content">
// //       <div className="content-header">
// //         <h3>Emplois sauvegardés</h3>
// //         <div className="header-actions">
// //           <button className="btn btn-secondary">
// //             <Search className="w-4 h-4" />
// //             Rechercher
// //           </button>
// //         </div>
// //       </div>
      
// //       <div className="saved-jobs-list">
// //         {savedJobs.map(job => (
// //           <div key={job.id} className="saved-job-card">
// //             <div className="job-header">
// //               <div className="job-info">
// //                 <h4>{job.title}</h4>
// //                 <p>{job.company}</p>
// //               </div>
// //               {job.urgent && (
// //                 <div className="urgent-badge">
// //                   <Clock className="w-3 h-3" />
// //                   Urgent
// //                 </div>
// //               )}
// //             </div>
            
// //             <div className="job-details">
// //               <div className="detail-item">
// //                 <MapPin className="w-4 h-4" />
// //                 <span>{job.location}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <Briefcase className="w-4 h-4" />
// //                 <span>{job.type}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <DollarSign className="w-4 h-4" />
// //                 <span>{job.salary}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <Clock className="w-4 h-4" />
// //                 <span>Publié: {job.postedDate}</span>
// //               </div>
// //             </div>
            
// //             <div className="job-actions">
// //               <button className="btn btn-outline">
// //                 <Heart className="w-4 h-4" />
// //                 Retirer
// //               </button>
// //               <button className="btn btn-primary">
// //                 Postuler
// //                 <ChevronRight className="w-4 h-4" />
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   const MessagesTab = () => (
// //     <div className="dashboard-content">
// //       <div className="content-header">
// //         <h3>Messages</h3>
// //         <div className="header-actions">
// //           <button className="btn btn-primary">Nouveau message</button>
// //         </div>
// //       </div>
      
// //       <div className="messages-list">
// //         {messages.map(message => (
// //           <div key={message.id} className={`message-card ${message.unread ? 'unread' : ''}`}>
// //             <div className="message-header">
// //               <div className="sender-info">
// //                 <div className="sender-avatar">
// //                   {message.sender.charAt(0)}
// //                 </div>
// //                 <div className="sender-details">
// //                   <h4>{message.sender}</h4>
// //                   <p>{message.subject}</p>
// //                 </div>
// //               </div>
// //               <div className="message-time">{message.time}</div>
// //             </div>
// //             <div className="message-preview">{message.preview}</div>
// //             <div className="message-actions">
// //               <button className="btn btn-outline">Répondre</button>
// //               <button className="btn btn-secondary">Marquer comme lu</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   const ProfileTab = () => (
// //     <div className="dashboard-content">
// //       <div className="content-header">
// //         <h3>Mon profil</h3>
// //         <div className="header-actions">
// //           <button className="btn btn-secondary">
// //             <Download className="w-4 h-4" />
// //             Télécharger CV
// //           </button>
// //           <button className="btn btn-primary">
// //             <Upload className="w-4 h-4" />
// //             Modifier
// //           </button>
// //         </div>
// //       </div>
      
// //       <div className="profile-content">
// //         <div className="profile-card">
// //           <div className="profile-header">
// //             <div className="profile-avatar-large">
// //               {user.avatar ? (
// //                 <img src={user.avatar} alt={user.name} />
// //               ) : (
// //                 <User className="w-12 h-12" />
// //               )}
// //             </div>
// //             <div className="profile-info">
// //               <h2>{user.name}</h2>
// //               <p className="profile-title">Frontend Developer</p>
// //               <p className="profile-location">Paris, France</p>
// //             </div>
// //           </div>
          
// //           <div className="profile-stats">
// //             <div className="stat-item">
// //               <span className="stat-value">85%</span>
// //               <span className="stat-label">Profil complet</span>
// //             </div>
// //             <div className="stat-item">
// //               <span className="stat-value">12</span>
// //               <span className="stat-label">Candidatures</span>
// //             </div>
// //             <div className="stat-item">
// //               <span className="stat-value">3</span>
// //               <span className="stat-label">Entretiens</span>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="profile-sections">
// //           <div className="section">
// //             <h4>À propos</h4>
// //             <p>Développeur frontend passionné avec 3 ans d'expérience en React et JavaScript. Spécialisé dans la création d'interfaces utilisateur modernes et responsive.</p>
// //           </div>
          
// //           <div className="section">
// //             <h4>Compétences</h4>
// //             <div className="skills-grid">
// //               <div className="skill-tag">React</div>
// //               <div className="skill-tag">JavaScript</div>
// //               <div className="skill-tag">TypeScript</div>
// //               <div className="skill-tag">CSS/SCSS</div>
// //               <div className="skill-tag">Node.js</div>
// //               <div className="skill-tag">Git</div>
// //             </div>
// //           </div>
          
// //           <div className="section">
// //             <h4>Expérience</h4>
// //             <div className="experience-item">
// //               <div className="exp-header">
// //                 <h5>Frontend Developer</h5>
// //                 <span className="exp-period">2022 - Présent</span>
// //               </div>
// //               <p className="exp-company">TechStartup Inc.</p>
// //               <p className="exp-description">Développement d'applications web modernes avec React et TypeScript.</p>
// //             </div>
// //           </div>
          
// //           <div className="section">
// //             <h4>Formation</h4>
// //             <div className="education-item">
// //               <div className="edu-header">
// //                 <h5>Master en Informatique</h5>
// //                 <span className="edu-period">2020 - 2022</span>
// //               </div>
// //               <p className="edu-school">Université Paris-Saclay</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="dashboard-layout">
// //       {/* Navbar intégrée */}
// //       <nav className="navbar">
// //         <div className="nav-container">
// //           <div className="logo">
// //             <div className="logo-icon">JT</div>
// //             JobTracks
// //           </div>
          
// //           <div className="nav-center">
// //             <ul className="nav-links">
// //               <li><a href="/">Accueil</a></li>
// //               <li><a href="/jobs">Emplois</a></li>
// //               <li><a href="/company">Entreprises</a></li>
// //               <li><a href="/contact">Contact</a></li>
// //             </ul>
// //           </div>
          
// //           <div className="nav-right">
// //             <div className="user-section">
// //               <div className="notification-bell">
// //                 <Bell className="w-5 h-5" />
// //                 <span className="notification-badge">3</span>
// //               </div>
              
// //               <div className="message-icon">
// //                 <MessageCircle className="w-5 h-5" />
// //                 <span className="message-badge">5</span>
// //               </div>
              
// //               <div className="profile-info">
// //                 <div className="profile-avatar">
// //                   <span className="avatar-initials">JD</span>
// //                 </div>
// //                 <div className="profile-details">
// //                   <span className="profile-name">{user.name}</span>
// //                   <span className="profile-role">{user.role}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Dashboard principal */}
// //       <div className="dashboard-container">
// //         <div className="dashboard-sidebar">
// //           <div className="sidebar-header">
// //             <h2>Dashboard</h2>
// //             <p>Bienvenue, {user.name}</p>
// //           </div>
          
// //           <nav className="sidebar-nav">
// //             <button 
// //               className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('overview')}
// //             >
// //               <TrendingUp className="w-5 h-5" />
// //               <span>Vue d'ensemble</span>
// //             </button>
            
// //             <button 
// //               className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('applications')}
// //             >
// //               <FileText className="w-5 h-5" />
// //               <span>Mes candidatures</span>
// //               <span className="badge">{applications.length}</span>
// //             </button>
            
// //             <button 
// //               className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('saved')}
// //             >
// //               <Star className="w-5 h-5" />
// //               <span>Emplois sauvegardés</span>
// //               <span className="badge">{savedJobs.length}</span>
// //             </button>
            
// //             <button 
// //               className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('messages')}
// //             >
// //               <MessageCircle className="w-5 h-5" />
// //               <span>Messages</span>
// //               {messages.filter(m => m.unread).length > 0 && (
// //                 <span className="badge notification">{messages.filter(m => m.unread).length}</span>
// //               )}
// //             </button>
            
// //             <button 
// //               className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('profile')}
// //             >
// //               <User className="w-5 h-5" />
// //               <span>Mon profil</span>
// //             </button>
            
// //             <button 
// //               className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
// //               onClick={() => setActiveTab('settings')}
// //             >
// //               <Settings className="w-5 h-5" />
// //               <span>Paramètres</span>
// //             </button>
// //           </nav>
// //         </div>
        
// //         <div className="dashboard-main">
// //           <div className="main-header">
// //             <h1>
// //               {activeTab === 'overview' && 'Vue d\'ensemble'}
// //               {activeTab === 'applications' && 'Mes candidatures'}
// //               {activeTab === 'saved' && 'Emplois sauvegardés'}
// //               {activeTab === 'messages' && 'Messages'}
// //               {activeTab === 'profile' && 'Mon profil'}
// //               {activeTab === 'settings' && 'Paramètres'}
// //             </h1>
// //           </div>
          
// //           <div className="main-content">
// //             {activeTab === 'overview' && <DashboardOverview />}
// //             {activeTab === 'applications' && <ApplicationsTab />}
// //             {activeTab === 'saved' && <SavedJobsTab />}
// //             {activeTab === 'messages' && <MessagesTab />}
// //             {activeTab === 'profile' && <ProfileTab />}
// //             {activeTab === 'settings' && <div className="dashboard-content">Paramètres à venir...</div>}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateDashboard;
      
      

// import React, { useState, useEffect } from 'react';
// import { 
//   User, 
//   Briefcase, 
//   MessageSquare, 
//   Bell, 
//   Search, 
//   Filter, 
//   Calendar, 
//   MapPin, 
//   Clock, 
//   Eye, 
//   Send, 
//   Paperclip, 
//   Phone, 
//   Mail, 
//   Star,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   XCircle,
//   Plus,
//   Edit3,
//   Settings,
//   Download,
//   Upload
// } from 'lucide-react';

// const JobPortalDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [message, setMessage] = useState('');
//   const [notifications, setNotifications] = useState(3);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Données simulées
//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       company: 'TechCorp',
//       position: 'Développeur Full Stack',
//       status: 'En cours',
//       appliedDate: '2024-01-15',
//       location: 'Paris',
//       salary: '45-55k€',
//       logo: '🏢',
//       statusColor: 'bg-blue-500',
//       progress: 60
//     },
//     {
//       id: 2,
//       company: 'StartupXYZ',
//       position: 'Designer UX/UI',
//       status: 'Entretien',
//       appliedDate: '2024-01-12',
//       location: 'Lyon',
//       salary: '40-50k€',
//       logo: '🚀',
//       statusColor: 'bg-orange-500',
//       progress: 80
//     },
//     {
//       id: 3,
//       company: 'BigCompany',
//       position: 'Chef de Projet',
//       status: 'Accepté',
//       appliedDate: '2024-01-08',
//       location: 'Marseille',
//       salary: '50-60k€',
//       logo: '🏭',
//       statusColor: 'bg-green-500',
//       progress: 100
//     },
//     {
//       id: 4,
//       company: 'InnovTech',
//       position: 'Data Scientist',
//       status: 'Refusé',
//       appliedDate: '2024-01-05',
//       location: 'Toulouse',
//       salary: '55-65k€',
//       logo: '🔬',
//       statusColor: 'bg-red-500',
//       progress: 40
//     }
//   ]);

//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       company: 'TechCorp',
//       recruiter: 'Marie Dubois',
//       lastMessage: 'Nous aimerions planifier un entretien avec vous.',
//       timestamp: '14:30',
//       unread: 2,
//       avatar: '👩‍💼'
//     },
//     {
//       id: 2,
//       company: 'StartupXYZ',
//       recruiter: 'Pierre Martin',
//       lastMessage: 'Pouvez-vous nous envoyer votre portfolio ?',
//       timestamp: '11:45',
//       unread: 0,
//       avatar: '👨‍💻'
//     },
//     {
//       id: 3,
//       company: 'BigCompany',
//       recruiter: 'Sophie Laurent',
//       lastMessage: 'Félicitations ! Nous aimerions vous faire une offre.',
//       timestamp: 'Hier',
//       unread: 1,
//       avatar: '👩‍💼'
//     }
//   ]);

//   const [stats, setStats] = useState({
//     totalApplications: 24,
//     interviews: 6,
//     offers: 2,
//     responseRate: 75
//   });

//   const StatusIcon = ({ status }) => {
//     switch(status) {
//       case 'Accepté':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'En cours':
//         return <Clock className="w-4 h-4 text-blue-500" />;
//       case 'Entretien':
//         return <AlertCircle className="w-4 h-4 text-orange-500" />;
//       case 'Refusé':
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const StatCard = ({ title, value, icon: Icon, color, change }) => (
//     <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-xl ${color}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <div className="text-right">
//           <p className="text-2xl font-bold text-gray-800">{value}</p>
//           <p className="text-sm text-gray-500">{title}</p>
//         </div>
//       </div>
//       <div className="flex items-center text-sm">
//         <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//         <span className="text-green-500">+{change}%</span>
//         <span className="text-gray-500 ml-1">ce mois</span>
//       </div>
//     </div>
//   );

//   const ApplicationCard = ({ app }) => (
//     <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
//          onClick={() => setSelectedJob(app)}>
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center space-x-4">
//           <div className="text-3xl">{app.logo}</div>
//           <div>
//             <h3 className="font-semibold text-gray-800">{app.position}</h3>
//             <p className="text-gray-600">{app.company}</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <StatusIcon status={app.status} />
//           <span className={`px-3 py-1 rounded-full text-sm text-white ${app.statusColor}`}>
//             {app.status}
//           </span>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
//         <div className="flex items-center">
//           <MapPin className="w-4 h-4 mr-2" />
//           {app.location}
//         </div>
//         <div className="flex items-center">
//           <Calendar className="w-4 h-4 mr-2" />
//           {app.appliedDate}
//         </div>
//       </div>
      
//       <div className="mb-4">
//         <div className="flex justify-between text-sm mb-2">
//           <span>Progression</span>
//           <span>{app.progress}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div className={`h-2 rounded-full ${app.statusColor} transition-all duration-500`} 
//                style={{ width: `${app.progress}%` }}></div>
//         </div>
//       </div>
      
//       <div className="flex justify-between items-center">
//         <span className="font-semibold text-green-600">{app.salary}</span>
//         <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
//           <Eye className="w-4 h-4 mr-1" />
//           Voir détails
//         </button>
//       </div>
//     </div>
//   );

//   const MessageModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl w-full max-w-4xl h-3/4 flex">
//         {/* Liste des conversations */}
//         <div className="w-1/3 border-r border-gray-200 p-4">
//           <h3 className="font-semibold mb-4">Messages</h3>
//           <div className="space-y-3">
//             {conversations.map((conv) => (
//               <div key={conv.id} 
//                    className={`p-3 rounded-xl cursor-pointer transition-all ${
//                      selectedConversation?.id === conv.id 
//                        ? 'bg-blue-50 border-l-4 border-blue-500' 
//                        : 'hover:bg-gray-50'
//                    }`}
//                    onClick={() => setSelectedConversation(conv)}>
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-2xl">{conv.avatar}</span>
//                     <span className="font-medium">{conv.recruiter}</span>
//                   </div>
//                   {conv.unread > 0 && (
//                     <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//                       {conv.unread}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600 mb-1">{conv.company}</p>
//                 <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
//                 <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Zone de chat */}
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">{selectedConversation?.avatar}</span>
//                 <div>
//                   <h3 className="font-semibold">{selectedConversation?.recruiter}</h3>
//                   <p className="text-sm text-gray-500">{selectedConversation?.company}</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowMessageModal(false)} 
//                       className="text-gray-500 hover:text-gray-700">
//                 <XCircle className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 p-4 overflow-y-auto">
//             {selectedConversation ? (
//               <div className="space-y-4">
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
//                     <p className="text-sm">Bonjour ! J'ai examiné votre profil et je suis très intéressé par votre candidature.</p>
//                     <p className="text-xs text-gray-500 mt-1">10:30</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-xs">
//                     <p className="text-sm">Merci beaucoup ! Je suis très motivé pour cette opportunité.</p>
//                     <p className="text-xs text-blue-100 mt-1">10:32</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
//                     <p className="text-sm">{selectedConversation.lastMessage}</p>
//                     <p className="text-xs text-gray-500 mt-1">{selectedConversation.timestamp}</p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 Sélectionnez une conversation pour commencer
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-t border-gray-200">
//             <div className="flex items-center space-x-2">
//               <button className="p-2 text-gray-500 hover:text-gray-700">
//                 <Paperclip className="w-5 h-5" />
//               </button>
//               <input 
//                 type="text" 
//                 placeholder="Tapez votre message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <Briefcase className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">JobPortal</h1>
//                 <p className="text-gray-600">Tableau de bord candidat</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                 <input 
//                   type="text" 
//                   placeholder="Rechercher..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//                 />
//               </div>
              
//               <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
//                 <Bell className="w-6 h-6" />
//                 {notifications > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {notifications}
//                   </span>
//                 )}
//               </button>
              
//               <button 
//                 onClick={() => setShowMessageModal(true)}
//                 className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
//                 <MessageSquare className="w-6 h-6" />
//               </button>
              
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
//                   <User className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">John Doe</p>
//                   <p className="text-xs text-gray-500">Développeur</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex space-x-8">
//             {[
//               { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
//               { id: 'applications', label: 'Candidatures', icon: Briefcase },
//               { id: 'messages', label: 'Messages', icon: MessageSquare },
//               { id: 'profile', label: 'Profil', icon: User }
//             ].map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => setActiveTab(id)}
//                 className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
//                   activeTab === id
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span>{label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Contenu principal */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* Statistiques */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <StatCard 
//                 title="Candidatures" 
//                 value={stats.totalApplications} 
//                 icon={Briefcase} 
//                 color="bg-blue-500"
//                 change={12}
//               />
//               <StatCard 
//                 title="Entretiens" 
//                 value={stats.interviews} 
//                 icon={Calendar} 
//                 color="bg-green-500"
//                 change={25}
//               />
//               <StatCard 
//                 title="Offres reçues" 
//                 value={stats.offers} 
//                 icon={Star} 
//                 color="bg-purple-500"
//                 change={50}
//               />
//               <StatCard 
//                 title="Taux de réponse" 
//                 value={`${stats.responseRate}%`} 
//                 icon={TrendingUp} 
//                 color="bg-orange-500"
//                 change={8}
//               />
//             </div>

//             {/* Candidatures récentes */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">Candidatures récentes</h2>
//                 <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
//                   <Plus className="w-5 h-5 mr-1" />
//                   Nouvelle candidature
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {applications.slice(0, 4).map((app) => (
//                   <ApplicationCard key={app.id} app={app} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'applications' && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-gray-800">Mes candidatures</h2>
//               <div className="flex items-center space-x-4">
//                 <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
//                   <Filter className="w-5 h-5 mr-2" />
//                   Filtrer
//                 </button>
//                 <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
//                   <Plus className="w-5 h-5 mr-2" />
//                   Nouvelle candidature
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {applications.map((app) => (
//                 <ApplicationCard key={app.id} app={app} />
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'messages' && (
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
//               <button 
//                 onClick={() => setShowMessageModal(true)}
//                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
//                 <MessageSquare className="w-5 h-5 mr-2" />
//                 Ouvrir la messagerie
//               </button>
//             </div>
//             <div className="space-y-4">
//               {conversations.map((conv) => (
//                 <div key={conv.id} 
//                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
//                   <span className="text-3xl mr-4">{conv.avatar}</span>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                       <h3 className="font-medium text-gray-800">{conv.recruiter}</h3>
//                       <span className="text-sm text-gray-500">{conv.timestamp}</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">{conv.company}</p>
//                     <p className="text-sm text-gray-500">{conv.lastMessage}</p>
//                   </div>
//                   {conv.unread > 0 && (
//                     <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-4">
//                       {conv.unread}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'profile' && (
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">Mon profil</h2>
//               <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
//                 <Edit3 className="w-5 h-5 mr-2" />
//                 Modifier
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <User className="w-12 h-12 text-white" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
//                   <p className="text-gray-600">Développeur Full Stack</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                     <span className="text-gray-600">john.doe@email.com</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-gray-400" />
//                     <span className="text-gray-600">+33 6 12 34 56 78</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <MapPin className="w-5 h-5 text-gray-400" />
//                     <span className="text-gray-600">Paris, France</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-medium text-gray-800 mb-3">Compétences</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'].map((skill) => (
//                       <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium text-gray-800 mb-3">Documents</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
//                       <span className="text-gray-700">CV_John_Doe.pdf</span>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Download className="w-5 h-5" />
//                       </button>
//                     </div>
//                     <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
//                       <span className="text-gray-700">Lettre_motivation.pdf</span>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Download className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Modal de messagerie */}
//       {showMessageModal && <MessageModal />}
//     </div>
//   );
// };

// <style jsx>{ `
// :root {
//   --primary-blue: #3B82F6;
//   --primary-blue-hover: #2563EB;
//   --primary-blue-light: #DBEAFE;
//   --secondary-purple: #8B5CF6;
//   --success-green: #10B981;
//   --warning-orange: #F59E0B;
//   --danger-red: #EF4444;
//   --gray-50: #F9FAFB;
//   --gray-100: #F3F4F6;
//   --gray-200: #E5E7EB;
//   --gray-300: #D1D5DB;
//   --gray-400: #9CA3AF;
//   --gray-500: #6B7280;
//   --gray-600: #4B5563;
//   --gray-700: #374151;
//   --gray-800: #1F2937;
//   --gray-900: #111827;
//   --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//   --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//   --transition-all: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   --transition-colors: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
//   --border-radius: 0.75rem;
//   --border-radius-lg: 1rem;
//   --border-radius-xl: 1.5rem;
// }

// /* Animations globales */
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes slideInLeft {
//   from {
//     opacity: 0;
//     transform: translateX(-30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// @keyframes slideInRight {
//   from {
//     opacity: 0;
//     transform: translateX(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// @keyframes pulse {
//   0%, 100% {
//     opacity: 1;
//   }
//   50% {
//     opacity: 0.8;
//   }
// }

// @keyframes bounce {
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
// }

// @keyframes shimmer {
//   0% {
//     background-position: -200px 0;
//   }
//   100% {
//     background-position: calc(200px + 100%) 0;
//   }
// }

// /* Conteneur principal du dashboard */
// .dashboard-container {
//   min-height: 100vh;
//   background: linear-gradient(135deg, #EBF8FF 0%, #E0E7FF 100%);
//   position: relative;
//   overflow-x: hidden;
// }

// .dashboard-container::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 100%;
//   background: 
//     radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
//     radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
//     radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
//   pointer-events: none;
//   z-index: 0;
// }

// /* Header du dashboard */
// .dashboard-header {
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(20px);
//   border-bottom: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
//   position: sticky;
//   top: 0;
//   z-index: 40;
//   animation: slideInLeft 0.6s ease-out;
// }

// .dashboard-header-content {
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 1rem 1.5rem;
// }

// .dashboard-header-inner {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

// .dashboard-logo {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .dashboard-logo-icon {
//   width: 2.5rem;
//   height: 2.5rem;
//   background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
//   border-radius: var(--border-radius);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: var(--transition-all);
//   box-shadow: var(--shadow-md);
// }

// .dashboard-logo-icon:hover {
//   transform: rotate(5deg) scale(1.05);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-logo-text h1 {
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: var(--gray-800);
//   margin: 0;
//   line-height: 1.2;
// }

// .dashboard-logo-text p {
//   color: var(--gray-600);
//   font-size: 0.875rem;
//   margin: 0;
// }

// .dashboard-header-actions {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .dashboard-search {
//   position: relative;
// }

// .dashboard-search input {
//   width: 16rem;
//   padding: 0.75rem 1rem 0.75rem 2.5rem;
//   border: 1px solid var(--gray-300);
//   border-radius: var(--border-radius);
//   background: white;
//   transition: var(--transition-all);
//   font-size: 0.875rem;
// }

// .dashboard-search input:focus {
//   outline: none;
//   border-color: var(--primary-blue);
//   box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   transform: translateY(-1px);
// }

// .dashboard-search-icon {
//   position: absolute;
//   left: 0.75rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: var(--gray-400);
//   pointer-events: none;
// }

// .dashboard-action-btn {
//   position: relative;
//   padding: 0.5rem;
//   color: var(--gray-600);
//   background: transparent;
//   border: none;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: var(--transition-all);
// }

// .dashboard-action-btn:hover {
//   color: var(--gray-800);
//   background: var(--gray-100);
//   transform: translateY(-2px);
// }

// .dashboard-notification-badge {
//   position: absolute;
//   top: -4px;
//   right: -4px;
//   width: 1.25rem;
//   height: 1.25rem;
//   background: var(--danger-red);
//   color: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 0.75rem;
//   font-weight: 600;
//   animation: pulse 2s infinite;
// }

// .dashboard-user-profile {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem;
//   border-radius: var(--border-radius);
//   transition: var(--transition-all);
//   cursor: pointer;
// }

// .dashboard-user-profile:hover {
//   background: var(--gray-50);
//   transform: translateY(-1px);
// }

// .dashboard-user-avatar {
//   width: 2rem;
//   height: 2rem;
//   background: linear-gradient(135deg, var(--success-green), var(--primary-blue));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
// }

// .dashboard-user-info h4 {
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0;
// }

// .dashboard-user-info p {
//   font-size: 0.75rem;
//   color: var(--gray-500);
//   margin: 0;
// }

// /* Navigation */
// .dashboard-nav {
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-bottom: 1px solid var(--gray-200);
//   position: sticky;
//   top: 80px;
//   z-index: 30;
//   animation: slideInRight 0.6s ease-out 0.1s both;
// }

// .dashboard-nav-content {
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 0 1.5rem;
// }

// .dashboard-nav-items {
//   display: flex;
//   gap: 2rem;
// }

// .dashboard-nav-item {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 1rem 0.5rem;
//   border-bottom: 2px solid transparent;
//   font-weight: 500;
//   color: var(--gray-500);
//   background: none;
//   border-left: none;
//   border-right: none;
//   border-top: none;
//   cursor: pointer;
//   transition: var(--transition-all);
//   position: relative;
// }

// .dashboard-nav-item::before {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 0;
//   height: 2px;
//   background: linear-gradient(90deg, var(--primary-blue), var(--secondary-purple));
//   transition: width 0.3s ease;
// }

// .dashboard-nav-item:hover::before {
//   width: 100%;
// }

// .dashboard-nav-item:hover {
//   color: var(--gray-700);
//   transform: translateY(-2px);
// }

// .dashboard-nav-item.active {
//   color: var(--primary-blue);
//   border-bottom-color: var(--primary-blue);
// }

// .dashboard-nav-item.active::before {
//   width: 100%;
// }

// /* Contenu principal */
// .dashboard-main {
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 2rem 1.5rem;
//   position: relative;
//   z-index: 1;
//   animation: fadeIn 0.8s ease-out 0.2s both;
// }

// /* Cartes de statistiques */
// .dashboard-stats-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// }

// .dashboard-stat-card {
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   padding: 1.5rem;
//   box-shadow: var(--shadow-lg);
//   transition: var(--transition-all);
//   position: relative;
//   overflow: hidden;
// }

// .dashboard-stat-card::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: -100%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//   transition: left 0.5s ease;
// }

// .dashboard-stat-card:hover::before {
//   left: 100%;
// }

// .dashboard-stat-card:hover {
//   transform: translateY(-8px);
//   box-shadow: var(--shadow-xl);
// }

// .dashboard-stat-card-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 1rem;
// }

// .dashboard-stat-icon {
//   padding: 0.75rem;
//   border-radius: var(--border-radius);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// }

// .dashboard-stat-icon::before {
//   content: '';
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 0;
//   height: 0;
//   background: rgba(255, 255, 255, 0.3);
//   border-radius: 50%;
//   transform: translate(-50%, -50%);
//   transition: all 0.3s ease;
// }

// .dashboard-stat-card:hover .dashboard-stat-icon::before {
//   width: 100%;
//   height: 100%;
// }

// .dashboard-stat-icon.blue {
//   background: var(--primary-blue);
// }

// .dashboard-stat-icon.green {
//   background: var(--success-green);
// }

// .dashboard-stat-icon.purple {
//   background: var(--secondary-purple);
// }

// .dashboard-stat-icon.orange {
//   background: var(--warning-orange);
// }

// .dashboard-stat-value {
//   text-align: right;
// }

// .dashboard-stat-value h3 {
//   font-size: 2rem;
//   font-weight: 700;
//   color: var(--gray-800);
//   margin: 0;
//   line-height: 1;
// }

// .dashboard-stat-value p {
//   font-size: 0.875rem;
//   color: var(--gray-500);
//   margin: 0.25rem 0 0 0;
// }

// .dashboard-stat-trend {
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.875rem;
// }

// .dashboard-stat-trend-positive {
//   color: var(--success-green);
// }

// .dashboard-stat-trend-negative {
//   color: var(--danger-red);
// }

// .dashboard-stat-trend-neutral {
//   color: var(--gray-500);
// }

// /* Sections de contenu */
// .dashboard-section {
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   padding: 1.5rem;
//   box-shadow: var(--shadow-lg);
//   margin-bottom: 2rem;
//   position: relative;
//   overflow: hidden;
// }

// .dashboard-section::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 4px;
//   background: linear-gradient(90deg, var(--primary-blue), var(--secondary-purple), var(--success-green));
// }

// .dashboard-section-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// }

// .dashboard-section-title {
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0;
// }

// .dashboard-section-action {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.75rem 1rem;
//   background: var(--primary-blue);
//   color: white;
//   border: none;
//   border-radius: var(--border-radius);
//   font-weight: 500;
//   cursor: pointer;
//   transition: var(--transition-all);
//   position: relative;
//   overflow: hidden;
// }

// .dashboard-section-action::before {
//   content: '';
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 0;
//   height: 0;
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 50%;
//   transform: translate(-50%, -50%);
//   transition: all 0.3s ease;
// }

// .dashboard-section-action:hover::before {
//   width: 200%;
//   height: 200%;
// }

// .dashboard-section-action:hover {
//   background: var(--primary-blue-hover);
//   transform: translateY(-2px);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-section-action.secondary {
//   background: white;
//   color: var(--gray-700);
//   border: 1px solid var(--gray-300);
// }

// .dashboard-section-action.secondary:hover {
//   background: var(--gray-50);
//   border-color: var(--gray-400);
// }

// /* Grille de cartes d'application */
// .dashboard-applications-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//   gap: 1.5rem;
// }

// .dashboard-application-card {
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   padding: 1.5rem;
//   box-shadow: var(--shadow-lg);
//   transition: var(--transition-all);
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   border: 1px solid rgba(255, 255, 255, 0.2);
// }

// .dashboard-application-card::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: -100%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
//   transition: left 0.5s ease;
// }

// .dashboard-application-card:hover::before {
//   left: 100%;
// }

// .dashboard-application-card:hover {
//   transform: translateY(-8px);
//   box-shadow: var(--shadow-xl);
//   border-color: rgba(59, 130, 246, 0.3);
// }

// .dashboard-application-header {
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   margin-bottom: 1rem;
// }

// .dashboard-application-info {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .dashboard-application-logo {
//   font-size: 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 3rem;
//   height: 3rem;
//   background: var(--gray-100);
//   border-radius: var(--border-radius);
//   transition: var(--transition-all);
// }

// .dashboard-application-card:hover .dashboard-application-logo {
//   transform: scale(1.1) rotate(5deg);
// }

// .dashboard-application-details h3 {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0 0 0.25rem 0;
// }

// .dashboard-application-details p {
//   color: var(--gray-600);
//   margin: 0;
//   font-size: 0.875rem;
// }

// .dashboard-application-status {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .dashboard-status-badge {
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.75rem;
//   font-weight: 500;
//   color: white;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   animation: pulse 2s infinite;
// }

// .dashboard-status-badge.pending {
//   background: var(--primary-blue);
// }

// .dashboard-status-badge.interview {
//   background: var(--warning-orange);
// }

// .dashboard-status-badge.accepted {
//   background: var(--success-green);
// }

// .dashboard-status-badge.rejected {
//   background: var(--danger-red);
// }

// .dashboard-application-meta {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;
//   margin-bottom: 1rem;
//   font-size: 0.875rem;
//   color: var(--gray-600);
// }

// .dashboard-application-meta-item {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .dashboard-application-progress {
//   margin-bottom: 1rem;
// }

// .dashboard-application-progress-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   font-size: 0.875rem;
// }

// .dashboard-progress-bar {
//   width: 100%;
//   height: 0.5rem;
//   background: var(--gray-200);
//   border-radius: 9999px;
//   overflow: hidden;
//   position: relative;
// }

// .dashboard-progress-fill {
//   height: 100%;
//   background: linear-gradient(90deg, var(--primary-blue), var(--secondary-purple));
//   border-radius: 9999px;
//   transition: width 0.8s ease;
//   position: relative;
// }

// .dashboard-progress-fill::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//   animation: shimmer 2s infinite;
// }

// .dashboard-application-footer {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .dashboard-application-salary {
//   font-weight: 600;
//   color: var(--success-green);
//   font-size: 1rem;
// }

// .dashboard-application-action {
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   color: var(--primary-blue);
//   font-size: 0.875rem;
//   font-weight: 500;
//   transition: var(--transition-colors);
// }

// .dashboard-application-action:hover {
//   color: var(--primary-blue-hover);
// }

// /* Modal de messagerie */
// .dashboard-message-modal {
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.5);
//   backdrop-filter: blur(4px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
//   animation: fadeIn 0.3s ease-out;
// }

// .dashboard-message-modal-content {
//   background: white;
//   border-radius: var(--border-radius-xl);
//   width: 90%;
//   max-width: 1200px;
//   height: 80vh;
//   display: flex;
//   overflow: hidden;
//   box-shadow: var(--shadow-xl);
//   animation: slideInLeft 0.3s ease-out;
// }

// .dashboard-message-sidebar {
//   width: 33.333%;
//   border-right: 1px solid var(--gray-200);
//   padding: 1.5rem;
//   background: var(--gray-50);
// }

// .dashboard-message-sidebar h3 {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0 0 1rem 0;
// }

// .dashboard-conversations {
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
// }

// .dashboard-conversation-item {
//   padding: 0.75rem;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: var(--transition-all);
//   background: white;
//   border: 1px solid var(--gray-200);
// }

// .dashboard-conversation-item:hover {
//   background: var(--primary-blue-light);
//   transform: translateX(4px);
// }

// .dashboard-conversation-item.active {
//   background: var(--primary-blue-light);
//   border-color: var(--primary-blue);
//   border-left: 4px solid var(--primary-blue);
// }

// .dashboard-conversation-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 0.5rem;
// }

// .dashboard-conversation-user {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .dashboard-conversation-avatar {
//   font-size: 1.5rem;
// }

// .dashboard-conversation-name {
//   font-weight: 500;
//   color: var(--gray-800);
//   font-size: 0.875rem;
// }

// .dashboard-conversation-unread {
//   background: var(--primary-blue);
//   color: white;
//   border-radius: 9999px;
//   padding: 0.125rem 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 500;
// }

// .dashboard-conversation-company {
//   color: var(--gray-600);
//   font-size: 0.875rem;
//   margin-bottom: 0.25rem;
// }

// .dashboard-conversation-preview {
//   color: var(--gray-500);
//   font-size: 0.75rem;
//   line-height: 1.3;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }

// .dashboard-conversation-time {
//   color: var(--gray-400);
//   font-size: 0.75rem;
//   margin-top: 0.25rem;
// }

// .dashboard-message-main {
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// }

// .dashboard-message-header {
//   padding: 1.5rem;
//   border-bottom: 1px solid var(--gray-200);
//   background: white;
// }

// .dashboard-message-header-content {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

// .dashboard-message-user-info {
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
// }

// .dashboard-message-user-avatar {
//   font-size: 1.5rem;
// }

// .dashboard-message-user-details h3 {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0;
// }

// .dashboard-message-user-details p {
//   color: var(--gray-500);
//   font-size: 0.875rem;
//   margin: 0;
// }

// .dashboard-message-close {
//   padding: 0.5rem;
//   color: var(--gray-500);
//   background: none;
//   border: none;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: var(--transition-colors);
// }

// .dashboard-message-close:hover {
//   color: var(--gray-700);
//   background: var(--gray-100);
// }

// .dashboard-message-content {
//   flex: 1;
//   padding: 1.5rem;
//   overflow-y: auto;
//   background: var(--gray-50);
// }

// .dashboard-message-list {
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// }

// .dashboard-message-item {
//   display: flex;
//   max-width: 70%;
// }

// .dashboard-message-item.sent {
//   justify-content: flex-end;
//   margin-left: auto;
// }

// .dashboard-message-item.received {
//   justify-content: flex-start;
// }

// .dashboard-message-bubble {
//   padding: 0.75rem 1rem;
//   border-radius: var(--border-radius-xl);
//   max-width: 100%;
//   position: relative;
//   animation: fadeIn 0.3s ease-out;
// }

// .dashboard-message-bubble.sent {
//   background: var(--primary-blue);
//   color: white;
//   border-bottom-right-radius: 0.5rem;
// }

// .dashboard-message-bubble.received {
//   background: white;
//   color: var(--gray-800);
//   border-bottom-left-radius: 0.5rem;
//   box-shadow: var(--shadow-sm);
// }

// .dashboard-message-text {
//   font-size: 0.875rem;
//   line-height: 1.4;
//   margin: 0;
// }

// .dashboard-message-time {
//   font-size: 0.75rem;
//   opacity: 0.8;
//   margin-top: 0.25rem;
// }

// .dashboard-message-input {
//   padding: 1.5rem;
//   border-top: 1px solid var(--gray-200);
//   background: white;
// }

// .dashboard-message-input-container {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .dashboard-message-attachment {
//   padding: 0.5rem;
//   color: var(--gray-500);
//   background: none;
//   border: none;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: var(--transition-colors);
// }

// .dashboard-message-attachment:hover {
//   color: var(--gray-700);
//   background: var(--gray-100);
// }

// .dashboard-message-input-field {
//   flex: 1;
//   padding: 0.75rem 1rem;
//   border: 1px solid var(--gray-300);
//   border-radius: var(--border-radius);
//   background: white;
//   transition: var(--transition-all);
//   font-size: 0.875rem;
// }

// .dashboard-message-input-field:focus {
//   outline: none;
//   border-color: var(--primary-blue);
//   box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
// }

// .dashboard-message-send {
//   padding: 0.75rem;
//   background: var(--primary-blue);
//   color: white;
//   border: none;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   transition: var(--transition-all);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .dashboard-message-send:hover {
//   background: var(--primary-blue-hover);
//   transform: translateY(-2px);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-message-send:active {
//   transform: translateY(0);
// }

// /* Section des messages (vue liste) */
// .dashboard-messages-list {
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// }

// .dashboard-message-list-item {
//   display: flex;
//   align-items: center;
//   padding: 1rem;
//   border: 1px solid var(--gray-200);
//   border-radius: var(--border-radius);
//   background: white;
//   transition: var(--transition-all);
//   cursor: pointer;
// }

// .dashboard-message-list-item:hover {
//   background: var(--gray-50);
//   transform: translateX(4px);
//   border-color: var(--primary-blue);
// }

// .dashboard-message-list-avatar {
//   font-size: 2rem;
//   margin-right: 1rem;
// }

// .dashboard-message-list-content {
//   flex: 1;
// }

// .dashboard-message-list-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 0.5rem;
// }

// .dashboard-message-list-name {
//   font-weight: 600;
//   color: var(--gray-800);
//   font-size: 1rem;
// }

// .dashboard-message-list-time {
//   color: var(--gray-500);
//   font-size: 0.875rem;
// }

// .dashboard-message-list-company {
//   color: var(--gray-600);
//   font-size: 0.875rem;
//   margin-bottom: 0.25rem;
// }

// .dashboard-message-list-preview {
//   color: var(--gray-500);
//   font-size: 0.875rem;
//   line-height: 1.3;
// }

// .dashboard-message-list-unread {
//   background: var(--primary-blue);
//   color: white;
//   border-radius: 9999px;
//   padding: 0.125rem 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 500;
//   margin-left: 1rem;
// }

// /* Section profil */
// .dashboard-profile {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;
// }

// .dashboard-profile-section {
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// }

// .dashboard-profile-card {
//   text-align: center;
//   padding: 2rem;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   box-shadow: var(--shadow-lg);
//   transition: var(--transition-all);
// }

// .dashboard-profile-card:hover {
//   transform: translateY(-4px);
//   box-shadow: var(--shadow-xl);
// }

// .dashboard-profile-avatar {
//   width: 6rem;
//   height: 6rem;
//   background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 1rem;
//   transition: var(--transition-all);
// }

// .dashboard-profile-avatar:hover {
//   transform: scale(1.05);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-profile-name {
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0 0 0.5rem 0;
// }

// .dashboard-profile-title {
//   color: var(--gray-600);
//   font-size: 1rem;
//   margin: 0;
// }

// .dashboard-profile-contact {
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
// }

// .dashboard-profile-contact-item {
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   color: var(--gray-600);
//   font-size: 0.875rem;
//   padding: 0.5rem 0;
//   border-radius: var(--border-radius);
//   transition: var(--transition-colors);
// }

// .dashboard-profile-contact-item:hover {
//   background: var(--gray-50);
//   color: var(--gray-800);
// }

// .dashboard-profile-contact-icon {
//   color: var(--gray-400);
//   flex-shrink: 0;
// }

// .dashboard-profile-skills {
//   padding: 1.5rem;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-profile-skills h4 {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0 0 1rem 0;
// }

// .dashboard-skills-grid {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// }

// .dashboard-skill-tag {
//   padding: 0.5rem 1rem;
//   background: var(--primary-blue-light);
//   color: var(--primary-blue);
//   border-radius: 9999px;
//   font-size: 0.875rem;
//   font-weight: 500;
//   transition: var(--transition-all);
//   cursor: pointer;
// }

// .dashboard-skill-tag:hover {
//   background: var(--primary-blue);
//   color: white;
//   transform: translateY(-2px);
// }

// .dashboard-profile-documents {
//   padding: 1.5rem;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: var(--border-radius-xl);
//   box-shadow: var(--shadow-lg);
// }

// .dashboard-profile-documents h4 {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--gray-800);
//   margin: 0 0 1rem 0;
// }

// .dashboard-documents-list {
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// }

// .dashboard-document-item {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0.75rem;
//   border: 1px solid var(--gray-200);
//   border-radius: var(--border-radius);
//   background: white;
//   transition: var(--transition-all);
// }

// .dashboard-document-item:hover {
//   background: var(--gray-50);
//   border-color: var(--primary-blue);
//   transform: translateX(4px);
// }

// .dashboard-document-name {
//   color: var(--gray-700);
//   font-size: 0.875rem;
//   font-weight: 500;
// }

// .dashboard-document-action {
//   color: var(--primary-blue);
//   transition: var(--transition-colors);
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.25rem;
//   border-radius: var(--border-radius);
// }

// .dashboard-document-action:hover {
//   color: var(--primary-blue-hover);
//   background: var(--primary-blue-light);
// }

// /* États de chargement */
// .dashboard-loading {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 200px;
//   color: var(--gray-500);
// }

// .dashboard-loading-spinner {
//   width: 2rem;
//   height: 2rem;
//   border: 2px solid var(--gray-200);
//   border-top: 2px solid var(--primary-blue);
//   border-radius: 50%;
//   animation: spin 1s linear infinite;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

// .dashboard-empty-state {
//   text-align: center;
//   padding: 3rem;
//   color: var(--gray-500);
// }

// .dashboard-empty-state-icon {
//   font-size: 3rem;
//   margin-bottom: 1rem;
//   opacity: 0.5;
// }

// .dashboard-empty-state h3 {
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: var(--gray-600);
//   margin: 0 0 0.5rem 0;
// }

// .dashboard-empty-state p {
//   color: var(--gray-500);
//   font-size: 0.875rem;
//   margin: 0;
// }

// /* Responsive Design */
// @media (max-width: 1024px) {
//   .dashboard-stats-grid {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   .dashboard-applications-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .dashboard-profile {
//     grid-template-columns: 1fr;
//   }
// }

// @media (max-width: 768px) {
//   .dashboard-header-content {
//     padding: 1rem;
//   }
  
//   .dashboard-header-inner {
//     flex-direction: column;
//     gap: 1rem;
//   }
  
//   .dashboard-header-actions {
//     flex-wrap: wrap;
//     gap: 0.5rem;
//   }
  
//   .dashboard-search input {
//     width: 12rem;
//   }
  
//   .dashboard-nav-items {
//     flex-wrap: wrap;
//     gap: 1rem;
//   }
  
//   .dashboard-main {
//     padding: 1rem;
//   }
  
//   .dashboard-stats-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .dashboard-section {
//     padding: 1rem;
//   }
  
//   .dashboard-section-header {
//     flex-direction: column;
//     gap: 1rem;
//     align-items: flex-start;
//   }
  
//   .dashboard-application-meta {
//     grid-template-columns: 1fr;
//   }
  
//   .dashboard-message-modal-content {
//     width: 95%;
//     height: 90vh;
//     flex-direction: column;
//   }
  
//   .dashboard-message-sidebar {
//     width: 100%;
//     height: 200px;
//     overflow-y: auto;
//   }
  
//   .dashboard-conversations {
//     flex-direction: row;
//     overflow-x: auto;
//     gap: 0.5rem;
//   }
  
//   .dashboard-conversation-item {
//     min-width: 200px;
//   }
// }

// @media (max-width: 480px) {
//   .dashboard-header-content {
//     padding: 0.5rem;
//   }
  
//   .dashboard-logo {
//     gap: 0.5rem;
//   }
  
//   .dashboard-logo-text h1 {
//     font-size: 1.25rem;
//   }
  
//   .dashboard-search input {
//     width: 100%;
//   }
  
//   .dashboard-nav-content {
//     padding: 0 0.5rem;
//   }
  
//   .dashboard-main {
//     padding: 0.5rem;
//   }
  
//   .dashboard-stat-card {
//     padding: 1rem;
//   }
  
//   .dashboard-stat-value h3 {
//     font-size: 1.5rem;
//   }
  
//   .dashboard-section {
//     padding: 0.75rem;
//   }
  
//   .dashboard-application-card {
//     padding: 1rem;
//   }
  
//   .dashboard-application-info {
//     flex-direction: column;
//     gap: 0.5rem;
//   }
  
//   .dashboard-application-logo {
//     width: 2rem;
//     height: 2rem;
//     font-size: 1.5rem;
//   }
  
//   .dashboard-profile-avatar {
//     width: 4rem;
//     height: 4rem;
//   }
  
//   .dashboard-profile-name {
//     font-size: 1.25rem;
//   }
// }

// /* Améliorations pour l'accessibilité */
// @media (prefers-reduced-motion: reduce) {
//   * {
//     animation-duration: 0.01ms !important;
//     animation-iteration-count: 1 !important;
//     transition-duration: 0.01ms !important;
//   }
// }

// /* Mode sombre (optionnel) */
// @media (prefers-color-scheme: dark) {
//   .dashboard-container {
//     background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
//   }
  
//   .dashboard-header,
//   .dashboard-nav {
//     background: rgba(30, 41, 59, 0.95);
//     border-color: #334155;
//   }
  
//   .dashboard-section,
//   .dashboard-stat-card,
//   .dashboard-application-card {
//     background: rgba(30, 41, 59, 0.9);
//     border-color: #334155;
//   }
  
//   .dashboard-section-title,
//   .dashboard-stat-value h3,
//   .dashboard-application-details h3,
//   .dashboard-logo-text h1 {
//     color: #F1F5F9;
//   }
  
//   .dashboard-logo-text p,
//   .dashboard-application-details p,
//   .dashboard-stat-value p {
//     color: #94A3B8;
//   }
  
//   .dashboard-message-modal-content {
//     background: #1E293B;
//     border-color: #334155;
//   }
  
//   .dashboard-message-sidebar {
//     background: #0F172A;
//     border-color: #334155;
//   }
  
//   .dashboard-conversation-item {
//     background: #1E293B;
//     border-color: #334155;
//     color: #F1F5F9;
//   }
  
//   .dashboard-message-bubble.received {
//     background: #334155;
//     color: #F1F5F9;
//   }
// }

// /* Utilitaires pour animations personnalisées */
// .animate-fade-in {
//   animation: fadeIn 0.5s ease-out;
// }

// .animate-slide-in-left {
//   animation: slideInLeft 0.5s ease-out;
// }

// .animate-slide-in-right {
//   animation: slideInRight 0.5s ease-out;
// }

// .animate-bounce {
//   animation: bounce 1s infinite;
// }

// .animate-pulse {
//   animation: pulse 2s infinite;
// }

// /* Classes utilitaires pour les délais d'animation */
// .delay-100 {
//   animation-delay: 0.1s;
// }

// .delay-200 {
//   animation-delay: 0.2s;
// }

// .delay-300 {
//   animation-delay: 0.3s;
// }

// .delay-500 {
//   animation-delay: 0.5s;
// }
//   `} </style>

// export default candidateDashboard;





import React, { useState, useEffect } from 'react';
import '../styles/pages/candidateDashboard.css';
import { 
  User, 
  MessageCircle, 
  Search, 
  Bell, 
  Briefcase, 
  Calendar, 
  Eye,
  Star,
  Video,
  Target,
  TrendingUp
} from 'lucide-react';

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Données du candidat (simplifiées)
  const candidateProfile = {
    name: "Marie Dubois",
    title: "UX Designer Senior",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face"
  };

  // Notifications système
  const systemNotifications = [
    {
      id: 1,
      type: "interview",
      title: "Entretien dans 2 heures",
      message: "Entretien technique Google à 14h00",
      time: "Il y a 10 min",
      priority: "high",
      icon: Video,
      color: "text-red-500",
      read: false
    },
    {
      id: 2,
      type: "application",
      title: "Nouvelle réponse",
      message: "Microsoft a répondu à votre candidature",
      time: "Il y a 30 min",
      priority: "medium",
      icon: MessageCircle,
      color: "text-blue-500",
      read: false
    },
    {
      id: 3,
      type: "job_match",
      title: "Nouveaux matches",
      message: "5 nouvelles offres correspondent à votre profil",
      time: "Il y a 1h",
      priority: "low",
      icon: Target,
      color: "text-green-500",
      read: true
    }
  ];

  // Entretiens programmés
  const interviews = [
    {
      id: 1,
      company: "Google",
      position: "Senior UX Designer",
      date: "2025-01-15",
      time: "14:00",
      type: "Technique",
      status: "Confirmé"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Designer",
      date: "2025-01-18",
      time: "10:00",
      type: "Équipe",
      status: "Confirmé"
    }
  ];

  // Statistiques dashboard
  const dashboardStats = {
    applications: { total: 5 },
    interviews: { upcoming: 2 },
    profile: { views: 47, matches: 23 }
  };

  // Recommandations
  const recommendations = [
    {
      id: 1,
      title: "Complétez votre profil",
      description: "Ajoutez 2 projets portfolio pour atteindre 100%",
      icon: User,
      action: "Compléter"
    },
    {
      id: 2,
      title: "Nouvelle compétence tendance",
      description: "Le design system est très recherché actuellement",
      icon: TrendingUp,
      action: "Ajouter"
    },
    {
      id: 3,
      title: "Préparez votre entretien",
      description: "Entretien Google dans 2 jours",
      icon: Calendar,
      action: "Préparer"
    }
  ];

  // Initialisation des notifications
  useEffect(() => {
    setNotifications(systemNotifications);
  }, []);

  // Fonction pour marquer une notification comme lue
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Rendu du dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">JobPortal</h1>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Vue d'ensemble
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'jobs'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Offres d'emploi
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'applications'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mes candidatures
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'messages'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profil
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <notification.icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <img
                  src={candidateProfile.avatar}
                  alt={candidateProfile.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{candidateProfile.name}</p>
                  <p className="text-xs text-gray-500">{candidateProfile.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Candidatures</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.applications.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Entretiens</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.interviews.upcoming}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Vues profil</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.profile.views}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.profile.matches}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prochains entretiens */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Prochains entretiens</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {interviews.filter(interview => interview.status === 'Confirmé').map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Video className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{interview.position}</p>
                          <p className="text-sm text-gray-500">{interview.company}</p>
                          <p className="text-xs text-gray-400">{interview.date} à {interview.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {interview.type}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recommandations</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <rec.icon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{rec.title}</p>
                          <p className="text-sm text-gray-500">{rec.description}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        {rec.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Autres onglets */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Offres d'emploi</h2>
            <p className="text-gray-600">Contenu des offres d'emploi à développer...</p>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Mes candidatures</h2>
            <p className="text-gray-600">Contenu des candidatures à développer...</p>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <p className="text-gray-600">Contenu des messages à développer...</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
            <p className="text-gray-600">Contenu du profil à développer...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateDashboard;