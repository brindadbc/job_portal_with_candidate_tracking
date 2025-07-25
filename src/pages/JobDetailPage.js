import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Edit, 
  Eye, 
  Share2, 
  Download,
  Filter,
  Star,
  Heart,
  MessageCircle,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  FileText,
  Award,
  Briefcase,
  Building
} from 'lucide-react';
import '../styles/pages/jobDetailPage.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [likedCandidates, setLikedCandidates] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Simulation des données
  useEffect(() => {
    setTimeout(() => {
      setJob({
        id: id,
        title: 'Senior React Developer',
        company: 'TechCorp',
        location: 'Paris, France',
        type: 'CDI',
        salary: '50k - 70k €',
        experience: '3-5 ans',
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        views: 245,
        applications: 67,
        status: 'Actif',
        description: `Nous recherchons un(e) développeur(se) React senior pour rejoindre notre équipe dynamique. 
        Vous travaillerez sur des projets innovants en utilisant les dernières technologies.`,
        requirements: [
          'Minimum 3 ans d\'expérience en React',
          'Maîtrise de JavaScript ES6+',
          'Connaissance de Redux/Context API',
          'Expérience avec les tests unitaires',
          'Autonomie et esprit d\'équipe'
        ],
        benefits: [
          'Télétravail hybride',
          'Mutuelle premium',
          'Formation continue',
          'Tickets restaurant',
          'RTT supplémentaires'
        ],
        skills: ['React', 'JavaScript', 'Redux', 'Node.js', 'Git']
      });

      setApplicants([
        {
          id: 1,
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          phone: '06 12 34 56 78',
          experience: '5 ans',
          match: 95,
          avatar: 'https://via.placeholder.com/50x50',
          status: 'pending',
          appliedDate: '2024-01-20',
          skills: ['React', 'JavaScript', 'Node.js', 'Redux'],
          summary: 'Développeuse React expérimentée avec une solide expérience en développement frontend.'
        },
        {
          id: 2,
          name: 'Jean Martin',
          email: 'jean.martin@email.com',
          phone: '06 98 76 54 32',
          experience: '3 ans',
          match: 87,
          avatar: 'https://via.placeholder.com/50x50',
          status: 'shortlisted',
          appliedDate: '2024-01-18',
          skills: ['React', 'TypeScript', 'Next.js'],
          summary: 'Développeur passionné avec une expertise en React et TypeScript.'
        },
        {
          id: 3,
          name: 'Sophie Laurent',
          email: 'sophie.laurent@email.com',
          phone: '06 55 44 33 22',
          experience: '4 ans',
          match: 91,
          avatar: 'https://via.placeholder.com/50x50',
          status: 'interviewed',
          appliedDate: '2024-01-16',
          skills: ['React', 'Vue.js', 'Node.js', 'MongoDB'],
          summary: 'Développeuse full-stack avec une forte expérience en React.'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'interviewed': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'shortlisted': return 'Présélectionné';
      case 'interviewed': return 'Entretien';
      case 'hired': return 'Recruté';
      case 'rejected': return 'Refusé';
      default: return 'Inconnu';
    }
  };

  const handleLikeCandidate = (candidateId) => {
    setLikedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(candidateId)) {
        newSet.delete(candidateId);
      } else {
        newSet.add(candidateId);
      }
      return newSet;
    });
  };

  const handleStatusChange = (candidateId, newStatus) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === candidateId 
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  const filteredApplicants = applicants.filter(applicant => 
    selectedStatus === 'all' || applicant.status === selectedStatus
  );

  if (loading) {
    return (
      <div className="jobs-detail-page">
        <div className="loadings-spinner">
          <div className="spinners"></div>
          <p>Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="jobs-detail-page">
        <div className="errors-message">
          <h2>Offre non trouvée</h2>
          <p>Cette offre d'emploi n'existe pas ou a été supprimée.</p>
          <button onClick={() => navigate('/my-jobs')} className="btns-primary">
            Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-detail-page">
      <div className="pages-header">
        <button 
          onClick={() => navigate('/my-jobs')} 
          className="backs-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux offres
        </button>
        
        <div className="pages-actions">
          <button className="btns-secondary">
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </button>
          <button className="btns-secondary">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button 
            onClick={() => navigate(`/job/edit/${job.id}`)}
            className="btns-primary"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </button>
        </div>
      </div>

      <div className="jobs-detail-content">
        <div className="jobs-info-section">
          <div className="jobs-header">
            <div className="jobs-title-section">
              <h1 className="jobs-title">{job.title}</h1>
              <div className="jobs-company">
                <Building className="w-4 h-4" />
                {job.company}
              </div>
            </div>
            <div className="jobs-status">
              <span className={`status-badges ${job.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {job.status}
              </span>
            </div>
          </div>

          <div className="jobs-meta">
            <div className="metas-item">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="metas-item">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="metas-item">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
            <div className="metas-item">
              <Clock className="w-4 h-4" />
              <span>{job.experience}</span>
            </div>
            <div className="metas-item">
              <Calendar className="w-4 h-4" />
              <span>Publié le {job.postedDate}</span>
            </div>
          </div>

          <div className="jobs-stats">
            <div className="stats-item">
              <Eye className="w-5 h-5" />
              <span>{job.views} vues</span>
            </div>
            <div className="stats-item">
              <Users className="w-5 h-5" />
              <span>{job.applications} candidatures</span>
            </div>
          </div>

          <div className="jobs-description">
            <h3>Description du poste</h3>
            <p>{job.description}</p>
          </div>

          <div className="jobs-requirements">
            <h3>Exigences</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="job-benefitss">
            <h3>Avantages</h3>
            <ul>
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="job-skillss">
            <h3>Compétences requises</h3>
            <div className="skillss-list">
              {job.skills.map((skill, index) => (
                <span key={index} className="skils-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="applicants-sections">
          <div className="sections-headers">
            <h2>Candidatures ({applicants.length})</h2>
            <div className="filters-controls">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="status-filters"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="shortlisted">Présélectionnés</option>
                <option value="interviewed">Entretien</option>
                <option value="hired">Recrutés</option>
                <option value="rejected">Refusés</option>
              </select>
            </div>
          </div>

          <div className="applicants-lists">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="applicant-cards">
                <div className="applicant-headers">
                  <div className="applicant-avatars">
                    <img src={applicant.avatar} alt={applicant.name} />
                  </div>
                  <div className="applicant-infos">
                    <h4 className="applicant-names">{applicant.name}</h4>
                    <p className="applicant-summarys">{applicant.summary}</p>
                    <div className="applicant-metas">
                      <span className="experiences">
                        <Clock className="w-3 h-3" />
                        {applicant.experience}
                      </span>
                      <span className="matchs-score">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {applicant.match}% match
                      </span>
                      <span className="applieds-date">
                        <Calendar className="w-3 h-3" />
                        Candidature le {applicant.appliedDate}
                      </span>
                    </div>
                  </div>
                  <div className="applicants-actions">
                    <button 
                      className={`btns-icon ${likedCandidates.has(applicant.id) ? 'text-red-500' : 'text-gray-400'}`}
                      onClick={() => handleLikeCandidate(applicant.id)}
                    >
                      <Heart className={`w-4 h-4 ${likedCandidates.has(applicant.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      className="btns-icon"
                      onClick={() => navigate(`/candidate/${applicant.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="applicants-details">
                  <div className="contacts-info">
                    <div className="contacts-item">
                      <Mail className="w-4 h-4" />
                      <span>{applicant.email}</span>
                    </div>
                    <div className="contacts-item">
                      <Phone className="w-4 h-4" />
                      <span>{applicant.phone}</span>
                    </div>
                  </div>

                  <div className="applicants-skills">
                    {applicant.skills.map((skill, index) => (
                      <span key={index} className="skil-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="applicants-footer">
                  <div className="statuss-section">
                    <span className={`statuss-badge ${getStatusColor(applicant.status)}`}>
                      {getStatusText(applicant.status)}
                    </span>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="btns-success"
                      onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Présélectionner
                    </button>
                    <button 
                      className="btns-danger"
                      onClick={() => handleStatusChange(applicant.id, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Refuser
                    </button>
                    <button className="btns-secondary">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;