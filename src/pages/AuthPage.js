import React, { useState } from 'react';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidat'
  });
  const [loading, setLoading] = useState(false);

  const navigate = (path) => {
    console.log('Navigation vers:', path);
    // Simulation de navigation
  };

  const login = (userData) => {
    console.log('Connexion utilisateur:', userData);
    // Simulation de connexion
  };

  const toast = {
    error: (message) => {
      console.error('Toast Error:', message);
      alert('Erreur: ' + message);
    },
    success: (message) => {
      console.log('Toast Success:', message);
      alert('Succès: ' + message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulation d'une authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        email: formData.email,
        name: isLoginMode ? 'Utilisateur Test' : formData.name,
        role: formData.role
      };
      
      login(userData);
      toast.success(isLoginMode ? 'Connexion réussie !' : 'Inscription réussie !');
      navigate('/dashboard');
    } catch (error) {
      toast.error(isLoginMode ? 'Erreur de connexion' : 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'candidat'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Section gauche - Hero */}
        <div className="flex-1 relative flex flex-col justify-center items-center p-16 bg-gradient-to-br from-cyan-400 to-blue-600">
          <button
            onClick={switchMode}
            className="absolute top-8 right-8 bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all backdrop-blur-sm z-10"
          >
            {isLoginMode ? 'Inscription' : 'Connexion'}
          </button>
          
          <div className="text-center z-10 mb-10">
            <h1 className="text-white text-4xl font-semibold mb-5 leading-tight">
              {isLoginMode ? 'Vous êtes nouveau ?' : 'Déjà inscrit ?'}
            </h1>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              {isLoginMode 
                ? "Inscrivez-vous et rejoignez la plateforme !" 
                : "Connectez-vous et continuez sur la plateforme !"}
            </p>
            <button
              onClick={switchMode}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all uppercase tracking-wide hover:bg-white hover:text-cyan-400 hover:-translate-y-1"
            >
              {isLoginMode ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          {/* Illustrations */}
          <div className="absolute bottom-0 left-0 w-full h-80 overflow-hidden">
            {isLoginMode ? (
              // Illustration de connexion
              <div className="relative w-full h-full">
                {/* Fusée */}
                <div className="absolute bottom-32 left-24 w-16 h-32 bg-gray-100 rounded-t-full transform -rotate-12 z-20">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-cyan-400 rounded-full"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-300"></div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-t-full animate-pulse"></div>
                </div>
                
                {/* Personne */}
                <div className="absolute bottom-0 right-16 w-64 h-96 z-50">
                  <div className="w-full h-full bg-gray-800 rounded-t-full relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full"></div>
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-amber-800 rounded-t-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              // Illustration d'inscription
              <div className="relative w-full h-full">
                {/* Bureau */}
                <div className="absolute bottom-0 right-36 w-52 h-16 bg-gray-600 rounded-t-xl transform perspective-200 rotate-x-5 z-10"></div>
                
                {/* Écran d'ordinateur */}
                <div className="absolute bottom-16 right-40 w-32 h-20 bg-gray-800 rounded-lg border-2 border-gray-900 z-20">
                  <div className="absolute top-2 left-2 right-2 bottom-2 bg-white rounded"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center z-30">
                    <div className="w-0 h-0 border-l-3 border-t-2 border-b-2 border-transparent border-l-white ml-1"></div>
                  </div>
                </div>
                
                {/* Personne */}
                <div className="absolute bottom-0 right-5 w-80 h-96 z-50">
                  <div className="w-full h-full bg-amber-800 rounded-t-full relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full"></div>
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-amber-800 rounded-t-full"></div>
                  </div>
                </div>
                
                {/* Plante */}
                <div className="absolute bottom-24 left-16 w-10 h-8 bg-amber-800 rounded-b-full z-10">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-10">
                    <div className="absolute w-5 h-8 bg-green-600 rounded-t-full -rotate-12 left-0"></div>
                    <div className="absolute w-5 h-8 bg-green-600 rounded-t-full left-6"></div>
                    <div className="absolute w-5 h-8 bg-green-600 rounded-t-full rotate-12 left-12"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Points flottants */}
            <div className="absolute top-20 right-20 w-28 h-28 z-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full animate-bounce"
                  style={{
                    top: `${i * 20}px`,
                    left: `${i * 20}px`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="flex-1 bg-white p-20 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl text-gray-800 mb-10 text-center font-semibold">
              {isLoginMode ? 'Connexion' : 'Inscription'}
            </h2>
            
            <div onSubmit={handleSubmit} className="space-y-5">
              {!isLoginMode && (
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom complet"
                    className="w-full px-5 py-4 border-none rounded-lg text-base bg-gray-50 text-gray-800 transition-all focus:outline-none focus:bg-gray-200 focus:-translate-y-1"
                    required
                  />
                </div>
              )}
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-5 py-4 border-none rounded-lg text-base bg-gray-50 text-gray-800 transition-all focus:outline-none focus:bg-gray-200 focus:-translate-y-1"
                  required
                />
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="w-full px-5 py-4 border-none rounded-lg text-base bg-gray-50 text-gray-800 transition-all focus:outline-none focus:bg-gray-200 focus:-translate-y-1"
                  required
                />
              </div>
              
              {!isLoginMode && (
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmer le mot de passe"
                    className="w-full px-5 py-4 border-none rounded-lg text-base bg-gray-50 text-gray-800 transition-all focus:outline-none focus:bg-gray-200 focus:-translate-y-1"
                    required
                  />
                </div>
              )}
              
              {!isLoginMode && (
                <div className="flex gap-8 mb-8 justify-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="candidat"
                      name="role"
                      value="candidat"
                      checked={formData.role === 'candidat'}
                      onChange={handleChange}
                      className="w-4 h-4 text-cyan-400"
                    />
                    <label htmlFor="candidat" className="text-gray-600 text-sm cursor-pointer">
                      Candidat
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="recruteur"
                      name="role"
                      value="recruteur"
                      checked={formData.role === 'recruteur'}
                      onChange={handleChange}
                      className="w-4 h-4 text-cyan-400"
                    />
                    <label htmlFor="recruteur" className="text-gray-600 text-sm cursor-pointer">
                      Recruteur
                    </label>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-4 bg-cyan-400 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all uppercase tracking-wide hover:bg-cyan-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 disabled:opacity-50"
              >
                {loading 
                  ? (isLoginMode ? 'Connexion...' : 'Inscription...') 
                  : (isLoginMode ? 'Connexion' : 'Inscription')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;