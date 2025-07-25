import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/jobCreate.css';
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
  AlertCircle
} from 'lucide-react';
// import '../styles/pages/createJobPage.css';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'CDI',
    remote: false,
    salary: {
      min: '',
      max: '',
      currency: 'EUR',
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
    questions: []
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

  const handleSubmit = () => {
    console.log('Job data:', jobData);
    // Logique de soumission
    navigate('/my-jobs');
  };

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
                  placeholder="Paris, France"
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
                  <Plus className="w-4 h-4" />
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
                      <X className="w-3 h-3" />
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
                  <Plus className="w-4 h-4" />
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
                      <X className="w-4 h-4" />
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
                  <Plus className="w-4 h-4" />
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
                      <X className="w-4 h-4" />
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
                  <Plus className="w-4 h-4" />
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
                      <X className="w-4 h-4" />
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
                <h3>{jobData.title}</h3>
                <p>{jobData.company} • {jobData.location}</p>
                <div className="job-tags">
                  <span className="tag">{jobData.type}</span>
                  {jobData.remote && <span className="tag">Remote</span>}
                  <span className="tag">{jobData.experience}</span>
                </div>
              </div>

              <div className="preview-section">
                <h4>Description</h4>
                <p>{jobData.description}</p>
              </div>

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
                  <step.icon className="w-5 h-5" />
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
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => console.log('Sauvegarder brouillon')}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder brouillon
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSubmit}
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
  );
};

export default CreateJobPage;