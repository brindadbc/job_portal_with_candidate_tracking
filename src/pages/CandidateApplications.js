// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import applicationService from '../services/applicationService';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit3,
//   Trash2,
//   Plus,
//   Filter,
//   Calendar,
//   MapPin,
//   Clock,
//   DollarSign,
//   Building,
//   ExternalLink,
//   Download,
//   Mail,
//   Phone,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Hourglass,
//   BarChart3,
//   SortAsc,
//   SortDesc,
//   X,
//   Target,
//   RefreshCw,
//   Star,
//   TrendingUp,
//   Users,
//   Send,
//   Archive,
//   BookOpen,
//   Award
// } from 'lucide-react';

// const CandidateApplications = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [downloadingDocument, setDownloadingDocument] = useState(null);
  
//   const [filters, setFilters] = useState({
//     status: 'all',
//     type: 'all',
//     remote: 'all',
//     search: ''
//   });
//   const [sortBy, setSortBy] = useState('appliedDate');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Vérifier s'il y a un message de succès depuis la page de candidature
//   useEffect(() => {
//     if (location.state?.newApplication && location.state?.message) {
//       setSuccessMessage(location.state.message);
//       // Effacer le message après 5 secondes
//       setTimeout(() => {
//         setSuccessMessage('');
//         // Nettoyer l'état de navigation
//         navigate('/Applications', { replace: true, state: {} });
//       }, 5000);
//     }
//   }, [location.state, navigate]);

//   // Charger les candidatures au montage du composant
//   useEffect(() => {
//     loadApplications();
//   }, []);

//   // Filtrer et trier les candidatures quand les filtres ou données changent
//   useEffect(() => {
//     let filtered = [...applications];
  
//     // Filtrage par recherche
//     if (filters.search) {
//       filtered = filtered.filter(app => 
//         app.company.toLowerCase().includes(filters.search.toLowerCase()) ||
//         app.position.toLowerCase().includes(filters.search.toLowerCase()) ||
//         app.location.toLowerCase().includes(filters.search.toLowerCase())
//       );
//     }

//     // Filtrage par statut
//     if (filters.status !== 'all') {
//       filtered = filtered.filter(app => app.status === filters.status);
//     }

//     // Filtrage par type
//     if (filters.type !== 'all') {
//       filtered = filtered.filter(app => app.type === filters.type);
//     }

//     // Filtrage par remote
//     if (filters.remote !== 'all') {
//       const isRemote = filters.remote === 'true';
//       filtered = filtered.filter(app => app.remote === isRemote);
//     }

//     // Tri
//     filtered.sort((a, b) => {
//       let aValue = a[sortBy];
//       let bValue = b[sortBy];
      
//       if (sortBy === 'appliedDate' || sortBy === 'lastUpdate') {
//         aValue = new Date(aValue);
//         bValue = new Date(bValue);
//       }
      
//       if (sortOrder === 'asc') {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     setFilteredApplications(filtered);
//   }, [applications, filters, sortBy, sortOrder])

// const loadApplications = async () => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     const filters = {
//       sortBy,
//       order: sortOrder
//     };

//     console.log('🔍 Chargement candidatures avec filtres:', filters);
    
//     // Appel API
//     const data = await applicationService.getCandidateApplications(filters);
    
//     console.log('📥 Données brutes reçues:', {
//       total: data?.total,
//       applicationsCount: data?.applications?.length,
//       pagination: data?.pagination,
//       firstApplication: data?.applications?.[0]
//     });
    
//     if (data && data.applications) {
//       // Transformer les données avec une logique robuste
//       const transformedApplications = data.applications.map((app, index) => {
//         console.log(`🔄 Transformation candidature ${index + 1}:`, {
//           appId: app._id || app.id,
//           jobInfo: !!app.jobInfo,
//           jobId: app.jobId,
//           status: app.status,
//           candidateInfo: !!app.candidateInfo
//         });

//         // Gestion robuste des informations de job - VERSION AMÉLIORÉE
//         const jobInfo = app.jobInfo || app.job || {};
//         const jobTitle = jobInfo.title || app.jobTitle || app.title || 'Poste non spécifié';
//         const jobCompany = jobInfo.company || app.company || jobInfo.companyName || 'Entreprise non spécifiée';
//         const jobLocation = jobInfo.location || app.location || 'Localisation non spécifiée';
//         const jobType = jobInfo.type || app.type || jobInfo.contractType || 'Non spécifié';
//         const jobRemote = jobInfo.remote || app.remote || false;

//         // Gestion du salaire améliorée
//         let formattedSalary = 'Non spécifié';
//         const salaryInfo = jobInfo.salary || app.salary;
//         if (salaryInfo) {
//           if (typeof salaryInfo === 'object') {
//             if (salaryInfo.min && salaryInfo.max) {
//               formattedSalary = `${salaryInfo.min} - ${salaryInfo.max} ${salaryInfo.currency || 'FCFA'}`;
//             } else if (salaryInfo.min) {
//               formattedSalary = `À partir de ${salaryInfo.min} ${salaryInfo.currency || 'FCFA'}`;
//             } else if (salaryInfo.max) {
//               formattedSalary = `Jusqu'à ${salaryInfo.max} ${salaryInfo.currency || 'FCFA'}`;
//             }
//           } else {
//             formattedSalary = salaryInfo.toString();
//           }
//         }

//         // Informations supplémentaires de l'offre
//         const jobDescription = jobInfo.description || app.description || 'Description non disponible';
//         const jobRequirements = jobInfo.requirements || jobInfo.skills || app.requirements || [];
//         const jobBenefits = jobInfo.benefits || app.benefits || [];
//         const jobExperience = jobInfo.experience || app.experience || 'Non spécifié';
//         const jobEducation = jobInfo.education || app.education || 'Non spécifié';

//         // Logo de l'entreprise
//         const companyLogo = jobInfo.companyLogo || 
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(jobCompany.charAt(0))}&background=667eea&color=fff`;

//         return {
//           id: app._id || app.id,
//           position: jobTitle,
//           company: jobCompany,
//           companyLogo: companyLogo,
//           location: jobLocation,
//           salary: formattedSalary,
//           type: jobType,
//           remote: jobRemote,
//           status: app.status || 'En cours',
//           appliedDate: new Date(app.createdAt || Date.now()).toLocaleDateString('fr-FR'),
//           lastUpdate: new Date(app.updatedAt || Date.now()).toLocaleDateString('fr-FR'),
//           progress: getProgressFromStatus(app.status),
//           nextStep: getNextStepFromStatus(app.status),
          
//           // Informations complètes de l'offre
//           description: jobDescription,
//           requirements: Array.isArray(jobRequirements) ? jobRequirements : 
//                        typeof jobRequirements === 'string' ? jobRequirements.split(',').map(r => r.trim()) : [],
//           benefits: Array.isArray(jobBenefits) ? jobBenefits :
//                    typeof jobBenefits === 'string' ? jobBenefits.split(',').map(b => b.trim()) : [],
//           experience: jobExperience,
//           education: jobEducation,
          
//           // Informations de contact
//           contactPerson: jobInfo.contactPerson || jobInfo.recruiterName || app.recruiterName || 'Recruteur',
//           contactEmail: jobInfo.contactEmail || jobInfo.recruiterEmail || app.recruiterEmail || 'contact@entreprise.com',
          
//           // Informations de candidature
//           coverLetter: app.coverLetter || '',
//           documents: {
//             cv: app.documents?.cv || app.cv,
//             coverLetterFile: app.documents?.coverLetterFile || app.coverLetterFile,
//             portfolio: app.documents?.portfolio || app.portfolio,
//             // Ajout des chemins complets des fichiers
//             cvPath: app.cvPath || app.documents?.cvPath,
//             coverLetterPath: app.coverLetterPath || app.documents?.coverLetterPath,
//             portfolioPath: app.portfolioPath || app.documents?.portfolioPath
//           },
//           customAnswers: app.customAnswers || [],
//           jobId: app.jobId || jobInfo.id || jobInfo._id,
//           applicationDate: app.createdAt,
//           statusHistory: app.statusHistory || [],
          
//           // Informations supplémentaires du candidat
//           candidateInfo: app.candidateInfo || {},
//           additionalInfo: app.additionalInfo || {}
//         };
//       });

//       console.log('✅ Candidatures transformées:', transformedApplications.length);
      
//       // Log des candidatures par statut pour debug
//       const statusCounts = transformedApplications.reduce((acc, application) => {
//         acc[application.status] = (acc[application.status] || 0) + 1;
//         return acc;
//       }, {});
//       console.log('📊 Répartition par statut:', statusCounts);

//       setApplications(transformedApplications);
      
//     } else {
//       console.log('❌ Aucune donnée de candidature reçue');
//       setApplications([]);
//     }
    
//   } catch (err) {
//     console.error('💥 Erreur lors du chargement des candidatures:', err);
//     console.error('Stack trace:', err.stack);
//     setError(`Impossible de charger les candidatures: ${err.message}`);
//     setApplications([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   // Fonction pour calculer le pourcentage de progression selon le statut
//   const getProgressFromStatus = (status) => {
//     switch (status) {
//       case 'new':
//       case 'En cours': return 20;
//       case 'reviewed':
//       case 'Examiné': return 40;
//       case 'shortlisted':
//       case 'Présélectionné': return 60;
//       case 'interviewed':
//       case 'Entretien': return 80;
//       case 'accepted':
//       case 'Accepté': return 100;
//       case 'rejected':
//       case 'Refusé': return 100;
//       default: return 20;
//     }
//   };

//   // Fonction pour déterminer la prochaine étape selon le statut
//   const getNextStepFromStatus = (status) => {
//     switch (status) {
//       case 'new':
//       case 'En cours': return 'En cours d\'examen par le recruteur';
//       case 'reviewed':
//       case 'Examiné': return 'Attente de décision pour présélection';
//       case 'shortlisted':
//       case 'Présélectionné': return 'Préparation d\'un entretien possible';
//       case 'interviewed':
//       case 'Entretien': return 'Entretien programmé ou en attente de résultat';
//       case 'accepted':
//       case 'Accepté': return 'Félicitations ! Préparez votre intégration';
//       case 'rejected':
//       case 'Refusé': return 'Candidature non retenue cette fois';
//       default: return 'Statut en cours de mise à jour';
//     }
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const getStatusInfo = (status) => {
//     // Normaliser le statut pour gérer les différents formats
//     const normalizedStatus = status.toLowerCase();
    
//     if (normalizedStatus.includes('cours') || status === 'new') {
//       return { 
//         className: 'app-status-pending', 
//         icon: <Hourglass className="w-4 h-4" />,
//         color: '#3b82f6',
//         text: 'En cours'
//       };
//     } else if (normalizedStatus.includes('entretien') || status === 'interviewed') {
//       return { 
//         className: 'app-status-interview', 
//         icon: <MessageSquare className="w-4 h-4" />,
//         color: '#f59e0b',
//         text: 'Entretien'
//       };
//     } else if (normalizedStatus.includes('accepté') || status === 'accepted') {
//       return { 
//         className: 'app-status-accepted', 
//         icon: <CheckCircle className="w-4 h-4" />,
//         color: '#10b981',
//         text: 'Accepté'
//       };
//     } else if (normalizedStatus.includes('refusé') || status === 'rejected') {
//       return { 
//         className: 'app-status-rejected', 
//         icon: <XCircle className="w-4 h-4" />,
//         color: '#ef4444',
//         text: 'Refusé'
//       };
//     } else if (normalizedStatus.includes('attente') || normalizedStatus.includes('reviewed')) {
//       return { 
//         className: 'app-status-waiting', 
//         icon: <AlertCircle className="w-4 h-4" />,
//         color: '#f97316',
//         text: 'En attente'
//       };
//     } else if (normalizedStatus.includes('présélectionné') || status === 'shortlisted') {
//       return { 
//         className: 'app-status-shortlisted', 
//         icon: <Star className="w-4 h-4" />,
//         color: '#8b5cf6',
//         text: 'Présélectionné'
//       };
//     } else {
//       return { 
//         className: 'app-status-default', 
//         icon: <Clock className="w-4 h-4" />,
//         color: '#6b7280',
//         text: status
//       };
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc');
//     }
//   };

//   const openApplicationModal = (application) => {
//     setSelectedApplication(application);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedApplication(null);
//   };

//   const deleteApplication = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
//       try {
//         await applicationService.deleteApplication(id);
//         setApplications(prev => prev.filter(app => app.id !== id));
//         alert('Candidature supprimée avec succès');
//       } catch (error) {
//         console.error('Erreur lors de la suppression:', error);
//         alert('Erreur lors de la suppression de la candidature');
//       }
//     }
//   };

//   const refreshApplications = async () => {
//     await loadApplications();
//   };

//   // Fonction améliorée pour le téléchargement des documents
//   const downloadDocument = async (applicationId, documentType) => {
//     try {
//       setDownloadingDocument(`${applicationId}-${documentType}`);
      
//       console.log('📥 Tentative de téléchargement:', { applicationId, documentType });
      
//       // Trouver l'application pour obtenir les informations du document
//       const application = applications.find(app => app.id === applicationId);
//       if (!application) {
//         throw new Error('Candidature non trouvée');
//       }

//       // Vérifier si le document existe
//       const document = application.documents[documentType];
//       if (!document) {
//         alert('Document non disponible');
//         return;
//       }

//       // Première méthode : Essayer avec le service
//       try {
//         const blob = await applicationService.downloadDocument(applicationId, documentType);
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
        
//         // Déterminer l'extension et le nom du fichier
//         let fileName = `${documentType}`;
//         switch (documentType) {
//           case 'cv':
//             fileName = `CV_${application.company}_${application.position}.pdf`;
//             break;
//           case 'coverLetterFile':
//             fileName = `Lettre_motivation_${application.company}_${application.position}.pdf`;
//             break;
//           case 'portfolio':
//             fileName = `Portfolio_${application.company}_${application.position}.pdf`;
//             break;
//           default:
//             fileName = `${documentType}.pdf`;
//         }
        
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
        
//         console.log('✅ Téléchargement réussi via service');
        
//       } catch (serviceError) {
//         console.log('⚠️ Échec du service, tentative alternative:', serviceError);
        
//         // Deuxième méthode : Téléchargement direct si on a une URL
//         if (typeof document === 'string' && document.startsWith('http')) {
//           const link = document.createElement('a');
//           link.href = document;
//           link.download = `${documentType}.pdf`;
//           link.target = '_blank';
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
          
//           console.log('✅ Téléchargement réussi via URL directe');
          
//         } else {
//           // Troisième méthode : Utiliser le chemin du fichier si disponible
//           const documentPath = application.documents[`${documentType}Path`] || 
//                                application.documents[documentType];
          
//           if (documentPath) {
//             const response = await fetch(`/api/files/${documentPath}`);
//             if (response.ok) {
//               const blob = await response.blob();
//               const url = window.URL.createObjectURL(blob);
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = `${documentType}.pdf`;
//               document.body.appendChild(a);
//               a.click();
//               document.body.removeChild(a);
//               window.URL.revokeObjectURL(url);
              
//               console.log('✅ Téléchargement réussi via chemin fichier');
//             } else {
//               throw new Error('Fichier non accessible');
//             }
//           } else {
//             throw new Error('Aucune méthode de téléchargement disponible');
//           }
//         }
//       }
      
//     } catch (error) {
//       console.error('💥 Erreur lors du téléchargement:', error);
//       alert(`Erreur lors du téléchargement du document: ${error.message}`);
//     } finally {
//       setDownloadingDocument(null);
//     }
//   };

//   // Calculer les statistiques
//   const stats = {
//     total: applications.length,
//     pending: applications.filter(app => ['new', 'En cours', 'reviewed', 'Examiné'].includes(app.status)).length,
//     interviews: applications.filter(app => ['interviewed', 'Entretien', 'shortlisted', 'Présélectionné'].includes(app.status)).length,
//     accepted: applications.filter(app => ['accepted', 'Accepté'].includes(app.status)).length,
//     rejected: applications.filter(app => ['rejected', 'Refusé'].includes(app.status)).length
//   };

//   const Sidebar = () => (
//     <div className="apps-sidebar">
//       <div className="apps-sidebar-header">
//         <div className="apps-logo">
//           <div className="apps-logo-icon">JT</div>
//           <span className="apps-logo-text">JobTracks</span>
//         </div>
//       </div>
      
//       <div className="apps-sidebar-nav">
//         <div className="apps-nav-section">
//           <div className="apps-nav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="apps-nav-item" onClick={() => handleNavigation('/CandidateProfilPage')}>
//             <User className="w-5 h-5" />
//             <span>Mon profil</span>
//           </div>
//           <div className="apps-nav-item apps-nav-active">
//             <Briefcase className="w-5 h-5" />
//             <span>Mes candidatures</span>
//           </div>
//           <div className="apps-nav-item" onClick={() => handleNavigation('/Messages')}>
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//             <span className="apps-nav-badge">3</span>
//           </div>
//           <div className="apps-nav-item" onClick={() => handleNavigation('/c-Notifications')}>
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//           </div>
//         </div>
        
//         <div className="apps-nav-section">
//           <div className="apps-nav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="apps-nav-item" onClick={() => handleNavigation('/')}>
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ApplicationModal = ({ application, onClose }) => {
//     if (!application) return null;
//     const statusInfo = getStatusInfo(application.status);

//     return (
//       <div className="apps-modal-overlay" onClick={onClose}>
//         <div className="apps-modal-content" onClick={e => e.stopPropagation()}>
//           <div className="apps-modal-header">
//             <div className="apps-modal-title-section">
//               <img src={application.companyLogo} alt={application.company} className="apps-company-logo-large" />
//               <div>
//                 <h2 className="apps-modal-title">{application.position}</h2>
//                 <p className="apps-modal-company">{application.company}</p>
//               </div>
//             </div>
//             <button className="apps-modal-close" onClick={onClose}>
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="apps-modal-body">
//             {/* Section informations générales */}
//             <div className="apps-modal-section">
//               <h3 className="apps-section-title">
//                 <Building className="w-5 h-5" />
//                 Informations de l'offre
//               </h3>
//               <div className="apps-info-grid">
//                 <div className="apps-info-item">
//                   <MapPin className="w-4 h-4" />
//                   <span>{application.location}</span>
//                 </div>
//                 <div className="apps-info-item">
//                   <DollarSign className="w-4 h-4" />
//                   <span>{application.salary}</span>
//                 </div>
//                 <div className="apps-info-item">
//                   <Briefcase className="w-4 h-4" />
//                   <span>{application.type}</span>
//                 </div>
//                 <div className="apps-info-item">
//                   <Clock className="w-4 h-4" />
//                   <span>{application.experience}</span>
//                 </div>
//                 {application.education && (
//                   <div className="apps-info-item">
//                     <BookOpen className="w-4 h-4" />
//                     <span>{application.education}</span>
//                   </div>
//                 )}
//                 <div className="apps-info-item">
//                   <Calendar className="w-4 h-4" />
//                   <span>Candidature: {application.appliedDate}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Section statut et progression */}
//             <div className="apps-modal-section">
//               <h3 className="apps-section-title">
//                 <BarChart3 className="w-5 h-5" />
//                 Statut et progression
//               </h3>
//               <div className="apps-status-section">
//                 <div className={`apps-status-badge-large ${statusInfo.className}`}>
//                   {statusInfo.icon}
//                   {statusInfo.text}
//                 </div>
//                 <div className="apps-progress-container">
//                   <div className="apps-progress-bar">
//                     <div 
//                       className="apps-progress-fill" 
//                       style={{ 
//                         width: `${application.progress}%`,
//                         backgroundColor: statusInfo.color
//                       }}
//                     ></div>
//                   </div>
//                   <span className="apps-progress-text">{application.progress}%</span>
//                 </div>
//               </div>
//               <p className="apps-next-step">{application.nextStep}</p>
//             </div>

//             {/* Section description du poste */}
//             <div className="apps-modal-section">
//               <h3 className="apps-section-title">
//                 <FileText className="w-5 h-5" />
//                 Description du poste
//               </h3>
//               <div className="apps-job-description">
//                 {application.description.split('\n').map((paragraph, index) => (
//                   <p key={index}>{paragraph}</p>
//                 ))}
//               </div>
//             </div>

//             {/* Section compétences requises */}
//             {application.requirements.length > 0 && (
//               <div className="apps-modal-section">
//                 <h3 className="apps-section-title">
//                   <Target className="w-5 h-5" />
//                   Compétences requises
//                 </h3>
//                 <div className="apps-requirements-list">
//                   {application.requirements.map((req, index) => (
//                     <span key={index} className="apps-requirement-tag">{req}</span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Section avantages */}
//             {application.benefits.length > 0 && (
//               <div className="apps-modal-section">
//                 <h3 className="apps-section-title">
//                   <Award className="w-5 h-5" />
//                   Avantages proposés
//                 </h3>
//                 <div className="apps-benefits-list">
//                   {application.benefits.map((benefit, index) => (
//                     <div key={index} className="apps-benefit-item">
//                       <CheckCircle className="w-4 h-4 text-green-500" />
//                       <span>{benefit}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Section ma candidature */}
//             {application.coverLetter && (
//               <div className="apps-modal-section">
//                 <h3 className="apps-section-title">
//                   <Mail className="w-5 h-5" />
//                   Ma lettre de motivation
//                 </h3>
//                 <div className="apps-cover-letter">
//                   {application.coverLetter}
//                 </div>
//               </div>
//             )}

//             {/* Section réponses aux questions */}
//             {application.customAnswers && application.customAnswers.length > 0 && (
//               <div className="apps-modal-section">
//                 <h3 className="apps-section-title">
//                   <MessageSquare className="w-5 h-5" />
//                   Mes réponses aux questions spécifiques
//                 </h3>
//                 <div className="apps-custom-answers">
//                   {application.customAnswers.map((answer, index) => (
//                     <div key={index} className="apps-custom-answer">
//                       <h4>{answer.question}</h4>
//                       <p>{answer.answer}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Section documents envoyés - AMÉLIORÉE */}
//             <div className="apps-modal-section">
//               <h3 className="apps-section-title">
//                 <FileText className="w-5 h-5" />
//                 Documents envoyés
//               </h3>
//               <div className="apps-documents-list">
//                 {application.documents?.cv && (
//                   <button 
//                     className={`apps-document-btn ${downloadingDocument === `${application.id}-cv` ? 'downloading' : ''}`}
//                     onClick={() => downloadDocument(application.id, 'cv')}
//                     disabled={downloadingDocument === `${application.id}-cv`}
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>Mon CV</span>
//                     {downloadingDocument === `${application.id}-cv` ? (
//                       <div className="apps-spinner-small"></div>
//                     ) : (
//                       <Download className="w-4 h-4" />
//                     )}
//                   </button>
//                 )}
//                 {application.documents?.coverLetterFile && (
//                   <button 
//                     className={`apps-document-btn ${downloadingDocument === `${application.id}-coverLetterFile` ? 'downloading' : ''}`}
//                     onClick={() => downloadDocument(application.id, 'coverLetterFile')}
//                     disabled={downloadingDocument === `${application.id}-coverLetterFile`}
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>Lettre de motivation (fichier)</span>
//                     {downloadingDocument === `${application.id}-coverLetterFile` ? (
//                       <div className="apps-spinner-small"></div>
//                     ) : (
//                       <Download className="w-4 h-4" />
//                     )}
//                   </button>
//                 )}
//                 {application.documents?.portfolio && (
//                   <button 
//                     className={`apps-document-btn ${downloadingDocument === `${application.id}-portfolio` ? 'downloading' : ''}`}
//                     onClick={() => downloadDocument(application.id, 'portfolio')}
//                     disabled={downloadingDocument === `${application.id}-portfolio`}
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span>Portfolio</span>
//                     {downloadingDocument === `${application.id}-portfolio` ? (
//                       <div className="apps-spinner-small"></div>
//                     ) : (
//                       <Download className="w-4 h-4" />
//                     )}
//                   </button>
//                 )}
//                 {(!application.documents?.cv && !application.documents?.coverLetterFile && !application.documents?.portfolio) && (
//                   <div className="apps-no-documents">
//                     <FileText className="w-8 h-8 opacity-30" />
//                     <span>Aucun document joint à cette candidature</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Section contact recruteur */}
//             <div className="apps-modal-section">
//               <h3 className="apps-section-title">
//                 <User className="w-5 h-5" />
//                 Contact recruteur
//               </h3>
//               <div className="apps-contact-info">
//                 <div className="apps-contact-item">
//                   <User className="w-4 h-4" />
//                   <span>{application.contactPerson}</span>
//                 </div>
//                 <div className="apps-contact-item">
//                   <Mail className="w-4 h-4" />
//                   <a href={`mailto:${application.contactEmail}`}>{application.contactEmail}</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="apps-modal-footer">
//             <button className="apps-btn-secondary" onClick={onClose}>
//               Fermer
//             </button>
//             <button 
//               className="apps-btn-secondary"
//               onClick={() => navigate(`/messages?recruiter=${application.contactEmail}`)}
//             >
//               <MessageSquare className="w-4 h-4 mr-2" />
//               Contacter le recruteur
//             </button>
//             <button 
//               className="apps-btn-primary"
//               onClick={() => navigate(`/job/${application.jobId}`)}
//             >
//               <ExternalLink className="w-4 h-4 mr-2" />
//               Voir l'offre
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // État de chargement
//   if (loading) {
//     return (
//       <div className="apps-dashboard">
//         <Sidebar />
//         <div className="apps-main-content">
//           <div className="apps-loading-container">
//             <div className="apps-spinner"></div>
//             <p>Chargement de vos candidatures...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // État d'erreur
//   if (error) {
//     return (
//       <div className="apps-dashboard">
//         <Sidebar />
//         <div className="apps-main-content">
//           <div className="apps-error-container">
//             <AlertCircle className="apps-error-icon" />
//             <h3>Erreur de chargement</h3>
//             <p>{error}</p>
//             <button onClick={refreshApplications} className="apps-retry-btn">
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Réessayer
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="apps-dashboard">
//       <Sidebar />
      
//       {/* Message de succès */}
//       {successMessage && (
//         <div className="apps-success-message">
//           <CheckCircle className="apps-success-icon" />
//           {successMessage}
//         </div>
//       )}

//       <div className="apps-main-content">
//         {/* Top Bar */}
//         <div className="apps-top-bar">
//           <nav className="apps-breadcrumb">
//             <span className="apps-breadcrumb-item apps-clickable" onClick={() => navigate('/CandidateDashboard')}>
//               Accueil
//             </span>
//             <span className="apps-breadcrumb-separator">/</span>
//             <span className="apps-breadcrumb-item apps-breadcrumb-active">
//               Mes candidatures
//             </span>
//           </nav>
          
//           <div className="apps-top-actions">
//             <div className="apps-search-box">
//               <Search className="w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Rechercher une candidature..."
//                 className="apps-search-input"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//               />
//             </div>
            
//             <button className="apps-notification-btn">
//               <Bell className="w-5 h-5" />
//               <div className="apps-notification-dot"></div>
//             </button>
            
//             <div className="apps-user-avatar">
//               <img src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff" alt="Profile" />
//             </div>
//           </div>
//         </div>

//         <div className="apps-content">
//           {/* En-tête de page */}
//           <div className="apps-page-header">
//             <div className="apps-page-title-section">
//               <h1>Mes candidatures</h1>
//               <p className="apps-page-subtitle">
//                 Suivez l'état d'avancement de vos candidatures et gérez vos postulations
//               </p>
//             </div>
//             <div className="apps-page-actions">
//               <button className="apps-btn-secondary" onClick={refreshApplications}>
//                 <RefreshCw className="w-4 h-4" />
//                 Actualiser
//               </button>
//               <button className="apps-btn-primary" onClick={() => navigate('/jobs')}>
//                 <Plus className="w-4 h-4" />
//                 Nouvelle candidature
//               </button>
//             </div>
//           </div>

//           {/* Statistiques */}
//           <div className="apps-stats-section">
//             <div className="apps-stat-card">
//               <div className="apps-stat-number">{stats.total}</div>
//               <div className="apps-stat-label">Total candidatures</div>
//             </div>
//             <div className="apps-stat-card">
//               <div className="apps-stat-number">{stats.pending}</div>
//               <div className="apps-stat-label">En cours d'examen</div>
//             </div>
//             <div className="apps-stat-card">
//               <div className="apps-stat-number">{stats.interviews}</div>
//               <div className="apps-stat-label">Entretiens / Présélections</div>
//             </div>
//             <div className="apps-stat-card">
//               <div className="apps-stat-number">{stats.accepted}</div>
//               <div className="apps-stat-label">Acceptées</div>
//             </div>
//             <div className="apps-stat-card">
//               <div className="apps-stat-number">{stats.rejected}</div>
//               <div className="apps-stat-label">Refusées</div>
//             </div>
//           </div>

//           {/* Filtres */}
//           <div className="apps-filters-section">
//             <div className="apps-filters-row">
//               <div className="apps-filter-group">
//                 <label className="apps-filter-label">Statut</label>
//                 <select 
//                   className="apps-filter-select"
//                   value={filters.status}
//                   onChange={(e) => handleFilterChange('status', e.target.value)}
//                 >
//                   <option value="all">Tous les statuts</option>
//                   <option value="new">En cours</option>
//                   <option value="reviewed">Examiné</option>
//                   <option value="shortlisted">Présélectionné</option>
//                   <option value="interviewed">Entretien</option>
//                   <option value="accepted">Accepté</option>
//                   <option value="rejected">Refusé</option>
//                 </select>
//               </div>
              
//               <div className="apps-filter-group">
//                 <label className="apps-filter-label">Type de contrat</label>
//                 <select 
//                   className="apps-filter-select"
//                   value={filters.type}
//                   onChange={(e) => handleFilterChange('type', e.target.value)}
//                 >
//                   <option value="all">Tous les types</option>
//                   <option value="CDI">CDI</option>
//                   <option value="CDD">CDD</option>
//                   <option value="Freelance">Freelance</option>
//                   <option value="Stage">Stage</option>
//                   <option value="Temps partiel">Temps partiel</option>
//                 </select>
//               </div>
              
//               <div className="apps-filter-group">
//                 <label className="apps-filter-label">Télétravail</label>
//                 <select 
//                   className="apps-filter-select"
//                   value={filters.remote}
//                   onChange={(e) => handleFilterChange('remote', e.target.value)}
//                 >
//                   <option value="all">Tous</option>
//                   <option value="true">Remote</option>
//                   <option value="false">Présentiel</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="apps-table-section">
//             <div className="apps-table-header">
//               <div className="apps-table-controls">
//                 <span className="apps-results-count">
//                   {filteredApplications.length} candidature(s) trouvée(s)
//                 </span>
//                 <div className="apps-sort-controls">
//                   <button 
//                     className={`apps-sort-btn ${sortBy === 'appliedDate' ? 'apps-sort-active' : ''}`}
//                     onClick={() => handleSort('appliedDate')}
//                   >
//                     Date
//                     {sortBy === 'appliedDate' && (
//                       sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
//                     )}
//                   </button>
//                   <button 
//                     className={`apps-sort-btn ${sortBy === 'company' ? 'apps-sort-active' : ''}`}
//                     onClick={() => handleSort('company')}
//                   >
//                     Entreprise
//                     {sortBy === 'company' && (
//                       sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
//                     )}
//                   </button>
//                   <button 
//                     className={`apps-sort-btn ${sortBy === 'status' ? 'apps-sort-active' : ''}`}
//                     onClick={() => handleSort('status')}
//                   >
//                     Statut
//                     {sortBy === 'status' && (
//                       sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="apps-applications-list">
//               {filteredApplications.map((application) => {
//                 const statusInfo = getStatusInfo(application.status);
//                 return (
//                   <div key={application.id} className="apps-application-card">
//                     <div className="apps-application-main">
//                       <div className="apps-application-left">
//                         <img 
//                           src={application.companyLogo} 
//                           alt={application.company} 
//                           className="apps-company-logo"
//                         />
//                         <div className="apps-application-details">
//                           <h3 className="apps-application-title">{application.position}</h3>
//                           <div className="apps-application-company">{application.company}</div>
//                           <div className="apps-application-meta">
//                             <span className="apps-meta-item">
//                               <MapPin className="w-3 h-3" />
//                               {application.location}
//                             </span>
//                             <span className="apps-meta-item">
//                               <DollarSign className="w-3 h-3" />
//                               {application.salary}
//                             </span>
//                             <span className="apps-meta-item">
//                               <Calendar className="w-3 h-3" />
//                               {application.appliedDate}
//                             </span>
//                             {application.remote && (
//                               <span className="apps-remote-badge">Remote</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="apps-application-right">
//                         <div className="apps-application-status">
//                           <div className={`apps-status-badge ${statusInfo.className}`}>
//                             {statusInfo.icon}
//                             {application.status}
//                           </div>
//                           <div className="apps-progress-mini">
//                             <div 
//                               className="apps-progress-mini-fill" 
//                               style={{ 
//                                 width: `${application.progress}%`,
//                                 backgroundColor: statusInfo.color
//                               }}
//                             ></div>
//                           </div>
//                         </div>
                        
//                         <div className="apps-application-actions">
//                           <button 
//                             className="apps-action-btn"
//                             onClick={() => openApplicationModal(application)}
//                             title="Voir détails"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button 
//                             className="apps-action-btn"
//                             title="Modifier"
//                           >
//                             <Edit3 className="w-4 h-4" />
//                           </button>
//                           <button 
//                             className="apps-action-btn apps-action-danger"
//                             onClick={() => deleteApplication(application.id)}
//                             title="Supprimer"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                           <button className="apps-action-btn">
//                             <MoreHorizontal className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="apps-application-footer">
//                       <div className="apps-next-step">
//                         <strong>Prochaine étape:</strong> {application.nextStep}
//                       </div>
//                       <div className="apps-last-update">
//                         Dernière mise à jour: {application.lastUpdate}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {filteredApplications.length === 0 && (
//               <div className="apps-empty-state">
//                 <Briefcase className="w-12 h-12" />
//                 <h3>Aucune candidature trouvée</h3>
//                 <p>Modifiez vos filtres ou créez une nouvelle candidature</p>
//                 <button className="apps-btn-primary">
//                   <Plus className="w-4 h-4 mr-2" />
//                   Nouvelle candidature
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <ApplicationModal 
//           application={selectedApplication} 
//           onClose={closeModal} 
//         />
//       )}

//         <style>{`
//         .apps-dashboard {
//           display: flex;
//           min-height: 100vh;
//           background-color: #f8fafc;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         /* === SIDEBAR === */
//         .apps-sidebar {
//           width: 280px;
//           background-color: white;
//           border-right: 1px solid #e2e8f0;
//           padding: 1.5rem 0;
//         }

//         .apps-sidebar-header {
//           padding: 0 1.5rem 2rem;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .apps-logo {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .apps-logo-icon {
//           width: 2.5rem;
//           height: 2.5rem;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           border-radius: 0.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: bold;
//           font-size: 1.125rem;
//         }

//         .apps-logo-text {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #1a202c;
//         }

//         .apps-sidebar-nav {
//           padding: 2rem 0;
//         }

//         .apps-nav-section {
//           margin-bottom: 2rem;
//         }

//         .apps-nav-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.75rem 1.5rem;
//           color: #64748b;
//           cursor: pointer;
//           transition: all 0.2s;
//           position: relative;
//         }

//         .apps-nav-item:hover {
//           background-color: #f1f5f9;
//           color: #334155;
//         }

//         .apps-nav-item.apps-nav-active {
//           background-color: #ede9fe;
//           color: #7c3aed;
//           border-right: 3px solid #7c3aed;
//         }

//         .apps-nav-badge {
//           background-color: #ef4444;
//           color: white;
//           font-size: 0.75rem;
//           font-weight: 600;
//           padding: 0.125rem 0.5rem;
//           border-radius: 1rem;
//           margin-left: auto;
//         }

//         /* === CONTENU PRINCIPAL === */
//         .apps-main-content {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .apps-loading-container, .apps-error-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 50vh;
//           flex-direction: column;
//           gap: 1rem;
//           text-align: center;
//         }

//         .apps-spinner {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #3498db;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .apps-spinner-small {
//           width: 16px;
//           height: 16px;
//           border: 2px solid #f3f3f3;
//           border-top: 2px solid #3498db;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .apps-error-icon {
//           width: 48px;
//           height: 48px;
//           color: #ef4444;
//         }

//         .apps-retry-btn {
//           padding: 0.75rem 1.5rem;
//           background-color: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .apps-retry-btn:hover {
//           background-color: #1d4ed8;
//           transform: translateY(-1px);
//         }

//         /* === TOP BAR === */
//         .apps-top-bar {
//           background-color: white;
//           border-bottom: 1px solid #e2e8f0;
//           padding: 1rem 2rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .apps-breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #64748b;
//           font-size: 0.875rem;
//         }

//         .apps-breadcrumb-item {
//           transition: color 0.2s;
//         }

//         .apps-breadcrumb-item.apps-clickable:hover {
//           color: #334155;
//         }

//         .apps-breadcrumb-item.apps-breadcrumb-active {
//           color: #1a202c;
//           font-weight: 500;
//         }

//         .apps-breadcrumb-separator {
//           color: #cbd5e1;
//         }

//         .apps-top-actions {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .apps-search-box {
//           position: relative;
//           display: flex;
//           align-items: center;
//         }

//         .apps-search-box svg {
//           position: absolute;
//           left: 0.75rem;
//           color: #9ca3af;
//           width: 1rem;
//           height: 1rem;
//         }

//         .apps-search-input {
//           padding: 0.5rem 0.75rem 0.5rem 2.5rem;
//           border: 1px solid #d1d5db;
//           border-radius: 0.5rem;
//           width: 300px;
//           font-size: 0.875rem;
//         }

//         .apps-search-input:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//         }

//         .apps-notification-btn {
//           position: relative;
//           background: none;
//           border: none;
//           padding: 0.5rem;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .apps-notification-btn:hover {
//           background-color: #f1f5f9;
//         }

//         .apps-notification-dot {
//           position: absolute;
//           top: 0.25rem;
//           right: 0.25rem;
//           width: 0.5rem;
//           height: 0.5rem;
//           background-color: #ef4444;
//           border-radius: 50%;
//         }

//         .apps-user-avatar img {
//           width: 2rem;
//           height: 2rem;
//           border-radius: 50%;
//           border: 2px solid #e2e8f0;
//         }

//         /* === MESSAGE DE SUCCÈS === */
//         .apps-success-message {
//           background: linear-gradient(135deg, #10b981, #059669);
//           color: white;
//           padding: 1rem 2rem;
//           margin: 0;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           font-weight: 500;
//           animation: slideDown 0.5s ease-out;
//         }

//         @keyframes slideDown {
//           from { transform: translateY(-100%); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }

//         .apps-success-icon {
//           width: 1.25rem;
//           height: 1.25rem;
//         }

//         /* === CONTENU === */
//         .apps-content {
//           flex: 1;
//           padding: 2rem;
//         }

//         .apps-page-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 2rem;
//         }

//         .apps-page-title-section h1 {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1a202c;
//           margin-bottom: 0.5rem;
//         }

//         .apps-page-subtitle {
//           color: #64748b;
//           font-size: 1rem;
//         }

//         .apps-page-actions {
//           display: flex;
//           gap: 1rem;
//         }

//         .apps-btn-secondary {
//           padding: 0.75rem 1.5rem;
//           background-color: white;
//           color: #374151;
//           border: 1px solid #d1d5db;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .apps-btn-secondary:hover {
//           background-color: #f9fafb;
//           border-color: #9ca3af;
//         }

//         .apps-btn-primary {
//           padding: 0.75rem 1.5rem;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .apps-btn-primary:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
//         }

//         /* === FILTRES === */
//         .apps-filters-section {
//           background-color: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.75rem;
//           padding: 1.5rem;
//           margin-bottom: 1.5rem;
//         }

//         .apps-filters-row {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1rem;
//         }

//         .apps-filter-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .apps-filter-label {
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #374151;
//         }

//         .apps-filter-select {
//           padding: 0.5rem 0.75rem;
//           border: 1px solid #d1d5db;
//           border-radius: 0.375rem;
//           background-color: white;
//           font-size: 0.875rem;
//         }

//         .apps-filter-select:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//         }

//         /* === STATISTIQUES === */
//         .apps-stats-section {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }

//         .apps-stat-card {
//           background-color: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.75rem;
//           padding: 1.5rem;
//           text-align: center;
//           transition: all 0.2s;
//         }

//         .apps-stat-card:hover {
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//           border-color: #c7d2fe;
//         }

//         .apps-stat-number {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1a202c;
//           margin-bottom: 0.5rem;
//         }

//         .apps-stat-label {
//           color: #64748b;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         /* === TABLE SECTION === */
//         .apps-table-section {
//           background-color: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.75rem;
//           overflow: hidden;
//         }

//         .apps-table-header {
//           padding: 1rem 1.5rem;
//           border-bottom: 1px solid #e2e8f0;
//           background-color: #f8fafc;
//         }

//         .apps-table-controls {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .apps-results-count {
//           font-size: 0.875rem;
//           color: #64748b;
//           font-weight: 500;
//         }

//         .apps-sort-controls {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .apps-sort-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           padding: 0.5rem 0.75rem;
//           background: none;
//           border: 1px solid #d1d5db;
//           border-radius: 0.375rem;
//           cursor: pointer;
//           font-size: 0.875rem;
//           transition: all 0.2s;
//         }

//         .apps-sort-btn:hover {
//           background-color: #f9fafb;
//         }

//         .apps-sort-btn.apps-sort-active {
//           background-color: #ede9fe;
//           border-color: #7c3aed;
//           color: #7c3aed;
//         }

//         /* === LISTE DES CANDIDATURES === */
//         .apps-applications-list {
//           padding: 1rem;
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .apps-application-card {
//           border: 1px solid #e2e8f0;
//           border-radius: 0.75rem;
//           padding: 1.5rem;
//           transition: all 0.2s;
//           background-color: #fafbfc;
//         }

//         .apps-application-card:hover {
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//           border-color: #c7d2fe;
//         }

//         .apps-application-main {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 1rem;
//         }

//         .apps-application-left {
//           display: flex;
//           align-items: flex-start;
//           gap: 1rem;
//           flex: 1;
//         }

//         .apps-company-logo {
//           width: 3rem;
//           height: 3rem;
//           border-radius: 0.5rem;
//           border: 2px solid #e2e8f0;
//           flex-shrink: 0;
//         }

//         .apps-application-details {
//           flex: 1;
//         }

//         .apps-application-title {
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #1a202c;
//           margin-bottom: 0.25rem;
//         }

//         .apps-application-company {
//           color: #64748b;
//           font-weight: 500;
//           margin-bottom: 0.75rem;
//         }

//         .apps-application-meta {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .apps-meta-item {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           font-size: 0.875rem;
//           color: #64748b;
//         }

//         .apps-remote-badge {
//           background-color: #dcfce7;
//           color: #16a34a;
//           padding: 0.25rem 0.5rem;
//           border-radius: 0.375rem;
//           font-size: 0.75rem;
//           font-weight: 500;
//         }

//         .apps-application-right {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           gap: 1rem;
//         }

//         .apps-application-status {
//           text-align: right;
//         }

//         .apps-status-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.25rem;
//           padding: 0.5rem 0.75rem;
//           border-radius: 1rem;
//           font-size: 0.875rem;
//           font-weight: 500;
//           margin-bottom: 0.5rem;
//         }

//         .apps-status-badge.app-status-pending {
//           background-color: #dbeafe;
//           color: #1e40af;
//         }

//         .apps-status-badge.app-status-interview {
//           background-color: #fef3c7;
//           color: #92400e;
//         }

//         .apps-status-badge.app-status-accepted {
//           background-color: #dcfce7;
//           color: #166534;
//         }

//         .apps-status-badge.app-status-rejected {
//           background-color: #fee2e2;
//           color: #991b1b;
//         }

//         .apps-status-badge.app-status-waiting {
//           background-color: #fed7aa;
//           color: #9a3412;
//         }

//         .apps-status-badge.app-status-shortlisted {
//           background-color: #f3e8ff;
//           color: #6b21a8;
//         }

//         .apps-status-badge.app-status-default {
//           background-color: #f3f4f6;
//           color: #4b5563;
//         }

//         .apps-progress-mini {
//           width: 120px;
//           height: 4px;
//           background-color: #e5e7eb;
//           border-radius: 2px;
//           overflow: hidden;
//         }

//         .apps-progress-mini-fill {
//           height: 100%;
//           transition: width 0.3s ease;
//           border-radius: 2px;
//         }

//         .apps-application-actions {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .apps-action-btn {
//           background: none;
//           border: 1px solid #e2e8f0;
//           padding: 0.5rem;
//           border-radius: 0.375rem;
//           cursor: pointer;
//           transition: all 0.2s;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .apps-action-btn:hover {
//           background-color: #f1f5f9;
//           border-color: #cbd5e1;
//         }

//         .apps-action-btn.apps-action-danger:hover {
//           background-color: #fef2f2;
//           border-color: #fecaca;
//           color: #dc2626;
//         }

//         .apps-application-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding-top: 1rem;
//           border-top: 1px solid #f1f5f9;
//           font-size: 0.875rem;
//           color: #64748b;
//         }

//         .apps-next-step {
//           flex: 1;
//         }

//         .apps-last-update {
//           font-style: italic;
//         }

//         /* === MODAL === */
//         .apps-modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.75);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           padding: 1rem;
//         }

//         .apps-modal-content {
//           background-color: white;
//           border-radius: 1rem;
//           max-width: 4xl;
//           max-height: 90vh;
//           width: 100%;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//         }

//         .apps-modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.5rem 2rem;
//           border-bottom: 1px solid #e5e7eb;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//         }

//         .apps-modal-title-section {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .apps-company-logo-large {
//           width: 4rem;
//           height: 4rem;
//           border-radius: 0.75rem;
//           border: 3px solid white;
//         }

//         .apps-modal-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin: 0;
//         }

//         .apps-modal-company {
//           font-size: 1rem;
//           opacity: 0.9;
//           margin: 0;
//         }

//         .apps-modal-close {
//           background: rgba(255, 255, 255, 0.2);
//           border: none;
//           border-radius: 0.5rem;
//           padding: 0.5rem;
//           cursor: pointer;
//           color: white;
//           transition: background-color 0.2s;
//         }

//         .apps-modal-close:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .apps-modal-body {
//           overflow-y: auto;
//           padding: 2rem;
//           flex: 1;
//         }

//         .apps-modal-section {
//           margin-bottom: 2rem;
//         }

//         .apps-section-title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           color: #374151;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .apps-info-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         .apps-info-item {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.75rem;
//           background-color: #f8fafc;
//           border-radius: 0.5rem;
//           font-size: 0.875rem;
//           color: #4b5563;
//         }

//         .apps-status-section {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .apps-status-badge-large {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.75rem 1rem;
//           border-radius: 0.75rem;
//           font-size: 1rem;
//           font-weight: 600;
//           width: fit-content;
//         }

//         .apps-progress-container {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .apps-progress-bar {
//           flex: 1;
//           height: 8px;
//           background-color: #e5e7eb;
//           border-radius: 4px;
//           overflow: hidden;
//         }

//         .apps-progress-fill {
//           height: 100%;
//           transition: width 0.3s ease;
//           border-radius: 4px;
//         }

//         .apps-progress-text {
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: #4b5563;
//         }

//         .apps-next-step {
//           font-style: italic;
//           color: #6b7280;
//           margin-top: 0.5rem;
//         }

//         .apps-job-description {
//           background-color: #f8fafc;
//           padding: 1rem;
//           border-radius: 0.5rem;
//           line-height: 1.6;
//           color: #374151;
//         }

//         .apps-job-description p {
//           margin-bottom: 0.75rem;
//         }

//         .apps-job-description p:last-child {
//           margin-bottom: 0;
//         }

//         .apps-requirements-list {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//         }

//         .apps-requirement-tag {
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           padding: 0.375rem 0.75rem;
//           border-radius: 1rem;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .apps-benefits-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         .apps-benefit-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.75rem;
//           background-color: #f0fdf4;
//           border-radius: 0.5rem;
//           border-left: 4px solid #16a34a;
//         }

//         .apps-no-requirements {
//           color: #9ca3af;
//           font-style: italic;
//         }

//         .apps-cover-letter {
//           background-color: #f8fafc;
//           padding: 1rem;
//           border-radius: 0.5rem;
//           line-height: 1.6;
//           color: #374151;
//           border-left: 4px solid #667eea;
//         }

//         .apps-custom-answers {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .apps-custom-answer {
//           background-color: #f8fafc;
//           padding: 1rem;
//           border-radius: 0.5rem;
//           border-left: 4px solid #f59e0b;
//         }

//         .apps-custom-answer h4 {
//           font-weight: 600;
//           color: #374151;
//           margin-bottom: 0.5rem;
//         }

//         .apps-custom-answer p {
//           color: #6b7280;
//           line-height: 1.5;
//           margin: 0;
//         }

//         .apps-documents-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         .apps-document-btn {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0.75rem 1rem;
//           background-color: #f8fafc;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.2s;
//           text-align: left;
//           position: relative;
//         }

//         .apps-document-btn:hover:not(.downloading) {
//           background-color: #f1f5f9;
//           border-color: #d1d5db;
//           transform: translateY(-1px);
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }

//         .apps-document-btn.downloading {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .apps-document-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .apps-document-btn span {
//           flex: 1;
//           margin-left: 0.5rem;
//           font-size: 0.875rem;
//           color: #374151;
//           font-weight: 500;
//         }

//         .apps-no-documents {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.75rem;
//           color: #9ca3af;
//           font-style: italic;
//           text-align: center;
//           padding: 2rem;
//           background-color: #f9fafb;
//           border-radius: 0.5rem;
//           border: 2px dashed #e5e7eb;
//         }

//         .apps-contact-info {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         .apps-contact-item {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.875rem;
//           color: #4b5563;
//           padding: 0.5rem 0;
//         }

//         .apps-contact-item a {
//           color: #3b82f6;
//           text-decoration: none;
//           font-weight: 500;
//         }

//         .apps-contact-item a:hover {
//           text-decoration: underline;
//         }

//         .apps-modal-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.5rem 2rem;
//           border-top: 1px solid #e5e7eb;
//           background-color: #f9fafb;
//           gap: 1rem;
//         }

//         /* === EMPTY STATE === */
//         .apps-empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           color: #64748b;
//         }

//         .apps-empty-state svg {
//           width: 4rem;
//           height: 4rem;
//           margin-bottom: 1.5rem;
//           opacity: 0.5;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .apps-empty-state h3 {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//           color: #374151;
//         }

//         .apps-empty-state p {
//           font-size: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         /* === RESPONSIVE === */
//         @media (max-width: 768px) {
//           .apps-dashboard {
//             flex-direction: column;
//           }

//           .apps-sidebar {
//             width: 100%;
//             padding: 1rem 0;
//           }

//           .apps-sidebar-nav {
//             padding: 1rem 0;
//           }

//           .apps-nav-item {
//             padding: 0.5rem 1rem;
//           }

//           .apps-application-main {
//             flex-direction: column;
//             gap: 1rem;
//           }

//           .apps-application-right {
//             align-items: flex-start;
//           }

//           .apps-modal-content {
//             margin: 0.5rem;
//             max-height: 95vh;
//           }

//           .apps-modal-header {
//             padding: 1rem;
//           }

//           .apps-modal-body {
//             padding: 1rem;
//           }

//           .apps-modal-footer {
//             padding: 1rem;
//             flex-direction: column;
//             gap: 0.5rem;
//           }

//           .apps-info-grid {
//             grid-template-columns: 1fr;
//           }

//           .apps-stats-section {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .apps-filters-row {
//             grid-template-columns: 1fr;
//           }
//         }

//         /* === ANIMATIONS SUPPLÉMENTAIRES === */
//         .apps-document-btn:active {
//           transform: scale(0.98);
//         }

//         .apps-requirement-tag {
//           transition: transform 0.2s ease;
//         }

//         .apps-requirement-tag:hover {
//           transform: scale(1.05);
//         }

//         .apps-benefit-item {
//           transition: all 0.2s ease;
//         }

//         .apps-benefit-item:hover {
//           transform: translateX(4px);
//           box-shadow: 0 2px 8px rgba(22, 163, 74, 0.15);
//         }

//         .apps-status-badge-large {
//           position: relative;
//           overflow: hidden;
//         }

//         .apps-status-badge-large::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           transition: left 0.5s ease;
//         }

//         .apps-status-badge-large:hover::before {
//           left: 100%;
//         }
     
//        `}</style>
//     </div>
//   );
// };

// export default CandidateApplications;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import applicationService from '../services/applicationService';
import { 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  Search,
  MoreHorizontal,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Building,
  ExternalLink,
  Download,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Hourglass,
  BarChart3,
  SortAsc,
  SortDesc,
  X,
  Target,
  RefreshCw,
  Star,
  TrendingUp,
  Users,
  Send,
  Archive,
  BookOpen,
  Award
} from 'lucide-react';

const CandidateApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [downloadingDocument, setDownloadingDocument] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    remote: 'all',
    search: ''
  });
  const [sortBy, setSortBy] = useState('appliedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Vérifier s'il y a un message de succès depuis la page de candidature
  useEffect(() => {
    if (location.state?.newApplication && location.state?.message) {
      setSuccessMessage(location.state.message);
      // Effacer le message après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
        // Nettoyer l'état de navigation
        navigate('/Applications', { replace: true, state: {} });
      }, 5000);
    }
  }, [location.state, navigate]);

  // Charger les candidatures au montage du composant
  useEffect(() => {
    loadApplications();
  }, []);

  // Filtrer et trier les candidatures quand les filtres ou données changent
  useEffect(() => {
    let filtered = [...applications];
  
    // Filtrage par recherche
    if (filters.search) {
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtrage par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Filtrage par type
    if (filters.type !== 'all') {
      filtered = filtered.filter(app => app.type === filters.type);
    }

    // Filtrage par remote
    if (filters.remote !== 'all') {
      const isRemote = filters.remote === 'true';
      filtered = filtered.filter(app => app.remote === isRemote);
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'appliedDate' || sortBy === 'lastUpdate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, filters, sortBy, sortOrder])

// 



const loadApplications = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const filters = {
      sortBy,
      order: sortOrder
    };

    console.log('🔍 Chargement candidatures avec filtres:', filters);
    
    // Appel API
    const data = await applicationService.getCandidateApplications(filters);
    
    console.log('📥 Données brutes reçues:', {
      total: data?.total,
      applicationsCount: data?.applications?.length,
      pagination: data?.pagination,
      firstApplication: data?.applications?.[0]
    });
    
    if (data && data.applications) {
      // Transformer les données avec une logique robuste - VERSION CORRIGÉE
      const transformedApplications = data.applications.map((app, index) => {
        console.log(`🔄 Transformation candidature ${index + 1}:`, {
          appId: app._id || app.id,
          jobInfo: !!app.jobInfo,
          jobId: app.jobId,
          status: app.status,
          candidateInfo: !!app.candidateInfo
        });

        // === CORRECTION PRINCIPALE ===
        // Gestion robuste des informations de job - VERSION AMÉLIORÉE
        const jobInfo = app.jobInfo || app.job || {};
        
        // PRIORITÉ : utiliser le titre directement de l'application d'abord
        let jobTitle = app.title || // Direct depuis l'application
                      app.jobTitle || // Variante
                      jobInfo.title || // Depuis jobInfo
                      app.position || // Autre variante
                      'Poste non spécifié';

        // Même logique pour l'entreprise
        let jobCompany = app.company || // Direct depuis l'application
                        jobInfo.company || // Depuis jobInfo
                        jobInfo.companyName || // Variante
                        'Entreprise non spécifiée';

        // Même logique pour la localisation
        let jobLocation = app.location || // Direct depuis l'application
                         jobInfo.location || // Depuis jobInfo
                         'Localisation non spécifiée';

        const jobType = app.type || jobInfo.type || jobInfo.contractType || 'Non spécifié';
        const jobRemote = app.remote || jobInfo.remote || false;

        // Gestion du salaire améliorée
        let formattedSalary = 'Non spécifié';
        const salaryInfo = app.salary || jobInfo.salary;
        if (salaryInfo) {
          if (typeof salaryInfo === 'object') {
            if (salaryInfo.min && salaryInfo.max) {
              formattedSalary = `${salaryInfo.min} - ${salaryInfo.max} ${salaryInfo.currency || 'FCFA'}`;
            } else if (salaryInfo.min) {
              formattedSalary = `À partir de ${salaryInfo.min} ${salaryInfo.currency || 'FCFA'}`;
            } else if (salaryInfo.max) {
              formattedSalary = `Jusqu'à ${salaryInfo.max} ${salaryInfo.currency || 'FCFA'}`;
            }
          } else {
            formattedSalary = salaryInfo.toString();
          }
        }

        // Informations supplémentaires de l'offre
        const jobDescription = app.description || jobInfo.description || 'Description non disponible';
        const jobRequirements = app.requirements || jobInfo.requirements || jobInfo.skills || [];
        const jobBenefits = app.benefits || jobInfo.benefits || [];
        const jobExperience = app.experience || jobInfo.experience || 'Non spécifié';
        const jobEducation = app.education || jobInfo.education || 'Non spécifié';

        // Logo de l'entreprise
        const companyLogo = jobInfo.companyLogo || 
          `https://ui-avatars.com/api/?name=${encodeURIComponent(jobCompany.charAt(0))}&background=667eea&color=fff`;

        // === CORRECTION DOCUMENTS ===
        // Structure des documents plus robuste
        const documents = {
          cv: app.cv || app.documents?.cv || null,
          coverLetterFile: app.coverLetterFile || app.documents?.coverLetterFile || null,
          portfolio: app.portfolio || app.documents?.portfolio || null,
          // Chemins pour téléchargement
          cvPath: app.cvPath || app.documents?.cvPath || app.cv,
          coverLetterPath: app.coverLetterPath || app.documents?.coverLetterPath || app.coverLetterFile,
          portfolioPath: app.portfolioPath || app.documents?.portfolioPath || app.portfolio
        };

        console.log('📄 Documents trouvés:', documents);

        return {
          id: app._id || app.id,
          position: jobTitle, // CORRECTION: utiliser la variable corrigée
          company: jobCompany, // CORRECTION: utiliser la variable corrigée  
          companyLogo: companyLogo,
          location: jobLocation, // CORRECTION: utiliser la variable corrigée
          salary: formattedSalary,
          type: jobType,
          remote: jobRemote,
          status: app.status || 'En cours',
          appliedDate: new Date(app.createdAt || Date.now()).toLocaleDateString('fr-FR'),
          lastUpdate: new Date(app.updatedAt || Date.now()).toLocaleDateString('fr-FR'),
          progress: getProgressFromStatus(app.status),
          nextStep: getNextStepFromStatus(app.status),
          
          // Informations complètes de l'offre
          description: jobDescription,
          requirements: Array.isArray(jobRequirements) ? jobRequirements : 
                       typeof jobRequirements === 'string' ? jobRequirements.split(',').map(r => r.trim()) : [],
          benefits: Array.isArray(jobBenefits) ? jobBenefits :
                   typeof jobBenefits === 'string' ? jobBenefits.split(',').map(b => b.trim()) : [],
          experience: jobExperience,
          education: jobEducation,
          
          // Informations de contact
          contactPerson: app.contactPerson || jobInfo.contactPerson || jobInfo.recruiterName || app.recruiterName || 'Recruteur',
          contactEmail: app.contactEmail || jobInfo.contactEmail || jobInfo.recruiterEmail || app.recruiterEmail || 'contact@entreprise.com',
          
          // Informations de candidature
          coverLetter: app.coverLetter || '',
          documents: documents, // CORRECTION: utiliser la structure corrigée
          customAnswers: app.customAnswers || [],
          jobId: app.jobId || jobInfo.id || jobInfo._id,
          applicationDate: app.createdAt,
          statusHistory: app.statusHistory || [],
          
          // Informations supplémentaires du candidat
          candidateInfo: app.candidateInfo || {},
          additionalInfo: app.additionalInfo || {}
        };
      });

      console.log('✅ Candidatures transformées:', transformedApplications.length);
      
      // Log des candidatures par statut pour debug
      const statusCounts = transformedApplications.reduce((acc, application) => {
        acc[application.status] = (acc[application.status] || 0) + 1;
        return acc;
      }, {});
      console.log('📊 Répartition par statut:', statusCounts);

      setApplications(transformedApplications);
      
    } else {
      console.log('❌ Aucune donnée de candidature reçue');
      setApplications([]);
    }
    
  } catch (err) {
    console.error('💥 Erreur lors du chargement des candidatures:', err);
    console.error('Stack trace:', err.stack);
    setError(`Impossible de charger les candidatures: ${err.message}`);
    setApplications([]);
  } finally {
    setLoading(false);
  }
};

  // Fonction pour calculer le pourcentage de progression selon le statut
  const getProgressFromStatus = (status) => {
    switch (status) {
      case 'new':
      case 'En cours': return 20;
      case 'reviewed':
      case 'Examiné': return 40;
      case 'shortlisted':
      case 'Présélectionné': return 60;
      case 'interviewed':
      case 'Entretien': return 80;
      case 'accepted':
      case 'Accepté': return 100;
      case 'rejected':
      case 'Refusé': return 100;
      default: return 20;
    }
  };

  // Fonction pour déterminer la prochaine étape selon le statut
  const getNextStepFromStatus = (status) => {
    switch (status) {
      case 'new':
      case 'En cours': return 'En cours d\'examen par le recruteur';
      case 'reviewed':
      case 'Examiné': return 'Attente de décision pour présélection';
      case 'shortlisted':
      case 'Présélectionné': return 'Préparation d\'un entretien possible';
      case 'interviewed':
      case 'Entretien': return 'Entretien programmé ou en attente de résultat';
      case 'accepted':
      case 'Accepté': return 'Félicitations ! Préparez votre intégration';
      case 'rejected':
      case 'Refusé': return 'Candidature non retenue cette fois';
      default: return 'Statut en cours de mise à jour';
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const getStatusInfo = (status) => {
    // Normaliser le statut pour gérer les différents formats
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus.includes('cours') || status === 'new') {
      return { 
        className: 'app-status-pending', 
        icon: <Hourglass className="w-4 h-4" />,
        color: '#3b82f6',
        text: 'En cours'
      };
    } else if (normalizedStatus.includes('entretien') || status === 'interviewed') {
      return { 
        className: 'app-status-interview', 
        icon: <MessageSquare className="w-4 h-4" />,
        color: '#f59e0b',
        text: 'Entretien'
      };
    } else if (normalizedStatus.includes('accepté') || status === 'accepted') {
      return { 
        className: 'app-status-accepted', 
        icon: <CheckCircle className="w-4 h-4" />,
        color: '#10b981',
        text: 'Accepté'
      };
    } else if (normalizedStatus.includes('refusé') || status === 'rejected') {
      return { 
        className: 'app-status-rejected', 
        icon: <XCircle className="w-4 h-4" />,
        color: '#ef4444',
        text: 'Refusé'
      };
    } else if (normalizedStatus.includes('attente') || normalizedStatus.includes('reviewed')) {
      return { 
        className: 'app-status-waiting', 
        icon: <AlertCircle className="w-4 h-4" />,
        color: '#f97316',
        text: 'En attente'
      };
    } else if (normalizedStatus.includes('présélectionné') || status === 'shortlisted') {
      return { 
        className: 'app-status-shortlisted', 
        icon: <Star className="w-4 h-4" />,
        color: '#8b5cf6',
        text: 'Présélectionné'
      };
    } else {
      return { 
        className: 'app-status-default', 
        icon: <Clock className="w-4 h-4" />,
        color: '#6b7280',
        text: status
      };
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const openApplicationModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      try {
        await applicationService.deleteApplication(id);
        setApplications(prev => prev.filter(app => app.id !== id));
        alert('Candidature supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la candidature');
      }
    }
  };

  const refreshApplications = async () => {
    await loadApplications();
  };

const downloadDocument = async (applicationId, documentType) => {
  try {
    setDownloadingDocument(`${applicationId}-${documentType}`);
    
    const application = applications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Candidature non trouvée');
    }

    const document = application.documents[documentType];
    const documentPath = application.documents[`${documentType}Path`];
    
    if (!document && !documentPath) {
      alert('Document non disponible pour téléchargement');
      return;
    }

    // Correction du chemin pour les URLs
    const cleanPath = documentPath ? documentPath.replace(/\\/g, '/') : null;

    // Essayer d'abord le téléchargement via l'API
    try {
      const blob = await applicationService.downloadDocument(applicationId, documentType);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Nom du fichier
      const fileName = getDocumentFileName(documentType, application);
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return;
    } catch (apiError) {
      console.log('API download failed, trying direct URL', apiError);
    }

    // Fallback: Téléchargement direct si l'API échoue
    if (cleanPath) {
      let downloadUrl;
      
      // Si c'est déjà une URL complète
      if (cleanPath.startsWith('http')) {
        downloadUrl = cleanPath;
      } 
      // Si c'est un chemin relatif
      else {
        downloadUrl = `${window.location.origin}/${cleanPath}`;
      }

      // Ouvrir dans un nouvel onglet comme dernier recours
      window.open(downloadUrl, '_blank');
    } else {
      throw new Error('Aucune méthode de téléchargement disponible');
    }
  } catch (error) {
    console.error('Erreur de téléchargement:', error);
    alert(`Erreur lors du téléchargement: ${error.message}`);
  } finally {
    setDownloadingDocument(null);
  }
};

// Helper function pour générer les noms de fichiers
const getDocumentFileName = (type, application) => {
  const prefix = type === 'cv' ? 'CV' : 
                type === 'coverLetterFile' ? 'LettreMotivation' : 'Portfolio';
  return `${prefix}_${application.company}_${application.position}.pdf`.replace(/\s+/g, '_');
};
  

  // Calculer les statistiques
  const stats = {
    total: applications.length,
    pending: applications.filter(app => ['new', 'En cours', 'reviewed', 'Examiné'].includes(app.status)).length,
    interviews: applications.filter(app => ['interviewed', 'Entretien', 'shortlisted', 'Présélectionné'].includes(app.status)).length,
    accepted: applications.filter(app => ['accepted', 'Accepté'].includes(app.status)).length,
    rejected: applications.filter(app => ['rejected', 'Refusé'].includes(app.status)).length
  };

  const Sidebar = () => (
    <div className="apps-sidebar">
      <div className="apps-sidebar-header">
        <div className="apps-logo">
          <div className="apps-logo-icon">JT</div>
          <span className="apps-logo-text">JobTracks</span>
        </div>
      </div>
      
      <div className="apps-sidebar-nav">
        <div className="apps-nav-section">
          <div className="apps-nav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
            <BarChart3 className="w-5 h-5" />
            <span>Tableau de bord</span>
          </div>
          <div className="apps-nav-item" onClick={() => handleNavigation('/CandidateProfilPage')}>
            <User className="w-5 h-5" />
            <span>Mon profil</span>
          </div>
          <div className="apps-nav-item apps-nav-active">
            <Briefcase className="w-5 h-5" />
            <span>Mes candidatures</span>
          </div>
          <div className="apps-nav-item" onClick={() => handleNavigation('/Messages')}>
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            <span className="apps-nav-badge">3</span>
          </div>
          <div className="apps-nav-item" onClick={() => handleNavigation('/c-Notifications')}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="apps-nav-section">
          <div className="apps-nav-item" onClick={() => handleNavigation('/settings')}>
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </div>
          <div className="apps-nav-item" onClick={() => handleNavigation('/')}>
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationModal = ({ application, onClose }) => {
    if (!application) return null;
    const statusInfo = getStatusInfo(application.status);

    return (
      <div className="apps-modal-overlay" onClick={onClose}>
        <div className="apps-modal-content" onClick={e => e.stopPropagation()}>
          <div className="apps-modal-header">
            <div className="apps-modal-title-section">
              <img src={application.companyLogo} alt={application.company} className="apps-company-logo-large" />
              <div>
                <h2 className="apps-modal-title">{application.position}</h2>
                <p className="apps-modal-company">{application.company}</p>
              </div>
            </div>
            <button className="apps-modal-close" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="apps-modal-body">
            {/* Section informations générales */}
            <div className="apps-modal-section">
              <h3 className="apps-section-title">
                <Building className="w-5 h-5" />
                Informations de l'offre
              </h3>
              <div className="apps-info-grid">
                <div className="apps-info-item">
                  <MapPin className="w-4 h-4" />
                  <span>{application.location}</span>
                </div>
                <div className="apps-info-item">
                  <DollarSign className="w-4 h-4" />
                  <span>{application.salary}</span>
                </div>
                <div className="apps-info-item">
                  <Briefcase className="w-4 h-4" />
                  <span>{application.type}</span>
                </div>
                <div className="apps-info-item">
                  <Clock className="w-4 h-4" />
                  <span>{application.experience}</span>
                </div>
                {application.education && (
                  <div className="apps-info-item">
                    <BookOpen className="w-4 h-4" />
                    <span>{application.education}</span>
                  </div>
                )}
                <div className="apps-info-item">
                  <Calendar className="w-4 h-4" />
                  <span>Candidature: {application.appliedDate}</span>
                </div>
              </div>
            </div>

            {/* Section statut et progression */}
            <div className="apps-modal-section">
              <h3 className="apps-section-title">
                <BarChart3 className="w-5 h-5" />
                Statut et progression
              </h3>
              <div className="apps-status-section">
                <div className={`apps-status-badge-large ${statusInfo.className}`}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </div>
                <div className="apps-progress-container">
                  <div className="apps-progress-bar">
                    <div 
                      className="apps-progress-fill" 
                      style={{ 
                        width: `${application.progress}%`,
                        backgroundColor: statusInfo.color
                      }}
                    ></div>
                  </div>
                  <span className="apps-progress-text">{application.progress}%</span>
                </div>
              </div>
              <p className="apps-next-step">{application.nextStep}</p>
            </div>

            {/* Section description du poste */}
            <div className="apps-modal-section">
              <h3 className="apps-section-title">
                <FileText className="w-5 h-5" />
                Description du poste
              </h3>
              <div className="apps-job-description">
                {application.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section compétences requises */}
            {application.requirements.length > 0 && (
              <div className="apps-modal-section">
                <h3 className="apps-section-title">
                  <Target className="w-5 h-5" />
                  Compétences requises
                </h3>
                <div className="apps-requirements-list">
                  {application.requirements.map((req, index) => (
                    <span key={index} className="apps-requirement-tag">{req}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Section avantages */}
            {application.benefits.length > 0 && (
              <div className="apps-modal-section">
                <h3 className="apps-section-title">
                  <Award className="w-5 h-5" />
                  Avantages proposés
                </h3>
                <div className="apps-benefits-list">
                  {application.benefits.map((benefit, index) => (
                    <div key={index} className="apps-benefit-item">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section ma candidature */}
            {application.coverLetter && (
              <div className="apps-modal-section">
                <h3 className="apps-section-title">
                  <Mail className="w-5 h-5" />
                  Ma lettre de motivation
                </h3>
                <div className="apps-cover-letter">
                  {application.coverLetter}
                </div>
              </div>
            )}

            {/* Section réponses aux questions */}
            {application.customAnswers && application.customAnswers.length > 0 && (
              <div className="apps-modal-section">
                <h3 className="apps-section-title">
                  <MessageSquare className="w-5 h-5" />
                  Mes réponses aux questions spécifiques
                </h3>
                <div className="apps-custom-answers">
                  {application.customAnswers.map((answer, index) => (
                    <div key={index} className="apps-custom-answer">
                      <h4>{answer.question}</h4>
                      <p>{answer.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section documents envoyés - AMÉLIORÉE */}
            <div className="apps-modal-section">
              <h3 className="apps-section-title">
                <FileText className="w-5 h-5" />
                Documents envoyés
              </h3>
              <div className="apps-documents-list">
                {application.documents?.cv && (
                  <button 
                    className={`apps-document-btn ${downloadingDocument === `${application.id}-cv` ? 'downloading' : ''}`}
                    onClick={() => downloadDocument(application.id, 'cv')}
                    disabled={downloadingDocument === `${application.id}-cv`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Mon CV</span>
                    {downloadingDocument === `${application.id}-cv` ? (
                      <div className="apps-spinner-small"></div>
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                )}
                {application.documents?.coverLetterFile && (
                  <button 
                    className={`apps-document-btn ${downloadingDocument === `${application.id}-coverLetterFile` ? 'downloading' : ''}`}
                    onClick={() => downloadDocument(application.id, 'coverLetterFile')}
                    disabled={downloadingDocument === `${application.id}-coverLetterFile`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Lettre de motivation (fichier)</span>
                    {downloadingDocument === `${application.id}-coverLetterFile` ? (
                      <div className="apps-spinner-small"></div>
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                )}
                {application.documents?.portfolio && (
                  <button 
                    className={`apps-document-btn ${downloadingDocument === `${application.id}-portfolio` ? 'downloading' : ''}`}
                    onClick={() => downloadDocument(application.id, 'portfolio')}
                    disabled={downloadingDocument === `${application.id}-portfolio`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Portfolio</span>
                    {downloadingDocument === `${application.id}-portfolio` ? (
                      <div className="apps-spinner-small"></div>
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                )}
                {(!application.documents?.cv && !application.documents?.coverLetterFile && !application.documents?.portfolio) && (
                  <div className="apps-no-documents">
                    <FileText className="w-8 h-8 opacity-30" />
                    <span>Aucun document joint à cette candidature</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section contact recruteur */}
            <div className="apps-modal-section">
              <h3 className="apps-section-title">
                <User className="w-5 h-5" />
                Contact recruteur
              </h3>
              <div className="apps-contact-info">
                <div className="apps-contact-item">
                  <User className="w-4 h-4" />
                  <span>{application.contactPerson}</span>
                </div>
                <div className="apps-contact-item">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${application.contactEmail}`}>{application.contactEmail}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="apps-modal-footer">
            <button className="apps-btn-secondary" onClick={onClose}>
              Fermer
            </button>
            <button 
              className="apps-btn-secondary"
              onClick={() => navigate(`/messages?recruiter=${application.contactEmail}`)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacter le recruteur
            </button>
            <button 
              className="apps-btn-primary"
              onClick={() => navigate(`/job/${application.jobId}`)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir l'offre
            </button>
          </div>
        </div>
      </div>
    );
  };

  // État de chargement
  if (loading) {
    return (
      <div className="apps-dashboard">
        <Sidebar />
        <div className="apps-main-content">
          <div className="apps-loading-container">
            <div className="apps-spinner"></div>
            <p>Chargement de vos candidatures...</p>
          </div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="apps-dashboard">
        <Sidebar />
        <div className="apps-main-content">
          <div className="apps-error-container">
            <AlertCircle className="apps-error-icon" />
            <h3>Erreur de chargement</h3>
            <p>{error}</p>
            <button onClick={refreshApplications} className="apps-retry-btn">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apps-dashboard">
      <Sidebar />
      
      {/* Message de succès */}
      {successMessage && (
        <div className="apps-success-message">
          <CheckCircle className="apps-success-icon" />
          {successMessage}
        </div>
      )}

      <div className="apps-main-content">
        {/* Top Bar */}
        <div className="apps-top-bar">
          <nav className="apps-breadcrumb">
            <span className="apps-breadcrumb-item apps-clickable" onClick={() => navigate('/CandidateDashboard')}>
              Accueil
            </span>
            <span className="apps-breadcrumb-separator">/</span>
            <span className="apps-breadcrumb-item apps-breadcrumb-active">
              Mes candidatures
            </span>
          </nav>
          
          <div className="apps-top-actions">
            <div className="apps-search-box">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une candidature..."
                className="apps-search-input"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <button className="apps-notification-btn">
              <Bell className="w-5 h-5" />
              <div className="apps-notification-dot"></div>
            </button>
            
            <div className="apps-user-avatar">
              <img src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff" alt="Profile" />
            </div>
          </div>
        </div>

        <div className="apps-content">
          {/* En-tête de page */}
          <div className="apps-page-header">
            <div className="apps-page-title-section">
              <h1>Mes candidatures</h1>
              <p className="apps-page-subtitle">
                Suivez l'état d'avancement de vos candidatures et gérez vos postulations
              </p>
            </div>
            <div className="apps-page-actions">
              <button className="apps-btn-secondary" onClick={refreshApplications}>
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </button>
              <button className="apps-btn-primary" onClick={() => navigate('/jobs')}>
                <Plus className="w-4 h-4" />
                Nouvelle candidature
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="apps-stats-section">
            <div className="apps-stat-card">
              <div className="apps-stat-number">{stats.total}</div>
              <div className="apps-stat-label">Total candidatures</div>
            </div>
            <div className="apps-stat-card">
              <div className="apps-stat-number">{stats.pending}</div>
              <div className="apps-stat-label">En cours d'examen</div>
            </div>
            <div className="apps-stat-card">
              <div className="apps-stat-number">{stats.interviews}</div>
              <div className="apps-stat-label">Entretiens / Présélections</div>
            </div>
            <div className="apps-stat-card">
              <div className="apps-stat-number">{stats.accepted}</div>
              <div className="apps-stat-label">Acceptées</div>
            </div>
            <div className="apps-stat-card">
              <div className="apps-stat-number">{stats.rejected}</div>
              <div className="apps-stat-label">Refusées</div>
            </div>
          </div>

          {/* Filtres */}
          <div className="apps-filters-section">
            <div className="apps-filters-row">
              <div className="apps-filter-group">
                <label className="apps-filter-label">Statut</label>
                <select 
                  className="apps-filter-select"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="new">En cours</option>
                  <option value="reviewed">Examiné</option>
                  <option value="shortlisted">Présélectionné</option>
                  <option value="interviewed">Entretien</option>
                  <option value="accepted">Accepté</option>
                  <option value="rejected">Refusé</option>
                </select>
              </div>
              
              <div className="apps-filter-group">
                <label className="apps-filter-label">Type de contrat</label>
                <select 
                  className="apps-filter-select"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">Tous les types</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Stage">Stage</option>
                  <option value="Temps partiel">Temps partiel</option>
                </select>
              </div>
              
              <div className="apps-filter-group">
                <label className="apps-filter-label">Télétravail</label>
                <select 
                  className="apps-filter-select"
                  value={filters.remote}
                  onChange={(e) => handleFilterChange('remote', e.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="true">Remote</option>
                  <option value="false">Présentiel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="apps-table-section">
            <div className="apps-table-header">
              <div className="apps-table-controls">
                <span className="apps-results-count">
                  {filteredApplications.length} candidature(s) trouvée(s)
                </span>
                <div className="apps-sort-controls">
                  <button 
                    className={`apps-sort-btn ${sortBy === 'appliedDate' ? 'apps-sort-active' : ''}`}
                    onClick={() => handleSort('appliedDate')}
                  >
                    Date
                    {sortBy === 'appliedDate' && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                    )}
                  </button>
                  <button 
                    className={`apps-sort-btn ${sortBy === 'company' ? 'apps-sort-active' : ''}`}
                    onClick={() => handleSort('company')}
                  >
                    Entreprise
                    {sortBy === 'company' && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                    )}
                  </button>
                  <button 
                    className={`apps-sort-btn ${sortBy === 'status' ? 'apps-sort-active' : ''}`}
                    onClick={() => handleSort('status')}
                  >
                    Statut
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="apps-applications-list">
              {filteredApplications.map((application) => {
                const statusInfo = getStatusInfo(application.status);
                return (
                  <div key={application.id} className="apps-application-card">
                    <div className="apps-application-main">
                      <div className="apps-application-left">
                        <img 
                          src={application.companyLogo} 
                          alt={application.company} 
                          className="apps-company-logo"
                        />
                        <div className="apps-application-details">
                          <h3 className="apps-application-title">{application.position}</h3>
                          <div className="apps-application-company">{application.company}</div>
                          <div className="apps-application-meta">
                            <span className="apps-meta-item">
                              <MapPin className="w-3 h-3" />
                              {application.location}
                            </span>
                            <span className="apps-meta-item">
                              <DollarSign className="w-3 h-3" />
                              {application.salary}
                            </span>
                            <span className="apps-meta-item">
                              <Calendar className="w-3 h-3" />
                              {application.appliedDate}
                            </span>
                            {application.remote && (
                              <span className="apps-remote-badge">Remote</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="apps-application-right">
                        <div className="apps-application-status">
                          <div className={`apps-status-badge ${statusInfo.className}`}>
                            {statusInfo.icon}
                            {application.status}
                          </div>
                          <div className="apps-progress-mini">
                            <div 
                              className="apps-progress-mini-fill" 
                              style={{ 
                                width: `${application.progress}%`,
                                backgroundColor: statusInfo.color
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="apps-application-actions">
                          <button 
                            className="apps-action-btn"
                            onClick={() => openApplicationModal(application)}
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="apps-action-btn"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            className="apps-action-btn apps-action-danger"
                            onClick={() => deleteApplication(application.id)}
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="apps-action-btn">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="apps-application-footer">
                      <div className="apps-next-step">
                        <strong>Prochaine étape:</strong> {application.nextStep}
                      </div>
                      <div className="apps-last-update">
                        Dernière mise à jour: {application.lastUpdate}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredApplications.length === 0 && (
              <div className="apps-empty-state">
                <Briefcase className="w-12 h-12" />
                <h3>Aucune candidature trouvée</h3>
                <p>Modifiez vos filtres ou créez une nouvelle candidature</p>
                <button className="apps-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle candidature
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <ApplicationModal 
          application={selectedApplication} 
          onClose={closeModal} 
        />
      )}

        <style>{`
        .apps-dashboard {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* === SIDEBAR === */
        .apps-sidebar {
          width: 280px;
          background-color: white;
          border-right: 1px solid #e2e8f0;
          padding: 1.5rem 0;
        }

        .apps-sidebar-header {
          padding: 0 1.5rem 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .apps-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .apps-logo-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.125rem;
        }

        .apps-logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a202c;
        }

        .apps-sidebar-nav {
          padding: 2rem 0;
        }

        .apps-nav-section {
          margin-bottom: 2rem;
        }

        .apps-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .apps-nav-item:hover {
          background-color: #f1f5f9;
          color: #334155;
        }

        .apps-nav-item.apps-nav-active {
          background-color: #ede9fe;
          color: #7c3aed;
          border-right: 3px solid #7c3aed;
        }

        .apps-nav-badge {
          background-color: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.5rem;
          border-radius: 1rem;
          margin-left: auto;
        }

        /* === CONTENU PRINCIPAL === */
        .apps-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .apps-loading-container, .apps-error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .apps-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .apps-spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .apps-error-icon {
          width: 48px;
          height: 48px;
          color: #ef4444;
        }

        .apps-retry-btn {
          padding: 0.75rem 1.5rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .apps-retry-btn:hover {
          background-color: #1d4ed8;
          transform: translateY(-1px);
        }

        /* === TOP BAR === */
        .apps-top-bar {
          background-color: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .apps-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.875rem;
        }

        .apps-breadcrumb-item {
          transition: color 0.2s;
        }

        .apps-breadcrumb-item.apps-clickable:hover {
          color: #334155;
        }

        .apps-breadcrumb-item.apps-breadcrumb-active {
          color: #1a202c;
          font-weight: 500;
        }

        .apps-breadcrumb-separator {
          color: #cbd5e1;
        }

        .apps-top-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .apps-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .apps-search-box svg {
          position: absolute;
          left: 0.75rem;
          color: #9ca3af;
          width: 1rem;
          height: 1rem;
        }

        .apps-search-input {
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          width: 300px;
          font-size: 0.875rem;
        }

        .apps-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .apps-notification-btn {
          position: relative;
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .apps-notification-btn:hover {
          background-color: #f1f5f9;
        }

        .apps-notification-dot {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .apps-user-avatar img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
        }

        /* === MESSAGE DE SUCCÈS === */
        .apps-success-message {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1rem 2rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .apps-success-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* === CONTENU === */
        .apps-content {
          flex: 1;
          padding: 2rem;
        }

        .apps-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .apps-page-title-section h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .apps-page-subtitle {
          color: #64748b;
          font-size: 1rem;
        }

        .apps-page-actions {
          display: flex;
          gap: 1rem;
        }

        .apps-btn-secondary {
          padding: 0.75rem 1.5rem;
          background-color: white;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .apps-btn-secondary:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }

        .apps-btn-primary {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .apps-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        /* === FILTRES === */
        .apps-filters-section {
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .apps-filters-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .apps-filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .apps-filter-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .apps-filter-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: white;
          font-size: 0.875rem;
        }

        .apps-filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* === STATISTIQUES === */
        .apps-stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .apps-stat-card {
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.2s;
        }

        .apps-stat-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-color: #c7d2fe;
        }

        .apps-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .apps-stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* === TABLE SECTION === */
        .apps-table-section {
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .apps-table-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          background-color: #f8fafc;
        }

        .apps-table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .apps-results-count {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .apps-sort-controls {
          display: flex;
          gap: 0.5rem;
        }

        .apps-sort-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .apps-sort-btn:hover {
          background-color: #f9fafb;
        }

        .apps-sort-btn.apps-sort-active {
          background-color: #ede9fe;
          border-color: #7c3aed;
          color: #7c3aed;
        }

        /* === LISTE DES CANDIDATURES === */
        .apps-applications-list {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .apps-application-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.2s;
          background-color: #fafbfc;
        }

        .apps-application-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-color: #c7d2fe;
        }

        .apps-application-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .apps-application-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
        }

        .apps-company-logo {
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          border: 2px solid #e2e8f0;
          flex-shrink: 0;
        }

        .apps-application-details {
          flex: 1;
        }

        .apps-application-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.25rem;
        }

        .apps-application-company {
          color: #64748b;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .apps-application-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .apps-meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .apps-remote-badge {
          background-color: #dcfce7;
          color: #16a34a;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .apps-application-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .apps-application-status {
          text-align: right;
        }

        .apps-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .apps-status-badge.app-status-pending {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .apps-status-badge.app-status-interview {
          background-color: #fef3c7;
          color: #92400e;
        }

        .apps-status-badge.app-status-accepted {
          background-color: #dcfce7;
          color: #166534;
        }

        .apps-status-badge.app-status-rejected {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .apps-status-badge.app-status-waiting {
          background-color: #fed7aa;
          color: #9a3412;
        }

        .apps-status-badge.app-status-shortlisted {
          background-color: #f3e8ff;
          color: #6b21a8;
        }

        .apps-status-badge.app-status-default {
          background-color: #f3f4f6;
          color: #4b5563;
        }

        .apps-progress-mini {
          width: 120px;
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .apps-progress-mini-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .apps-application-actions {
          display: flex;
          gap: 0.5rem;
        }

        .apps-action-btn {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apps-action-btn:hover {
          background-color: #f1f5f9;
          border-color: #cbd5e1;
        }

        .apps-action-btn.apps-action-danger:hover {
          background-color: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .apps-application-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
          font-size: 0.875rem;
          color: #64748b;
        }

        .apps-next-step {
          flex: 1;
        }

        .apps-last-update {
          font-style: italic;
        }

        /* === MODAL === */
        .apps-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .apps-modal-content {
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

        .apps-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .apps-modal-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .apps-company-logo-large {
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          border: 3px solid white;
        }

        .apps-modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .apps-modal-company {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        .apps-modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem;
          cursor: pointer;
          color: white;
          transition: background-color 0.2s;
        }

        .apps-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .apps-modal-body {
          overflow-y: auto;
          padding: 2rem;
          flex: 1;
        }

        .apps-modal-section {
          margin-bottom: 2rem;
        }

        .apps-section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .apps-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .apps-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: #f8fafc;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .apps-status-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .apps-status-badge-large {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          width: fit-content;
        }

        .apps-progress-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .apps-progress-bar {
          flex: 1;
          height: 8px;
          background-color: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .apps-progress-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .apps-progress-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
        }

        .apps-next-step {
          font-style: italic;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .apps-job-description {
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          line-height: 1.6;
          color: #374151;
        }

        .apps-job-description p {
          margin-bottom: 0.75rem;
        }

        .apps-job-description p:last-child {
          margin-bottom: 0;
        }

        .apps-requirements-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .apps-requirement-tag {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .apps-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .apps-benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background-color: #f0fdf4;
          border-radius: 0.5rem;
          border-left: 4px solid #16a34a;
        }

        .apps-no-requirements {
          color: #9ca3af;
          font-style: italic;
        }

        .apps-cover-letter {
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          line-height: 1.6;
          color: #374151;
          border-left: 4px solid #667eea;
        }

        .apps-custom-answers {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .apps-custom-answer {
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid #f59e0b;
        }

        .apps-custom-answer h4 {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .apps-custom-answer p {
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .apps-documents-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .apps-document-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background-color: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          position: relative;
        }

        .apps-document-btn:hover:not(.downloading) {
          background-color: #f1f5f9;
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .apps-document-btn.downloading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .apps-document-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .apps-document-btn span {
          flex: 1;
          margin-left: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          font-weight: 500;
        }

        .apps-no-documents {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: #9ca3af;
          font-style: italic;
          text-align: center;
          padding: 2rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
          border: 2px dashed #e5e7eb;
        }

        .apps-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .apps-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #4b5563;
          padding: 0.5rem 0;
        }

        .apps-contact-item a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .apps-contact-item a:hover {
          text-decoration: underline;
        }

        .apps-modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          background-color: #f9fafb;
          gap: 1rem;
        }

        /* === EMPTY STATE === */
        .apps-empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
        }

        .apps-empty-state svg {
          width: 4rem;
          height: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.5;
          margin-left: auto;
          margin-right: auto;
        }

        .apps-empty-state h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .apps-empty-state p {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .apps-dashboard {
            flex-direction: column;
          }

          .apps-sidebar {
            width: 100%;
            padding: 1rem 0;
          }

          .apps-sidebar-nav {
            padding: 1rem 0;
          }

          .apps-nav-item {
            padding: 0.5rem 1rem;
          }

          .apps-application-main {
            flex-direction: column;
            gap: 1rem;
          }

          .apps-application-right {
            align-items: flex-start;
          }

          .apps-modal-content {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .apps-modal-header {
            padding: 1rem;
          }

          .apps-modal-body {
            padding: 1rem;
          }

          .apps-modal-footer {
            padding: 1rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .apps-info-grid {
            grid-template-columns: 1fr;
          }

          .apps-stats-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .apps-filters-row {
            grid-template-columns: 1fr;
          }
        }

        /* === ANIMATIONS SUPPLÉMENTAIRES === */
        .apps-document-btn:active {
          transform: scale(0.98);
        }

        .apps-requirement-tag {
          transition: transform 0.2s ease;
        }

        .apps-requirement-tag:hover {
          transform: scale(1.05);
        }

        .apps-benefit-item {
          transition: all 0.2s ease;
        }

        .apps-benefit-item:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.15);
        }

        .apps-status-badge-large {
          position: relative;
          overflow: hidden;
        }

        .apps-status-badge-large::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .apps-status-badge-large:hover::before {
          left: 100%;
        }
     
       `}</style>
    </div>
  );
};

export default CandidateApplications;






















