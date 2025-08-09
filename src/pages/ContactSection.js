import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      console.log('Données du formulaire:', formData);
      alert('Message envoyé avec succès!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#f8f9fa',
      padding: '48px 16px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    wrapper: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    contactCard: {
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '600px'
    },
    formSection: {
      padding: '64px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '48px',
      letterSpacing: '-0.5px'
    },
    formGroup: {
      marginBottom: '32px'
    },
    label: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#34495e',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '16px 0',
      border: 'none',
      borderBottom: '2px solid #e1e8ed',
      background: 'transparent',
      fontSize: '1rem',
      color: '#2c3e50',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: 'inherit'
    },
    textarea: {
      width: '100%',
      padding: '16px 0',
      border: 'none',
      borderBottom: '2px solid #e1e8ed',
      background: 'transparent',
      fontSize: '1rem',
      color: '#2c3e50',
      outline: 'none',
      resize: 'none',
      minHeight: '80px',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s ease'
    },
    termsText: {
      fontSize: '0.9rem',
      color: '#7f8c8d',
      margin: '20px 0',
      lineHeight: '1.5'
    },
    termsLink: {
      color: '#ff6b35',
      textDecoration: 'none',
      fontWeight: '500'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #ff6b35, #f39c12)',
      color: 'white',
      border: 'none',
      padding: '18px 32px',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
      marginTop: '16px'
    },
    imageSection: {
     background: 'linear-gradient(135deg, #4f46e5)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    lamp: {
      position: 'absolute',
      top: '64px',
      right: '80px',
      zIndex: 10
    },
    lampPole: {
      width: '4px',
      height: '128px',
      background: 'linear-gradient(to bottom, #4a4a4a, #2c2c2c)',
      margin: '0 auto'
    },
    lampBase: {
      width: '32px',
      height: '12px',
      background: '#2c2c2c',
      borderRadius: '50%',
      marginTop: '-4px'
    },
    lampShade: {
      position: 'absolute',
      top: '-32px',
      left: '-24px',
      width: '48px',
      height: '32px',
      background: 'linear-gradient(to bottom, #fff8dc, #f5deb3)',
      borderRadius: '50% 50% 0 0',
      borderBottom: '1px solid #deb887',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    lampLight: {
      position: 'absolute',
      bottom: '-16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '80px',
      background: 'radial-gradient(circle, rgba(255, 248, 220, 0.4) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(4px)'
    },
    plant: {
      position: 'absolute',
      bottom: '80px',
      right: '48px',
      zIndex: 5
    },
    plantStem: {
      width: '12px',
      height: '32px',
      background: '#228b22',
      borderRadius: '50% 50% 0 0'
    },
    plantLeaf1: {
      position: 'absolute',
      top: '-8px',
      left: '-4px',
      width: '8px',
      height: '24px',
      background: '#32cd32',
      borderRadius: '50%',
      transform: 'rotate(12deg)'
    },
    plantLeaf2: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      width: '8px',
      height: '20px',
      background: '#32cd32',
      borderRadius: '50%',
      transform: 'rotate(-12deg)'
    },
    plantPot: {
      width: '24px',
      height: '8px',
      background: '#654321',
      borderRadius: '50%',
      marginTop: '4px'
    },
    chair: {
      position: 'absolute',
      bottom: '64px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 20
    },
    chairBody: {
      width: '400px',
      height: '390px',
      background: 'linear-gradient(135deg, #8b4513, #a0522d, #654321)',
    // background: 'linear-gradient(135deg, #4f46e5, #9333ea, #6b21a8)',
      borderRadius: '50%',
      transform: 'rotate(3deg)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    },
    chairTop: {
      position: 'absolute',
      top: '16px',
      left: '24px',
      right: '24px',
      height: '80px',
      background: 'linear-gradient(135deg, #a0522d, #8b4513)',
      borderRadius: '50%',
      boxShadow: 'inset 0 8px 16px rgba(0, 0, 0, 0.2)'
    },
    chairCream: {
      position: 'absolute',
      bottom: '8px',
      left: '32px',
      right: '32px',
      height: '64px',
      background: 'linear-gradient(135deg, #fffacd, #f5deb3)',
      borderRadius: '50%',
      boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1)',
      borderTop: '1px solid #deb887'
    },
    chairShadow: {
      position: 'absolute',
      bottom: '-16px',
      left: '8px',
      right: '8px',
      height: '24px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
      filter: 'blur(8px)',
      transform: 'scaleX(1.1)'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    },
    backgroundEffects: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), transparent)'
    },
    lightEffect1: {
      position: 'absolute',
      top: '40px',
      right: '40px',
      width: '128px',
      height: '128px',
      background: 'rgba(255, 165, 0, 0.2)',
      borderRadius: '50%',
      filter: 'blur(32px)'
    },
    lightEffect2: {
      position: 'absolute',
      bottom: '80px',
      left: '40px',
      width: '96px',
      height: '96px',
      background: 'rgba(255, 255, 0, 0.15)',
      borderRadius: '50%',
      filter: 'blur(24px)'
    },
    floor: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '96px',
      background: 'linear-gradient(to top, rgba(139, 69, 19, 0.3), transparent)'
    }
  };

  // CSS pour les animations
  const cssStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .contact-input:focus {
      border-bottom-color: #ff6b35 !important;
    }
    
    .contact-input::placeholder {
      color: #95a5a6;
      font-style: italic;
    }
    
    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    }
    
    .submit-btn:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .terms-link:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .contact-card {
        grid-template-columns: 1fr !important;
      }
      .form-section {
        padding: 32px 24px !important;
      }
      .title {
        font-size: 2.5rem !important;
      }
    }
  `;

  return (
    
    <>
    <Navbar></Navbar>
      <style>{cssStyles}</style>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.contactCard} className="contact-card">
            
            {/* Section Formulaire */}
            <div style={styles.formSection} className="form-section">
              <h1 style={styles.title} className="title">Contact</h1>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="E.g Mark"
                  style={styles.input}
                  className="contact-input"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E.g Suft@gmail.com"
                  style={styles.input}
                  className="contact-input"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>How can we help?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what you'd like us to help with"
                  rows="4"
                  style={styles.textarea}
                  className="contact-input"
                />
              </div>
              
              <div>
                <p style={styles.termsText}>
                  By selecting the button below, I agree to the{' '}
                  <a href="#" style={styles.termsLink} className="terms-link">
                    Terms and Conditions
                  </a>{' '}
                  Provided by Suft NG.
                </p>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={styles.submitButton}
                  className="submit-btn"
                >
                  {isSubmitting ? (
                    <span>
                      <span style={styles.loadingSpinner}></span>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
            
            {/* Section Image avec Fauteuil */}
            <div style={styles.imageSection}>
              {/* Effets de lumière d'arrière-plan */}
              <div style={styles.backgroundEffects}></div>
              <div style={styles.lightEffect1}></div>
              <div style={styles.lightEffect2}></div>
              
              {/* Lampe */}
              <div style={styles.lamp}>
                <div style={styles.lampPole}></div>
                <div style={styles.lampBase}></div>
                <div style={styles.lampShade}>
                  <div style={styles.lampLight}></div>
                </div>
              </div>
              
              {/* Plante décorative */}
              <div style={styles.plant}>
                <div style={{position: 'relative'}}>
                  <div style={styles.plantStem}></div>
                  <div style={styles.plantLeaf1}></div>
                  <div style={styles.plantLeaf2}></div>
                </div>
                <div style={styles.plantPot}></div>
              </div>
              
              {/* Fauteuil Bean Bag */}
              <div style={styles.chair}>
                <div style={styles.chairBody}>
                  <div style={styles.chairTop}></div>
                  <div style={styles.chairCream}></div>
                </div>
                <div style={styles.chairShadow}></div>
              </div>
              
              {/* Sol réfléchissant */}
              <div style={styles.floor}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;