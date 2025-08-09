import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowLeft,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  X,
  Check,
  AlertTriangle,
  Building,
  Briefcase,
  Star,
  Clock
} from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Navigation function
  const navigateToDashboard = () => {
    window.location.href = '/DashboardAdmin';
  };
  // Données d'exemple des utilisateurs
  const mockUsers = [
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      type: 'Candidat',
      status: 'Actif',
      joinDate: '2024-01-20',
      lastActive: '2024-01-25',
      location: 'Paris, France',
      avatar: 'https://via.placeholder.com/60x60/2563eb/ffffff?text=MD',
      jobApplications: 15,
      profileCompletion: 85,
      plan: 'Gratuit'
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'j.martin@techcorp.com',
      phone: '+33 6 23 45 67 89',
      type: 'Recruteur',
      status: 'Actif',
      joinDate: '2024-01-19',
      lastActive: '2024-01-25',
      location: 'Lyon, France',
      avatar: 'https://via.placeholder.com/60x60/7c3aed/ffffff?text=JM',
      company: 'TechCorp',
      jobsPosted: 8,
      plan: 'Premium'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      email: 'sophie.l@startup.io',
      phone: '+33 6 34 56 78 90',
      type: 'Recruteur',
      status: 'Suspendu',
      joinDate: '2024-01-18',
      lastActive: '2024-01-23',
      location: 'Marseille, France',
      avatar: 'https://via.placeholder.com/60x60/059669/ffffff?text=SL',
      company: 'StartupLab',
      jobsPosted: 3,
      plan: 'Standard'
    },
    {
      id: 4,
      name: 'Pierre Durand',
      email: 'p.durand@email.com',
      phone: '+33 6 45 67 89 01',
      type: 'Candidat',
      status: 'Inactif',
      joinDate: '2024-01-17',
      lastActive: '2024-01-22',
      location: 'Toulouse, France',
      avatar: 'https://via.placeholder.com/60x60/ea580c/ffffff?text=PD',
      jobApplications: 3,
      profileCompletion: 45,
      plan: 'Gratuit'
    },
    {
      id: 5,
      name: 'Claire Moreau',
      email: 'claire.moreau@devco.fr',
      phone: '+33 6 56 78 90 12',
      type: 'Recruteur',
      status: 'Actif',
      joinDate: '2024-01-16',
      lastActive: '2024-01-25',
      location: 'Nantes, France',
      avatar: 'https://via.placeholder.com/60x60/dc2626/ffffff?text=CM',
      company: 'DevCorp',
      jobsPosted: 12,
      plan: 'Premium'
    },
    {
      id: 6,
      name: 'Antoine Rousseau',
      email: 'a.rousseau@email.com',
      phone: '+33 6 67 89 01 23',
      type: 'Candidat',
      status: 'Actif',
      joinDate: '2024-01-15',
      lastActive: '2024-01-24',
      location: 'Bordeaux, France',
      avatar: 'https://via.placeholder.com/60x60/16a34a/ffffff?text=AR',
      jobApplications: 22,
      profileCompletion: 92,
      plan: 'Premium'
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filtrage par recherche
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par statut
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(user => {
        switch (selectedFilter) {
          case 'active':
            return user.status === 'Actif';
          case 'inactive':
            return user.status === 'Inactif';
          case 'suspended':
            return user.status === 'Suspendu';
          case 'candidates':
            return user.type === 'Candidat';
          case 'recruiters':
            return user.type === 'Recruteur';
          default:
            return true;
        }
      });
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedFilter, users]);

  const handleUserAction = (action, userId) => {
    const user = users.find(u => u.id === userId);
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setShowUserModal(true);
        break;
      case 'edit':
        setSelectedUser(user);
        // Ouvrir modal d'édition
        break;
      case 'suspend':
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: 'Suspendu' } : u
        ));
        break;
      case 'activate':
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: 'Actif' } : u
        ));
        break;
      case 'delete':
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
          setUsers(prev => prev.filter(u => u.id !== userId));
        }
        break;
    }
  };

  const handleBulkAction = (action) => {
    const selectedUserIds = Array.from(selectedUsers);
    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(u => 
          selectedUserIds.includes(u.id) ? { ...u, status: 'Actif' } : u
        ));
        break;
      case 'suspend':
        setUsers(prev => prev.map(u => 
          selectedUserIds.includes(u.id) ? { ...u, status: 'Suspendu' } : u
        ));
        break;
      case 'delete':
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedUserIds.length} utilisateur(s) ?`)) {
          setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
        }
        break;
    }
    setSelectedUsers(new Set());
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Actif': 'status-badge-active',
      'Inactif': 'status-badge-inactive',
      'Suspendu': 'status-badge-suspended'
    };
    return `status-badge ${statusClasses[status] || ''}`;
  };

  const getPlanBadge = (plan) => {
    const planClasses = {
      'Gratuit': 'plan-badge-free',
      'Standard': 'plan-badge-standard',
      'Premium': 'plan-badge-premium'
    };
    return `plan-badge ${planClasses[plan] || ''}`;
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="user-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Détails de l'utilisateur</h3>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-content">
            <div className="user-profile-section">
              <div className="user-profile-header">
                <img src={user.avatar} alt="" className="user-profile-avatar" />
                <div className="user-profile-info">
                  <h4>{user.name}</h4>
                  <p className="user-profile-type">{user.type}</p>
                  <span className={getStatusBadge(user.status)}>{user.status}</span>
                </div>
              </div>
              
              <div className="user-details-grid">
                <div className="user-detail-item">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="user-detail-item">
                  <Phone size={16} />
                  <span>{user.phone}</span>
                </div>
                <div className="user-detail-item">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
                <div className="user-detail-item">
                  <Calendar size={16} />
                  <span>Inscrit le {user.joinDate}</span>
                </div>
                <div className="user-detail-item">
                  <Clock size={16} />
                  <span>Dernière activité: {user.lastActive}</span>
                </div>
                <div className="user-detail-item">
                  <Star size={16} />
                  <span className={getPlanBadge(user.plan)}>{user.plan}</span>
                </div>
              </div>
            </div>
            
            {user.type === 'Candidat' && (
              <div className="user-stats-section">
                <h5>Statistiques candidat</h5>
                <div className="stats-grid-mini">
                  <div className="stat-item-mini">
                    <Briefcase size={20} />
                    <div>
                      <span className="stat-value">{user.jobApplications}</span>
                      <span className="stat-label">Candidatures</span>
                    </div>
                  </div>
                  <div className="stat-item-mini">
                    <UserCheck size={20} />
                    <div>
                      <span className="stat-value">{user.profileCompletion}%</span>
                      <span className="stat-label">Profil complété</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {user.type === 'Recruteur' && (
              <div className="user-stats-section">
                <h5>Statistiques recruteur</h5>
                <div className="stats-grid-mini">
                  <div className="stat-item-mini">
                    <Building size={20} />
                    <div>
                      <span className="stat-value">{user.company}</span>
                      <span className="stat-label">Entreprise</span>
                    </div>
                  </div>
                  <div className="stat-item-mini">
                    <Briefcase size={20} />
                    <div>
                      <span className="stat-value">{user.jobsPosted}</span>
                      <span className="stat-label">Offres publiées</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              Fermer
            </button>
            <button className="btn-primary">
              <Edit size={16} />
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="users-management">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-title-section">
            <h1 className="page-title">
              <Users size={32} />
              Gestion des utilisateurs
            </h1>
            <p className="page-subtitle">
              Gérez les comptes utilisateurs, candidats et recruteurs de votre plateforme
            </p>
          </div>
          
          <div className="page-actions">
            <button className="btn-secondary">
              <Download size={16} />
              Exporter
            </button>
            <button className="btn-secondary">
              <Upload size={16} />
              Importer
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              Nouvel utilisateur
            </button>
             <button
                onClick={navigateToDashboard}
                className="btn-primary"
              >
                <ArrowLeft size={20} />
                <span>Retour au dashboard</span>
              </button>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-icon stat-icon-blue">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{users.length}</h3>
              <p>Total utilisateurs</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-icon stat-icon-green">
              <UserCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>{users.filter(u => u.status === 'Actif').length}</h3>
              <p>Utilisateurs actifs</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-icon stat-icon-orange">
              <Briefcase size={24} />
            </div>
            <div className="stat-info">
              <h3>{users.filter(u => u.type === 'Candidat').length}</h3>
              <p>Candidats</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-icon stat-icon-purple">
              <Building size={24} />
            </div>
            <div className="stat-info">
              <h3>{users.filter(u => u.type === 'Recruteur').length}</h3>
              <p>Recruteurs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="filters-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filters-container">
          <select 
            className="filter-select"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">Tous les utilisateurs</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="suspended">Suspendus</option>
            <option value="candidates">Candidats</option>
            <option value="recruiters">Recruteurs</option>
          </select>
          
          <button className="btn-secondary">
            <Filter size={16} />
            Plus de filtres
          </button>
          
          <button className="btn-secondary">
            <RefreshCw size={16} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Actions en lot */}
      {selectedUsers.size > 0 && (
        <div className="bulk-actions">
          <div className="bulk-actions-info">
            {selectedUsers.size} utilisateur(s) sélectionné(s)
          </div>
          <div className="bulk-actions-buttons">
            <button 
              className="btn-success"
              onClick={() => handleBulkAction('activate')}
            >
              <UserCheck size={16} />
              Activer
            </button>
            <button 
              className="btn-warning"
              onClick={() => handleBulkAction('suspend')}
            >
              <UserX size={16} />
              Suspendre
            </button>
            <button 
              className="btn-danger"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash2 size={16} />
              Supprimer
            </button>
          </div>
        </div>
      )}

      {/* Table des utilisateurs */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(new Set(paginatedUsers.map(u => u.id)));
                    } else {
                      setSelectedUsers(new Set());
                    }
                  }}
                  checked={selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0}
                />
              </th>
              <th>Utilisateur</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Plan</th>
              <th>Dernière activité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="user-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedUsers);
                      if (e.target.checked) {
                        newSelected.add(user.id);
                      } else {
                        newSelected.delete(user.id);
                      }
                      setSelectedUsers(newSelected);
                    }}
                  />
                </td>
                <td>
                  <div className="user-info">
                    <img src={user.avatar} alt="" className="user-avatar-small" />
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`type-badge type-${user.type.toLowerCase()}`}>
                    {user.type}
                  </span>
                </td>
                <td>
                  <span className={getStatusBadge(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <span className={getPlanBadge(user.plan)}>
                    {user.plan}
                  </span>
                </td>
                <td className="last-active">
                  {user.lastActive}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn-view"
                      onClick={() => handleUserAction('view', user.id)}
                      title="Voir les détails"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => handleUserAction('edit', user.id)}
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    {user.status === 'Actif' ? (
                      <button
                        className="action-btn action-btn-suspend"
                        onClick={() => handleUserAction('suspend', user.id)}
                        title="Suspendre"
                      >
                        <UserX size={16} />
                      </button>
                    ) : (
                      <button
                        className="action-btn action-btn-activate"
                        onClick={() => handleUserAction('activate', user.id)}
                        title="Activer"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => handleUserAction('delete', user.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Précédent
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal utilisateur */}
      {showUserModal && (
        <UserModal 
          user={selectedUser} 
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }} 
        />
      )}

      <style jsx>{`
        .users-management {
          padding: 2rem;
          background: #f8fafc;
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .page-title-section {
          flex: 1;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }

        .page-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-primary, .btn-secondary, .btn-success, .btn-warning, .btn-danger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 0.875rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }

        .btn-secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #f9fafb;
        }

        .btn-success {
          background: #10b981;
          color: white;
        }

        .btn-warning {
          background: #f59e0b;
          color: white;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
        }

        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .stat-card-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 0.75rem;
          color: white;
        }

        .stat-icon-blue { background: #3b82f6; }
        .stat-icon-green { background: #10b981; }
        .stat-icon-orange { background: #f59e0b; }
        .stat-icon-purple { background: #8b5cf6; }

        .stat-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stat-info p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .filters-container {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .filter-select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
        }

        .bulk-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .bulk-actions-info {
          font-weight: 500;
          color: #374151;
        }

        .bulk-actions-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .table-container {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th {
          background: #f9fafb;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .users-table td {
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .user-row:hover {
          background: #f9fafb;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          object-fit: cover;
        }

        .user-name {
          font-weight: 500;
          color: #1f2937;
        }

        .user-email {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .type-candidat {
          background: #dbeafe;
          color: #1e40af;
        }

        .type-recruteur {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge-active {
          background: #dcfce7;
          color: #166534;
        }

        .status-badge-inactive {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge-suspended {
          background: #fee2e2;
          color: #dc2626;
        }

        .plan-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .plan-badge-free {
          background: #f3f4f6;
          color: #374151;
        }

        .plan-badge-standard {
          background: #fef3c7;
          color: #92400e;
        }

        .plan-badge-premium {
          background: #fde68a;
          color: #f59e0b;
        }

        .last-active {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn-view {
          background: #e0f2fe;
          color: #0369a1;
        }

        .action-btn-view:hover {
          background: #bae6fd;
        }

        .action-btn-edit {
          background: #f0f9ff;
          color: #0284c7;
        }

        .action-btn-edit:hover {
          background: #e0f7fa;
        }

        .action-btn-suspend {
          background: #fef3c7;
          color: #d97706;
        }

        .action-btn-suspend:hover {
          background: #fde68a;
        }

        .action-btn-activate {
          background: #dcfce7;
          color: #16a34a;
        }

        .action-btn-activate:hover {
          background: #bbf7d0;
        }

        .action-btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-btn-delete:hover {
          background: #fecaca;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .pagination-info {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .pagination-controls {
          display: flex;
          gap: 0.5rem;
        }

        .pagination-btn {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #f9fafb;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .user-modal {
          background: white;
          border-radius: 1rem;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .close-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 0.375rem;
          color: #6b7280;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-content {
          padding: 1.5rem;
        }

        .user-profile-section {
          margin-bottom: 2rem;
        }

        .user-profile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .user-profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 1rem;
          object-fit: cover;
        }

        .user-profile-info h4 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .user-profile-type {
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .user-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .user-detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          color: #374151;
        }

        .user-stats-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 1.5rem;
        }

        .user-stats-section h5 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .stats-grid-mini {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-item-mini {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .users-management {
            padding: 1rem;
          }

          .page-header-content {
            flex-direction: column;
            align-items: stretch;
          }

          .page-actions {
            justify-content: flex-start;
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-container {
            flex-wrap: wrap;
          }

          .bulk-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .table-container {
            overflow-x: auto;
          }

          .users-table {
            min-width: 800px;
          }

          .pagination {
            flex-direction: column;
            gap: 1rem;
          }

          .user-modal {
            width: 95%;
            margin: 1rem;
          }

          .user-details-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid-mini {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default UsersManagement;