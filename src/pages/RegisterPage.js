// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import '../styles/pages/AuthPage.css';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'candidat'
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
    
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Les mots de passe ne correspondent pas');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // Simulation d'une inscription
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const userData = {
//         id: 1,
//         email: formData.email,
//         name: formData.name,
//         role: formData.role
//       };
      
//       login(userData);
//       toast.success('Inscription réussie !');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Erreur lors de l\'inscription');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-form">
//           <h2>Inscription</h2>
//           <p>Créez votre compte JobTracks</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Nom complet</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
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
//               <label htmlFor="role">Type de compte</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="candidat">Candidat</option>
//                 <option value="recruteur">Recruteur</option>
//               </select>
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
            
//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? 'Inscription...' : 'S\'inscrire'}
//             </button>
//           </form>
          
//           <p className="auth-link">
//             Déjà un compte ? <Link to="/login">Se connecter</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import '../styles/pages/AuthPage.css';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'candidat'
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
    
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Les mots de passe ne correspondent pas');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // Simulation d'une inscription
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const userData = {
//         id: 1,
//         email: formData.email,
//         name: formData.name,
//         role: formData.role
//       };
      
//       login(userData);
//       toast.success('Inscription réussie !');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Erreur lors de l\'inscription');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-left-section">
//           <Link to="/login" className="auth-switch-btn">
//             Connexion
//           </Link>
//           <div className="auth-hero-content">
//             <h1>Déjà inscrit ?</h1>
//             <p>Connectez-vous et continuez sur la plateforme comprehensive !</p>
//             <Link to="/login" className="auth-hero-btn">
//               Se connecter
//             </Link>
//           </div>
//           <div className="auth-illustration-signup">
//             <div className="auth-desk"></div>
//             <div className="auth-computer-screen">
//               <div className="auth-play-button"></div>
//             </div>
//             <div className="auth-person-signup">
//               <img 
//                 src="/images/pers.png" 
//                 alt="Personne" 
//                 className="auth-person-image"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'block';
//                 }}
//               />
//               <div className="auth-person-body" style={{ display: 'none' }}>
//                 <div className="auth-person-head">
//                   <div className="auth-person-hair"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="auth-plant-pot">
//               <div className="auth-plant-leaves">
//                 <div className="auth-leaf"></div>
//                 <div className="auth-leaf"></div>
//                 <div className="auth-leaf"></div>
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
//             <h2 className="auth-form-title">Inscription</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="auth-form-group">
//                 <input
//                   type="text"
//                   name="name"
//                   className="auth-form-input"
//                   placeholder="Nom complet"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
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
              
//               <div className="auth-form-group">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   className="auth-form-input"
//                   placeholder="Confirmer le mot de passe"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="auth-radio-group">
//                 <div className="auth-radio-option">
//                   <input
//                     type="radio"
//                     id="candidat"
//                     name="role"
//                     value="candidat"
//                     checked={formData.role === 'candidat'}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="candidat">Candidat</label>
//                 </div>
//                 <div className="auth-radio-option">
//                   <input
//                     type="radio"
//                     id="recruteur"
//                     name="role"
//                     value="recruteur"
//                     checked={formData.role === 'recruteur'}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="recruteur">Recruteur</label>
//                 </div>
//               </div>
              
//               <button type="submit" className="auth-form-button" disabled={loading}>
//                 {loading ? 'Inscription...' : 'S\'inscrire'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import '../styles/pages/AuthPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidat'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        toast.success(result.message);
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
     
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left-section">
          <Link to="/login" className="auth-switch-btn">
            Connexion
          </Link>
          <div className="auth-hero-content">
            <h1>Déjà inscrit ?</h1>
            <p>Connectez-vous et continuez sur la plateforme comprehensive !</p>
            <Link to="/login" className="auth-hero-btn">
              Se connecter
            </Link>
          </div>
          <div className="auth-illustration-signup">
            <div className="auth-desk"></div>
            <div className="auth-computer-screen">
              <div className="auth-play-button"></div>
            </div>
            <div className="auth-person-signup">
              <img 
                src="/images/pers.png" 
                alt="Personne" 
                className="auth-person-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="auth-person-body" style={{ display: 'none' }}>
                <div className="auth-person-head">
                  <div className="auth-person-hair"></div>
                </div>
              </div>
            </div>
            <div className="auth-plant-pot">
              <div className="auth-plant-leaves">
                <div className="auth-leaf"></div>
                <div className="auth-leaf"></div>
                <div className="auth-leaf"></div>
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
            <h2 className="auth-form-title">Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <input
                  type="text"
                  name="name"
                  className="auth-form-input"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
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
              
              <div className="auth-form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  className="auth-form-input"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="auth-radio-group">
                <div className="auth-radio-option">
                  <input
                    type="radio"
                    id="candidat"
                    name="role"
                    value="candidat"
                    checked={formData.role === 'candidat'}
                    onChange={handleChange}
                  />
                  <label htmlFor="candidat">Candidat</label>
                </div>
                <div className="auth-radio-option">
                  <input
                    type="radio"
                    id="recruteur"
                    name="role"
                    value="recruteur"
                    checked={formData.role === 'recruteur'}
                    onChange={handleChange}
                  />
                  <label htmlFor="recruteur">Recruteur</label>
                </div>
              </div>
              
              <button type="submit" className="auth-form-button" disabled={loading}>
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;