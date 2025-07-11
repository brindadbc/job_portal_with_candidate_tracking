// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import '../styles/pages/AuthPage.css';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Simulation d'une connexion
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const userData = {
//         id: 1,
//         email: formData.email,
//         name: 'Utilisateur Test',
//         role: 'candidat'
//       };
      
//       login(userData);
//       toast.success('Connexion réussie !');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Erreur de connexion');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-form">
//           <h2>Connexion</h2>
//           <p>Connectez-vous à votre compte JobTracks</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="password">Mot de passe</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? 'Connexion...' : 'Se connecter'}
//             </button>
//           </form>
          
//           <p className="auth-link">
//             Pas de compte ? <Link to="/register">S'inscrire</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Simulation d'une connexion
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       console.log('Connexion réussie !', formData);
//       alert('Connexion réussie !');
//       // Ici vous pouvez ajouter la logique de connexion
//     } catch (error) {
//       alert('Erreur de connexion');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       margin: 0,
//       padding: 0,
//       boxSizing: 'border-box',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//       background: '#f5f5f5',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       <div style={{
//         display: 'flex',
//         width: '100%',
//         maxWidth: '1200px',
//         minHeight: '600px',
//         background: 'white',
//         borderRadius: '20px',
//         boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
//         overflow: 'hidden'
//       }}>
//         {/* Section gauche avec illustration */}
//         <div style={{
//           flex: 1,
//           background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
//           position: 'relative',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '60px 40px'
//         }}>
//           <a href="/register" style={{
//             position: 'absolute',
//             top: '30px',
//             right: '30px',
//             background: 'rgba(255, 255, 255, 0.2)',
//             color: 'white',
//             border: '1px solid rgba(255, 255, 255, 0.3)',
//             padding: '8px 16px',
//             borderRadius: '20px',
//             cursor: 'pointer',
//             fontSize: '0.85rem',
//             transition: 'all 0.3s ease',
//             backdropFilter: 'blur(10px)',
//             zIndex: 10,
//             textDecoration: 'none'
//           }}>
//             Inscription
//           </a>
          
//           <div style={{
//             textAlign: 'center',
//             zIndex: 10,
//             marginBottom: '40px'
//           }}>
//             <h1 style={{
//               color: 'white',
//               fontSize: '2.2rem',
//               fontWeight: 600,
//               marginBottom: '20px',
//               lineHeight: 1.3
//             }}>
//               Vous êtes nouveau ?
//             </h1>
//             <p style={{
//               color: 'rgba(255, 255, 255, 0.9)',
//               fontSize: '1rem',
//               marginBottom: '30px',
//               lineHeight: 1.5
//             }}>
//               Inscrivez-vous et rejoignez la plateforme !
//             </p>
//             <a href="/register" style={{
//               background: 'transparent',
//               border: '2px solid white',
//               color: 'white',
//               padding: '12px 35px',
//               borderRadius: '25px',
//               fontSize: '0.9rem',
//               fontWeight: 600,
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               textTransform: 'uppercase',
//               letterSpacing: '0.5px',
//               textDecoration: 'none',
//               display: 'inline-block'
//             }}>
//               S'inscrire
//             </a>
//           </div>
          
//           {/* Illustration */}
//           <div style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             width: '100%',
//             height: '350px',
//             overflow: 'hidden'
//           }}>
//             {/* Fusée */}
//             <div style={{
//               position: 'absolute',
//               bottom: '120px',
//               left: '100px',
//               width: '70px',
//               height: '140px',
//               background: '#f0f0f0',
//               borderRadius: '35px 35px 0 0',
//               transform: 'rotate(-15deg)',
//               zIndex: 2
//             }}>
//               <div style={{
//                 position: 'absolute',
//                 top: '25px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '30px',
//                 height: '30px',
//                 background: '#00d4ff',
//                 borderRadius: '50%'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 bottom: '-25px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: 0,
//                 height: 0,
//                 borderLeft: '18px solid transparent',
//                 borderRight: '18px solid transparent',
//                 borderTop: '25px solid #ccc'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 bottom: '-35px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '25px',
//                 height: '35px',
//                 background: 'linear-gradient(to bottom, #ff6b35, #f7931e)',
//                 borderRadius: '50% 50% 0 0',
//                 animation: 'flicker 1s ease-in-out infinite alternate'
//               }}></div>
//             </div>
            
//             {/* Personnage */}
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: '60px',
//               width: '280px',
//               height: '500px',
//               zIndex: 5
//             }}>
//               <img 
//                 src="./image/image1.png" 
//                 alt="Personne" 
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'contain',
//                   objectPosition: 'center bottom',
//                   filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))',
//                   transition: 'transform 0.3s ease'
//                 }}
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   // Fallback personnage
//                   const fallback = document.createElement('div');
//                   fallback.style.cssText = `
//                     position: absolute;
//                     bottom: 0;
//                     width: 110px;
//                     height: 160px;
//                     background: #4a4a4a;
//                     border-radius: 35px 35px 0 0;
//                     left: 50%;
//                     transform: translateX(-50%);
//                   `;
//                   e.target.parentNode.appendChild(fallback);
//                 }}
//               />
//             </div>
            
//             {/* Points flottants */}
//             <div style={{
//               position: 'absolute',
//               top: '30%',
//               right: '25%',
//               width: '120px',
//               height: '120px',
//               zIndex: 1
//             }}>
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     position: 'absolute',
//                     width: '10px',
//                     height: '10px',
//                     background: 'rgba(255, 255, 255, 0.6)',
//                     borderRadius: '50%',
//                     top: `${i * 25}px`,
//                     left: `${i * 25}px`,
//                     animation: `float 2s ease-in-out infinite ${i * 0.3}s`
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Section droite avec formulaire */}
//         <div style={{
//           flex: 1,
//           background: 'white',
//           padding: '80px 60px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <div style={{
//             width: '100%',
//             maxWidth: '350px'
//           }}>
//             <h2 style={{
//               fontSize: '2rem',
//               color: '#333',
//               marginBottom: '40px',
//               textAlign: 'center',
//               fontWeight: 600
//             }}>
//               Connexion
//             </h2>
            
//             <div onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '20px' }}>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '16px 20px',
//                     border: 'none',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     background: '#f8f9fa',
//                     color: '#333',
//                     transition: 'all 0.3s ease',
//                     boxSizing: 'border-box'
//                   }}
//                 />
//               </div>
              
//               <div style={{ marginBottom: '30px' }}>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Mot de passe"
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '16px 20px',
//                     border: 'none',
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     background: '#f8f9fa',
//                     color: '#333',
//                     transition: 'all 0.3s ease',
//                     boxSizing: 'border-box'
//                   }}
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 onClick={handleSubmit}
//                 style={{
//                   width: '100%',
//                   padding: '16px',
//                   background: loading ? '#0099cc' : '#00d4ff',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   fontSize: '1rem',
//                   fontWeight: 600,
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   transition: 'all 0.3s ease',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.5px'
//                 }}
//               >
//                 {loading ? 'Connexion...' : 'Se connecter'}
//               </button>
//             </div>
            
//             <p style={{
//               textAlign: 'center',
//               marginTop: '20px',
//               color: '#666'
//             }}>
//               Pas de compte ?{' '}
//               <a href="/register" style={{
//                 color: '#00d4ff',
//                 textDecoration: 'none',
//                 fontWeight: 600
//               }}>
//                 S'inscrire
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <style jsx>{`
//         @keyframes flicker {
//           0% { transform: translateX(-50%) scaleY(1); }
//           100% { transform: translateX(-50%) scaleY(0.8); }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); opacity: 0.6; }
//           50% { transform: translateY(-20px); opacity: 1; }
//         }
        
//         input:focus {
//           outline: none !important;
//           background: #e9ecef !important;
//           transform: translateY(-2px);
//         }
        
//         button:hover:not(:disabled) {
//           background: #0099cc !important;
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
//         }
        
//         @media (max-width: 768px) {
//           .container {
//             flex-direction: column;
//             margin: 20px;
//             min-height: auto;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import '../styles/pages/AuthPage.css';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Simulation d'une connexion
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const userData = {
//         id: 1,
//         email: formData.email,
//         name: 'John Doe',
//         role: 'candidat'
//       };
      
//       login(userData);
//       toast.success('Connexion réussie !');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Erreur lors de la connexion');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-left-section">
//           <Link to="/register" className="auth-switch-btn">
//             Inscription
//           </Link>
//           <div className="auth-hero-content">
//             <h1>Vous êtes nouveau ?</h1>
//             <p>Inscrivez-vous et rejoignez notre plateforme dès maintenant !</p>
//             <Link to="/register" className="auth-hero-btn">
//               S'inscrire
//             </Link>
//           </div>
//           <div className="auth-illustration-login">
//             <div className="auth-rocket">
//               <div className="auth-rocket-flames"></div>
//             </div>
//             <div className="auth-person-login">
//               <img 
//                 src="/images/image1.png" 
//                 alt="Personne" 
//                 className="auth-person-login-image"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'block';
//                 }}
//               />
//               <div className="auth-person-login-body" style={{ display: 'none' }}>
//                 <div className="auth-person-login-head">
//                   <div className="auth-person-login-hair"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="auth-floating-dots">
//               <div className="auth-dot"></div>
//               <div className="auth-dot"></div>
//               <div className="auth-dot"></div>
//               <div className="auth-dot"></div>
//               <div className="auth-dot"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="auth-right-section">
//           <div className="auth-form-container">
//             <h2 className="auth-form-title">Connexion</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="auth-form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   className="auth-form-input"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="auth-form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   className="auth-form-input"
//                   placeholder="Mot de passe"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <button type="submit" className="auth-form-button" disabled={loading}>
//                 {loading ? 'Connexion...' : 'Se connecter'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


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
        
      
        if (result.user && result.user.role) {
          switch (result.user.role.toLowerCase()) {
            case 'recruteur':
              navigate('/RecruiterDashboard');
              break;
            case 'candidat':
              navigate('/CandidateDashboard');
              break;
            default:
              navigate('/RecruiterDashboard'); 
              break;
          }
        } else {
         
          navigate('/RecruiterDashboard');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
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