import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import '../styles/pages/AuthPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        toast.success(result.message);
        
        // Vérifier le rôle de l'utilisateur et rediriger en conséquence
        if (result.user && result.user.role) {
          switch (result.user.role.toLowerCase()) {
            case 'admin':
              navigate('/dashboardAdmin');
              break;
            case 'recruteur':
              navigate('/RecruiterDashboard');
              break;
            case 'candidat':
              navigate('/CandidateDashboard');
              break;
            default:
              // Par défaut, rediriger vers le dashboard recruteur
              navigate('/RecruiterDashboard');
              break;
          }
        } else {
          // Si aucun rôle n'est défini, rediriger vers le dashboard par défaut
          navigate('/Dashboard');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left-section">
          <Link to="/register" className="auth-switch-btn">
            Inscription
          </Link>
          <div className="auth-hero-content">
            <h1>Vous êtes nouveau ?</h1>
            <p>Inscrivez-vous et rejoignez notre plateforme dès maintenant !</p>
            <Link to="/register" className="auth-hero-btn">
              S'inscrire
            </Link>
          </div>
          <div className="auth-illustration-login">
            <div className="auth-rocket">
              <div className="auth-rocket-flames"></div>
            </div>
            <div className="auth-person-login">
              <img 
                src="/images/image1.png" 
                alt="Personne" 
                className="auth-person-login-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="auth-person-login-body" style={{ display: 'none' }}>
                <div className="auth-person-login-head">
                  <div className="auth-person-login-hair"></div>
                </div>
              </div>
            </div>
            <div className="auth-floating-dots">
              <div className="auth-dot"></div>
              <div className="auth-dot"></div>
              <div className="auth-dot"></div>
              <div className="auth-dot"></div>
              <div className="auth-dot"></div>
            </div>
          </div>
        </div>
        
        <div className="auth-right-section">
          <div className="auth-form-container">
            <h2 className="auth-form-title">Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <input
                  type="email"
                  name="email"
                  className="auth-form-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="auth-form-group">
                <input
                  type="password"
                  name="password"
                  className="auth-form-input"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="auth-form-button" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;