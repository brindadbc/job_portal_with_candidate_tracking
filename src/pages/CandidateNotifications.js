import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Info, 
  AlertCircle,
  Briefcase,
  MessageSquare,
  Calendar,
  User,
  Settings,
  Trash2,
  Check,
  Filter,
  Search,
  MoreVertical,
  Eye,
  EyeOff,
  Clock,
  Star,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  FileText,
  Mail
} from 'lucide-react';

const CandidateNotifications = () => {
  // Navigation function
  const navigateToDashboard = () => {
    window.location.href = '/CandidateDashboard';
  };
  
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler le chargement des notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'application_status',
        title: 'Candidature acceptée',
        message: 'Votre candidature pour le poste de Senior React Developer chez Google a été acceptée !',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        priority: 'high',
        category: 'application',
        icon: CheckCircle,
        iconColor: '#10b981',
        bgColor: '#f0fdf4',
        actionRequired: true,
        actionText: 'Voir les détails',
        company: 'Google',
        position: 'Senior React Developer'
      },
      {
        id: 2,
        type: 'interview_scheduled',
        title: 'Entretien programmé',
        message: 'Un entretien technique a été programmé pour le 28 juillet à 14h00 avec Meta.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: false,
        priority: 'high',
        category: 'interview',
        icon: Calendar,
        iconColor: '#3b82f6',
        bgColor: '#eff6ff',
        actionRequired: true,
        actionText: 'Confirmer',
        company: 'Meta',
        position: 'Frontend Developer'
      },
      {
        id: 3,
        type: 'new_message',
        title: 'Nouveau message',
        message: 'Alice Moreau vous a envoyé un message concernant votre candidature.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: true,
        priority: 'medium',
        category: 'message',
        icon: MessageSquare,
        iconColor: '#8b5cf6',
        bgColor: '#f5f3ff',
        actionRequired: false,
        actionText: 'Répondre',
        sender: 'Alice Moreau'
      },
      {
        id: 4,
        type: 'profile_view',
        title: 'Profil consulté',
        message: '3 recruteurs ont consulté votre profil aujourd\'hui.',
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        read: true,
        priority: 'low',
        category: 'profile',
        icon: Eye,
        iconColor: '#6366f1',
        bgColor: '#eef2ff',
        actionRequired: false,
        actionText: 'Voir le profil',
        viewCount: 3
      },
      {
        id: 5,
        type: 'application_rejected',
        title: 'Candidature non retenue',
        message: 'Votre candidature pour le poste de UX Designer chez Apple n\'a pas été retenue.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true,
        priority: 'medium',
        category: 'application',
        icon: XCircle,
        iconColor: '#ef4444',
        bgColor: '#fef2f2',
        actionRequired: false,
        actionText: 'Voir le feedback',
        company: 'Apple',
        position: 'UX Designer'
      },
      {
        id: 6,
        type: 'recommendation',
        title: 'Nouvelle recommandation',
        message: 'Nous avons trouvé 5 nouvelles offres qui correspondent à votre profil.',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        read: true,
        priority: 'low',
        category: 'recommendation',
        icon: Target,
        iconColor: '#f97316',
        bgColor: '#fff7ed',
        actionRequired: false,
        actionText: 'Voir les offres',
        recommendationCount: 5
      },
      {
        id: 7,
        type: 'skill_endorsement',
        title: 'Compétence endorsée',
        message: 'Thomas Bernard a endorsé votre compétence en React.js.',
        timestamp: new Date(Date.now() - 259200000), // 3 days ago
        read: true,
        priority: 'low',
        category: 'profile',
        icon: Award,
        iconColor: '#eab308',
        bgColor: '#fefce8',
        actionRequired: false,
        actionText: 'Voir le profil',
        endorser: 'Thomas Bernard',
        skill: 'React.js'
      },
      {
        id: 8,
        type: 'system',
        title: 'Mise à jour du système',
        message: 'Nouvelles fonctionnalités disponibles dans votre dashboard.',
        timestamp: new Date(Date.now() - 604800000), // 1 week ago
        read: true,
        priority: 'low',
        category: 'system',
        icon: Settings,
        iconColor: '#6b7280',
        bgColor: '#f9fafb',
        actionRequired: false,
        actionText: 'En savoir plus'
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filtrer les notifications
  useEffect(() => {
    let filtered = notifications;

    // Filtrer par catégorie
    if (filter !== 'all') {
      if (filter === 'unread') {
        filtered = filtered.filter(notif => !notif.read);
      } else if (filter === 'important') {
        filtered = filtered.filter(notif => notif.priority === 'high' || notif.actionRequired);
      } else {
        filtered = filtered.filter(notif => notif.category === filter);
      }
    }

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, filter, searchQuery]);

  // Formater le timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    if (weeks < 4) return `Il y a ${weeks} sem`;
    return timestamp.toLocaleDateString();
  };

  // Marquer comme lu/non lu
  const toggleReadStatus = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    ));
  };

  // Supprimer une notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setSelectedNotifications(prev => prev.filter(selectedId => selectedId !== id));
  };

  // Sélectionner/désélectionner une notification
  const toggleNotificationSelection = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // Sélectionner toutes les notifications
  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(notif => notif.id));
    }
  };

  // Marquer les sélectionnées comme lues
  const markSelectedAsRead = () => {
    setNotifications(prev => prev.map(notif =>
      selectedNotifications.includes(notif.id) ? { ...notif, read: true } : notif
    ));
    setSelectedNotifications([]);
  };

  // Supprimer les sélectionnées
  const deleteSelected = () => {
    setNotifications(prev => prev.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
  };

  // Marquer toutes comme lues
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  // Statistiques
  const unreadCount = notifications.filter(notif => !notif.read).length;
  const importantCount = notifications.filter(notif => notif.priority === 'high' || notif.actionRequired).length;

  const filterOptions = [
    { key: 'all', label: 'Toutes', count: notifications.length },
    { key: 'unread', label: 'Non lues', count: unreadCount },
    { key: 'important', label: 'Importantes', count: importantCount },
    { key: 'application', label: 'Candidatures', count: notifications.filter(n => n.category === 'application').length },
    { key: 'interview', label: 'Entretiens', count: notifications.filter(n => n.category === 'interview').length },
    { key: 'message', label: 'Messages', count: notifications.filter(n => n.category === 'message').length }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    headerInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '4rem'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#6b7280',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      fontSize: '0.875rem',
      transition: 'color 0.2s'
    },
    divider: {
      height: '1.5rem',
      width: '1px',
      backgroundColor: '#d1d5db',
      margin: '0 1rem'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    iconContainer: {
      backgroundColor: '#dbeafe',
      padding: '0.5rem',
      borderRadius: '0.5rem'
    },
    titleText: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0
    },
    subtitle: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: 0
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    selectedInfo: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    button: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    primaryButton: {
      backgroundColor: '#2563eb'
    },
    dangerButton: {
      backgroundColor: '#dc2626'
    },
    successButton: {
      backgroundColor: '#16a34a'
    },
    mainContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem 1rem'
    },
    layoutContainer: {
      display: 'flex',
      gap: '1.5rem',
      flexDirection: 'row'
    },
    sidebar: {
      width: '20rem',
      flexShrink: 0
    },
    sidebarContent: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      position: 'sticky',
      top: '1.5rem'
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '1.5rem'
    },
    searchInput: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      width: '1rem',
      height: '1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      padding: '1rem',
      borderRadius: '0.5rem'
    },
    statCardBlue: {
      backgroundColor: '#eff6ff'
    },
    statCardOrange: {
      backgroundColor: '#fff7ed'
    },
    statCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statText: {
      fontSize: '0.875rem',
      fontWeight: '500',
      margin: 0
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0
    },
    filtersSection: {
      marginBottom: '1rem'
    },
    filtersTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '0.75rem'
    },
    filtersList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    filterButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    filterButtonActive: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8',
      border: '1px solid #bfdbfe'
    },
    filterButtonInactive: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      border: '1px solid transparent'
    },
    filterCount: {
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem'
    },
    filterCountActive: {
      backgroundColor: '#bfdbfe',
      color: '#1e40af'
    },
    filterCountInactive: {
      backgroundColor: '#e5e7eb',
      color: '#6b7280'
    },
    mainColumn: {
      flex: 1
    },
    bulkActions: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    bulkActionsContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    checkbox: {
      width: '1rem',
      height: '1rem',
      borderRadius: '0.25rem',
      border: '1px solid #d1d5db',
      accentColor: '#2563eb'
    },
    notificationsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    notificationCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    notificationCardUnread: {
      borderLeft: '4px solid #2563eb'
    },
    notificationCardSelected: {
      boxShadow: '0 0 0 2px #2563eb'
    },
    notificationContent: {
      padding: '1.5rem'
    },
    notificationInner: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem'
    },
    notificationIcon: {
      flexShrink: 0,
      padding: '0.75rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    notificationMain: {
      flex: 1,
      minWidth: 0
    },
    notificationHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.75rem'
    },
    notificationTitleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.25rem'
    },
    notificationTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      margin: 0
    },
    notificationTitleRead: {
      color: '#374151'
    },
    notificationTitleUnread: {
      color: '#111827'
    },
    unreadDot: {
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: '#2563eb',
      borderRadius: '50%'
    },
    notificationMessage: {
      color: '#6b7280',
      marginBottom: '0.75rem',
      lineHeight: '1.5'
    },
    notificationMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.75rem'
    },
    notificationFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    notificationInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    priorityBadge: {
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem'
    },
    priorityHigh: {
      backgroundColor: '#fef2f2',
      color: '#dc2626'
    },
    priorityMedium: {
      backgroundColor: '#fefce8',
      color: '#d97706'
    },
    priorityLow: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#2563eb',
      color: 'white',
      fontSize: '0.875rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    notificationActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginLeft: '1rem'
    },
    iconButton: {
      padding: '0.5rem',
      color: '#9ca3af',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      borderRadius: '0.25rem',
      transition: 'color 0.2s'
    },
    emptyState: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '3rem',
      textAlign: 'center'
    },
    emptyIcon: {
      width: '4rem',
      height: '4rem',
      color: '#d1d5db',
      margin: '0 auto 1rem'
    },
    emptyTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    emptyText: {
      color: '#6b7280'
    },
    loadingContainer: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingContent: {
      textAlign: 'center'
    },
    spinner: {
      width: '3rem',
      height: '3rem',
      border: '2px solid #e5e7eb',
      borderTop: '2px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 1rem'
    },
    loadingText: {
      color: '#6b7280'
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Chargement des notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .search-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          
          .back-button:hover {
            color: #111827;
          }
          
          .button:hover.primary {
            background-color: #1d4ed8;
          }
          
          .button:hover.danger {
            background-color: #b91c1c;
          }
          
          .button:hover.success {
            background-color: #15803d;
          }
          
          .filter-button:hover.inactive {
            background-color: #f3f4f6;
          }
          
          .notification-card:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .action-button:hover {
            background-color: #1d4ed8;
          }
          
          .icon-button:hover {
            color: #6b7280;
          }
          
          .icon-button:hover.delete {
            color: #dc2626;
          }
          
          @media (max-width: 1024px) {
            .layout-container {
              flex-direction: column;
            }
            
            .sidebar {
              width: 100%;
            }
          }
        `}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerInner}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={navigateToDashboard}
                style={styles.backButton}
                className="back-button"
              >
                <ArrowLeft size={20} />
                <span>Retour au dashboard</span>
              </button>
              <div style={styles.divider}></div>
              <div style={styles.headerTitle}>
                <div style={styles.iconContainer}>
                  <Bell size={24} color="#2563eb" />
                </div>
                <div>
                  <h1 style={styles.titleText}>Notifications</h1>
                  <p style={styles.subtitle}>
                    {unreadCount > 0 ? `${unreadCount} nouvelle${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions du header */}
            <div style={styles.headerActions}>
              {selectedNotifications.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={styles.selectedInfo}>
                    {selectedNotifications.length} sélectionnée{selectedNotifications.length > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={markSelectedAsRead}
                    style={{...styles.button, ...styles.primaryButton}}
                    className="button primary"
                  >
                    Marquer comme lues
                  </button>
                  <button
                    onClick={deleteSelected}
                    style={{...styles.button, ...styles.dangerButton}}
                    className="button danger"
                  >
                    Supprimer
                  </button>
                </div>
              )}
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{...styles.button, ...styles.successButton}}
                  className="button success"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.layoutContainer} className="layout-container">
          {/* Sidebar avec filtres */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarContent}>
              {/* Recherche */}
              <div style={styles.searchContainer}>
                <Search style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  className="search-input"
                />
              </div>

              {/* Statistiques rapides */}
              <div style={styles.statsGrid}>
                <div style={{...styles.statCard, ...styles.statCardBlue}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={{...styles.statText, color: '#2563eb'}}>Non lues</p>
                      <p style={{...styles.statNumber, color: '#1e3a8a'}}>{unreadCount}</p>
                    </div>
                    <Bell size={32} color="#93c5fd" />
                  </div>
                </div>
                <div style={{...styles.statCard, ...styles.statCardOrange}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={{...styles.statText, color: '#ea580c'}}>Importantes</p>
                      <p style={{...styles.statNumber, color: '#9a3412'}}>{importantCount}</p>
                    </div>
                    <AlertCircle size={32} color="#fdba74" />
                  </div>
                </div>
              </div>

              {/* Filtres */}
              <div style={styles.filtersSection}>
                <h3 style={styles.filtersTitle}>Filtres</h3>
                <div style={styles.filtersList}>
                  {filterOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setFilter(option.key)}
                      style={{
                        ...styles.filterButton,
                        ...(filter === option.key ? styles.filterButtonActive : styles.filterButtonInactive)
                      }}
                      className={`filter-button ${filter === option.key ? 'active' : 'inactive'}`}
                    >
                      <span>{option.label}</span>
                      {option.count > 0 && (
                        <span style={{
                          ...styles.filterCount,
                          ...(filter === option.key ? styles.filterCountActive : styles.filterCountInactive)
                        }}>
                          {option.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Liste des notifications */}
          <div style={styles.mainColumn}>
            {/* Actions en lot */}
            {filteredNotifications.length > 0 && (
              <div style={styles.bulkActions}>
                <div style={styles.bulkActionsContent}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedNotifications.length === filteredNotifications.length}
                        onChange={selectAllNotifications}
                        style={styles.checkbox}
                      />
                      <span>
                        Sélectionner tout ({filteredNotifications.length})
                      </span>
                    </label>
                  </div>
                  
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {filteredNotifications.length} notification{filteredNotifications.length > 1 ? 's' : ''}
                    {filter !== 'all' && ` (${filter})`}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            <div style={styles.notificationsList}>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      ...styles.notificationCard,
                      ...((!notification.read) ? styles.notificationCardUnread : {}),
                      ...(selectedNotifications.includes(notification.id) ? styles.notificationCardSelected : {})
                    }}
                    className="notification-card"
                  >
                    <div style={styles.notificationContent}>
                      <div style={styles.notificationInner}>
                        {/* Checkbox de sélection */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleNotificationSelection(notification.id)}
                          style={{ ...styles.checkbox, marginTop: '0.25rem' }}
                        />

                        {/* Icône */}
                        <div style={{
                          ...styles.notificationIcon,
                          backgroundColor: notification.bgColor
                        }}>
                          <notification.icon size={24} color={notification.iconColor} />
                        </div>

                        {/* Contenu */}
                        <div style={styles.notificationMain}>
                          <div style={styles.notificationHeader}>
                            <div style={{ flex: 1 }}>
                              <div style={styles.notificationTitleRow}>
                                <h3 style={{
                                  ...styles.notificationTitle,
                                  ...(notification.read ? styles.notificationTitleRead : styles.notificationTitleUnread)
                                }}>
                                  {notification.title}
                                </h3>
                                {notification.priority === 'high' && (
                                  <Star size={16} color="#eab308" />
                                )}
                                {!notification.read && (
                                  <div style={styles.unreadDot}></div>
                                )}
                              </div>
                              
                              <p style={styles.notificationMessage}>{notification.message}</p>
                              
                              {/* Métadonnées spécifiques */}
                              {notification.company && (
                                <div style={styles.notificationMeta}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Briefcase size={16} />
                                    {notification.company}
                                  </span>
                                  {notification.position && (
                                    <span>{notification.position}</span>
                                  )}
                                </div>
                              )}
                              
                              <div style={styles.notificationFooter}>
                                <div style={styles.notificationInfo}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={16} />
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  <span style={{
                                    ...styles.priorityBadge,
                                    ...(notification.priority === 'high' ? styles.priorityHigh :
                                       notification.priority === 'medium' ? styles.priorityMedium :
                                       styles.priorityLow)
                                  }}>
                                    {notification.priority === 'high' ? 'Urgent' :
                                     notification.priority === 'medium' ? 'Important' : 'Normal'}
                                  </span>
                                </div>
                                
                                {notification.actionRequired && (
                                  <button style={styles.actionButton} className="action-button">
                                    {notification.actionText}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div style={styles.notificationActions}>
                              <button
                                onClick={() => toggleReadStatus(notification.id)}
                                style={styles.iconButton}
                                className="icon-button"
                                title={notification.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                              >
                                {notification.read ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                style={styles.iconButton}
                                className="icon-button delete"
                                title="Supprimer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <Bell style={styles.emptyIcon} />
                  <h3 style={styles.emptyTitle}>
                    {searchQuery ? 'Aucun résultat' : 'Aucune notification'}
                  </h3>
                  <p style={styles.emptyText}>
                    {searchQuery 
                      ? 'Essayez avec d\'autres termes de recherche'
                      : 'Vous êtes à jour ! Toutes vos notifications apparaîtront ici.'
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        marginTop: '1rem'
                      }}
                      className="button primary"
                    >
                      Effacer la recherche
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateNotifications;