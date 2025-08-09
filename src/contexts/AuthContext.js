// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifier la validité du token
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('token', token);
      } else {
        // Token invalide
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  };

 

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
      
        return { 
          success: true, 
          message: data.message, 
          user: data 
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      return { success: false, message: 'Erreur de connexion au serveur' };
    }
  };

  const value = {
    user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    loading,
    isCandidate: user?.role === 'candidat',
    isRecruiter: user?.role === 'recruteur'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;





// contexts/AuthContext.js (Version mise à jour)
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Vérifier si l'utilisateur est connecté au chargement
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Vérifier la validité du token
//       fetchUserProfile(token);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Initialiser la connexion WebSocket quand l'utilisateur est connecté
//   useEffect(() => {
//     if (user && !socket) {
//       initializeSocket();
//     }

//     // Nettoyer la connexion WebSocket lors de la déconnexion
//     if (!user && socket) {
//       socket.disconnect();
//       setSocket(null);
//     }

//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [user]);

//   const initializeSocket = () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
//       auth: {
//         token: token
//       },
//       transports: ['websocket']
//     });

//     newSocket.on('connect', () => {
//       console.log('Connecté au serveur WebSocket');
//       setSocket(newSocket);
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Déconnecté du serveur WebSocket');
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Erreur de connexion WebSocket:', error);
//     });

//     return newSocket;
//   };

//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/me`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//         localStorage.setItem('token', token);
        
//         // Mettre à jour le statut en ligne
//         updateOnlineStatus(true);
//       } else {
//         // Token invalide
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération du profil:', error);
//       localStorage.removeItem('token');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOnlineStatus = async (isOnline) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       await fetch(`${API_BASE_URL}/users/online-status`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ isOnline }),
//       });
//     } catch (error) {
//       console.error('Erreur mise à jour statut:', error);
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUser(data);
//         localStorage.setItem('token', data.token);
//         updateOnlineStatus(true);
//         return { success: true, message: data.message };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       console.error('Erreur lors de l\'inscription:', error);
//       return { success: false, message: 'Erreur de connexion au serveur' };
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUser(data);
//         localStorage.setItem('token', data.token);
//         updateOnlineStatus(true);
      
//         return { 
//           success: true, 
//           message: data.message, 
//           user: data 
//         };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       console.error('Erreur lors de la connexion:', error);
//       return { success: false, message: 'Erreur de connexion au serveur' };
//     }
//   };

//   const logout = async () => {
//     // Mettre à jour le statut hors ligne avant de se déconnecter
//     await updateOnlineStatus(false);
    
//     setUser(null);
//     localStorage.removeItem('token');
    
//     // Déconnecter le WebSocket
//     if (socket) {
//       socket.disconnect();
//       setSocket(null);
//     }
//   };

//   const updateProfile = async (updatedData) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/auth/profile`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUser(data);
//         localStorage.setItem('token', data.token);
//         return { success: true, message: data.message };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du profil:', error);
//       return { success: false, message: 'Erreur de connexion au serveur' };
//     }
//   };

//   const changePassword = async (passwordData) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(passwordData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         return { success: true, message: data.message };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       console.error('Erreur lors du changement de mot de passe:', error);
//       return { success: false, message: 'Erreur de connexion au serveur' };
//     }
//   };

//   // Gérer la fermeture de la page/onglet
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       if (user) {
//         updateOnlineStatus(false);
//       }
//     };

//     const handleVisibilityChange = () => {
//       if (user) {
//         updateOnlineStatus(!document.hidden);
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [user]);

//   const value = {
//     user,
//     register,
//     login,
//     logout,
//     updateProfile,
//     changePassword,
//     loading,
//     socket,
//     isCandidate: user?.role === 'candidat',
//     isRecruiter: user?.role === 'recruteur'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;