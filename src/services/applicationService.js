import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🔧 Requête API:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      hasAuth: !!config.headers.Authorization
    });
    return config;
  },
  (error) => {
    console.error('❌ Erreur dans l\'intercepteur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse API réussie:', {
      status: response.status,
      url: response.config.url,
      dataKeys: response.data ? Object.keys(response.data) : [],
      applicationsCount: response.data?.applications?.length || 0
    });
    return response;
  },
  (error) => {
    console.error('❌ Erreur API:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      console.warn('🔒 Session expirée');
      localStorage.removeItem('token');
      return Promise.reject(new Error('Session expirée, veuillez vous reconnecter'));
    }
    
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Accès refusé. Vous devez être connecté en tant que recruteur.'));
    }
    
    return Promise.reject(error);
  }
);

// Service pour les candidatures
const applicationService = {
  
  // =============================================
  // FONCTION PRINCIPALE : Récupération des candidatures pour recruteur
  // =============================================
  getRecruiterApplications: async (filters = {}) => {
    console.log('🚀 === getRecruiterApplications ===');
    console.log('📋 Filtres:', filters);
    
    try {
      // Préparer les paramètres de requête
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && value !== 'all') {
          // Gérer les filtres spéciaux
          if (key === 'search' && value.trim()) {
            params.append('search', value.trim());
          } else if (key === 'status' && value !== 'all') {
            params.append('status', value);
          } else if (key === 'jobId' && value) {
            params.append('jobId', value);
          } else if (key === 'experience' && value) {
            params.append('experience', value);
          } else if (key === 'location' && value.trim()) {
            params.append('location', value.trim());
          } else if (['sortBy', 'order', 'page', 'limit'].includes(key)) {
            params.append(key, value);
          }
        }
      });

      const queryString = params.toString();
      console.log('📤 Query string:', queryString);
      
      // Utiliser l'endpoint principal avec les paramètres
      let fullUrl = '/applications/recruiter';
      if (queryString) {
        fullUrl = `/applications/recruiter?${queryString}`;
      }
      
      console.log(`🎯 Requête vers: ${fullUrl}`);
      
      const response = await api.get(fullUrl);
      
      console.log(`✅ SUCCÈS:`, {
        status: response.status,
        applicationsCount: response.data?.applications?.length || 0,
        total: response.data?.total || 0,
        hasJobs: !!response.data?.jobs,
        jobsCount: response.data?.jobs?.length || 0
      });
      
      // Vérifier que nous avons bien des données
      if (!response.data) {
        throw new Error('Réponse vide du serveur');
      }

      // Normaliser les données avec validation complète
      const normalizedData = {
        applications: Array.isArray(response.data.applications) ? response.data.applications : [],
        total: response.data.total || 0,
        pagination: response.data.pagination || {
          page: parseInt(filters.page) || 1,
          limit: parseInt(filters.limit) || 20,
          total: response.data.total || 0,
          pages: Math.ceil((response.data.total || 0) / (parseInt(filters.limit) || 20))
        },
        jobs: Array.isArray(response.data.jobs) ? response.data.jobs : [],
        filters: response.data.filters || filters,
        metadata: response.data.metadata || {},
        debug: response.data.debug || null,
        stats: response.data.stats || {}
      };

      console.log('📊 Données normalisées:', {
        applicationsCount: normalizedData.applications.length,
        total: normalizedData.total,
        jobsCount: normalizedData.jobs.length,
        hasDebug: !!normalizedData.debug
      });
      
      return normalizedData;
      
    } catch (error) {
      console.error('💥 Erreur fatale dans getRecruiterApplications:', error);
      
      // Messages d'erreur spécifiques
      if (error.message.includes('Session expirée')) {
        throw new Error('Votre session a expiré. Veuillez vous reconnecter.');
      }
      
      if (error.message.includes('Accès refusé')) {
        throw new Error('Vous devez être connecté en tant que recruteur pour accéder à cette page.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Service non trouvé. Vérifiez que le serveur est démarré.');
      }
      
      if (error.response?.status >= 500) {
        throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Erreur lors de la récupération des candidatures');
    }
  },



  downloadDocument: async (applicationId, documentType, fileName = null, options = {}) => {
  console.log('📥 === TÉLÉCHARGEMENT DOCUMENT - VERSION CORRIGÉE ===');
  console.log('🎯 Paramètres:', { applicationId, documentType, fileName, options });

  try {
    // Validation des paramètres d'entrée
    if (!applicationId || !applicationId.toString().match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('ID de candidature invalide ou manquant');
    }

    if (!documentType || typeof documentType !== 'string') {
      throw new Error('Type de document invalide ou manquant');
    }

    // Récupération du token et vérification
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vous devez être connecté pour télécharger ce document');
    }

    let userInfo = null;
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        userInfo = {
          role: payload.role,
          id: payload.id || payload.userId,
          userType: payload.userType
        };
      }
    } catch (e) {
      console.warn('⚠️ Token non analysable, mais on continue');
    }

    console.log('👤 Utilisateur:', userInfo);

    // Normalisation du type de document
    const documentTypeMapping = {
      'cv': 'cv',
      'CV': 'cv',
      'coverLetter': 'coverLetterFile',
      'coverLetterFile': 'coverLetterFile',
      'lettre': 'coverLetterFile',
      'lettre_motivation': 'coverLetterFile',
      'cover': 'coverLetterFile',
      'portfolio': 'portfolio',
      'Portfolio': 'portfolio'
    };

    const normalizedDocumentType = documentTypeMapping[documentType] || documentType.toLowerCase();
    console.log('📋 Type de document normalisé:', normalizedDocumentType);

    // Définir les endpoints selon le rôle utilisateur et les patterns d'URL observés
    let downloadEndpoints = [];

    // Endpoints principaux basés sur les routes définies
    downloadEndpoints = [
      `/applications/${applicationId}/documents/${normalizedDocumentType}`,
      `/applications/${applicationId}/download/${normalizedDocumentType}`,
    ];

    // Ajouter des endpoints spécifiques selon le rôle
    if (userInfo?.role === 'candidate') {
      downloadEndpoints.unshift(`/applications/my-applications/${applicationId}/documents/${normalizedDocumentType}`);
    }

    console.log('🔍 Endpoints à tester:', downloadEndpoints);

    let lastError = null;

    // Essayer chaque endpoint
    for (let i = 0; i < downloadEndpoints.length; i++) {
      const endpoint = downloadEndpoints[i];
      
      try {
        console.log(`🔍 [${i + 1}/${downloadEndpoints.length}] Test endpoint: ${endpoint}`);

        // Configuration de la requête
        const config = {
          responseType: 'blob',
          timeout: 120000, // 2 minutes
          headers: {
            'Accept': 'application/octet-stream, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, */*',
            'Cache-Control': 'no-cache'
          },
          // Ajouter des headers de debug
          validateStatus: function (status) {
            return status < 500; // Accepter les codes d'erreur client pour les analyser
          }
        };

        const response = await api.get(endpoint, config);

        // Analyser la réponse
        console.log('📥 Réponse reçue:', {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers['content-type'],
          contentLength: response.headers['content-length'],
          contentDisposition: response.headers['content-disposition']
        });

        // Gérer les erreurs HTTP
        if (response.status === 404) {
          console.warn(`⚠️ Endpoint ${endpoint} non trouvé (404)`);
          lastError = new Error(`Endpoint non disponible: ${endpoint}`);
          continue;
        }

        if (response.status === 403) {
          console.warn(`⚠️ Accès refusé sur ${endpoint} (403)`);
          lastError = new Error('Accès refusé à ce document');
          continue;
        }

        if (response.status >= 400) {
          console.warn(`⚠️ Erreur ${response.status} sur ${endpoint}`);
          lastError = new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
          continue;
        }

        // Vérification de la réponse
        if (!response.data || response.data.size === 0) {
          console.warn('⚠️ Réponse vide reçue');
          lastError = new Error('Fichier vide reçu du serveur');
          continue;
        }

        // Vérifier que ce n'est pas une page d'erreur HTML
        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('text/html') && !contentType.includes('application/')) {
          console.warn('⚠️ Page HTML reçue au lieu du fichier');
          lastError = new Error('Le serveur a retourné une page web au lieu du fichier demandé');
          continue;
        }

        console.log('🎉 TÉLÉCHARGEMENT RÉUSSI !');

        // Déterminer le nom du fichier
        let finalFileName = fileName;
        
        if (!finalFileName) {
          // Extraire depuis Content-Disposition
          const contentDisposition = response.headers['content-disposition'];
          if (contentDisposition && contentDisposition.includes('filename')) {
            const matches = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (matches && matches[1]) {
              finalFileName = matches[1].replace(/['"]/g, '').trim();
            }
          }
          
          // Fallback sur un nom généré
          if (!finalFileName) {
            const typeNames = {
              'cv': 'CV',
              'coverLetterFile': 'Lettre_motivation', 
              'portfolio': 'Portfolio'
            };
            
            const typeName = typeNames[normalizedDocumentType] || 'Document';
            finalFileName = `${typeName}_${applicationId}.pdf`;
          }
        }

        console.log('📁 Nom de fichier final:', finalFileName);

        // Déclencher le téléchargement dans le navigateur
        try {
          const downloadUrl = window.URL.createObjectURL(response.data);
          const downloadLink = document.createElement('a');
          downloadLink.href = downloadUrl;
          downloadLink.download = finalFileName;
          downloadLink.style.display = 'none';
          
          document.body.appendChild(downloadLink);
          downloadLink.click();
          
          // Nettoyer après un délai
          setTimeout(() => {
            if (document.body.contains(downloadLink)) {
              document.body.removeChild(downloadLink);
            }
            window.URL.revokeObjectURL(downloadUrl);
          }, 100);
          
        } catch (downloadError) {
          console.error('❌ Erreur lors du téléchargement navigateur:', downloadError);
          throw new Error('Impossible de déclencher le téléchargement dans le navigateur');
        }

        console.log('✅ === TÉLÉCHARGEMENT TERMINÉ AVEC SUCCÈS ===');
        
        return {
          success: true,
          fileName: finalFileName,
          size: response.data.size,
          contentType: contentType,
          endpoint: endpoint
        };

      } catch (endpointError) {
        console.warn(`❌ Échec endpoint ${endpoint}:`, {
          status: endpointError.response?.status,
          statusText: endpointError.response?.statusText,
          message: endpointError.message,
          data: endpointError.response?.data
        });

        lastError = endpointError;

        // Analyser l'erreur pour décider si continuer
        if (endpointError.response?.status === 404) {
          continue; // Endpoint n'existe pas, essayer le suivant
        } else if (endpointError.response?.status === 403) {
          // Erreur de permission, mais peut-être qu'un autre endpoint fonctionne
          continue;
        } else if (endpointError.response?.status === 401) {
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        } else if (endpointError.message?.includes('timeout')) {
          throw new Error('Le téléchargement a pris trop de temps. Le fichier est peut-être trop volumineux.');
        } else if (endpointError.message?.includes('Network')) {
          throw new Error('Erreur de connexion. Vérifiez votre connexion internet.');
        }
        
        continue;
      }
    }

    // Si on arrive ici, aucun endpoint n'a fonctionné
    console.error('💥 TOUS LES ENDPOINTS ONT ÉCHOUÉ');
    console.error('Dernière erreur:', lastError);
    
    // Message d'erreur spécifique selon le contexte
    if (lastError?.response?.status === 403) {
      throw new Error(`Accès refusé. Vérifiez que vous avez les permissions pour télécharger ce document.`);
    } else if (lastError?.response?.status === 404) {
      throw new Error(`Document "${documentType}" non trouvé pour cette candidature. Vérifiez que le document a bien été téléchargé lors de la candidature.`);
    } else if (lastError?.response?.status >= 500) {
      throw new Error('Erreur serveur. Veuillez réessayer plus tard ou contacter le support.');
    }

    throw new Error(`Impossible de télécharger le document "${documentType}". ${lastError?.message || 'Erreur inconnue'}`);

  } catch (error) {
    console.error('💥 === ERREUR FATALE TÉLÉCHARGEMENT ===');
    console.error('Détails complets:', {
      message: error.message,
      applicationId,
      documentType,
      fileName,
      stack: error.stack?.split('\n').slice(0, 5).join('\n')
    });

    // Re-lancer l'erreur avec un message contextualisé
    throw new Error(error.message || 'Erreur lors du téléchargement du document');
  }
},

  // =============================================
  // FONCTION DE VÉRIFICATION DES PERMISSIONS
  // =============================================
  checkDocumentAccess: async (applicationId, documentType) => {
    try {
      console.log('🔍 Vérification des permissions d\'accès:', { applicationId, documentType });
      
      // Vérifier d'abord avec une requête HEAD pour économiser la bande passante
      const response = await api.head(`/applications/${applicationId}/documents/${documentType}`);
      
      return {
        canAccess: true,
        statusCode: response.status,
        contentType: response.headers['content-type']
      };
      
    } catch (error) {
      return {
        canAccess: false,
        statusCode: error.response?.status,
        error: error.message
      };
    }
  },



  // Obtenir les détails d'une candidature
  getApplicationDetails: async (applicationId) => {
    try {
      console.log('📥 Récupération détails candidature:', applicationId);
      const response = await api.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur détails candidature:', error);
      throw new Error('Impossible de récupérer les détails de la candidature');
    }
  },

  // Mettre à jour le statut d'une candidature
  updateApplicationStatus: async (applicationId, status, note = '') => {
    try {
      console.log(`📝 Mise à jour statut ${applicationId}:`, status);
      
      const updateData = { status };
      if (note.trim()) {
        updateData.note = note.trim();
      }
      
      const response = await api.put(`/applications/${applicationId}/status`, updateData);
      console.log('✅ Statut mis à jour:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur mise à jour statut:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut');
    }
  },

  // Ajouter une note
  addRecruiterNote: async (applicationId, note) => {
    try {
      const response = await api.post(`/applications/${applicationId}/notes`, { note });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'ajout de la note');
    }
  },

  // Marquer comme favori
  toggleFavorite: async (applicationId) => {
    try {
      const response = await api.put(`/applications/${applicationId}/favorite`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour des favoris');
    }
  },

  // Obtenir les statistiques
  getApplicationStats: async () => {
    try {
      const response = await api.get('/applications/stats');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur stats:', error);
      return {
        total: 0,
        new: 0,
        reviewed: 0,
        shortlisted: 0,
        interviewed: 0,
        accepted: 0,
        rejected: 0
      };
    }
  },

  // Obtenir les jobs du recruteur
  getRecruiterJobs: async () => {
    try {
      console.log('📥 Récupération jobs recruteur...');
      
      const endpoints = ['/jobs/my/jobs', '/jobs'];
      
      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          let jobs = [];
          
          if (Array.isArray(response.data)) {
            jobs = response.data;
          } else if (response.data?.jobs) {
            jobs = response.data.jobs;
          } else if (response.data?.data) {
            jobs = response.data.data;
          }
          
          console.log(`📊 ${jobs.length} jobs trouvés via ${endpoint}`);
          
          if (jobs.length > 0 || endpoint === '/jobs/my/jobs') {
            return jobs;
          }
        } catch (error) {
          console.log(`❌ Échec ${endpoint}:`, error.response?.status);
          continue;
        }
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur récupération jobs:', error);
      return [];
    }
  },

  // Actions en lot
  updateBulkApplicationStatus: async (applicationIds, status, note = '') => {
    try {
      console.log(`📝 Mise à jour en lot de ${applicationIds.length} candidatures vers ${status}`);
      
      const promises = applicationIds.map(id => 
        applicationService.updateApplicationStatus(id, status, note)
      );
      
      const results = await Promise.allSettled(promises);
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      console.log(`✅ Mise à jour en lot terminée: ${successful} succès, ${failed} échecs`);
      
      return {
        successful,
        failed,
        total: applicationIds.length,
        results
      };
    } catch (error) {
      console.error('❌ Erreur mise à jour en lot:', error);
      throw new Error('Erreur lors de la mise à jour en lot');
    }
  },

  // Fonctions du candidat
  getCandidateApplications: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
      if (filters.order) {
        params.append('order', filters.order);
      }

      console.log('📥 Récupération des candidatures candidat...');
      const response = await api.get(`/applications/my-applications?${params}`);
      
      return { applications: response.data };
      
    } catch (error) {
      console.error('❌ Erreur candidatures candidat:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des candidatures');
    }
  },

  // Créer une candidature
  createApplication: async (applicationData) => {
    try {
      console.log('🚀 Création de candidature...');
      
      // Validations
      if (!applicationData.jobId) {
        throw new Error('ID du poste manquant');
      }
      
      if (!applicationData.personalInfo?.firstName?.trim()) {
        throw new Error('Prénom requis');
      }
      
      if (!applicationData.personalInfo?.lastName?.trim()) {
        throw new Error('Nom requis');
      }
      
      if (!applicationData.personalInfo?.email?.trim()) {
        throw new Error('Email requis');
      }
      
      if (!applicationData.documents?.cv) {
        throw new Error('CV requis');
      }

      // Préparer FormData
      const formData = new FormData();
      
      formData.append('jobId', applicationData.jobId);
      
      const personalInfo = {
        firstName: applicationData.personalInfo.firstName.trim(),
        lastName: applicationData.personalInfo.lastName.trim(),
        email: applicationData.personalInfo.email.trim(),
        phone: applicationData.personalInfo.phone?.trim() || '',
        address: applicationData.personalInfo.address?.trim() || ''
      };
      formData.append('personalInfo', JSON.stringify(personalInfo));
      
      if (applicationData.coverLetter?.trim()) {
        formData.append('coverLetter', applicationData.coverLetter.trim());
      }
      
      if (applicationData.additionalInfo) {
        formData.append('additionalInfo', JSON.stringify(applicationData.additionalInfo));
      }
      
      if (applicationData.customAnswers?.length > 0) {
        formData.append('customAnswers', JSON.stringify(applicationData.customAnswers));
      }
      
      // Ajouter les fichiers
      if (applicationData.documents.cv) {
        formData.append('cv', applicationData.documents.cv);
      }
      
      if (applicationData.documents.coverLetterFile) {
        formData.append('coverLetterFile', applicationData.documents.coverLetterFile);
      }
      
      if (applicationData.documents.portfolio) {
        formData.append('portfolio', applicationData.documents.portfolio);
      }

      const response = await api.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000
      });
      
      console.log('✅ Candidature créée:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erreur création candidature:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erreur lors de l\'envoi de la candidature');
    }
  },

  // Supprimer une candidature
  deleteApplication: async (applicationId) => {
    try {
      const response = await api.delete(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la candidature');
    }
  }
};

export default applicationService;


