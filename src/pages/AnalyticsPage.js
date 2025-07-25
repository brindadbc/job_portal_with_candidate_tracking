import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/analysicsCandid.css'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  Clock, 
  Target, 
  Calendar,
  Filter,
  Download,
  Eye,
  UserCheck,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Award,
  MessageSquare
} from 'lucide-react';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('applications');
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    // Animation des statistiques
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

    animateValue(0, 1247, 1000, 'totalViews');
    animateValue(0, 358, 1000, 'applications');
    animateValue(0, 142, 1000, 'interviews');
    animateValue(0, 23, 1000, 'hires');
    animateValue(0, 28.7, 1000, 'conversionRate');
    animateValue(0, 15.2, 1000, 'timeToHire');
  }, [selectedPeriod]);

  const kpiData = [
    {
      title: 'Vues d\'offres',
      value: animatedStats.totalViews || 0,
      change: '+15.2%',
      trend: 'up',
      icon: Eye,
      colorClass: 'blue'
    },
    {
      title: 'Candidatures',
      value: animatedStats.applications || 0,
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      colorClass: 'green'
    },
    {
      title: 'Entretiens',
      value: animatedStats.interviews || 0,
      change: '-2.3%',
      trend: 'down',
      icon: MessageSquare,
      colorClass: 'yellow'
    },
    {
      title: 'Embauches',
      value: animatedStats.hires || 0,
      change: '+12.1%',
      trend: 'up',
      icon: UserCheck,
      colorClass: 'purple'
    },
    {
      title: 'Taux de conversion',
      value: `${animatedStats.conversionRate || 0}%`,
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      colorClass: 'orange'
    },
    {
      title: 'Temps d\'embauche',
      value: `${animatedStats.timeToHire || 0}j`,
      change: '-1.5j',
      trend: 'up',
      icon: Clock,
      colorClass: 'red'
    }
  ];

  const chartData = {
    applications: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      data: [45, 67, 89, 123, 156, 189]
    },
    views: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      data: [234, 345, 456, 567, 678, 789]
    },
    hires: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      data: [3, 5, 8, 12, 15, 18]
    }
  };

  const topJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      views: 1247,
      applications: 89,
      conversionRate: 7.1,
      status: 'Actif'
    },
    {
      id: 2,
      title: 'UX Designer',
      views: 892,
      applications: 67,
      conversionRate: 7.5,
      status: 'Actif'
    },
    {
      id: 3,
      title: 'Product Manager',
      views: 756,
      applications: 45,
      conversionRate: 6.0,
      status: 'Fermé'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      views: 634,
      applications: 34,
      conversionRate: 5.4,
      status: 'Actif'
    }
  ];

  const sourceData = [
    { name: 'Site web', value: 45, colorClass: 'blue' },
    { name: 'LinkedIn', value: 30, colorClass: 'green' },
    { name: 'Indeed', value: 15, colorClass: 'yellow' },
    { name: 'Référencement', value: 10, colorClass: 'purple' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Actif': return 'active';
      case 'Fermé': return 'closed';
      case 'Brouillon': return 'draft';
      default: return 'draft';
    }
  };

  const exportData = () => {
    // Simulation de l'export
    alert('Export des données en cours...');
  };

  const insights = [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Tendance positive',
      description: 'Vos candidatures ont augmenté de 15% ce mois-ci. Continuez sur cette lancée !'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Attention',
      description: 'Le taux de conversion sur LinkedIn est en baisse. Optimisez vos annonces.'
    },
    {
      type: 'success',
      icon: Award,
      title: 'Excellente performance',
      description: 'Votre offre "Senior React Developer" performe 30% mieux que la moyenne.'
    },
    {
      type: 'info',
      icon: Target,
      title: 'Recommandation',
      description: 'Publiez plus d\'offres le mardi et mercredi pour maximiser la visibilité.'
    }
  ];

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="analytics-header">
        <div className="analytics-header-content">
          <div className="analytics-header-flex">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => navigate('/dashboard')}
                className="analytics-back-button"
              >
                <ArrowLeft size={20} />
                Retour
              </button>
              <h1 className="analytics-title">Analytics & Performance</h1>
            </div>
            <div className="analytics-controls">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="analytics-select"
              >
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="3m">3 derniers mois</option>
                <option value="6m">6 derniers mois</option>
                <option value="1y">1 an</option>
              </select>
              <button
                onClick={exportData}
                className="analytics-export-btn"
              >
                <Download size={16} />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-container">
        {/* KPIs */}
        <div className="analytics-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="analytics-kpi-card">
              <div className="analytics-kpi-header">
                <div className={`analytics-kpi-icon ${kpi.colorClass}`}>
                  <kpi.icon size={24} />
                </div>
                <div className={`analytics-kpi-change ${kpi.trend === 'up' ? 'positive' : 'negative'}`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {kpi.change}
                </div>
              </div>
              <div className="analytics-kpi-value">{kpi.value}</div>
              <div className="analytics-kpi-label">{kpi.title}</div>
            </div>
          ))}
        </div>

        <div className="analytics-charts-grid">
          {/* Graphique principal */}
          <div className="analytics-chart-card">
            <div className="analytics-chart-header">
              <h2 className="analytics-chart-title">Tendances</h2>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="analytics-chart-select"
              >
                <option value="applications">Candidatures</option>
                <option value="views">Vues</option>
                <option value="hires">Embauches</option>
              </select>
            </div>
            
            <div className="analytics-chart-placeholder">
              <div className="analytics-chart-placeholder-content">
                <BarChart3 className="analytics-chart-placeholder-icon" />
                <p className="analytics-chart-placeholder-title">Graphique des {selectedMetric}</p>
                <p className="analytics-chart-placeholder-data">
                  Données: {chartData[selectedMetric]?.data.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Sources de candidatures */}
          <div className="analytics-chart-card">
            <div className="analytics-chart-header">
              <h2 className="analytics-chart-title">Sources de candidatures</h2>
            </div>
            <div className="analytics-sources-list">
              {sourceData.map((source, index) => (
                <div key={index} className="analytics-source-item">
                  <div className="analytics-source-info">
                    <div className={`analytics-source-color ${source.colorClass}`}></div>
                    <span className="analytics-source-name">{source.name}</span>
                  </div>
                  <div className="analytics-source-stats">
                    <span className="analytics-source-percentage">{source.value}%</span>
                    <div className="analytics-source-bar">
                      <div 
                        className={`analytics-source-bar-fill ${source.colorClass}`}
                        style={{ width: `${source.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-details-grid">
          {/* Performance des offres */}
          <div className="analytics-chart-card">
            <div className="analytics-chart-header">
              <h2 className="analytics-chart-title">Performance des offres</h2>
              <button style={{ color: 'var(--primary-color)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                Voir tout
              </button>
            </div>
            
            <div className="analytics-jobs-list">
              {topJobs.map((job) => (
                <div key={job.id} className="analytics-job-item">
                  <div className="analytics-job-info">
                    <div className="analytics-job-title">{job.title}</div>
                    <div className="analytics-job-stats">
                      <span className="analytics-job-stat">
                        <Eye size={16} />
                        {job.views} vues
                      </span>
                      <span className="analytics-job-stat">
                        <Users size={16} />
                        {job.applications} candidatures
                      </span>
                      <span className="analytics-job-stat">
                        <Target size={16} />
                        {job.conversionRate}%
                      </span>
                    </div>
                  </div>
                  <div className="analytics-job-actions">
                    <span className={`analytics-job-status ${getStatusClass(job.status)}`}>
                      {job.status}
                    </span>
                    <button 
                      onClick={() => navigate(`/job/${job.id}`)}
                      className="analytics-job-view-btn"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights & Recommandations */}
          <div className="analytics-chart-card">
            <div className="analytics-chart-header">
              <h2 className="analytics-chart-title">Insights & Recommandations</h2>
            </div>
            
            <div className="analytics-insights-list">
              {insights.map((insight, index) => (
                <div key={index} className={`analytics-insight-item ${insight.type}`}>
                  <div className={`analytics-insight-icon ${insight.type}`}>
                    <insight.icon size={20} />
                  </div>
                  <div className="analytics-insight-content">
                    <div className="analytics-insight-title">{insight.title}</div>
                    <div className="analytics-insight-description">{insight.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;