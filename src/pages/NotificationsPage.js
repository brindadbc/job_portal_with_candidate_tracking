import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/notifications.css';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  X, 
  Filter, 
  Search,
  User,
  Briefcase,
  MessageSquare,
  Calendar,
  Star,
  Heart,
  FileText,
  Award,
  Building,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Mail,
  Phone,
  Clock,
  Trash2,
  MoreVertical
} from 'lucide-react';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Nouvelle candidature',
      message: 'Marie Dubois a postulé pour le poste de Senior React Developer',
      timestamp: '2024-01-16T14:30:00',
      read: false,
      avatar: 'https://via.placeholder.com/40x40',
      icon: User,
      color: 'bg-blue-500',
      actionUrl: '/candidate/1'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      message: 'Jean Martin vous a envoyé un message concernant l\'entretien',
      timestamp: '2024-01-16T13:45:00',
      read: false,
      avatar: 'https://via.placeholder.com/40x40',
      icon: MessageSquare,
      color: 'bg-green-500',
      actionUrl: '/messages?candidate=2'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Entretien programmé',
      message: 'Entretien avec Sophie Laurent prévu demain à 10h00',
      timestamp: '2024-01-16T12:20:00',
      read: true,
      avatar: 'https://via.placeholder.com/40x40',
      icon: Calendar,
      color: 'bg-purple-500',
      actionUrl: '/calendar'
    },
    {
      id: 4,
      type: 'job',
      title: 'Offre expirée',
      message: 'L\'offre "Product Manager" expire dans 2 jours',
      timestamp: '2024-01-16T11:15:00',
      read: true,
      avatar: null,
      icon: Briefcase,
      color: 'bg-orange-500',
      actionUrl: '/job/3'
    },
    {
      id: 5,
      type: 'favorite',
      title: 'Candidat favori',
      message: 'Pierre Moreau a été ajouté à vos favoris',
      timestamp: '2024-01-16T10:30:00',
      read: true,
      avatar: 'https://via.placeholder.com/40x40',
      icon: Heart,
      color: 'bg-red-500',
      actionUrl: '/candidate/4'
    },
    {
      id: 6,
      type: 'application',
      title: 'Candidature retirée',
      message: 'Thomas Leroy a retiré sa candidature pour DevOps Engineer',
      timestamp: '2024-01-16T09:45:00',
      read: true,
      avatar: 'https://via.placeholder.com/40x40',
      icon: User,
      color: 'bg-gray-500',
      actionUrl: '/candidate/6'
    },
    {
      id: 7,
      type: 'review',
      title: 'Évaluation reçue',
      message: 'Amélie Rousseau a laissé une évaluation après l\'entretien',
      timestamp: '2024-01-15T16:20:00',
      read: true,
      avatar: 'https://via.placeholder.com/40x40',
      icon: Star,
      color: 'bg-yellow-500',
      actionUrl: '/reviews'
    },
    {
      id: 8,
      type: 'system',
      title: 'Mise à jour système',
      message: 'Nouvelles fonctionnalités disponibles dans votre tableau de bord',
      timestamp: '2024-01-15T14:00:00',
      read: true,
      avatar: null,
      icon: Settings,
      color: 'bg-indigo-500',
      actionUrl: '/settings'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Toutes', count: notifications.length },
    { value: 'unread', label: 'Non lues', count: notifications.filter(n => !n.read).length },
    { value: 'application', label: 'Candidatures', count: notifications.filter(n => n.type === 'application').length },
    { value: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { value: 'interview', label: 'Entretiens', count: notifications.filter(n => n.type === 'interview').length },
    { value: 'job', label: 'Offres', count: notifications.filter(n => n.type === 'job').length }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return `Il y a ${Math.floor(diffInMinutes / 1440)}j`;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.read) ||
                         notification.type === selectedFilter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleNotificationClick = (notification) => {
    // Marquer comme lu
    if (!notification.read) {
      // Ici vous mettriez à jour l'état/API pour marquer comme lu
      console.log('Marquer comme lu:', notification.id);
    }
    
    // Naviguer vers la page correspondante
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleMarkAsRead = (notificationId, e) => {
    e.stopPropagation();
    console.log('Marquer comme lu:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marquer toutes comme lues');
  };

  const handleDeleteNotification = (notificationId, e) => {
    e.stopPropagation();
    console.log('Supprimer notification:', notificationId);
  };

  const handleBulkAction = (action) => {
    console.log(`Action ${action} pour:`, Array.from(selectedNotifications));
  };

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(notificationId)) {
        newSet.delete(notificationId);
      } else {
        newSet.add(notificationId);
      }
      return newSet;
    });
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

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
          <div className="nav-item" onClick={() => handleNavigation('/recruiterDashboard')}>
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
          </div>
          <div className="nav-item active">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item" onClick={() => handleNavigation('/settings')}>
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/login')}>
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationItem = ({ notification }) => (
    <div 
      className={`notification-item ${!notification.read ? 'unread' : ''}`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="notification-select">
        <input
          type="checkbox"
          checked={selectedNotifications.has(notification.id)}
          onChange={() => handleSelectNotification(notification.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <div className="notification-icon">
        {notification.avatar ? (
          <img src={notification.avatar} alt="Avatar" className="notification-avatar" />
        ) : (
          <div className={`notification-icon-bg ${notification.color}`}>
            <notification.icon className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="notification-content">
        <div className="notification-header">
          <h4 className="notification-title">{notification.title}</h4>
          <span className="notification-time">{getTimeAgo(notification.timestamp)}</span>
        </div>
        <p className="notification-message">{notification.message}</p>
      </div>
      
      <div className="notification-actions">
        {!notification.read && (
          <button 
            className="btn-icon"
            onClick={(e) => handleMarkAsRead(notification.id, e)}
            title="Marquer comme lu"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
        <button 
          className="btn-icon"
          onClick={(e) => handleDeleteNotification(notification.id, e)}
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {!notification.read && <div className="unread-indicator"></div>}
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
  <span className="breadcrumb-item active">Notifications</span>
</div>
          
          <div className="top-actions">
            <div className="search-box">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher notifications..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="notification-btn active">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="user-avatar">
              <img src="https://via.placeholder.com/32x32" alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Notifications</h1>
              <p className="page-subtitle">Restez informé de toutes les activités</p>
            </div>
            <div className="header-actions">
              <button 
                className="btn-secondary"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Tout marquer comme lu
              </button>
            </div>
          </div>

          <div className="notifications-container">
            <div className="notifications-sidebar">
              <div className="filters-section">
                <h3>Filtres</h3>
                <div className="filter-list">
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      className={`filter-item ${selectedFilter === option.value ? 'active' : ''}`}
                      onClick={() => setSelectedFilter(option.value)}
                    >
                      <span className="filter-label">{option.label}</span>
                      <span className="filter-count">{option.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="notifications-main">
              <div className="notifications-toolbar">
                <div className="toolbar-left">
                  <div className="results-count">
                    {filteredNotifications.length} notifications
                  </div>
                  {selectedNotifications.size > 0 && (
                    <div className="bulk-actions">
                      <span className="selected-count">
                        {selectedNotifications.size} sélectionnées
                      </span>
                      <button 
                        className="btn-text"
                        onClick={() => handleBulkAction('read')}
                      >
                        Marquer comme lu
                      </button>
                      <button 
                        className="btn-text"
                        onClick={() => handleBulkAction('delete')}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="toolbar-right">
                  <button className="btn-icon">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="notifications-list">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="notifications-empty">
                    <Bell className="w-12 h-12 text-gray-400" />
                    <h3>Aucune notification</h3>
                    <p>Vous n'avez pas de nouvelles notifications pour le moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useNotifications } from '../services/notificationService';
// import '../styles/pages/notifications.css';
// import { 
//   Bell, 
//   Check, 
//   CheckCheck, 
//   X, 
//   Filter, 
//   Search,
//   User,
//   Briefcase,
//   MessageSquare,
//   Calendar,
//   Star,
//   Heart,
//   FileText,
//   Award,
//   Building,
//   Users,
//   BarChart3,
//   Settings,
//   LogOut,
//   Mail,
//   Phone,
//   Clock,
//   Trash2,
//   MoreVertical,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   UserCheck,
//   Eye,
//   TrendingUp,
//   Globe,
//   Loader2
// } from 'lucide-react';

// const NotificationsPage = () => {
//   const navigate = useNavigate();
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNotifications, setSelectedNotifications] = useState(new Set());
//   const [showOptions, setShowOptions] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [allNotifications, setAllNotifications] = useState([]);
//   const [pagination, setPagination] = useState({});

//   // Utiliser le hook personnalisé pour les notifications
//   const {
//     notifications,
//     unreadCount,
//     loading,
//     error,
//     socket,
//     loadNotifications,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     requestNotificationPermission
//   } = useNotifications();

//   // Chargement initial
//   useEffect(() => {
//     const initializeNotifications = async () => {
//       // Demander la permission pour les notifications natives
//       await requestNotificationPermission();
      
//       // Charger les notifications
//       const response = await loadNotifications({ page: 1, limit: 20 });
//       if (response) {
//         setAllNotifications(response.notifications);
//         setPagination(response.pagination);
//       }
//     };

//     initializeNotifications();
//   }, []);

//   // Recharger quand les filtres changent
//   useEffect(() => {
//     const loadFilteredNotifications = async () => {
//       const options = {
//         page: 1,
//         limit: 20,
//         sortBy: 'createdAt',
//         order: 'desc'
//       };

//       if (selectedFilter !== 'all') {
//         if (selectedFilter === 'unread') {
//           options.read = false;
//         } else {
//           options.type = selectedFilter;
//         }
//       }

//       const response = await loadNotifications(options);
//       if (response) {
//         setAllNotifications(response.notifications);
//         setPagination(response.pagination);
//         setCurrentPage(1);
//       }
//     };

//     loadFilteredNotifications();
//   }, [selectedFilter]);

//   // Options de filtres avec compteurs dynamiques
//   const filterOptions = [
//     { value: 'all', label: 'Toutes', count: allNotifications.length },
//     { value: 'unread', label: 'Non lues', count: unreadCount },
//     { value: 'application', label: 'Candidatures', count: allNotifications.filter(n => n.type === 'application').length },
//     { value: 'message', label: 'Messages', count: allNotifications.filter(n => n.type === 'message').length },
//     { value: 'interview', label: 'Entretiens', count: allNotifications.filter(n => n.type === 'interview').length },
//     { value: 'job', label: 'Offres', count: allNotifications.filter(n => n.type === 'job').length },
//     { value: 'system', label: 'Système', count: allNotifications.filter(n => n.type === 'system').length }
//   ];

//   // Fonction pour formater la date
//   const getTimeAgo = (timestamp) => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
//     if (diffInMinutes < 1) return 'À l\'instant';
//     if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
//     if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
//     return `Il y a ${Math.floor(diffInMinutes / 1440)}j`;
//   };

//   // Obtenir l'icône selon le type de notification
//   const getNotificationIcon = (type) => {
//     const iconMap = {
//       application: User,
//       message: MessageSquare,
//       interview: Calendar,
//       job: Briefcase,
//       favorite: Heart,
//       review: Star,
//       system: Settings,
//       status_change: CheckCircle,
//       new_job: TrendingUp,
//       application_withdrawn: UserCheck,
//       interview_scheduled: Calendar,
//       interview_reminder: Clock,
//       job_expired: AlertCircle,
//       profile_view: Eye
//     };
//     return iconMap[type] || Bell;
//   };

//   // Obtenir la couleur selon le type
//   const getNotificationColor = (type, category = 'info') => {
//     const colorMap = {
//       application: 'bg-blue-500',
//       message: 'bg-green-500',
//       interview: 'bg-purple-500',
//       job: 'bg-orange-500',
//       favorite: 'bg-red-500',
//       review: 'bg-yellow-500',
//       system: 'bg-indigo-500',
//       status_change: 'bg-emerald-500',
//       new_job: 'bg-cyan-500',
//       application_withdrawn: 'bg-gray-500',
//       interview_scheduled: 'bg-purple-600',
//       interview_reminder: 'bg-amber-500',
//       job_expired: 'bg-red-600',
//       profile_view: 'bg-teal-500'
//     };

//     // Utiliser la catégorie pour modifier la couleur si nécessaire
//     const categoryColors = {
//       success: 'bg-green-500',
//       warning: 'bg-yellow-500',
//       error: 'bg-red-500',
//       info: colorMap[type] || 'bg-blue-500'
//     };

//     return categoryColors[category] || colorMap[type] || 'bg-blue-500';
//   };

//   // Filtrer les notifications selon la recherche
//   const filteredNotifications = allNotifications.filter(notification => {
//     const searchMatch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                        notification.message.toLowerCase().includes(searchQuery.toLowerCase());
//     return searchMatch;
//   });

//   // Gérer le clic sur une notification
//   const handleNotificationClick = async (notification) => {
//     // Marquer comme lue si pas encore lue
//     if (!notification.read) {
//       await markAsRead(notification._id);
//     }
    
//     // Naviguer vers la page correspondante
//     if (notification.actionUrl) {
//       navigate(notification.actionUrl);
//     }
//   };

//   // Marquer une notification comme lue
//   const handleMarkAsRead = async (notificationId, e) => {
//     e.stopPropagation();
//     await markAsRead(notificationId);
//   };

//   // Marquer toutes comme lues
//   const handleMarkAllAsRead = async () => {
//     await markAllAsRead();
//   };

//   // Supprimer une notification
//   const handleDeleteNotification = async (notificationId, e) => {
//     e.stopPropagation();
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
//       await deleteNotification(notificationId);
//     }
//   };

//   // Actions en lot
//   const handleBulkAction = async (action) => {
//     const selectedIds = Array.from(selectedNotifications);
    
//     if (selectedIds.length === 0) {
//       alert('Veuillez sélectionner au moins une notification');
//       return;
//     }

//     try {
//       if (action === 'read') {
//         // Marquer comme lues via API
//         for (const id of selectedIds) {
//           const notif = allNotifications.find(n => n._id === id);
//           if (notif && !notif.read) {
//             await markAsRead(id);
//           }
//         }
//       } else if (action === 'delete') {
//         if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.length} notification(s) ?`)) {
//           for (const id of selectedIds) {
//             await deleteNotification(id);
//           }
//         }
//       }
      
//       setSelectedNotifications(new Set());
//     } catch (error) {
//       console.error('Erreur action en lot:', error);
//       alert('Erreur lors de l\'action en lot');
//     }
//   };

//   // Gérer la sélection des notifications
//   const handleSelectNotification = (notificationId) => {
//     setSelectedNotifications(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(notificationId)) {
//         newSet.delete(notificationId);
//       } else {
//         newSet.add(notificationId);
//       }
//       return newSet;
//     });
//   };

//   // Charger plus de notifications
//   const loadMore = async () => {
//     if (currentPage < pagination.pages && !loading) {
//       const response = await loadNotifications({ 
//         page: currentPage + 1, 
//         limit: 20,
//         type: selectedFilter !== 'all' && selectedFilter !== 'unread' ? selectedFilter : undefined,
//         read: selectedFilter === 'unread' ? false : undefined
//       });
      
//       if (response) {
//         setAllNotifications(prev => [...prev, ...response.notifications]);
//         setCurrentPage(prev => prev + 1);
//       }
//     }
//   };

//   // Actualiser les notifications
//   const handleRefresh = async () => {
//     const response = await loadNotifications({ 
//       page: 1, 
//       limit: 20,
//       type: selectedFilter !== 'all' && selectedFilter !== 'unread' ? selectedFilter : undefined,
//       read: selectedFilter === 'unread' ? false : undefined
//     });
    
//     if (response) {
//       setAllNotifications(response.notifications);
//       setPagination(response.pagination);
//       setCurrentPage(1);
//     }
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

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
//           <div className="nav-item" onClick={() => handleNavigation('/recruiterDashboard')}>
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
//           </div>
//           <div className="nav-item active">
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//             {unreadCount > 0 && (
//               <span className="nav-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
//             )}
//           </div>
//         </div>
        
//         <div className="nav-section">
//           <div className="nav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/login')}>
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const NotificationItem = ({ notification }) => {
//     const IconComponent = getNotificationIcon(notification.type);
    
//     return (
//       <div 
//         className={`notification-item ${!notification.read ? 'unread' : ''}`}
//         onClick={() => handleNotificationClick(notification)}
//       >
//         <div className="notification-select">
//           <input
//             type="checkbox"
//             checked={selectedNotifications.has(notification._id)}
//             onChange={() => handleSelectNotification(notification._id)}
//             onClick={(e) => e.stopPropagation()}
//           />
//         </div>
        
//         <div className="notification-icon">
//           {notification.sender?.profilePicture ? (
//             <img 
//               src={notification.sender.profilePicture} 
//               alt="Avatar" 
//               className="notification-avatar" 
//             />
//           ) : (
//             <div className={`notification-icon-bg ${getNotificationColor(notification.type, notification.category)}`}>
//               <IconComponent className="w-4 h-4 text-white" />
//             </div>
//           )}
//         </div>
        
//         <div className="notification-content">
//           <div className="notification-header">
//             <h4 className="notification-title">{notification.title}</h4>
//             <div className="notification-meta">
//               <span className="notification-time">{getTimeAgo(notification.createdAt)}</span>
//               {notification.priority === 'high' && (
//                 <span className="priority-badge high">Priorité élevée</span>
//               )}
//               {notification.priority === 'urgent' && (
//                 <span className="priority-badge urgent">Urgent</span>
//               )}
//             </div>
//           </div>
//           <p className="notification-message">{notification.message}</p>
          
//           {/* Affichage des métadonnées utiles */}
//           {notification.data && (
//             <div className="notification-details">
//               {notification.data.candidateName && (
//                 <span className="detail-badge">
//                   <User className="w-3 h-3" />
//                   {notification.data.candidateName}
//                 </span>
//               )}
//               {notification.data.jobTitle && (
//                 <span className="detail-badge">
//                   <Briefcase className="w-3 h-3" />
//                   {notification.data.jobTitle}
//                 </span>
//               )}
//               {notification.data.company && (
//                 <span className="detail-badge">
//                   <Building className="w-3 h-3" />
//                   {notification.data.company}
//                 </span>
//               )}
//               {notification.data.matchPercentage && (
//                 <span className="detail-badge match">
//                   <TrendingUp className="w-3 h-3" />
//                   {notification.data.matchPercentage}% match
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
        
//         <div className="notification-actions">
//           {!notification.read && (
//             <button 
//               className="btn-icon"
//               onClick={(e) => handleMarkAsRead(notification._id, e)}
//               title="Marquer comme lu"
//             >
//               <Check className="w-4 h-4" />
//             </button>
//           )}
//           <button 
//             className="btn-icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowOptions(showOptions === notification._id ? null : notification._id);
//             }}
//             title="Plus d'options"
//           >
//             <MoreVertical className="w-4 h-4" />
//           </button>
          
//           {showOptions === notification._id && (
//             <div className="notification-options-menu">
//               {!notification.read && (
//                 <button onClick={(e) => handleMarkAsRead(notification._id, e)}>
//                   <Check className="w-4 h-4" />
//                   Marquer comme lu
//                 </button>
//               )}
//               <button onClick={(e) => handleDeleteNotification(notification._id, e)}>
//                 <Trash2 className="w-4 h-4" />
//                 Supprimer
//               </button>
//             </div>
//           )}
//         </div>
        
//         {!notification.read && <div className="unread-indicator"></div>}
//       </div>
//     );
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar />
      
//       <div className="main-content">
//         <div className="top-bar">
//           <div className="breadcrumb">
//             <span 
//               className="breadcrumb-item clickable" 
//               onClick={() => navigate('/recruiterDashboard')}
//               style={{ cursor: 'pointer' }}
//             >
//               Accueil
//             </span>
//             <span className="breadcrumb-separator">/</span>
//             <span className="breadcrumb-item active">Notifications</span>
//           </div>
          
//           <div className="top-actions">
//             <div className="search-box">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher notifications..."
//                 className="search-input"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="connection-status">
//               <div className={`status-dot ${socket ? 'connected' : 'disconnected'}`}></div>
//               <span className="status-text">
//                 {socket ? 'Connecté' : 'Déconnecté'}
//               </span>
//             </div>
            
//             <button className="notification-btn active">
//               <Bell className="w-5 h-5" />
//               {unreadCount > 0 && (
//                 <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
//               )}
//             </button>
            
//             <div className="user-avatar">
//               <img src="https://via.placeholder.com/32x32" alt="Avatar" />
//             </div>
//           </div>
//         </div>

//         <div className="page-content">
//           {/* En-tête de page */}
//           <div className="page-header">
//             <div>
//               <h1 className="page-title">Notifications</h1>
//               <p className="page-subtitle">
//                 Restez informé de toutes les activités ({unreadCount} non lues)
//               </p>
//             </div>
//             <div className="header-actions">
//               <button 
//                 className="btn-secondary"
//                 onClick={handleRefresh}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                 )}
//                 Actualiser
//               </button>
//               <button 
//                 className="btn-secondary"
//                 onClick={handleMarkAllAsRead}
//                 disabled={unreadCount === 0}
//               >
//                 <CheckCheck className="w-4 h-4 mr-2" />
//                 Tout marquer comme lu
//               </button>
//             </div>
//           </div>

//           {/* Affichage d'erreur */}
//           {error && (
//             <div className="error-banner">
//               <AlertCircle className="w-4 h-4" />
//               <span>Erreur: {error}</span>
//               <button onClick={handleRefresh} className="retry-btn-sm">
//                 Réessayer
//               </button>
//             </div>
//           )}

//           <div className="notifications-container">
//             <div className="notifications-sidebar">
//               <div className="filters-section">
//                 <h3>Filtres</h3>
//                 <div className="filter-list">
//                   {filterOptions.map(option => (
//                     <button
//                       key={option.value}
//                       className={`filter-item ${selectedFilter === option.value ? 'active' : ''}`}
//                       onClick={() => setSelectedFilter(option.value)}
//                     >
//                       <span className="filter-label">{option.label}</span>
//                       <span className="filter-count">{option.count}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="notifications-main">
//               <div className="notifications-toolbar">
//                 <div className="toolbar-left">
//                   <div className="results-count">
//                     {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
//                   </div>
//                   {selectedNotifications.size > 0 && (
//                     <div className="bulk-actions">
//                       <span className="selected-count">
//                         {selectedNotifications.size} sélectionnée{selectedNotifications.size !== 1 ? 's' : ''}
//                       </span>
//                       <button 
//                         className="btn-text"
//                         onClick={() => handleBulkAction('read')}
//                       >
//                         Marquer comme lu
//                       </button>
//                       <button 
//                         className="btn-text"
//                         onClick={() => handleBulkAction('delete')}
//                       >
//                         Supprimer
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="toolbar-right">
//                   <button className="btn-icon">
//                     <MoreVertical className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="notifications-list">
//                 {loading && filteredNotifications.length === 0 ? (
//                   <div className="notifications-loading">
//                     <Loader2 className="w-8 h-8 animate-spin" />
//                     <p>Chargement des notifications...</p>
//                   </div>
//                 ) : filteredNotifications.length > 0 ? (
//                   <>
//                     {filteredNotifications.map(notification => (
//                       <NotificationItem key={notification._id} notification={notification} />
//                     ))}
                    
//                     {/* Bouton charger plus */}
//                     {currentPage < pagination.pages && (
//                       <div className="load-more-container">
//                         <button 
//                           className="btn-secondary"
//                           onClick={loadMore}
//                           disabled={loading}
//                         >
//                           {loading ? (
//                             <>
//                               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                               Chargement...
//                             </>
//                           ) : (
//                             'Charger plus'
//                           )}
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="notifications-empty">
//                     <Bell className="w-12 h-12 text-gray-400" />
//                     <h3>Aucune notification</h3>
//                     <p>
//                       {searchQuery 
//                         ? 'Aucune notification ne correspond à votre recherche'
//                         : selectedFilter === 'unread' 
//                           ? 'Vous n\'avez pas de nouvelles notifications'
//                           : 'Vous n\'avez pas de notifications pour ce filtre'
//                       }
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;