import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import applicationService from '../services/applicationService';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Star,
  Clock,
  DollarSign,
  Send,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  Link2,
  X,
  Building,
  Users,
  GraduationCap,
  Target,
  Award,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const JobApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobOffer, setJobOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    coverLetter: '',
    experience: '',
    motivation: '',
    availability: '',
    expectedSalary: '',
    portfolio: '',
    linkedin: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState({
    cv: null,
    coverLetterFile: null,
    portfolio: null
  });

  const [customAnswers, setCustomAnswers] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Récupérer les données de l'emploi depuis l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const jobData = urlParams.get('job');
    
    console.log('JobData from URL:', jobData);
    
    if (jobData) {
      try {
        const decodedJob = JSON.parse(decodeURIComponent(jobData));
        console.log('Decoded job:', decodedJob);
        setJobOffer(decodedJob);
        
        // Initialiser les réponses aux questions personnalisées
        if (decodedJob.questions && decodedJob.questions.length > 0) {
          setCustomAnswers(decodedJob.questions.map(question => ({
            question,
            answer: ''
          })));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du décodage des données de l\'emploi:', error);
        alert('Erreur: Données de l\'emploi corrompues. Redirection vers la liste des emplois.');
        navigate('/jobs');
      }
    } else {
      console.log('Aucune donnée d\'emploi trouvée dans l\'URL');
      alert('Aucun emploi sélectionné. Veuillez choisir un emploi depuis la liste.');
      navigate('/jobs');
    }
  }, [location.search, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (type, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleCustomAnswerChange = (index, value) => {
    setCustomAnswers(prev => prev.map((item, i) => 
      i === index ? { ...item, answer: value } : item
    ));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  // Validation des champs obligatoires
  if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
    setSubmitError('Veuillez remplir votre prénom et nom');
    setIsSubmitting(false);
    return;
  }

  if (!formData.email?.trim()) {
    setSubmitError('Veuillez remplir votre email');
    setIsSubmitting(false);
    return;
  }

  if (!formData.phone?.trim()) {
    setSubmitError('Veuillez remplir votre numéro de téléphone');
    setIsSubmitting(false);
    return;
  }

  if (!uploadedFiles.cv) {
    setSubmitError('Veuillez joindre votre CV');
    setIsSubmitting(false);
    return;
  }

  // Validation de l'ID du job
  const jobId = jobOffer?.id || jobOffer?._id;
  if (!jobId) {
    setSubmitError('Erreur: ID du poste manquant. Veuillez retourner à la liste des emplois.');
    setIsSubmitting(false);
    return;
  }

  try {
    console.log('🚀 Début de l\'envoi de candidature');
    console.log('📋 Données du job:', {
      jobId: jobId,
      title: jobOffer?.title,
      company: jobOffer?.company
    });

    // Préparer les données avec validation stricte
    const applicationData = {
      // ID du job (CRITIQUE - doit être cohérent)
      jobId: jobId,
      
      // Informations personnelles (obligatoire)
      personalInfo: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(), 
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address?.trim() || ''
      },
      
      // Documents (CV obligatoire)
      documents: {
        cv: uploadedFiles.cv,
        coverLetterFile: uploadedFiles.coverLetterFile || null,
        portfolio: uploadedFiles.portfolio || null
      },
      
      // Lettre de motivation texte (optionnelle)
      coverLetter: formData.coverLetter?.trim() || '',
      
      // Informations complémentaires (optionnelles)
      additionalInfo: {
        experience: formData.experience || '',
        motivation: formData.motivation || '',
        availability: formData.availability || '',
        expectedSalary: formData.expectedSalary || '',
        portfolioUrl: formData.portfolio || '',
        linkedinUrl: formData.linkedin || ''
      },
      
      // Réponses aux questions personnalisées
      customAnswers: customAnswers.filter(answer => 
        answer.question && answer.answer && answer.answer.trim() !== ''
      ),
      
      // Métadonnées pour debug/traçabilité
      metadata: {
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        jobTitle: jobOffer?.title,
        jobCompany: jobOffer?.company
      }
    };

    console.log('📤 Données préparées pour envoi:', {
      jobId: applicationData.jobId,
      personalInfo: {
        name: `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}`,
        email: applicationData.personalInfo.email,
        phone: applicationData.personalInfo.phone
      },
      documents: {
        hasCV: !!applicationData.documents.cv,
        hasCoverLetter: !!applicationData.documents.coverLetterFile,
        hasPortfolio: !!applicationData.documents.portfolio
      },
      customAnswersCount: applicationData.customAnswers.length,
      coverLetterLength: applicationData.coverLetter.length
    });

    // Validation finale avant envoi
    if (!applicationData.jobId) {
      throw new Error('ID du job manquant dans les données finales');
    }

    if (!applicationData.personalInfo.firstName || !applicationData.personalInfo.lastName) {
      throw new Error('Nom ou prénom manquant dans les données finales');
    }

    if (!applicationData.documents.cv) {
      throw new Error('CV manquant dans les données finales');
    }

    // Appel du service avec retry en cas d'échec
    let response;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        console.log(`📡 Tentative d'envoi ${retryCount + 1}/${maxRetries}`);
        response = await applicationService.createApplication(applicationData);
        console.log('✅ Candidature envoyée avec succès:', response);
        break;
      } catch (error) {
        retryCount++;
        console.error(`❌ Échec tentative ${retryCount}:`, error);
        
        if (retryCount >= maxRetries) {
          throw error;
        }
        
        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
    
    setSubmitStatus('success');
    
    // Petit délai pour montrer le message de succès
    setTimeout(() => {
      navigate('/Applications', { 
        state: { 
          newApplication: true,
          applicationId: response.applicationId || response.id || response._id,
          jobTitle: jobOffer?.title,
          company: jobOffer?.company,
          message: 'Votre candidature a été envoyée avec succès !',
          timestamp: new Date().toISOString()
        }
      });
    }, 2000);
    
  } catch (error) {
    console.error('💥 Erreur lors de l\'envoi de la candidature:', error);
    console.error('Stack trace:', error.stack);
    
    // Messages d'erreur plus spécifiques
    let errorMessage = 'Erreur inconnue lors de l\'envoi de la candidature';
    
    if (error.message?.includes('Network')) {
      errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.';
    } else if (error.message?.includes('400')) {
      errorMessage = 'Données invalides. Veuillez vérifier tous les champs obligatoires.';
    } else if (error.message?.includes('401')) {
      errorMessage = 'Session expirée. Veuillez vous reconnecter.';
    } else if (error.message?.includes('403')) {
      errorMessage = 'Accès refusé. Vérifiez vos permissions.';
    } else if (error.message?.includes('500')) {
      errorMessage = 'Erreur serveur. Veuillez réessayer dans quelques minutes.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setSubmitError(errorMessage);
    setIsSubmitting(false);
  }
};

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Non spécifié';
    
    if (typeof salary === 'object') {
      if (salary.min && salary.max) {
        return `${salary.min} - ${salary.max} ${salary.currency || 'FCFA'}`;
      } else if (salary.min) {
        return `À partir de ${salary.min} ${salary.currency || 'FCFA'}`;
      } else if (salary.max) {
        return `Jusqu'à ${salary.max} ${salary.currency || 'FCFA'}`;
      }
    }
    return typeof salary === 'string' ? salary : 'Non spécifié';
  };

  const formatExperience = (experience) => {
    const levels = {
      'junior': 'Débutant (0-2 ans)',
      'intermediate': 'Intermédiaire (2-5 ans)',
      'senior': 'Senior (5+ ans)',
      'lead': 'Lead/Manager'
    };
    return levels[experience] || experience;
  };

  const FileUploadArea = ({ type, label, accept, icon: Icon }) => (
   <div className="file-upload-area">
      <label className="file-upload-label">
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileUpload(type, e.target.files[0])}
          className="file-upload-input"
        />
        <div className="file-upload-content">
          <Icon className="upload-icon" />
          <div className="file-upload-text">
            <span className="upload-title">{label}</span>
            <span className="upload-subtitle">Cliquez pour sélectionner ou glissez-déposez</span>
          </div>
        </div>
      </label>
      {uploadedFiles[type] && (
        <div className="uploaded-file">
          <FileText className="file-icon" />
          <span className="file-name">{uploadedFiles[type].name}</span>
          <button 
            onClick={() => handleFileUpload(type, null)}
            className="remove-file-btn"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  // Modal de détails de l'emploi
  const JobDetailsModal = () => (
    <div className="job-details-modal" onClick={() => setShowJobDetails(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Détails complets de l'offre</h2>
          <button 
            className="modal-close"
            onClick={() => setShowJobDetails(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* En-tête de l'offre */}
          <div className="job-details-header">
            <div className="company-logo-large">
              {jobOffer?.company?.charAt(0) || '?'}
            </div>
            <div className="job-main-info">
              <h1>{jobOffer?.title}</h1>
              <h2>{jobOffer?.company}</h2>
              <div className="job-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  {jobOffer?.location}
                </div>
                <div className="meta-item">
                  <Briefcase size={16} />
                  {jobOffer?.type}
                </div>
                {jobOffer?.remote && (
                  <div className="meta-item remote">
                    <Globe size={16} />
                    Télétravail possible
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informations principales */}
          <div className="details-section">
            <h3>
              <Building size={20} />
              Informations générales
            </h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Salaire:</span>
                <span className="detail-value">{formatSalary(jobOffer?.salary)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Expérience requise:</span>
                <span className="detail-value">{formatExperience(jobOffer?.experience)}</span>
              </div>
              {jobOffer?.education && (
                <div className="detail-item">
                  <span className="detail-label">Formation:</span>
                  <span className="detail-value">{jobOffer.education}</span>
                </div>
              )}
              {jobOffer?.department && (
                <div className="detail-item">
                  <span className="detail-label">Département:</span>
                  <span className="detail-value">{jobOffer.department}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {jobOffer?.description && (
            <div className="details-section">
              <h3>
                <FileText size={20} />
                Description du poste
              </h3>
              <div className="description-content">
                {jobOffer.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Compétences */}
          {jobOffer?.skills && jobOffer.skills.length > 0 && (
            <div className="details-section">
              <h3>
                <Target size={20} />
                Compétences requises
              </h3>
              <div className="skills-grid">
                {jobOffer.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Questions personnalisées */}
          {jobOffer?.questions && jobOffer.questions.length > 0 && (
            <div className="details-section">
              <h3>
                <AlertCircle size={20} />
                Questions personnalisées
              </h3>
              <ul className="questions-list">
                {jobOffer.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Page de succès améliorée
  if (submitStatus === 'success') {
    return (
      <div className="success-page">
        <style>{`
          .success-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          
          .success-card {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            padding: 3rem 2rem;
            max-width: 32rem;
            width: 100%;
            text-align: center;
            animation: slideUp 0.5s ease-out;
          }
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .success-icon {
            width: 5rem;
            height: 5rem;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            animation: bounce 0.6s ease-out 0.2s both;
          }
          
          @keyframes bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          .success-title {
            font-size: 2rem;
            font-weight: bold;
            color: #111827;
            margin-bottom: 1rem;
          }
          
          .success-message {
            color: #6b7280;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          
          .job-summary {
            background-color: #f9fafb;
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 4px solid #10b981;
          }
          
          .job-summary-title {
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          
          .job-summary-details {
            color: #6b7280;
            font-size: 0.875rem;
          }
          
          .success-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .btn-success-primary {
            width: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem;
            border-radius: 0.75rem;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .btn-success-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }
          
          .btn-success-secondary {
            width: 100%;
            background-color: #f3f4f6;
            color: #374151;
            padding: 1rem;
            border-radius: 0.75rem;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .btn-success-secondary:hover {
            background-color: #e5e7eb;
            transform: translateY(-1px);
          }
          
          .next-steps {
            background-color: #eff6ff;
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 4px solid #3b82f6;
          }
          
          .next-steps-title {
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .next-steps-list {
            color: #1e40af;
            font-size: 0.875rem;
            line-height: 1.5;
          }
          
          .next-steps-list li {
            margin-bottom: 0.5rem;
          }
        `}</style>
        
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 style={{ width: '3rem', height: '3rem', color: 'white' }} />
          </div>
          
          <h1 className="success-title">Candidature envoyée !</h1>
          
          <p className="success-message">
            Félicitations ! Votre candidature a été transmise avec succès au recruteur.
          </p>

          <div className="job-summary">
            <div className="job-summary-title">Récapitulatif de votre candidature</div>
            <div className="job-summary-details">
              <strong>{jobOffer?.title}</strong> chez <strong>{jobOffer?.company}</strong><br/>
              {jobOffer?.location} • {jobOffer?.type}
            </div>
          </div>

          <div className="next-steps">
            <div className="next-steps-title">
              <Clock size={16} />
              Prochaines étapes
            </div>
            <ul className="next-steps-list">
              <li>Le recruteur va examiner votre profil</li>
              <li>Vous recevrez une notification de mise à jour</li>
              <li>Suivez l'évolution dans votre espace candidat</li>
            </ul>
          </div>
          
          <div className="success-buttons">
            <button 
              onClick={() => navigate('/Applications')}
              className="btn-success-primary"
            >
              <Eye size={16} />
              Suivre ma candidature
            </button>
            <button 
              onClick={() => navigate('/jobs')}
              className="btn-success-secondary"
            >
              <Briefcase size={16} />
              Voir d'autres offres
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.125rem',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Chargement des informations de l'emploi...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Si pas de données d'emploi, ne pas afficher le formulaire
  if (!jobOffer) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.125rem',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <p>Aucune information d'emploi disponible.</p>
        <button 
          onClick={() => navigate('/jobs')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Retour aux offres
        </button>
      </div>
    );
  }

  return (
    <div className="job-application-page">
      <style>{`
        /* === STYLES GÉNÉRAUX === */
        .job-application-page {
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* === MODAL DÉTAILS EMPLOI === */
        .job-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background-color: white;
          border-radius: 1rem;
          max-width: 4xl;
          max-height: 90vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem;
          cursor: pointer;
          color: white;
          transition: background-color 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .modal-body {
          overflow-y: auto;
          padding: 2rem;
        }

        .job-details-header {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f3f4f6;
        }

        .company-logo-large {
          width: 5rem;
          height: 5rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .job-main-info h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .job-main-info h2 {
          font-size: 1.25rem;
          font-weight: 500;
          color: #6b7280;
          margin: 0 0 1rem 0;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #f3f4f6;
          border-radius: 2rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .meta-item.remote {
          background-color: #dcfce7;
          color: #16a34a;
        }

        .details-section {
          margin-bottom: 2rem;
        }

        .details-section h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f3f4f6;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          background-color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid #667eea;
        }

        .detail-label {
          font-weight: 600;
          color: #4b5563;
          display: block;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          color: #111827;
          font-weight: 500;
        }

        .description-content {
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid #667eea;
        }

        .description-content p {
          margin: 0 0 1rem 0;
          line-height: 1.6;
          color: #374151;
        }

        .description-content p:last-child {
          margin-bottom: 0;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-tag {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .questions-list {
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid #f59e0b;
        }

        .questions-list li {
          margin-bottom: 0.75rem;
          padding-left: 1rem;
          position: relative;
          color: #374151;
          line-height: 1.5;
        }

        .questions-list li:before {
          content: "?";
          position: absolute;
          left: 0;
          color: #f59e0b;
          font-weight: bold;
        }

        /* === HEADER === */
        .page-header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          font-size: 1rem;
        }

        .back-button:hover {
          color: #111827;
        }

        .step-indicator {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* === CONTENU PRINCIPAL === */
        .main-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .content-layout {
            grid-template-columns: 1fr 2fr;
          }
        }

        /* === CARTE INFORMATIONS EMPLOI === */
        .job-info-card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          position: sticky;
          top: 2rem;
        }

        .job-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .company-logo {
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background-color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6b7280;
        }

        .job-info {
          flex: 1;
        }

        .job-title {
          font-weight: bold;
          font-size: 1.25rem;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .company-name {
          color: #6b7280;
          font-weight: 500;
        }

        .job-details {
          margin-bottom: 1.5rem;
        }

        .job-detail-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.75rem;
        }

        .job-detail-item svg {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .requirements-section {
          margin-bottom: 1.5rem;
        }

        .requirements-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .requirement-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .requirement-item svg {
          width: 0.75rem;
          height: 0.75rem;
          margin-right: 0.5rem;
          color: #eab308;
        }

        .job-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .job-action-btn {
          width: 100%;
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .job-action-btn:hover {
          background-color: #e5e7eb;
          transform: translateY(-1px);
        }

        .job-action-btn.primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .job-action-btn.primary:hover {
          background: linear-gradient(135deg, #5a67d8, #6b46c1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .job-action-btn svg {
          width: 1rem;
          height: 1rem;
        }

        /* === FORMULAIRE === */
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }

        .section-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .section-icon.blue {
          background-color: #dbeafe;
        }

        .section-icon.blue svg {
          color: #2563eb;
        }

        .section-icon.green {
          background-color: #dcfce7;
        }

        .section-icon.green svg {
          color: #16a34a;
        }

        .section-icon.purple {
          background-color: #f3e8ff;
        }

        .section-icon.purple svg {
          color: #9333ea;
        }

        .section-icon.orange {
          background-color: #fed7aa;
        }

        .section-icon.orange svg {
          color: #ea580c;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-grid.full-width {
          grid-template-columns: 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .form-input {
          padding-left: 2.5rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 0.875rem;
          width: 1rem;
          height: 1rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          resize: none;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          background-color: white;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* === UPLOAD DE FICHIERS === */
        .file-upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }

        .file-upload-area:hover {
          border-color: #9ca3af;
          background-color: #f9fafb;
        }

        .file-upload-label {
          cursor: pointer;
          display: block;
        }

        .file-upload-input {
          display: none;
        }

        .file-upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .upload-icon {
          width: 2rem;
          height: 2rem;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }

        .file-upload-text {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .upload-title {
          font-weight: 500;
          color: #111827;
        }

        .upload-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .uploaded-file {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: #f3f4f6;
          border-radius: 0.25rem;
        }

        .file-icon {
          width: 1rem;
          height: 1rem;
        }

        .file-name {
          font-size: 0.875rem;
          flex: 1;
        }

        .remove-file-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: bold;
          color: #ef4444;
          transition: color 0.2s;
        }

        .remove-file-btn:hover {
          color: #dc2626;
        }

        /* === AVERTISSEMENT === */
        .warning-section {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .warning-icon {
          color: #f59e0b;
          margin-top: 0.125rem;
          width: 1.25rem;
          height: 1.25rem;
        }

        .warning-content {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .warning-title {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .warning-list {
          list-style-type: disc;
          list-style-position: inside;
          color: #6b7280;
        }

        .warning-list li {
          margin-bottom: 0.25rem;
        }

        /* === MESSAGES D'ERREUR === */
        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
          color: #dc2626;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .error-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #dc2626;
        }

        /* === BOUTONS === */
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .button-group {
            flex-direction: row;
          }
        }

        .btn-draft {
          flex: 1;
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .btn-draft:hover {
          background-color: #e5e7eb;
        }

        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #4f46e5, #9333ea, #6b21a8);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .btn-primary svg {
          width: 1rem;
          height: 1rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          border-radius: 50%;
          height: 1rem;
          width: 1rem;
          border: 2px solid transparent;
          border-bottom-color: white;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .full-width {
          grid-column: 1 / -1;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .modal-content {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body {
            padding: 1rem;
          }

          .job-details-header {
            flex-direction: column;
            text-align: center;
          }

          .company-logo-large {
            align-self: center;
          }

          .job-meta {
            justify-content: center;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header">
        <div className="header-container">
          <div className="header-content">
            <button className="back-button" onClick={() => navigate('/jobs')}>
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
              Retour aux offres
            </button>
            <div className="step-indicator">
              Candidature - {jobOffer?.title}
            </div>
          </div>
        </div>
      </div>

      {/* Modal des détails de l'emploi */}
      {showJobDetails && <JobDetailsModal />}

      {/* Contenu principal */}
      <div className="main-container">
        <div className="content-layout">
          
          {/* Informations sur l'offre */}
          <div>
            <div className="job-info-card">
              <div className="job-header">
                <div className="company-logo">
                  {jobOffer?.company?.charAt(0) || '?'}
                </div>
                <div className="job-info">
                  <h2 className="job-title">{jobOffer?.title}</h2>
                  <p className="company-name">{jobOffer?.company}</p>
                </div>
              </div>

              <div className="job-details">
                <div className="job-detail-item">
                  <MapPin />
                  {jobOffer?.location}
                  {jobOffer?.remote && <span style={{ marginLeft: '0.5rem', color: '#16a34a', fontWeight: '500' }}>• Remote</span>}
                </div>
                <div className="job-detail-item">
                  <Briefcase />
                  {jobOffer?.type}
                </div>
                <div className="job-detail-item">
                  <DollarSign />
                  {formatSalary(jobOffer?.salary)}
                </div>
                <div className="job-detail-item">
                  <Clock />
                  {jobOffer?.postedDate ? `Publié ${jobOffer.postedDate}` : 'Date de publication non spécifiée'}
                </div>
                {jobOffer?.experience && (
                  <div className="job-detail-item">
                    <GraduationCap />
                    {formatExperience(jobOffer.experience)}
                  </div>
                )}
              </div>

              {jobOffer?.requirements && jobOffer.requirements.length > 0 && (
                <div className="requirements-section">
                  <h3 className="requirements-title">Exigences principales</h3>
                  <div>
                    {jobOffer.requirements.slice(0, 3).map((req, index) => (
                      <div key={index} className="requirement-item">
                        <Star />
                        {req}
                      </div>
                    ))}
                    {jobOffer.requirements.length > 3 && (
                      <div className="requirement-item" style={{ color: '#6b7280', fontStyle: 'italic' }}>
                        <Star />
                        et {jobOffer.requirements.length - 3} autres exigences...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {jobOffer?.skills && jobOffer.skills.length > 0 && (
                <div className="requirements-section">
                  <h3 className="requirements-title">Compétences clés</h3>
                  <div>
                    {jobOffer.skills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="requirement-item">
                        <Star />
                        {skill}
                      </div>
                    ))}
                    {jobOffer.skills.length > 4 && (
                      <div className="requirement-item" style={{ color: '#6b7280', fontStyle: 'italic' }}>
                        <Star />
                        et {jobOffer.skills.length - 4} autres compétences...
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="job-actions">
                <button 
                  className="job-action-btn primary" 
                  onClick={() => setShowJobDetails(true)}
                >
                  <Eye />
                  Voir tous les détails
                </button>
                <button className="job-action-btn" onClick={() => window.print()}>
                  <Download />
                  Imprimer l'offre
                </button>
                {jobOffer?.contact_email && (
                  <button 
                    className="job-action-btn" 
                    onClick={() => window.location.href = `mailto:${jobOffer.contact_email}?subject=Question concernant le poste ${jobOffer.title}`}
                  >
                    <Mail />
                    Contacter le recruteur
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Formulaire de candidature */}
          <div>
            <div className="form-container">
              
              {/* Informations personnelles */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon blue">
                    <User />
                  </div>
                  <div>
                    <h3 className="section-title">Informations personnelles</h3>
                    <p className="section-subtitle">Renseignez vos coordonnées</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <div className="input-with-icon">
                      <Mail className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
                    <div className="input-with-icon">
                      <Phone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Adresse</label>
                    <div className="input-with-icon">
                      <MapPin className="input-icon" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Ville, Pays"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon green">
                    <FileText />
                  </div>
                  <div>
                    <h3 className="section-title">Documents</h3>
                    <p className="section-subtitle">Joignez vos documents de candidature</p>
                  </div>
                </div>

                <div className="form-grid">
                  <FileUploadArea
                    type="cv"
                    label="CV (obligatoire)"
                    accept=".pdf,.doc,.docx"
                    icon={FileText}
                  />
                  <FileUploadArea
                    type="coverLetterFile"
                    label="Lettre de motivation"
                    accept=".pdf,.doc,.docx"
                    icon={Upload}
                  />
                </div>
              </div>

              {/* Lettre de motivation */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon purple">
                    <FileText />
                  </div>
                  <div>
                    <h3 className="section-title">Lettre de motivation</h3>
                    <p className="section-subtitle">Expliquez votre motivation pour ce poste</p>
                  </div>
                </div>

                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="form-textarea"
                  placeholder={`Expliquez pourquoi vous êtes le candidat idéal pour le poste de ${jobOffer?.title} chez ${jobOffer?.company}...`}
                />
              </div>

             


              {jobOffer?.questions && jobOffer.questions.length > 0 && (
  <div className="form-section">
    <div className="section-header">
      <div className="section-icon orange">
        <AlertCircle />
      </div>
      <div>
        <h3 className="section-title">Questions spécifiques</h3>
        <p className="section-subtitle">Questions posées par l'entreprise</p>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {customAnswers.map((item, index) => (
        <div key={index} className="form-group">
          <label className="form-label">{item.question}</label>
          <textarea
            value={item.answer}
            onChange={(e) => handleCustomAnswerChange(index, e.target.value)}
            rows={3}
            className="form-textarea"
            placeholder="Votre réponse..."
          />
        </div>
      ))}
    </div>
  </div>
)}

              {/* Informations complémentaires */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon orange">
                    <Briefcase />
                  </div>
                  <div>
                    <h3 className="section-title">Informations complémentaires</h3>
                    <p className="section-subtitle">Détails sur votre profil professionnel</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Années d'expérience pertinente</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="0-1">0-1 an</option>
                      <option value="1-3">1-3 ans</option>
                      <option value="3-5">3-5 ans</option>
                      <option value="5-10">5-10 ans</option>
                      <option value="10+">Plus de 10 ans</option>
                    </select>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Disponibilité</label>
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Ex: Immédiate, 1 mois de préavis..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Prétentions salariales</label>
                      <input
                        type="text"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Ex: 55k€, À négocier..."
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Portfolio/Site web</label>
                      <div className="input-with-icon">
                        <Link2 className="input-icon" />
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="https://mon-portfolio.com"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Profil LinkedIn</label>
                      <div className="input-with-icon">
                        <Link2 className="input-icon" />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             


              {submitError && (
  <div className="error-message">
    <AlertCircle className="error-icon" />
    <span>{submitError}</span>
  </div>
)}

{/* Validation et envoi */}
<div className="form-section">
  <div className="warning-section">
    <AlertCircle className="warning-icon" />
    <div className="warning-content">
      <p className="warning-title">Avant d'envoyer votre candidature :</p>
      <ul className="warning-list">
        <li>Vérifiez que toutes les informations sont correctes</li>
        <li>Assurez-vous que votre CV est à jour</li>
        <li>Relisez votre lettre de motivation</li>
        {jobOffer?.questions && jobOffer.questions.length > 0 && (
          <li>Répondez aux questions spécifiques de l'entreprise</li>
        )}
      </ul>
    </div>
  </div>

  {submitError && (
    <div className="error-message">
      <AlertCircle className="error-icon" />
      <span>{submitError}</span>
    </div>
  )}

  <div className="button-group">
    <button
      type="button"
      className="btn-draft"
      onClick={() => alert('Candidature sauvegardée comme brouillon')}
      disabled={isSubmitting}
    >
      Sauvegarder comme brouillon
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn-primary"
      onClick={handleSubmit}
    >
      {isSubmitting ? (
        <>
          <div className="spinner"></div>
          Envoi en cours...
        </>
      ) : (
        <>
          <Send />
          Envoyer ma candidature
        </>
      )}
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default JobApplicationPage;