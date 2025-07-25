import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/profilcc.css';
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
  LogOut
} from 'lucide-react';

const CandidatesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    experience: '',
    skills: [],
    location: '',
    availability: '',
    salary: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('match');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [likedCandidates, setLikedCandidates] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const candidates = [
    {
      id: 1,
      name: 'Marie Dubois',
      position: 'Senior React Developer',
      match: 95,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '5 ans',
      skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'GraphQL'],
      location: 'Paris',
      availability: 'Disponible',
      salary: '55-65k€',
      email: 'marie.dubois@email.com',
      phone: '+33 1 23 45 67 89',
      appliedDate: '2024-01-15',
      status: 'new',
      summary: 'Développeuse React expérimentée avec une forte expertise en JavaScript moderne...'
    },
    {
      id: 2,
      name: 'Jean Martin',
      position: 'UX Designer',
      match: 89,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '3 ans',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design System'],
      location: 'Lyon',
      availability: 'Disponible',
      salary: '40-50k€',
      email: 'jean.martin@email.com',
      phone: '+33 4 56 78 90 12',
      appliedDate: '2024-01-14',
      status: 'reviewed',
      summary: 'Designer UX passionné avec une approche centrée utilisateur...'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      position: 'Product Manager',
      match: 92,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '7 ans',
      skills: ['Agile', 'Scrum', 'Analytics', 'Product Strategy', 'Leadership'],
      location: 'Marseille',
      availability: 'Préavis 2 mois',
      salary: '60-70k€',
      email: 'sophie.laurent@email.com',
      phone: '+33 6 78 90 12 34',
      appliedDate: '2024-01-13',
      status: 'shortlisted',
      summary: 'Product Manager senior avec une excellente expérience en produits B2B...'
    },
    {
      id: 4,
      name: 'Pierre Moreau',
      position: 'DevOps Engineer',
      match: 87,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '4 ans',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      location: 'Remote',
      availability: 'Disponible',
      salary: '50-60k€',
      email: 'pierre.moreau@email.com',
      phone: '+33 7 89 01 23 45',
      appliedDate: '2024-01-12',
      status: 'new',
      summary: 'Ingénieur DevOps spécialisé dans l\'automatisation et le cloud...'
    },
    {
      id: 5,
      name: 'Amélie Rousseau',
      position: 'Data Scientist',
      match: 91,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '6 ans',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
      location: 'Toulouse',
      availability: 'Disponible',
      salary: '55-65k€',
      email: 'amelie.rousseau@email.com',
      phone: '+33 5 67 89 01 23',
      appliedDate: '2024-01-11',
      status: 'interviewed',
      summary: 'Data Scientist expérimentée en machine learning et analyse prédictive...'
    },
    {
      id: 6,
      name: 'Thomas Leroy',
      position: 'Full Stack Developer',
      match: 84,
      avatar: 'https://via.placeholder.com/80x80',
      experience: '3 ans',
      skills: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Git'],
      location: 'Nantes',
      availability: 'Préavis 1 mois',
      salary: '45-55k€',
      email: 'thomas.leroy@email.com',
      phone: '+33 2 34 56 78 90',
      appliedDate: '2024-01-10',
      status: 'reviewed',
      summary: 'Développeur Full Stack polyvalent avec une bonne maîtrise des technologies web...'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'interviewed': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'reviewed': return 'Examiné';
      case 'shortlisted': return 'Présélectionné';
      case 'interviewed': return 'Entretien';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

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

  const handleBulkAction = (action) => {
    console.log(`Action ${action} pour les candidats:`, Array.from(selectedCandidates));
    // Implémenter les actions en lot
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* <div className="logos">
          <div className="logos-icon">JT</div>
          <span className="logos-text">JobTracks</span>
        </div>
      </div> */}
        <div className="logo">
          <div className="logo-icon">JT</div>
          <span className="logo-text">JobTracks</span>
        </div>
      </div>
      
      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-item" onClick={() => handleNavigation('/recruiterDashboard')}>
            <BarChart3 className="w-5 h-5" />
            <span>Tableau de bord</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/company-profile')}>
            <Building className="w-5 h-5" />
            <span>Profil entreprise</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/my-jobs')}>
            <Briefcase className="w-5 h-5" />
            <span>Mes offres</span>
          </div>
          <div className="nav-item active">
            <Users className="w-5 h-5" />
            <span>Candidats</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/messages')}>
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/notifications')}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item" onClick={() => handleNavigation('/settings')}>
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/login')}>
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CandidateCard = ({ candidate }) => (
    <div className="candidates-card group hover:shadow-lg transition-all duration-300">
      <div className="candidates-card-header">
        <div className="candidates-select">
          <input
            type="checkbox"
            checked={selectedCandidates.has(candidate.id)}
            onChange={() => handleCandidateSelect(candidate.id)}
          />
        </div>
        <div className="candidates-avatar">
          <img src={candidate.avatar} alt={candidate.name} />
          <div className={`matchs-scorse ${candidate.match > 90 ? 'high' : candidate.match > 80 ? 'medium' : 'low'}`}>
            {candidate.match}%
          </div>
        </div>
        <div className="candidates-actionss">
          <button 
            className={`btns-icon ${likedCandidates.has(candidate.id) ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => handleLikeCandidate(candidate.id)}
          >
            <Heart className={`w-4 h-4 ${likedCandidates.has(candidate.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="btns-icon"
            onClick={() => navigate(`/candidate/${candidate.id}`)}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="candidates-info">
        <h3 className="candidates-name">{candidate.name}</h3>
        <p className="candidates-position">{candidate.position}</p>
        
        <div className="candidates-meta">
          <span className="metas-item">
            <Clock className="w-3 h-3" />
            {candidate.experience}
          </span>
          <span className="metas-item">
            <MapPin className="w-3 h-3" />
            {candidate.location}
          </span>
        </div>
        
        <div className="candidates-skills">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="skilll-tag">{skill}</span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="skill-tasg more">+{candidate.skills.length - 3}</span>
          )}
        </div>
        
        <div className="candidates-footer">
          <span className={`status-badge ${getStatusColor(candidate.status)}`}>
            {getStatusText(candidate.status)}
          </span>
          <span className="candidates-salary">{candidate.salary}</span>
        </div>
      </div>
      
      <div className="candidates-card-actions">
        <button 
          className="btn-secondarsy-sm"
          onClick={() => navigate(`/messages?candidate=${candidate.id}`)}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Message
        </button>
        <button 
          className="btn-primarsy-sm"
          onClick={() => navigate(`/candidate/${candidate.id}`)}
        >
          Voir profil
        </button>
      </div>
    </div>
  );

  const filteredCandidates = candidates.filter(candidate => {
    return candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
           candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="dashboards">
      <Sidebar />
      
      <div className="main-contents">
        <div className="top-bars">
            <div className="breadcrumbs">
  <span 
    className="breadcrumb-items clickable" 
    onClick={() => navigate('/')}
    style={{ cursor: 'pointer' }}
  >
    Accueil
  </span>
  <span className="breadcrumbs-separator">/</span>
  <span className="breadcrumbs-item active">Candidats</span>
</div>
          
          <div className="tops-actions">
            <div className="searchs-box">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher candidats..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="notifications-btn">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="users-avatar">
              <img src="https://via.placeholder.com/32x32" alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="pages-content">
          <div className="pages-header">
            <div>
              <h1 className="page-titles">Candidats</h1>
              <p className="page-subtitles">Gérez vos candidatures</p>
            </div>
            <div className="headers-actions">
              <button 
                className="btn-secondarsy"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </button>
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>

          <div className="candidatess-toolbar">
            <div className="toolbars-left">
              <div className="results-counts">
                {filteredCandidates.length} candidats trouvés
              </div>
              {selectedCandidates.size > 0 && (
                <div className="bulks-actions">
                  <span className="selecteds-count">
                    {selectedCandidates.size} sélectionnés
                  </span>
                  <button 
                    className="btns-text"
                    onClick={() => handleBulkAction('shortlist')}
                  >
                    Présélectionner
                  </button>
                  <button 
                    className="btns-text"
                    onClick={() => handleBulkAction('reject')}
                  >
                    Rejeter
                  </button>
                </div>
              )}
            </div>
            
            <div className="toolbars-right">
              <div className="sorts-by">
                <label>Trier par:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="match">Match</option>
                  <option value="date">Date de candidature</option>
                  <option value="name">Nom</option>
                  <option value="experience">Expérience</option>
                </select>
              </div>
              
              <div className="views-mode">
                <button 
                  className={`btns-icon ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grids-icon"></div>
                </button>
                <button 
                  className={`btns-icon ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="lists-icon"></div>
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="filters-panels">
              <div className="filters-contents">
                <div className="filter-groups">
                  <label>Expérience</label>
                  <select>
                    <option value="">Toutes</option>
                    <option value="junior">Junior (0-2 ans)</option>
                    <option value="mid">Intermédiaire (3-5 ans)</option>
                    <option value="senior">Senior (6+ ans)</option>
                  </select>
                </div>
                <div className="filters-group">
                  <label>Localisation</label>
                  <select>
                    <option value="">Toutes</option>
                    <option value="paris">Paris</option>
                    <option value="lyon">Lyon</option>
                    <option value="marseille">Marseille</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div className="filters-group">
                  <label>Disponibilité</label>
                  <select>
                    <option value="">Toutes</option>
                    <option value="immediate">Immédiate</option>
                    <option value="1month">1 mois</option>
                    <option value="2months">2 mois</option>
                  </select>
                </div>
              </div>
              <div className="filters-actionss">
                <button className="btns-text">Réinitialiser</button>
                <button className="btns-primary">Appliquer</button>
              </div>
            </div>
          )}

          <div className={`candidates-grids ${viewMode}`}>
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div className="paginations">
            <button className="btns-icon" disabled>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="paginations-info">
              Page 1 sur 3
            </div>
            <button className="btns-icon">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;