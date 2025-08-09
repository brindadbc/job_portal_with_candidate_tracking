import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import {
  Save,
  Eye,
  Plus,
  X,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Tag,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Settings,
  AlertCircle,
  Send,
  ArrowLeft
} from 'lucide-react';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'CDI',
    remote: false,
    salary: {
      min: '',
      max: '',
      currency: 'FCFA',
      period: 'year'
    },
    experience: 'intermediate',
    education: '',
    description: '',
    requirements: [],
    benefits: [],
    skills: [],
    department: '',
    team_size: '',
    start_date: '',
    application_deadline: '',
    contact_email: '',
    questions: [],
    status: 'Actif'
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const steps = [
    { id: 1, title: 'Informations de base', icon: Building },
    { id: 2, title: 'Description du poste', icon: FileText },
    { id: 3, title: 'Exigences', icon: Target },
    { id: 4, title: 'Avantages', icon: Award },
    { id: 5, title: 'Finalisation', icon: Settings }
  ];

  const jobTypes = [
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Stage', label: 'Stage' },
    { value: 'Alternance', label: 'Alternance' }
  ];

  const experienceLevels = [
    { value: 'junior', label: 'Débutant (0-2 ans)' },
    { value: 'intermediate', label: 'Intermédiaire (2-5 ans)' },
    { value: 'senior', label: 'Senior (5+ ans)' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setJobData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setJobData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addItem = (type, value, setter) => {
    if (value.trim()) {
      setJobData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (type, index) => {
    setJobData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatSalary = (jobData) => {
    if (jobData.salary.min && jobData.salary.max) {
      return `${jobData.salary.min} - ${jobData.salary.max} ${jobData.salary.currency}`;
    } else if (jobData.salary.min) {
      return `${jobData.salary.min} ${jobData.salary.currency}`;
    } else if (jobData.salary.max) {
      return `${jobData.salary.max} ${jobData.salary.currency}`;
    }
    return 'Non spécifié';
  };

  const handlePublish = async () => {
  try {
    // Validation des champs requis
    if (!jobData.title || !jobData.company || !jobData.location || !jobData.description) {
      alert('Veuillez remplir tous les champs requis (titre, entreprise, localisation, description)');
      return;
    }

    const publishedData = { 
      ...jobData, 
      status: 'Actif'
    };
    
    const newJobId = await addJob(publishedData);
    
    if (newJobId) {
      setSuccessMessage({
        title: 'Offre publiée avec succès !',
        description: `Votre offre "${jobData.title}" a été publiée et est maintenant visible par les candidats.`,
        action: 'Retour à mes offres'
      });
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/my-jobs');
      }, 2000);
    } else {
      alert('Erreur lors de la publication de l\'offre. Veuillez réessayer.');
    }
    
  } catch (error) {
    console.error('Erreur lors de la publication de l\'offre:', error);
    alert('Erreur lors de la publication de l\'offre. Veuillez réessayer.');
  }
};

const handleSaveDraft = async () => {
  try {
    const draftData = { 
      ...jobData, 
      status: 'Brouillon'
    };
    
    const newJobId = await addJob(draftData);
    
    if (newJobId) {
      setSuccessMessage({
        title: 'Brouillon sauvegardé !',
        description: `Votre brouillon "${jobData.title || 'Sans titre'}" a été sauvegardé et vous pouvez le modifier à tout moment.`,
        action: 'Retour à mes offres'
      });
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/my-jobs');
      }, 2000);
    } else {
      alert('Erreur lors de la sauvegarde du brouillon. Veuillez réessayer.');
    }
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du brouillon:', error);
    alert('Erreur lors de la sauvegarde du brouillon. Veuillez réessayer.');
  }
};
  

  if (showSuccess) {
    return (
      <div className="success-page">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>{successMessage.title}</h2>
          <p>{successMessage.description}</p>
          <button 
            onClick={() => navigate('/my-jobs')}
            className="btn-primary"
          >
            {successMessage.action}
          </button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Informations de base</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Titre du poste *</label>
                <input
                  type="text"
                  placeholder="Ex: Développeur React Senior"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Entreprise *</label>
                <input
                  type="text"
                  placeholder="Nom de l'entreprise"
                  value={jobData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Localisation *</label>
                <input
                  type="text"
                  placeholder="Yaoundé, Cameroun"
                  value={jobData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Type de contrat *</label>
                <select
                  value={jobData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Département</label>
                <input
                  type="text"
                  placeholder="Ex: Développement"
                  value={jobData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Taille de l'équipe</label>
                <input
                  type="text"
                  placeholder="Ex: 5-10 personnes"
                  value={jobData.team_size}
                  onChange={(e) => handleInputChange('team_size', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={jobData.remote}
                  onChange={(e) => handleInputChange('remote', e.target.checked)}
                />
                <span className="checkmark"></span>
                Travail à distance possible
              </label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Description du poste</h2>
            <div className="form-group">
              <label>Description détaillée *</label>
              <textarea
                placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                rows="8"
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Niveau d'expérience *</label>
                <select
                  value={jobData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                >
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Formation requise</label>
                <input
                  type="text"
                  placeholder="Ex: Bac+5 en informatique"
                  value={jobData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date de début souhaitée</label>
                <input
                  type="date"
                  value={jobData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date limite de candidature</label>
                <input
                  type="date"
                  value={jobData.application_deadline}
                  onChange={(e) => handleInputChange('application_deadline', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Exigences et compétences</h2>
            <div className="form-group">
              <label>Compétences requises</label>
              <div className="input-with-add">
                <input
                  type="text"
                  placeholder="Ex: React, JavaScript, Node.js"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('skills', newSkill, setNewSkill)}
                />
                <button
                  type="button"
                  onClick={() => addItem('skills', newSkill, setNewSkill)}
                  className="btn-add"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="tags-container">
                {jobData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeItem('skills', index)}
                      className="tag-remove"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Exigences spécifiques</label>
              <div className="input-with-add">
                <input
                  type="text"
                  placeholder="Ex: Maîtrise de l'anglais"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('requirements', newRequirement, setNewRequirement)}
                />
                <button
                  type="button"
                  onClick={() => addItem('requirements', newRequirement, setNewRequirement)}
                  className="btn-add"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="requirements-list">
                {jobData.requirements.map((req, index) => (
                  <div key={index} className="requirement-item">
                    <span>{req}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('requirements', index)}
                      className="remove-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="salary-section">
              <h3>Rémunération</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Salaire minimum</label>
                  <input
                    type="number"
                    placeholder="40000"
                    value={jobData.salary.min}
                    onChange={(e) => handleInputChange('salary.min', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Salaire maximum</label>
                  <input
                    type="number"
                    placeholder="60000"
                    value={jobData.salary.max}
                    onChange={(e) => handleInputChange('salary.max', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Devise</label>
                  <select
                    value={jobData.salary.currency}
                    onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Période</label>
                  <select
                    value={jobData.salary.period}
                    onChange={(e) => handleInputChange('salary.period', e.target.value)}
                  >
                    <option value="year">Annuel</option>
                    <option value="month">Mensuel</option>
                    <option value="day">Journalier</option>
                    <option value="hour">Horaire</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Avantages et questions</h2>
            <div className="form-group">
              <label>Avantages proposés</label>
              <div className="input-with-add">
                <input
                  type="text"
                  placeholder="Ex: Télétravail, tickets restaurant, formation"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('benefits', newBenefit, setNewBenefit)}
                />
                <button
                  type="button"
                  onClick={() => addItem('benefits', newBenefit, setNewBenefit)}
                  className="btn-add"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="benefits-list">
                {jobData.benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <span>{benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('benefits', index)}
                      className="remove-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Questions personnalisées (optionnel)</label>
              <div className="input-with-add">
                <input
                  type="text"
                  placeholder="Ex: Pourquoi voulez-vous rejoindre notre équipe ?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('questions', newQuestion, setNewQuestion)}
                />
                <button
                  type="button"
                  onClick={() => addItem('questions', newQuestion, setNewQuestion)}
                  className="btn-add"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="questions-list">
                {jobData.questions.map((question, index) => (
                  <div key={index} className="question-item">
                    <span>{question}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('questions', index)}
                      className="remove-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Email de contact</label>
              <input
                type="email"
                placeholder="recrutement@entreprise.com"
                value={jobData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>Aperçu et finalisation</h2>
            <div className="job-preview">
              <div className="preview-header">
                <h3>{jobData.title || 'Titre du poste'}</h3>
                <p>{jobData.company || 'Nom de l\'entreprise'} • {jobData.location || 'Localisation'}</p>
                <div className="job-tags">
                  <span className="tag">{jobData.type}</span>
                  {jobData.remote && <span className="tag">Remote</span>}
                  <span className="tag">{jobData.experience}</span>
                </div>
              </div>

              {jobData.description && (
                <div className="preview-section">
                  <h4>Description</h4>
                  <p>{jobData.description}</p>
                </div>
              )}

              {jobData.skills.length > 0 && (
                <div className="preview-section">
                  <h4>Compétences requises</h4>
                  <div className="skills-preview">
                    {jobData.skills.map((skill, index) => (
                      <span key={index} className="skills-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {jobData.requirements.length > 0 && (
                <div className="preview-section">
                  <h4>Exigences</h4>
                  <ul>
                    {jobData.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {jobData.benefits.length > 0 && (
                <div className="preview-section">
                  <h4>Avantages</h4>
                  <ul>
                    {jobData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(jobData.salary.min || jobData.salary.max) && (
                <div className="preview-section">
                  <h4>Rémunération</h4>
                  <p>
                    {jobData.salary.min && `${jobData.salary.min} ${jobData.salary.currency}`}
                    {jobData.salary.min && jobData.salary.max && ' - '}
                    {jobData.salary.max && `${jobData.salary.max} ${jobData.salary.currency}`}
                    {' '}par {jobData.salary.period === 'year' ? 'an' : 
                           jobData.salary.period === 'month' ? 'mois' : 
                           jobData.salary.period === 'day' ? 'jour' : 'heure'}
                  </p>
                </div>
              )}
            </div>

            <div className="publish-options">
              <h4>Options de publication</h4>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                Publier immédiatement
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Envoyer par email aux candidats correspondants
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        .create-job-page {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(40, 106, 193, 0.893) 0%, rgba(18, 118, 175, 0.849) 100%);
          background-attachment: fixed;
          padding: 2rem 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .job-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          margin-bottom: 2rem;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .job-header h1 {
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .job-creation-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .steps-sidebar {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          height: fit-content;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: sticky;
          top: 2rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .step-item.active {
          background: linear-gradient(135deg, rgba(40, 106, 193, 0.893) 0%, rgba(18, 118, 175, 0.849) 100%);
          color: white;
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .step-item.completed {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          transform: scale(0.98);
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(102, 126, 234, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .step-item.active .step-number {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .step-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
          opacity: 0.8;
        }

        .step-info p {
          font-size: 1rem;
          font-weight: 500;
          margin: 0.25rem 0 0 0;
        }

        .job-form {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .form-container {
          padding: 3rem;
          min-height: 500px;
        }

        .step-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          position: relative;
          padding-bottom: 1rem;
        }

        .step-content h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          font-weight: 500;
          color: #4a5568;
          padding: 0.5rem 0;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #cbd5e0;
          border-radius: 6px;
          position: relative;
          transition: all 0.3s ease;
          background: white;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: #667eea;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .input-with-add {
          display: flex;
          gap: 0.5rem;
          align-items: stretch;
        }

        .input-with-add input {
          flex: 1;
        }

        .btn-add {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tag {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tag-remove {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.2s ease;
        }

        .tag-remove:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .requirements-list,
        .benefits-list,
        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .requirement-item,
        .benefit-item,
        .question-item {
          background: rgba(102, 126, 234, 0.05);
          border: 1px solid rgba(102, 126, 234, 0.1);
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .requirement-item:hover,
        .benefit-item:hover,
        .question-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
        }

        .remove-btn {
          background: #fed7d7;
          color: #e53e3e;
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #feb2b2;
          transform: scale(1.05);
        }

        .salary-section {
          background: rgba(102, 126, 234, 0.05);
          border-radius: 16px;
          padding: 2rem;
          margin-top: 2rem;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .salary-section h3 {
          color: #667eea;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .job-preview {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .preview-header h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .preview-header p {
          color: #718096;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .job-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .preview-section {
          margin-bottom: 2rem;
        }

        .preview-section h4 {
          color: #4a5568;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .skills-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skills-tag {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 16px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .publish-options {
          background: rgba(102, 126, 234, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .publish-options h4 {
          color: #667eea;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .form-navigation {
          background: rgba(51, 114, 176, 0.947);
          padding: 2rem 3rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .final-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #4a5568;
          border: 2px solid #e2e8f0;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: #cbd5e0;
          transform: translateY(-2px);
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .success-page {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(40, 106, 193, 0.893) 0%, rgba(18, 118, 175, 0.849) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .success-content {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
        }

        .success-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .success-content h2 {
          margin: 0 0 1rem 0;
          color: #1e293b;
          font-size: 1.5rem;
        }

        .success-content p {
          margin: 0 0 2rem 0;
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .job-creation-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .steps-sidebar {
            order: 2;
            position: static;
          }
          
          .steps-list {
            flex-direction: row;
            overflow-x: auto;
            gap: 1rem;
          }
          
          .step-item {
            min-width: 200px;
          }
        }

        @media (max-width: 768px) {
          .create-job-page {
            padding: 1rem 0;
          }
          
          .job-header,
          .job-creation-container {
            padding: 0 1rem;
          }
          
          .form-container,
          .form-navigation {
            padding: 2rem 1.5rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .job-header h1 {
            font-size: 2rem;
          }
          
          .final-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      
/* Effets de survol globaux */
.create-job-page * {
  scroll-behavior: smooth;
}

/* Micro-animations */
.form-group input:not(:placeholder-shown) {
  border-color: #667eea;
}

.form-group input:valid {
  border-color: #48bb78;
}

.form-group input:invalid:not(:placeholder-shown) {
  border-color: #e53e3e;
}

/* Effet de focus amélioré */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  animation: focusGlow 0.3s ease;
}

@keyframes focusGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.3);
  }
  100% {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
}
      `}</style>

      <div className="create-job-page">
        <div className="job-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Retour
          </button>
          <h1>Créer une offre d'emploi</h1>
        </div>

        <div className="job-creation-container">
          <div className="steps-sidebar">
            <div className="steps-list">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                >
                  <div className="step-number">
                    <step.icon size={20} />
                  </div>
                  <div className="step-info">
                    <h4>Étape {step.id}</h4>
                    <p>{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="job-form">
            <div className="form-container">
              {renderStepContent()}
            </div>

            <div className="form-navigation">
              <div className="nav-buttons">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-secondary"
                >
                  Précédent
                </button>
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Suivant
                  </button>
                ) : (
                  <div className="final-actions">
                    {/* <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleSaveDraft}
                    >
                      <Save size={16} />
                      Sauvegarder brouillon
                    </button> */}
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handlePublish}
                    >
                      Publier l'offre
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJobPage;










// import React, { useState } from 'react';
// import { 
//   ArrowLeft, 
//   Building, 
//   FileText, 
//   Target, 
//   Award, 
//   Settings, 
//   Plus, 
//   X, 
//   Save 
// } from 'lucide-react';
// import { useJobs } from '../contexts/JobsContext';

// const CreateJobPage = ({ onClose }) => {
//   const { addJob } = useJobs();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [jobData, setJobData] = useState({
//     title: '',
//     company: '',
//     location: '',
//     type: 'CDI',
//     remote: false,
//     salary: {
//       min: '',
//       max: '',
//       currency: 'EUR',
//       period: 'year'
//     },
//     experience: 'intermediate',
//     education: '',
//     description: '',
//     requirements: [],
//     benefits: [],
//     skills: [],
//     department: '',
//     team_size: '',
//     start_date: '',
//     application_deadline: '',
//     contact_email: '',
//     questions: []
//   });

//   const [newRequirement, setNewRequirement] = useState('');
//   const [newBenefit, setNewBenefit] = useState('');
//   const [newSkill, setNewSkill] = useState('');
//   const [newQuestion, setNewQuestion] = useState('');

//   const steps = [
//     { id: 1, title: 'Informations de base', icon: Building },
//     { id: 2, title: 'Description du poste', icon: FileText },
//     { id: 3, title: 'Exigences', icon: Target },
//     { id: 4, title: 'Avantages', icon: Award },
//     { id: 5, title: 'Finalisation', icon: Settings }
//   ];

//   const jobTypes = [
//     { value: 'CDI', label: 'CDI' },
//     { value: 'CDD', label: 'CDD' },
//     { value: 'Freelance', label: 'Freelance' },
//     { value: 'Stage', label: 'Stage' },
//     { value: 'Alternance', label: 'Alternance' }
//   ];

//   const experienceLevels = [
//     { value: 'junior', label: 'Débutant (0-2 ans)' },
//     { value: 'intermediate', label: 'Intermédiaire (2-5 ans)' },
//     { value: 'senior', label: 'Senior (5+ ans)' },
//     { value: 'lead', label: 'Lead/Manager' }
//   ];

//   const handleInputChange = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setJobData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setJobData(prev => ({ ...prev, [field]: value }));
//     }
//   };

//   const addItem = (type, value, setter) => {
//     if (value.trim()) {
//       setJobData(prev => ({
//         ...prev,
//         [type]: [...prev[type], value.trim()]
//       }));
//       setter('');
//     }
//   };

//   const removeItem = (type, index) => {
//     setJobData(prev => ({
//       ...prev,
//       [type]: prev[type].filter((_, i) => i !== index)
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = () => {
//     try {
//       // Ajouter la nouvelle offre via le contexte
//       const newJobId = addJob(jobData);
      
//       // Afficher un message de succès
//       setShowSuccess(true);
      
//       // Rediriger vers la liste des offres après un délai
//       setTimeout(() => {
//         console.log(`Offre créée avec l'ID: ${newJobId}`);
//         if (onClose) onClose();
//       }, 2000);
      
//     } catch (error) {
//       console.error('Erreur lors de la création de l\'offre:', error);
//     }
//   };

//   if (showSuccess) {
//     return (
//       <div className="success-page">
//         <div className="success-content">
//           <div className="success-icon">✅</div>
//           <h2>Offre créée avec succès !</h2>
//           <p>Votre offre "{jobData.title}" a été publiée et est maintenant visible.</p>
//           <button 
//             onClick={() => onClose && onClose()}
//             className="btn-primary"
//           >
//             Retour à mes offres
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="step-content">
//             <h2>Informations de base</h2>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Titre du poste *</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: Développeur React Senior"
//                   value={jobData.title}
//                   onChange={(e) => handleInputChange('title', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Entreprise *</label>
//                 <input
//                   type="text"
//                   placeholder="Nom de l'entreprise"
//                   value={jobData.company}
//                   onChange={(e) => handleInputChange('company', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Localisation *</label>
//                 <input
//                   type="text"
//                   placeholder="Paris, France"
//                   value={jobData.location}
//                   onChange={(e) => handleInputChange('location', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Type de contrat *</label>
//                 <select
//                   value={jobData.type}
//                   onChange={(e) => handleInputChange('type', e.target.value)}
//                 >
//                   {jobTypes.map(type => (
//                     <option key={type.value} value={type.value}>
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Département</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: Développement"
//                   value={jobData.department}
//                   onChange={(e) => handleInputChange('department', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Taille de l'équipe</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: 5-10 personnes"
//                   value={jobData.team_size}
//                   onChange={(e) => handleInputChange('team_size', e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   checked={jobData.remote}
//                   onChange={(e) => handleInputChange('remote', e.target.checked)}
//                 />
//                 <span className="checkmark"></span>
//                 Travail à distance possible
//               </label>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="step-content">
//             <h2>Description du poste</h2>
//             <div className="form-group">
//               <label>Description détaillée *</label>
//               <textarea
//                 placeholder="Décrivez le poste, les missions, l'environnement de travail..."
//                 rows="8"
//                 value={jobData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//               />
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Niveau d'expérience *</label>
//                 <select
//                   value={jobData.experience}
//                   onChange={(e) => handleInputChange('experience', e.target.value)}
//                 >
//                   {experienceLevels.map(level => (
//                     <option key={level.value} value={level.value}>
//                       {level.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Formation requise</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: Bac+5 en informatique"
//                   value={jobData.education}
//                   onChange={(e) => handleInputChange('education', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date de début souhaitée</label>
//                 <input
//                   type="date"
//                   value={jobData.start_date}
//                   onChange={(e) => handleInputChange('start_date', e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date limite de candidature</label>
//                 <input
//                   type="date"
//                   value={jobData.application_deadline}
//                   onChange={(e) => handleInputChange('application_deadline', e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="step-content">
//             <h2>Exigences et compétences</h2>
//             <div className="form-group">
//               <label>Compétences requises</label>
//               <div className="input-with-add">
//                 <input
//                   type="text"
//                   placeholder="Ex: React, JavaScript, Node.js"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addItem('skills', newSkill, setNewSkill)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => addItem('skills', newSkill, setNewSkill)}
//                   className="btn-add"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//               <div className="tags-container">
//                 {jobData.skills.map((skill, index) => (
//                   <span key={index} className="tag">
//                     {skill}
//                     <button
//                       type="button"
//                       onClick={() => removeItem('skills', index)}
//                       className="tag-remove"
//                     >
//                       <X size={12} />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Exigences spécifiques</label>
//               <div className="input-with-add">
//                 <input
//                   type="text"
//                   placeholder="Ex: Maîtrise de l'anglais"
//                   value={newRequirement}
//                   onChange={(e) => setNewRequirement(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addItem('requirements', newRequirement, setNewRequirement)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => addItem('requirements', newRequirement, setNewRequirement)}
//                   className="btn-add"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//               <div className="requirements-list">
//                 {jobData.requirements.map((req, index) => (
//                   <div key={index} className="requirement-item">
//                     <span>{req}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeItem('requirements', index)}
//                       className="remove-btn"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="salary-section">
//               <h3>Rémunération</h3>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Salaire minimum</label>
//                   <input
//                     type="number"
//                     placeholder="40000"
//                     value={jobData.salary.min}
//                     onChange={(e) => handleInputChange('salary.min', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Salaire maximum</label>
//                   <input
//                     type="number"
//                     placeholder="60000"
//                     value={jobData.salary.max}
//                     onChange={(e) => handleInputChange('salary.max', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Devise</label>
//                   <select
//                     value={jobData.salary.currency}
//                     onChange={(e) => handleInputChange('salary.currency', e.target.value)}
//                   >
//                       <option value="GBP">$</option>
//                     <option value="GBP">FCFA</option>
//                     <option value="EUR">EUR</option>
//                     <option value="USD">USD</option>
//                     <option value="GBP">GBP</option>
                  
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Période</label>
//                   <select
//                     value={jobData.salary.period}
//                     onChange={(e) => handleInputChange('salary.period', e.target.value)}
//                   >
//                     <option value="year">Annuel</option>
//                     <option value="month">Mensuel</option>
//                     <option value="day">Journalier</option>
//                     <option value="hour">Horaire</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="step-content">
//             <h2>Avantages et questions</h2>
//             <div className="form-group">
//               <label>Avantages proposés</label>
//               <div className="input-with-add">
//                 <input
//                   type="text"
//                   placeholder="Ex: Télétravail, tickets restaurant, formation"
//                   value={newBenefit}
//                   onChange={(e) => setNewBenefit(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addItem('benefits', newBenefit, setNewBenefit)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => addItem('benefits', newBenefit, setNewBenefit)}
//                   className="btn-add"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//               <div className="benefits-list">
//                 {jobData.benefits.map((benefit, index) => (
//                   <div key={index} className="benefit-item">
//                     <span>{benefit}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeItem('benefits', index)}
//                       className="remove-btn"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Questions personnalisées (optionnel)</label>
//               <div className="input-with-add">
//                 <input
//                   type="text"
//                   placeholder="Ex: Pourquoi voulez-vous rejoindre notre équipe ?"
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addItem('questions', newQuestion, setNewQuestion)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => addItem('questions', newQuestion, setNewQuestion)}
//                   className="btn-add"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//               <div className="questions-list">
//                 {jobData.questions.map((question, index) => (
//                   <div key={index} className="question-item">
//                     <span>{question}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeItem('questions', index)}
//                       className="remove-btn"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Email de contact</label>
//               <input
//                 type="email"
//                 placeholder="recrutement@entreprise.com"
//                 value={jobData.contact_email}
//                 onChange={(e) => handleInputChange('contact_email', e.target.value)}
//               />
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="step-content">
//             <h2>Aperçu et finalisation</h2>
//             <div className="job-preview">
//               <div className="preview-header">
//                 <h3>{jobData.title}</h3>
//                 <p>{jobData.company} • {jobData.location}</p>
//                 <div className="job-tags">
//                   <span className="tag">{jobData.type}</span>
//                   {jobData.remote && <span className="tag">Remote</span>}
//                   <span className="tag">{jobData.experience}</span>
//                 </div>
//               </div>

//               <div className="preview-section">
//                 <h4>Description</h4>
//                 <p>{jobData.description}</p>
//               </div>

//               {jobData.skills.length > 0 && (
//                 <div className="preview-section">
//                   <h4>Compétences requises</h4>
//                   <div className="skills-preview">
//                     {jobData.skills.map((skill, index) => (
//                       <span key={index} className="skills-tag">{skill}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {jobData.requirements.length > 0 && (
//                 <div className="preview-section">
//                   <h4>Exigences</h4>
//                   <ul>
//                     {jobData.requirements.map((req, index) => (
//                       <li key={index}>{req}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {jobData.benefits.length > 0 && (
//                 <div className="preview-section">
//                   <h4>Avantages</h4>
//                   <ul>
//                     {jobData.benefits.map((benefit, index) => (
//                       <li key={index}>{benefit}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {(jobData.salary.min || jobData.salary.max) && (
//                 <div className="preview-section">
//                   <h4>Rémunération</h4>
//                   <p>
//                     {jobData.salary.min && `${jobData.salary.min} ${jobData.salary.currency}`}
//                     {jobData.salary.min && jobData.salary.max && ' - '}
//                     {jobData.salary.max && `${jobData.salary.max} ${jobData.salary.currency}`}
//                     {' '}par {jobData.salary.period === 'year' ? 'an' : 
//                            jobData.salary.period === 'month' ? 'mois' : 
//                            jobData.salary.period === 'day' ? 'jour' : 'heure'}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="publish-options">
//               <h4>Options de publication</h4>
//               <label className="checkbox-label">
//                 <input type="checkbox" defaultChecked />
//                 <span className="checkmark"></span>
//                 Publier immédiatement
//               </label>
//               <label className="checkbox-label">
//                 <input type="checkbox" />
//                 <span className="checkmark"></span>
//                 Envoyer par email aux candidats correspondants
//               </label>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .create-job-page {
//           min-height: 100vh;
//           background-color: #f8fafc;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .job-header {
//           background: #ffffff;
//           border-bottom: 1px solid #e2e8f0;
//           padding: 1.5rem 2rem;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .back-button {
//           color: #64748b;
//           text-decoration: none;
//           font-size: 0.875rem;
//           cursor: pointer;
//           border: none;
//           background: none;
//           padding: 0.5rem;
//           border-radius: 0.375rem;
//           transition: color 0.2s;
//         }

//         .back-button:hover {
//           color: #1e293b;
//         }

//         .job-header h1 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .job-creation-container {
//           display: flex;
//           max-width: 1400px;
//           margin: 0 auto;
//           min-height: calc(100vh - 100px);
//         }

//         .steps-sidebar {
//           width: 300px;
//           background: #ffffff;
//           border-right: 1px solid #e2e8f0;
//           padding: 2rem;
//         }

//         .steps-list {
//           position: sticky;
//           top: 2rem;
//         }

//         .step-item {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 1rem;
//           border-radius: 0.5rem;
//           margin-bottom: 0.5rem;
//           transition: all 0.2s;
//           cursor: pointer;
//         }

//         .step-item.active {
//           background: #eff6ff;
//           border: 1px solid #3b82f6;
//         }

//         .step-item.completed {
//           background: #f0fdf4;
//           color: #166534;
//         }

//         .step-number {
//           width: 2rem;
//           height: 2rem;
//           border-radius: 50%;
//           background: #f1f5f9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #64748b;
//         }

//         .step-item.active .step-number {
//           background: #3b82f6;
//           color: white;
//         }

//         .step-item.completed .step-number {
//           background: #16a34a;
//           color: white;
//         }

//         .step-info h4 {
//           margin: 0 0 0.25rem 0;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .step-info p {
//           margin: 0;
//           font-size: 0.75rem;
//           color: #64748b;
//         }

//         .job-form {
//           flex: 1;
//           background: #ffffff;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-container {
//           flex: 1;
//           padding: 2rem;
//           overflow-y: auto;
//         }

//         .step-content h2 {
//           margin: 0 0 1.5rem 0;
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .form-group {
//           margin-bottom: 1rem;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 0.5rem;
//           font-weight: 500;
//           color: #374151;
//           font-size: 0.875rem;
//         }

//         .form-group input,
//         .form-group select,
//         .form-group textarea {
//           width: 100%;
//           padding: 0.75rem;
//           border: 1px solid #d1d5db;
//           border-radius: 0.5rem;
//           font-size: 0.875rem;
//           transition: border-color 0.2s;
//         }

//         .form-group input:focus,
//         .form-group select:focus,
//         .form-group textarea:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//         }

//         .checkbox-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           cursor: pointer;
//           font-size: 0.875rem;
//         }

//         .checkmark {
//           width: 1rem;
//           height: 1rem;
//           border: 1px solid #d1d5db;
//           border-radius: 0.25rem;
//           position: relative;
//         }

//         .checkbox-label input[type="checkbox"] {
//           display: none;
//         }

//         .checkbox-label input[type="checkbox"]:checked + .checkmark {
//           background: #3b82f6;
//           border-color: #3b82f6;
//         }

//         .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
//           content: '✓';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           color: white;
//           font-size: 0.75rem;
//         }

//         .input-with-add {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .input-with-add input {
//           flex: 1;
//         }

//         .btn-add {
//           padding: 0.75rem;
//           background: #3b82f6;
//           color: white;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .btn-add:hover {
//           background: #2563eb;
//         }

//         .tags-container {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//           margin-top: 0.5rem;
//         }

//         .tag {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           background: #eff6ff;
//           color: #1d4ed8;
//           padding: 0.25rem 0.5rem;
//           border-radius: 0.375rem;
//           font-size: 0.75rem;
//         }

//         .tag-remove {
//           background: none;
//           border: none;
//           color: #1d4ed8;
//           cursor: pointer;
//           padding: 0;
//           border-radius: 50%;
//           width: 1rem;
//           height: 1rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .tag-remove:hover {
//           background: rgba(29, 78, 216, 0.1);
//         }

//         .requirements-list,
//         .benefits-list,
//         .questions-list {
//           margin-top: 0.5rem;
//         }

//         .requirement-item,
//         .benefit-item,
//         .question-item {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0.5rem;
//           background: #f9fafb;
//           border-radius: 0.375rem;
//           margin-bottom: 0.5rem;
//           font-size: 0.875rem;
//         }

//         .remove-btn {
//           background: none;
//           border: none;
//           color: #dc2626;
//           cursor: pointer;
//           padding: 0.25rem;
//           border-radius: 0.25rem;
//           transition: background-color 0.2s;
//         }

//         .remove-btn:hover {
//           background: rgba(220, 38, 38, 0.1);
//         }

//         .salary-section {
//           margin-top: 2rem;
//           padding: 1.5rem;
//           background: #f9fafb;
//           border-radius: 0.5rem;
//         }

//         .salary-section h3 {
//           margin: 0 0 1rem 0;
//           font-size: 1.125rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .job-preview {
//           background: #f9fafb;
//           border-radius: 0.5rem;
//           padding: 1.5rem;
//           margin-bottom: 1.5rem;
//         }

//         .preview-header h3 {
//           margin: 0 0 0.5rem 0;
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .preview-header p {
//           margin: 0 0 1rem 0;
//           color: #64748b;
//         }

//         .job-tags {
//           display: flex;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }

//         .preview-section {
//           margin-bottom: 1.5rem;
//         }

//         .preview-section h4 {
//           margin: 0 0 0.5rem 0;
//           font-size: 1rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .preview-section p {
//           margin: 0;
//           color: #374151;
//           line-height: 1.6;
//         }

//         .preview-section ul {
//           margin: 0;
//           padding-left: 1.5rem;
//           color: #374151;
//         }

//         .skills-preview {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//         }

//         .skills-tag {
//           background: #eff6ff;
//           color: #1d4ed8;
//           padding: 0.25rem 0.5rem;
//           border-radius: 0.375rem;
//           font-size: 0.75rem;
//         }

//         .publish-options {
//           padding: 1.5rem;
//           background: #f0fdf4;
//           border-radius: 0.5rem;
//           border: 1px solid #bbf7d0;
//         }

//         .publish-options h4 {
//           margin: 0 0 1rem 0;
//           font-size: 1rem;
//           font-weight: 600;
//           color: #166534;
//         }

//         .form-navigation {
//           border-top: 1px solid #e2e8f0;
//           padding: 1.5rem 2rem;
//           background: #ffffff;
//         }

//         .nav-buttons {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .btn-primary,
//         .btn-secondary {
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 0.5rem;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .btn-primary {
//           background: #3b82f6;
//           color: white;
//         }

//         .btn-primary:hover {
//           background: #2563eb;
//         }

//         .btn-primary:disabled {
//           background: #9ca3af;
//           cursor: not-allowed;
//         }

//         .btn-secondary {
//           background: #f9fafb;
//           color: #374151;
//           border: 1px solid #d1d5db;
//         }

//         .btn-secondary:hover {
//           background: #f3f4f6;
//         }

//         .btn-secondary:disabled {
//           background: #f9fafb;
//           color: #9ca3af;
//           cursor: not-allowed;
//         }

//         .final-actions {
//           display: flex;
//           gap: 1rem;
//         }

//         .success-page {
//           min-height: 100vh;
//           background-color: #f8fafc;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .success-content {
//           background: white;
//           padding: 3rem;
//           border-radius: 1rem;
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//           text-align: center;
//           max-width: 400px;
//         }

//         .success-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//         }

//         .success-content h2 {
//           margin: 0 0 1rem 0;
//           color: #1e293b;
//           font-size: 1.5rem;
//         }

//         .success-content p {
//           margin: 0 0 2rem 0;
//           color: #64748b;
//           line-height: 1.6;
//         }

//         @media (max-width: 1024px) {
//           .job-creation-container {
//             flex-direction: column;
//           }

//           .steps-sidebar {
//             width: 100%;
//             padding: 1rem;
//           }

//           .steps-list {
//             display: flex;
//             overflow-x: auto;
//             gap: 0.5rem;
//             position: static;
//           }

//           .step-item {
//             min-width: 200px;
//             margin-bottom: 0;
//           }
//         }

//         @media (max-width: 768px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .form-container {
//             padding: 1rem;
//           }

//           .form-navigation {
//             padding: 1rem;
//           }

//           .final-actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>

//       <div className="create-job-page">
//         <div className="job-header">
//           <button className="back-button" onClick={() => onClose && onClose()}>
//             ← Retour
//           </button>
//           <h1>Créer une offre d'emploi</h1>
//         </div>

//         <div className="job-creation-container">
//           <div className="steps-sidebar">
//             <div className="steps-list">
//               {steps.map((step, index) => (
//                 <div
//                   key={step.id}
//                   className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
//                 >
//                   <div className="step-number">
//                     <step.icon size={20} />
//                   </div>
//                   <div className="step-info">
//                     <h4>Étape {step.id}</h4>
//                     <p>{step.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="job-form">
//             <div className="form-container">
//               {renderStepContent()}
//             </div>

//             <div className="form-navigation">
//               <div className="nav-buttons">
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className="btn-secondary"
//                 >
//                   Précédent
//                 </button>
                
//                 {currentStep < steps.length ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="btn-primary"
//                   >
//                     Suivant
//                   </button>
//                 ) : (
//                   <div className="final-actions">
//                     <button
//                       type="button"
//                       className="btn-secondary"
//                       onClick={() => console.log('Sauvegarder brouillon')}
//                     >
//                       <Save size={16} />
//                       Sauvegarder brouillon
//                     </button>
//                     <button
//                       type="button"
//                       className="btn-primary"
//                       onClick={handleSubmit}
//                     >
//                       Publier l'offre
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateJobPage;