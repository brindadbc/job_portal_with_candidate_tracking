import React, { useState, useEffect } from 'react';
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
  Heart
} from 'lucide-react';

const RecruiterDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [animatedStats, setAnimatedStats] = useState({});

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

  const recentJobPostings = [
    { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Actif', date: '2024-01-15', location: 'Paris' },
    { id: 2, title: 'UX Designer', applicants: 23, status: 'Actif', date: '2024-01-12', location: 'Remote' },
    { id: 3, title: 'Product Manager', applicants: 67, status: 'Fermé', date: '2024-01-10', location: 'Lyon' },
    { id: 4, title: 'DevOps Engineer', applicants: 34, status: 'Actif', date: '2024-01-08', location: 'Marseille' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'bg-blue-100 text-blue-800';
      case 'Fermé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ stat, index }) => (
    <div 
      className="stat-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="stat-icon-container">
        <div className={`stat-icon ${stat.color}`}>
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
          <div className="nav-item">
            <Building className="w-5 h-5" />
            <span>Profil entreprise</span>
          </div>
          <div className="nav-item">
            <Briefcase className="w-5 h-5" />
            <span>Mes offres</span>
          </div>
          <div className="nav-item">
            <Users className="w-5 h-5" />
            <span>Candidats</span>
          </div>
          <div className="nav-item">
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <span className="nav-badge">5</span>
          </div>
          <div className="nav-item">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item">
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="nav-item">
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
            <span className="breadcrumb-item">Accueil</span>
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
              />
            </div>
            
            <button className="notification-btn">
              <Bell className="w-5 h-5" />
              <span className="notification-dot"></span>
            </button>
            
            <div className="user-avatar">
              <img src="https://via.placeholder.com/32x32" alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Tableau de bord Recruteur</h1>
              <p className="dashboard-subtitle">Gérez vos offres et candidatures</p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Importer candidats
              </button>
              <button className="btn-primary">
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
                <button className="btn-icon">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <div className="jobs-list">
                {recentJobPostings.map((job) => (
                  <div key={job.id} className="job-item">
                    <div className="job-info">
                      <div className="job-title">{job.title}</div>
                      <div className="job-meta">
                        <span className="job-location">{job.location}</span>
                        <span className="job-date">{job.date}</span>
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
                <button className="btn-text">Voir tout</button>
              </div>
              <div className="candidates-list">
                <div className="candidate-item">
                  <div className="candidate-avatar">
                    <img src="https://via.placeholder.com/40x40" alt="Candidat" />
                  </div>
                  <div className="candidate-info">
                    <div className="candidate-name">Marie Dubois</div>
                    <div className="candidate-position">Senior React Developer</div>
                    <div className="candidate-match">
                      <Star className="w-3 h-3 text-yellow-500" />
                      95% match
                    </div>
                  </div>
                  <div className="candidate-actions">
                    <button className="btn-primary-sm">Examiner</button>
                    <button className="btn-icon">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="candidate-item">
                  <div className="candidate-avatar">
                    <img src="https://via.placeholder.com/40x40" alt="Candidat" />
                  </div>
                  <div className="candidate-info">
                    <div className="candidate-name">Jean Martin</div>
                    <div className="candidate-position">UX Designer</div>
                    <div className="candidate-match">
                      <Star className="w-3 h-3 text-yellow-500" />
                      89% match
                    </div>
                  </div>
                  <div className="candidate-actions">
                    <button className="btn-primary-sm">Examiner</button>
                    <button className="btn-icon">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Performance des offres</h3>
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