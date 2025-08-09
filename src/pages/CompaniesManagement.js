import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  Settings,
  Bell,
  Database,
  LogOut,
  BarChart3,
  Star,
  Award,
  Globe,
  Activity,
  RefreshCw
} from 'lucide-react';

const CompaniesManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view', 'edit', 'delete'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [companies] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue de la Tech, Paris',
      website: 'www.techcorp.com',
      industry: 'Technologie',
      size: 'Grande (500+)',
      status: 'active',
      subscription: 'premium',
      joinDate: '2023-03-15',
      lastActivity: '2024-01-28',
      employees: 547,
      activeJobs: 23,
      totalApplications: 1245,
      revenue: 15600,
      rating: 4.8,
      logo: 'https://via.placeholder.com/60x60/2563eb/ffffff?text=TC'
    },
    {
      id: 2,
      name: 'StartupLab Innovation',
      email: 'hello@startuplab.io',
      phone: '+33 1 98 76 54 32',
      address: '456 Avenue Innovation, Lyon',
      website: 'www.startuplab.io',
      industry: 'Startup',
      size: 'Moyenne (50-200)',
      status: 'active',
      subscription: 'standard',
      joinDate: '2023-06-20',
      lastActivity: '2024-01-27',
      employees: 89,
      activeJobs: 12,
      totalApplications: 567,
      revenue: 8900,
      rating: 4.5,
      logo: 'https://via.placeholder.com/60x60/7c3aed/ffffff?text=SL'
    },
    {
      id: 3,
      name: 'InnovateCo Enterprise',
      email: 'contact@innovateco.fr',
      phone: '+33 1 11 22 33 44',
      address: '789 Boulevard Innovation, Marseille',
      website: 'www.innovateco.fr',
      industry: 'Conseil',
      size: 'Grande (500+)',
      status: 'active',
      subscription: 'premium',
      joinDate: '2023-01-10',
      lastActivity: '2024-01-29',
      employees: 234,
      activeJobs: 45,
      totalApplications: 2134,
      revenue: 22300,
      rating: 4.9,
      logo: 'https://via.placeholder.com/60x60/059669/ffffff?text=IC'
    },
    {
      id: 4,
      name: 'DigitalWorks Agency',
      email: 'info@digitalworks.com',
      phone: '+33 1 55 66 77 88',
      address: '321 Rue Digitale, Toulouse',
      website: 'www.digitalworks.com',
      industry: 'Digital',
      size: 'Petite (10-50)',
      status: 'suspended',
      subscription: 'standard',
      joinDate: '2023-09-05',
      lastActivity: '2024-01-20',
      employees: 67,
      activeJobs: 8,
      totalApplications: 234,
      revenue: 4500,
      rating: 4.2,
      logo: 'https://via.placeholder.com/60x60/ea580c/ffffff?text=DW'
    },
    {
      id: 5,
      name: 'CreativeHub Studio',
      email: 'studio@creativehub.fr',
      phone: '+33 1 44 55 66 77',
      address: '654 Place Créative, Nice',
      website: 'www.creativehub.fr',
      industry: 'Créatif',
      size: 'Moyenne (50-200)',
      status: 'inactive',
      subscription: 'basic',
      joinDate: '2023-11-12',
      lastActivity: '2024-01-15',
      employees: 123,
      activeJobs: 5,
      totalApplications: 89,
      revenue: 2100,
      rating: 4.0,
      logo: 'https://via.placeholder.com/60x60/dc2626/ffffff?text=CH'
    }
  ]);

  const stats = [
    {
      title: 'Total Entreprises',
      value: companies.length,
      change: '+12.5%',
      trend: 'up',
      icon: Building,
      color: 'blue'
    },
    {
      title: 'Entreprises Actives',
      value: companies.filter(c => c.status === 'active').length,
      change: '+8.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Revenus Totaux',
      value: `€${companies.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}`,
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'Employés Totaux',
      value: companies.reduce((sum, c) => sum + c.employees, 0).toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Actif', class: 'status-active' },
      suspended: { label: 'Suspendu', class: 'status-suspended' },
      inactive: { label: 'Inactif', class: 'status-inactive' }
    };
    return statusConfig[status] || statusConfig.inactive;
  };

  const getSubscriptionBadge = (subscription) => {
    const subConfig = {
      premium: { label: 'Premium', class: 'sub-premium' },
      standard: { label: 'Standard', class: 'sub-standard' },
      basic: { label: 'Basic', class: 'sub-basic' }
    };
    return subConfig[subscription] || subConfig.basic;
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || company.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const paginatedCompanies = sortedCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleCompanyAction = (action, company) => {
    setSelectedCompany(company);
    setModalType(action);
    setShowModal(true);
  };

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCompanies.length === paginatedCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(paginatedCompanies.map(c => c.id));
    }
  };

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Shield size={24} />
          </div>
          <div className="sidebar-logo-text">
            <h1>Admin Panel</h1>
            <p>Tableau de bord</p>
          </div>
        </div>
      </div>
      
      <div className="sidebar-nav">
        <nav>
          <div className="nav-section-title">Navigation</div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/DashboardAdmin')}>
            <BarChart3 size={20} />
            <span>Tableau de bord</span>
          </div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/Users')}>
            <Users size={20} />
            <span>Utilisateurs</span>
            <span className="nav-badge">1.2K</span>
          </div>
          
          <div className="nav-item nav-link nav-link-active">
            <Building size={20} />
            <span>Entreprises</span>
            <span className="nav-badge">{companies.length}</span>
          </div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin/jobs')}>
            <Briefcase size={20} />
            <span>Offres d'emploi</span>
          </div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin/revenue')}>
            <DollarSign size={20} />
            <span>Revenus</span>
          </div>
          
          <div className="nav-section-title" style={{ marginTop: '2rem' }}>Système</div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin/database')}>
            <Database size={20} />
            <span>Base de données</span>
          </div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin/notifications')}>
            <Bell size={20} />
            <span>Notifications</span>
          </div>
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin/settings')}>
            <Settings size={20} />
            <span>Paramètres</span>
          </div>
          
          <div className="nav-divider"></div>
          
          <div className="nav-item nav-link nav-link-danger" onClick={() => handleNavigation('/logout')}>
            <LogOut size={20} />
            <span>Déconnexion</span>
          </div>
        </nav>
      </div>
    </div>
  );

  const Modal = () => {
    if (!showModal || !selectedCompany) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              {modalType === 'view' && 'Détails de l\'entreprise'}
              {modalType === 'edit' && 'Modifier l\'entreprise'}
              {modalType === 'delete' && 'Supprimer l\'entreprise'}
            </h3>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>
          
          <div className="modal-body">
            {modalType === 'view' && (
              <div className="company-details">
                <div className="company-header">
                  <img src={selectedCompany.logo} alt="" className="company-logo-large" />
                  <div className="company-info">
                    <h4>{selectedCompany.name}</h4>
                    <p>{selectedCompany.industry}</p>
                    <div className="company-badges">
                      <span className={`status-badge ${getStatusBadge(selectedCompany.status).class}`}>
                        {getStatusBadge(selectedCompany.status).label}
                      </span>
                      <span className={`subscription-badge ${getSubscriptionBadge(selectedCompany.subscription).class}`}>
                        {getSubscriptionBadge(selectedCompany.subscription).label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="company-stats-grid">
                  <div className="stat-item">
                    <Users size={20} />
                    <div>
                      <span className="stat-value">{selectedCompany.employees}</span>
                      <span className="stat-label">Employés</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Briefcase size={20} />
                    <div>
                      <span className="stat-value">{selectedCompany.activeJobs}</span>
                      <span className="stat-label">Offres actives</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <DollarSign size={20} />
                    <div>
                      <span className="stat-value">€{selectedCompany.revenue.toLocaleString()}</span>
                      <span className="stat-label">Revenus</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Star size={20} />
                    <div>
                      <span className="stat-value">{selectedCompany.rating}</span>
                      <span className="stat-label">Note</span>
                    </div>
                  </div>
                </div>
                
                <div className="company-contact">
                  <h5>Informations de contact</h5>
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{selectedCompany.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{selectedCompany.phone}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span>{selectedCompany.address}</span>
                  </div>
                  <div className="contact-item">
                    <Globe size={16} />
                    <span>{selectedCompany.website}</span>
                  </div>
                </div>
              </div>
            )}
            
            {modalType === 'delete' && (
              <div className="delete-confirmation">
                <div className="delete-icon">
                  <AlertTriangle size={48} />
                </div>
                <h4>Êtes-vous sûr de vouloir supprimer cette entreprise ?</h4>
                <p>Cette action est irréversible. Toutes les données associées à <strong>{selectedCompany.name}</strong> seront définitivement supprimées.</p>
                <div className="delete-actions">
                  <button className="btn-secondary" onClick={() => setShowModal(false)}>
                    Annuler
                  </button>
                  <button className="btn-danger">
                    Supprimer définitivement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const styles = `
    :root {
      --primary-blue: #2563eb;
      --primary-purple: #7c3aed;
      --primary-green: #059669;
      --primary-orange: #ea580c;
      --primary-red: #dc2626;
      --primary-yellow: #d97706;
      --primary-indigo: #4f46e5;
      --primary-emerald: #10b981;
      --primary-cyan: #0891b2;
      --primary-rose: #e11d48;
      
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
      
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      
      --radius-sm: 0.375rem;
      --radius-md: 0.5rem;
      --radius-lg: 0.75rem;
      --radius-xl: 1rem;
      --radius-2xl: 1.5rem;
      --radius-3xl: 2rem;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: var(--gray-50);
      color: var(--gray-900);
      line-height: 1.6;
    }

    .main-container {
      min-height: 100vh;
      display: flex;
      background-color: var(--gray-50);
    }

    /* Sidebar Styles */
    .sidebar {
      width: 320px;
      background: white;
      border-right: 1px solid var(--gray-200);
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 50;
      box-shadow: var(--shadow-xl);
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 2rem;
      border-bottom: 1px solid var(--gray-200);
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .sidebar-logo-icon {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-blue);
    }

    .sidebar-logo-text h1 {
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .sidebar-logo-text p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
    }

    .sidebar-nav {
      padding: 2rem;
    }

    .nav-section-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--gray-500);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: var(--radius-xl);
      text-decoration: none;
      color: var(--gray-700);
      font-weight: 500;
      transition: all 0.2s ease;
      margin-bottom: 0.5rem;
      position: relative;
      cursor: pointer;
    }

    .nav-link:hover {
      background-color: var(--gray-50);
      color: var(--gray-900);
      transform: translateX(4px);
    }

    .nav-link-active {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
      color: var(--primary-blue);
      font-weight: 600;
    }

    .nav-link-danger:hover {
      background-color: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .nav-badge {
      margin-left: auto;
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-weight: 600;
    }

    .nav-divider {
      height: 1px;
      background-color: var(--gray-200);
      margin: 2rem 0;
    }

    /* Main Content */
    .main-content {
      margin-left: 320px;
      flex: 1;
      min-height: 100vh;
    }

    .header {
      background: white;
      border-bottom: 1px solid var(--gray-200);
      padding: 2rem;
      position: sticky;
      top: 0;
      z-index: 40;
      backdrop-filter: blur(20px);
      background-color: rgba(255, 255, 255, 0.9);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .breadcrumb-item {
      color: var(--gray-600);
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .breadcrumb-item:hover {
      color: var(--primary-blue);
    }

    .breadcrumb-separator {
      color: var(--gray-400);
    }

    .header-title h1 {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.25rem;
    }

    .header-title p {
      color: var(--gray-600);
      font-size: 1rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
      color: white;
      border: none;
      border-radius: var(--radius-xl);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: white;
      color: var(--gray-700);
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-xl);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      background: var(--gray-50);
    }

    .btn-danger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--primary-red);
      color: white;
      border: none;
      border-radius: var(--radius-xl);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-danger:hover {
      background: #b91c1c;
    }

    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: var(--radius-2xl);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .stat-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .stat-card-icon {
      padding: 0.75rem;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      transition: transform 0.3s ease;
      color: white;
    }

    .stat-card:hover .stat-card-icon {
      transform: scale(1.1);
    }

    .stat-card-icon.blue { background: linear-gradient(135deg, var(--primary-blue), #1d4ed8); }
    .stat-card-icon.green { background: linear-gradient(135deg, var(--primary-green), #047857); }
    .stat-card-icon.orange { background: linear-gradient(135deg, var(--primary-orange), #c2410c); }
    .stat-card-icon.purple { background: linear-gradient(135deg, var(--primary-purple), #6d28d9); }

    .stat-card-change {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-green);
    }

    .stat-card-value {
      font-size: 2rem;
      font-weight: 800;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    .stat-card-title {
      color: var(--gray-600);
      font-weight: 500;
      font-size: 0.875rem;
    }

    /* Filters and Controls */
    .controls-section {
      margin: 2rem;
      background: white;
      border-radius: var(--radius-2xl);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
    }

    .controls-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .controls-filters {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search-container {
      position: relative;
    }

    .search-input {
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-xl);
      width: 300px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      background: white;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-xl);
      font-size: 0.875rem;
      background: white;
      cursor: pointer;
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .controls-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Table Styles */
    .table-container {
      margin: 0 2rem 2rem 2rem;
      background: white;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
      overflow: hidden;
    }

    .table-header {
      padding: 2rem;
      border-bottom: 1px solid var(--gray-100);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .table-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .bulk-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .bulk-actions.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .companies-table {
      width: 100%;
      border-collapse: collapse;
    }

    .companies-table th {
      background: var(--gray-50);
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--gray-700);
      font-size: 0.875rem;
      border-bottom: 1px solid var(--gray-200);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .companies-table th:hover {
      background: var(--gray-100);
    }

    .companies-table td {
      padding: 1rem;
      border-bottom: 1px solid var(--gray-100);
      font-size: 0.875rem;
    }

    .companies-table tr:hover {
      background: var(--gray-50);
    }

    .company-cell {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .company-logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-xl);
      object-fit: cover;
    }

    .company-info h4 {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .company-info p {
      color: var(--gray-500);
      font-size: 0.75rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-active {
      background: rgba(5, 150, 105, 0.1);
      color: var(--primary-green);
    }

    .status-suspended {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .status-inactive {
      background: var(--gray-100);
      color: var(--gray-800);
    }

    .subscription-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .sub-premium {
      background: rgba(217, 119, 6, 0.1);
      color: var(--primary-yellow);
    }

    .sub-standard {
      background: rgba(124, 58, 237, 0.1);
      color: var(--primary-purple);
    }

    .sub-basic {
      background: var(--gray-100);
      color: var(--gray-800);
    }

    .rating-cell {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .star-rating {
      color: var(--primary-yellow);
    }

    .actions-cell {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.5rem;
      border: none;
      background: none;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--gray-400);
    }

    .action-btn:hover {
      background: var(--gray-100);
      color: var(--gray-600);
    }

    .action-btn.view:hover {
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
    }

    .action-btn.edit:hover {
      background: rgba(217, 119, 6, 0.1);
      color: var(--primary-yellow);
    }

    .action-btn.delete:hover {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .checkbox-cell {
      width: 50px;
    }

    .custom-checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid var(--gray-300);
      border-radius: var(--radius-sm);
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }

    .custom-checkbox:checked {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
    }

    .custom-checkbox:checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: between;
      padding: 2rem;
      border-top: 1px solid var(--gray-100);
    }

    .pagination-info {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
    }

    .pagination-btn {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--gray-300);
      background: white;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
    }

    .pagination-btn:hover:not(:disabled) {
      background: var(--gray-50);
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-btn.active {
      background: var(--primary-blue);
      color: white;
      border-color: var(--primary-blue);
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
      backdrop-filter: blur(4px);
    }

    .modal-content {
      background: white;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-xl);
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 2rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .modal-close {
      width: 40px;
      height: 40px;
      border: none;
      background: var(--gray-100);
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--gray-600);
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      background: var(--gray-200);
    }

    .modal-body {
      padding: 2rem;
    }

    /* Company Details Modal */
    .company-details {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .company-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .company-logo-large {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-2xl);
      object-fit: cover;
    }

    .company-info h4 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
    }

    .company-info p {
      color: var(--gray-600);
      margin-bottom: 1rem;
    }

    .company-badges {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .company-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--gray-50);
      border-radius: var(--radius-xl);
    }

    .stat-item svg {
      color: var(--primary-blue);
    }

    .stat-value {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .stat-label {
      display: block;
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .company-contact h5 {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      color: var(--gray-700);
    }

    .contact-item svg {
      color: var(--gray-400);
    }

    /* Delete Confirmation Modal */
    .delete-confirmation {
      text-align: center;
    }

    .delete-icon {
      color: var(--primary-red);
      margin-bottom: 1rem;
    }

    .delete-confirmation h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .delete-confirmation p {
      color: var(--gray-600);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .delete-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .sidebar {
        width: 280px;
      }
      
      .main-content {
        margin-left: 280px;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .header-content {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      
      .header-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
        margin: 1rem;
      }
      
      .controls-section,
      .table-container {
        margin: 0 1rem 1rem 1rem;
      }
      
      .controls-filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-input {
        width: 100%;
      }
      
      .table-wrapper {
        overflow-x: scroll;
      }

      .companies-table {
        min-width: 800px;
      }
      
      .company-stats-grid {
        grid-template-columns: 1fr;
      }
      
      .modal-content {
        width: 95%;
        margin: 1rem;
      }
      
      .modal-header,
      .modal-body {
        padding: 1.5rem;
      }
    }
  `;

  return (
    <div className="main-container">
      <style>{styles}</style>
      
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-title">
              <div className="breadcrumb">
                <span className="breadcrumb-item" onClick={() => handleNavigation('/DashboardAdmin')}>
                  Tableau de bord
                </span>
                <span className="breadcrumb-separator">/</span>
                <span>Entreprises</span>
              </div>
              <h1>Gestion des Entreprises</h1>
              <p>Gérez et supervisez toutes les entreprises inscrites sur la plateforme</p>
            </div>
            
            <div className="header-actions">
              <button className="btn-secondary">
                <Download size={16} />
                Exporter
              </button>
              <button className="btn-primary">
                <Plus size={16} />
                Nouvelle entreprise
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-card-header">
                <div className={`stat-card-icon ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="stat-card-change">
                  <TrendingUp size={16} />
                  {stat.change}
                </div>
              </div>
              
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-title">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-header">
            <h3>Filtres et recherche</h3>
          </div>
          
          <div className="controls-filters">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Rechercher une entreprise..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-select" 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="suspended">Suspendues</option>
              <option value="inactive">Inactives</option>
            </select>
            
            <div className="controls-actions">
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
        </div>

        {/* Companies Table */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">
              Entreprises ({sortedCompanies.length})
            </h3>
            
            <div className={`bulk-actions ${selectedCompanies.length === 0 ? 'hidden' : ''}`}>
              <span>{selectedCompanies.length} sélectionnée(s)</span>
              <button className="btn-secondary">
                <Mail size={16} />
                Envoyer email
              </button>
              <button className="btn-danger">
                <Trash2 size={16} />
                Supprimer
              </button>
            </div>
          </div>
          
          <div className="table-wrapper">
            <table className="companies-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedCompanies.length === paginatedCompanies.length && paginatedCompanies.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th onClick={() => handleSort('name')}>
                    Entreprise
                    {sortBy === 'name' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th onClick={() => handleSort('industry')}>
                    Secteur
                    {sortBy === 'industry' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th onClick={() => handleSort('employees')}>
                    Employés
                    {sortBy === 'employees' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th onClick={() => handleSort('activeJobs')}>
                    Offres
                    {sortBy === 'activeJobs' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th onClick={() => handleSort('revenue')}>
                    Revenus
                    {sortBy === 'revenue' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th>Statut</th>
                  <th>Abonnement</th>
                  <th onClick={() => handleSort('rating')}>
                    Note
                    {sortBy === 'rating' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCompanies.map((company) => (
                  <tr key={company.id}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleSelectCompany(company.id)}
                      />
                    </td>
                    <td>
                      <div className="company-cell">
                        <img src={company.logo} alt="" className="company-logo" />
                        <div className="company-info">
                          <h4>{company.name}</h4>
                          <p>{company.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{company.industry}</td>
                    <td>{company.employees.toLocaleString()}</td>
                    <td>{company.activeJobs}</td>
                    <td>€{company.revenue.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(company.status).class}`}>
                        {getStatusBadge(company.status).label}
                      </span>
                    </td>
                    <td>
                      <span className={`subscription-badge ${getSubscriptionBadge(company.subscription).class}`}>
                        {getSubscriptionBadge(company.subscription).label}
                      </span>
                    </td>
                    <td>
                      <div className="rating-cell">
                        <Star className="star-rating" size={16} fill="currentColor" />
                        {company.rating}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          className="action-btn view"
                          onClick={() => handleCompanyAction('view', company)}
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-btn edit"
                          onClick={() => handleCompanyAction('edit', company)}
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleCompanyAction('delete', company)}
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
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, sortedCompanies.length)} sur {sortedCompanies.length} entreprises
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Précédent
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default CompaniesManagement;