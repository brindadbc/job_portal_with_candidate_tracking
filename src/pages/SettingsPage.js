import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  CreditCard,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Trash2,
  Shield,
  Key,
  Database,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import '../styles/pages/Footer.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    applications: true,
    messages: true,
    promotions: false
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'preferences', label: 'Préférences', icon: Settings },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'data', label: 'Données', icon: Database }
  ];

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSaveSettings = () => {
    // Logique de sauvegarde
    console.log('Paramètres sauvegardés');
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="settings-content">
            <h2>Préférences de notifications</h2>
            <div className="notifications-section">
              <div className="notification-category">
                <h3>Canaux de communication</h3>
                <div className="notification-item">
                  <div className="notification-info">
                    <Mail className="w-5 h-5" />
                    <div>
                      <h4>Email</h4>
                      <p>Recevoir des notifications par email</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationToggle('email')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <Bell className="w-5 h-5" />
                    <div>
                      <h4>Push</h4>
                      <p>Notifications push sur navigateur</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationToggle('push')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <Smartphone className="w-5 h-5" />
                    <div>
                      <h4>SMS</h4>
                      <p>Notifications par SMS</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationToggle('sms')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="notification-category">
                <h3>Types de notifications</h3>
                <div className="notification-item">
                  <div className="notification-info">
                    <User className="w-5 h-5" />
                    <div>
                      <h4>Nouvelles candidatures</h4>
                      <p>Être notifié des nouvelles candidatures</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.applications}
                      onChange={() => handleNotificationToggle('applications')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <Bell className="w-5 h-5" />
                    <div>
                      <h4>Messages</h4>
                      <p>Notifications pour les nouveaux messages</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={() => handleNotificationToggle('messages')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-content">
            <h2>Sécurité et confidentialité</h2>
            <div className="security-section">
              <div className="security-item">
                <h3>Mot de passe</h3>
                <p>Changez votre mot de passe régulièrement</p>
                <div className="password-form">
                  <div className="form-group">
                    <label>Mot de passe actuel</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe actuel"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Nouveau mot de passe</label>
                    <input type="password" placeholder="Nouveau mot de passe" />
                  </div>
                  <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input type="password" placeholder="Confirmer le mot de passe" />
                  </div>
                  <button className="btn-primary">
                    <Key className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </button>
                </div>
              </div>

              <div className="security-item">
                <h3>Authentification à deux facteurs</h3>
                <p>Ajoutez une couche de sécurité supplémentaire</p>
                <button className="plan-actions">
                  <Shield className="btn-text text-red-600" />
                  Activer 2FA
                </button>
              </div>

              <div className="security-item">
                <h3>Sessions actives</h3>
                <p>Gérez vos sessions de connexion</p>
                <div className="sessions-list">
                  <div className="session-item">
                    <div className="session-info">
                      <h4>Chrome - Windows</h4>
                      <p>Session actuelle • Paris, France</p>
                    </div>
                    <span className="session-status active">Active</span>
                  </div>
                  <div className="session-item">
                    <div className="session-info">
                      <h4>Safari - iPhone</h4>
                      <p>Il y a 2 heures • Paris, France</p>
                    </div>
                    <button className="btn-text text-red-600">Déconnecter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="settings-content">
            <h2>Préférences</h2>
            <div className="preferences-section">
              <div className="preference-item">
                <div className="preference-info">
                  <Globe className="w-5 h-5" />
                  <div>
                    <h4>Langue</h4>
                    <p>Choisissez votre langue préférée</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="preference-select"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <Palette className="w-5 h-5" />
                  <div>
                    <h4>Thème</h4>
                    <p>Personnalisez l'apparence de l'interface</p>
                  </div>
                </div>
                <div className="theme-selector">
                  <button
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="w-4 h-4" />
                    Clair
                  </button>
                  <button
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="w-4 h-4" />
                    Sombre
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="settings-content">
            <h2>Facturation</h2>
            <div className="billing-section">
              <div className="subscription-info">
                <h3>Plan actuel</h3>
                <div className="plan-card">
                  <div className="plan-header">
                    <h4>Plan Premium</h4>
                    <span className="plan-price">49€/mois</span>
                  </div>
                  <p>Accès illimité aux fonctionnalités de recrutement</p>
                  <div className="plan-actions">
                    <button className="btn-text text-red-600">Changer de plan</button>
                    <button className="btn-text text-red-600">Annuler l'abonnement</button>
                  </div>
                </div>
              </div>

              <div className="payment-methods">
                <h3>Méthodes de paiement</h3>
                <div className="payment-card">
                  <div className="card-info">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <h4>•••• •••• •••• 1234</h4>
                      <p>Expire 12/25</p>
                    </div>
                  </div>
                  <button className="btn-text">Modifier</button>
                </div>
              </div>

              <div className="billing-history">
                <h3>Historique de facturation</h3>
                <div className="invoice-item">
                  <div className="invoice-info">
                    <h4>Facture #2024-001</h4>
                    <p>15 janvier 2024</p>
                  </div>
                  <div className="invoice-actions">
                    <span className="invoice-amount">49€</span>
                    <button className="btn-icons">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="settings-content">
            <h2>Gestion des données</h2>
            <div className="data-section">
              <div className="data-item">
                <h3>Exporter mes données</h3>
                <p>Téléchargez une copie de toutes vos données</p>
                <button className="plan-actions">
                  <Download className="btn-text text-red-600" />
                  Exporter les données
                </button>
              </div>

              <div className="data-item">
                <h3>Importer des données</h3>
                <p>Importez des données depuis d'autres plateformes</p>
                <button className="plan-actions">
                  <Upload className="btn-text text-red-600" />
                  Importer des données
                </button>
              </div>

              <div className="data-item danger">
                <h3>Supprimer mon compte</h3>
                <p>Supprimez définitivement votre compte et toutes vos données</p>
                <button className="btn-danger">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1>Paramètres</h1>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-main">
          <TabContent />
          
          <div className="settings-actions">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Annuler
            </button>
            <button className="btn-primary" onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;