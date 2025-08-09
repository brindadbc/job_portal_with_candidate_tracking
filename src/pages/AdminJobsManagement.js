import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Building, 
  TrendingUp, 
  TrendingDown,
  Activity,
  DollarSign,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  Bell,
  Shield,
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  RefreshCw,
  Zap,
  Target,
  Award,
  Globe,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Heart,
  MessageSquare,
  FileText,
  LogOut,
  ExternalLink,
  UserPlus,
  Pause,
  Play,
  Archive,
  Copy,
  Share2,
  BookOpen,
  Bookmark
} from 'lucide-react';

const AdminJobsManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('posted');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notifications, setNotifications] = useState(12);

  const jobs = [
    {
      id: 1,
      title: 'Développeur Full Stack',
      company: 'TechCorp',
      location: 'Paris',
      type: 'CDI',
      salary: '45000-55000 CFA',
      category: 'tech',
      description: 'Nous recherchons un développeur full stack expérimenté...',
      requirements: ['React', 'Node.js', 'PostgreSQL'],
      posted: '2024-01-15',
      status: 'active',
      applications: 23,
      views: 156
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'Lyon',
      type: 'CDI',
      salary: '38000-45000 CFA',
      category: 'design',
      description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      posted: '2024-01-14',
      status: 'active',
      applications: 18,
      views: 89
    },
    {
      id: 3,
      title: 'Chef de Projet Digital',
      company: 'Digital Agency',
      location: 'Marseille',
      type: 'CDI',
      salary: '42000-50000 CFA',
      category: 'management',
      description: 'Nous cherchons un chef de projet digital dynamique...',
      requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
      posted: '2024-01-13',
      status: 'paused',
      applications: 12,
      views: 67
    },
    {
      id: 4,
      title: "Senior UX Designer",
      company: "Google",
      location: "Remote",
      type: 'stage',
      salary: "$80k-$120k",
      category: 'design',
      description: 'Nous cherchons un responsable de projet digital dynamique...',
      requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
      posted: '2024-01-13',
      status: 'active',
      applications: 45,
      views: 234
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Meta",
      location: "San Francisco",
      type: 'CDI',
      salary: "$100k-$150k",
      category: 'tech',
      description: 'Nous cherchons un chef de projet digital dynamique...',
      requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
      posted: '2024-01-13',
      status: 'active',
      applications: 67,
      views: 345
    },
    {
      id: 6,
      title: "Junior Graphic Designer",
      company: "Adobe",
      location: "New York",
      type: 'freelance',
      salary: "$50k-$70k",
      category: 'design',
      description: 'Nous cherchons un chef de projet digital dynamique...',
      requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
      posted: '2024-01-13',
      status: 'expired',
      applications: 8,
      views: 45
    },
    {
      id: 7,
      title: "Product Designer",
      company: "Apple",
      location: "Cupertino",
      type: 'freelance',
      salary: "$90k-$130k",
      category: 'design',
      description: 'Nous recherchons un développeur full stack expérimenté...',
      requirements: ['React', 'Node.js', 'PostgreSQL'],
      posted: '2024-01-15',
      status: 'active',
      applications: 34,
      views: 189
    },
    {
      id: 8,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Seattle",
      type: 'CDI',
      salary: "$85k-$125k",
      category: 'tech',
      description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      posted: '2024-01-14',
      status: 'active',
      applications: 29,
      views: 167
    },
    {
      id: 9,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Angeles",
      type: 'stage',
      salary: "$110k-$160k",
      category: 'tech',
      description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      posted: '2024-01-14',
      status: 'draft',
      applications: 0,
      views: 0
    }
  ];

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesType = selectedType === 'all' || job.type === selectedType;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesType;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'applications':
          aValue = a.applications;
          bValue = b.applications;
          break;
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'posted':
        default:
          aValue = new Date(a.posted);
          bValue = new Date(b.posted);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredJobs(filtered);
  }, [searchQuery, selectedStatus, selectedCategory, selectedType, sortBy, sortOrder]);

  const handleJobSelect = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'paused': return 'yellow';
      case 'expired': return 'red';
      case 'draft': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'paused': return 'En pause';
      case 'expired': return 'Expiré';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'tech': return 'blue';
      case 'design': return 'purple';
      case 'management': return 'orange';
      default: return 'gray';
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
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
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/Companies-management')}>
            <Building size={20} />
            <span>Entreprises</span>
          </div>
          
          <div className="nav-item nav-link nav-link-active" onClick={() => handleNavigation('/admin-jobs')}>
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
            {notifications > 0 && (
              <span className="nav-badge nav-badge-red">{notifications}</span>
            )}
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

  const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Détails de l'offre</h2>
            <button className="modal-close" onClick={onClose}>
              <XCircle size={24} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="job-details-grid">
              <div className="job-main-info">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <div className="job-meta-item">
                    <Building size={16} />
                    <span>{job.company}</span>
                  </div>
                  <div className="job-meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="job-meta-item">
                    <Calendar size={16} />
                    <span>Publié le {job.posted}</span>
                  </div>
                </div>
                
                <div className="job-badges">
                  <span className={`status-badge ${getStatusColor(job.status)}`}>
                    {getStatusText(job.status)}
                  </span>
                  <span className={`category-badge ${getCategoryColor(job.category)}`}>
                    {job.category}
                  </span>
                  <span className="type-badge">{job.type}</span>
                </div>
                
                <div className="job-description">
                  <h4>Description</h4>
                  <p>{job.description}</p>
                </div>
                
                <div className="job-requirements">
                  <h4>Compétences requises</h4>
                  <div className="requirements-list">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="requirement-tag">{req}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="job-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Eye size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{job.views}</div>
                    <div className="stat-label">Vues</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <UserPlus size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{job.applications}</div>
                    <div className="stat-label">Candidatures</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{job.salary}</div>
                    <div className="stat-label">Salaire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Fermer
            </button>
            <button className="btn btn-primary">
              <Edit size={16} />
              Modifier
            </button>
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

    .nav-badge-red {
      background-color: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
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

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .breadcrumb-item {
      color: var(--gray-500);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .breadcrumb-item:hover {
      color: var(--primary-blue);
    }

    .breadcrumb-separator {
      color: var(--gray-400);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-xl);
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
      background: white;
      color: var(--gray-700);
      border: 1px solid var(--gray-300);
    }

    .btn-secondary:hover {
      background: var(--gray-50);
    }

    .btn-danger {
      background: var(--primary-red);
      color: white;
    }

    .btn-danger:hover {
      background: #b91c1c;
    }

    .notification-btn {
      position: relative;
      padding: 0.75rem;
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-xl);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--gray-600);
    }

    .notification-btn:hover {
      background: var(--gray-200);
    }

    .notification-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      background: var(--primary-red);
      color: white;
      font-size: 0.75rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .admin-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .admin-avatar:hover {
      transform: scale(1.05);
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
    }

    .stat-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .stat-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .stat-card-icon {
      padding: 0.75rem;
      border-radius: var(--radius-xl);
      color: white;
    }

    .stat-card-icon.blue { background: linear-gradient(135deg, var(--primary-blue), #1d4ed8); }
    .stat-card-icon.green { background: linear-gradient(135deg, var(--primary-green), #047857); }
    .stat-card-icon.purple { background: linear-gradient(135deg, var(--primary-purple), #6d28d9); }
    .stat-card-icon.orange { background: linear-gradient(135deg, var(--primary-orange), #c2410c); }

    .stat-card-value {
      font-size: 2rem;
      font-weight: 800;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
    }

    .stat-card-title {
      color: var(--gray-600);
      font-weight: 500;
      font-size: 0.875rem;
    }

    /* Filters and Search */
    .content-section {
      margin: 2rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .filters-bar {
      background: white;
      border-radius: var(--radius-2xl);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
      margin-bottom: 2rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search-container {
      position: relative;
      flex: 1;
      min-width: 250px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-xl);
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
      min-width: 120px;
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    /* Jobs Table */
    .jobs-table-container {
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

    .table-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .bulk-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .bulk-actions.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .jobs-table {
      width: 100%;
      border-collapse: collapse;
    }

    .jobs-table th,
    .jobs-table td {
      padding: 1rem 2rem;
      text-align: left;
      border-bottom: 1px solid var(--gray-100);
    }

    .jobs-table th {
      background: var(--gray-50);
      font-weight: 600;
      color: var(--gray-700);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .jobs-table th:hover {
      background: var(--gray-100);
    }

    .jobs-table tr {
      transition: background-color 0.2s ease;
    }

    .jobs-table tbody tr:hover {
      background: var(--gray-50);
    }

    .job-row {
      position: relative;
    }

    .job-checkbox {
      width: 16px;
      height: 16px;
      accent-color: var(--primary-blue);
      cursor: pointer;
    }

    .job-title-cell {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .job-title {
      font-weight: 600;
      color: var(--gray-900);
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .job-title:hover {
      color: var(--primary-blue);
    }

    .job-company {
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .job-location {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.green {
      background: rgba(5, 150, 105, 0.1);
      color: var(--primary-green);
    }

    .status-badge.yellow {
      background: rgba(217, 119, 6, 0.1);
      color: var(--primary-yellow);
    }

    .status-badge.red {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .status-badge.gray {
      background: var(--gray-100);
      color: var(--gray-600);
    }

    .category-badge {
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-lg);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .category-badge.blue {
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
    }

    .category-badge.purple {
      background: rgba(124, 58, 237, 0.1);
      color: var(--primary-purple);
    }

    .category-badge.orange {
      background: rgba(234, 88, 12, 0.1);
      color: var(--primary-orange);
    }

    .type-badge {
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-lg);
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--gray-100);
      color: var(--gray-700);
      text-transform: uppercase;
    }

    .job-stats {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .job-actions {
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
      transition: background-color 0.2s ease;
      color: var(--gray-500);
    }

    .action-btn:hover {
      background: var(--gray-100);
      color: var(--gray-700);
    }

    .action-btn.primary:hover {
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
    }

    .action-btn.danger:hover {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
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
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 2rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .modal-close {
      padding: 0.5rem;
      border: none;
      background: none;
      border-radius: var(--radius-lg);
      cursor: pointer;
      color: var(--gray-500);
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      background: var(--gray-100);
      color: var(--gray-700);
    }

    .modal-body {
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }

    .job-details-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .job-main-info h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .job-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .job-meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .job-badges {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .job-description,
    .job-requirements {
      margin-bottom: 2rem;
    }

    .job-description h4,
    .job-requirements h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .job-description p {
      color: var(--gray-600);
      line-height: 1.6;
    }

    .requirements-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .requirement-tag {
      padding: 0.5rem 1rem;
      background: var(--gray-100);
      border-radius: var(--radius-xl);
      font-size: 0.875rem;
      color: var(--gray-700);
    }

    .job-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stat-card {
      background: var(--gray-50);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      padding: 0.75rem;
      background: white;
      border-radius: var(--radius-xl);
      color: var(--primary-blue);
    }

    .stat-info {
      flex: 1;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .modal-footer {
      padding: 2rem;
      border-top: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: between;
      padding: 2rem;
      background: white;
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
      padding: 0.5rem 1rem;
      border: 1px solid var(--gray-300);
      background: white;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
    }

    .pagination-btn:hover {
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

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--gray-500);
    }

    .empty-state-icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1rem auto;
      color: var(--gray-400);
    }

    .empty-state h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-700);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      font-size: 0.875rem;
      color: var(--gray-500);
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
      
      .job-details-grid {
        grid-template-columns: 1fr;
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
      
      .filters-row {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-container {
        min-width: auto;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
        margin: 1rem;
      }
      
      .content-section {
        margin: 1rem;
      }
      
      .jobs-table-container {
        overflow-x: auto;
      }
      
      .modal-content {
        width: 95%;
        margin: 1rem;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 1rem;
      }
      
      .filters-bar {
        padding: 1rem;
      }
      
      .table-header {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .jobs-table th,
      .jobs-table td {
        padding: 0.75rem 1rem;
      }
      
      .modal-header,
      .modal-body,
      .modal-footer {
        padding: 1rem;
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
                <span 
                  className="breadcrumb-item"
                  onClick={() => navigate('/')}
                  style={{ cursor: 'pointer' }}
                >
                  Accueil
                </span>
                <span className="breadcrumb-separator">›</span>
                <span 
                  className="breadcrumb-item"
                  onClick={() => navigate('/DashboardAdmin')}
                  style={{ cursor: 'pointer' }}
                >
                  Dashboard
                </span>
                <span className="breadcrumb-separator">›</span>
                <span>Offres d'emploi</span>
              </div>
              <h1>Gestion des Offres d'emploi</h1>
              <p>Gérez toutes les offres d'emploi publiées sur la plateforme</p>
            </div>
            
            <div className="header-actions">
              <button className="notification-btn">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="notification-badge">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </button>
              
              <div className="admin-avatar">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon blue">
                <Briefcase size={24} />
              </div>
            </div>
            <div className="stat-card-value">{jobs.length}</div>
            <div className="stat-card-title">Total des offres</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon green">
                <CheckCircle size={24} />
              </div>
            </div>
            <div className="stat-card-value">{jobs.filter(job => job.status === 'active').length}</div>
            <div className="stat-card-title">Offres actives</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon purple">
                <UserPlus size={24} />
              </div>
            </div>
            <div className="stat-card-value">{jobs.reduce((sum, job) => sum + job.applications, 0)}</div>
            <div className="stat-card-title">Total candidatures</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon orange">
                <Eye size={24} />
              </div>
            </div>
            <div className="stat-card-value">{jobs.reduce((sum, job) => sum + job.views, 0)}</div>
            <div className="stat-card-title">Total vues</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Liste des offres</h2>
            <button className="btn btn-primary">
              <Plus size={16} />
              Nouvelle offre
            </button>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="filters-row">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par titre, entreprise ou lieu..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="paused">En pause</option>
                <option value="expired">Expiré</option>
                <option value="draft">Brouillon</option>
              </select>
              
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Toutes catégories</option>
                <option value="tech">Technologie</option>
                <option value="design">Design</option>
                <option value="management">Management</option>
              </select>
              
              <select 
                className="filter-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="CDI">CDI</option>
                <option value="stage">Stage</option>
                <option value="freelance">Freelance</option>
              </select>
              
              <button className="btn btn-secondary">
                <Download size={16} />
                Exporter
              </button>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="jobs-table-container">
            <div className="table-header">
              <h3 className="table-title">
                {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''}
              </h3>
              
              <div className="table-actions">
                <div className={`bulk-actions ${selectedJobs.length > 0 ? 'visible' : ''}`}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    {selectedJobs.length} sélectionnée{selectedJobs.length > 1 ? 's' : ''}
                  </span>
                  <button className="btn btn-secondary">
                    <Archive size={16} />
                    Archiver
                  </button>
                  <button className="btn btn-danger">
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
                
                <select 
                  className="filter-select"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-');
                    setSortBy(sort);
                    setSortOrder(order);
                  }}
                >
                  <option value="posted-desc">Plus récent</option>
                  <option value="posted-asc">Plus ancien</option>
                  <option value="title-asc">Titre A-Z</option>
                  <option value="title-desc">Titre Z-A</option>
                  <option value="applications-desc">Plus de candidatures</option>
                  <option value="views-desc">Plus de vues</option>
                </select>
              </div>
            </div>
            
            {filteredJobs.length > 0 ? (
              <>
                <table className="jobs-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>
                        <input
                          type="checkbox"
                          className="job-checkbox"
                          checked={selectedJobs.length === filteredJobs.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Offre</th>
                      <th>Localisation</th>
                      <th>Statut</th>
                      <th>Type</th>
                      <th>Catégorie</th>
                      <th>Statistiques</th>
                      <th>Publié</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="job-row">
                        <td>
                          <input
                            type="checkbox"
                            className="job-checkbox"
                            checked={selectedJobs.includes(job.id)}
                            onChange={() => handleJobSelect(job.id)}
                          />
                        </td>
                        <td>
                          <div className="job-title-cell">
                            <div 
                              className="job-title"
                              onClick={() => {
                                setSelectedJob(job);
                                setShowJobModal(true);
                              }}
                            >
                              {job.title}
                            </div>
                            <div className="job-company">{job.company}</div>
                          </div>
                        </td>
                        <td>
                          <div className="job-location">
                            <MapPin size={14} />
                            {job.location}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusColor(job.status)}`}>
                            {getStatusText(job.status)}
                          </span>
                        </td>
                        <td>
                          <span className="type-badge">{job.type}</span>
                        </td>
                        <td>
                          <span className={`category-badge ${getCategoryColor(job.category)}`}>
                            {job.category}
                          </span>
                        </td>
                        <td>
                          <div className="job-stats">
                            <div className="stat-item">
                              <Eye size={14} />
                              {job.views}
                            </div>
                            <div className="stat-item">
                              <UserPlus size={14} />
                              {job.applications}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                            {job.posted}
                          </div>
                        </td>
                        <td>
                          <div className="job-actions">
                            <button 
                              className="action-btn primary"
                              onClick={() => {
                                setSelectedJob(job);
                                setShowJobModal(true);
                              }}
                              title="Voir détails"
                            >
                              <Eye size={16} />
                            </button>
                            <button className="action-btn" title="Modifier">
                              <Edit size={16} />
                            </button>
                            <button className="action-btn" title="Dupliquer">
                              <Copy size={16} />
                            </button>
                            {job.status === 'active' ? (
                              <button className="action-btn" title="Mettre en pause">
                                <Pause size={16} />
                              </button>
                            ) : (
                              <button className="action-btn" title="Activer">
                                <Play size={16} />
                              </button>
                            )}
                            <button className="action-btn danger" title="Supprimer">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="pagination">
                  <div className="pagination-info">
                    Affichage de 1 à {filteredJobs.length} sur {filteredJobs.length} offres
                  </div>
                  <div className="pagination-controls">
                    <button className="pagination-btn" disabled>
                      Précédent
                    </button>
                    <button className="pagination-btn active">1</button>
                    <button className="pagination-btn" disabled>
                      Suivant
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <Briefcase className="empty-state-icon" />
                <h3>Aucune offre trouvée</h3>
                <p>Aucune offre ne correspond à vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Modal */}
      {showJobModal && (
        <JobModal 
          job={selectedJob} 
          onClose={() => {
            setShowJobModal(false);
            setSelectedJob(null);
          }} 
        />
      )}
    </div>
  );
};

export default AdminJobsManagement;