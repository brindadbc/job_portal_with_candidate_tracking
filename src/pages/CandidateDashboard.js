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
  MoreHorizontal,
  Eye,
  ArrowUp,
  ArrowDown,
  Target,
  MapPin,
  Download,
  Plus,
  BarChart3
} from 'lucide-react';

const CandidateDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
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

    animateValue(0, 23, 1000, 'applications');
    animateValue(0, 8, 1000, 'interviews');
    animateValue(0, 156, 1000, 'profileViews');
    animateValue(0, 92, 1000, 'matchRate');
  }, []);

  const candidateStats = [
    { 
      id: 'applications', 
      label: 'Candidatures', 
      value: animatedStats.applications || 0, 
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'bg-blue-500'
    },
    { 
      id: 'interviews', 
      label: 'Entretiens', 
      value: animatedStats.interviews || 0, 
      change: '+5%',
      trend: 'up',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    { 
      id: 'profileViews', 
      label: 'Vues du profil', 
      value: animatedStats.profileViews || 0, 
      change: '+23%',
      trend: 'up',
      icon: Eye,
      color: 'bg-purple-500'
    },
    { 
      id: 'matchRate', 
      label: 'Taux de match', 
      value: `${animatedStats.matchRate || 0}%`, 
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'bg-orange-500'
    }
  ];

  const recentApplications = [
    { id: 1, company: 'Google', position: 'Senior UX Designer', status: 'En cours', date: '2024-01-15', salary: '80k-120k' },
    { id: 2, company: 'Meta', position: 'Frontend Developer', status: 'Entretien', date: '2024-01-12', salary: '90k-130k' },
    { id: 3, company: 'Apple', position: 'Product Manager', status: 'Refusé', date: '2024-01-10', salary: '100k-150k' },
    { id: 4, company: 'Microsoft', position: 'Data Scientist', status: 'Accepté', date: '2024-01-08', salary: '95k-135k' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Entretien': return 'bg-yellow-100 text-yellow-800';
      case 'Accepté': return 'bg-green-100 text-green-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
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
            <User className="w-5 h-5" />
            <span>Mon profil</span>
          </div>
          <div className="nav-item">
            <Briefcase className="w-5 h-5" />
            <span>Mes candidatures</span>
          </div>
          <div className="nav-item">
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <span className="nav-badge">3</span>
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
            <span className="breadcrumb-item active">Tableau de bord Candidat</span>
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
              <h1 className="dashboard-title">Tableau de bord Candidat</h1>
              <p className="dashboard-subtitle">Suivez l'évolution de vos candidatures</p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Exporter CV
              </button>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle candidature
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {candidateStats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Candidatures récentes</h3>
                <button className="btn-icon">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="applications-list">
                {recentApplications.map((app) => (
                  <div key={app.id} className="application-item">
                    <div className="application-info">
                      <div className="application-company">{app.company}</div>
                      <div className="application-position">{app.position}</div>
                      <div className="application-meta">
                        <span className="application-salary">{app.salary}</span>
                        <span className="application-date">{app.date}</span>
                      </div>
                    </div>
                    <div className="application-actions">
                      <span className={`status-badge ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <button className="btn-icon">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Progression des candidatures</h3>
                <select 
                  className="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                  <option value="3m">3 mois</option>
                </select>
              </div>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                  <p className="chart-text">Graphique des candidatures</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Prochains entretiens</h3>
                <button className="btn-text">Voir tout</button>
              </div>
              <div className="interviews-list">
                <div className="interview-item">
                  <div className="interview-time">
                    <div className="interview-date">15 Jan</div>
                    <div className="interview-hour">14:00</div>
                  </div>
                  <div className="interview-details">
                    <div className="interview-company">Google</div>
                    <div className="interview-type">Entretien technique</div>
                    <div className="interview-location">
                      <MapPin className="w-3 h-3" />
                      Visioconférence
                    </div>
                  </div>
                  <button className="btn-primary-sm">Rejoindre</button>
                </div>
                <div className="interview-item">
                  <div className="interview-time">
                    <div className="interview-date">18 Jan</div>
                    <div className="interview-hour">10:30</div>
                  </div>
                  <div className="interview-details">
                    <div className="interview-company">Meta</div>
                    <div className="interview-type">Entretien RH</div>
                    <div className="interview-location">
                      <MapPin className="w-3 h-3" />
                      Paris, France
                    </div>
                  </div>
                  <button className="btn-secondary-sm">Détails</button>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Recommandations</h3>
              </div>
              <div className="recommendations-list">
                <div className="recommendation-item">
                  <div className="recommendation-icon">
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="recommendation-content">
                    <div className="recommendation-title">Optimisez votre profil</div>
                    <div className="recommendation-text">Ajoutez 3 compétences pour augmenter vos chances</div>
                  </div>
                  <button className="btn-text">Optimiser</button>
                </div>
                <div className="recommendation-item">
                  <div className="recommendation-icon">
                    <FileText className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="recommendation-content">
                    <div className="recommendation-title">Nouveau CV suggéré</div>
                    <div className="recommendation-text">Basé sur vos dernières expériences</div>
                  </div>
                  <button className="btn-text">Télécharger</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;