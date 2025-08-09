// import React, { createContext, useContext, useState } from 'react';

// // Contexte pour gérer les offres d'emploi
// const JobsContext = createContext();

// // Provider du contexte
// export const JobsProvider = ({ children }) => {
//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: 'Senior React Developer',
//       department: 'Engineering',
//       location: 'Paris, France',
//       type: 'CDI',
//       salary: '55k-70k €',
//       applicants: 45,
//       status: 'Actif',
//       createdAt: '2024-01-15',
//       expiresAt: '2024-03-15',
//       views: 234,
//       description: 'Nous recherchons un développeur React senior pour rejoindre notre équipe...',
//       skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
//       company: 'TechCorp',
//       remote: true,
//       experience: 'senior',
//       education: 'Bac+5 en informatique',
//       requirements: ['5+ ans d\'expérience en React', 'Maîtrise de TypeScript'],
//       benefits: ['Télétravail', 'Tickets restaurant', 'Formation continue'],
//       contact_email: 'recrutement@techcorp.com',
//       questions: []
//     },
//     {
//       id: 2,
//       title: 'UX Designer',
//       department: 'Design',
//       location: 'Remote',
//       type: 'CDI',
//       salary: '45k-55k €',
//       applicants: 23,
//       status: 'Actif',
//       createdAt: '2024-01-12',
//       expiresAt: '2024-03-12',
//       views: 156,
//       description: 'Poste de UX Designer pour concevoir des interfaces utilisateur...',
//       skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
//       company: 'DesignStudio',
//       remote: true,
//       experience: 'intermediate',
//       education: 'Bac+3 en design',
//       requirements: ['3+ ans d\'expérience en UX', 'Portfolio obligatoire'],
//       benefits: ['Flexibilité horaire', 'Équipement fourni'],
//       contact_email: 'jobs@designstudio.com',
//       questions: ['Montrez-nous votre portfolio']
//     },
//     {
//       id: 3,
//       title: 'Product Manager',
//       department: 'Product',
//       location: 'Lyon, France',
//       type: 'CDI',
//       salary: '60k-75k €',
//       applicants: 67,
//       status: 'Fermé',
//       createdAt: '2024-01-10',
//       expiresAt: '2024-03-10',
//       views: 489,
//       description: 'Product Manager expérimenté pour diriger nos initiatives produit...',
//       skills: ['Agile', 'Scrum', 'Analytics', 'Leadership'],
//       company: 'ProductCorp',
//       remote: false,
//       experience: 'senior',
//       education: 'Bac+5 en management',
//       requirements: ['5+ ans en product management', 'Expérience en Agile'],
//       benefits: ['Prime sur objectifs', 'CE attractif'],
//       contact_email: 'pm@productcorp.com',
//       questions: []
//     },
//     {
//       id: 4,
//       title: 'Data Scientist',
//       department: 'Data',
//       location: 'Paris, France',
//       type: 'CDD',
//       salary: '45k-60k €',
//       applicants: 28,
//       status: 'En pause',
//       createdAt: '2024-01-05',
//       expiresAt: '2024-03-05',
//       views: 201,
//       description: 'Data Scientist pour analyser et interpréter nos données...',
//       skills: ['Python', 'R', 'Machine Learning', 'SQL'],
//       company: 'DataLab',
//       remote: false,
//       experience: 'intermediate',
//       education: 'Bac+5 en mathématiques/statistiques',
//       requirements: ['Maîtrise de Python', 'Expérience en ML'],
//       benefits: ['Budget formation', 'Participation aux conférences'],
//       contact_email: 'data@datalab.com',
//       questions: ['Décrivez votre projet ML le plus complexe']
//     }
//   ]);

//   // Fonction pour ajouter une nouvelle offre
//   const addJob = (jobData) => {
//     const newJob = {
//       ...jobData,
//       id: Date.now(), // ID unique basé sur le timestamp
//       applicants: 0,
//       views: 0,
//       status: 'Actif',
//       createdAt: new Date().toISOString().split('T')[0],
//       // Calcul de la date d'expiration (30 jours par défaut)
//       expiresAt: jobData.application_deadline || 
//         new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       // Formatage du salaire
//       salary: jobData.salary.min && jobData.salary.max 
//         ? `${jobData.salary.min}-${jobData.salary.max} ${jobData.salary.currency}`
//         : jobData.salary.min 
//           ? `${jobData.salary.min}+ ${jobData.salary.currency}`
//           : 'À négocier'
//     };

//     setJobs(prevJobs => [newJob, ...prevJobs]);
//     return newJob.id;
//   };

//   // Fonction pour mettre à jour une offre
//   const updateJob = (jobId, updates) => {
//     setJobs(prevJobs => 
//       prevJobs.map(job => 
//         job.id === jobId ? { ...job, ...updates } : job
//       )
//     );
//   };

//   // Fonction pour supprimer une offre
//   const deleteJob = (jobId) => {
//     setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
//   };

//   // Fonction pour supprimer plusieurs offres
//   const deleteJobs = (jobIds) => {
//     setJobs(prevJobs => prevJobs.filter(job => !jobIds.includes(job.id)));
//   };

//   // Fonction pour mettre à jour le statut d'une offre
//   const updateJobStatus = (jobId, status) => {
//     updateJob(jobId, { status });
//   };

//   // Fonction pour mettre à jour le statut de plusieurs offres
//   const updateJobsStatus = (jobIds, status) => {
//     setJobs(prevJobs => 
//       prevJobs.map(job => 
//         jobIds.includes(job.id) ? { ...job, status } : job
//       )
//     );
//   };

//   // Fonction pour dupliquer une offre
//   const duplicateJob = (jobId) => {
//     const jobToDuplicate = jobs.find(job => job.id === jobId);
//     if (jobToDuplicate) {
//       const duplicatedJob = {
//         ...jobToDuplicate,
//         id: Date.now(),
//         title: `${jobToDuplicate.title} (Copie)`,
//         status: 'Brouillon',
//         createdAt: new Date().toISOString().split('T')[0],
//         applicants: 0,
//         views: 0
//       };
//       setJobs(prevJobs => [duplicatedJob, ...prevJobs]);
//       return duplicatedJob.id;
//     }
//   };

//   const value = {
//     jobs,
//     setJobs,
//     addJob,
//     updateJob,
//     deleteJob,
//     deleteJobs,
//     updateJobStatus,
//     updateJobsStatus,
//     duplicateJob
//   };

//   return (
//     <JobsContext.Provider value={value}>
//       {children}
//     </JobsContext.Provider>
//   );
// };

// // Hook pour utiliser le contexte
// export const useJobs = () => {
//   const context = useContext(JobsContext);
//   if (!context) {
//     throw new Error('useJobs must be used within a JobsProvider');
//   }
//   return context;
// };






import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const JobsContext = createContext();

// Configuration d'axios
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configurer axios pour inclure le token d'authentification
axios.defaults.baseURL = API_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const initialState = {
  jobs: [],
  publicJobs: [],
  currentJob: null,
  loading: false,
  error: null,
  stats: {
    total: 0,
    active: 0,
    drafts: 0,
    paused: 0,
    closed: 0,
    totalApplications: 0,
    totalViews: 0
  }
};

function jobsReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_JOBS':
      return { 
        ...state, 
        jobs: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'SET_PUBLIC_JOBS':
      return { 
        ...state, 
        publicJobs: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'SET_CURRENT_JOB':
      return { 
        ...state, 
        currentJob: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'ADD_JOB':
      return { 
        ...state, 
        jobs: [action.payload, ...state.jobs],
        loading: false,
        error: null
      };
    
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job._id === action.payload._id ? action.payload : job
        ),
        currentJob: state.currentJob?._id === action.payload._id ? action.payload : state.currentJob,
        loading: false,
        error: null
      };
    
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload),
        loading: false,
        error: null
      };
    
    case 'DELETE_JOBS':
      return {
        ...state,
        jobs: state.jobs.filter(job => !action.payload.includes(job._id)),
        loading: false,
        error: null
      };
    
    case 'UPDATE_JOBS_STATUS':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          action.payload.jobIds.includes(job._id) 
            ? { ...job, status: action.payload.status }
            : job
        ),
        loading: false,
        error: null
      };
    
    case 'CALCULATE_STATS':
      const stats = {
        total: state.jobs.length,
        active: state.jobs.filter(job => job.status === 'Actif').length,
        drafts: state.jobs.filter(job => job.status === 'Brouillon').length,
        paused: state.jobs.filter(job => job.status === 'En pause').length,
        closed: state.jobs.filter(job => job.status === 'Fermé').length,
        totalApplications: state.jobs.reduce((total, job) => total + (job.applicants || 0), 0),
        totalViews: state.jobs.reduce((total, job) => total + (job.views || 0), 0)
      };
      return { ...state, stats };
    
    default:
      return state;
  }
}

export const JobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, initialState);

  // Calculer les statistiques chaque fois que les jobs changent
  useEffect(() => {
    dispatch({ type: 'CALCULATE_STATS' });
  }, [state.jobs]);

  // Fonctions pour interagir avec l'API

  // Récupérer mes offres d'emploi
  const fetchMyJobs = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.sort) queryParams.append('sort', filters.sort);
      
      const response = await axios.get(`/jobs/my/jobs?${queryParams}`);
      
      if (response.data.success) {
        dispatch({ type: 'SET_JOBS', payload: response.data.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des offres:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la récupération des offres' 
      });
    }
  };

  // Récupérer toutes les offres publiques
  const fetchPublicJobs = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const response = await axios.get(`/jobs?${queryParams}`);
      
      if (response.data.success) {
        dispatch({ type: 'SET_PUBLIC_JOBS', payload: response.data.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des offres publiques:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la récupération des offres publiques' 
      });
    }
  };

  // Récupérer une offre par ID
  const fetchJobById = async (jobId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.get(`/jobs/${jobId}`);
      
      if (response.data.success) {
        dispatch({ type: 'SET_CURRENT_JOB', payload: response.data.data });
        return response.data.data;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'offre:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la récupération de l\'offre' 
      });
      return null;
    }
  };

  // Créer une nouvelle offre
  const addJob = async (jobData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post('/jobs', jobData);
      
      if (response.data.success) {
        dispatch({ type: 'ADD_JOB', payload: response.data.data });
        return response.data.data._id;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la création de l\'offre' 
      });
      return null;
    }
  };

  // Mettre à jour une offre
  const updateJob = async (jobId, jobData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.put(`/jobs/${jobId}`, jobData);
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_JOB', payload: response.data.data });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'offre:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la mise à jour de l\'offre' 
      });
      return false;
    }
  };

  // Supprimer une offre
  const deleteJob = async (jobId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.delete(`/jobs/${jobId}`);
      
      if (response.data.success) {
        dispatch({ type: 'DELETE_JOB', payload: jobId });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'offre:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la suppression de l\'offre' 
      });
      return false;
    }
  };

  // Supprimer plusieurs offres
  const deleteJobs = async (jobIds) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.delete('/jobs/bulk/delete', {
        data: { jobIds }
      });
      
      if (response.data.success) {
        dispatch({ type: 'DELETE_JOBS', payload: jobIds });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression en masse:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la suppression en masse' 
      });
      return false;
    }
  };

  // Mettre à jour le statut d'une offre
  const updateJobStatus = async (jobId, status) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.patch(`/jobs/${jobId}/status`, { status });
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_JOB', payload: response.data.data });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la mise à jour du statut' 
      });
      return false;
    }
  };

  // Mettre à jour le statut de plusieurs offres
  const updateJobsStatus = async (jobIds, status) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.patch('/jobs/bulk/status', {
        jobIds,
        status
      });
      
      if (response.data.success) {
        dispatch({ 
          type: 'UPDATE_JOBS_STATUS', 
          payload: { jobIds, status } 
        });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour en masse du statut:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la mise à jour en masse du statut' 
      });
      return false;
    }
  };

  // Dupliquer une offre
  const duplicateJob = async (jobId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post(`/jobs/${jobId}/duplicate`);
      
      if (response.data.success) {
        dispatch({ type: 'ADD_JOB', payload: response.data.data });
        return response.data.data._id;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.data.message });
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la duplication de l\'offre:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Erreur lors de la duplication de l\'offre' 
      });
      return null;
    }
  };

  // Effacer les erreurs
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    // État
    jobs: state.jobs,
    publicJobs: state.publicJobs,
    currentJob: state.currentJob,
    loading: state.loading,
    error: state.error,
    stats: state.stats,
    
    // Actions
    fetchMyJobs,
    fetchPublicJobs,
    fetchJobById,
    addJob,
    updateJob,
    deleteJob,
    deleteJobs,
    updateJobStatus,
    updateJobsStatus,
    duplicateJob,
    clearError
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};