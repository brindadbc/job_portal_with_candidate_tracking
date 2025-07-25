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