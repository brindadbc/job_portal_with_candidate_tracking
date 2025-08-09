import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Clock,
  Building,
  DollarSign,
  Bookmark,
  Eye,
  Send,
  Trash2,
  Heart,
  Star,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  User,
  MessageSquare,
  BarChart3,
  CheckSquare,
  Square,
  MoreVertical,
  ExternalLink,
  Share2
} from 'lucide-react';

const SavedJobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [likedJobs, setLikedJobs] = useState(new Set());
  const [sortBy, setSortBy] = useState('saved_date');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const savedJobs = [
    {
      id: 1,
      title: 'Développeur React Senior',
      company: 'TechCorp',
      logo: 'https://via.placeholder.com/60x60',
      location: 'Paris',
      type: 'CDI',
      salary: '55-65k€',
      experience: '5+ ans',
      description: 'Nous recherchons un développeur React expérimenté pour rejoindre notre équipe...',
      skills: ['React', 'JavaScript', 'Node.js', 'TypeScript'],
      postedDate: '2024-01-20',
      savedDate: '2024-01-21',
      applicants: 25,
      featured: true,
      remote: true,
      category: 'Développement',
      urgency: 'high',
      deadline: '2024-02-15',
      hasApplied: false,
      notes: 'Entreprise très intéressante, salaire attractif'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'DesignLab',
      logo: 'https://via.placeholder.com/60x60',
      location: 'Lyon',
      type: 'CDI',
      salary: '40-50k€',
      experience: '3+ ans',
      description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      postedDate: '2024-01-19',
      savedDate: '2024-01-20',
      applicants: 18,
      featured: false,
      remote: false,
      category: 'Design',
      urgency: 'medium',
      deadline: '2024-02-10',
      hasApplied: true,
      applicationDate: '2024-01-22',
      notes: 'Portfolio à préparer avant candidature'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'StartupXYZ',
      logo: 'https://via.placeholder.com/60x60',
      location: 'Remote',
      type: 'CDI',
      salary: '60-70k€',
      experience: '4+ ans',
      description: 'Nous cherchons un Product Manager passionné pour piloter nos produits...',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
      postedDate: '2024-01-18',
      savedDate: '2024-01-19',
      applicants: 32,
      featured: true,
      remote: true,
      category: 'Product',
      urgency: 'low',
      deadline: '2024-02-20',
      hasApplied: false,
      notes: 'Attendre retour sur autre candidature avant de postuler'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'DataCorp',
      logo: 'https://via.placeholder.com/60x60',
      location: 'Toulouse',
      type: 'CDI',
      salary: '50-60k€',
      experience: '3+ ans',
      description: 'Rejoignez notre équipe data science pour développer des modèles ML...',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      postedDate: '2024-01-17',
      savedDate: '2024-01-18',
      applicants: 22,
      featured: false,
      remote: true,
      category: 'Data',
      urgency: 'high',
      deadline: '2024-02-05',
      hasApplied: false,
      notes: 'Revoir les compétences en ML avant candidature'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      logo: 'https://via.placeholder.com/60x60',
      location: 'Marseille',
      type: 'CDI',
      salary: '55-65k€',
      experience: '4+ ans',
      description: 'Nous recherchons un ingénieur DevOps pour optimiser notre infrastructure...',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
      postedDate: '2024-01-16',
      savedDate: '2024-01-17',
      applicants: 15,
      featured: false,
      remote: true,
      category: 'DevOps',
      urgency: 'medium',
      deadline: '2024-02-12',
      hasApplied: false,
      notes: 'Certificat AWS à mentionner dans la candidature'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return 'Urgent';
      case 'medium': return 'Modéré';
      case 'low': return 'Pas urgent';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleJobSelect = (jobId) => {
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

  const handleSelectAll = () => {
    if (selectedJobs.size === savedJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(savedJobs.map(job => job.id)));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Action ${action} pour les emplois:`, Array.from(selectedJobs));
    // Implement bulk actions
    setSelectedJobs(new Set());
  };

  const handleRemoveFromSaved = (jobId) => {
    console.log(`Retirer l'emploi ${jobId} des sauvegardés`);
    // Implement remove from saved
  };

  const handleLike = (jobId) => {
    setLikedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const filteredJobs = savedJobs.filter(job => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
           job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const Sidebar = () => (
    <div style={{
      width: '280px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        padding: '2rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            JT
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            JobTracks
          </span>
        </div>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <Briefcase style={{ width: '20px', height: '20px' }} />
            <span>Mes candidatures</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <Bookmark style={{ width: '20px', height: '20px' }} />
            <span>Emplois sauvegardés</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <User style={{ width: '20px', height: '20px' }} />
            <span>Mon profil</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <MessageSquare style={{ width: '20px', height: '20px' }} />
            <span>Messages</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <Bell style={{ width: '20px', height: '20px' }} />
            <span>Notifications</span>
          </div>
        </div>
        
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '0.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <Settings style={{ width: '20px', height: '20px' }} />
            <span>Paramètres</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <LogOut style={{ width: '20px', height: '20px' }} />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SavedJobCard = ({ job }) => {
    const daysUntilDeadline = getDaysUntilDeadline(job.deadline);
    const isUrgent = daysUntilDeadline <= 7;

    return (

        
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: job.featured ? '2px solid #3b82f6' : '1px solid #e2e8f0',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.target.style.transform = 'translateY(0)';
      }}>
        {/* Selection checkbox */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 10
        }}>
          <button
            onClick={() => handleJobSelect(job.id)}
            style={{
              padding: '0.25rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: selectedJobs.has(job.id) ? '#3b82f6' : '#9ca3af'
            }}
          >
            {selectedJobs.has(job.id) ? 
              <CheckSquare style={{ width: '20px', height: '20px' }} /> :
              <Square style={{ width: '20px', height: '20px' }} />
            }
          </button>
        </div>
        

        {/* Featured badge */}
        {job.featured && (
          <div style={{
            position: 'absolute',
            top: '-1px',
            right: '1rem',
            background: '#3b82f6',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '0 0 8px 8px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            <Star style={{ width: '12px', height: '12px', marginRight: '0.25rem', display: 'inline' }} />
            Sponsorisé
          </div>
        )}

        {/* Urgency indicator */}
        {isUrgent && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#fef2f2',
            color: '#dc2626',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '500',
            border: '1px solid #fecaca'
          }}>
            🚨 {daysUntilDeadline} jour{daysUntilDeadline !== 1 ? 's' : ''} restant{daysUntilDeadline !== 1 ? 's' : ''}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem',
          marginLeft: '2.5rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <img 
              src={job.logo} 
              alt={job.company}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '0.25rem',
                color: '#1e293b'
              }}>
                {job.title}
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                {job.company}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin style={{ width: '14px', height: '14px' }} />
                  {job.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Briefcase style={{ width: '14px', height: '14px' }} />
                  {job.type}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <DollarSign style={{ width: '14px', height: '14px' }} />
                  {job.salary}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  {job.experience}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleLike(job.id)}
              style={{
                padding: '0.5rem',
                border: 'none',
                background: 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                color: likedJobs.has(job.id) ? '#ef4444' : '#64748b',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart 
                style={{ 
                  width: '18px', 
                  height: '18px',
                  fill: likedJobs.has(job.id) ? 'currentColor' : 'none'
                }} 
              />
            </button>
            <button
              onClick={() => handleRemoveFromSaved(job.id)}
              style={{
                padding: '0.5rem',
                border: 'none',
                background: 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'all 0.2s ease'
              }}
            >
              <Trash2 style={{ width: '18px', height: '18px' }} />
            </button>
            <button style={{
              padding: '0.5rem',
              border: 'none',
              background: 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#64748b'
            }}>
              <MoreVertical style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
        
        <div style={{ marginLeft: '2.5rem' }}>
          <p style={{
            color: '#475569',
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}>
            {job.description}
          </p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {job.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Personal notes */}
          {job.notes && (
            <div style={{
              background: '#fef9c3',
              border: '1px solid #fde047',
              borderRadius: '8px',
              padding: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#92400e',
                marginBottom: '0.25rem'
              }}>
                📝 Mes notes :
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#92400e'
              }}>
                {job.notes}
              </div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar style={{ width: '14px', height: '14px' }} />
                Sauvegardé le {formatDate(job.savedDate)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock style={{ width: '14px', height: '14px' }} />
                Publié le {formatDate(job.postedDate)}
              </span>
              {job.remote && (
                <span style={{
                  background: '#dcfce7',
                  color: '#16a34a',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  Remote OK
                </span>
              )}
              {job.hasApplied && (
                <span style={{
                  background: '#dbeafe',
                  color: '#2563eb',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  ✓ Candidature envoyée
                </span>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                background: `${getUrgencyColor(job.urgency)}20`,
                color: getUrgencyColor(job.urgency),
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {getUrgencyText(job.urgency)}
              </span>
              <span style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                Date limite: {formatDate(job.deadline)}
              </span>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem'
          }}>
            <button style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              background: 'white',
              color: '#475569',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Eye style={{ width: '14px', height: '14px' }} />
              Voir détails
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              background: 'white',
              color: '#475569',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Share2 style={{ width: '14px', height: '14px' }} />
              Partager
            </button>
            {!job.hasApplied ? (
              <button style={{
                padding: '0.5rem 1.5rem',
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Send style={{ width: '14px', height: '14px' }} />
                Postuler maintenant
              </button>
            ) : (
              <button
                disabled
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '1px solid #d1d5db',
                  background: '#f9fafb',
                  color: '#9ca3af',
                  borderRadius: '6px',
                  cursor: 'not-allowed',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ✓ Candidature envoyée
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      
      <div style={{ marginLeft: '280px', flex: 1, minHeight: '100vh' }}>
        {/* Top Bar */}
        <div style={{
          background: 'white',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            <span>Accueil</span>
            <span>/</span>
            <span style={{ color: '#1e293b', fontWeight: '500' }}>Emplois sauvegardés</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{
                position: 'absolute',
                left: '0.75rem',
                width: '16px',
                height: '16px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Rechercher emplois sauvegardés..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  width: '320px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <button style={{
              padding: '0.5rem',
              border: 'none',
              background: 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#64748b'
            }}>
              <Bell style={{ width: '20px', height: '20px' }} />
            </button>
            
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#e2e8f0',
              cursor: 'pointer'
            }} />
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                Emplois sauvegardés
              </h1>
              <p style={{ color: '#64748b' }}>
                Gérez vos {savedJobs.length} emplois sauvegardés
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <CheckSquare style={{ width: '16px', height: '16px' }} />
                Actions groupées
              </button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedJobs.size > 0 && (
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <button
                  onClick={handleSelectAll}
                  style={{
                    padding: '0.25rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#0ea5e9'
                  }}
                >
                  {selectedJobs.size === savedJobs.length ? 
                    <CheckSquare style={{ width: '20px', height: '20px' }} /> :
                    <Square style={{ width: '20px', height: '20px' }} />
                  }
                </button>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#0c4a6e',
                  fontWeight: '500'
                }}>
                  {selectedJobs.size} emploi{selectedJobs.size !== 1 ? 's' : ''} sélectionné{selectedJobs.size !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => handleBulkAction('apply')}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Send style={{ width: '16px', height: '16px' }} />
                  Postuler à tous
                </button>
                <button
                  onClick={() => handleBulkAction('remove')}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ef4444',
                    background: 'white',
                    color: '#ef4444',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                  Supprimer
                </button>
              </div>
            </div>
          )}

          {/* Filters and Sort */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              {filteredJobs.length} emploi{filteredJobs.length !== 1 ? 's' : ''} trouvé{filteredJobs.length !== 1 ? 's' : ''}
              {searchQuery && ` pour "${searchQuery}"`}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Trier par:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}
                >
                  <option value="saved_date">Date de sauvegarde</option>
                  <option value="posted_date">Date de publication</option>
                  <option value="deadline">Date limite</option>
                  <option value="company">Entreprise</option>
                  <option value="salary">Salaire</option>
                  <option value="urgency">Urgence</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#3b82f6'
                }}>
                  {savedJobs.length}
                </div>
                <Bookmark style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                Emplois sauvegardés
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  {savedJobs.filter(job => job.hasApplied).length}
                </div>
                <Send style={{ width: '24px', height: '24px', color: '#10b981' }} />
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                Candidatures envoyées
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#ef4444'
                }}>
                  {savedJobs.filter(job => getDaysUntilDeadline(job.deadline) <= 7).length}
                </div>
                <Clock style={{ width: '24px', height: '24px', color: '#ef4444' }} />
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                Urgents (≤ 7 jours)
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#f59e0b'
                }}>
                  {likedJobs.size}
                </div>
                <Heart style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                Emplois likés
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div style={{ marginBottom: '2rem' }}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <SavedJobCard key={job.id} job={job} />
              ))
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <Bookmark style={{
                  width: '48px',
                  height: '48px',
                  color: '#9ca3af',
                  margin: '0 auto 1rem'
                }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  Aucun emploi sauvegardé trouvé
                </h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                  {searchQuery 
                    ? `Aucun emploi sauvegardé ne correspond à "${searchQuery}"`
                    : 'Vous n\'avez pas encore sauvegardé d\'emplois'
                  }
                </p>
                {!searchQuery && (
                  <button style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Search style={{ width: '16px', height: '16px' }} />
                    Rechercher des emplois
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > 10 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem',
              padding: '1rem'
            }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Précédent
              </button>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      background: page === 1 ? '#3b82f6' : 'white',
                      color: page === 1 ? 'white' : '#374151',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    //   <BarChart3 style={{ width: '20px', height: '20px' }} />
    //         <span>Tableau de bord</span>
    //       </div>
    //       <div style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         gap: '0.75rem',
    //         padding: '0.75rem 1rem',
    //         marginBottom: '0.25rem',
    //         borderRadius: '8px',
    //         cursor: 'pointer',
    //         color: 'rgba(255, 255, 255, 0.8)'
    //       }}>
    //         <Search style={{ width: '20px', height: '20px' }} />
    //         <span>Recherche d'emplois</span>
    //       </div>
    //       <div style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         gap: '0.75rem',
    //         padding: '0.75rem 1rem',
    //         marginBottom: '0.25rem',
    //         borderRadius: '8px',
    //         cursor: 'pointer',
    //         color: 'rgba(255, 255, 255, 0.8)'
    //       }}></div>
  );
};


          
          export default SavedJobsPage;