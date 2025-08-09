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
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
   const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [animatedStats, setAnimatedStats] = useState({});
  const [notifications, setNotifications] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  

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

    animateValue(0, 12847, 1500, 'totalUsers');
    animateValue(0, 3421, 1200, 'activeJobs');
    animateValue(0, 892, 1000, 'companies');
    animateValue(0, 156780, 1800, 'revenue');
    animateValue(0, 2345, 1300, 'applications');
    animateValue(0, 567, 1100, 'hires');
    animateValue(0, 98.7, 1400, 'uptime');
    animateValue(0, 234, 900, 'support');
  }, []);

  const adminStats = [
    { 
      id: 'totalUsers', 
      title: 'Utilisateurs totaux', 
      value: animatedStats.totalUsers || 0, 
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    { 
      id: 'activeJobs', 
      title: 'Offres actives', 
      value: animatedStats.activeJobs || 0, 
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'green'
    },
    { 
      id: 'companies', 
      title: 'Entreprises', 
      value: animatedStats.companies || 0, 
      change: '+15.3%',
      trend: 'up',
      icon: Building,
      color: 'purple'
    },
    { 
      id: 'revenue', 
      title: 'Revenus (€)', 
      value: animatedStats.revenue || 0, 
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    },
    { 
      id: 'applications', 
      title: 'Candidatures', 
      value: animatedStats.applications || 0, 
      change: '+18.7%',
      trend: 'up',
      icon: FileText,
      color: 'indigo'
    },
    { 
      id: 'hires', 
      title: 'Embauches', 
      value: animatedStats.hires || 0, 
      change: '+31.2%',
      trend: 'up',
      icon: UserCheck,
      color: 'emerald'
    },
    { 
      id: 'uptime', 
      title: 'Disponibilité (%)', 
      value: `${animatedStats.uptime || 0}%`, 
      change: '+0.3%',
      trend: 'up',
      icon: Activity,
      color: 'cyan'
    },
    { 
      id: 'support', 
      title: 'Tickets support', 
      value: animatedStats.support || 0, 
      change: '-12.5%',
      trend: 'down',
      icon: MessageSquare,
      color: 'rose'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'Marie Dubois', email: 'marie.dubois@email.com', type: 'Candidat', status: 'Actif', joinDate: '2024-01-20', avatar: 'https://via.placeholder.com/40x40/2563eb/ffffff?text=MD' },
    { id: 2, name: 'Jean Martin', email: 'j.martin@techcorp.com', type: 'Recruteur', status: 'Actif', joinDate: '2024-01-19', avatar: 'https://via.placeholder.com/40x40/7c3aed/ffffff?text=JM' },
    { id: 3, name: 'Sophie Laurent', email: 'sophie.l@startup.io', type: 'Recruteur', status: 'Suspendu', joinDate: '2024-01-18', avatar: 'https://via.placeholder.com/40x40/059669/ffffff?text=SL' },
    { id: 4, name: 'Pierre Durand', email: 'p.durand@email.com', type: 'Candidat', status: 'Actif', joinDate: '2024-01-17', avatar: 'https://via.placeholder.com/40x40/ea580c/ffffff?text=PD' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', title: 'Utilisation serveur élevée', message: 'CPU à 85% sur srv-prod-01', time: '5 min', severity: 'medium' },
    { id: 2, type: 'success', title: 'Sauvegarde terminée', message: 'Sauvegarde quotidienne réussie', time: '1h', severity: 'low' },
    { id: 3, type: 'error', title: 'Erreur de paiement', message: '3 transactions échouées', time: '2h', severity: 'high' },
    { id: 4, type: 'info', title: 'Nouvelle entreprise', message: 'TechStart s\'est inscrite', time: '3h', severity: 'low' }
  ];

  const companyStats = [
    { name: 'TechCorp', users: 145, jobs: 23, growth: '+15%', status: 'premium' },
    { name: 'StartupLab', users: 89, jobs: 12, growth: '+8%', status: 'standard' },
    { name: 'InnovateCo', users: 234, jobs: 45, growth: '+22%', status: 'premium' },
    { name: 'DigitalWorks', users: 67, jobs: 8, growth: '-5%', status: 'standard' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  
  const handleNavigation = (route) => {
    navigate(route);
  };

  const StatCard = ({ stat, index }) => (
    <div 
      className={`stat-card stat-card-${stat.color}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="stat-card-bg-decoration"></div>
      
      <div className="stat-card-header">
        <div className={`stat-card-icon stat-card-icon-${stat.color}`}>
          <stat.icon size={24} />
        </div>
        <div className={`stat-card-change ${stat.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
          {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {stat.change}
        </div>
      </div>
      
      <div className="stat-card-content">
        <div className="stat-card-value">
          {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
        </div>
        <div className="stat-card-title">{stat.title}</div>
      </div>
    </div>
  );

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
          
          <div className="nav-item nav-link nav-link-active" onClick={() => handleNavigation('/DashboardAdmin')}>
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
          
          <div className="nav-item nav-link" onClick={() => handleNavigation('/admin-jobs')}>
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

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-container {
      position: relative;
    }

    .search-input {
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-xl);
      width: 280px;
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

    /* Welcome Section */
    .welcome-section {
      background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 50%, #4338ca 100%);
      border-radius: var(--radius-3xl);
      margin: 2rem;
      padding: 3rem;
      color: white;
      position: relative;
      overflow: hidden;
    }

    .welcome-bg-1 {
      position: absolute;
      top: -8rem;
      right: -8rem;
      width: 16rem;
      height: 16rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }

    .welcome-bg-2 {
      position: absolute;
      bottom: -6rem;
      left: -6rem;
      width: 12rem;
      height: 12rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }

    .welcome-content {
      position: relative;
      z-index: 10;
    }

    .welcome-grid {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: center;
    }

    .welcome-text h2 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .welcome-text p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }

    .welcome-status {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-dot {
      width: 12px;
      height: 12px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .welcome-icon {
      width: 8rem;
      height: 8rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(20px);
      color: rgba(255, 255, 255, 0.8);
    }

    /* Quick Actions */
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 0 2rem 2rem 2rem;
    }

    .quick-action-btn {
      background: white;
      padding: 1.5rem;
      border-radius: var(--radius-xl);
      border: 1px solid var(--gray-200);
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
    }

    .quick-action-btn:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .quick-action-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .quick-action-icon {
      padding: 0.5rem;
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
    }

    .quick-action-btn:hover .quick-action-icon {
      transform: scale(1.1);
    }

    .quick-action-icon.blue { background: rgba(37, 99, 235, 0.1); color: var(--primary-blue); }
    .quick-action-icon.green { background: rgba(5, 150, 105, 0.1); color: var(--primary-green); }
    .quick-action-icon.purple { background: rgba(124, 58, 237, 0.1); color: var(--primary-purple); }
    .quick-action-icon.orange { background: rgba(234, 88, 12, 0.1); color: var(--primary-orange); }

    .quick-action-text {
      font-weight: 500;
      color: var(--gray-700);
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 0 2rem 2rem 2rem;
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
      animation: slideInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes slideInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .stat-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .stat-card-bg-decoration {
      position: absolute;
      top: -2.5rem;
      right: -2.5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      opacity: 0.1;
      transition: transform 0.3s ease;
    }

    .stat-card:hover .stat-card-bg-decoration {
      transform: scale(1.2);
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

    .stat-card-icon-blue { background: linear-gradient(135deg, var(--primary-blue), #1d4ed8); }
    .stat-card-icon-green { background: linear-gradient(135deg, var(--primary-green), #047857); }
    .stat-card-icon-purple { background: linear-gradient(135deg, var(--primary-purple), #6d28d9); }
    .stat-card-icon-orange { background: linear-gradient(135deg, var(--primary-orange), #c2410c); }
    .stat-card-icon-indigo { background: linear-gradient(135deg, var(--primary-indigo), #3730a3); }
    .stat-card-icon-emerald { background: linear-gradient(135deg, var(--primary-emerald), #059669); }
    .stat-card-icon-cyan { background: linear-gradient(135deg, var(--primary-cyan), #0e7490); }
    .stat-card-icon-rose { background: linear-gradient(135deg, var(--primary-rose), #be123c); }

    .stat-card-change {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .trend-up { color: var(--primary-green); }
    .trend-down { color: var(--primary-red); }

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

    /* Content Grid */
    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin: 0 2rem 2rem 2rem;
    }

    .content-card {
      background: white;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
      overflow: hidden;
    }

    .content-card-header {
      padding: 2rem;
      border-bottom: 1px solid var(--gray-100);
    }

    .content-card-header-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .content-card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }

    .content-card-action {
      color: var(--primary-blue);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: color 0.2s ease;
    }

    .content-card-action:hover {
      color: var(--primary-purple);
    }

    .content-card-body {
      padding: 2rem;
    }

    /* Recent Users */
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .user-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-radius: var(--radius-xl);
      transition: background-color 0.2s ease;
    }

    .user-item:hover {
      background-color: var(--gray-50);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-xl);
      object-fit: cover;
    }

    .user-details h4 {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .user-details p {
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .user-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-type-date {
      text-align: right;
    }

    .user-type-date .type {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-700);
    }

    .user-type-date .date {
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.active {
      background: rgba(5, 150, 105, 0.1);
      color: var(--primary-green);
    }

    .status-badge.suspended {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .status-badge.inactive {
      background: var(--gray-100);
      color: var(--gray-800);
    }

    .user-actions {
      padding: 0.25rem;
      border: none;
      background: none;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: background-color 0.2s ease;
      color: var(--gray-400);
    }

    .user-actions:hover {
      background-color: var(--gray-200);
    }

    /* System Alerts */
    .alert-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alert-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: var(--radius-xl);
      transition: background-color 0.2s ease;
    }

    .alert-item:hover {
      background-color: var(--gray-50);
    }

    .alert-icon {
      padding: 0.5rem;
      border-radius: var(--radius-lg);
    }

    .alert-icon.warning {
      background: rgba(217, 119, 6, 0.1);
      color: var(--primary-yellow);
    }

    .alert-icon.error {
      background: rgba(220, 38, 38, 0.1);
      color: var(--primary-red);
    }

    .alert-icon.success {
      background: rgba(5, 150, 105, 0.1);
      color: var(--primary-green);
    }

    .alert-icon.info {
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
    }

    .alert-content {
      flex: 1;
      min-width: 0;
    }

    .alert-title {
      font-weight: 500;
      color: var(--gray-900);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .alert-message {
      color: var(--gray-600);
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .alert-time {
      color: var(--gray-400);
      font-size: 0.75rem;
    }

    /* Bottom Grid */
    .bottom-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin: 0 2rem 2rem 2rem;
    }

    /* Company Performance */
    .company-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .company-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border: 1px solid var(--gray-100);
      border-radius: var(--radius-xl);
    }

    .company-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .company-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .company-details h4 {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .company-details p {
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .company-stats {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .company-growth {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .company-growth.positive {
      color: var(--primary-green);
    }

    .company-growth.negative {
      color: var(--primary-red);
    }

    .company-status {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .company-status.premium {
      background: rgba(217, 119, 6, 0.1);
      color: var(--primary-yellow);
    }

    .company-status.standard {
      background: var(--gray-100);
      color: var(--gray-800);
    }

    /* Revenue Chart */
    .chart-placeholder {
      height: 16rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05));
      border-radius: var(--radius-xl);
      margin-bottom: 1.5rem;
    }

    .chart-content {
      text-align: center;
    }

    .chart-icon {
      width: 4rem;
      height: 4rem;
      color: var(--gray-400);
      margin: 0 auto 1rem auto;
    }

    .chart-title {
      color: var(--gray-500);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .chart-subtitle {
      color: var(--gray-400);
      font-size: 0.875rem;
    }

    .revenue-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .revenue-stat {
      text-align: center;
      padding: 1rem;
      border-radius: var(--radius-xl);
    }

    .revenue-stat.green {
      background: rgba(5, 150, 105, 0.05);
    }

    .revenue-stat.blue {
      background: rgba(37, 99, 235, 0.05);
    }

    .revenue-stat.purple {
      background: rgba(124, 58, 237, 0.05);
    }

    .revenue-value {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .revenue-value.green { color: var(--primary-green); }
    .revenue-value.blue { color: var(--primary-blue); }
    .revenue-value.purple { color: var(--primary-purple); }

    .revenue-label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .revenue-label.green { color: #047857; }
    .revenue-label.blue { color: #1d4ed8; }
    .revenue-label.purple { color: #6d28d9; }

    /* Activity Feed */
    .activity-feed {
      margin: 2rem;
    }

    .activity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .activity-filters {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn.active {
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary-blue);
    }

    .filter-btn:not(.active) {
      background: none;
      color: var(--gray-600);
    }

    .filter-btn:not(.active):hover {
      background: var(--gray-50);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      border-radius: var(--radius-xl);
      transition: background-color 0.2s ease;
    }

    .activity-item:hover {
      background-color: var(--gray-50);
    }

    .activity-icon {
      padding: 0.5rem;
      border-radius: var(--radius-lg);
    }

    .activity-details {
      flex: 1;
    }

    .activity-title {
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .activity-description {
      color: var(--gray-600);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .activity-time {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--gray-400);
      font-size: 0.75rem;
    }

    /* System Status */
    .system-status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem;
    }

    .status-card {
      background: white;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-100);
      padding: 2rem;
    }

    .status-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .status-card-title {
      font-weight: 700;
      color: var(--gray-900);
    }

    .status-indicator-online {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-indicator-online .dot {
      width: 12px;
      height: 12px;
      background: var(--primary-green);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .status-indicator-online .text {
      color: var(--primary-green);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .metric-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .metric-label {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .metric-value {
      font-weight: 600;
      color: var(--gray-900);
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--gray-200);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .progress-fill.green { background: var(--primary-green); }
    .progress-fill.yellow { background: var(--primary-yellow); }
    .progress-fill.blue { background: var(--primary-blue); }

    .db-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .db-stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .db-stat-label {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .db-stat-value {
      font-weight: 600;
      color: var(--gray-900);
    }

    .perf-metrics {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .perf-metric {
      margin-bottom: 1rem;
    }

    .perf-metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .perf-metric-label {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .perf-metric-value {
      font-weight: 600;
    }

    .perf-metric-value.green {
      color: var(--primary-green);
    }

    .perf-footer {
      padding-top: 0.5rem;
      border-top: 1px solid var(--gray-100);
    }

    .perf-footer-text {
      font-size: 0.75rem;
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
      
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .bottom-grid {
        grid-template-columns: 1fr;
      }
      
      .system-status-grid {
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
      
      .header-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .search-input {
        width: 200px;
      }
      
      .welcome-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .welcome-text h2 {
        font-size: 2rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .quick-actions {
        grid-template-columns: 1fr 1fr;
      }
      
      .revenue-stats {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 1rem;
      }
      
      .welcome-section {
        margin: 1rem;
        padding: 2rem;
      }
      
      .stats-grid,
      .content-grid,
      .bottom-grid,
      .system-status-grid {
        margin: 0 1rem 1rem 1rem;
      }
      
      .quick-actions {
        grid-template-columns: 1fr;
        margin: 0 1rem 1rem 1rem;
      }
      
      .activity-feed {
        margin: 1rem;
      }
      
      .welcome-text h2 {
        font-size: 1.5rem;
      }
      
      .stat-card {
        padding: 1.5rem;
      }
      
      .content-card-header,
      .content-card-body {
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
                <span 
              className="breadcrumb-item clickable" 
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              Accueil
            </span>
              <h1>Tableau de bord Admin</h1>
              <p>Vue d'ensemble de votre plateforme JobTracks</p>
            </div>
            
            <div className="header-actions">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
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

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-bg-1"></div>
          <div className="welcome-bg-2"></div>
          
          <div className="welcome-content">
            <div className="welcome-grid">
              <div className="welcome-text">
                <h2>Bonjour Admin ! 👋</h2>
                <p>Voici un aperçu de l'activité de votre plateforme aujourd'hui</p>
                
                <div className="welcome-status">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Système en ligne</span>
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Dernière mise à jour: il y a 2 minutes
                  </div>
                </div>
              </div>
              
              <div className="welcome-icon">
                <Activity size={64} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-action-btn">
            <div className="quick-action-content">
              <div className="quick-action-icon blue">
                <Plus size={20} />
              </div>
              <span className="quick-action-text">Nouvel utilisateur</span>
            </div>
          </button>
          
          <button className="quick-action-btn">
            <div className="quick-action-content">
              <div className="quick-action-icon green">
                <Download size={20} />
              </div>
              <span className="quick-action-text">Export données</span>
            </div>
          </button>
          
          <button className="quick-action-btn">
            <div className="quick-action-content">
              <div className="quick-action-icon purple">
                <RefreshCw size={20} />
              </div>
              <span className="quick-action-text">Actualiser système</span>
            </div>
          </button>
          
          <button className="quick-action-btn">
            <div className="quick-action-content">
              <div className="quick-action-icon orange">
                <Settings size={20} />
              </div>
              <span className="quick-action-text">Configuration</span>
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {adminStats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Users */}
          <div className="content-card">
            <div className="content-card-header">
              <div className="content-card-header-flex">
                <h3 className="content-card-title">Utilisateurs récents</h3>
                <a href="/Users" className="content-card-action">
                  Voir tout
                </a>
              </div>
            </div>
            
            <div className="content-card-body">
              <div className="user-list">
                {recentUsers.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="user-info">
                      <img src={user.avatar} alt="" className="user-avatar" />
                      <div className="user-details">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="user-meta">
                      <div className="user-type-date">
                        <div className="type">{user.type}</div>
                        <div className="date">{user.joinDate}</div>
                      </div>
                      <span className={`status-badge ${user.status.toLowerCase() === 'actif' ? 'active' : user.status.toLowerCase() === 'suspendu' ? 'suspended' : 'inactive'}`}>
                        {user.status}
                      </span>
                      <button className="user-actions">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Alertes système</h3>
            </div>
            
            <div className="content-card-body">
              <div className="alert-list">
                {systemAlerts.map((alert) => {
                  const getAlertIcon = (type) => {
                    switch (type) {
                      case 'warning': return AlertTriangle;
                      case 'error': return XCircle;
                      case 'success': return CheckCircle;
                      case 'info': return Bell;
                      default: return Bell;
                    }
                  };

                  const IconComponent = getAlertIcon(alert.type);
                  return (
                    <div key={alert.id} className="alert-item">
                      <div className={`alert-icon ${alert.type}`}>
                        <IconComponent size={16} />
                      </div>
                      <div className="alert-content">
                        <div className="alert-title">{alert.title}</div>
                        <div className="alert-message">{alert.message}</div>
                        <div className="alert-time">il y a {alert.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          {/* Company Performance */}
          <div className="content-card">
            <div className="content-card-header">
              <div className="content-card-header-flex">
                <h3 className="content-card-title">Performance entreprises</h3>
                <select style={{ fontSize: '0.875rem', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', padding: '0.25rem 0.75rem' }}>
                  <option>Cette semaine</option>
                  <option>Ce mois</option>
                  <option>Ce trimestre</option>
                </select>
              </div>
            </div>
            
            <div className="content-card-body">
              <div className="company-list">
                {companyStats.map((company, index) => (
                  <div key={index} className="company-item">
                    <div className="company-info">
                      <div className="company-icon">
                        <Building size={24} />
                      </div>
                      <div className="company-details">
                        <h4>{company.name}</h4>
                        <p>{company.users} utilisateurs • {company.jobs} offres</p>
                      </div>
                    </div>
                    
                    <div className="company-stats">
                      <div className={`company-growth ${company.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                        {company.growth.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {company.growth}
                      </div>
                      <span className={`company-status ${company.status}`}>
                        {company.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="content-card">
            <div className="content-card-header">
              <div className="content-card-header-flex">
                <h3 className="content-card-title">Analyse des revenus</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button style={{ padding: '0.5rem', border: 'none', background: 'none', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
                    <PieChart size={16} color="var(--gray-500)" />
                  </button>
                  <button style={{ padding: '0.5rem', border: 'none', background: 'none', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
                    <LineChart size={16} color="var(--gray-500)" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="content-card-body">
              <div className="chart-placeholder">
                <div className="chart-content">
                  <BarChart3 className="chart-icon" />
                  <p className="chart-title">Graphique des revenus</p>
                  <p className="chart-subtitle">Données en temps réel</p>
                </div>
              </div>
              
              <div className="revenue-stats">
                <div className="revenue-stat green">
                  <div className="revenue-value green">€45.2K</div>
                  <div className="revenue-label green">Ce mois</div>
                </div>
                <div className="revenue-stat blue">
                  <div className="revenue-value blue">€38.1K</div>
                  <div className="revenue-label blue">Mois dernier</div>
                </div>
                <div className="revenue-stat purple">
                  <div className="revenue-value purple">+18.6%</div>
                  <div className="revenue-label purple">Croissance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="content-card activity-feed">
          <div className="content-card-header">
            <div className="activity-header">
              <h3 className="content-card-title">Activité récente</h3>
              <div className="activity-filters">
                <button className="filter-btn active">Tout</button>
                <button className="filter-btn">Utilisateurs</button>
                <button className="filter-btn">Système</button>
              </div>
            </div>
          </div>
          
          <div className="content-card-body">
            <div className="activity-list">
              {[
                { 
                  icon: UserCheck, 
                  title: 'Nouvel utilisateur inscrit', 
                  description: 'Marie Dubois a rejoint la plateforme en tant que candidat',
                  time: 'il y a 5 minutes',
                  color: 'success'
                },
                { 
                  icon: Briefcase, 
                  title: 'Nouvelle offre publiée', 
                  description: 'TechCorp a publié "Développeur Senior React"',
                  time: 'il y a 12 minutes',
                  color: 'info'
                },
                { 
                  icon: DollarSign, 
                  title: 'Paiement reçu', 
                  description: 'Abonnement Premium renouvelé par StartupLab (€299)',
                  time: 'il y a 25 minutes',
                  color: 'success'
                },
                { 
                  icon: AlertTriangle, 
                  title: 'Alerte système', 
                  description: 'Utilisation mémoire élevée détectée sur le serveur principal',
                  time: 'il y a 1 heure',
                  color: 'warning'
                },
                { 
                  icon: Building, 
                  title: 'Nouvelle entreprise', 
                  description: 'InnovateCo a créé son compte entreprise',
                  time: 'il y a 2 heures',
                  color: 'info'
                }
              ].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.color}`}>
                    <activity.icon size={20} />
                  </div>
                  <div className="activity-details">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-description">{activity.description}</div>
                    <div className="activity-time">
                      <Clock size={12} />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="system-status-grid">
          <div className="status-card">
            <div className="status-card-header">
              <h4 className="status-card-title">Statut serveur</h4>
              <div className="status-indicator-online">
                <div className="dot"></div>
                <span className="text">En ligne</span>
              </div>
            </div>
            
            <div className="metric-list">
              <div>
                <div className="metric-item">
                  <span className="metric-label">CPU</span>
                  <span className="metric-value">23%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill green" style={{width: '23%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="metric-item">
                  <span className="metric-label">Mémoire</span>
                  <span className="metric-value">67%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill yellow" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="metric-item">
                  <span className="metric-label">Stockage</span>
                  <span className="metric-value">45%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill blue" style={{width: '45%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-card-header">
              <h4 className="status-card-title">Base de données</h4>
              <Database size={20} color="var(--primary-blue)" />
            </div>
            
            <div className="db-stats">
              <div className="db-stat-item">
                <span className="db-stat-label">Utilisateurs</span>
                <span className="db-stat-value">12,847</span>
              </div>
              <div className="db-stat-item">
                <span className="db-stat-label">Entreprises</span>
                <span className="db-stat-value">892</span>
              </div>
              <div className="db-stat-item">
                <span className="db-stat-label">Offres d'emploi</span>
                <span className="db-stat-value">3,421</span>
              </div>
              <div className="db-stat-item">
                <span className="db-stat-label">Candidatures</span>
                <span className="db-stat-value">45,234</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-card-header">
              <h4 className="status-card-title">Performance</h4>
              <Zap size={20} color="var(--primary-yellow)" />
            </div>
            
            <div className="perf-metrics">
              <div className="perf-metric">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">Temps de réponse</span>
                  <span className="perf-metric-value green">342ms</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill green" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="perf-metric">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">Disponibilité</span>
                  <span className="perf-metric-value green">99.9%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill green" style={{width: '99.9%'}}></div>
                </div>
              </div>
              
              <div className="perf-footer">
                <div className="perf-footer-text">Dernière vérification: il y a 30s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;