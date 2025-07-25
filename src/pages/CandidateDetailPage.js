import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/analysicCandid.css'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  MessageSquare,
  Heart,
  UserCheck,
  UserX,
  Download,
  Eye,
  Clock,
  Target,
  TrendingUp,
  Globe,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react';

const CandidateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Simulation du chargement des données candidat
    const mockCandidate = {
      id: id,
      name: 'Marie Dubois',
      title: 'Senior React Developer',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      avatar: 'https://via.placeholder.com/120x120',
      match: 95,
      status: 'Actif',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-20',
      summary: 'Développeuse React expérimentée avec une solide expertise en JavaScript moderne et une passion pour l\'UI/UX. Spécialisée dans le développement d\'applications web performantes et scalables.',
      experience: [
        {
          id: 1,
          company: 'TechCorp',
          position: 'Senior Frontend Developer',
          duration: '2022 - Présent',
          location: 'Paris',
          description: 'Développement d\'applications React complexes, mentorat d\'équipe, optimisation des performances'
        },
        {
          id: 2,
          company: 'StartupXYZ',
          position: 'React Developer',
          duration: '2020 - 2022',
          location: 'Paris',
          description: 'Création d\'interfaces utilisateur responsive, intégration API, tests unitaires'
        }
      ],
      education: [
        {
          id: 1,
          school: 'École Polytechnique',
          degree: 'Master en Informatique',
          year: '2020',
          location: 'Paris'
        }
      ],
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'GraphQL', level: 70 }
      ],
      languages: [
        { name: 'Français', level: 'Natif' },
        { name: 'Anglais', level: 'Courant' },
        { name: 'Espagnol', level: 'Intermédiaire' }
      ],
      socialLinks: [
        { type: 'linkedin', url: 'https://linkedin.com/in/mariedubois' },
        { type: 'github', url: 'https://github.com/mariedubois' }
      ],
      documents: [
        { id: 1, name: 'CV_Marie_Dubois.pdf', type: 'CV', size: '2.1 MB' },
        { id: 2, name: 'Lettre_motivation.pdf', type: 'Lettre', size: '1.5 MB' },
        { id: 3, name: 'Portfolio.pdf', type: 'Portfolio', size: '5.2 MB' }
      ],
      applications: [
        { id: 1, jobTitle: 'Senior React Developer', date: '2024-01-15', status: 'En cours' },
        { id: 2, jobTitle: 'Frontend Lead', date: '2024-01-10', status: 'Refusé' }
      ]
    };

    setCandidate(mockCandidate);
  }, [id]);

  const handleAction = (action) => {
    switch (action) {
      case 'accept':
        alert('Candidat accepté pour l\'entretien');
        break;
      case 'reject':
        alert('Candidat refusé');
        break;
      case 'message':
        navigate(`/messages?candidate=${id}`);
        break;
      case 'schedule':
        alert('Planifier un entretien');
        break;
      default:
        break;
    }
  };

  const downloadDocument = (doc) => {
    // Simulation du téléchargement
    alert(`Téléchargement de ${doc.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSocialIcon = (type) => {
    switch (type) {
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement du profil candidat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Profil candidat</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => handleAction('message')}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              >
                <UserX className="w-4 h-4 mr-2" />
                Refuser
              </button>
              <button
                onClick={() => handleAction('accept')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                <p className="text-gray-600 mb-2">{candidate.title}</p>
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold text-gray-900">{candidate.match}% match</span>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span className="text-sm">Postulé le {candidate.appliedDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  <span className="text-sm">Dernière activité: {candidate.lastActivity}</span>
                </div>
              </div>

              {candidate.socialLinks && candidate.socialLinks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Liens sociaux</h4>
                  <div className="space-y-2">
                    {candidate.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        {getSocialIcon(link.type)}
                        <span className="ml-2 text-sm">{link.type}</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Documents</h4>
                <div className="space-y-2">
                  {candidate.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => downloadDocument(doc)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Vue d\'ensemble' },
                    { id: 'experience', label: 'Expérience' },
                    { id: 'skills', label: 'Compétences' },
                    { id: 'applications', label: 'Candidatures' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Résumé</h3>
                      <p className="text-gray-600 leading-relaxed">{candidate.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Compétences principales</h3>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 6).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Langues</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {candidate.languages.map((lang, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-900">{lang.name}</span>
                            <span className="text-gray-600 text-sm">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Notes</h3>
                      {!showNotes ? (
                        <button
                          onClick={() => setShowNotes(true)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Ajouter une note
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ajoutez vos notes sur ce candidat..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setShowNotes(false);
                                setNotes('');
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Enregistrer
                            </button>
                            <button
                              onClick={() => setShowNotes(false)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Expérience professionnelle</h3>
                      <div className="space-y-6">
                        {candidate.experience.map((exp) => (
                          <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.location} • {exp.duration}</p>
                              </div>
                              <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                            </div>
                            <p className="text-gray-600 mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Formation</h3>
                      <div className="space-y-4">
                        {candidate.education.map((edu) => (
                          <div key={edu.id} className="border-l-4 border-green-200 pl-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                                <p className="text-green-600 font-medium">{edu.school}</p>
                                <p className="text-sm text-gray-500">{edu.location} • {edu.year}</p>
                              </div>
                              <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Compétences techniques</h3>
                      <div className="space-y-4">
                        {candidate.skills.map((skill, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-24 text-sm font-medium text-gray-900">
                              {skill.name}
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-sm text-gray-600 text-right">
                              {skill.level}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Évaluation globale</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">95%</div>
                          <div className="text-sm text-gray-600">Compatibilité</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-600">8.5/10</div>
                          <div className="text-sm text-gray-600">Score technique</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Historique des candidatures</h3>
                      <div className="space-y-3">
                        {candidate.applications.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{app.jobTitle}</div>
                              <div className="text-sm text-gray-600">Postulé le {app.date}</div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                Voir détails
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleAction('schedule')}
                          className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                          <span>Planifier entretien</span>
                        </button>
                        <button
                          onClick={() => handleAction('message')}
                          className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                          <span>Envoyer message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../styles/pages/analysicCandid.css'
// import { 
//   ArrowLeft, 
//   Star, 
//   MapPin, 
//   Mail, 
//   Phone, 
//   Calendar,
//   Briefcase,
//   GraduationCap,
//   Award,
//   FileText,
//   MessageSquare,
//   Heart,
//   UserCheck,
//   UserX,
//   Download,
//   Eye,
//   Clock,
//   Target,
//   TrendingUp,
//   Globe,
//   Linkedin,
//   Github,
//   ExternalLink
// } from 'lucide-react';

// const CandidateDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showNotes, setShowNotes] = useState(false);
//   const [notes, setNotes] = useState('');

//   useEffect(() => {
//     // Simulation du chargement des données candidat
//     const mockCandidate = {
//       id: id,
//       name: 'Marie Dubois',
//       title: 'Senior React Developer',
//       email: 'marie.dubois@email.com',
//       phone: '+33 6 12 34 56 78',
//       location: 'Paris, France',
//       avatar: 'https://via.placeholder.com/120x120',
//       match: 95,
//       status: 'Actif',
//       appliedDate: '2024-01-15',
//       lastActivity: '2024-01-20',
//       summary: 'Développeuse React expérimentée avec une solide expertise en JavaScript moderne et une passion pour l\'UI/UX. Spécialisée dans le développement d\'applications web performantes et scalables.',
//       experience: [
//         {
//           id: 1,
//           company: 'TechCorp',
//           position: 'Senior Frontend Developer',
//           duration: '2022 - Présent',
//           location: 'Paris',
//           description: 'Développement d\'applications React complexes, mentorat d\'équipe, optimisation des performances'
//         },
//         {
//           id: 2,
//           company: 'StartupXYZ',
//           position: 'React Developer',
//           duration: '2020 - 2022',
//           location: 'Paris',
//           description: 'Création d\'interfaces utilisateur responsive, intégration API, tests unitaires'
//         }
//       ],
//       education: [
//         {
//           id: 1,
//           school: 'École Polytechnique',
//           degree: 'Master en Informatique',
//           year: '2020',
//           location: 'Paris'
//         }
//       ],
//       skills: [
//         { name: 'React', level: 95 },
//         { name: 'JavaScript', level: 90 },
//         { name: 'Node.js', level: 85 },
//         { name: 'TypeScript', level: 80 },
//         { name: 'MongoDB', level: 75 },
//         { name: 'GraphQL', level: 70 }
//       ],
//       languages: [
//         { name: 'Français', level: 'Natif' },
//         { name: 'Anglais', level: 'Courant' },
//         { name: 'Espagnol', level: 'Intermédiaire' }
//       ],
//       socialLinks: [
//         { type: 'linkedin', url: 'https://linkedin.com/in/mariedubois' },
//         { type: 'github', url: 'https://github.com/mariedubois' }
//       ],
//       documents: [
//         { id: 1, name: 'CV_Marie_Dubois.pdf', type: 'CV', size: '2.1 MB' },
//         { id: 2, name: 'Lettre_motivation.pdf', type: 'Lettre', size: '1.5 MB' },
//         { id: 3, name: 'Portfolio.pdf', type: 'Portfolio', size: '5.2 MB' }
//       ],
//       applications: [
//         { id: 1, jobTitle: 'Senior React Developer', date: '2024-01-15', status: 'En cours' },
//         { id: 2, jobTitle: 'Frontend Lead', date: '2024-01-10', status: 'Refusé' }
//       ]
//     };

//     setCandidate(mockCandidate);
//   }, [id]);

//   const handleAction = (action) => {
//     switch (action) {
//       case 'accept':
//         alert('Candidat accepté pour l\'entretien');
//         break;
//       case 'reject':
//         alert('Candidat refusé');
//         break;
//       case 'message':
//         navigate(`/messages?candidate=${id}`);
//         break;
//       case 'schedule':
//         alert('Planifier un entretien');
//         break;
//       default:
//         break;
//     }
//   };

//   const downloadDocument = (doc) => {
//     // Simulation du téléchargement
//     alert(`Téléchargement de ${doc.name}`);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Actif': return 'status-active';
//       case 'En cours': return 'status-pending';
//       case 'Refusé': return 'status-rejected';
//       default: return 'status-default';
//     }
//   };

//   const getSocialIcon = (type) => {
//     switch (type) {
//       case 'linkedin': return <Linkedin className="social-icon" />;
//       case 'github': return <Github className="social-icon" />;
//       default: return <Globe className="social-icon" />;
//     }
//   };

//   if (!candidate) {
//     return (
//       <div className="loading-container">
//         <div className="loading-content">
//           <div className="loading-spinner"></div>
//           <p className="loading-text">Chargement du profil candidat...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="candidate-detail-page">
//       {/* Header */}
//       <div className="page-header">
//         <div className="header-container">
//           <div className="header-content">
//             <div className="header-left">
//               <button 
//                 onClick={() => navigate(-1)}
//                 className="back-button"
//               >
//                 <ArrowLeft className="back-icon" />
//                 Retour
//               </button>
//               <h1 className="page-title">Profil candidat</h1>
//             </div>
//             <div className="header-actions">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={`like-button ${isLiked ? 'liked' : ''}`}
//               >
//                 <Heart className={`heart-icon ${isLiked ? 'filled' : ''}`} />
//               </button>
//               <button
//                 onClick={() => handleAction('message')}
//                 className="action-button secondary"
//               >
//                 <MessageSquare className="button-icon" />
//                 Message
//               </button>
//               <button
//                 onClick={() => handleAction('reject')}
//                 className="action-button reject"
//               >
//                 <UserX className="button-icon" />
//                 Refuser
//               </button>
//               <button
//                 onClick={() => handleAction('accept')}
//                 className="action-button accept"
//               >
//                 <UserCheck className="button-icon" />
//                 Accepter
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="main-container">
//         <div className="content-grid">
//           {/* Sidebar */}
//           <div className="sidebar">
//             <div className="sidebar-card">
//               <div className="candidate-profile">
//                 <img 
//                   src={candidate.avatar} 
//                   alt={candidate.name}
//                   className="candidate-avatar"
//                 />
//                 <h2 className="candidate-name">{candidate.name}</h2>
//                 <p className="candidate-title">{candidate.title}</p>
//                 <div className="match-score">
//                   <Star className="star-icon" />
//                   <span className="match-percentage">{candidate.match}% match</span>
//                 </div>
//                 <span className={`candidate-status ${getStatusColor(candidate.status)}`}>
//                   {candidate.status}
//                 </span>
//               </div>

//               <div className="candidate-info">
//                 <div className="info-item">
//                   <Mail className="info-icon" />
//                   <span className="info-text">{candidate.email}</span>
//                 </div>
//                 <div className="info-item">
//                   <Phone className="info-icon" />
//                   <span className="info-text">{candidate.phone}</span>
//                 </div>
//                 <div className="info-item">
//                   <MapPin className="info-icon" />
//                   <span className="info-text">{candidate.location}</span>
//                 </div>
//                 <div className="info-item">
//                   <Calendar className="info-icon" />
//                   <span className="info-text">Postulé le {candidate.appliedDate}</span>
//                 </div>
//                 <div className="info-item">
//                   <Clock className="info-icon" />
//                   <span className="info-text">Dernière activité: {candidate.lastActivity}</span>
//                 </div>
//               </div>

//               {candidate.socialLinks && candidate.socialLinks.length > 0 && (
//                 <div className="social-section">
//                   <h4 className="section-title">Liens sociaux</h4>
//                   <div className="social-links">
//                     {candidate.socialLinks.map((link, index) => (
//                       <a
//                         key={index}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="social-link"
//                       >
//                         {getSocialIcon(link.type)}
//                         <span className="social-text">{link.type}</span>
//                         <ExternalLink className="external-icon" />
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="documents-section">
//                 <h4 className="section-title">Documents</h4>
//                 <div className="documents-list">
//                   {candidate.documents.map((doc) => (
//                     <div key={doc.id} className="document-item">
//                       <div className="document-info">
//                         <FileText className="document-icon" />
//                         <div className="document-details">
//                           <div className="document-name">{doc.name}</div>
//                           <div className="document-size">{doc.size}</div>
//                         </div>
//                       </div>
//                       <div className="document-actions">
//                         <button
//                           onClick={() => downloadDocument(doc)}
//                           className="document-action"
//                         >
//                           <Download className="action-icon" />
//                         </button>
//                         <button className="document-action">
//                           <Eye className="action-icon" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="main-content">
//             {/* Tabs */}
//             <div className="tabs-container">
//               <div className="tabs-header">
//                 <nav className="tabs-nav">
//                   {[
//                     { id: 'overview', label: 'Vue d\'ensemble' },
//                     { id: 'experience', label: 'Expérience' },
//                     { id: 'skills', label: 'Compétences' },
//                     { id: 'applications', label: 'Candidatures' }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
//                     >
//                       {tab.label}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               <div className="tab-content">
//                 {activeTab === 'overview' && (
//                   <div className="overview-content">
//                     <div className="content-section">
//                       <h3 className="content-title">Résumé</h3>
//                       <p className="summary-text">{candidate.summary}</p>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Compétences principales</h3>
//                       <div className="skills-tags">
//                         {candidate.skills.slice(0, 6).map((skill, index) => (
//                           <span key={index} className="skill-tag">
//                             {skill.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Langues</h3>
//                       <div className="languages-grid">
//                         {candidate.languages.map((lang, index) => (
//                           <div key={index} className="language-item">
//                             <span className="language-name">{lang.name}</span>
//                             <span className="language-level">{lang.level}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Notes</h3>
//                       {!showNotes ? (
//                         <button
//                           onClick={() => setShowNotes(true)}
//                           className="add-note-button"
//                         >
//                           Ajouter une note
//                         </button>
//                       ) : (
//                         <div className="notes-form">
//                           <textarea
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                             placeholder="Ajoutez vos notes sur ce candidat..."
//                             className="notes-textarea"
//                             rows="4"
//                           />
//                           <div className="notes-actions">
//                             <button
//                               onClick={() => {
//                                 setShowNotes(false);
//                                 setNotes('');
//                               }}
//                               className="save-button"
//                             >
//                               Enregistrer
//                             </button>
//                             <button
//                               onClick={() => setShowNotes(false)}
//                               className="cancel-button"
//                             >
//                               Annuler
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'experience' && (
//                   <div className="experience-content">
//                     <div className="content-section">
//                       <h3 className="content-title">Expérience professionnelle</h3>
//                       <div className="experience-list">
//                         {candidate.experience.map((exp) => (
//                           <div key={exp.id} className="experience-item">
//                             <div className="experience-header">
//                               <div className="experience-info">
//                                 <h4 className="experience-position">{exp.position}</h4>
//                                 <p className="experience-company">{exp.company}</p>
//                                 <p className="experience-meta">{exp.location} • {exp.duration}</p>
//                               </div>
//                               <Briefcase className="experience-icon" />
//                             </div>
//                             <p className="experience-description">{exp.description}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Formation</h3>
//                       <div className="education-list">
//                         {candidate.education.map((edu) => (
//                           <div key={edu.id} className="education-item">
//                             <div className="education-header">
//                               <div className="education-info">
//                                 <h4 className="education-degree">{edu.degree}</h4>
//                                 <p className="education-school">{edu.school}</p>
//                                 <p className="education-meta">{edu.location} • {edu.year}</p>
//                               </div>
//                               <GraduationCap className="education-icon" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'skills' && (
//                   <div className="skills-content">
//                     <div className="content-section">
//                       <h3 className="content-title">Compétences techniques</h3>
//                       <div className="skills-list">
//                         {candidate.skills.map((skill, index) => (
//                           <div key={index} className="skill-item">
//                             <div className="skill-name">{skill.name}</div>
//                             <div className="skill-bar">
//                               <div 
//                                 className="skill-progress"
//                                 style={{ width: `${skill.level}%` }}
//                               ></div>
//                             </div>
//                             <div className="skill-percentage">{skill.level}%</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Évaluation globale</h3>
//                       <div className="evaluation-grid">
//                         <div className="evaluation-item">
//                           <TrendingUp className="evaluation-icon" />
//                           <div className="evaluation-score">95%</div>
//                           <div className="evaluation-label">Compatibilité</div>
//                         </div>
//                         <div className="evaluation-item">
//                           <Target className="evaluation-icon" />
//                           <div className="evaluation-score">8.5/10</div>
//                           <div className="evaluation-label">Score technique</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'applications' && (
//                   <div className="applications-content">
//                     <div className="content-section">
//                       <h3 className="content-title">Historique des candidatures</h3>
//                       <div className="applications-list">
//                         {candidate.applications.map((app) => (
//                           <div key={app.id} className="application-item">
//                             <div className="application-info">
//                               <div className="application-title">{app.jobTitle}</div>
//                               <div className="application-date">Postulé le {app.date}</div>
//                             </div>
//                             <div className="application-actions">
//                               <span className={`application-status ${getStatusColor(app.status)}`}>
//                                 {app.status}
//                               </span>
//                               <button className="view-details-button">
//                                 Voir détails
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="content-section">
//                       <h3 className="content-title">Actions rapides</h3>
//                       <div className="quick-actions">
//                         <button
//                           onClick={() => handleAction('schedule')}
//                           className="quick-action-button"
//                         >
//                           <Calendar className="quick-action-icon" />
//                           <span>Planifier entretien</span>
//                         </button>
//                         <button
//                           onClick={() => handleAction('message')}
//                           className="quick-action-button"
//                         >
//                           <MessageSquare className="quick-action-icon" />
//                           <span>Envoyer message</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateDetailPage;