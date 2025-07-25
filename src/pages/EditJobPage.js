import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/jobEdit.css';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase,
  FileText,
  Users,
  Calendar,
  Building,
  AlertCircle
} from 'lucide-react';
// import '../styles/pages/editJobPage.css';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'CDI',
    salary: '',
    experience: '',
    deadline: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
    status: 'Actif'
  });

  const jobTypes = [
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Stage', label: 'Stage' },
    { value: 'Alternance', label: 'Alternance' }
  ];

  const experienceLevels = [
    { value: 'Débutant', label: 'Débutant (0-1 an)' },
    { value: 'Junior', label: 'Junior (1-3 ans)' },
    { value: 'Intermédiaire', label: 'Intermédiaire (3-5 ans)' },
    { value: 'Senior', label: 'Senior (5+ ans)' },
    { value: 'Expert', label: 'Expert (8+ ans)' }
  ];

  // Chargement des données
  useEffect(() => {
    const loadJobData = async () => {
      try {
        // Simulation du chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setJobData({
          title: 'Senior React Developer',
          company: 'TechCorp',
          location: 'Paris, France',
          type: 'CDI',
          salary: '50000-70000',
          experience: 'Senior',
          deadline: '2024-02-15',
          description: 'Nous recherchons un(e) développeur(se) React senior pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants en utilisant les dernières technologies.',
          requirements: [
            'Minimum 3 ans d\'expérience en React',
            'Maîtrise de JavaScript ES6+',
            'Connaissance de Redux/Context API',
            'Expérience avec les tests unitaires'
          ],
          benefits: [
            'Télétravail hybride',
            'Mutuelle premium',
            'Formation continue',
            'Tickets restaurant'
          ],
          skills: ['React', 'JavaScript', 'Redux', 'Node.js', 'Git'],
          status: 'Actif'
        });
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobData();
  }, [id]);

  const handleInputChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Supprimer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!jobData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!jobData.company.trim()) newErrors.company = 'L\'entreprise est requise';
    if (!jobData.location.trim()) newErrors.location = 'La localisation est requise';
    if (!jobData.description.trim()) newErrors.description = 'La description est requise';
    if (!jobData.deadline) newErrors.deadline = 'La date limite est requise';
    
    // Vérifier que les listes ne sont pas vides
    if (jobData.requirements.filter(req => req.trim()).length === 0) {
      newErrors.requirements = 'Au moins une exigence est requise';
    }
    
    if (jobData.skills.filter(skill => skill.trim()).length === 0) {
      newErrors.skills = 'Au moins une compétence est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Simulation de la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Nettoyer les données
      const cleanedData = {
        ...jobData,
        requirements: jobData.requirements.filter(req => req.trim()),
        benefits: jobData.benefits.filter(benefit => benefit.trim()),
        skills: jobData.skills.filter(skill => skill.trim())
      };

      console.log('Données sauvegardées:', cleanedData);
      navigate(`/job/${id}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-job-page">
      <div className="page-header">
        <button 
          onClick={() => navigate(`/job/${id}`)} 
          className="back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux détails
        </button>
        
        <div className="page-actions">
          <button 
            onClick={() => navigate(`/job/${id}`)}
            className="btn-secondary"
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="edit-job-content">
        <div className="form-section">
          <h2 className="sections-title">
            <Briefcase className="w-5 h-5" />
            Informations générales
          </h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Titre du poste *</label>
              <input
                type="text"
                id="title"
                value={jobData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'error' : ''}
                placeholder="Ex: Développeur React Senior"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company">Entreprise *</label>
              <input
                type="text"
                id="company"
                value={jobData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={errors.company ? 'error' : ''}
                placeholder="Nom de l'entreprise"
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Localisation *</label>
              <input
                type="text"
                id="location"
                value={jobData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={errors.location ? 'error' : ''}
                placeholder="Ex: Paris, France"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Type de contrat</label>
              <select
                id="type"
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
              <label htmlFor="salary">Salaire</label>
              <input
                type="text"
                id="salary"
                value={jobData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="Ex: 50000-70000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Niveau d'expérience</label>
              <select
                id="experience"
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
              <label htmlFor="deadline">Date limite de candidature *</label>
              <input
                type="date"
                id="deadline"
                value={jobData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                className={errors.deadline ? 'error' : ''}
              />
              {errors.deadline && <span className="error-message">{errors.deadline}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                value={jobData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="Actif">Actif</option>
                <option value="Fermé">Fermé</option>
                <option value="Brouillon">Brouillon</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="sections-title">
            <FileText className="w-5 h-5" />
            Description du poste
          </h2>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={jobData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'error' : ''}
              placeholder="Décrivez le poste, les responsabilités et l'environnement de travail..."
              rows="6"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2 className="sections-title">
            <Users className="w-5 h-5" />
            Exigences du poste
          </h2>
          
          <div className="array-field">
            <label>Exigences *</label>
            {jobData.requirements.map((requirement, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  placeholder="Ex: 3 ans d'expérience en React"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('requirements', index)}
                  className="btn-remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="btn-add"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une exigence
            </button>
            {errors.requirements && <span className="error-message">{errors.requirements}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2 className="sections-title">
            <Calendar className="w-5 h-5" />
            Avantages
          </h2>
          
          <div className="array-field">
            <label>Avantages</label>
            {jobData.benefits.map((benefit, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  placeholder="Ex: Télétravail hybride"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('benefits', index)}
                  className="btn-remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="btn-add"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un avantage
            </button>
          </div>
        </div>

        <div className="form-section">
          <h2 className="sections-title">
            <Building className="w-5 h-5" />
            Compétences requises
          </h2>
          
          <div className="array-field">
            <label>Compétences *</label>
            {jobData.skills.map((skill, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                  placeholder="Ex: React"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('skills', index)}
                  className="btn-remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('skills')}
              className="btn-add"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une compétence
            </button>
            {errors.skills && <span className="error-message">{errors.skills}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;