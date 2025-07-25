import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  Camera,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Briefcase,
  Award,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Crown,
  UserCheck
} from 'lucide-react';

// Définir les styles au début, avant le composant
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1a202c'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#64748b'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitleSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  headerTitle: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0
  },
  headerSubtitle: {
    color: '#64748b',
    fontSize: '0.875rem',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '1rem'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    overflow: 'hidden'
  },
  tabsNav: {
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    padding: '0'
  },
  tab: {
    padding: '1rem 2rem',
    borderBottom: '2px solid transparent',
    fontWeight: '500',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    border: 'none',
    background: 'none',
    position: 'relative'
  },
  tabActive: {
    borderBottomColor: '#3b82f6',
    color: '#3b82f6',
    backgroundColor: '#f8fafc'
  },
  tabIcon: {
    width: '1.125rem',
    height: '1.125rem',
    marginRight: '0.75rem'
  },
  tabContent: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 1rem 0'
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f1f5f9'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '2rem',
    marginBottom: '2rem'
  },
  profileImageSection: {
    flexShrink: 0
  },
  profileImageContainer: {
    position: 'relative'
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #ffffff',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
  },
  cameraButton: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '0.75rem',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  },
  cameraIcon: {
    width: '1rem',
    height: '1rem'
  },
  profileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  profileBasicInfo: {
    flex: 1
  },
  nameAndRole: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.75rem'
  },
  profileName: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0
  },
  adminBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#fbbf24',
    color: '#92400e',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  crownIcon: {
    width: '0.875rem',
    height: '0.875rem'
  },
  profileRole: {
    display: 'flex',
    alignItems: 'center',
    color: '#475569',
    fontSize: '1.125rem',
    marginBottom: '0.5rem'
  },
  roleIcon: {
    width: '1.125rem',
    height: '1.125rem',
    marginRight: '0.5rem',
    color: '#64748b'
  },
  profileLocation: {
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    fontSize: '0.875rem'
  },
  locationIcon: {
    width: '1rem',
    height: '1rem',
    marginRight: '0.5rem'
  },
  profileActions: {
    display: 'flex',
    gap: '1rem'
  },
  editButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease'
  },
  buttonIcon: {
    width: '1rem',
    height: '1rem'
  },
  membershipInfo: {
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    fontSize: '0.875rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  calendarIcon: {
    width: '1rem',
    height: '1rem',
    marginRight: '0.5rem'
  },
  statsContainer: {
    marginBottom: '2rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statIconSvg: {
    width: '24px',
    height: '24px'
  },
  chevronIcon: {
    width: '20px',
    height: '20px',
    color: '#94a3b8'
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a202c'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500'
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f1f5f9'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 1.5rem 0'
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff'
  },
  textarea: {
    resize: 'vertical',
    minHeight: '100px'
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb'
  },
  saveButton: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease'
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  preferencesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },
  preferenceInfo: {
    flex: 1
  },
  preferenceTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1a202c',
    margin: '0 0 0.5rem 0'
  },
  preferenceDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0
  },
  toggleContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  toggleInput: {
    display: 'none'
  },
  toggle: {
    width: '48px',
    height: '24px',
    backgroundColor: '#cbd5e1',
    borderRadius: '12px',
    position: 'relative',
    transition: 'all 0.3s ease'
  },
  toggleActive: {
    backgroundColor: '#3b82f6'
  },
  toggleThumb: {
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },
  toggleThumbActive: {
    transform: 'translateX(24px)'
  },
  radioGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  radioInput: {
    marginRight: '0.5rem'
  },
  radioLabel: {
    fontSize: '0.875rem',
    color: '#374151'
  },
  securityForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  passwordField: {
    position: 'relative'
  },
  passwordInput: {
    padding: '0.75rem 3rem 0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  passwordToggle: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280'
  },
  eyeIcon: {
    width: '1.25rem',
    height: '1.25rem'
  },
  sessionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  sessionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  },
  sessionInfo: {
    flex: 1
  },
  sessionTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: '0.25rem'
  },
  sessionDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '0.25rem'
  },
  sessionTime: {
    fontSize: '0.75rem',
    color: '#9ca3af'
  },
  currentBadge: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500'
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150x150');
  const [userType, setUserType] = useState('recruiter'); // 'recruiter' ou 'admin'
  const [loading, setLoading] = useState(true);

  // État initial vide qui sera rempli avec les données utilisateur
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    location: '',
    bio: '',
    website: '',
    linkedin: '',
    joinedDate: '',
    userId: null
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    jobAlerts: true,
    weeklyReports: true,
    language: 'fr',
    timezone: 'Europe/Paris',
    theme: 'light'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  // Simulation de la récupération des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Simuler la récupération des données depuis localStorage ou API
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userRole = localStorage.getItem('userRole') || 'recruiter';
        
        if (userData && Object.keys(userData).length > 0) {
          // Utiliser les données stockées
          const profileData = {
            firstName: userData.firstName || userData.prenom || '',
            lastName: userData.lastName || userData.nom || '',
            email: userData.email || '',
            phone: userData.phone || userData.telephone || '',
            position: userData.position || userData.poste || (userRole === 'admin' ? 'Administrateur' : 'Recruteur'),
            company: userData.company || userData.entreprise || 'TechRecruit',
            location: userData.location || userData.ville || 'Paris, France',
            bio: userData.bio || userData.description || '',
            website: userData.website || '',
            linkedin: userData.linkedin || '',
            joinedDate: userData.joinedDate || userData.dateInscription || new Date().toISOString().split('T')[0],
            userId: userData.id || userData.userId || Math.random().toString(36).substr(2, 9)
          };
          
          setProfile(profileData);
          setTempProfile(profileData);
          setUserType(userRole);
          
          // Charger l'image de profil si elle existe
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
          
          // Charger les préférences si elles existent
          if (userData.preferences) {
            setPreferences({ ...preferences, ...userData.preferences });
          }
        } else {
          // Données par défaut si aucun utilisateur connecté
          const defaultProfile = {
            firstName: 'Utilisateur',
            lastName: 'Anonyme',
            email: 'user@example.com',
            phone: '+33 1 23 45 67 89',
            position: userRole === 'admin' ? 'Administrateur' : 'Recruteur',
            company: 'TechRecruit',
            location: 'Paris, France',
            bio: 'Profil à compléter...',
            website: '',
            linkedin: '',
            joinedDate: new Date().toISOString().split('T')[0],
            userId: Math.random().toString(36).substr(2, 9)
          };
          
          setProfile(defaultProfile);
          setTempProfile(defaultProfile);
          setUserType(userRole);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileChange = (field, value) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Sauvegarder les modifications
      setProfile(tempProfile);
      
      // Mettre à jour localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const updatedUser = {
        ...currentUser,
        firstName: tempProfile.firstName,
        lastName: tempProfile.lastName,
        email: tempProfile.email,
        phone: tempProfile.phone,
        position: tempProfile.position,
        company: tempProfile.company,
        location: tempProfile.location,
        bio: tempProfile.bio,
        website: tempProfile.website,
        linkedin: tempProfile.linkedin,
        profileImage: profileImage,
        preferences: preferences,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Ici vous pourriez aussi faire un appel API pour sauvegarder sur le serveur
      // await saveUserProfile(tempProfile);
      
      setIsEditing(false);
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = async () => {
    if (!security.currentPassword) {
      alert('Veuillez saisir votre mot de passe actuel');
      return;
    }
    
    if (security.newPassword.length < 8) {
      alert('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    if (security.newPassword !== security.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      // Ici vous feriez l'appel API pour changer le mot de passe
      // await changePassword(security.currentPassword, security.newPassword);
      
      alert('Mot de passe modifié avec succès');
      setSecurity({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: security.twoFactorEnabled
      });
    } catch (error) {
      alert('Erreur lors du changement de mot de passe');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      navigate('/');
    }
  };

  // Stats adaptées selon le type d'utilisateur
  const getStatsForUserType = () => {
    if (userType === 'admin') {
      return [
        { label: 'Utilisateurs actifs', value: '156', icon: Users, color: '#3b82f6', bgColor: '#dbeafe' },
        { label: 'Offres publiées', value: '89', icon: Briefcase, color: '#10b981', bgColor: '#d1fae5' },
        { label: 'Recrutements réussis', value: '34', icon: Award, color: '#8b5cf6', bgColor: '#ede9fe' },
        { label: 'Taux de conversion', value: '92%', icon: Settings, color: '#f59e0b', bgColor: '#fef3c7' }
      ];
    } else {
      return [
        { label: 'Offres publiées', value: '45', icon: Briefcase, color: '#3b82f6', bgColor: '#dbeafe' },
        { label: 'Candidatures reçues', value: '234', icon: Users, color: '#10b981', bgColor: '#d1fae5' },
        { label: 'Recrutements réussis', value: '12', icon: Award, color: '#8b5cf6', bgColor: '#ede9fe' },
        { label: 'Taux de réussite', value: '89%', icon: Settings, color: '#f59e0b', bgColor: '#fef3c7' }
      ];
    }
  };

  const stats = getStatsForUserType();

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'preferences', label: 'Préférences', icon: Settings },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const ProfileTab = () => (
    <div style={styles.tabContent}>
      {/* Profile Header Card */}
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.profileImageSection}>
            <div style={styles.profileImageContainer}>
              <img
                src={profileImage}
                alt="Profile"
                style={styles.profileImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=' + 
                    (profile.firstName.charAt(0) + profile.lastName.charAt(0));
                }}
              />
              <label style={styles.cameraButton}>
                <Camera style={styles.cameraIcon} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
          
          <div style={styles.profileInfo}>
            <div style={styles.profileBasicInfo}>
              <div style={styles.nameAndRole}>
                <h1 style={styles.profileName}>
                  {profile.firstName} {profile.lastName}
                </h1>
                {userType === 'admin' && (
                  <div style={styles.adminBadge}>
                    <Crown style={styles.crownIcon} />
                    <span>Admin</span>
                  </div>
                )}
              </div>
              <div style={styles.profileRole}>
                <Building style={styles.roleIcon} />
                <span>{profile.position} {profile.company ? `chez ${profile.company}` : ''}</span>
              </div>
              <div style={styles.profileLocation}>
                <MapPin style={styles.locationIcon} />
                <span>{profile.location}</span>
              </div>
            </div>
            
            <div style={styles.profileActions}>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={isEditing ? styles.cancelButton : styles.editButton}
              >
                {isEditing ? (
                  <>
                    <X style={styles.buttonIcon} />
                    Annuler
                  </>
                ) : (
                  <>
                    <Edit style={styles.buttonIcon} />
                    Modifier le profil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div style={styles.membershipInfo}>
          <Calendar style={styles.calendarIcon} />
          <span>Membre depuis {new Date(profile.joinedDate).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <h2 style={styles.sectionTitle}>Statistiques</h2>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: stat.bgColor, color: stat.color}}>
                  <stat.icon style={styles.statIconSvg} />
                </div>
                <ChevronRight style={styles.chevronIcon} />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Form */}
      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Informations personnelles</h2>
        <div style={styles.formGrid}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Prénom *</label>
              <input
                type="text"
                value={isEditing ? tempProfile.firstName : profile.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nom *</label>
              <input
                type="text"
                value={isEditing ? tempProfile.lastName : profile.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                value={isEditing ? tempProfile.email : profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="votre.email@example.com"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Téléphone</label>
              <input
                type="tel"
                value={isEditing ? tempProfile.phone : profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Poste</label>
              <input
                type="text"
                value={isEditing ? tempProfile.position : profile.position}
                onChange={(e) => handleProfileChange('position', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="Votre fonction"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Entreprise</label>
              <input
                type="text"
                value={isEditing ? tempProfile.company : profile.company}
                onChange={(e) => handleProfileChange('company', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Localisation</label>
              <input
                type="text"
                value={isEditing ? tempProfile.location : profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="Ville, Pays"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Site web</label>
              <input
                type="url"
                value={isEditing ? tempProfile.website : profile.website}
                onChange={(e) => handleProfileChange('website', e.target.value)}
                disabled={!isEditing}
                style={styles.input}
                placeholder="https://votre-site.com"
              />
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Biographie</label>
            <textarea
              value={isEditing ? tempProfile.bio : profile.bio}
              onChange={(e) => handleProfileChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              style={{...styles.input, ...styles.textarea}}
              placeholder="Décrivez votre expérience et vos compétences..."
            />
          </div>
        </div>
        
        {isEditing && (
          <div style={styles.formActions}>
            <button onClick={handleSaveProfile} style={styles.saveButton}>
              <Save style={styles.buttonIcon} />
              Enregistrer les modifications
            </button>
            <button onClick={handleCancelEdit} style={styles.secondaryButton}>
              Annuler
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const PreferencesTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Notifications</h2>
        <div style={styles.preferencesGrid}>
          {[
            {
              key: 'emailNotifications',
              title: 'Notifications par email',
              description: 'Recevez les notifications importantes par email'
            },
            {
              key: 'smsNotifications', 
              title: 'Notifications SMS',
              description: 'Recevez les notifications urgentes par SMS'
            },
            {
              key: 'jobAlerts',
              title: 'Alertes emploi',
              description: 'Recevez des alertes pour les nouvelles candidatures'
            },
            {
              key: 'weeklyReports',
              title: 'Rapports hebdomadaires',
              description: 'Recevez un résumé hebdomadaire de vos activités'
            }
          ].map((pref) => (
            <div key={pref.key} style={styles.preferenceItem}>
              <div style={styles.preferenceInfo}>
                <h3 style={styles.preferenceTitle}>{pref.title}</h3>
                <p style={styles.preferenceDescription}>{pref.description}</p>
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={preferences[pref.key]}
                  onChange={(e) => handlePreferenceChange(pref.key, e.target.checked)}
                  style={styles.toggleInput}
                />
                <div style={{
                  ...styles.toggle,
                  ...(preferences[pref.key] ? styles.toggleActive : {})
                }}>
                  <div style={{
                    ...styles.toggleThumb,
                    ...(preferences[pref.key] ? styles.toggleThumbActive : {})
                  }} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Paramètres régionaux</h2>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Langue</label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              style={styles.select}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fuseau horaire</label>
            <select
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              style={styles.select}
            >
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Apparence</h2>
        <div>
          <label style={styles.label}>Thème</label>
          <div style={styles.radioGroup}>
            {[
              { value: 'light', label: 'Clair' },
              { value: 'dark', label: 'Sombre' },
              { value: 'auto', label: 'Automatique' }
            ].map((theme) => (
              <label key={theme.value} style={styles.radioOption}>
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={preferences.theme === theme.value}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  style={styles.radioInput}
                />
                <span style={styles.radioLabel}>{theme.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Changer le mot de passe</h2>
        <div style={styles.securityForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mot de passe actuel</label>
            <div style={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={security.currentPassword}
                onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                style={styles.passwordInput}
                placeholder="Saisissez votre mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
              </button>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nouveau mot de passe</label>
            <input
              type="password"
              value={security.newPassword}
              onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
              style={styles.input}
              placeholder="Choisissez un nouveau mot de passe (min. 8 caractères)"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={security.confirmPassword}
              onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
              style={styles.input}
              placeholder="Confirmez votre nouveau mot de passe"
            />
          </div>
          <button onClick={handlePasswordChange} style={styles.primaryButton}>
            Mettre à jour le mot de passe
          </button>
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Authentification à deux facteurs</h2>
        <div style={styles.preferenceItem}>
          <div style={styles.preferenceInfo}>
            <h3 style={styles.preferenceTitle}>Authentification 2FA</h3>
            <p style={styles.preferenceDescription}>Ajoutez une couche de sécurité supplémentaire à votre compte</p>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={security.twoFactorEnabled}
              onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
              style={styles.toggleInput}
            />
            <div style={{
              ...styles.toggle,
              ...(security.twoFactorEnabled ? styles.toggleActive : {})
            }}>
              <div style={{
                ...styles.toggleThumb,
                ...(security.twoFactorEnabled ? styles.toggleThumbActive : {})
              }} />
            </div>
          </label>
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.cardTitle}>Sessions actives</h2>
        <div style={styles.sessionsContainer}>
          <div style={styles.sessionItem}>
            <div style={styles.sessionInfo}>
              <div style={styles.sessionTitle}>Session actuelle</div>
              <div style={styles.sessionDescription}>Paris, France • Chrome sur Windows</div>
              <div style={styles.sessionTime}>Dernière activité: maintenant</div>
            </div>
            <span style={styles.currentBadge}>Actuel</span>
          </div>
          <div style={styles.sessionItem}>
            <div style={styles.sessionInfo}>
              <div style={styles.sessionTitle}>Appareil mobile</div>
              <div style={styles.sessionDescription}>Lyon, France • Safari sur iOS</div>
              <div style={styles.sessionTime}>Dernière activité: il y a 2 heures</div>
            </div>
            <button style={styles.dangerButton}>Déconnecter</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'preferences':
        return <PreferencesTab />;
      case 'security':
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTitleSection}>
            <h1 style={styles.headerTitle}>Profil utilisateur</h1>
            <p style={styles.headerSubtitle}>
              Gérez vos informations personnelles et préférences
              {userType === 'admin' && ' - Mode Administrateur'}
            </p>
          </div>
        
          <div style={styles.headerActions}>
            <button 
              onClick={() => navigate(userType === 'admin' ? '/admin-dashboard' : '/RecruiterDashboard')}
              style={styles.primaryButton}
            >
              Retour au tableau de bord
            </button>
            <button style={styles.dangerButton} onClick={handleLogout}>
              <LogOut style={styles.buttonIcon} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.tabsContainer}>
          <nav style={styles.tabsNav}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.id ? styles.tabActive : {})
                }}
              >
                <tab.icon style={styles.tabIcon} />
                {tab.label}
              </button>
            ))}
          </nav>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;