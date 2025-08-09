// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   Camera,
//   Edit3,
//   Save,
//   X,
//   Plus,
//   Trash2,
//   MapPin,
//   Mail,
//   Phone,
//   Calendar,
//   Globe,
//   Linkedin,
//   Github,
//   Download,
//   Upload,
//   Star,
//   Award,
//   GraduationCap,
//   Languages,
//   BarChart3
// } from 'lucide-react';
// import '../styles/CandiCSS/CandidateProfile.css';

// const CandidateProfilePage = () => {
//   // const navigate = (route) => {
//   //   console.log('Navigation vers:', route);
//   //   // Simulation de navigation
//   // };
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
  
//   // État pour le mode édition
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);
  
//   // États pour les données du profil
//   const [profileData, setProfileData] = useState({
//     personalInfo: {
//       firstName: 'Jean',
//       lastName: 'Dupont',
//       email: 'jean.dupont@email.com',
//       phone: '+33 6 12 34 56 78',
//       location: 'Paris, France',
//       birthDate: '1990-05-15',
//       website: 'https://jeandupont.dev',
//       linkedin: 'https://linkedin.com/in/jeandupont',
//       github: 'https://github.com/jeandupont',
//       bio: 'Développeur Full Stack passionné avec 5 ans d\'expérience dans le développement d\'applications web modernes. Spécialisé en React, Node.js et les technologies cloud.',
//       avatar: 'https://via.placeholder.com/150x150'
//     },
//     experiences: [
//       {
//         id: 1,
//         company: 'TechCorp',
//         position: 'Développeur Senior Full Stack',
//         startDate: '2022-01',
//         endDate: 'present',
//         location: 'Paris, France',
//         description: 'Développement d\'applications web complexes avec React et Node.js. Leadership technique d\'une équipe de 4 développeurs.',
//         technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
//       },
//       {
//         id: 2,
//         company: 'StartupXYZ',
//         position: 'Développeur Frontend',
//         startDate: '2020-03',
//         endDate: '2021-12',
//         location: 'Lyon, France',
//         description: 'Création d\'interfaces utilisateur modernes et responsives. Optimisation des performances des applications.',
//         technologies: ['Vue.js', 'TypeScript', 'SASS', 'Webpack']
//       }
//     ],
//     education: [
//       {
//         id: 1,
//         school: 'École Supérieure d\'Informatique',
//         degree: 'Master en Informatique',
//         field: 'Génie Logiciel',
//         startDate: '2018',
//         endDate: '2020',
//         location: 'Paris, France',
//         description: 'Spécialisation en développement logiciel et architectures distribuées.'
//       },
//       {
//         id: 2,
//         school: 'Université Paris-Sud',
//         degree: 'Licence en Informatique',
//         field: 'Informatique Générale',
//         startDate: '2015',
//         endDate: '2018',
//         location: 'Orsay, France',
//         description: 'Formation générale en informatique avec focus sur la programmation et les algorithmes.'
//       }
//     ],
//     skills: [
//       { id: 1, name: 'React', level: 95, category: 'Frontend' },
//       { id: 2, name: 'Node.js', level: 90, category: 'Backend' },
//       { id: 3, name: 'JavaScript', level: 95, category: 'Langage' },
//       { id: 4, name: 'TypeScript', level: 85, category: 'Langage' },
//       { id: 5, name: 'MongoDB', level: 80, category: 'Base de données' },
//       { id: 6, name: 'AWS', level: 75, category: 'Cloud' },
//       { id: 7, name: 'Docker', level: 70, category: 'DevOps' },
//       { id: 8, name: 'Git', level: 90, category: 'Outil' }
//     ],
//     languages: [
//       { id: 1, name: 'Français', level: 'Natif' },
//       { id: 2, name: 'Anglais', level: 'Courant' },
//       { id: 3, name: 'Espagnol', level: 'Intermédiaire' }
//     ],
//     certifications: [
//       {
//         id: 1,
//         name: 'AWS Certified Developer',
//         issuer: 'Amazon Web Services',
//         date: '2023-08',
//         expiryDate: '2026-08',
//         credentialId: 'AWS-DEV-2023-001'
//       },
//       {
//         id: 2,
//         name: 'React Developer Certification',
//         issuer: 'Meta',
//         date: '2022-12',
//         expiryDate: null,
//         credentialId: 'META-REACT-2022-156'
//       }
//     ]
//   });

//   // État temporaire pour l'édition
//   const [tempData, setTempData] = useState({});

//     const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const startEditing = (section) => {
//     setEditingSection(section);
//     setTempData({ ...profileData[section] });
//     setIsEditing(true);
//   };

//   const cancelEdit = () => {
//     setIsEditing(false);
//     setEditingSection(null);
//     setTempData({});
//   };

//   const saveEdit = () => {
//     setProfileData(prev => ({
//       ...prev,
//       [editingSection]: tempData
//     }));
//     setIsEditing(false);
//     setEditingSection(null);
//     setTempData({});
//   };

//   const handleImageUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfileData(prev => ({
//           ...prev,
//           personalInfo: {
//             ...prev.personalInfo,
//             avatar: e.target.result
//           }
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addExperience = () => {
//     const newExp = {
//       id: Date.now(),
//       company: '',
//       position: '',
//       startDate: '',
//       endDate: '',
//       location: '',
//       description: '',
//       technologies: []
//     };
//     setProfileData(prev => ({
//       ...prev,
//       experiences: [...prev.experiences, newExp]
//     }));
//     setEditingSection('experiences');
//     setTempData(newExp);
//     setIsEditing(true);
//   };

//   const deleteExperience = (id) => {
//     setProfileData(prev => ({
//       ...prev,
//       experiences: prev.experiences.filter(exp => exp.id !== id)
//     }));
//   };

//   const addEducation = () => {
//     const newEdu = {
//       id: Date.now(),
//       school: '',
//       degree: '',
//       field: '',
//       startDate: '',
//       endDate: '',
//       location: '',
//       description: ''
//     };
//     setProfileData(prev => ({
//       ...prev,
//       education: [...prev.education, newEdu]
//     }));
//   };

//   const addSkill = () => {
//     const newSkill = {
//       id: Date.now(),
//       name: '',
//       level: 50,
//       category: 'Technique'
//     };
//     setProfileData(prev => ({
//       ...prev,
//       skills: [...prev.skills, newSkill]
//     }));
//   };

//   const deleteSkill = (id) => {
//     setProfileData(prev => ({
//       ...prev,
//       skills: prev.skills.filter(skill => skill.id !== id)
//     }));
//   };

//   // const Sidebar = () => (
//   //   <div className="ssidebar">
//   //     <div className="ssidebar-header">
//   //       <div className="slogo">
//   //         <div className="slogo-icon">JT</div>
//   //         <span className="slogo-text">JobTracks</span>
//   //       </div>
//   //     </div>
      
//     //   <div className="ssidebar-nav">
//     //     <div className="snav-section">
//     //       <div className="snav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
//     //         <BarChart3 className="w-5 h-5" />
//     //         <span>Tableau de bord</span>
//     //       </div>
//     //       <div className="snav-item active">
//     //         <User className="w-5 h-5" />
//     //         <span>Mon profil</span>
//     //       </div>
//     //       <div className="snav-item" onClick={() => handleNavigation('/Applications')}>
//     //         <Briefcase className="w-5 h-5" />
//     //         <span>Mes candidatures</span>
//     //       </div>
//     //       <div className="snav-item">
//     //         <MessageSquare className="w-5 h-5" />
//     //         <span>Messages</span>
//     //         <span className="snav-badge">3</span>
//     //       </div>
//     //       <div className="snav-item">
//     //         <Bell className="w-5 h-5" />
//     //         <span>Notifications</span>
//     //       </div>
//     //     </div>
        
//     //     <div className="snav-section">
//     //       <div className="snav-item">
//     //         <Settings className="w-5 h-5" />
//     //         <span>Paramètres</span>
//     //       </div>
//     //       <div className="snav-item">
//     //         <LogOut className="w-5 h-5" />
//     //         <span>Déconnexion</span>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   // );

//    const Sidebar = () => (
//         <div className="sidebar">
//           <div className="sidebar-header">
//             <div className="logo">
//               <div className="logo-icon">JT</div>
//               <span className="logo-text">JobTracks</span>
//             </div>
//           </div>
          
//           {/* <div className="sidebar-nav">
//             <div className="nav-section" onClick={() => handleNavigation('/CandidateDashboard')}>
//               <div className="nav-item active">
//                 <BarChart3 className="w-5 h-5" />
//                 <span>Tableau de bord</span>
//               </div>
//               <div className="nav-item active" >
//                 <User className="w-5 h-5" />
//                 <span>Mon profil</span>
//               </div>
            
//               <div  className="nav-item" onClick={() => handleNavigation('/Applications')} >
//                 <Briefcase className="w-5 h-5" />
//                 <span>Mes candidatures</span>
//               </div>
//               <div className="nav-item" onClick={() => handleNavigation('/Messages')}>
//                 <MessageSquare className="w-5 h-5" />
//                 <span>Messages</span>
//                 <span className="nav-badge">3</span>
//               </div>
//               <div className="nav-item"onClick={() => handleNavigation('/Notifications')}>
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </div>
//             </div>
            
//             <div className="nav-section">
//               <div className="nav-item" onClick={() => handleNavigation('/settings')}>
//                 <Settings className="w-5 h-5" />
//                 <span>Paramètres</span>
//               </div>
//               <div className="nav-item" onClick={() => handleNavigation('/')}>
//                 <LogOut className="w-5 h-5" />
//                 <span>Déconnexion</span>
//               </div>
//             </div>
//           </div>
//         </div> */}

//              <div className="ssidebar-nav">
//         <div className="snav-section">
//           <div className="snav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
//             <BarChart3 className="w-5 h-5" />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="snav-item active">
//             <User className="w-5 h-5" />
//             <span>Mon profil</span>
//           </div>
//           <div className="snav-item" onClick={() => handleNavigation('/Applications')}>
//             <Briefcase className="w-5 h-5" />
//             <span>Mes candidatures</span>
//           </div>
//           <div className="snav-item" onClick={() => handleNavigation('/Messages')}>
//             <MessageSquare className="w-5 h-5" />
//             <span>Messages</span>
//             <span className="snav-badge">3</span>
//           </div>
//           <div className="snav-item" onClick={() => handleNavigation('/c-Notifications')}>
//             <Bell className="w-5 h-5" />
//             <span>Notifications</span>
//           </div>
//         </div>
        
//         <div className="snav-section" >
//           <div className="snav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings className="w-5 h-5" />
//             <span>Paramètres</span>
//           </div>
//           <div className="snav-item" onClick={() => handleNavigation('/')}>
//             <LogOut className="w-5 h-5" />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//       );

//   const ProfileHeader = () => (
//     <div className="sprofile-header">
//       <div className="sprofile-cover">
//         <div className="sprofile-avatar-container">
//           <img 
//             src={profileData.personalInfo.avatar} 
//             alt="Avatar" 
//             className="sprofile-avatar"
//           />
//           <button className="savatar-edit-btn" onClick={handleImageUpload}>
//             <Camera className="w-4 h-4" />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </div>
//       </div>
//       <div className="sprofile-info">
//         <h1 className="sprofile-name">
//           {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
//         </h1>
//         <p className="sprofile-bio">{profileData.personalInfo.bio}</p>
//         <div className="sprofile-meta">
//           <div className="smeta-item">
//             <MapPin className="w-4 h-4" />
//             <span>{profileData.personalInfo.location}</span>
//           </div>
//           <div className="smeta-item">
//             <Mail className="w-4 h-4" />
//             <span>{profileData.personalInfo.email}</span>
//           </div>
//           <div className="smeta-item">
//             <Phone className="w-4 h-4" />
//             <span>{profileData.personalInfo.phone}</span>
//           </div>
//         </div>
//         <div className="sprofile-actions">
//           <button className="sbtn-primary" onClick={() => startEditing('personalInfo')}>
//             <Edit3 className="w-4 h-4 mr-2" />
//             Modifier le profil
//           </button>
//           <button className="sbtn-secondary">
//             <Download className="w-4 h-4 mr-2" />
//             Télécharger CV
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const ExperienceSection = () => (
//     <div className="sprofile-section">
//       <div className="ssection-header">
//         <h2 className="ssection-title">
//           <Briefcase className="w-5 h-5 mr-2" />
//           Expérience professionnelle
//         </h2>
//         <button className="sbtn-icon" onClick={addExperience}>
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="sexperience-list">
//         {profileData.experiences.map((exp) => (
//           <div key={exp.id} className="sexperience-item">
//             <div className="sexperience-content">
//               <div className="sexperience-header">
//                 <h3 className="sexperience-title">{exp.position}</h3>
//                 <div className="sexperience-actions">
//                   <button className="sbtn-icon-sm" onClick={() => startEditing('experiences')}>
//                     <Edit3 className="w-3 h-3" />
//                   </button>
//                   <button className="sbtn-icon-sm" onClick={() => deleteExperience(exp.id)}>
//                     <Trash2 className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//               <div className="sexperience-company">{exp.company}</div>
//               <div className="sexperience-period">
//                 {exp.startDate} - {exp.endDate === 'present' ? 'Présent' : exp.endDate}
//               </div>
//               <div className="sexperience-location">
//                 <MapPin className="w-3 h-3 mr-1" />
//                 {exp.location}
//               </div>
//               <p className="sexperience-description">{exp.description}</p>
//               {exp.technologies && exp.technologies.length > 0 && (
//                 <div className="sexperience-technologies">
//                   {exp.technologies.map((tech, index) => (
//                     <span key={index} className="tech-badge">{tech}</span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const EducationSection = () => (
//     <div className="sprofile-section">
//       <div className="ssection-header">
//         <h2 className="ssection-title">
//           <GraduationCap className="w-5 h-5 mr-2" />
//           Formation
//         </h2>
//         <button className="sbtn-icon" onClick={addEducation}>
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="seducation-list">
//         {profileData.education.map((edu) => (
//           <div key={edu.id} className="seducation-item">
//             <div className="seducation-content">
//               <div className="seducation-header">
//                 <h3 className="seducation-title">{edu.degree}</h3>
//                 <button className="sbtn-icon-sm">
//                   <Edit3 className="w-3 h-3" />
//                 </button>
//               </div>
//               <div className="seducation-school">{edu.school}</div>
//               <div className="seducation-field">{edu.field}</div>
//               <div className="seducation-period">{edu.startDate} - {edu.endDate}</div>
//               <div className="seducation-location">
//                 <MapPin className="w-3 h-3 mr-1" />
//                 {edu.location}
//               </div>
//               <p className="seducation-description">{edu.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const SkillsSection = () => (
//     <div className="sprofile-section">
//       <div className="ssection-header">
//         <h2 className="ssection-title">
//           <Star className="w-5 h-5 mr-2" />
//           Compétences
//         </h2>
//         <button className="sbtn-icon" onClick={addSkill}>
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="sskills-grid">
//         {profileData.skills.map((skill) => (
//           <div key={skill.id} className="sskill-item">
//             <div className="sskill-header">
//               <span className="sskill-name">{skill.name}</span>
//               <div className="sskill-actions">
//                 <button className="sbtn-icon-sm">
//                   <Edit3 className="w-3 h-3" />
//                 </button>
//                 <button className="sbtn-icon-sm" onClick={() => deleteSkill(skill.id)}>
//                   <Trash2 className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//             <div className="sskill-category">{skill.category}</div>
//             <div className="sskill-progress">
//               <div 
//                 className="sskill-progress-bar"
//                 style={{ width: `${skill.level}%` }}
//               ></div>
//             </div>
//             <div className="sskill-level">{skill.level}%</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const LanguagesSection = () => (
//     <div className="sprofile-section">
//       <div className="ssection-header">
//         <h2 className="ssection-title">
//           <Languages className="w-5 h-5 mr-2" />
//           Langues
//         </h2>
//         <button className="sbtn-icon">
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="slanguages-list">
//         {profileData.languages.map((lang) => (
//           <div key={lang.id} className="slanguage-item">
//             <span className="slanguage-name">{lang.name}</span>
//             <span className="slanguage-level">{lang.level}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const CertificationsSection = () => (
//     <div className="sprofile-section">
//       <div className="ssection-header">
//         <h2 className="ssection-title">
//           <Award className="w-5 h-5 mr-2" />
//           Certifications
//         </h2>
//         <button className="sbtn-icon">
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="scertifications-list">
//         {profileData.certifications.map((cert) => (
//           <div key={cert.id} className="scertification-item">
//             <div className="scertification-content">
//               <h3 className="scertification-name">{cert.name}</h3>
//               <div className="scertification-issuer">{cert.issuer}</div>
//               <div className="scertification-date">
//                 Délivré en {cert.date}
//                 {cert.expiryDate && ` • Expire en ${cert.expiryDate}`}
//               </div>
//               <div className="scertification-id">ID: {cert.credentialId}</div>
//             </div>
//             <button className="sbtn-icon-sm">
//               <Edit3 className="w-3 h-3" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="dashboard">
//       <Sidebar />
      
//       <div className="smain-content">
//         <div className="stop-bar">
//           <div className="sbreadcrumb">
//             <span 
//               className="sbreadcrumb-item clickable" 
//               onClick={() => navigate('/')}
//               style={{ cursor: 'pointer' }}
//             >
//               Accueil
//             </span>
//             <span className="sbreadcrumb-separator">/</span>
//             <span 
//               className="sbreadcrumb-item clickable" 
//               onClick={() => navigate('/CandidateDashboard')}
//               style={{ cursor: 'pointer' }}
//             >
//               Tableau de bord
//             </span>
//             <span className="sbreadcrumb-separator">/</span>
//             <span className="sbreadcrumb-item active">Mon profil</span>
//           </div>
          
//           <div className="stop-actions">
//             <div className="ssearch-box">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Rechercher..."
//                 className="search-input"
//               />
//             </div>
            
//             <button className="snotification-btn">
//               <Bell className="w-5 h-5" />
//               <span className="snotification-dot"></span>
//             </button>
            
//             <div className="suser-avatar">
//               <img src={profileData.personalInfo.avatar} alt="Avatar" />
//             </div>
//           </div>
//         </div>

//         <div className="sprofile-content">
//           <ProfileHeader />
          
//           <div className="sprofile-body">
//             <div className="sprofile-main">
//               <ExperienceSection />
//               <EducationSection />
//             </div>
            
//             <div className="sprofile-sidebar">
//               <SkillsSection />
//               <LanguagesSection />
//               <CertificationsSection />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateProfilePage;




// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   User, 
//   Briefcase, 
//   FileText, 
//   MessageSquare, 
//   Bell,
//   Settings,
//   LogOut,
//   Search,
//   Camera,
//   Edit3,
//   Save,
//   X,
//   Plus,
//   Trash2,
//   MapPin,
//   Mail,
//   Phone,
//   Calendar,
//   Globe,
//   Linkedin,
//   Github,
//   Download,
//   Upload,
//   Star,
//   Award,
//   GraduationCap,
//   Languages,
//   BarChart3
// } from 'lucide-react';

// const CandidateProfilePage = () => {
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   // État pour le mode édition
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);
//   const [editingItemId, setEditingItemId] = useState(null);
  
//   // États pour les données du profil
//   const [profileData, setProfileData] = useState({
//     personalInfo: {
//       firstName: 'Jean',
//       lastName: 'Dupont',
//       email: 'jean.dupont@email.com',
//       phone: '+33 6 12 34 56 78',
//       location: 'Paris, France',
//       birthDate: '1990-05-15',
//       website: 'https://jeandupont.dev',
//       linkedin: 'https://linkedin.com/in/jeandupont',
//       github: 'https://github.com/jeandupont',
//       bio: 'Développeur Full Stack passionné avec 5 ans d\'expérience dans le développement d\'applications web modernes. Spécialisé en React, Node.js et les technologies cloud.',
//       avatar: 'https://via.placeholder.com/150x150'
//     },
//     experiences: [
//       {
//         id: 1,
//         company: 'TechCorp',
//         position: 'Développeur Senior Full Stack',
//         startDate: '2022-01',
//         endDate: 'present',
//         location: 'Paris, France',
//         description: 'Développement d\'applications web complexes avec React et Node.js. Leadership technique d\'une équipe de 4 développeurs.',
//         technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
//       },
//       {
//         id: 2,
//         company: 'StartupXYZ',
//         position: 'Développeur Frontend',
//         startDate: '2020-03',
//         endDate: '2021-12',
//         location: 'Lyon, France',
//         description: 'Création d\'interfaces utilisateur modernes et responsives. Optimisation des performances des applications.',
//         technologies: ['Vue.js', 'TypeScript', 'SASS', 'Webpack']
//       }
//     ],
//     education: [
//       {
//         id: 1,
//         school: 'École Supérieure d\'Informatique',
//         degree: 'Master en Informatique',
//         field: 'Génie Logiciel',
//         startDate: '2018',
//         endDate: '2020',
//         location: 'Paris, France',
//         description: 'Spécialisation en développement logiciel et architectures distribuées.'
//       },
//       {
//         id: 2,
//         school: 'Université Paris-Sud',
//         degree: 'Licence en Informatique',
//         field: 'Informatique Générale',
//         startDate: '2015',
//         endDate: '2018',
//         location: 'Orsay, France',
//         description: 'Formation générale en informatique avec focus sur la programmation et les algorithmes.'
//       }
//     ],
//     skills: [
//       { id: 1, name: 'React', level: 95, category: 'Frontend' },
//       { id: 2, name: 'Node.js', level: 90, category: 'Backend' },
//       { id: 3, name: 'JavaScript', level: 95, category: 'Langage' },
//       { id: 4, name: 'TypeScript', level: 85, category: 'Langage' },
//       { id: 5, name: 'MongoDB', level: 80, category: 'Base de données' },
//       { id: 6, name: 'AWS', level: 75, category: 'Cloud' },
//       { id: 7, name: 'Docker', level: 70, category: 'DevOps' },
//       { id: 8, name: 'Git', level: 90, category: 'Outil' }
//     ],
//     languages: [
//       { id: 1, name: 'Français', level: 'Natif' },
//       { id: 2, name: 'Anglais', level: 'Courant' },
//       { id: 3, name: 'Espagnol', level: 'Intermédiaire' }
//     ],
//     certifications: [
//       {
//         id: 1,
//         name: 'AWS Certified Developer',
//         issuer: 'Amazon Web Services',
//         date: '2023-08',
//         expiryDate: '2026-08',
//         credentialId: 'AWS-DEV-2023-001'
//       },
//       {
//         id: 2,
//         name: 'React Developer Certification',
//         issuer: 'Meta',
//         date: '2022-12',
//         expiryDate: null,
//         credentialId: 'META-REACT-2022-156'
//       }
//     ]
//   });

//   // État temporaire pour l'édition
//   const [tempData, setTempData] = useState({});

//   // const handleNavigation = (route) => {
//   //   console.log('Navigation vers:', route);
//   //   // Ici vous pouvez ajouter la logique de navigation réelle
//   //   alert(`Navigation vers: ${route}`);
//   // };
//      const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const startEditing = (section, itemId = null) => {
//     setEditingSection(section);
//     setEditingItemId(itemId);
    
//     if (itemId && Array.isArray(profileData[section])) {
//       // Édition d'un élément spécifique dans un tableau
//       const item = profileData[section].find(item => item.id === itemId);
//       setTempData({ ...item });
//     } else if (section === 'personalInfo') {
//       // Édition des informations personnelles
//       setTempData({ ...profileData.personalInfo });
//     } else {
//       // Ajout d'un nouvel élément
//       setTempData({});
//     }
//     setIsEditing(true);
//   };

//   const cancelEdit = () => {
//     setIsEditing(false);
//     setEditingSection(null);
//     setEditingItemId(null);
//     setTempData({});
//   };

//   const saveEdit = () => {
//     if (editingSection === 'personalInfo') {
//       setProfileData(prev => ({
//         ...prev,
//         personalInfo: { ...prev.personalInfo, ...tempData }
//       }));
//     } else if (Array.isArray(profileData[editingSection])) {
//       if (editingItemId) {
//         // Mise à jour d'un élément existant
//         setProfileData(prev => ({
//           ...prev,
//           [editingSection]: prev[editingSection].map(item => 
//             item.id === editingItemId ? { ...item, ...tempData } : item
//           )
//         }));
//       } else {
//         // Ajout d'un nouvel élément
//         const newItem = { ...tempData, id: Date.now() };
//         setProfileData(prev => ({
//           ...prev,
//           [editingSection]: [...prev[editingSection], newItem]
//         }));
//       }
//     }
    
//     setIsEditing(false);
//     setEditingSection(null);
//     setEditingItemId(null);
//     setTempData({});
//   };

//   const handleImageUpload = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfileData(prev => ({
//           ...prev,
//           personalInfo: {
//             ...prev.personalInfo,
//             avatar: e.target.result
//           }
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const deleteItem = (section, id) => {
//     setProfileData(prev => ({
//       ...prev,
//       [section]: prev[section].filter(item => item.id !== id)
//     }));
//   };

//   // Fonction pour générer et télécharger le CV
//   const downloadCV = () => {
//     const cvContent = generateCVContent();
//     const blob = new Blob([cvContent], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `CV_${profileData.personalInfo.firstName}_${profileData.personalInfo.lastName}.html`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const generateCVContent = () => {
//     return `
//     <!DOCTYPE html>
//     <html lang="fr">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>CV - ${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}</title>
//         <style>
//             body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
//             .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
//             .section { margin-bottom: 30px; }
//             .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
//             .item { margin-bottom: 20px; }
//             .item h3 { margin: 0 0 5px 0; color: #555; }
//             .item .meta { color: #666; font-style: italic; margin-bottom: 10px; }
//             .skills { display: flex; flex-wrap: wrap; gap: 10px; }
//             .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; font-size: 14px; }
//             .tech-badge { background: #e1f5fe; color: #0277bd; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; margin-bottom: 5px; display: inline-block; }
//         </style>
//     </head>
//     <body>
//         <div class="header">
//             <h1>${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}</h1>
//             <p style="font-size: 16px; margin: 10px 0;">${profileData.personalInfo.bio}</p>
//             <p>${profileData.personalInfo.email} | ${profileData.personalInfo.phone} | ${profileData.personalInfo.location}</p>
//         </div>

//         <div class="section">
//             <h2>Expérience Professionnelle</h2>
//             ${profileData.experiences.map(exp => `
//                 <div class="item">
//                     <h3>${exp.position} - ${exp.company}</h3>
//                     <p class="meta">${exp.startDate} - ${exp.endDate === 'present' ? 'Présent' : exp.endDate} | ${exp.location}</p>
//                     <p>${exp.description}</p>
//                     ${exp.technologies && exp.technologies.length > 0 ? `
//                         <div style="margin-top: 10px;">
//                             <strong>Technologies utilisées:</strong><br>
//                             ${exp.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
//                         </div>
//                     ` : ''}
//                 </div>
//             `).join('')}
//         </div>

//         <div class="section">
//             <h2>Formation</h2>
//             ${profileData.education.map(edu => `
//                 <div class="item">
//                     <h3>${edu.degree} - ${edu.field}</h3>
//                     <p class="meta">${edu.school} | ${edu.startDate} - ${edu.endDate} | ${edu.location}</p>
//                     <p>${edu.description}</p>
//                 </div>
//             `).join('')}
//         </div>

//         <div class="section">
//             <h2>Compétences</h2>
//             <div class="skills">
//                 ${profileData.skills.map(skill => `<span class="skill">${skill.name} (${skill.level}%)</span>`).join('')}
//             </div>
//         </div>

//         <div class="section">
//             <h2>Langues</h2>
//             ${profileData.languages.map(lang => `<p><strong>${lang.name}:</strong> ${lang.level}</p>`).join('')}
//         </div>

//         <div class="section">
//             <h2>Certifications</h2>
//             ${profileData.certifications.map(cert => `
//                 <div class="item">
//                     <h3>${cert.name}</h3>
//                     <p class="meta">${cert.issuer} | Obtenu en ${cert.date} ${cert.expiryDate ? `| Expire en ${cert.expiryDate}` : ''}</p>
//                     <p><strong>ID de certification:</strong> ${cert.credentialId}</p>
//                 </div>
//             `).join('')}
//         </div>
//     </body>
//     </html>
//     `;
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
//           <div className="nav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
//             <BarChart3 size={20} />
//             <span>Tableau de bord</span>
//           </div>
//           <div className="nav-item active">
//             <User size={20} />
//             <span>Mon profil</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/Applications')}>
//             <Briefcase size={20} />
//             <span>Mes candidatures</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/Messages')}>
//             <MessageSquare size={20} />
//             <span>Messages</span>
//             <span className="nav-badge">3</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/c-Notifications')}>
//             <Bell size={20} />
//             <span>Notifications</span>
//           </div>
//         </div>
        
//         <div className="nav-section">
//           <div className="nav-item" onClick={() => handleNavigation('/settings')}>
//             <Settings size={20} />
//             <span>Paramètres</span>
//           </div>
//           <div className="nav-item" onClick={() => handleNavigation('/')}>
//             <LogOut size={20} />
//             <span>Déconnexion</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ProfileHeader = () => (
//     <div className="profile-header">
//       <div className="profile-cover">
//         <div className="profile-avatar-container">
//           <img 
//             src={profileData.personalInfo.avatar} 
//             alt="Avatar" 
//             className="profile-avatar"
//           />
//           <button className="avatar-edit-btn" onClick={handleImageUpload}>
//             <Camera size={16} />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </div>
//       </div>
//       <div className="profile-info">
//         <h1 className="profile-name">
//           {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
//         </h1>
//         <p className="profile-bio">{profileData.personalInfo.bio}</p>
//         <div className="profile-meta">
//           <div className="meta-item">
//             <MapPin size={16} />
//             <span>{profileData.personalInfo.location}</span>
//           </div>
//           <div className="meta-item">
//             <Mail size={16} />
//             <span>{profileData.personalInfo.email}</span>
//           </div>
//           <div className="meta-item">
//             <Phone size={16} />
//             <span>{profileData.personalInfo.phone}</span>
//           </div>
//         </div>
//         <div className="profile-actions">
//           <button className="btn-primary" onClick={() => startEditing('personalInfo')}>
//             <Edit3 size={16} />
//             Modifier le profil
//           </button>
//           <button className="btn-secondary" onClick={downloadCV}>
//             <Download size={16} />
//             Télécharger CV
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const ExperienceSection = () => (
//     <div className="profile-section">
//       <div className="section-header">
//         <h2 className="section-title">
//           <Briefcase size={20} />
//           Expérience professionnelle
//         </h2>
//         <button className="btn-icon" onClick={() => startEditing('experiences')}>
//           <Plus size={16} />
//         </button>
//       </div>
//       <div className="experience-list">
//         {profileData.experiences.map((exp) => (
//           <div key={exp.id} className="experience-item">
//             <div className="experience-content">
//               <div className="experience-header">
//                 <h3 className="experience-title">{exp.position}</h3>
//                 <div className="experience-actions">
//                   <button className="btn-icon-sm" onClick={() => startEditing('experiences', exp.id)}>
//                     <Edit3 size={12} />
//                   </button>
//                   <button className="btn-icon-sm" onClick={() => deleteItem('experiences', exp.id)}>
//                     <Trash2 size={12} />
//                   </button>
//                 </div>
//               </div>
//               <div className="experience-company">{exp.company}</div>
//               <div className="experience-period">
//                 {exp.startDate} - {exp.endDate === 'present' ? 'Présent' : exp.endDate}
//               </div>
//               <div className="experience-location">
//                 <MapPin size={12} />
//                 {exp.location}
//               </div>
//               <p className="experience-description">{exp.description}</p>
//               {exp.technologies && exp.technologies.length > 0 && (
//                 <div className="experience-technologies">
//                   {exp.technologies.map((tech, index) => (
//                     <span key={index} className="tech-badge">{tech}</span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const EducationSection = () => (
//     <div className="profile-section">
//       <div className="section-header">
//         <h2 className="section-title">
//           <GraduationCap size={20} />
//           Formation
//         </h2>
//         <button className="btn-icon" onClick={() => startEditing('education')}>
//           <Plus size={16} />
//         </button>
//       </div>
//       <div className="education-list">
//         {profileData.education.map((edu) => (
//           <div key={edu.id} className="education-item">
//             <div className="education-content">
//               <div className="education-header">
//                 <h3 className="education-title">{edu.degree}</h3>
//                 <div className="education-actions">
//                   <button className="btn-icon-sm" onClick={() => startEditing('education', edu.id)}>
//                     <Edit3 size={12} />
//                   </button>
//                   <button className="btn-icon-sm" onClick={() => deleteItem('education', edu.id)}>
//                     <Trash2 size={12} />
//                   </button>
//                 </div>
//               </div>
//               <div className="education-school">{edu.school}</div>
//               <div className="education-field">{edu.field}</div>
//               <div className="education-period">{edu.startDate} - {edu.endDate}</div>
//               <div className="education-location">
//                 <MapPin size={12} />
//                 {edu.location}
//               </div>
//               <p className="education-description">{edu.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const SkillsSection = () => (
//     <div className="profile-section">
//       <div className="section-header">
//         <h2 className="section-title">
//           <Star size={20} />
//           Compétences
//         </h2>
//         <button className="btn-icon" onClick={() => startEditing('skills')}>
//           <Plus size={16} />
//         </button>
//       </div>
//       <div className="skills-grid">
//         {profileData.skills.map((skill) => (
//           <div key={skill.id} className="skill-item">
//             <div className="skill-header">
//               <span className="skill-name">{skill.name}</span>
//               <div className="skill-actions">
//                 <button className="btn-icon-sm" onClick={() => startEditing('skills', skill.id)}>
//                   <Edit3 size={12} />
//                 </button>
//                 <button className="btn-icon-sm" onClick={() => deleteItem('skills', skill.id)}>
//                   <Trash2 size={12} />
//                 </button>
//               </div>
//             </div>
//             <div className="skill-category">{skill.category}</div>
//             <div className="skill-progress">
//               <div 
//                 className="skill-progress-bar"
//                 style={{ width: `${skill.level}%` }}
//               ></div>
//             </div>
//             <div className="skill-level">{skill.level}%</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const LanguagesSection = () => (
//     <div className="profile-section">
//       <div className="section-header">
//         <h2 className="section-title">
//           <Languages size={20} />
//           Langues
//         </h2>
//         <button className="btn-icon" onClick={() => startEditing('languages')}>
//           <Plus size={16} />
//         </button>
//       </div>
//       <div className="languages-list">
//         {profileData.languages.map((lang) => (
//           <div key={lang.id} className="language-item">
//             <div className="language-content">
//               <span className="language-name">{lang.name}</span>
//               <span className="language-level">{lang.level}</span>
//             </div>
//             <div className="language-actions">
//               <button className="btn-icon-sm" onClick={() => startEditing('languages', lang.id)}>
//                 <Edit3 size={12} />
//               </button>
//               <button className="btn-icon-sm" onClick={() => deleteItem('languages', lang.id)}>
//                 <Trash2 size={12} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const CertificationsSection = () => (
//     <div className="profile-section">
//       <div className="section-header">
//         <h2 className="section-title">
//           <Award size={20} />
//           Certifications
//         </h2>
//         <button className="btn-icon" onClick={() => startEditing('certifications')}>
//           <Plus size={16} />
//         </button>
//       </div>
//       <div className="certifications-list">
//         {profileData.certifications.map((cert) => (
//           <div key={cert.id} className="certification-item">
//             <div className="certification-content">
//               <h3 className="certification-name">{cert.name}</h3>
//               <div className="certification-issuer">{cert.issuer}</div>
//               <div className="certification-date">
//                 Délivré en {cert.date}
//                 {cert.expiryDate && ` • Expire en ${cert.expiryDate}`}
//               </div>
//               <div className="certification-id">ID: {cert.credentialId}</div>
//             </div>
//             <div className="certification-actions">
//               <button className="btn-icon-sm" onClick={() => startEditing('certifications', cert.id)}>
//                 <Edit3 size={12} />
//               </button>
//               <button className="btn-icon-sm" onClick={() => deleteItem('certifications', cert.id)}>
//                 <Trash2 size={12} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const EditModal = () => {
//     if (!isEditing) return null;

//     const renderPersonalInfoForm = () => (
//       <div className="edit-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label>Prénom</label>
//             <input
//               type="text"
//               value={tempData.firstName || ''}
//               onChange={(e) => setTempData(prev => ({ ...prev, firstName: e.target.value }))}
//             />
//           </div>
//           <div className="form-group">
//             <label>Nom</label>
//             <input
//               type="text"
//               value={tempData.lastName || ''}
//               onChange={(e) => setTempData(prev => ({ ...prev, lastName: e.target.value }))}
//             />
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={tempData.email || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, email: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Téléphone</label>
//           <input
//             type="tel"
//             value={tempData.phone || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, phone: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Localisation</label>
//           <input
//             type="text"
//             value={tempData.location || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Bio</label>
//           <textarea
//             value={tempData.bio || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, bio: e.target.value }))}
//             rows={4}
//           />
//         </div>
//       </div>
//     );

//     const renderExperienceForm = () => (
//       <div className="edit-form">
//         <div className="form-group">
//           <label>Poste</label>
//           <input
//             type="text"
//             value={tempData.position || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, position: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Entreprise</label>
//           <input
//             type="text"
//             value={tempData.company || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, company: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-row">
//           <div className="form-group">
//             <label>Date de début</label>
//             <input
//               type="month"
//               value={tempData.startDate || ''}
//               onChange={(e) => setTempData(prev => ({ ...prev, startDate: e.target.value }))}
//             />
//           </div>
//           <div className="form-group">
//             <label>Date de fin</label>
//             <input
//               type="month"
//               value={tempData.endDate === 'present' ? '' : tempData.endDate || ''}
//               onChange={(e) => setTempData(prev => ({ ...prev, endDate: e.target.value || 'present' }))}
//             />
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label>Lieu</label>
//           <input
//             type="text"
//             value={tempData.location || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             value={tempData.description || ''}
//             onChange={(e) => setTempData(prev => ({ ...prev, description: e.target.value }))}
//             rows={4}
//           />
//         </div>


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  Search,
  Camera,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Globe,
  Linkedin,
  Github,
  Download,
  Upload,
  Star,
  Award,
  GraduationCap,
  Languages,
  BarChart3
} from 'lucide-react';

const CandidateProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  // État pour le mode édition
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  
  // Fonction pour obtenir les informations de l'utilisateur connecté
  const getUserInfo = () => {
    if (!user) return { firstName: '', lastName: '', email: '', phone: '', location: '' };
    
    const nameParts = user.name ? user.name.split(' ') : ['', ''];
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || ''
    };
  };

  // États pour les données du profil - initialisés avec les données utilisateur
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      birthDate: '',
      website: '',
      linkedin: '',
      github: '',
      bio: 'Développeur Full Stack passionné avec 5 ans d\'expérience dans le développement d\'applications web modernes. Spécialisé en React, Node.js et les technologies cloud.',
      avatar: 'https://via.placeholder.com/150x150'
    },
    experiences: [
      {
        id: 1,
        company: 'TechCorp',
        position: 'Développeur Senior Full Stack',
        startDate: '2022-01',
        endDate: 'present',
        location: 'Paris, France',
        description: 'Développement d\'applications web complexes avec React et Node.js. Leadership technique d\'une équipe de 4 développeurs.',
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Développeur Frontend',
        startDate: '2020-03',
        endDate: '2021-12',
        location: 'Lyon, France',
        description: 'Création d\'interfaces utilisateur modernes et responsives. Optimisation des performances des applications.',
        technologies: ['Vue.js', 'TypeScript', 'SASS', 'Webpack']
      }
    ],
    education: [
      {
        id: 1,
        school: 'École Supérieure d\'Informatique',
        degree: 'Master en Informatique',
        field: 'Génie Logiciel',
        startDate: '2018',
        endDate: '2020',
        location: 'Paris, France',
        description: 'Spécialisation en développement logiciel et architectures distribuées.'
      },
      {
        id: 2,
        school: 'Université Paris-Sud',
        degree: 'Licence en Informatique',
        field: 'Informatique Générale',
        startDate: '2015',
        endDate: '2018',
        location: 'Orsay, France',
        description: 'Formation générale en informatique avec focus sur la programmation et les algorithmes.'
      }
    ],
    skills: [
      { id: 1, name: 'React', level: 95, category: 'Frontend' },
      { id: 2, name: 'Node.js', level: 90, category: 'Backend' },
      { id: 3, name: 'JavaScript', level: 95, category: 'Langage' },
      { id: 4, name: 'TypeScript', level: 85, category: 'Langage' },
      { id: 5, name: 'MongoDB', level: 80, category: 'Base de données' },
      { id: 6, name: 'AWS', level: 75, category: 'Cloud' },
      { id: 7, name: 'Docker', level: 70, category: 'DevOps' },
      { id: 8, name: 'Git', level: 90, category: 'Outil' }
    ],
    languages: [
      { id: 1, name: 'Français', level: 'Natif' },
      { id: 2, name: 'Anglais', level: 'Courant' },
      { id: 3, name: 'Espagnol', level: 'Intermédiaire' }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-08',
        expiryDate: '2026-08',
        credentialId: 'AWS-DEV-2023-001'
      },
      {
        id: 2,
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022-12',
        expiryDate: null,
        credentialId: 'META-REACT-2022-156'
      }
    ]
  });

  // Initialisation des données avec les informations utilisateur
  useEffect(() => {
    const userInfo = getUserInfo();
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        location: userInfo.location
      }
    }));
  }, [user]);

  // État temporaire pour l'édition
  const [tempData, setTempData] = useState({});

  const handleNavigation = (route) => {
    navigate(route);
  };

  // Fonction pour obtenir le nom complet
  const getFullName = () => {
    if (!user || !user.name) return 'Utilisateur';
    return user.name;
  };

  // Fonction pour obtenir le prénom
  const getFirstName = () => {
    if (!user || !user.name) return 'Utilisateur';
    return user.name.split(' ')[0];
  };

  const startEditing = (section, itemId = null) => {
    setEditingSection(section);
    setEditingItemId(itemId);
    
    if (itemId && Array.isArray(profileData[section])) {
      // Édition d'un élément spécifique dans un tableau
      const item = profileData[section].find(item => item.id === itemId);
      setTempData({ ...item });
    } else if (section === 'personalInfo') {
      // Édition des informations personnelles
      setTempData({ ...profileData.personalInfo });
    } else {
      // Ajout d'un nouvel élément
      setTempData({});
    }
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingSection(null);
    setEditingItemId(null);
    setTempData({});
  };

  const saveEdit = () => {
    if (editingSection === 'personalInfo') {
      setProfileData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...tempData }
      }));
    } else if (Array.isArray(profileData[editingSection])) {
      if (editingItemId) {
        // Mise à jour d'un élément existant
        setProfileData(prev => ({
          ...prev,
          [editingSection]: prev[editingSection].map(item => 
            item.id === editingItemId ? { ...item, ...tempData } : item
          )
        }));
      } else {
        // Ajout d'un nouvel élément
        const newItem = { ...tempData, id: Date.now() };
        setProfileData(prev => ({
          ...prev,
          [editingSection]: [...prev[editingSection], newItem]
        }));
      }
    }
    
    setIsEditing(false);
    setEditingSection(null);
    setEditingItemId(null);
    setTempData({});
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            avatar: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteItem = (section, id) => {
    setProfileData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // Fonction pour générer et télécharger le CV
  const downloadCV = () => {
    const cvContent = generateCVContent();
    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${profileData.personalInfo.firstName}_${profileData.personalInfo.lastName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateCVContent = () => {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV - ${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
            .item { margin-bottom: 20px; }
            .item h3 { margin: 0 0 5px 0; color: #555; }
            .item .meta { color: #666; font-style: italic; margin-bottom: 10px; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; font-size: 14px; }
            .tech-badge { background: #e1f5fe; color: #0277bd; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; margin-bottom: 5px; display: inline-block; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}</h1>
            <p style="font-size: 16px; margin: 10px 0;">${profileData.personalInfo.bio}</p>
            <p>${profileData.personalInfo.email} | ${profileData.personalInfo.phone} | ${profileData.personalInfo.location}</p>
        </div>

        <div class="section">
            <h2>Expérience Professionnelle</h2>
            ${profileData.experiences.map(exp => `
                <div class="item">
                    <h3>${exp.position} - ${exp.company}</h3>
                    <p class="meta">${exp.startDate} - ${exp.endDate === 'present' ? 'Présent' : exp.endDate} | ${exp.location}</p>
                    <p>${exp.description}</p>
                    ${exp.technologies && exp.technologies.length > 0 ? `
                        <div style="margin-top: 10px;">
                            <strong>Technologies utilisées:</strong><br>
                            ${exp.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Formation</h2>
            ${profileData.education.map(edu => `
                <div class="item">
                    <h3>${edu.degree} - ${edu.field}</h3>
                    <p class="meta">${edu.school} | ${edu.startDate} - ${edu.endDate} | ${edu.location}</p>
                    <p>${edu.description}</p>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Compétences</h2>
            <div class="skills">
                ${profileData.skills.map(skill => `<span class="skill">${skill.name} (${skill.level}%)</span>`).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Langues</h2>
            ${profileData.languages.map(lang => `<p><strong>${lang.name}:</strong> ${lang.level}</p>`).join('')}
        </div>

        <div class="section">
            <h2>Certifications</h2>
            ${profileData.certifications.map(cert => `
                <div class="item">
                    <h3>${cert.name}</h3>
                    <p class="meta">${cert.issuer} | Obtenu en ${cert.date} ${cert.expiryDate ? `| Expire en ${cert.expiryDate}` : ''}</p>
                    <p><strong>ID de certification:</strong> ${cert.credentialId}</p>
                </div>
            `).join('')}
        </div>
    </body>
    </html>
    `;
  };

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
          <div className="nav-item" onClick={() => handleNavigation('/CandidateDashboard')}>
            <BarChart3 size={20} />
            <span>Tableau de bord</span>
          </div>
          <div className="nav-item active">
            <User size={20} />
            <span>Mon profil</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/Applications')}>
            <Briefcase size={20} />
            <span>Mes candidatures</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/Messages')}>
            <MessageSquare size={20} />
            <span>Messages</span>
            <span className="nav-badge">3</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/c-Notifications')}>
            <Bell size={20} />
            <span>Notifications</span>
          </div>
        </div>
        
        <div className="nav-section">
          <div className="nav-item" onClick={() => handleNavigation('/settings')}>
            <Settings size={20} />
            <span>Paramètres</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('/')}>
            <LogOut size={20} />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileHeader = () => (
    <div className="profile-header">
      <div className="profile-cover">
        <div className="profile-avatar-container">
          <img 
            src={user?.avatar || profileData.personalInfo.avatar} 
            alt="Avatar" 
            className="profile-avatar"
          />
          <button className="avatar-edit-btn" onClick={handleImageUpload}>
            <Camera size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className="profile-info">
        <h1 className="profile-name">
          {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
        </h1>
        <p className="profile-bio">{profileData.personalInfo.bio}</p>
        <div className="profile-meta">
          <div className="meta-item">
            <MapPin size={16} />
            <span>{profileData.personalInfo.location || 'Localisation non renseignée'}</span>
          </div>
          <div className="meta-item">
            <Mail size={16} />
            <span>{profileData.personalInfo.email}</span>
          </div>
          {profileData.personalInfo.phone && (
            <div className="meta-item">
              <Phone size={16} />
              <span>{profileData.personalInfo.phone}</span>
            </div>
          )}
        </div>
        <div className="profile-actions">
          <button className="btn-primary" onClick={() => startEditing('personalInfo')}>
            <Edit3 size={16} />
            Modifier le profil
          </button>
          <button className="btn-secondary" onClick={downloadCV}>
            <Download size={16} />
            Télécharger CV
          </button>
        </div>
      </div>
    </div>
  );

  const ExperienceSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <Briefcase size={20} />
          Expérience professionnelle
        </h2>
        <button className="btn-icon" onClick={() => startEditing('experiences')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="experience-list">
        {profileData.experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-content">
              <div className="experience-header">
                <h3 className="experience-title">{exp.position}</h3>
                <div className="experience-actions">
                  <button className="btn-icon-sm" onClick={() => startEditing('experiences', exp.id)}>
                    <Edit3 size={12} />
                  </button>
                  <button className="btn-icon-sm" onClick={() => deleteItem('experiences', exp.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="experience-company">{exp.company}</div>
              <div className="experience-period">
                {exp.startDate} - {exp.endDate === 'present' ? 'Présent' : exp.endDate}
              </div>
              <div className="experience-location">
                <MapPin size={12} />
                {exp.location}
              </div>
              <p className="experience-description">{exp.description}</p>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="experience-technologies">
                  {exp.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EducationSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <GraduationCap size={20} />
          Formation
        </h2>
        <button className="btn-icon" onClick={() => startEditing('education')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="education-list">
        {profileData.education.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="education-content">
              <div className="education-header">
                <h3 className="education-title">{edu.degree}</h3>
                <div className="education-actions">
                  <button className="btn-icon-sm" onClick={() => startEditing('education', edu.id)}>
                    <Edit3 size={12} />
                  </button>
                  <button className="btn-icon-sm" onClick={() => deleteItem('education', edu.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="education-school">{edu.school}</div>
              <div className="education-field">{edu.field}</div>
              <div className="education-period">{edu.startDate} - {edu.endDate}</div>
              <div className="education-location">
                <MapPin size={12} />
                {edu.location}
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillsSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <Star size={20} />
          Compétences
        </h2>
        <button className="btn-icon" onClick={() => startEditing('skills')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="skills-grid">
        {profileData.skills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <div className="skill-actions">
                <button className="btn-icon-sm" onClick={() => startEditing('skills', skill.id)}>
                  <Edit3 size={12} />
                </button>
                <button className="btn-icon-sm" onClick={() => deleteItem('skills', skill.id)}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="skill-category">{skill.category}</div>
            <div className="skill-progress">
              <div 
                className="skill-progress-bar"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <div className="skill-level">{skill.level}%</div>
          </div>
        ))}
      </div>
    </div>
  );

  const LanguagesSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <Languages size={20} />
          Langues
        </h2>
        <button className="btn-icon" onClick={() => startEditing('languages')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="languages-list">
        {profileData.languages.map((lang) => (
          <div key={lang.id} className="language-item">
            <div className="language-content">
              <span className="language-name">{lang.name}</span>
              <span className="language-level">{lang.level}</span>
            </div>
            <div className="language-actions">
              <button className="btn-icon-sm" onClick={() => startEditing('languages', lang.id)}>
                <Edit3 size={12} />
              </button>
              <button className="btn-icon-sm" onClick={() => deleteItem('languages', lang.id)}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CertificationsSection = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <Award size={20} />
          Certifications
        </h2>
        <button className="btn-icon" onClick={() => startEditing('certifications')}>
          <Plus size={16} />
        </button>
      </div>
      <div className="certifications-list">
        {profileData.certifications.map((cert) => (
          <div key={cert.id} className="certification-item">
            <div className="certification-content">
              <h3 className="certification-name">{cert.name}</h3>
              <div className="certification-issuer">{cert.issuer}</div>
              <div className="certification-date">
                Délivré en {cert.date}
                {cert.expiryDate && ` • Expire en ${cert.expiryDate}`}
              </div>
              <div className="certification-id">ID: {cert.credentialId}</div>
            </div>
            <div className="certification-actions">
              <button className="btn-icon-sm" onClick={() => startEditing('certifications', cert.id)}>
                <Edit3 size={12} />
              </button>
              <button className="btn-icon-sm" onClick={() => deleteItem('certifications', cert.id)}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EditModal = () => {
    if (!isEditing) return null;

    const renderPersonalInfoForm = () => (
      <div className="edit-form">
        <div className="form-row">
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              value={tempData.firstName || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={tempData.lastName || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={tempData.email || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            value={tempData.phone || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Localisation</label>
          <input
            type="text"
            value={tempData.location || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={tempData.bio || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
          />
        </div>
      </div>
    );

    const renderExperienceForm = () => (
      <div className="edit-form">
        <div className="form-group">
          <label>Poste</label>
          <input
            type="text"
            value={tempData.position || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, position: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Entreprise</label>
          <input
            type="text"
            value={tempData.company || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, company: e.target.value }))}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date de début</label>
            <input
              type="month"
              value={tempData.startDate || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Date de fin</label>
            <input
              type="month"
              value={tempData.endDate === 'present' ? '' : tempData.endDate || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, endDate: e.target.value || 'present' }))}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Lieu</label>
          <input
            type="text"
            value={tempData.location || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={tempData.description || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label>Technologies (séparées par des virgules)</label>
          <input
            type="text"
            value={tempData.technologies ? tempData.technologies.join(', ') : ''}
            onChange={(e) => setTempData(prev => ({ 
              ...prev, 
              technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
            }))}
          />
        </div>
      </div>
    );

    const renderEducationForm = () => (
      <div className="edit-form">
        <div className="form-group">
          <label>École/Université</label>
          <input
            type="text"
            value={tempData.school || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, school: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Diplôme</label>
          <input
            type="text"
            value={tempData.degree || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, degree: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Domaine d'étude</label>
          <input
            type="text"
            value={tempData.field || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, field: e.target.value }))}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Année de début</label>
            <input
              type="text"
              value={tempData.startDate || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Année de fin</label>
            <input
              type="text"
              value={tempData.endDate || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Lieu</label>
          <input
            type="text"
            value={tempData.location || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={tempData.description || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
        </div>
      </div>
    );

    const renderSkillForm = () => (
      <div className="edit-form">
        <div className="form-group">
          <label>Nom de la compétence</label>
          <input
            type="text"
            value={tempData.name || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Catégorie</label>
          <select
            value={tempData.category || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Langage">Langage</option>
            <option value="Base de données">Base de données</option>
            <option value="Cloud">Cloud</option>
            <option value="DevOps">DevOps</option>
            <option value="Outil">Outil</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Niveau (0-100%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={tempData.level || 50}
            onChange={(e) => setTempData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
          />
          <span className="range-value">{tempData.level || 50}%</span>
        </div>
      </div>
    );

    const renderLanguageForm = () => (
      <div className="edit-form">
        <div className="form-group">
          <label>Langue</label>
          <input
            type="text"
            value={tempData.name || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Niveau</label>
          <select
            value={tempData.level || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, level: e.target.value }))}
          >
            <option value="">Sélectionner un niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Courant">Courant</option>
            <option value="Bilingue">Bilingue</option>
            <option value="Natif">Natif</option>
          </select>
        </div>
      </div>
    );

    const renderCertificationForm = () => (
      <div className="edit-form">
        <div className="form-group">
          <label>Nom de la certification</label>
          <input
            type="text"
            value={tempData.name || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div className="form-group">
          <label>Organisme émetteur</label>
          <input
            type="text"
            value={tempData.issuer || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, issuer: e.target.value }))}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date d'obtention</label>
            <input
              type="month"
              value={tempData.date || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Date d'expiration (optionnel)</label>
            <input
              type="month"
              value={tempData.expiryDate || ''}
              onChange={(e) => setTempData(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>ID de certification</label>
          <input
            type="text"
            value={tempData.credentialId || ''}
            onChange={(e) => setTempData(prev => ({ ...prev, credentialId: e.target.value }))}
          />
        </div>
      </div>
    );

    const getModalTitle = () => {
      const titles = {
        personalInfo: 'Modifier les informations personnelles',
        experiences: editingItemId ? 'Modifier l\'expérience' : 'Ajouter une expérience',
        education: editingItemId ? 'Modifier la formation' : 'Ajouter une formation',
        skills: editingItemId ? 'Modifier la compétence' : 'Ajouter une compétence',
        languages: editingItemId ? 'Modifier la langue' : 'Ajouter une langue',
        certifications: editingItemId ? 'Modifier la certification' : 'Ajouter une certification'
      };
      return titles[editingSection] || 'Modifier';
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{getModalTitle()}</h2>
            <button className="modal-close" onClick={cancelEdit}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            {editingSection === 'personalInfo' && renderPersonalInfoForm()}
            {editingSection === 'experiences' && renderExperienceForm()}
            {editingSection === 'education' && renderEducationForm()}
            {editingSection === 'skills' && renderSkillForm()}
            {editingSection === 'languages' && renderLanguageForm()}
            {editingSection === 'certifications' && renderCertificationForm()}
          </div>
          
          <div className="modal-footer">
            <button className="btn-secondary" onClick={cancelEdit}>
              Annuler
            </button>
            <button className="btn-primary" onClick={saveEdit}>
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span 
              className="breadcrumb-item clickable" 
              onClick={() => handleNavigation('/')}
            >
              Accueil
            </span>
            <span className="breadcrumb-separator">/</span>
            <span 
              className="breadcrumb-item clickable" 
              onClick={() => handleNavigation('/CandidateDashboard')}
            >
              Tableau de bord
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Mon profil</span>
          </div>
          
          <div className="top-actions">
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="search-input"
              />
            </div>
            
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            
            <div className="user-avatar">
              <img src={profileData.personalInfo.avatar} alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="profile-content">
          <ProfileHeader />
          
          <div className="profile-body">
            <div className="profile-main">
              <ExperienceSection />
              <EducationSection />
            </div>
            
            <div className="profile-sidebar">
              <SkillsSection />
              <LanguagesSection />
              <CertificationsSection />
            </div>
          </div>
        </div>
      </div>

      <EditModal />
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8fafc;
          color: #1e293b;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background-color: #1e293b;
          color: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          z-index: 100;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #334155;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background-color: #3b82f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .logo-text {
          font-size: 18px;
          font-weight: bold;
        }

        .sidebar-nav {
          padding: 20px 0;
        }

        .nav-section {
          margin-bottom: 30px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-item:hover {
          background-color: #334155;
        }

        .nav-item.active {
          background-color: #334155;
          border-right: 3px solid #3b82f6;
        }

        .nav-badge {
          background-color: #ef4444;
          color: white;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: auto;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          background-color: #f8fafc;
          min-height: 100vh;
        }

        .top-bar {
          background-color: white;
          padding: 16px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .breadcrumb-item {
          color: #64748b;
        }

        .breadcrumb-item.active {
          color: #1e293b;
          font-weight: 500;
        }

        .breadcrumb-item.clickable {
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .breadcrumb-item.clickable:hover {
          color: #3b82f6;
        }

        .breadcrumb-separator {
          color: #cbd5e1;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          padding: 8px 12px 8px 36px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          width: 300px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .search-input:focus {
          border-color: #3b82f6;
        }

        .search-box svg {
          position: absolute;
          left: 10px;
          color: #9ca3af;
          pointer-events: none;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .notification-btn:hover {
          background-color: #f1f5f9;
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Profile Content */
        .profile-content {
          padding: 24px;
        }

        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 0;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .profile-cover {
          padding: 40px 40px 20px 40px;
          position: relative;
        }

        .profile-avatar-container {
          position: relative;
          width: 120px;
          height: 72px;
          margin-bottom: 20px;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid white;
          object-fit: cover;
          display: block;
        }

        .avatar-edit-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .avatar-edit-btn:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }

        .profile-info {
          color: white;
          padding: 0 40px 40px 40px;
        }

        .profile-name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .profile-bio {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .profile-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          opacity: 0.9;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary {
          background-color: white;
          color: #1e293b;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background-color: #f8fafc;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        /* Profile Body */
        .profile-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .profile-section {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .profile-section:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e293b;
        }

        .btn-icon {
          background-color: #f1f5f9;
          border: none;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-icon:hover {
          background-color: #e2e8f0;
          transform: scale(1.05);
        }

        .btn-icon-sm {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          color: #64748b;
        }

        .btn-icon-sm:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        /* Experience Section */
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .experience-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .experience-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
          border-color: #3b82f6;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .experience-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .experience-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .experience-item:hover .experience-actions {
          opacity: 1;
        }

        .experience-company {
          font-size: 14px;
          color: #3b82f6;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .experience-period {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .experience-location {
          font-size: 14px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .experience-description {
          font-size: 14px;
          line-height: 1.5;
          color: #475569;
          margin-bottom: 12px;
        }

        .experience-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-badge {
          background-color: #e1f5fe;
          color: #0277bd;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        /* Education Section */
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .education-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .education-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
          border-color: #3b82f6;
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .education-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .education-item:hover .education-actions {
          opacity: 1;
        }

        .education-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .education-school {
          font-size: 14px;
          color: #3b82f6;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .education-field {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .education-period {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .education-location {
          font-size: 14px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .education-description {
          font-size: 14px;
          line-height: 1.5;
          color: #475569;
        }

        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .skill-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .skill-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
          border-color: #3b82f6;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .skill-name {
          font-weight: 500;
          color: #1e293b;
        }

        .skill-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .skill-item:hover .skill-actions {
          opacity: 1;
        }

        .skill-category {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .skill-progress {
          background-color: #f1f5f9;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-progress-bar {
          height: 100%;
          background-color: #3b82f6;
          transition: width 0.5s ease;
        }

        .skill-level {
          font-size: 12px;
          color: #64748b;
          text-align: right;
          margin-top: 4px;
        }

        /* Languages Section */
        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .language-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .language-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
          border-color: #3b82f6;
        }

        .language-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
        }

        .language-name {
          font-weight: 500;
          color: #1e293b;
        }

        .language-level {
          font-size: 14px;
          color: #64748b;
        }

        .language-actions {
          display: flex;
          gap: 4px;
          margin-left: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .language-item:hover .language-actions {
          opacity: 1;
        }

        /* Certifications Section */
        .certifications-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .certification-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .certification-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
          border-color: #3b82f6;
        }

        .certification-content {
          flex: 1;
        }

        .certification-name {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .certification-issuer {
          font-size: 14px;
          color: #3b82f6;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .certification-date {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .certification-id {
          font-size: 12px;
          color: #9ca3af;
        }

        .certification-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .certification-item:hover .certification-actions {
          opacity: 1;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background-color: white;
          border-radius: 12px;
          min-width: 500px;
          max-width: 700px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          color: #64748b;
        }

        .modal-close:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        .modal-body {
          padding: 24px;
          max-height: 400px;
          overflow-y: auto;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 24px;
          border-top: 1px solid #e2e8f0;
          background-color: #f8fafc;
        }

        /* Form Styles */
        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.5;
        }

        .form-group input[type="range"] {
          padding: 0;
          margin: 8px 0;
          cursor: pointer;
        }

        .range-value {
          font-weight: 500;
          color: #3b82f6;
          margin-left: 8px;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .profile-body {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 250px;
          }
          
          .main-content {
            margin-left: 250px;
          }
          
          .search-input {
            width: 250px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .profile-header {
            margin: 0 -24px 24px -24px;
            border-radius: 0;
          }
          
          .profile-cover,
          .profile-info {
            padding: 20px 24px;
          }
          
          .profile-meta {
            flex-direction: column;
            gap: 12px;
          }
          
          .profile-actions {
            flex-direction: column;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            min-width: 90vw;
            max-width: 90vw;
            margin: 20px;
          }
          
          .search-input {
            width: 200px;
          }

          .top-actions {
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .profile-content {
            padding: 16px;
          }
          
          .profile-cover,
          .profile-info {
            padding: 16px;
          }
          
          .profile-avatar-container {
            width: 80px;
            height: 80px;
          }
          
          .profile-avatar {
            width: 80px;
            height: 80px;
          }
          
          .avatar-edit-btn {
            width: 28px;
            height: 28px;
          }
          
          .profile-name {
            font-size: 24px;
          }
          
          .profile-section {
            padding: 16px;
          }
          
          .search-input {
            width: 150px;
          }

          .modal-content {
            min-width: 95vw;
            max-width: 95vw;
            margin: 10px;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 16px;
          }
        }

        /* Animation and Transitions */
        .profile-section,
        .experience-item,
        .education-item,
        .skill-item,
        .language-item,
        .certification-item {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary,
        .btn-secondary,
        .btn-icon,
        .btn-icon-sm,
        .nav-item {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-progress-bar {
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Focus states for accessibility */
        .nav-item:focus-visible,
        .btn-primary:focus-visible,
        .btn-secondary:focus-visible,
        .btn-icon:focus-visible,
        .btn-icon-sm:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Scrollbar styling */
        .modal-body::-webkit-scrollbar,
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .modal-body::-webkit-scrollbar-track,
        .sidebar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .modal-body::-webkit-scrollbar-thumb,
        .sidebar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover,
        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Loading states */
        .loading {
          opacity: 0.6;
          pointer-events: none;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #f3f4f6;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Success states */
        .success-message {
          background-color: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        /* Error states */
        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        /* Empty states */
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
        }

        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #374151;
        }

        .empty-state p {
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        /* Utility classes */
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Print styles */
        @media print {
          .sidebar,
          .top-bar,
          .profile-actions,
          .section-header .btn-icon,
          .experience-actions,
          .education-actions,
          .skill-actions,
          .language-actions,
          .certification-actions {
            display: none !important;
          }

          .main-content {
            margin-left: 0;
          }

          .profile-content {
            padding: 0;
          }

          .profile-header {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc;
          }

          .profile-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidateProfilePage;