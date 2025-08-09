import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/applicationService';
import '../styles/pages/candidatePage.css';
import { 
  Search, 
  Filter, 
  Download, 
  Star, 
  Heart, 
  Eye, 
  MessageSquare, 
  Calendar,
  MapPin,
  Clock,
  Award,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  Phone,
  Mail,
  FileText,
  Building,
  Users,
  BarChart3,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  AlertCircle,
  RefreshCw,
  UserCheck,
  UserX,
  Send,
  Download as DownloadIcon,
  ExternalLink,
  CheckCircle,
  XCircle,
  User,
  DollarSign,
  Grid3X3,
  List,
  MoreHorizontal,
  Loader2,
  Globe,
  Target
} from 'lucide-react';

const CandidatesPage = () => {
  const navigate = useNavigate();
  
  // États principaux
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // États de pagination et filtres
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 20
  });
  
  const [filters, setFilters] = useState({
    status: 'all',
    jobId: '',
    experience: '',
    location: '',
    sortBy: 'appliedDate',
    order: 'desc'
  });
  
  // États UI
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [likedCandidates, setLikedCandidates] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  
  // États données
  const [availableJobs, setAvailableJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    reviewed: 0,
    shortlisted: 0,
    interviewed: 0,
    accepted: 0,
    rejected: 0
  });
  
  // États de debug et téléchargement
  const [debugInfo, setDebugInfo] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [downloadingDocuments, setDownloadingDocuments] = useState(new Set());

  // FONCTION DE CHARGEMENT DES CANDIDATURES
  const loadCandidates = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
      setError(null);

      console.log('🔄 Chargement candidatures avec filtres:', {
        search: searchQuery,
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });

      // Préparer les paramètres
      const params = {
        search: searchQuery.trim() || undefined,
        status: filters.status !== 'all' ? filters.status : undefined,
        jobId: filters.jobId || undefined,
        experience: filters.experience || undefined,
        location: filters.location.trim() || undefined,
        sortBy: filters.sortBy,
        order: filters.order,
        page: pagination.page,
        limit: pagination.limit
      };

      // Nettoyer les paramètres undefined
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      console.log('📤 Paramètres finaux:', params);

      // Appel API
      const response = await applicationService.getRecruiterApplications(params);
      
      console.log('📥 Réponse reçue:', {
        applicationsCount: response.applications?.length || 0,
        total: response.total,
        hasJobs: !!response.jobs,
        jobsCount: response.jobs?.length || 0
      });

      // Mettre à jour les états
      setCandidates(response.applications || []);
      
      setPagination(prev => ({
        ...prev,
        total: response.total || 0,
        pages: response.pagination?.pages || Math.ceil((response.total || 0) / prev.limit),
        page: response.pagination?.page || prev.page
      }));

      // Mettre à jour les jobs disponibles si fournis
      if (response.jobs && response.jobs.length > 0) {
        setAvailableJobs(response.jobs);
      }

      // Mettre à jour les stats si fournies
      if (response.stats) {
        setStats(response.stats);
      }

      // Mettre à jour les infos de debug
      if (response.debug || response.metadata) {
        setDebugInfo({
          ...response.debug,
          ...response.metadata,
          lastUpdate: new Date().toISOString()
        });
      }

      setLastUpdate(new Date().toISOString());
      console.log('✅ Candidatures chargées avec succès');

    } catch (err) {
      console.error('❌ Erreur chargement candidatures:', err);
      
      let errorMessage = 'Erreur lors du chargement des candidatures';
      
      if (err.message?.includes('Session expirée')) {
        errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
        setTimeout(() => navigate('/login'), 3000);
      } else if (err.message?.includes('Accès refusé')) {
        errorMessage = 'Accès refusé. Vérifiez vos permissions de recruteur.';
      } else if (err.message?.includes('réseau') || err.message?.includes('Network')) {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      // Ne pas effacer les candidats existants en cas d'erreur
      if (candidates.length === 0) {
        setCandidates([]);
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, pagination.page, pagination.limit, navigate, candidates.length]);

  // Chargement des jobs disponibles
  const loadAvailableJobs = useCallback(async () => {
    try {
      console.log('📥 Chargement des jobs...');
      const jobs = await applicationService.getRecruiterJobs();
      console.log('✅ Jobs chargés:', jobs.length);
      setAvailableJobs(jobs || []);
    } catch (err) {
      console.warn('⚠️ Erreur chargement jobs:', err.message);
      setAvailableJobs([]);
    }
  }, []);

  // Chargement des statistiques
  const loadStats = useCallback(async () => {
    try {
      const statsData = await applicationService.getApplicationStats();
      setStats(statsData);
    } catch (err) {
      console.warn('⚠️ Erreur chargement stats:', err.message);
    }
  }, []);

  // Effet d'initialisation
  useEffect(() => {
    const initializePage = async () => {
      console.log('🚀 Initialisation page candidats');
      
      // Diagnostic initial
      try {
        const diagnostic = await applicationService.diagnoseAPI();
        setDebugInfo(diagnostic);
        console.log('🔍 Diagnostic:', diagnostic);
      } catch (err) {
        console.warn('⚠️ Échec diagnostic:', err);
      }

      // Chargement parallèle des données
      await Promise.all([
        loadCandidates(true),
        loadAvailableJobs(),
        loadStats()
      ]);
    };

    initializePage();
  }, [loadCandidates, loadAvailableJobs, loadStats]);

  // Effet pour les changements de filtres/pagination
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCandidates();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, pagination.page]);

  // FONCTION DE MISE À JOUR DE STATUT
  const handleStatusChange = async (candidateId, newStatus, note = '') => {
    try {
      console.log('📝 Changement de statut:', { candidateId, newStatus, note });
      
      await applicationService.updateApplicationStatus(candidateId, newStatus, note);
      
      // Mettre à jour localement le candidat
      setCandidates(prev => prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus, lastUpdate: new Date().toLocaleDateString('fr-FR') }
          : candidate
      ));

      // Recharger les stats
      await loadStats();
      
      console.log('✅ Statut mis à jour avec succès');
      
    } catch (error) {
      console.error('❌ Erreur mise à jour statut:', error);
      alert(`Erreur lors de la mise à jour du statut: ${error.message}`);
    }
  };

  // ACTIONS EN LOT
  const handleBulkAction = async (action) => {
    if (selectedCandidates.size === 0) {
      alert('Veuillez sélectionner au moins un candidat');
      return;
    }

    const statusMap = {
      'shortlist': 'shortlisted',
      'reject': 'rejected',
      'accept': 'accepted',
      'review': 'reviewed'
    };

    const newStatus = statusMap[action];
    if (!newStatus) {
      alert('Action non reconnue');
      return;
    }

    try {
      const candidateIds = Array.from(selectedCandidates);
      console.log(`🔄 Action en lot: ${action} sur ${candidateIds.length} candidats`);

      // Utiliser la fonction de mise à jour en lot du service
      const result = await applicationService.updateBulkApplicationStatus(candidateIds, newStatus);
      
      if (result.successful > 0) {
        // Mettre à jour localement les candidats
        setCandidates(prev => prev.map(candidate => 
          candidateIds.includes(candidate.id) 
            ? { ...candidate, status: newStatus, lastUpdate: new Date().toLocaleDateString('fr-FR') }
            : candidate
        ));

        // Recharger les stats
        await loadStats();
        
        alert(`Action "${action}" appliquée avec succès à ${result.successful} candidat(s)`);
        
        if (result.failed > 0) {
          alert(`Attention: ${result.failed} candidat(s) n'ont pas pu être mis à jour.`);
        }
      }
      
      setSelectedCandidates(new Set());
    } catch (error) {
      console.error('❌ Erreur action en lot:', error);
      alert(`Erreur lors de l'action en lot: ${error.message}`);
    }
  };

  // FONCTION DE TÉLÉCHARGEMENT DE DOCUMENTS - COMPLÈTEMENT RÉVISÉE
  const downloadDocument = async (candidateId, documentType, fileName) => {
    const downloadKey = `${candidateId}-${documentType}`;
    
    try {
      console.log('📥 === DÉBUT TÉLÉCHARGEMENT ===');
      console.log('Paramètres:', { candidateId, documentType, fileName });

      // Vérifier si un téléchargement est déjà en cours pour ce document
      if (downloadingDocuments.has(downloadKey)) {
        console.log('⏳ Téléchargement déjà en cours pour ce document');
        return;
      }

      // Marquer le document comme en cours de téléchargement
      setDownloadingDocuments(prev => new Set(prev).add(downloadKey));

      // Validation des paramètres
      if (!candidateId) {
        throw new Error('ID de candidat manquant');
      }

      if (!documentType) {
        throw new Error('Type de document manquant');
      }

      // Trouver le candidat pour vérifier la disponibilité du document
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) {
        throw new Error('Candidat non trouvé');
      }

      // Vérifier que le document existe pour ce candidat
      const documentAvailable = {
        'cv': candidate.hasCV,
        'coverLetter': candidate.hasCoverLetter,
        'coverLetterFile': candidate.hasCoverLetter,
        'portfolio': candidate.hasPortfolio
      };

      if (!documentAvailable[documentType] && !documentAvailable[documentType.toLowerCase()]) {
        throw new Error(`Le document "${documentType}" n'est pas disponible pour ce candidat`);
      }

      console.log('✅ Validation réussie, appel du service...');

      // Appel au service de téléchargement
      const result = await applicationService.downloadDocument(candidateId, documentType, fileName);
      
      console.log('✅ Téléchargement terminé avec succès:', result);

      // Optionnel: Afficher un message de succès
      if (result && result.success !== false) {
        console.log('📥 Document téléchargé:', result.fileName || fileName || `${documentType}_${candidateId}`);
      }

    } catch (error) {
      console.error('❌ === ERREUR TÉLÉCHARGEMENT ===');
      console.error('Détails:', {
        candidateId,
        documentType,
        fileName,
        error: error.message
      });

      // Afficher une erreur conviviale à l'utilisateur
      let userMessage = 'Erreur lors du téléchargement';
      
      if (error.message.includes('non trouvé')) {
        userMessage = `Document "${documentType}" non trouvé pour ce candidat`;
      } else if (error.message.includes('Session expirée')) {
        userMessage = 'Session expirée. Veuillez vous reconnecter.';
      } else if (error.message.includes('Accès refusé')) {
        userMessage = 'Vous n\'avez pas l\'autorisation de télécharger ce document.';
      } else if (error.message.includes('connexion') || error.message.includes('Network')) {
        userMessage = 'Problème de connexion. Vérifiez votre connexion internet.';
      } else if (error.message.includes('timeout')) {
        userMessage = 'Le téléchargement a pris trop de temps. Veuillez réessayer.';
      } else if (error.message) {
        userMessage = error.message;
      }

      alert(`Erreur de téléchargement: ${userMessage}`);
    } finally {
      // Retirer le document des téléchargements en cours
      setDownloadingDocuments(prev => {
        const newSet = new Set(prev);
        newSet.delete(downloadKey);
        return newSet;
      });
    }
  };

  // Gestion des favoris
  const handleToggleFavorite = async (candidateId) => {
    try {
      await applicationService.toggleFavorite(candidateId);
      
      setLikedCandidates(prev => {
        const newSet = new Set(prev);
        if (newSet.has(candidateId)) {
          newSet.delete(candidateId);
        } else {
          newSet.add(candidateId);
        }
        return newSet;
      });
      
      // Mettre à jour localement
      setCandidates(prev => prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, isFavorite: !candidate.isFavorite }
          : candidate
      ));
      
    } catch (error) {
      console.error('❌ Erreur favoris:', error);
      alert(`Erreur lors de la mise à jour des favoris: ${error.message}`);
    }
  };

  // Gestion des sélections
  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(candidateId)) {
        newSet.delete(candidateId);
      } else {
        newSet.add(candidateId);
      }
      return newSet;
    });
  };

  // Gestion des filtres
  const handleFilterChange = (key, value) => {
    console.log('🔄 Changement filtre:', key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset page
  };

  // Gestion de la pagination
  const handlePageChange = (newPage) => {
    console.log('📄 Changement page:', newPage);
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Fonctions utilitaires
  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800 border-blue-200',
      'reviewed': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'shortlisted': 'bg-green-100 text-green-800 border-green-200',
      'interviewed': 'bg-purple-100 text-purple-800 border-purple-200',
      'accepted': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status) => {
    const texts = {
      'new': 'Nouveau',
      'reviewed': 'Examiné',
      'shortlisted': 'Présélectionné',
      'interviewed': 'Entretien',
      'accepted': 'Accepté',
      'rejected': 'Rejeté'
    };
    return texts[status] || status;
  };

  const openCandidateModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  const closeCandidateModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidate(null);
  };

  // Fonction pour vérifier si un document est en cours de téléchargement
  const isDocumentDownloading = (candidateId, documentType) => {
    return downloadingDocuments.has(`${candidateId}-${documentType}`);
  };

  // Composant Modal de détails candidat
  const CandidateDetailModal = ({ candidate, onClose }) => {
    if (!candidate) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-large" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title-section">
              <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar-large" />
              <div>
                <h2 className="modal-title">{candidate.name}</h2>
                <p className="modal-subtitle">
                  Candidat pour: <strong>{candidate.jobTitle}</strong> chez <strong>{candidate.jobCompany}</strong>
                </p>
                <div className="modal-meta">
                  <span className={`status-badge ${getStatusColor(candidate.status)}`}>
                    {getStatusText(candidate.status)}
                  </span>
                  <span className="match-badge">
                    <Target className="w-4 h-4" />
                    {candidate.match}% de correspondance
                  </span>
                </div>
              </div>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="modal-body">
            <div className="candidate-details-grid">
              {/* Informations de contact */}
              <div className="detail-section">
                <h3>Informations de contact</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  </div>
                  <div className="contact-item">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${candidate.phone}`}>{candidate.phone}</a>
                  </div>
                  <div className="contact-item">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                  </div>
                  {candidate.portfolioUrl && (
                    <div className="contact-item">
                      <ExternalLink className="w-4 h-4" />
                      <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                  )}
                  {candidate.linkedinUrl && (
                    <div className="contact-item">
                      <ExternalLink className="w-4 h-4" />
                      <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations du poste */}
              <div className="detail-section">
                <h3>Informations du poste</h3>
                <div className="job-info">
                  <div className="job-item">
                    <Briefcase className="w-4 h-4" />
                    <span><strong>{candidate.jobTitle}</strong></span>
                  </div>
                  <div className="job-item">
                    <Building className="w-4 h-4" />
                    <span>{candidate.jobCompany}</span>
                  </div>
                  <div className="job-item">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.jobLocation}</span>
                  </div>
                  <div className="job-item">
                    <DollarSign className="w-4 h-4" />
                    <span>{candidate.jobSalary}</span>
                  </div>
                  <div className="job-item">
                    <Clock className="w-4 h-4" />
                    <span>{candidate.jobType}</span>
                  </div>
                  {candidate.remote && (
                    <div className="job-item">
                      <Globe className="w-4 h-4" />
                      <span>Télétravail possible</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations professionnelles */}
              <div className="detail-section">
                <h3>Profil professionnel</h3>
                <div className="profile-info">
                  <div className="profile-item">
                    <Clock className="w-4 h-4" />
                    <span>Expérience: {candidate.experience}</span>
                  </div>
                  <div className="profile-item">
                    <DollarSign className="w-4 h-4" />
                    <span>Prétentions: {candidate.salary}</span>
                  </div>
                  <div className="profile-item">
                    <Calendar className="w-4 h-4" />
                    <span>Disponibilité: {candidate.availability}</span>
                  </div>
                  <div className="profile-item">
                    <Calendar className="w-4 h-4" />
                    <span>Candidature envoyée: {candidate.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Compétences candidat */}
              {candidate.skills && candidate.skills.length > 0 && (
                <div className="detail-section">
                  <h3>Compétences du candidat</h3>
                  <div className="skills-list">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="skill-tag candidate-skill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Compétences requises pour le poste */}
              {candidate.jobSkills && candidate.jobSkills.length > 0 && (
                <div className="detail-section">
                  <h3>Compétences requises pour le poste</h3>
                  <div className="skills-list">
                    {candidate.jobSkills.map((skill, index) => {
                      const isMatching = candidate.skills && candidate.skills.some(
                        candidateSkill => candidateSkill.toLowerCase() === skill.toLowerCase()
                      );
                      return (
                        <span 
                          key={index} 
                          className={`skill-tag ${isMatching ? 'job-skill-matching' : 'job-skill'}`}
                        >
                          {skill}
                          {isMatching && <Check className="w-3 h-3 ml-1" />}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description du poste */}
              {candidate.jobDescription && (
                <div className="detail-section full-width">
                  <h3>Description du poste</h3>
                  <div className="job-description">
                    {candidate.jobDescription}
                  </div>
                </div>
              )}

              {/* Exigences du poste */}
              {candidate.jobRequirements && candidate.jobRequirements.length > 0 && (
                <div className="detail-section full-width">
                  <h3>Exigences du poste</h3>
                  <ul className="requirements-list">
                    {candidate.jobRequirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lettre de motivation */}
              {candidate.coverLetter && (
                <div className="detail-section full-width">
                  <h3>Lettre de motivation</h3>
                  <div className="cover-letter-content">
                    {candidate.coverLetter}
                  </div>
                </div>
              )}

              {/* Motivation */}
              {candidate.motivation && (
                <div className="detail-section full-width">
                  <h3>Motivation</h3>
                  <div className="motivation-content">
                    {candidate.motivation}
                  </div>
                </div>
              )}

              {/* Réponses aux questions personnalisées */}
              {candidate.customAnswers && candidate.customAnswers.length > 0 && (
                <div className="detail-section full-width">
                  <h3>Réponses aux questions spécifiques</h3>
                  <div className="custom-answers">
                    {candidate.customAnswers.map((answer, index) => (
                      <div key={index} className="custom-answer">
                        <h4>{answer.question}</h4>
                        <p>{answer.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents - Version corrigée avec indicateurs de téléchargement */}
              <div className="detail-section full-width">
                <h3>Documents</h3>
                <div className="documents-list">
                  {candidate.hasCV && (
                    <button 
                      className="document-btn"
                      onClick={() => downloadDocument(candidate.id, 'cv', `CV_${candidate.name.replace(/ /g, '_')}.pdf`)}
                      disabled={isDocumentDownloading(candidate.id, 'cv')}
                    >
                      <FileText className="w-4 h-4" />
                      <span>CV</span>
                      {isDocumentDownloading(candidate.id, 'cv') ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <DownloadIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {candidate.hasCoverLetter && (
                    <button 
                      className="document-btn"
                      onClick={() => downloadDocument(candidate.id, 'coverLetterFile', `Lettre_${candidate.name.replace(/ /g, '_')}.pdf`)}
                      disabled={isDocumentDownloading(candidate.id, 'coverLetterFile')}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Lettre de motivation</span>
                      {isDocumentDownloading(candidate.id, 'coverLetterFile') ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <DownloadIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {candidate.hasPortfolio && (
                    <button 
                      className="document-btn"
                      onClick={() => downloadDocument(candidate.id, 'portfolio', `Portfolio_${candidate.name.replace(/ /g, '_')}.pdf`)}
                      disabled={isDocumentDownloading(candidate.id, 'portfolio')}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Portfolio</span>
                      {isDocumentDownloading(candidate.id, 'portfolio') ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <DownloadIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {(!candidate.hasCV && !candidate.hasCoverLetter && !candidate.hasPortfolio) && (
                    <div className="no-documents">Aucun document disponible</div>
                  )}
                </div>
              </div>

              {/* Notes du recruteur */}
              {candidate.recruiterNotes && candidate.recruiterNotes.length > 0 && (
                <div className="detail-section full-width">
                  <h3>Notes du recruteur</h3>
                  <div className="recruiter-notes">
                    {candidate.recruiterNotes.map((note, index) => (
                      <div key={index} className="recruiter-note">
                        <div className="note-header">
                          <span className="note-author">{note.author?.firstName} {note.author?.lastName}</span>
                          <span className="note-date">{new Date(note.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <p className="note-content">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Historique des statuts */}
              {candidate.statusHistory && candidate.statusHistory.length > 0 && (
                <div className="detail-section full-width">
                  <h3>Historique des statuts</h3>
                  <div className="status-history">
                    {candidate.statusHistory.map((history, index) => (
                      <div key={index} className="status-history-item">
                        <div className="status-dot"></div>
                        <div className="status-info">
                          <span className={`status-badge ${getStatusColor(history.status)}`}>
                            {getStatusText(history.status)}
                          </span>
                          <span className="status-date">
                            {new Date(history.changedAt).toLocaleDateString('fr-FR')} à {new Date(history.changedAt).toLocaleTimeString('fr-FR')}
                          </span>
                          {history.note && <p className="status-note">{history.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="modal-footer">
            <div className="status-change-section">
              <label htmlFor="status-select">Changer le statut:</label>
              <select 
                id="status-select"
                value={candidate.status}
                onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                className="status-select"
              >
                <option value="new">Nouveau</option>
                <option value="reviewed">Examiné</option>
                <option value="shortlisted">Présélectionné</option>
                <option value="interviewed">Entretien</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>
            <div className="modal-actions">
              <button 
                className={`favorite-btn ${candidate.isFavorite ? 'favorited' : ''}`}
                onClick={() => handleToggleFavorite(candidate.id)}
              >
                <Heart className={`w-4 h-4 ${candidate.isFavorite ? 'fill-current' : ''}`} />
                {candidate.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Fermer
              </button>
              <button 
                className="btn-primary"
                onClick={() => navigate(`/messages?candidate=${candidate.id}`)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant carte candidat - Version corrigée avec indicateurs de téléchargement
  const CandidateCard = ({ candidate }) => (
    <div className="candidate-card">
      <div className="candidate-card-header">
        <div className="candidate-select">
          <input
            type="checkbox"
            checked={selectedCandidates.has(candidate.id)}
            onChange={() => handleCandidateSelect(candidate.id)}
          />
        </div>
        <div className="candidate-avatar-container">
          <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
          <div className={`match-score ${candidate.match > 90 ? 'high' : candidate.match > 80 ? 'medium' : 'low'}`}>
            {candidate.match}%
          </div>
          {candidate.isFavorite && (
            <div className="favorite-indicator">
              <Heart className="w-3 h-3 fill-current text-red-500" />
            </div>
          )}
        </div>
        <div className="candidate-actions">
          <button 
            className={`action-btn ${candidate.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => handleToggleFavorite(candidate.id)}
            title={candidate.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`w-4 h-4 ${candidate.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="action-btn"
            onClick={() => openCandidateModal(candidate)}
            title="Voir le profil complet"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="candidate-info">
        <h3 className="candidate-name">{candidate.name}</h3>
        <p className="candidate-position">
          Candidat pour: <strong>{candidate.jobTitle}</strong>
        </p>
        <p className="candidate-company">
          Chez: <strong>{candidate.jobCompany}</strong>
        </p>
        
        <div className="candidate-meta">
          <span className="meta-item" title="Expérience">
            <Clock className="w-3 h-3" />
            {candidate.experience}
          </span>
          <span className="meta-item" title="Localisation">
            <MapPin className="w-3 h-3" />
            {candidate.location}
          </span>
          <span className="meta-item" title="Date de candidature">
            <Calendar className="w-3 h-3" />
            {candidate.appliedDate}
          </span>
          <span className="meta-item" title="Prétentions salariales">
            <DollarSign className="w-3 h-3" />
            {candidate.salary}
          </span>
        </div>
        
        <div className="candidate-documents">
          {candidate.hasCV && <span className="document-indicator cv">CV</span>}
          {candidate.hasCoverLetter && <span className="document-indicator cover">Lettre</span>}
          {candidate.hasPortfolio && <span className="document-indicator portfolio">Portfolio</span>}
        </div>
        
        <div className="candidate-footer">
          <select 
            className={`status-badge ${getStatusColor(candidate.status)}`}
            value={candidate.status}
            onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
            title="Changer le statut"
          >
            <option value="new">Nouveau</option>
            <option value="reviewed">Examiné</option>
            <option value="shortlisted">Présélectionné</option>
            <option value="interviewed">Entretien</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>

        {/* Affichage erreur si présente */}
        {candidate.error && (
          <div className="candidate-error">
            <AlertCircle className="w-4 h-4" />
            <span>Erreur de chargement</span>
          </div>
        )}
      </div>
      
      <div className="candidate-card-actions">
        {candidate.hasCV && (
          <button 
            className="btn-secondary-sm"
            onClick={() => downloadDocument(candidate.id, 'cv', `CV_${candidate.name.replace(/ /g, '_')}.pdf`)}
            disabled={isDocumentDownloading(candidate.id, 'cv')}
            title="Télécharger le CV"
          >
            {isDocumentDownloading(candidate.id, 'cv') ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <DownloadIcon className="w-4 h-4 mr-1" />
            )}
            CV
          </button>
        )}
        <button 
          className="btn-secondary-sm"
          onClick={() => navigate(`/messages?candidate=${candidate.id}`)}
          title="Envoyer un message"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Message
        </button>
        <button 
          className="btn-primary-sm"
          onClick={() => openCandidateModal(candidate)}
          title="Voir le profil complet"
        >
          Voir profil
        </button>
      </div>
    </div>
  );

  // Composant sidebar
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
          <div className="nav-item" onClick={() => navigate('/recruiterDashboard')}>
            <BarChart3 className="w-5 h-5" />
            <span>Tableau de bord</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/company-profile')}>
            <Building className="w-5 h-5" />
            <span>Profil entreprise</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/my-jobs')}>
            <Briefcase className="w-5 h-5" />
            <span>Mes offres</span>
          </div>
          <div className="nav-item active">
            <Users className="w-5 h-5" />
            <span>Candidats</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/messages')}>
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/notifications')}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/login')}>
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  // État de chargement
  if (loading && candidates.length === 0) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <Loader2 className="spinner-icon" />
            <h3>Chargement des candidats...</h3>
            <div className="loading-details">
              <p>Connexion à l'API en cours...</p>
              <p>Récupération des candidatures...</p>
              {debugInfo && (
                <details className="debug-details">
                  <summary>Informations techniques</summary>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error && candidates.length === 0) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <div className="error-container">
            <AlertCircle className="error-icon" />
            <h3>Impossible de charger les candidats</h3>
            <p>{error}</p>
            
            {debugInfo && (
              <div className="debug-summary">
                <h4>Résumé du diagnostic:</h4>
                <ul>
                  <li>Connectivité API: {debugInfo.connectivity?.success ? '✅' : '❌'}</li>
                  <li>Token d'authentification: {debugInfo.authentication?.hasToken ? '✅' : '❌'}</li>
                  <li>Token valide: {debugInfo.authentication?.tokenValid ? '✅' : '❌'}</li>
                  <li>Rôle: {debugInfo.authentication?.payload?.role || 'Non défini'}</li>
                </ul>
              </div>
            )}
            
            <div className="error-actions">
              <button onClick={() => loadCandidates(true)} className="retry-btn">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </button>
              {/* <button onClick={runDiagnostic} className="debug-btn">
                <AlertCircle className="w-4 h-4 mr-2" />
                Diagnostic complet
              </button> */}
              <button onClick={() => navigate('/post-job')} className="reinit-btn">
                <Briefcase className="w-4 h-4 mr-2" />
                Publier une offre
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <nav className="breadcrumb">
            <span className="breadcrumb-item clickable" onClick={() => navigate('/recruiterDashboard')}>
              Accueil
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">
              Candidats
            </span>
          </nav>
          
          <div className="top-actions">
            <div className="search-box">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="notification-btn">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=Recruiter&background=667eea&color=fff" alt="Profile" />
            </div>
          </div>
        </div>

        <div className="page-content">
          {/* En-tête de page */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Candidats</h1>
              <p className="page-subtitle">
                Gérez vos candidatures et trouvez les meilleurs talents
              </p>
              {lastUpdate && (
                <p className="page-meta">
                  Dernière mise à jour: {new Date(lastUpdate).toLocaleString('fr-FR')}
                </p>
              )}
            </div>
            <div className="header-actions">
              <button className="btn-secondary" onClick={() => loadCandidates(true)} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Actualiser
              </button>
              {/* <button className="btn-secondary" onClick={runDiagnostic}>
                <AlertCircle className="w-4 h-4" />
                Diagnostic
              </button> */}
              <button className="btn-primary" onClick={() => navigate('/create-job')}>
                <Briefcase className="w-4 h-4" />
                Publier une offre
              </button>
            </div>
          </div>

          {/* Affichage d'erreur non bloquante */}
          {error && candidates.length > 0 && (
            <div className="error-banner">
              <AlertCircle className="w-4 h-4" />
              <span>Erreur lors de la dernière mise à jour: {error}</span>
              <button onClick={() => loadCandidates(true)} className="retry-btn-sm">
                Réessayer
              </button>
            </div>
          )}

          {/* Indicateur de téléchargements en cours */}
          {downloadingDocuments.size > 0 && (
            <div className="download-banner">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Téléchargement de {downloadingDocuments.size} document(s) en cours...</span>
            </div>
          )}

          {/* Statistiques */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total candidats</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.new}</div>
              <div className="stat-label">Nouveaux</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.shortlisted}</div>
              <div className="stat-label">Présélectionnés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.interviewed}</div>
              <div className="stat-label">Entretiens</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.accepted}</div>
              <div className="stat-label">Acceptés</div>
            </div>
          </div>

          {/* Barre d'outils */}
          <div className="candidates-toolbar">
            <div className="toolbar-left">
              <div className="results-count">
                {candidates.length} candidat{candidates.length !== 1 ? 's' : ''} trouvé{candidates.length !== 1 ? 's' : ''}
                {pagination.total !== candidates.length && (
                  <span className="total-count"> sur {pagination.total} total</span>
                )}
              </div>
              
              {selectedCandidates.size > 0 && (
                <div className="bulk-actions">
                  <span className="selected-count">
                    {selectedCandidates.size} sélectionné{selectedCandidates.size !== 1 ? 's' : ''}
                  </span>
                  <button 
                    className="btn-text"
                    onClick={() => handleBulkAction('review')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Examiner
                  </button>
                  <button 
                    className="btn-text"
                    onClick={() => handleBulkAction('shortlist')}
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Présélectionner
                  </button>
                  <button 
                    className="btn-text"
                    onClick={() => handleBulkAction('reject')}
                  >
                    <UserX className="w-4 h-4 mr-1" />
                    Rejeter
                  </button>
                  <button 
                    className="btn-text"
                    onClick={() => handleBulkAction('accept')}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accepter
                  </button>
                </div>
              )}
            </div>
            
            <div className="toolbar-right">
              <button 
                className={`btn-secondary ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filtres
                {(filters.status !== 'all' || filters.jobId || filters.experience || filters.location) && (
                  <span className="filter-indicator">●</span>
                )}
              </button>
              
              <div className="sort-by">
                <span>Trier par:</span>
                <select 
                  value={`${filters.sortBy}-${filters.order}`}
                  onChange={(e) => {
                    const [sortBy, order] = e.target.value.split('-');
                    handleFilterChange('sortBy', sortBy);
                    handleFilterChange('order', order);
                  }}
                >
                  <option value="appliedDate-desc">Date (récent)</option>
                  <option value="appliedDate-asc">Date (ancien)</option>
                  <option value="match-desc">Match (élevé)</option>
                  <option value="match-asc">Match (faible)</option>
                  <option value="name-asc">Nom (A-Z)</option>
                  <option value="name-desc">Nom (Z-A)</option>
                </select>
              </div>
              
              <div className="view-mode">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Vue grille"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Vue liste"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Panneau de filtres */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filters-content">
                <div className="filter-group">
                  <label htmlFor="status-filter">Statut</label>
                  <select 
                    id="status-filter"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="new">Nouveau</option>
                    <option value="reviewed">Examiné</option>
                    <option value="shortlisted">Présélectionné</option>
                    <option value="interviewed">Entretien</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Rejeté</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="job-filter">Offre d'emploi</label>
                  <select 
                    id="job-filter"
                    value={filters.jobId}
                    onChange={(e) => handleFilterChange('jobId', e.target.value)}
                  >
                    <option value="">Toutes les offres</option>
                    {availableJobs.map(job => (
                      <option key={job.id || job._id} value={job.id || job._id}>
                        {job.title} - {job.company}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="experience-filter">Expérience</label>
                  <select 
                    id="experience-filter"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <option value="">Toute expérience</option>
                    <option value="0-1">0-1 ans</option>
                    <option value="1-3">1-3 ans</option>
                    <option value="3-5">3-5 ans</option>
                    <option value="5+">5+ ans</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="location-filter">Localisation</label>
                  <input 
                    id="location-filter"
                    type="text"
                    placeholder="Ville, région..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="filters-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setFilters({
                      status: 'all',
                      jobId: '',
                      experience: '',
                      location: '',
                      sortBy: 'appliedDate',
                      order: 'desc'
                    });
                  }}
                >
                  Réinitialiser
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowFilters(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

          {/* Grille des candidats */}
          <div className={`candidates-grid ${viewMode}`}>
            {candidates.length === 0 ? (
              <div className="empty-state">
                <Users className="empty-icon" />
                <h3>Aucun candidat trouvé</h3>
                <p>
                  {searchQuery || filters.status !== 'all' || filters.jobId ? (
                    <>Aucune candidature ne correspond à vos critères de recherche.</>
                  ) : (
                    <>Aucune candidature reçue pour le moment. Publiez des offres pour attirer des candidats.</>
                  )}
                </p>
                {(!searchQuery && filters.status === 'all' && !filters.jobId) && (
                  <div className="empty-actions">
                    <button 
                      className="btn-primary" 
                      onClick={() => navigate('/post-job')}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Publier une offre
                    </button>
                    {/* <button 
                      className="btn-secondary" 
                      onClick={runDiagnostic}
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Vérifier la configuration
                    </button> */}
                  </div>
                )}
              </div>
            ) : (
              candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </button>
              
              <div className="pagination-info">
                Page {pagination.page} sur {pagination.pages} ({pagination.total} candidats)
              </div>
              
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modal de détails du candidat */}
      {showCandidateModal && selectedCandidate && (
        <CandidateDetailModal 
          candidate={selectedCandidate} 
          onClose={closeCandidateModal} 
        />
      )}
    </div>
  );
};

export default CandidatesPage;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import applicationService from '../services/applicationService';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Star, 
//   Heart, 
//   Eye, 
//   MessageSquare, 
//   Calendar,
//   MapPin,
//   Clock,
//   Award,
//   ArrowLeft,
//   ArrowRight,
//   ChevronDown,
//   X,
//   Check,
//   Phone,
//   Mail,
//   FileText,
//   Building,
//   Users,
//   BarChart3,
//   Briefcase,
//   Bell,
//   Settings,
//   LogOut,
//   AlertCircle,
//   RefreshCw,
//   UserCheck,
//   UserX,
//   Send,
//   Download as DownloadIcon,
//   ExternalLink,
//   CheckCircle,
//   XCircle,
//   User,
//   DollarSign,
//   Grid3X3,
//   List,
//   MoreHorizontal,
//   Loader2
// } from 'lucide-react';

// const CandidatesPage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [initialLoadComplete, setInitialLoadComplete] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pages: 1,
//     total: 0,
//     limit: 20
//   });
  
//   const [selectedFilters, setSelectedFilters] = useState({
//     experience: '',
//     skills: [],
//     location: '',
//     availability: '',
//     salary: '',
//     status: 'all',
//     jobId: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortBy, setSortBy] = useState('appliedDate');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedCandidates, setSelectedCandidates] = useState(new Set());
//   const [likedCandidates, setLikedCandidates] = useState(new Set());
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [showCandidateModal, setShowCandidateModal] = useState(false);
//   const [availableJobs, setAvailableJobs] = useState([]);
//   const [debugInfo, setDebugInfo] = useState(null);

//   // CORRECTION 1: Simplifier le chargement initial
//   useEffect(() => {
//     console.log('🔄 Montage du composant CandidatesPage');
//     initializePage();
//   }, []);

//   // CORRECTION 2: Effet séparé pour les changements de filtres/tri
//   useEffect(() => {
//     if (initialLoadComplete) {
//       console.log('🔄 Rechargement dû aux filtres/tri/pagination');
//       loadCandidatesDebounced();
//     }
//   }, [searchQuery, selectedFilters, sortBy, sortOrder, pagination.page, initialLoadComplete]);

//   // CORRECTION 3: Debounce pour éviter trop d'appels
//   const [debounceTimeout, setDebounceTimeout] = useState(null);
  
//   const loadCandidatesDebounced = () => {
//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }
    
//     const timeout = setTimeout(() => {
//       loadCandidates();
//     }, 300);
    
//     setDebounceTimeout(timeout);
//   };

//   // CORRECTION 4: Fonction d'initialisation séparée
//   const initializePage = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🚀 Initialisation de la page candidats...');
      
//       // Diagnostic complet de l'API
//       const diagnostic = await applicationService.diagnoseAPI();
//       setDebugInfo(diagnostic);
//       console.log('🔍 Diagnostic API:', diagnostic);
      
//       // Charger les offres d'emploi en parallèle
//       loadAvailableJobs().catch(err => {
//         console.warn('⚠️ Erreur lors du chargement des offres:', err);
//       });
      
//       // Charger les candidatures
//       await loadCandidates();
      
//       setInitialLoadComplete(true);
      
//     } catch (error) {
//       console.error('💥 Erreur lors de l\'initialisation:', error);
//       setError(`Erreur d'initialisation: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CORRECTION 5: Fonction de chargement des candidatures entièrement refaite
//   const loadCandidates = async () => {
//     try {
//       console.log('📥 === DÉBUT CHARGEMENT CANDIDATURES ===');
      
//       if (!initialLoadComplete) {
//         setError(null);
//       }
      
//       // Préparer les filtres
//       const filters = {
//         search: searchQuery.trim() || undefined,
//         status: selectedFilters.status !== 'all' ? selectedFilters.status : undefined,
//         experience: selectedFilters.experience || undefined,
//         location: selectedFilters.location?.trim() || undefined,
//         jobId: selectedFilters.jobId || undefined,
//         sortBy: sortBy,
//         order: sortOrder,
//         page: pagination.page,
//         limit: pagination.limit
//       };

//       // Nettoyer les filtres vides
//       Object.keys(filters).forEach(key => {
//         if (filters[key] === undefined || filters[key] === '') {
//           delete filters[key];
//         }
//       });

//       console.log('🔍 Filtres finaux:', filters);
      
//       // CORRECTION 6: Gestion d'erreur plus robuste avec plusieurs tentatives
//       let data = null;
//       let attempts = 0;
//       const maxAttempts = 3;
//       let lastError = null;

//       while (attempts < maxAttempts && !data) {
//         attempts++;
//         console.log(`🎯 Tentative ${attempts}/${maxAttempts}`);
        
//         try {
//           // Essayer la fonction principale
//           data = await applicationService.getRecruiterApplications(filters);
//           console.log('✅ Données récupérées:', {
//             hasData: !!data,
//             type: typeof data,
//             keys: data ? Object.keys(data) : [],
//             applicationsCount: data?.applications?.length || 0,
//             total: data?.total
//           });
          
//           break; // Succès, sortir de la boucle
          
//         } catch (error) {
//           console.error(`❌ Tentative ${attempts} échouée:`, error.message);
//           lastError = error;
          
//           if (attempts < maxAttempts) {
//             console.log(`⏳ Attente avant nouvelle tentative...`);
//             await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
//           }
//         }
//       }

//       // Si toutes les tentatives ont échoué
//       if (!data) {
//         console.error('💥 Toutes les tentatives ont échoué');
//         throw lastError || new Error('Impossible de récupérer les candidatures après plusieurs tentatives');
//       }
      
//       // CORRECTION 7: Meilleure normalisation des données
//       let applications = [];
//       let totalCount = 0;
//       let paginationData = {
//         page: pagination.page,
//         pages: 1,
//         total: 0,
//         limit: pagination.limit
//       };

//       // Identifier le format des données reçues
//       if (data.applications && Array.isArray(data.applications)) {
//         console.log('📊 Format: Objet avec tableau applications');
//         applications = data.applications;
//         totalCount = data.total || applications.length;
//         paginationData = {
//           page: data.pagination?.page || pagination.page,
//           pages: data.pagination?.pages || Math.ceil(totalCount / pagination.limit),
//           total: totalCount,
//           limit: data.pagination?.limit || pagination.limit
//         };
//       } else if (Array.isArray(data)) {
//         console.log('📊 Format: Tableau direct');
//         applications = data;
//         totalCount = applications.length;
//         paginationData = {
//           page: 1,
//           pages: 1,
//           total: totalCount,
//           limit: totalCount || pagination.limit
//         };
//       } else if (data.data && Array.isArray(data.data)) {
//         console.log('📊 Format: Wrapper avec data');
//         applications = data.data;
//         totalCount = data.total || applications.length;
//       } else {
//         console.warn('⚠️ Format de données non reconnu:', data);
//         applications = [];
//       }

//       console.log(`📈 Résultat parsing: ${applications.length} candidatures trouvées`);
      
//       // CORRECTION 8: Si aucune candidature et que c'est la première tentative
//       if (applications.length === 0 && attempts === 1 && !searchQuery && selectedFilters.status === 'all') {
//         console.log('🔄 Aucune candidature trouvée, tentative de rechargement...');
        
//         try {
//           const refreshedData = await applicationService.refreshRecruiterApplications();
//           if (refreshedData?.applications?.length > 0) {
//             applications = refreshedData.applications;
//             totalCount = refreshedData.total || applications.length;
//             console.log('✅ Rechargement réussi:', applications.length, 'candidatures');
//           }
//         } catch (refreshError) {
//           console.warn('⚠️ Échec du rechargement:', refreshError.message);
//         }
//       }
      
//       // CORRECTION 9: Transformation des données plus robuste avec validation
//       const transformedCandidates = applications.map((app, index) => {
//         try {
//           console.log(`🔄 Transformation candidat ${index + 1}:`, {
//             id: app._id || app.id,
//             hasCandidate: !!(app.candidateInfo || app.candidate || app.personalInfo),
//             hasJob: !!(app.jobInfo || app.job),
//             status: app.status
//           });

//           // Extraction flexible des informations avec multiples fallbacks
//           const candidateInfo = app.candidateInfo || app.candidate || app.personalInfo || app.applicant || {};
//           const jobInfo = app.jobInfo || app.job || app.position || {};
//           const additionalInfo = app.additionalInfo || app.details || {};
          
//           // Construire le nom complet
//           let candidateName = 'Candidat anonyme';
//           if (candidateInfo.firstName && candidateInfo.lastName) {
//             candidateName = `${candidateInfo.firstName} ${candidateInfo.lastName}`;
//           } else if (candidateInfo.name) {
//             candidateName = candidateInfo.name;
//           } else if (candidateInfo.fullName) {
//             candidateName = candidateInfo.fullName;
//           } else if (app.name) {
//             candidateName = app.name;
//           }

//           // Informations du poste
//           const jobTitle = jobInfo.title || jobInfo.position || jobInfo.name || app.jobTitle || 'Poste non spécifié';
//           const jobCompany = jobInfo.company || jobInfo.companyName || app.company || 'Entreprise non spécifiée';
          
//           // Contact
//           const email = candidateInfo.email || candidateInfo.emailAddress || app.email || 'Non spécifié';
//           const phone = candidateInfo.phone || candidateInfo.phoneNumber || candidateInfo.mobile || app.phone || 'Non spécifié';
          
//           // Localisation
//           const location = candidateInfo.address || candidateInfo.location || candidateInfo.city || 
//                           jobInfo.location || app.location || 'Non spécifiée';
          
//           // Expérience
//           const experience = additionalInfo.experience || candidateInfo.experience || 
//                            app.experience || 'Non spécifiée';
          
//           // Salaire
//           const salary = additionalInfo.expectedSalary || candidateInfo.expectedSalary || 
//                         candidateInfo.salary || jobInfo.salary || app.salary || 'Non spécifié';
          
//           // Compétences
//           let skills = [];
//           if (candidateInfo.skills && Array.isArray(candidateInfo.skills)) {
//             skills = candidateInfo.skills;
//           } else if (additionalInfo.skills && Array.isArray(additionalInfo.skills)) {
//             skills = additionalInfo.skills;
//           } else if (jobInfo.requiredSkills && Array.isArray(jobInfo.requiredSkills)) {
//             skills = jobInfo.requiredSkills;
//           } else if (typeof candidateInfo.skills === 'string') {
//             skills = candidateInfo.skills.split(',').map(s => s.trim());
//           }
          
//           // Score de correspondance
//           const match = app.matchScore || additionalInfo.matchScore || 
//                        candidateInfo.matchScore || Math.floor(Math.random() * 30) + 70;
          
//           // Statut avec validation
//           const validStatuses = ['new', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected'];
//           const status = validStatuses.includes(app.status) ? app.status : 'new';
          
//           // Dates
//           const getFormattedDate = (dateValue) => {
//             try {
//               if (!dateValue) return 'Date inconnue';
//               const date = new Date(dateValue);
//               if (isNaN(date.getTime())) return 'Date invalide';
//               return date.toLocaleDateString('fr-FR');
//             } catch (e) {
//               return 'Date invalide';
//             }
//           };
          
//           const appliedDate = getFormattedDate(app.createdAt || app.appliedDate || app.dateApplied);
//           const lastUpdate = getFormattedDate(app.updatedAt || app.lastModified || app.createdAt);
          
//           // Avatar
//           const avatar = candidateInfo.avatar || candidateInfo.profilePicture || candidateInfo.photo ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(candidateInfo.firstName || 'C')}+${encodeURIComponent(candidateInfo.lastName || 'U')}&background=667eea&color=fff`;
          
//           // Documents
//           const documents = {
//             cv: app.documents?.cv || app.cvFile || app.cv || null,
//             coverLetterFile: app.documents?.coverLetterFile || app.coverLetterFile || null,
//             portfolio: app.documents?.portfolio || app.portfolioFile || null
//           };
          
//           return {
//             id: app._id || app.id || `temp_${index}`,
            
//             // Informations candidat
//             name: candidateName,
//             email: email,
//             phone: phone,
            
//             // Informations job
//             jobId: app.jobId || jobInfo.id || jobInfo._id,
//             position: jobTitle,
//             jobTitle: jobTitle,
//             company: jobCompany,
            
//             // Localisation et détails
//             location: location,
//             experience: experience,
//             salary: salary,
//             skills: skills,
            
//             // Métadonnées
//             avatar: avatar,
//             match: match,
//             status: status,
//             appliedDate: appliedDate,
//             lastUpdate: lastUpdate,
            
//             // Contenu
//             coverLetter: app.coverLetter || '',
//             motivation: additionalInfo.motivation || app.motivation || '',
//             availability: additionalInfo.availability || candidateInfo.availability || 'Non spécifié',
//             portfolioUrl: additionalInfo.portfolioUrl || candidateInfo.portfolio || '',
//             linkedinUrl: additionalInfo.linkedinUrl || candidateInfo.linkedin || '',
            
//             // Documents
//             documents: documents,
            
//             // Réponses personnalisées
//             customAnswers: Array.isArray(app.customAnswers) ? app.customAnswers : [],
            
//             // Debug
//             _rawData: app,
//             _transformedAt: new Date().toISOString()
//           };
          
//         } catch (transformError) {
//           console.error(`❌ Erreur transformation candidat ${index}:`, transformError);
//           return {
//             id: app._id || app.id || `error_${index}`,
//             name: 'Erreur de chargement',
//             email: 'Erreur',
//             phone: 'Erreur',
//             jobTitle: 'Erreur',
//             status: 'new',
//             error: transformError.message,
//             _rawData: app
//           };
//         }
//       });

//       console.log('✅ Candidats transformés:', {
//         count: transformedCandidates.length,
//         statuses: transformedCandidates.reduce((acc, c) => {
//           acc[c.status] = (acc[c.status] || 0) + 1;
//           return acc;
//         }, {}),
//         hasErrors: transformedCandidates.some(c => c.error)
//       });

//       // Mettre à jour l'état
//       setCandidates(transformedCandidates);
//       setPagination(paginationData);
      
//     } catch (err) {
//       console.error('💥 Erreur fatale dans loadCandidates:', err);
      
//       // Messages d'erreur spécifiques
//       let errorMessage = 'Impossible de charger les candidats';
      
//       if (err.message?.includes('Network')) {
//         errorMessage = 'Erreur de connexion réseau. Vérifiez votre connexion internet.';
//       } else if (err.message?.includes('401') || err.message?.includes('Session expirée')) {
//         errorMessage = 'Session expirée. Veuillez vous reconnecter.';
//         // Optionnel: redirection vers login
//         // setTimeout(() => navigate('/login'), 2000);
//       } else if (err.message?.includes('403')) {
//         errorMessage = 'Accès non autorisé. Vérifiez vos permissions de recruteur.';
//       } else if (err.message?.includes('404')) {
//         errorMessage = 'Service de candidatures non trouvé. Contactez l\'administrateur.';
//       } else if (err.message?.includes('500')) {
//         errorMessage = 'Erreur serveur temporaire. Réessayez dans quelques minutes.';
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
      
//       // En cas d'erreur, ne pas effacer les candidats existants si on en a
//       if (candidates.length === 0) {
//         setCandidates([]);
//       }
//     }
//   };

//   // CORRECTION 10: Fonction de chargement des offres améliorée
//   const loadAvailableJobs = async () => {
//     try {
//       console.log('📥 Chargement des offres d\'emploi...');
//       const jobs = await applicationService.getRecruiterJobs();
      
//       console.log('✅ Offres chargées:', {
//         count: Array.isArray(jobs) ? jobs.length : 0,
//         hasData: !!jobs
//       });
      
//       setAvailableJobs(Array.isArray(jobs) ? jobs : []);
//     } catch (error) {
//       console.warn('⚠️ Erreur lors du chargement des offres:', error);
//       setAvailableJobs([]);
//     }
//   };

//   // CORRECTION 11: Fonction de diagnostic accessible
//   const runDiagnostic = async () => {
//     try {
//       setLoading(true);
//       console.log('🔍 === DIAGNOSTIC MANUEL ===');
      
//       const diagnostic = await applicationService.diagnoseAPI();
//       setDebugInfo(diagnostic);
      
//       console.log('📊 Résultats diagnostic:', diagnostic);
      
//       // Afficher les résultats dans une alerte
//       const connectivityStatus = diagnostic.connectivity?.success ? '✅ OK' : '❌ Échec';
//       const authStatus = diagnostic.authentication?.tokenValid ? '✅ Valide' : '❌ Invalide';
      
//       const workingEndpoints = Object.entries(diagnostic.endpoints || {})
//         .filter(([_, result]) => result.status === 'success')
//         .map(([endpoint, _]) => endpoint);
      
//       alert(`Diagnostic API:
      
// Connectivité: ${connectivityStatus}
// Authentification: ${authStatus}
// Token présent: ${diagnostic.authentication?.hasToken ? 'Oui' : 'Non'}

// Endpoints fonctionnels: ${workingEndpoints.length > 0 ? workingEndpoints.join(', ') : 'Aucun'}

// Voir la console pour plus de détails.`);
      
//     } catch (error) {
//       console.error('💥 Erreur diagnostic:', error);
//       alert(`Erreur lors du diagnostic: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CORRECTION 12: Fonctions utilitaires inchangées mais optimisées
//   const getStatusColor = (status) => {
//     const colors = {
//       'new': 'bg-blue-100 text-blue-800 border-blue-200',
//       'reviewed': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       'shortlisted': 'bg-green-100 text-green-800 border-green-200',
//       'interviewed': 'bg-purple-100 text-purple-800 border-purple-200',
//       'accepted': 'bg-emerald-100 text-emerald-800 border-emerald-200',
//       'rejected': 'bg-red-100 text-red-800 border-red-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getStatusText = (status) => {
//     const texts = {
//       'new': 'Nouveau',
//       'reviewed': 'Examiné',
//       'shortlisted': 'Présélectionné',
//       'interviewed': 'Entretien',
//       'accepted': 'Accepté',
//       'rejected': 'Rejeté'
//     };
//     return texts[status] || status;
//   };

//   const handleCandidateSelect = (candidateId) => {
//     setSelectedCandidates(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(candidateId)) {
//         newSet.delete(candidateId);
//       } else {
//         newSet.add(candidateId);
//       }
//       return newSet;
//     });
//   };

//   const handleLikeCandidate = async (candidateId) => {
//     try {
//       await applicationService.toggleFavorite(candidateId);
//       setLikedCandidates(prev => {
//         const newSet = new Set(prev);
//         if (newSet.has(candidateId)) {
//           newSet.delete(candidateId);
//         } else {
//           newSet.add(candidateId);
//         }
//         return newSet;
//       });
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour des favoris:', error);
//     }
//   };

//   const handleBulkAction = async (action) => {
//     if (selectedCandidates.size === 0) {
//       alert('Veuillez sélectionner au moins un candidat');
//       return;
//     }

//     try {
//       const candidateIds = Array.from(selectedCandidates);
      
//       for (const candidateId of candidateIds) {
//         if (action === 'shortlist') {
//           await applicationService.updateApplicationStatus(candidateId, 'shortlisted');
//         } else if (action === 'reject') {
//           await applicationService.updateApplicationStatus(candidateId, 'rejected');
//         } else if (action === 'accept') {
//           await applicationService.updateApplicationStatus(candidateId, 'accepted');
//         }
//       }
      
//       await loadCandidates();
//       setSelectedCandidates(new Set());
//       alert(`Action "${action}" appliquée à ${candidateIds.length} candidat(s)`);
//     } catch (error) {
//       console.error('Erreur lors de l\'action en lot:', error);
//       alert('Erreur lors de l\'application de l\'action');
//     }
//   };

//   const handleStatusChange = async (candidateId, newStatus) => {
//     try {
//       await applicationService.updateApplicationStatus(candidateId, newStatus);
//       await loadCandidates();
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du statut:', error);
//       alert('Erreur lors de la mise à jour du statut');
//     }
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   const handleFilterChange = (key, value) => {
//     setSelectedFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const refreshCandidates = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       await loadCandidates();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openCandidateModal = (candidate) => {
//     setSelectedCandidate(candidate);
//     setShowCandidateModal(true);
//   };

//   const closeCandidateModal = () => {
//     setShowCandidateModal(false);
//     setSelectedCandidate(null);
//   };

//   const downloadCV = async (candidateId, fileName) => {
//     try {
//       const blob = await applicationService.downloadDocument(candidateId, 'cv');
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName || 'CV.pdf';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Erreur lors du téléchargement:', error);
//       alert('Erreur lors du téléchargement du CV');
//     }
//   };

//   // Calculer les statistiques
//   const stats = {
//     total: candidates.length,
//     new: candidates.filter(c => c.status === 'new').length,
//     shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
//     interviewed: candidates.filter(c => c.status === 'interviewed').length,
//     accepted: candidates.filter(c => c.status === 'accepted').length
//   };

//   const Sidebar = () => (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <div className="logo-icon">JT</div>
//           <span className="logo-text">JobTracks</span>
//         </div>
//       </div>
      
//       <div className="sidebar-nav">
//         <div className="nav-section">
//           <div className="nav-item" onClick={() => handleNavigation('/recruiterDashboard')}>
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/company-profile')}>
//             <Building className="w-5 h-5" />
//             <span>Profil entreprise</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/my-jobs')}>
//             <Briefcase className="w-5 h-5" />
//             <span>Mes offres</span>
//           </div>
//           <div className="nav-item active">
//             <Users className="w-5 h-5" />
//             <span>Candidats</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/messages')}>
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/notifications')}>
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//           </div>
//         </div>
        
//         <div className="nav-section">
//           <div className="nav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/login')}>
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CandidateDetailModal = ({ candidate, onClose }) => {
//     if (!candidate) return null;

//     return (
//       <div className="modal-overlay" onClick={onClose}>
//         <div className="modal-content-large" onClick={e => e.stopPropagation()}>
//           <div className="modal-header">
//             <div className="modal-title-section">
//               <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar-large" />
//               <div>
//                 <h2 className="modal-title">{candidate.name}</h2>
//                 <p className="modal-subtitle">{candidate.position}</p>
//               </div>
//             </div>
//             <button className="modal-close-btn" onClick={onClose}>
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="modal-body">
//             <div className="candidate-details-grid">
//               {/* Informations de contact */}
//               <div className="detail-section">
//                 <h3>Informations de contact</h3>
//                 <div className="contact-info">
//                   <div className="contact-item">
//                     <Mail className="w-4 h-4" />
//                     <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
//                   </div>
//                   <div className="contact-item">
//                     <Phone className="w-4 h-4" />
//                     <a href={`tel:${candidate.phone}`}>{candidate.phone}</a>
//                   </div>
//                   <div className="contact-item">
//                     <MapPin className="w-4 h-4" />
//                     <span>{candidate.location}</span>
//                   </div>
//                   {candidate.portfolioUrl && (
//                     <div className="contact-item">
//                       <ExternalLink className="w-4 h-4" />
//                       <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio</a>
//                     </div>
//                   )}
//                   {candidate.linkedinUrl && (
//                     <div className="contact-item">
//                       <ExternalLink className="w-4 h-4" />
//                       <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Informations professionnelles */}
//               <div className="detail-section">
//                 <h3>Profil professionnel</h3>
//                 <div className="profile-info">
//                   <div className="profile-item">
//                     <Clock className="w-4 h-4" />
//                     <span>Expérience: {candidate.experience}</span>
//                   </div>
//                   <div className="profile-item">
//                     <DollarSign className="w-4 h-4" />
//                     <span>Prétentions: {candidate.salary}</span>
//                   </div>
//                   <div className="profile-item">
//                     <Calendar className="w-4 h-4" />
//                     <span>Disponibilité: {candidate.availability}</span>
//                   </div>
//                   <div className="profile-item">
//                     <Award className="w-4 h-4" />
//                     <span>Match: {candidate.match}%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Compétences */}
//               {candidate.skills && candidate.skills.length > 0 && (
//                 <div className="detail-section full-width">
//                   <h3>Compétences</h3>
//                   <div className="skills-list">
//                     {candidate.skills.map((skill, index) => (
//                       <span key={index} className="skill-tag">{skill}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Lettre de motivation */}
//               {candidate.coverLetter && (
//                 <div className="detail-section full-width">
//                   <h3>Lettre de motivation</h3>
//                   <div className="cover-letter-content">
//                     {candidate.coverLetter}
//                   </div>
//                 </div>
//               )}

//               {/* Motivation */}
//               {candidate.motivation && (
//                 <div className="detail-section full-width">
//                   <h3>Motivation</h3>
//                   <div className="motivation-content">
//                     {candidate.motivation}
//                   </div>
//                 </div>
//               )}

//               {/* Réponses aux questions personnalisées */}
//               {candidate.customAnswers && candidate.customAnswers.length > 0 && (
//                 <div className="detail-section full-width">
//                   <h3>Réponses aux questions spécifiques</h3>
//                   <div className="custom-answers">
//                     {candidate.customAnswers.map((answer, index) => (
//                       <div key={index} className="custom-answer">
//                         <h4>{answer.question}</h4>
//                         <p>{answer.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Documents */}
//               <div className="detail-section full-width">
//                 <h3>Documents</h3>
//                 <div className="documents-list">
//                   {candidate.documents?.cv && (
//                     <button 
//                       className="document-btn"
//                       onClick={() => downloadCV(candidate.id, `CV_${candidate.name.replace(' ', '_')}.pdf`)}
//                     >
//                       <FileText className="w-4 h-4" />
//                       <span>Télécharger CV</span>
//                       <DownloadIcon className="w-4 h-4" />
//                     </button>
//                   )}
//                   {candidate.documents?.coverLetterFile && (
//                     <button 
//                       className="document-btn"
//                       onClick={() => downloadCV(candidate.id, `Lettre_${candidate.name.replace(' ', '_')}.pdf`)}
//                     >
//                       <FileText className="w-4 h-4" />
//                       <span>Lettre de motivation (fichier)</span>
//                       <DownloadIcon className="w-4 h-4" />
//                     </button>
//                   )}
//                   {candidate.documents?.portfolio && (
//                     <button 
//                       className="document-btn"
//                       onClick={() => downloadCV(candidate.id, `Portfolio_${candidate.name.replace(' ', '_')}.pdf`)}
//                     >
//                       <FileText className="w-4 h-4" />
//                       <span>Portfolio</span>
//                       <DownloadIcon className="w-4 h-4" />
//                     </button>
//                   )}
//                   {(!candidate.documents?.cv && !candidate.documents?.coverLetterFile && !candidate.documents?.portfolio) && (
//                     <div className="no-documents">Aucun document disponible</div>
//                   )}
//                 </div>
//               </div>

//               {/* Section debug si erreur */}
//               {candidate.error && (
//                 <div className="detail-section full-width">
//                   <h3>Informations de débogage</h3>
//                   <div className="debug-info">
//                     <p><strong>Erreur:</strong> {candidate.error}</p>
//                     <details>
//                       <summary>Données brutes</summary>
//                       <pre>{JSON.stringify(candidate._rawData, null, 2)}</pre>
//                     </details>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="modal-footer">
//             <div className="status-change-section">
//               <label>Changer le statut:</label>
//               <select 
//                 value={candidate.status}
//                 onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
//                 className="status-select"
//               >
//                 <option value="new">Nouveau</option>
//                 <option value="reviewed">Examiné</option>
//                 <option value="shortlisted">Présélectionné</option>
//                 <option value="interviewed">Entretien</option>
//                 <option value="accepted">Accepté</option>
//                 <option value="rejected">Rejeté</option>
//               </select>
//             </div>
//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={onClose}>
//                 Fermer
//               </button>
//               <button 
//                 className="btn-primary"
//                 onClick={() => navigate(`/messages?candidate=${candidate.id}`)}
//               >
//                 <MessageSquare className="w-4 h-4 mr-2" />
//                 Contacter
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const CandidateCard = ({ candidate }) => (
//     <div className="candidate-card">
//       <div className="candidate-card-header">
//         <div className="candidate-select">
//           <input
//             type="checkbox"
//             checked={selectedCandidates.has(candidate.id)}
//             onChange={() => handleCandidateSelect(candidate.id)}
//           />
//         </div>
//         <div className="candidate-avatar-container">
//           <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
//           <div className={`match-score ${candidate.match > 90 ? 'high' : candidate.match > 80 ? 'medium' : 'low'}`}>
//             {candidate.match}%
//           </div>
//         </div>
//         <div className="candidate-actions">
//           <button 
//             className={`action-btn ${likedCandidates.has(candidate.id) ? 'text-red-500' : 'text-gray-400'}`}
//             onClick={() => handleLikeCandidate(candidate.id)}
//           >
//             <Heart className={`w-4 h-4 ${likedCandidates.has(candidate.id) ? 'fill-current' : ''}`} />
//           </button>
//           <button 
//             className="action-btn"
//             onClick={() => openCandidateModal(candidate)}
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
      
//       <div className="candidate-info">
//         <h3 className="candidate-name">{candidate.name}</h3>
//         <p className="candidate-position">Candidat pour: {candidate.jobTitle}</p>
        
//         <div className="candidate-meta">
//           <span className="meta-item">
//             <Clock className="w-3 h-3" />
//             {candidate.experience}
//           </span>
//           <span className="meta-item">
//             <MapPin className="w-3 h-3" />
//             {candidate.location}
//           </span>
//           <span className="meta-item">
//             <Calendar className="w-3 h-3" />
//             {candidate.appliedDate}
//           </span>
//         </div>
        
//         <div className="candidate-skills">
//           {Array.isArray(candidate.skills) && candidate.skills.slice(0, 3).map((skill, index) => (
//             <span key={index} className="skill-tag">{skill}</span>
//           ))}
//           {Array.isArray(candidate.skills) && candidate.skills.length > 3 && (
//             <span className="skill-tag more">+{candidate.skills.length - 3}</span>
//           )}
//         </div>
        
//         <div className="candidate-footer">
//           <select 
//             className={`status-badge ${getStatusColor(candidate.status)}`}
//             value={candidate.status}
//             onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
//           >
//             <option value="new">Nouveau</option>
//             <option value="reviewed">Examiné</option>
//             <option value="shortlisted">Présélectionné</option>
//             <option value="interviewed">Entretien</option>
//             <option value="accepted">Accepté</option>
//             <option value="rejected">Rejeté</option>
//           </select>
//           <span className="candidate-salary">{candidate.salary}</span>
//         </div>

//         {/* Affichage erreur si présente */}
//         {candidate.error && (
//           <div className="candidate-error">
//             <AlertCircle className="w-4 h-4" />
//             <span>Erreur de chargement</span>
//           </div>
//         )}
//       </div>
      
//       <div className="candidate-card-actions">
//         <button 
//           className="btn-secondary-sm"
//           onClick={() => navigate(`/messages?candidate=${candidate.id}`)}
//         >
//           <MessageSquare className="w-4 h-4 mr-1" />
//           Message
//         </button>
//         <button 
//           className="btn-primary-sm"
//           onClick={() => openCandidateModal(candidate)}
//         >
//           Voir profil
//         </button>
//       </div>
//     </div>
//   );

//   // CORRECTION 13: État de chargement amélioré avec plus d'infos
//   if (loading && !initialLoadComplete) {
//     return (
//       <div className="dashboard">
//         <Sidebar />
//         <div className="main-content">
//           <div className="loading-container">
//             <Loader2 className="spinner-icon" />
//             <h3>Chargement des candidats...</h3>
//             <div className="loading-details">
//               <p>Connexion à l'API en cours...</p>
//               <p>Récupération des candidatures...</p>
//               {debugInfo && (
//                 <details className="debug-details">
//                   <summary>Informations techniques</summary>
//                   <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//                 </details>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // CORRECTION 14: État d'erreur amélioré avec plus d'options
//   if (error && candidates.length === 0) {
//     return (
//       <div className="dashboard">
//         <Sidebar />
//         <div className="main-content">
//           <div className="error-container">
//             <AlertCircle className="error-icon" />
//             <h3>Impossible de charger les candidats</h3>
//             <p>{error}</p>
            
//             {debugInfo && (
//               <div className="debug-summary">
//                 <h4>Résumé du diagnostic:</h4>
//                 <ul>
//                   <li>Connectivité API: {debugInfo.connectivity?.success ? '✅' : '❌'}</li>
//                   <li>Token d'authentification: {debugInfo.authentication?.hasToken ? '✅' : '❌'}</li>
//                   <li>Token valide: {debugInfo.authentication?.tokenValid ? '✅' : '❌'}</li>
//                   <li>Endpoints fonctionnels: {Object.values(debugInfo.endpoints || {}).filter(e => e.status === 'success').length}</li>
//                 </ul>
//               </div>
//             )}
            
//             <div className="error-actions">
//               <button onClick={refreshCandidates} className="retry-btn">
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Réessayer
//               </button>
//               <button onClick={runDiagnostic} className="debug-btn">
//                 <AlertCircle className="w-4 h-4 mr-2" />
//                 Diagnostic complet
//               </button>
//               <button onClick={initializePage} className="reinit-btn">
//                 <Loader2 className="w-4 h-4 mr-2" />
//                 Réinitialiser
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       <Sidebar />
      
//       <div className="main-content">
//         {/* Top Bar */}
//         <div className="top-bar">
//           <nav className="breadcrumb">
//             <span className="breadcrumb-item clickable" onClick={() => navigate('/recruiterDashboard')}>
//               Accueil
//             </span>
//             <span className="breadcrumb-separator">/</span>
//             <span className="breadcrumb-item active">
//               Candidats
//             </span>
//           </nav>
          
//           <div className="top-actions">
//             <div className="search-box">
//               <Search className="w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Rechercher un candidat..."
//                 className="search-input"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <button className="notification-btn">
//               <Bell className="w-5 h-5" />
//             </button>
            
//             <div className="user-avatar">
//               <img src="https://ui-avatars.com/api/?name=Recruiter&background=667eea&color=fff" alt="Profile" />
//             </div>
//           </div>
//         </div>

//         <div className="page-content">
//           {/* En-tête de page */}
//           <div className="page-header">
//             <div>
//               <h1 className="page-title">Candidats</h1>
//               <p className="page-subtitle">
//                 Gérez vos candidatures et trouvez les meilleurs talents
//               </p>
//             </div>
//             <div className="header-actions">
//               <button className="btn-secondary" onClick={refreshCandidates} disabled={loading}>
//                 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
//                 Actualiser
//               </button>
//               <button className="btn-secondary" onClick={runDiagnostic}>
//                 <AlertCircle className="w-4 h-4" />
//                 Diagnostic
//               </button>
//               <button className="btn-primary" onClick={() => navigate('/post-job')}>
//                 <Briefcase className="w-4 h-4" />
//                 Publier une offre
//               </button>
//             </div>
//           </div>

//           {/* Affichage d'erreur non bloquante */}
//           {error && candidates.length > 0 && (
//             <div className="error-banner">
//               <AlertCircle className="w-4 h-4" />
//               <span>Erreur lors de la dernière mise à jour: {error}</span>
//               <button onClick={refreshCandidates} className="retry-btn-sm">
//                 Réessayer
//               </button>
//             </div>
//           )}

//           {/* Statistiques */}
//           <div className="stats-section">
//             <div className="stat-card">
//               <div className="stat-number">{stats.total}</div>
//               <div className="stat-label">Total candidats</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">{stats.new}</div>
//               <div className="stat-label">Nouveaux</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">{stats.shortlisted}</div>
//               <div className="stat-label">Présélectionnés</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">{stats.interviewed}</div>
//               <div className="stat-label">Entretiens</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-number">{stats.accepted}</div>
//               <div className="stat-label">Acceptés</div>
//             </div>
//           </div>

//           {/* Barre d'outils */}
//           <div className="candidates-toolbar">
//             <div className="toolbar-left">
//               <div className="results-count">
//                 {candidates.length} candidat{candidates.length !== 1 ? 's' : ''} trouvé{candidates.length !== 1 ? 's' : ''}
//                 {pagination.total !== candidates.length && (
//                   <span className="total-count"> sur {pagination.total} total</span>
//                 )}
//               </div>
              
//               {selectedCandidates.size > 0 && (
//                 <div className="bulk-actions">
//                   <span className="selected-count">
//                     {selectedCandidates.size} sélectionné{selectedCandidates.size !== 1 ? 's' : ''}
//                   </span>
//                   <button 
//                     className="btn-text"
//                     onClick={() => handleBulkAction('shortlist')}
//                   >
//                     Présélectionner
//                   </button>
//                   <button 
//                     className="btn-text"
//                     onClick={() => handleBulkAction('reject')}
//                   >
//                     Rejeter
//                   </button>
//                   <button 
//                     className="btn-text"
//                     onClick={() => handleBulkAction('accept')}
//                   >
//                     Accepter
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             <div className="toolbar-right">
//               <button 
//                 className="btn-secondary"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter className="w-4 h-4" />
//                 Filtres
//                 {(selectedFilters.status !== 'all' || selectedFilters.jobId || selectedFilters.experience || selectedFilters.location) && (
//                   <span className="filter-indicator">●</span>
//                 )}
//               </button>
              
//               <div className="sort-by">
//                 <span>Trier par:</span>
//                 <select 
//                   value={`${sortBy}-${sortOrder}`}
//                   onChange={(e) => {
//                     const [field, order] = e.target.value.split('-');
//                     setSortBy(field);
//                     setSortOrder(order);
//                   }}
//                 >
//                   <option value="appliedDate-desc">Date (récent)</option>
//                   <option value="appliedDate-asc">Date (ancien)</option>
//                   <option value="match-desc">Match (élevé)</option>
//                   <option value="match-asc">Match (faible)</option>
//                   <option value="name-asc">Nom (A-Z)</option>
//                   <option value="name-desc">Nom (Z-A)</option>
//                 </select>
//               </div>
              
//               <div className="view-mode">
//                 <button 
//                   className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button 
//                   className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Panneau de filtres */}
//           {showFilters && (
//             <div className="filters-panel">
//               <div className="filters-content">
//                 <div className="filter-group">
//                   <label>Statut</label>
//                   <select 
//                     value={selectedFilters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                   >
//                     <option value="all">Tous les statuts</option>
//                     <option value="new">Nouveau</option>
//                     <option value="reviewed">Examiné</option>
//                     <option value="shortlisted">Présélectionné</option>
//                     <option value="interviewed">Entretien</option>
//                     <option value="accepted">Accepté</option>
//                     <option value="rejected">Rejeté</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Offre d'emploi</label>
//                   <select 
//                     value={selectedFilters.jobId}
//                     onChange={(e) => handleFilterChange('jobId', e.target.value)}
//                   >
//                     <option value="">Toutes les offres</option>
//                     {availableJobs.map(job => (
//                       <option key={job.id || job._id} value={job.id || job._id}>
//                         {job.title || job.position}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Expérience</label>
//                   <select 
//                     value={selectedFilters.experience}
//                     onChange={(e) => handleFilterChange('experience', e.target.value)}
//                   >
//                     <option value="">Toute expérience</option>
//                     <option value="0-1">0-1 ans</option>
//                     <option value="1-3">1-3 ans</option>
//                     <option value="3-5">3-5 ans</option>
//                     <option value="5+">5+ ans</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Localisation</label>
//                   <input 
//                     type="text"
//                     placeholder="Ville, région..."
//                     value={selectedFilters.location}
//                     onChange={(e) => handleFilterChange('location', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="filters-actions">
//                 <button 
//                   className="btn-secondary"
//                   onClick={() => {
//                     setSelectedFilters({
//                       experience: '',
//                       skills: [],
//                       location: '',
//                       availability: '',
//                       salary: '',
//                       status: 'all',
//                       jobId: ''
//                     });
//                   }}
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Grille des candidats */}
//           <div className={`candidates-grid ${viewMode}`}>
//             {candidates.length === 0 ? (
//               <div className="empty-state">
//                 <Users className="empty-icon" />
//                 <h3>Aucun candidat trouvé</h3>
//                 <p>
//                   {searchQuery || selectedFilters.status !== 'all' || selectedFilters.jobId ? (
//                     <>Aucune candidature ne correspond à vos critères de recherche.</>
//                   ) : (
//                     <>Aucune candidature reçue pour le moment. Publiez des offres pour attirer des candidats.</>
//                   )}
//                 </p>
//                 {(!searchQuery && selectedFilters.status === 'all' && !selectedFilters.jobId) && (
//                   <div className="empty-actions">
//                     <button 
//                       className="btn-primary" 
//                       onClick={() => navigate('/post-job')}
//                     >
//                       <Briefcase className="w-4 h-4 mr-2" />
//                       Publier une offre
//                     </button>
//                     <button 
//                       className="btn-secondary" 
//                       onClick={runDiagnostic}
//                     >
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       Vérifier la configuration
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               candidates.map((candidate) => (
//                 <CandidateCard key={candidate.id} candidate={candidate} />
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           {pagination.pages > 1 && (
//             <div className="pagination">
//               <button 
//                 className="pagination-btn"
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Précédent
//               </button>
              
//               <div className="pagination-info">
//                 Page {pagination.page} sur {pagination.pages} ({pagination.total} candidats)
//               </div>
              
//               <button 
//                 className="pagination-btn"
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.pages}
//               >
//                 Suivant
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {/* Section debug en bas de page si en mode développement */}
//           {debugInfo && process.env.NODE_ENV === 'development' && (
//             <div className="debug-section">
//               <details>
//                 <summary>Informations de débogage (Mode développement)</summary>
//                 <div className="debug-content">
//                   <h4>État de la connexion API</h4>
//                   <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                  
//                   <h4>Dernières données reçues</h4>
//                   <p>Candidats chargés: {candidates.length}</p>
//                   <p>Offres disponibles: {availableJobs.length}</p>
//                   <p>Filtres actifs: {JSON.stringify(selectedFilters)}</p>
//                 </div>
//               </details>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal de détails du candidat */}
//       {showCandidateModal && selectedCandidate && (
//         <CandidateDetailModal 
//           candidate={selectedCandidate} 
//           onClose={closeCandidateModal} 
//         />
//       )}
//     {/* </div> */}


      // <style>{`
      //   .dashboard {
      //     display: flex;
      //     min-height: 100vh;
      //     background-color: #f8fafc;
      //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      //   }

      //   .sidebar {
      //     width: 280px;
      //     background-color: white;
      //     border-right: 1px solid #e2e8f0;
      //     padding: 1.5rem 0;
      //   }

      //   .sidebar-header {
      //     padding: 0 1.5rem 2rem;
      //     border-bottom: 1px solid #e2e8f0;
      //   }

      //   .logo {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.75rem;
      //   }

      //   .logo-icon {
      //     width: 2.5rem;
      //     height: 2.5rem;
      //     background: linear-gradient(135deg, #667eea, #764ba2);
      //     border-radius: 0.5rem;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     color: white;
      //     font-weight: bold;
      //     font-size: 1.125rem;
      //   }

      //   .logo-text {
      //     font-size: 1.25rem;
      //     font-weight: 700;
      //     color: #1a202c;
      //   }

      //   .sidebar-nav {
      //     padding: 2rem 0;
      //   }

      //   .nav-section {
      //     margin-bottom: 2rem;
      //   }

      //   .nav-item {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.75rem;
      //     padding: 0.75rem 1.5rem;
      //     color: #64748b;
      //     cursor: pointer;
      //     transition: all 0.2s;
      //   }

      //   .nav-item:hover {
      //     background-color: #f1f5f9;
      //     color: #334155;
      //   }

      //   .nav-item.active {
      //     background-color: #ede9fe;
      //     color: #7c3aed;
      //     border-right: 3px solid #7c3aed;
      //   }

      //   .main-content {
      //     flex: 1;
      //     display: flex;
      //     flex-direction: column;
      //   }

      //   .loading-container, .error-container {
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     height: 50vh;
      //     flex-direction: column;
      //     gap: 1rem;
      //     text-align: center;
      //   }

      //   .spinner-icon {
      //     width: 40px;
      //     height: 40px;
      //     color: #3498db;
      //     animation: spin 1s linear infinite;
      //   }

      //   .loading-details {
      //     color: #6b7280;
      //     font-size: 0.875rem;
      //   }

      //   @keyframes spin {
      //     0% { transform: rotate(0deg); }
      //     100% { transform: rotate(360deg); }
      //   }

      //   .error-icon {
      //     width: 48px;
      //     height: 48px;
      //     color: #ef4444;
      //   }

      //   .error-actions {
      //     display: flex;
      //     gap: 1rem;
      //     flex-wrap: wrap;
      //     justify-content: center;
      //   }

      //   .retry-btn, .debug-btn {
      //     padding: 0.75rem 1.5rem;
      //     background-color: #2563eb;
      //     color: white;
      //     border: none;
      //     border-radius: 0.5rem;
      //     cursor: pointer;
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .debug-btn {
      //     background-color: #7c3aed;
      //   }

      //   .retry-btn:hover, .debug-btn:hover {
      //     transform: translateY(-1px);
      //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      //   }

      //   .top-bar {
      //     background-color: white;
      //     border-bottom: 1px solid #e2e8f0;
      //     padding: 1rem 2rem;
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //   }

      //   .breadcrumb {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     color: #64748b;
      //     font-size: 0.875rem;
      //   }

      //   .breadcrumb-item {
      //     transition: color 0.2s;
      //   }

      //   .breadcrumb-item.clickable:hover {
      //     color: #334155;
      //     cursor: pointer;
      //   }

      //   .breadcrumb-item.active {
      //     color: #1a202c;
      //     font-weight: 500;
      //   }

      //   .breadcrumb-separator {
      //     color: #cbd5e1;
      //   }

      //   .top-actions {
      //     display: flex;
      //     align-items: center;
      //     gap: 1rem;
      //   }

      //   .search-box {
      //     position: relative;
      //     display: flex;
      //     align-items: center;
      //   }

      //   .search-box svg {
      //     position: absolute;
      //     left: 0.75rem;
      //     color: #9ca3af;
      //     width: 1rem;
      //     height: 1rem;
      //   }

      //   .search-input {
      //     padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.5rem;
      //     width: 300px;
      //     font-size: 0.875rem;
      //   }

      //   .search-input:focus {
      //     outline: none;
      //     border-color: #3b82f6;
      //     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      //   }

      //   .notification-btn {
      //     position: relative;
      //     background: none;
      //     border: none;
      //     padding: 0.5rem;
      //     border-radius: 0.5rem;
      //     cursor: pointer;
      //     transition: background-color 0.2s;
      //   }

      //   .notification-btn:hover {
      //     background-color: #f1f5f9;
      //   }

      //   .user-avatar img {
      //     width: 2rem;
      //     height: 2rem;
      //     border-radius: 50%;
      //     border: 2px solid #e2e8f0;
      //   }

      //   .page-content {
      //     flex: 1;
      //     padding: 2rem;
      //   }

      //   .page-header {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: flex-start;
      //     margin-bottom: 2rem;
      //   }

      //   .page-title {
      //     font-size: 2rem;
      //     font-weight: 700;
      //     color: #1a202c;
      //     margin-bottom: 0.5rem;
      //   }

      //   .page-subtitle {
      //     color: #64748b;
      //     font-size: 1rem;
      //   }

      //   .header-actions {
      //     display: flex;
      //     gap: 1rem;
      //   }

      //   .btn-secondary {
      //     padding: 0.75rem 1.5rem;
      //     background-color: white;
      //     color: #374151;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.5rem;
      //     cursor: pointer;
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .btn-secondary:hover:not(:disabled) {
      //     background-color: #f9fafb;
      //     border-color: #9ca3af;
      //   }

      //   .btn-secondary:disabled {
      //     opacity: 0.6;
      //     cursor: not-allowed;
      //   }

      //   .btn-primary {
      //     padding: 0.75rem 1.5rem;
      //     background: linear-gradient(135deg, #667eea, #764ba2);
      //     color: white;
      //     border: none;
      //     border-radius: 0.5rem;
      //     cursor: pointer;
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .btn-primary:hover {
      //     transform: translateY(-1px);
      //     box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      //   }

      //   .stats-section {
      //     display: grid;
      //     grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      //     gap: 1.5rem;
      //     margin-bottom: 2rem;
      //   }

      //   .stat-card {
      //     background-color: white;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 0.75rem;
      //     padding: 1.5rem;
      //     text-align: center;
      //     transition: all 0.2s;
      //   }

      //   .stat-card:hover {
      //     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      //     border-color: #c7d2fe;
      //   }

      //   .stat-number {
      //     font-size: 2rem;
      //     font-weight: 700;
      //     color: #1a202c;
      //     margin-bottom: 0.5rem;
      //   }

      //   .stat-label {
      //     color: #64748b;
      //     font-size: 0.875rem;
      //     font-weight: 500;
      //   }

      //   .candidates-toolbar {
      //     background-color: white;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 0.75rem;
      //     padding: 1rem 1.5rem;
      //     margin-bottom: 1.5rem;
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     flex-wrap: wrap;
      //     gap: 1rem;
      //   }

      //   .toolbar-left {
      //     display: flex;
      //     align-items: center;
      //     gap: 1.5rem;
      //   }

      //   .results-count {
      //     font-size: 0.875rem;
      //     color: #64748b;
      //     font-weight: 500;
      //   }

      //   .bulk-actions {
      //     display: flex;
      //     align-items: center;
      //     gap: 1rem;
      //     padding: 0.5rem 1rem;
      //     background-color: #ede9fe;
      //     border-radius: 0.5rem;
      //   }

      //   .selected-count {
      //     font-size: 0.875rem;
      //     color: #7c3aed;
      //     font-weight: 500;
      //   }

      //   .btn-text {
      //     background: none;
      //     border: none;
      //     color: #7c3aed;
      //     cursor: pointer;
      //     font-weight: 500;
      //     padding: 0.25rem 0.5rem;
      //     border-radius: 0.25rem;
      //     transition: background-color 0.2s;
      //   }

      //   .btn-text:hover {
      //     background-color: rgba(124, 58, 237, 0.1);
      //   }

      //   .toolbar-right {
      //     display: flex;
      //     align-items: center;
      //     gap: 1rem;
      //   }

      //   .sort-by {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-size: 0.875rem;
      //   }

      //   .sort-by select {
      //     padding: 0.5rem;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.375rem;
      //     background-color: white;
      //   }

      //   .view-mode {
      //     display: flex;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.375rem;
      //     overflow: hidden;
      //   }

      //   .view-btn {
      //     padding: 0.5rem;
      //     background-color: white;
      //     border: none;
      //     cursor: pointer;
      //     transition: background-color 0.2s;
      //   }

      //   .view-btn.active {
      //     background-color: #f3f4f6;
      //   }

      //   .filters-panel {
      //     background-color: white;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 0.75rem;
      //     padding: 1.5rem;
      //     margin-bottom: 1.5rem;
      //   }

      //   .filters-content {
      //     display: grid;
      //     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      //     gap: 1rem;
      //     margin-bottom: 1rem;
      //   }

      //   .filter-group {
      //     display: flex;
      //     flex-direction: column;
      //     gap: 0.5rem;
      //   }

      //   .filter-group label {
      //     font-size: 0.875rem;
      //     font-weight: 500;
      //     color: #374151;
      //   }

      //   .filter-group select, .filter-group input {
      //     padding: 0.5rem;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.375rem;
      //     background-color: white;
      //     font-size: 0.875rem;
      //   }

      //   .filter-group select:focus, .filter-group input:focus {
      //     outline: none;
      //     border-color: #3b82f6;
      //     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      //   }

      //   .filters-actions {
      //     display: flex;
      //     justify-content: flex-end;
      //     gap: 1rem;
      //   }

      //   .candidates-grid {
      //     display: grid;
      //     grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      //     gap: 1.5rem;
      //     margin-bottom: 2rem;
      //   }

      //   .candidates-grid.list {
      //     grid-template-columns: 1fr;
      //   }

      //   .candidate-card {
      //     background-color: white;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 0.75rem;
      //     padding: 1.5rem;
      //     transition: all 0.2s;
      //     position: relative;
      //   }

      //   .candidate-card:hover {
      //     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      //     border-color: #c7d2fe;
      //   }

      //   .candidate-card-header {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: flex-start;
      //     margin-bottom: 1rem;
      //   }

      //   .candidate-select input {
      //     cursor: pointer;
      //   }

      //   .candidate-avatar-container {
      //     position: relative;
      //     flex: 1;
      //     display: flex;
      //     justify-content: center;
      //   }

      //   .candidate-avatar {
      //     width: 4rem;
      //     height: 4rem;
      //     border-radius: 50%;
      //     border: 3px solid #e2e8f0;
      //   }

      //   .match-score {
      //     position: absolute;
      //     bottom: -0.5rem;
      //     right: 2rem;
      //     background-color: white;
      //     border: 2px solid;
      //     border-radius: 1rem;
      //     padding: 0.25rem 0.5rem;
      //     font-size: 0.75rem;
      //     font-weight: 700;
      //   }

      //   .match-score.high {
      //     border-color: #10b981;
      //     color: #10b981;
      //   }

      //   .match-score.medium {
      //     border-color: #f59e0b;
      //     color: #f59e0b;
      //   }

      //   .match-score.low {
      //     border-color: #ef4444;
      //     color: #ef4444;
      //   }

      //   .candidate-actions {
      //     display: flex;
      //     gap: 0.5rem;
      //   }

      //   .action-btn {
      //     background: none;
      //     border: none;
      //     padding: 0.5rem;
      //     border-radius: 0.375rem;
      //     cursor: pointer;
      //     transition: all 0.2s;
      //   }

      //   .action-btn:hover {
      //     background-color: #f1f5f9;
      //   }

      //   .action-btn.text-red-500 {
      //     color: #ef4444;
      //   }

      //   .action-btn.text-gray-400 {
      //     color: #9ca3af;
      //   }

      //   .fill-current {
      //     fill: currentColor;
      //   }

      //   .candidate-info {
      //     text-align: center;
      //   }

      //   .candidate-name {
      //     font-size: 1.125rem;
      //     font-weight: 600;
      //     color: #1a202c;
      //     margin-bottom: 0.25rem;
      //   }

      //   .candidate-position {
      //     color: #64748b;
      //     font-size: 0.875rem;
      //     margin-bottom: 1rem;
      //   }

      //   .candidate-meta {
      //     display: flex;
      //     justify-content: center;
      //     gap: 1rem;
      //     margin-bottom: 1rem;
      //     flex-wrap: wrap;
      //   }

      //   .meta-item {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.25rem;
      //     font-size: 0.75rem;
      //     color: #64748b;
      //   }

      //   .candidate-skills {
      //     display: flex;
      //     justify-content: center;
      //     gap: 0.5rem;
      //     margin-bottom: 1rem;
      //     flex-wrap: wrap;
      //   }

      //   .skill-tag {
      //     background-color: #f1f5f9;
      //     color: #475569;
      //     padding: 0.25rem 0.5rem;
      //     border-radius: 0.375rem;
      //     font-size: 0.75rem;
      //     font-weight: 500;
      //   }

      //   .skill-tag.more {
      //     background-color: #e2e8f0;
      //     color: #64748b;
      //   }

      //   .candidate-footer {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     margin-bottom: 1rem;
      //   }

      //   .status-badge {
      //     padding: 0.25rem 0.75rem;
      //     border-radius: 1rem;
      //     font-size: 0.75rem;
      //     font-weight: 500;
      //     border: 1px solid;
      //     background: none;
      //     cursor: pointer;
      //   }

      //   .bg-blue-100 { background-color: #dbeafe; }
      //   .text-blue-800 { color: #1e40af; }
      //   .border-blue-200 { border-color: #bfdbfe; }

      //   .bg-yellow-100 { background-color: #fef3c7; }
      //   .text-yellow-800 { color: #92400e; }
      //   .border-yellow-200 { border-color: #fde68a; }

      //   .bg-green-100 { background-color: #dcfce7; }
      //   .text-green-800 { color: #166534; }
      //   .border-green-200 { border-color: #bbf7d0; }

      //   .bg-purple-100 { background-color: #f3e8ff; }
      //   .text-purple-800 { color: #6b21a8; }
      //   .border-purple-200 { border-color: #e9d5ff; }

      //   .bg-emerald-100 { background-color: #d1fae5; }
      //   .text-emerald-800 { color: #065f46; }
      //   .border-emerald-200 { border-color: #a7f3d0; }

      //   .bg-red-100 { background-color: #fee2e2; }
      //   .text-red-800 { color: #991b1b; }
      //   .border-red-200 { border-color: #fecaca; }

      //   .bg-gray-100 { background-color: #f3f4f6; }
      //   .text-gray-800 { color: #1f2937; }
      //   .border-gray-200 { border-color: #e5e7eb; }

      //   .candidate-salary {
      //     font-size: 0.875rem;
      //     color: #059669;
      //     font-weight: 600;
      //   }

      //   .candidate-card-actions {
      //     display: flex;
      //     gap: 0.75rem;
      //   }

      //   .btn-secondary-sm {
      //     flex: 1;
      //     padding: 0.5rem 1rem;
      //     background-color: #f8fafc;
      //     color: #475569;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 0.375rem;
      //     cursor: pointer;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     gap: 0.25rem;
      //     font-size: 0.875rem;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .btn-secondary-sm:hover {
      //     background-color: #f1f5f9;
      //     border-color: #cbd5e1;
      //   }

      //   .btn-primary-sm {
      //     flex: 1;
      //     padding: 0.5rem 1rem;
      //     background: linear-gradient(135deg, #667eea, #764ba2);
      //     color: white;
      //     border: none;
      //     border-radius: 0.375rem;
      //     cursor: pointer;
      //     font-size: 0.875rem;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .btn-primary-sm:hover {
      //     transform: translateY(-1px);
      //     box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      //   }

      //   .empty-state {
      //     text-align: center;
      //     padding: 3rem;
      //     color: #64748b;
      //     grid-column: 1 / -1;
      //   }

      //   .empty-state svg {
      //     width: 3rem;
      //     height: 3rem;
      //     margin-bottom: 1rem;
      //     opacity: 0.5;
      //   }

      //   .empty-state h3 {
      //     font-size: 1.25rem;
      //     font-weight: 600;
      //     margin-bottom: 0.5rem;
      //     color: #374151;
      //   }

      //   .pagination {
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     gap: 1rem;
      //     padding: 2rem;
      //   }

      //   .pagination-btn {
      //     background: none;
      //     border: 1px solid #d1d5db;
      //     padding: 0.5rem 1rem;
      //     border-radius: 0.375rem;
      //     cursor: pointer;
      //     transition: all 0.2s;
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-size: 0.875rem;
      //   }

      //   .pagination-btn:hover:not(:disabled) {
      //     background-color: #f9fafb;
      //   }

      //   .pagination-btn:disabled {
      //     opacity: 0.5;
      //     cursor: not-allowed;
      //   }

      //   .pagination-info {
      //     font-size: 0.875rem;
      //     color: #64748b;
      //   }

      //   /* Modal Styles */
      //   .modal-overlay {
      //     position: fixed;
      //     top: 0;
      //     left: 0;
      //     right: 0;
      //     bottom: 0;
      //     background-color: rgba(0, 0, 0, 0.75);
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     z-index: 1000;
      //     padding: 1rem;
      //   }

      //   .modal-content-large {
      //     background-color: white;
      //     border-radius: 1rem;
      //     max-width: 4xl;
      //     max-height: 90vh;
      //     width: 100%;
      //     overflow: hidden;
      //     display: flex;
      //     flex-direction: column;
      //     box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      //   }

      //   .modal-header {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     padding: 1.5rem 2rem;
      //     border-bottom: 1px solid #e5e7eb;
      //     background: linear-gradient(135deg, #667eea, #764ba2);
      //     color: white;
      //   }

      //   .modal-title-section {
      //     display: flex;
      //     align-items: center;
      //     gap: 1rem;
      //   }

      //   .candidate-avatar-large {
      //     width: 4rem;
      //     height: 4rem;
      //     border-radius: 50%;
      //     border: 3px solid white;
      //   }

      //   .modal-title {
      //     font-size: 1.5rem;
      //     font-weight: 600;
      //     margin: 0;
      //   }

      //   .modal-subtitle {
      //     font-size: 1rem;
      //     opacity: 0.9;
      //     margin: 0;
      //   }

      //   .modal-close-btn {
      //     background: rgba(255, 255, 255, 0.2);
      //     border: none;
      //     border-radius: 0.5rem;
      //     padding: 0.5rem;
      //     cursor: pointer;
      //     color: white;
      //     transition: background-color 0.2s;
      //   }

      //   .modal-close-btn:hover {
      //     background: rgba(255, 255, 255, 0.3);
      //   }

      //   .modal-body {
      //     overflow-y: auto;
      //     padding: 2rem;
      //     flex: 1;
      //   }

      //   .candidate-details-grid {
      //     display: grid;
      //     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      //     gap: 1.5rem;
      //   }

      //   .detail-section {
      //     background-color: #f8fafc;
      //     border-radius: 0.75rem;
      //     padding: 1.5rem;
      //     border-left: 4px solid #667eea;
      //   }

      //   .detail-section.full-width {
      //     grid-column: 1 / -1;
      //   }

      //   .detail-section h3 {
      //     font-size: 1.125rem;
      //     font-weight: 600;
      //     color: #374151;
      //     margin-bottom: 1rem;
      //   }

      //   .contact-info, .profile-info {
      //     display: flex;
      //     flex-direction: column;
      //     gap: 0.75rem;
      //   }

      //   .contact-item, .profile-item {
      //     display: flex;
      //     align-items: center;
      //     gap: 0.5rem;
      //     font-size: 0.875rem;
      //     color: #4b5563;
      //   }

      //   .contact-item a {
      //     color: #3b82f6;
      //     text-decoration: none;
      //   }

      //   .contact-item a:hover {
      //     text-decoration: underline;
      //   }

      //   .skills-list {
      //     display: flex;
      //     flex-wrap: wrap;
      //     gap: 0.5rem;
      //   }

      //   .cover-letter-content, .motivation-content {
      //     background-color: white;
      //     padding: 1rem;
      //     border-radius: 0.5rem;
      //     border: 1px solid #e5e7eb;
      //     line-height: 1.6;
      //     color: #374151;
      //   }

      //   .custom-answers {
      //     display: flex;
      //     flex-direction: column;
      //     gap: 1rem;
      //   }

      //   .custom-answer {
      //     background-color: white;
      //     padding: 1rem;
      //     border-radius: 0.5rem;
      //     border: 1px solid #e5e7eb;
      //   }

      //   .custom-answer h4 {
      //     font-weight: 600;
      //     color: #374151;
      //     margin-bottom: 0.5rem;
      //   }

      //   .custom-answer p {
      //     color: #6b7280;
      //     line-height: 1.5;
      //     margin: 0;
      //   }

      //   .documents-list {
      //     display: flex;
      //     flex-direction: column;
      //     gap: 0.75rem;
      //   }

      //   .document-btn {
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     padding: 0.75rem 1rem;
      //     background-color: white;
      //     border: 1px solid #e5e7eb;
      //     border-radius: 0.5rem;
      //     cursor: pointer;
      //     transition: all 0.2s;
      //     text-align: left;
      //   }

      //   .document-btn:hover {
      //     background-color: #f9fafb;
      //     border-color: #d1d5db;
      //   }

      //   .document-btn span {
      //     flex: 1;
      //     margin-left: 0.5rem;
      //     font-size: 0.875rem;
      //     color: #374151;
      //   }

      //   .no-documents {
      //     color: #9ca3af;
      //     font-style: italic;
      //     text-align: center;
      //     padding: 1rem;
      //   }

      //   .modal-footer {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     padding: 1.5rem 2rem;
      //     border-top: 1px solid #e5e7eb;
      //     background-color: #f9fafb;
      //   }

      //   .status-change-section {
      //     display: flex;
      //     align-items: center;
      //     gap: 1rem;
      //   }

      //   .status-change-section label {
      //     font-size: 0.875rem;
      //     font-weight: 500;
      //     color: #374151;
      //   }

      //   .status-select {
      //     padding: 0.5rem 0.75rem;
      //     border: 1px solid #d1d5db;
      //     border-radius: 0.375rem;
      //     background-color: white;
      //     font-size: 0.875rem;
      //   }

      //   .modal-actions {
      //     display: flex;
      //     gap: 1rem;
      //   }

      //   .animate-spin {
      //     animation: spin 1s linear infinite;
      //   }

      //   @media (max-width: 768px) {
      //     .dashboard {
      //       flex-direction: column;
      //     }

      //     .sidebar {
      //       width: 100%;
      //       padding: 1rem 0;
      //     }

      //     .candidates-grid {
      //       grid-template-columns: 1fr;
      //     }
          
      //     .candidates-toolbar {
      //       flex-direction: column;
      //       align-items: stretch;
      //     }
          
      //     .toolbar-left, .toolbar-right {
      //       justify-content: center;
      //     }
          
      //     .modal-content-large {
      //       margin: 0.5rem;
      //       max-height: 95vh;
      //     }
          
      //     .candidate-details-grid {
      //       grid-template-columns: 1fr;
      //     }

      //     .stats-section {
      //       grid-template-columns: repeat(2, 1fr);
      //     }

      //     .filters-content {
      //       grid-template-columns: 1fr;
      //     }

      //     .page-header {
      //       flex-direction: column;
      //       gap: 1rem;
      //       align-items: stretch;
      //     }

      //     .header-actions {
      //       justify-content: center;
      //     }

      //     .top-bar {
      //       flex-direction: column;
      //       gap: 1rem;
      //       align-items: stretch;
      //     }

      //     .top-actions {
      //       justify-content: center;
      //     }

      //     .search-input {
      //       width: 100%;
      //     }
      //   }

      //   @media (max-width: 480px) {
      //     .stats-section {
      //       grid-template-columns: 1fr;
      //     }

      //     .candidate-meta {
      //       flex-direction: column;
      //       gap: 0.5rem;
      //     }

      //     .candidate-card-actions {
      //       flex-direction: column;
      //     }

      //     .pagination {
      //       flex-direction: column;
      //       gap: 0.5rem;
      //     }
      //   }
//       `}</style>
//     </div>
//   );
// };

// export default CandidatesPage;