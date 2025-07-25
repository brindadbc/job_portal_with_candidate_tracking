// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="logo">
//           <div className="logo-icon">JT</div>
//           JobTracks
//         </Link>
        
//         <ul className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
//           <li><Link to="/">Accueil</Link></li>
//           <li><Link to="/jobs">Emplois</Link></li>
//           <li><Link to="/company">Entreprises</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//         </ul>
        
//         <div className="cta-buttons">
//           {user ? (
//             <>
//               <Link to="/dashboard" className="btn btn-secondary">
//                 Dashboard
//               </Link>
//               <button onClick={handleLogout} className="btn btn-primary">
//                 Déconnexion
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="btn btn-secondary">
//                 Connexion
//               </Link>
//               <Link to="/register" className="btn btn-primary">
//                 S'inscrire
//               </Link>
//             </>
//           )}
//         </div>
        
//         <button 
//           className="mobile-menu"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../contexts/AuthContext';
// import LanguageSwitcher from '../LanguageSwitcher';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="logo">
//           <div className="logo-icon">JT</div>
//           JobTracks
//         </Link>
        
//         <ul className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
//           <li><Link to="/">{t('nav.home')}</Link></li>
//           <li><Link to="/jobs">{t('nav.jobs')}</Link></li>
//           <li><Link to="/company">{t('nav.companies')}</Link></li>
//           <li><Link to="/contact">{t('nav.contact')}</Link></li>
//         </ul>
        
//         <div className="cta-buttons">
//           <LanguageSwitcher />
//           {user ? (
//             <>
//               <Link to="/dashboard" className="btn btn-secondary">
//                 {t('nav.dashboard')}
//               </Link>
//               <button onClick={handleLogout} className="btn btn-primary">
//                 {t('nav.logout')}
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="btn btn-secondary">
//                 {t('nav.login')}
//               </Link>
//               <Link to="/register" className="btn btn-primary">
//                 {t('nav.register')}
//               </Link>
//             </>
//           )}
//         </div>
        
//         <button 
//           className="mobile-menu"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../contexts/AuthContext';
// import LanguageSwitcher from '../LanguageSwitcher';
// import { 
//   User, 
//   Settings, 
//   LogOut, 
//   Bell, 
//   MessageCircle, 
//   ChevronDown,
//   Briefcase,
//   FileText,
//   Star
// } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsProfileOpen(false);
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase();
//   };

//   const getDashboardRoute = () => {
//     // Debug pour voir la valeur du rôle
//     console.log('User role:', user?.role);
//     console.log('User object:', user);
    
//     // Normaliser le rôle (au cas où il y aurait des espaces ou différences de casse)
//     const userRole = user?.role?.toLowerCase()?.trim();
    
//     switch (userRole) {
//       case 'recruiter':
//       case 'recruteur':
//         return '/RecruiterDashboard';
//       case 'candidate':
//       case 'candidat':
//         return '/candidateDashboard';
//       default:
//         // Par défaut, aller vers candidat dashboard
//         console.warn('Role non reconnu, redirection vers candidat dashboard');
//         return '/candidateDashboard';
//     }
//   };

//   // Alternative : fonction pour gérer le clic sur dashboard
//   const handleDashboardClick = (e) => {
//     e.preventDefault();
//     const dashboardRoute = getDashboardRoute();
//     console.log('Redirection vers:', dashboardRoute);
//     navigate(dashboardRoute);
//     setIsProfileOpen(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/" className="logo">
//           <div className="logo-icon">JT</div>
//           JobTracks
//         </Link>
        
//         <ul className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
//           <li><Link to="/">{t('nav.home')}</Link></li>
//           <li><Link to="/jobs">{t('nav.jobs')}</Link></li>
//           <li><Link to="/company">{t('nav.companies')}</Link></li>
//           <li><Link to="/contact">{t('nav.contact')}</Link></li>
//         </ul>
        
//         <div className="cta-buttons">
//           <LanguageSwitcher />
//           {user ? (
//             <div className="user-section">
//               {/* Notifications */}
//               <div className="notification-bell">
//                 <Bell className="w-5 h-5" />
//                 <span className="notification-badge">3</span>
//               </div>
              
//               {/* Messages */}
//               <div className="message-icon">
//                 <MessageCircle className="w-5 h-5" />
//                 <span className="message-badge">5</span>
//               </div>
              
//               {/* User Profile Dropdown */}
//               <div className="profile-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)}>
//                 <div className="profile-avatar">
//                   {user.avatar ? (
//                     <img src={user.avatar} alt={user.name} />
//                   ) : (
//                     <span className="avatar-initials">{getInitials(user.name)}</span>
//                   )}
//                 </div>
//                 <div className="profile-info">
//                   <span className="profile-name">{user.name}</span>
//                   <span className="profile-role">{user.role}</span>
//                 </div>
//                 <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                
//                 {isProfileOpen && (
//                   <div className="dropdown-menu">
//                     {/* Option 1: Utiliser Link avec getDashboardRoute() */}
//                     <Link to={getDashboardRoute()} className="dropdown-item">
//                       <Briefcase className="w-4 h-4" />
//                       {t('nav.dashboard')}
//                     </Link>
                    
//                     {/* Option 2: Utiliser un bouton avec handleDashboardClick (plus de contrôle) */}
//                     {/* 
//                     <button onClick={handleDashboardClick} className="dropdown-item">
//                       <Briefcase className="w-4 h-4" />
//                       {t('nav.dashboard')}
//                     </button>
//                     */}
                    
//                     <Link to="/profile" className="dropdown-item">
//                       <User className="w-4 h-4" />
//                       {t('nav.profile')}
//                     </Link>
//                     <Link to="/settings" className="dropdown-item">
//                       <Settings className="w-4 h-4" />
//                       {t('nav.settings')}
//                     </Link>
                    
//                     {/* Menu spécifique aux candidats */}
//                     {(user.role === 'candidate' || user.role === 'candidat') && (
//                       <>
//                         <Link to="/my-applications" className="dropdown-item">
//                           <FileText className="w-4 h-4" />
//                           Mes candidatures
//                         </Link>
//                         <Link to="/saved-jobs" className="dropdown-item">
//                           <Star className="w-4 h-4" />
//                           Emplois sauvegardés
//                         </Link>
//                       </>
//                     )}
                    
//                     {/* Menu spécifique aux recruteurs */}
//                     {(user.role === 'recruiter' || user.role === 'recruteur') && (
//                       <>
//                         <Link to="/my-jobs" className="dropdown-item">
//                           <FileText className="w-4 h-4" />
//                           Mes offres d'emploi
//                         </Link>
//                         <Link to="/candidates" className="dropdown-item">
//                           <Star className="w-4 h-4" />
//                           Candidats
//                         </Link>
//                       </>
//                     )}
                    
//                     <div className="dropdown-divider"></div>
//                     <button onClick={handleLogout} className="dropdown-item logout">
//                       <LogOut className="w-4 h-4" />
//                       {t('nav.logout')}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="btn btn-secondary">
//                 {t('nav.login')}
//               </Link>
//               <Link to="/register" className="btn btn-primary">
//                 {t('nav.register')}
//               </Link>
//             </>
//           )}
//         </div>
        
//         <button
//           className="mobile-menu"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from '../LanguageSwitcher';
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  MessageCircle, 
  ChevronDown,
  Briefcase,
  FileText,
  Star,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDashboardRoute = () => {
    // Debug pour voir la valeur du rôle
    console.log('User role:', user?.role);
    console.log('User object:', user);
    
    // Normaliser le rôle (au cas où il y aurait des espaces ou différences de casse)
    const userRole = user?.role?.toLowerCase()?.trim();
    
    switch (userRole) {
      case 'admin':
        return '/dashboardAdmin';
      case 'recruiter':
      case 'recruteur':
        return '/RecruiterDashboard';
      case 'candidate':
      case 'candidat':
        return '/candidateDashboard';
      default:
        // Par défaut, aller vers candidat dashboard
        console.warn('Role non reconnu, redirection vers candidat dashboard');
        return '/candidateDashboard';
    }
  };

  // Alternative : fonction pour gérer le clic sur dashboard
  const handleDashboardClick = (e) => {
    e.preventDefault();
    const dashboardRoute = getDashboardRoute();
    console.log('Redirection vers:', dashboardRoute);
    navigate(dashboardRoute);
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">JT</div>
          JobTracks
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
          <li><Link to="/">{t('nav.home')}</Link></li>
          <li><Link to="/jobs">{t('nav.jobs')}</Link></li>
          <li><Link to="/company">{t('nav.companies')}</Link></li>
          <li><Link to="/contact">{t('nav.contact')}</Link></li>
        </ul>
        
        <div className="cta-buttons">
          <LanguageSwitcher />
          {user ? (
            <div className="user-section">
              {/* Notifications */}
              <div className="notification-bell">
                <Bell className="w-5 h-5" />
                <span className="notification-badge">3</span>
              </div>
              
              {/* Messages */}
              <div className="message-icon">
                <MessageCircle className="w-5 h-5" />
                <span className="message-badge">5</span>
              </div>
              
              {/* User Profile Dropdown */}
              <div className="profile-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <div className="profile-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span className="avatar-initials">{getInitials(user.name)}</span>
                  )}
                  {/* Badge admin */}
                  {user.role?.toLowerCase() === 'admin' && (
                    <div className="admin-badge">
                      <Shield className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{user.name}</span>
                  <span className={`profile-role ${user.role?.toLowerCase() === 'admin' ? 'admin-role' : ''}`}>
                    {user.role?.toLowerCase() === 'admin' ? 'Administrateur' : user.role}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                
                {isProfileOpen && (
                  <div className="dropdown-menu">
                    {/* Dashboard - pour tous les utilisateurs */}
                    <Link to={getDashboardRoute()} className="dropdown-item">
                      <Briefcase className="w-4 h-4" />
                      {user.role?.toLowerCase() === 'admin' 
                        ? 'Dashboard Admin' 
                        : t('nav.dashboard')
                      }
                    </Link>
                    
                    <Link to="/profile" className="dropdown-item">
                      <User className="w-4 h-4" />
                      {t('nav.profile')}
                    </Link>
                   
                    
                    {/* Menu spécifique aux administrateurs */}
                    {user.role?.toLowerCase() === 'admin' && (
                      <>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-section-title">Administration</div>
                        <Link to="/admin/users" className="dropdown-item admin-item">
                          <Users className="w-4 h-4" />
                          Gestion des utilisateurs
                        </Link>
                        <Link to="/admin/statistics" className="dropdown-item admin-item">
                          <BarChart3 className="w-4 h-4" />
                          Statistiques globales
                        </Link>
                        <Link to="/admin/settings" className="dropdown-item admin-item">
                          <Settings className="w-4 h-4" />
                          Paramètres système
                        </Link>
                      </>
                    )}
                    
                    {/* Menu spécifique aux candidats */}
                    {(user.role?.toLowerCase() === 'candidate' || user.role?.toLowerCase() === 'candidat') && (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link to="/my-applications" className="dropdown-item">
                          <FileText className="w-4 h-4" />
                          Mes candidatures
                        </Link>
                        <Link to="/saved-jobs" className="dropdown-item">
                          <Star className="w-4 h-4" />
                          Emplois sauvegardés
                        </Link>
                         <Link to="/settings" className="dropdown-item">
                      <Settings className="w-4 h-4" />
                      {t('nav.settings')}
                    </Link>
                      </>
                    )}
                    
                    {/* Menu spécifique aux recruteurs */}
                    {(user.role?.toLowerCase() === 'recruiter' || user.role?.toLowerCase() === 'recruteur') && (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link to="/my-jobs" className="dropdown-item">
                          <FileText className="w-4 h-4" />
                          Mes offres d'emploi
                        </Link>
                        <Link to="/candidates" className="dropdown-item">
                          <Star className="w-4 h-4" />
                          Candidats
                        </Link>
                         <Link to="/settings" className="dropdown-item">
                      <Settings className="w-4 h-4" />
                      {t('nav.settings')}
                    </Link>
                      </>
                    )}
                    
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary">
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
        
        <button
          className="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;