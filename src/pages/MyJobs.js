
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Briefcase,
  ChevronDown,
  ExternalLink,
  FileText,
  Send
} from 'lucide-react';

const MyJobs = () => {
  const navigate = useNavigate();
  const { 
    jobs, 
    loading,
    error,
    fetchMyJobs,
    deleteJob, 
    deleteJobs, 
    updateJobStatus, 
    updateJobsStatus, 
    duplicateJob 
  } = useJobs();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Charger les offres au montage du composant
  useEffect(() => {
    fetchMyJobs();
  }, []);

  // Recharger les offres quand les filtres changent
  useEffect(() => {
    const filters = {
      status: selectedStatus,
      search: searchQuery,
      sort: selectedSort
    };
    fetchMyJobs(filters);
  }, [selectedStatus, searchQuery, selectedSort]);
const formatSalary = (salary) => {
  // Si salary est null, undefined ou vide
  if (!salary) {
    return 'Salaire non spécifié';
  }
  
  // Si salary est déjà une chaîne de caractères
  if (typeof salary === 'string') {
    return salary;
  }
  
  // Si salary est un objet avec les propriétés min, max, currency, period
  if (typeof salary === 'object') {
    const { min, max, currency = 'EUR', period = 'yearly' } = salary;
    
    // Formatage de la devise
    const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;
    
    // Formatage de la période
    const periodText = period === 'yearly' ? '/an' : 
                      period === 'monthly' ? '/mois' : 
                      period === 'hourly' ? '/h' : '';
    
    // Si on a min et max
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} ${currencySymbol}${periodText}`;
    }
    
    // Si on a seulement min
    if (min) {
      return `À partir de ${min.toLocaleString()} ${currencySymbol}${periodText}`;
    }
    
    // Si on a seulement max
    if (max) {
      return `Jusqu'à ${max.toLocaleString()} ${currencySymbol}${periodText}`;
    }
  }
  
  // Fallback
  return 'Salaire non spécifié';
};
  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'status-active';
      case 'Fermé': return 'status-closed';
      case 'Brouillon': return 'status-draft';
      case 'En pause': return 'status-paused';
      default: return 'status-default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'CDI': return 'type-cdi';
      case 'CDD': return 'type-cdd';
      case 'Stage': return 'type-stage';
      case 'Freelance': return 'type-freelance';
      default: return 'type-default';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (selectedSort) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'applicants':
        return (b.applicants || 0) - (a.applicants || 0);
      case 'views':
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  // Modifier les fonctions d'action pour utiliser les nouvelles fonctions async
  const handleJobAction = async (action, jobId) => {
    setActiveDropdown(null);
    
    try {
      switch(action) {
        case 'view':
          navigate(`/job/${jobId}`);
          break;
        case 'edit':
          navigate(`/job/edit/${jobId}`);
          break;
        case 'duplicate':
          const duplicatedId = await duplicateJob(jobId);
          if (duplicatedId) {
            // Recharger les offres pour voir la nouvelle offre dupliquée
            fetchMyJobs();
          }
          break;
        case 'delete':
          if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
            const success = await deleteJob(jobId);
            if (success) {
              // Les données sont automatiquement mises à jour via le context
            }
          }
          break;
        case 'pause':
          await updateJobStatus(jobId, 'En pause');
          break;
        case 'activate':
          await updateJobStatus(jobId, 'Actif');
          break;
        case 'publish':
          await updateJobStatus(jobId, 'Actif');
          break;
      }
    } catch (error) {
      console.error('Erreur lors de l\'action sur l\'offre:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleSelectJob = (jobId) => {
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleBulkAction = async (action) => {
    const selectedJobIds = Array.from(selectedJobs);
    
    if (selectedJobIds.length === 0) {
      alert('Veuillez sélectionner au moins une offre.');
      return;
    }

    try {
      switch(action) {
        case 'delete':
          if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedJobIds.length} offre(s) ?`)) {
            const success = await deleteJobs(selectedJobIds);
            if (success) {
              setSelectedJobs(new Set());
            }
          }
          break;
        case 'activate':
          await updateJobsStatus(selectedJobIds, 'Actif');
          setSelectedJobs(new Set());
          break;
        case 'pause':
          await updateJobsStatus(selectedJobIds, 'En pause');
          setSelectedJobs(new Set());
          break;
        case 'publish':
          await updateJobsStatus(selectedJobIds, 'Actif');
          setSelectedJobs(new Set());
          break;
      }
    } catch (error) {
      console.error('Erreur lors de l\'action en masse:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Ajouter un indicateur de chargement dans le render
  const renderJobsList = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de vos offres...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>Erreur: {error}</p>
          <button onClick={() => fetchMyJobs()} className="btn btn-primary">
            Réessayer
          </button>
        </div>
      );
    }

    if (jobs.length === 0) {
      return (
        <div className="empty-state">
          <Briefcase className="empty-icon" />
          <h3 className="empty-title">
            Aucune offre d'emploi trouvée
          </h3>
          <p className="empty-description">
            {searchQuery || selectedStatus !== 'all' 
              ? 'Essayez de modifier vos filtres de recherche.'
              : 'Commencez par créer votre première offre d\'emploi.'
            }
          </p>
          {!searchQuery && selectedStatus === 'all' && (
            <button
              onClick={() => navigate('/create-job')}
              className="empty-action"
            >
              <Plus size={16} />
              Créer une offre
            </button>
          )}
        </div>
      );
    }

    return (
      <>
        {sortedJobs.map((job) => (
          <JobCard key={job._id || job.id} job={job} />
        ))}
      </>
    );
  };

  const JobCard = ({ job }) => (
    <div className={`job-card ${job.status === 'Brouillon' ? 'job-card-draft' : ''}`}>
      {job.status === 'Brouillon' && (
        <div className="draft-indicator">
          <FileText size={14} />
          <span>Brouillon</span>
        </div>
      )}
      
      <div className="job-card-header">
        <div className="job-card-main">
          <input
            type="checkbox"
            checked={selectedJobs.has(job._id || job.id)}
            onChange={() => handleSelectJob(job._id || job.id)}
            className="job-checkbox"
          />
          <div className="job-info">
            <h3 className="job-title" onClick={() => handleJobAction('view', job._id || job.id)}>
              {job.title || 'Sans titre'}
            </h3>
            <p className="job-department">{job.department || 'Département non spécifié'}</p>
          </div>
        </div>
        
        <div className="job-actions">
          <span className={`job-status ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
          
          <div className="dropdown">
            <button 
              className="dropdown-trigger"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === (job._id || job.id) ? null : (job._id || job.id));
              }}
            >
              <MoreHorizontal size={16} />
            </button>
            
            {activeDropdown === (job._id || job.id) && (
              <div className="dropdown-menu">
                <button onClick={() => handleJobAction('view', job._id || job.id)} className="dropdown-item">
                  <Eye size={16} />
                  Voir l'offre
                </button>
                <button onClick={() => handleJobAction('edit', job._id || job.id)} className="dropdown-item">
                  <Edit size={16} />
                  Modifier
                </button>
                <button onClick={() => handleJobAction('duplicate', job._id || job.id)} className="dropdown-item">
                  <ExternalLink size={16} />
                  Dupliquer
                </button>
                <div className="dropdown-divider"></div>
                
                {job.status === 'Brouillon' ? (
                  <button onClick={() => handleJobAction('publish', job._id || job.id)} className="dropdown-item action-publish">
                    <Send size={16} />
                    Publier
                  </button>
                ) : job.status === 'Actif' ? (
                  <button onClick={() => handleJobAction('pause', job._id || job.id)} className="dropdown-item">
                    <Clock size={16} />
                    Mettre en pause
                  </button>
                ) : (
                  <button onClick={() => handleJobAction('activate', job._id || job.id)} className="dropdown-item action-activate">
                    <Clock size={16} />
                    Activer
                  </button>
                )}
                
                <button onClick={() => handleJobAction('delete', job._id || job.id)} className="dropdown-item action-delete">
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="job-details">
        <div className="job-detail">
          <MapPin size={16} />
          {job.location}
        </div>
        <div className="job-detail">
          <Briefcase size={16} />
          <span className={`job-type ${getTypeColor(job.type)}`}>
            {job.type}
          </span>
        </div>
        <div className="job-detail">
          <Users size={16} />
          {job.applicants || 0} candidatures
        </div>
        <div className="job-detail">
          <Eye size={16} />
          {job.views || 0} vues
        </div>
      </div>

      <div className="job-footer">
        <div className="job-meta">
          {/* <span className="job-salary">{job.salary || 'Salaire non spécifié'}</span> */}
          <span className="job-salary">{formatSalary(job.salary)}</span>
          <span className="job-date">
            {job.status === 'Brouillon' ? 'Sauvegardé' : 'Publié'} le {formatDate(job.createdAt)}
          </span>
        </div>
        
        <div className="job-buttons">
          {job.status === 'Brouillon' ? (
            <>
              <button onClick={() => handleJobAction('edit', job._id || job.id)} className="btn btn-primary">
                <Edit size={14} />
                Continuer l'édition
              </button>
              <button onClick={() => handleJobAction('publish', job._id || job.id)} className="btn btn-success">
                <Send size={14} />
                Publier
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleJobAction('view', job._id || job.id)} className="btn btn-primary">
                Voir les candidatures
              </button>
              <button onClick={() => handleJobAction('edit', job._id || job.id)} className="btn btn-secondary">
                Modifier
              </button>
            </>
          )}
        </div>
      </div>

      <div className="job-skills">
        {job.skills && job.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .page-container {
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          color: #64748b;
          text-decoration: none;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: color 0.2s;
          border: none;
          background: none;
          cursor: pointer;
        }

        .back-button:hover {
          color: #1e293b;
        }

        .header-title {
          margin: 0;
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
        }

        .header-subtitle {
          margin: 0.25rem 0 0 0;
          color: #64748b;
          font-size: 1rem;
        }

        .create-job-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .create-job-btn:hover {
          background: #2563eb;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .filters-section {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .filters-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .filters-left {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .search-container {
          position: relative;
          min-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          background: #ffffff;
          color: #1e293b;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          background: #ffffff;
          color: #1e293b;
          min-width: 150px;
        }

        .select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .filters-right {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #4b5563;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: #f9fafb;
          color: #1e293b;
        }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bulk-count {
          font-size: 0.875rem;
          color: #64748b;
        }

        .bulk-btn {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .bulk-btn.activate {
          background: #dcfce7;
          color: #166534;
        }

        .bulk-btn.activate:hover {
          background: #bbf7d0;
        }

        .bulk-btn.pause {
          background: #fef3c7;
          color: #92400e;
        }

        .bulk-btn.pause:hover {
          background: #fde68a;
        }

        .bulk-btn.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .bulk-btn.delete:hover {
          background: #fecaca;
        }

        .bulk-btn.publish {
          background: #e0f2fe;
          color: #0369a1;
        }

        .bulk-btn.publish:hover {
          background: #bae6fd;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }

        .stat-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .stat-info p {
          margin: 0;
          font-size: 1.875rem;
          font-weight: 700;
        }

        .stat-icon {
          padding: 0.75rem;
          border-radius: 50%;
        }

        .stat-icon.blue {
          background: #dbeafe;
          color: #2563eb;
        }

        .stat-icon.green {
          background: #dcfce7;
          color: #16a34a;
        }

        .stat-icon.purple {
          background: #ede9fe;
          color: #9333ea;
        }

        .stat-icon.orange {
          background: #fed7aa;
          color: #ea580c;
        }

        .stat-icon.yellow {
          background: #fef3c7;
          color: #d97706;
        }

        .stat-total {
          color: #1e293b;
        }

        .stat-active {
          color: #16a34a;
        }

        .stat-applications {
          color: #9333ea;
        }

        .stat-views {
          color: #ea580c;
        }

        .stat-drafts {
          color: #d97706;
        }

        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .loading-container {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
        }

        .loading-spinner {
          width: 2rem;
          height: 2rem;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
          color: #dc2626;
        }

        .error-container p {
          margin-bottom: 1rem;
        }

        .job-card {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: box-shadow 0.2s;
          position: relative;
        }

        .job-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .job-card-draft {
          border-left: 4px solid #f59e0b;
          background: linear-gradient(to right, #fef3c7 0%, #ffffff 5%);
        }

        .draft-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #f59e0b;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .job-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .job-card-main {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          flex: 1;
        }

        .job-checkbox {
          margin-top: 0.25rem;
          width: 1rem;
          height: 1rem;
          accent-color: #3b82f6;
        }

        .job-info {
          flex: 1;
        }

        .job-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          transition: color 0.2s;
        }

        .job-title:hover {
          color: #3b82f6;
        }

        .job-department {
          margin: 0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .job-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .job-status {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 9999px;
        }

        .status-active {
          background: #dcfce7;
          color: #166534;
        }

        .status-closed {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-draft {
          background: #fef3c7;
          color: #92400e;
        }

        .status-paused {
          background: #f1f5f9;
          color: #475569;
        }

        .status-default {
          background: #f1f5f9;
          color: #475569;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-trigger {
          padding: 0.5rem;
          background: none;
          border: none;
          border-radius: 0.5rem;
          color: #64748b;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .dropdown-trigger:hover {
          background: #f1f5f9;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 0.5rem;
          background: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          z-index: 10;
          min-width: 180px;
          padding: 0.25rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          font-size: 0.675rem;
          color: #374151;
          background: none;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .dropdown-item:hover {
          background: #f9fafb;
        }

        .dropdown-item.action-activate:hover {
          background: #f0fdf4;
          color: #166534;
        }

        .dropdown-item.action-publish:hover {
          background: #e0f2fe;
          color: #0369a1;
        }

        .dropdown-item.action-delete:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .dropdown-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0.25rem 0;
        }

        .job-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .job-detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .job-type {
          padding: 0.125rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 0.375rem;
        }

        .type-cdi {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .type-cdd {
          background: #ede9fe;
          color: #7c3aed;
        }

        .type-stage {
          background: #fed7aa;
          color: #c2410c;
        }

        .type-freelance {
          background: #e0e7ff;
          color: #4338ca;
        }

        .type-default {
          background: #f1f5f9;
          color: #475569;
        }

        .job-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .job-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .job-salary {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .job-date {
          font-size: 0.875rem;
          color: #64748b;
        }

        .job-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .btn-primary {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .btn-primary:hover {
          background: #dbeafe;
        }

        .btn-secondary {
          background: #f9fafb;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
        }

        .btn-success {
          background: #ecfdf5;
          color: #059669;
        }

        .btn-success:hover {
          background: #d1fae5;
        }

        .job-skills {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.25rem 0.5rem;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.75rem;
          border-radius: 0.375rem;
        }

        .empty-state {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
        }

        .empty-icon {
          width: 3rem;
          height: 3rem;
          color: #9ca3af;
          margin: 0 auto 1rem auto;
        }

        .empty-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.125rem;
          font-weight: 500;
          color: #1e293b;
        }

        .empty-description {
          margin: 0 0 1.5rem 0;
          color: #64748b;
        }

        .empty-action {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .empty-action:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-row {
            align-items: stretch;
          }

          .filters-left {
            flex-direction: column;
          }

          .search-container {
            min-width: auto;
          }

          .job-details {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .job-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .job-buttons {
            justify-content: stretch;
          }

          .btn {
            flex: 1;
          }

          .draft-indicator {
            position: static;
            margin-bottom: 0.5rem;
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 1rem;
          }

          .job-card {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .bulk-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
      
      {/* return ( */}
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/RecruiterDashboard')} className="back-button">
              <ArrowLeft size={20} />
              Retour
            </button>
            <div>
              <h1 className="header-title">Mes offres d'emploi</h1>
              <p className="header-subtitle">Gérez vos offres d'emploi et suivez les candidatures</p>
            </div>
          </div>
          <button onClick={() => navigate('/create-job')} className="create-job-btn">
            <Plus size={16} />
            Nouvelle offre
          </button>
        </div>
      </header>

        <main className="main-content">
          {/* Filters and Search */}
          <section className="filters-section">
            <div className="filters-row">
              <div className="filters-left">
                <div className="search-container">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher par titre, département..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="select"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="Actif">Actif</option>
                  <option value="Brouillon">Brouillon</option>
                  <option value="En pause">En pause</option>
                  <option value="Fermé">Fermé</option>
                </select>
                
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="select"
                >
                  <option value="newest">Plus récent</option>
                  <option value="oldest">Plus ancien</option>
                  <option value="applicants">Candidatures</option>
                  <option value="views">Vues</option>
                </select>
              </div>
              
              <div className="filters-right">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="filter-btn"
                >
                  <Filter size={16} />
                  Filtres
                </button>
                
                {selectedJobs.size > 0 && (
                  <div className="bulk-actions">
                    <span className="bulk-count">
                      {selectedJobs.size} sélectionnée(s)
                    </span>
                    {Array.from(selectedJobs).some(id => jobs.find(j => j.id === id)?.status === 'Brouillon') && (
                      <button
                        onClick={() => handleBulkAction('publish')}
                        className="bulk-btn publish"
                      >
                        Publier
                      </button>
                    )}
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="bulk-btn activate"
                    >
                      Activer
                    </button>
                    <button
                      onClick={() => handleBulkAction('pause')}
                      className="bulk-btn pause"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="bulk-btn delete"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <h3>Total offres</h3>
                  <p className="stat-total">{jobs.length}</p>
                </div>
                <div className="stat-icon blue">
                  <Briefcase size={24} />
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <h3>Offres actives</h3>
                  <p className="stat-active">
                    {jobs.filter(job => job.status === 'Actif').length}
                  </p>
                </div>
                <div className="stat-icon green">
                  <Clock size={24} />
                </div>
              </div>
            </div>

            {/* <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <h3>Brouillons</h3>
                  <p className="stat-drafts">
                    {jobs.filter(job => job.status === 'Brouillon').length}
                  </p>
                </div>
                <div className="stat-icon yellow">
                  <FileText size={24} />
                </div>
              </div>
            </div> */}
            
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <h3>Candidatures</h3>
                  <p className="stat-applications">
                    {jobs.reduce((total, job) => total + (job.applicants || 0), 0)}
                  </p>
                </div>
                <div className="stat-icon purple">
                  <Users size={24} />
                </div>
              </div>
            </div>
          </section>

          {/* Jobs List */}
          <section className="jobs-list">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="empty-state">
                <Briefcase className="empty-icon" />
                <h3 className="empty-title">
                  Aucune offre d'emploi trouvée
                </h3>
                <p className="empty-description">
                  {searchQuery || selectedStatus !== 'all' 
                    ? 'Essayez de modifier vos filtres de recherche.'
                    : 'Commencez par créer votre première offre d\'emploi.'
                  }
                </p>
                {!searchQuery && selectedStatus === 'all' && (
                  <button
                    onClick={() => navigate('/create-job')}
                    className="empty-action"
                  >
                    <Plus size={16} />
                    Créer une offre
                  </button>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default MyJobs;














