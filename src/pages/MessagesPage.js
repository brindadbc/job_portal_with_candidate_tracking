import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Phone, 
  Video, 
  Info, 
  Send, 
  Smile, 
  MessageSquare, 
  X, 
  Users,
  Check,
  CheckCheck,
  MoreVertical,
  Edit2,
  Trash2,
  Settings,
  Bell,
  Circle,
  Image,
  File,
  Calendar,
  Briefcase,
  User,
  Star,
  Archive,
  Pin,
  Volume2,
  VolumeX,
  Clock
} from 'lucide-react';

// Service pour les API des messages
class MessageService {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    };
  }

  async getConversations() {
    try {
      const response = await fetch(`${this.baseURL}/messages/conversations`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
      throw error;
    }
  }

  async getAvailableUsers() {
    try {
      const response = await fetch(`${this.baseURL}/messages/available-users`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  async getOrCreateConversation(otherUserId) {
    try {
      const response = await fetch(`${this.baseURL}/messages/conversations/${otherUserId}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création/récupération de la conversation:', error);
      throw error;
    }
  }

  async getMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await fetch(
        `${this.baseURL}/messages/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
        {
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  }

  async sendMessage(conversationId, content, messageType = 'text') {
    try {
      const response = await fetch(`${this.baseURL}/messages/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          content,
          messageType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  }

  async editMessage(messageId, content) {
    try {
      const response = await fetch(`${this.baseURL}/messages/messages/${messageId}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la modification du message:', error);
      throw error;
    }
  }

  async deleteMessage(messageId, deleteForEveryone = false) {
    try {
      const response = await fetch(`${this.baseURL}/messages/messages/${messageId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
        body: JSON.stringify({ deleteForEveryone })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
      throw error;
    }
  }

  async markMessagesAsRead(conversationId) {
    try {
      const response = await fetch(`${this.baseURL}/messages/conversations/${conversationId}/read`, {
        method: 'PATCH',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors du marquage des messages comme lus:', error);
      throw error;
    }
  }
}

const messageService = new MessageService();

// Composant pour afficher les statuts de messages
const MessageStatusIcon = ({ status, isOwn, timestamp }) => {
  if (!isOwn) return null;

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return (
          <div className="message-status sending" title="Envoi en cours...">
            <Clock className="status-icon" />
          </div>
        );
      case 'sent':
        return (
          <div className="message-status sent" title="Envoyé">
            <Check className="status-icon" />
          </div>
        );
      case 'delivered':
        return (
          <div className="message-status delivered" title="Livré">
            <CheckCheck className="status-icon" />
          </div>
        );
      case 'read':
        return (
          <div className="message-status read" title="Lu">
            <CheckCheck className="status-icon read-icon" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="message-status-container">
      {getStatusIcon()}
      <span className="message-time">{formatTimestamp(timestamp)}</span>
    </div>
  );
};

// Hook personnalisé pour gérer les statuts de messages
const useMessageStatus = (socket, selectedConversation) => {
  const [messageStatuses, setMessageStatuses] = useState({});

  useEffect(() => {
    if (!socket) return;

    const handleMessageStatusUpdate = (data) => {
      if (data.type === 'message_status_updated') {
        setMessageStatuses(prev => ({
          ...prev,
          [data.messageId]: data.status
        }));
      } else if (data.type === 'messages_read_by_user') {
        const updates = {};
        data.messageIds.forEach(messageId => {
          updates[messageId] = 'read';
        });
        setMessageStatuses(prev => ({
          ...prev,
          ...updates
        }));
      } else if (data.type === 'messages_delivered_confirmation') {
        const updates = {};
        data.messageIds.forEach(messageId => {
          updates[messageId] = 'delivered';
        });
        setMessageStatuses(prev => ({
          ...prev,
          ...updates
        }));
      }
    };

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      handleMessageStatusUpdate(data);
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const markMessagesAsRead = (messageIds) => {
    if (socket && selectedConversation) {
      socket.send(JSON.stringify({
        type: 'mark_messages_read',
        conversationId: selectedConversation._id,
        messageIds: messageIds
      }));
    }
  };

  const confirmMessagesReceived = (messageIds) => {
    if (socket && selectedConversation) {
      socket.send(JSON.stringify({
        type: 'messages_received',
        conversationId: selectedConversation._id,
        messageIds: messageIds
      }));
    }
  };

  return {
    messageStatuses,
    markMessagesAsRead,
    confirmMessagesReceived
  };
};

const MessagesPage = () => {
  // États de l'interface
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatSearch, setNewChatSearch] = useState('');
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États des données
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [availableUsers, setAvailableUsers] = useState([]);

  // WebSocket pour temps réel
  const [socket, setSocket] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const observerRef = useRef();
  const messageRefs = useRef({});
  // const { unreadCount, loadUnreadCount } = useNotifications();

  const { messageStatuses, markMessagesAsRead, confirmMessagesReceived } = 
    useMessageStatus(socket, selectedConversation);

  // Auto scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  // Initialisation WebSocket
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const ws = new WebSocket(`ws://localhost:5000?token=${token}`);
      
      ws.onopen = () => {
        console.log('WebSocket connecté');
        setWsConnected(true);
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      ws.onclose = () => {
        console.log('WebSocket déconnecté');
        setWsConnected(false);
        setSocket(null);
        
        setTimeout(() => {
          if (localStorage.getItem('token')) {
            // Relancer la connexion WebSocket si nécessaire
          }
        }, 3000);
      };

      ws.onerror = (error) => {
        console.error('Erreur WebSocket:', error);
        setWsConnected(false);
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    } 
    // loadUnreadCount();
  }, []);

  // Gérer les messages WebSocket
  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'new_message':
        handleNewMessage(data.message);
        break;
      case 'message_edited':
        handleMessageEdited(data.message);
        break;
      case 'message_deleted':
        handleMessageDeleted(data.messageId, data.conversationId);
        break;
      case 'user_online':
        handleUserStatusChange(data.userId, true);
        break;
      case 'user_offline':
        handleUserStatusChange(data.userId, false);
        break;
      default:
        console.log('Type de message WebSocket non géré:', data.type);
    }
  };

  // Nouveau message reçu
  const handleNewMessage = (message) => {
    setMessages(prev => ({
      ...prev,
      [message.conversation]: [...(prev[message.conversation] || []), message]
    }));

    setConversations(prev => prev.map(conv => 
      conv._id === message.conversation 
        ? { 
          ...conv, 
          lastMessage: message, 
          updatedAt: message.createdAt,
          unreadCount: selectedConversation?._id === message.conversation ? 0 : (conv.unreadCount || 0) + 1
        }
        : conv
    ));

    if (selectedConversation?._id === message.conversation) {
      markMessagesAsRead([message._id]);
    }
  };

  // Message modifié
  const handleMessageEdited = (editedMessage) => {
    setMessages(prev => ({
      ...prev,
      [editedMessage.conversation]: prev[editedMessage.conversation]?.map(msg =>
        msg._id === editedMessage._id ? editedMessage : msg
      ) || []
    }));
  };

  // Message supprimé
  const handleMessageDeleted = (messageId, conversationId) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId]?.filter(msg => msg._id !== messageId) || []
    }));
  };

  // Changement de statut utilisateur
  const handleUserStatusChange = (userId, isOnline) => {
    setConversations(prev => prev.map(conv => ({
      ...conv,
      participants: conv.participants.map(participant => 
        participant._id === userId 
          ? { ...participant, isOnline, lastSeen: isOnline ? new Date() : participant.lastSeen }
          : participant
      )
    })));

    setAvailableUsers(prev => prev.map(user =>
      user._id === userId
        ? { ...user, isOnline, lastSeen: isOnline ? new Date() : user.lastSeen }
        : user
    ));
  };

  // Observer l'intersection pour marquer automatiquement comme lu
  useEffect(() => {
    if (!selectedConversation || !currentUser) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleMessageIds = [];
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const messageId = entry.target.dataset.messageId;
          const message = messages[selectedConversation._id]?.find(m => m._id === messageId);
          
          if (message && 
              message.sender._id !== currentUser.id && 
              !message.readBy?.some(r => r.user._id === currentUser.id)) {
            visibleMessageIds.push(messageId);
          }
        }
      });

      if (visibleMessageIds.length > 0) {
        markMessagesAsRead(visibleMessageIds);
      }
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selectedConversation, currentUser, markMessagesAsRead, messages]);

  // Fonction pour observer un message
  const observeMessage = useCallback((element, messageId) => {
    if (element && observerRef.current) {
      element.dataset.messageId = messageId;
      observerRef.current.observe(element);
      messageRefs.current[messageId] = element;
    }
  }, []);

  // Confirmer la réception des nouveaux messages
  useEffect(() => {
    if (selectedConversation && messages[selectedConversation._id] && currentUser) {
      const undeliveredMessages = messages[selectedConversation._id]
        .filter(msg => 
          msg.sender._id !== currentUser?.id && 
          msg.status === 'sent'
        )
        .map(msg => msg._id);

      if (undeliveredMessages.length > 0) {
        confirmMessagesReceived(undeliveredMessages);
      }
    }
  }, [messages, selectedConversation, currentUser, confirmMessagesReceived]);

  // Charger les données initiales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(payload);

      const [conversationsData, usersData] = await Promise.all([
        messageService.getConversations(),
        messageService.getAvailableUsers()
      ]);

      setConversations(conversationsData);
      setAvailableUsers(usersData);

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sélectionner une conversation
  const selectConversation = async (conversation) => {
    try {
      setSelectedConversation(conversation);
      
      if (!messages[conversation._id]) {
        const messagesData = await messageService.getMessages(conversation._id);
        setMessages(prev => ({
          ...prev,
          [conversation._id]: messagesData
        }));
      }

      await markMessagesAsReadAPI(conversation._id);

    } catch (error) {
      console.error('Erreur lors de la sélection de la conversation:', error);
      setError('Erreur lors du chargement des messages');
    }
  };

  // Marquer les messages comme lus via API
  const markMessagesAsReadAPI = async (conversationId) => {
    try {
      await messageService.markMessagesAsRead(conversationId);
      
      setConversations(prev => prev.map(conv =>
        conv._id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  // Envoyer un message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    try {
      setSendingMessage(true);
      
      const messageData = await messageService.sendMessage(
        selectedConversation._id, 
        newMessage.trim()
      );

      setMessages(prev => ({
        ...prev,
        [selectedConversation._id]: [...(prev[selectedConversation._id] || []), messageData]
      }));

      setConversations(prev => prev.map(conv =>
        conv._id === selectedConversation._id
          ? { 
            ...conv, 
            lastMessage: messageData, 
            updatedAt: messageData.createdAt 
          }
          : conv
      ));

      setNewMessage('');

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setError('Erreur lors de l\'envoi du message');
    } finally {
      setSendingMessage(false);
    }
  };

  // Commencer une nouvelle conversation
  const startNewConversation = async (user) => {
    try {
      const conversation = await messageService.getOrCreateConversation(user._id);
      
      if (!conversations.find(conv => conv._id === conversation._id)) {
        setConversations(prev => [conversation, ...prev]);
      }

      setSelectedConversation(conversation);
      setShowNewChatModal(false);
      setNewChatSearch('');

      const messagesData = await messageService.getMessages(conversation._id);
      setMessages(prev => ({
        ...prev,
        [conversation._id]: messagesData
      }));

    } catch (error) {
      console.error('Erreur lors de la création de la conversation:', error);
      setError('Erreur lors de la création de la conversation');
    }
  };

  // Supprimer un message
  const handleDeleteMessage = async (messageId) => {
    try {
      await messageService.deleteMessage(messageId, false);
      
      setMessages(prev => ({
        ...prev,
        [selectedConversation._id]: prev[selectedConversation._id].filter(msg => msg._id !== messageId)
      }));

      setShowMessageOptions(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur lors de la suppression du message');
    }
  };

  // Modifier un message
  const handleEditMessage = async (messageId, newContent) => {
    if (!newContent.trim()) return;

    try {
      const updatedMessage = await messageService.editMessage(messageId, newContent);
      
      setMessages(prev => ({
        ...prev,
        [selectedConversation._id]: prev[selectedConversation._id].map(msg =>
          msg._id === messageId ? updatedMessage : msg
        )
      }));

      setEditingMessage(null);
      setEditContent('');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      setError('Erreur lors de la modification du message');
    }
  };

  // Fonction pour obtenir le statut d'un message
  const getMessageStatus = (message) => {
    return messageStatuses[message._id] || message.status || 'sent';
  };

  // Fonctions utilitaires
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Circle className="msg-status-icon msg-status-sending" />;
      case 'sent':
        return <Check className="msg-status-icon msg-status-sent" />;
      case 'delivered':
        return <CheckCheck className="msg-status-icon msg-status-delivered" />;
      case 'read':
        return <CheckCheck className="msg-status-icon msg-status-read" />;
      default:
        return null;
    }
  };

  // Filtrer les conversations
  const getFilteredConversations = () => {
    if (!conversations.length) return [];

    return conversations
      .filter(conv => {
        const otherParticipant = conv.participants.find(p => p._id !== currentUser?.id);
        if (!otherParticipant) return false;

        const searchMatch = otherParticipant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          otherParticipant.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          otherParticipant.company?.toLowerCase().includes(searchQuery.toLowerCase());
        
        return searchMatch;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  // Filtrer les utilisateurs disponibles
  const getAvailableUsersForChat = () => {
    return availableUsers.filter(user => {
      const searchMatch = user.name?.toLowerCase().includes(newChatSearch.toLowerCase()) ||
                         user.email?.toLowerCase().includes(newChatSearch.toLowerCase()) ||
                         user.company?.toLowerCase().includes(newChatSearch.toLowerCase());
      
      return searchMatch;
    });
  };

  // Rendu d'un message
  const renderMessage = (message) => {
    const isOwn = message.sender._id === currentUser?.id;
    const status = getMessageStatus(message);

    return (
      <div
        key={message._id}
        className={`msg-message-wrapper ${isOwn ? 'sent' : 'received'}`}
        ref={(el) => observeMessage(el, message._id)}
      >
        <div className="msg-message-content">
          {editingMessage === message._id ? (
            <div className="msg-edit-container">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="msg-edit-textarea"
                rows="3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleEditMessage(message._id, editContent);
                  }
                  if (e.key === 'Escape') {
                    setEditingMessage(null);
                    setEditContent('');
                  }
                }}
              />
              <div className="msg-edit-actions">
                <button
                  onClick={() => handleEditMessage(message._id, editContent)}
                  className="msg-edit-save-btn"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => {
                    setEditingMessage(null);
                    setEditContent('');
                  }}
                  className="msg-edit-cancel-btn"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className={`msg-message-bubble ${isOwn ? 'sent' : 'received'}`}>
              <p className="msg-message-text">{message.content}</p>
              {message.edited && (
                <p className="msg-message-edited">Modifié</p>
              )}
              
              {isOwn && (
                <div className="msg-message-options">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMessageOptions(
                        showMessageOptions === message._id ? null : message._id
                      );
                    }}
                    className="msg-message-options-btn"
                  >
                    <MoreVertical className="msg-message-options-icon" />
                  </button>
                  
                  {showMessageOptions === message._id && (
                    <div className="msg-message-options-menu">
                      <button
                        onClick={() => {
                          setEditingMessage(message._id);
                          setEditContent(message.content);
                          setShowMessageOptions(null);
                        }}
                        className="msg-option-menu-item"
                      >
                        <Edit2 className="msg-option-menu-icon" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message._id)}
                        className="msg-option-menu-item danger"
                      >
                        <Trash2 className="msg-option-menu-icon" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className={`msg-message-footer ${isOwn ? 'sent' : 'received'}`}>
            <span className="message-time">{formatTimestamp(message.createdAt)}</span>
            <MessageStatusIcon 
              status={status} 
              isOwn={isOwn} 
              timestamp={message.createdAt} 
            />
          </div>
        </div>
      </div>
    );
  };

  // Fermer les options au clic extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMessageOptions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={loadInitialData} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  const filteredConversations = getFilteredConversations();
  const availableUsersForChat = getAvailableUsersForChat();

  return (
    <div className="messages-app">
      
<style>{`
        .messages-app {
          display: flex;
          height: 100vh;
          background-color: #f3f4f6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f9fafb;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: #dc2626;
          margin-bottom: 16px;
          font-size: 16px;
        }

        .retry-button {
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .retry-button:hover {
          background-color: #1d4ed8;
        }

        .connection-status {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 100;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.connected {
          background-color: #10b981;
        }

        .status-dot.disconnected {
          background-color: #ef4444;
        }

        /* Sidebar Styles */
        .msg-sidebar {
          width: 320px;
          background-color: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }

        .msg-sidebar-header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .msg-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .msg-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .msg-back-btn {
          padding: 8px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-back-btn:hover {
          background-color: #f3f4f6;
        }

        .msg-back-icon {
          width: 20px;
          height: 20px;
          color: #6b7280;
        }

        .msg-header-info h1 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .msg-connection-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .msg-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .msg-status-dot.online {
          background-color: #10b981;
        }

        .msg-status-dot.offline {
          background-color: #ef4444;
        }

        .msg-new-chat-btn {
          padding: 8px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-new-chat-btn:hover {
          background-color: #1d4ed8;
        }

        .msg-new-chat-icon {
          width: 20px;
          height: 20px;
        }

        .msg-search-container {
          position: relative;
        }

        .msg-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #9ca3af;
        }

        .msg-search-input {
          width: 100%;
          padding: 8px 16px 8px 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .msg-search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        /* Conversations List */
        .msg-conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .msg-conversation-item {
          position: relative;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-bottom: 4px;
        }

        .msg-conversation-item:hover {
          background-color: #f9fafb;
        }

        .msg-conversation-item.selected {
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
        }

        .msg-conversation-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .msg-avatar-container {
          position: relative;
        }

        .msg-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .msg-online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }

        .msg-conversation-info {
          flex: 1;
          min-width: 0;
        }

        .msg-conversation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .msg-conversation-name {
          font-weight: 600;
          color: #111827;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .msg-conversation-time {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .msg-conversation-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .msg-last-message {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          padding-right: 8px;
        }

        .msg-unread-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          background-color: #2563eb;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
        }

        .msg-company-info {
          display: flex;
          align-items: center;
          margin-top: 4px;
          font-size: 12px;
          color: #6b7280;
        }

        .msg-company-icon {
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }

        /* Main Chat Area */
        .msg-chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .msg-chat-header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px;
        }

        .msg-chat-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .msg-chat-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .msg-chat-avatar-container {
          position: relative;
        }

        .msg-chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .msg-chat-online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }

        .msg-chat-user-details h2 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .msg-chat-user-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }

        .msg-chat-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .msg-chat-action-btn {
          padding: 8px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #6b7280;
        }

        .msg-chat-action-btn:hover {
          background-color: #f3f4f6;
        }

        .msg-chat-action-icon {
          width: 20px;
          height: 20px;
        }

        /* Messages Area */
        .msg-messages-area {
          flex: 1;
          overflow-y: auto;
          background-color: #f9fafb;
          padding: 16px;
        }

        .msg-messages-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .msg-message-wrapper {
          display: flex;
        }

        .msg-message-wrapper.sent {
          justify-content: flex-end;
        }

        .msg-message-wrapper.received {
          justify-content: flex-start;
        }

        .msg-message-content {
          max-width: 384px;
          position: relative;
        }

        .msg-message-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }

        .msg-message-bubble.sent {
          background-color: #2563eb;
          color: white;
        }

        .msg-message-bubble.received {
          background-color: white;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        .msg-message-text {
          font-size: 14px;
          margin: 0;
          word-wrap: break-word;
        }

        .msg-message-edited {
          font-size: 12px;
          opacity: 0.7;
          margin-top: 4px;
        }

        .msg-message-footer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .msg-message-footer.sent {
          justify-content: flex-end;
        }

        .msg-message-footer.received {
          justify-content: flex-start;
        }

        .msg-status-icon {
          width: 16px;
          height: 16px;
        }

        .msg-status-sending {
          color: #9ca3af;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .msg-status-sent {
          color: #9ca3af;
        }

        .msg-status-delivered {
          color: #9ca3af;
        }

        .msg-status-read {
          color: #2563eb;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .msg-message-options-btn {
          padding: 4px;
          background: none;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-message-options-btn:hover {
          background-color: #e5e7eb;
        }

        .msg-message-options-icon {
          width: 12px;
          height: 12px;
          color: #6b7280;
        }

        /* Message Options Menu */
        .msg-message-options-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
          padding: 4px 0;
          min-width: 120px;
        }

        .msg-option-menu-item {
          width: 100%;
          padding: 8px 12px;
          background: none;
          border: none;
          text-align: left;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .msg-option-menu-item:hover {
          background-color: #f3f4f6;
        }

        .msg-option-menu-item.danger {
          color: #dc2626;
        }

        .msg-option-menu-item.danger:hover {
          background-color: #fef2f2;
        }

        .msg-option-menu-icon {
          width: 16px;
          height: 16px;
        }

        /* Message Editing */
        .msg-edit-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .msg-edit-textarea {
          width: 100%;
          padding: 8px;
          color: #111827;
          background-color: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          resize: none;
          outline: none;
          transition: all 0.2s;
        }

        .msg-edit-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .msg-edit-actions {
          display: flex;
          gap: 8px;
        }

        .msg-edit-save-btn {
          padding: 4px 12px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-edit-save-btn:hover {
          background-color: #1d4ed8;
        }

        .msg-edit-cancel-btn {
          padding: 4px 12px;
          background-color: #d1d5db;
          color: #374151;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-edit-cancel-btn:hover {
          background-color: #9ca3af;
        }

        /* Message Input Area */
        .msg-input-area {
          background-color: white;
          border-top: 1px solid #e5e7eb;
          padding: 16px;
        }

        .msg-input-container {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .msg-input-attachments {
          display: flex;
          gap: 4px;
        }

        .msg-input-action-btn {
          padding: 8px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #6b7280;
        }

        .msg-input-action-btn:hover {
          background-color: #f3f4f6;
        }

        .msg-input-action-icon {
          width: 20px;
          height: 20px;
        }

        .msg-input-wrapper {
          flex: 1;
          position: relative;
        }

        .msg-input-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          resize: none;
          outline: none;
          transition: all 0.2s;
          min-height: 40px;
          max-height: 128px;
        }

        .msg-input-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .msg-send-btn {
          padding: 8px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-send-btn.enabled {
          background-color: #2563eb;
          color: white;
        }

        .msg-send-btn.enabled:hover {
          background-color: #1d4ed8;
        }

        .msg-send-btn.disabled {
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .msg-send-icon {
          width: 20px;
          height: 20px;
        }

        /* Empty State */
        .msg-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 32px;
          text-align: center;
        }

        .msg-empty-icon {
          width: 64px;
          height: 64px;
          color: #d1d5db;
          margin-bottom: 16px;
        }

        .msg-empty-title {
          font-size: 18px;
          font-weight: 500;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .msg-empty-description {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 24px 0;
        }

        .msg-empty-action {
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-empty-action:hover {
          background-color: #1d4ed8;
        }

        /* No Conversation Selected */
        .msg-no-selection {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          text-align: center;
        }

        .msg-no-selection-content {
          max-width: 400px;
          padding: 32px;
        }

        .msg-no-selection-icon {
          width: 64px;
          height: 64px;
          color: #d1d5db;
          margin: 0 auto 16px;
        }

        .msg-no-selection-title {
          font-size: 20px;
          font-weight: 500;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .msg-no-selection-description {
          color: #6b7280;
          margin: 0 0 24px 0;
        }

        .msg-no-selection-action {
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-no-selection-action:hover {
          background-color: #1d4ed8;
        }

        /* New Chat Modal */
        .msg-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .msg-modal {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          width: 100%;
          max-width: 448px;
          margin: 16px;
        }

        .msg-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .msg-modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .msg-modal-close-btn {
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          color: #9ca3af;
        }

        .msg-modal-close-btn:hover {
          color: #6b7280;
        }

        .msg-modal-close-icon {
          width: 20px;
          height: 20px;
        }

        .msg-modal-content {
          padding: 24px;
        }

        .msg-modal-search-container {
          position: relative;
          margin-bottom: 16px;
        }

        .msg-modal-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #9ca3af;
        }

        .msg-modal-search-input {
          width: 100%;
          padding: 8px 16px 8px 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }

        .msg-modal-search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .msg-modal-users-list {
          max-height: 240px;
          overflow-y: auto;
        }

        .msg-modal-users-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .msg-modal-user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .msg-modal-user-item:hover {
          background-color: #f9fafb;
        }

        .msg-modal-user-avatar-container {
          position: relative;
        }

        .msg-modal-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .msg-modal-user-online {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }

        .msg-modal-user-info {
          flex: 1;
          min-width: 0;
        }

        .msg-modal-user-name {
          font-weight: 500;
          color: #111827;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .msg-modal-user-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }

        .msg-modal-user-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 12px;
        }

        .msg-modal-user-badge.candidat {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .msg-modal-user-badge.recruteur {
          background-color: #dcfce7;
          color: #166534;
        }

        .msg-modal-user-online-status {
          color: #059669;
          font-size: 12px;
        }

        .msg-modal-user-company {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .msg-modal-empty {
          text-align: center;
          padding: 32px;
        }

        .msg-modal-empty-icon {
          width: 48px;
          height: 48px;
          color: #d1d5db;
          margin: 0 auto 12px;
        }

        .msg-modal-empty-text {
          color: #6b7280;
          margin: 0;
        }

        /* Styles pour les statuts de messages */
        .message-status-container {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .message-status {
          display: inline-flex;
          align-items: center;
        }

        .status-icon {
          width: 16px;
          height: 16px;
        }

        .message-status.sending .status-icon {
          color: #9ca3af;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .message-status.sent .status-icon {
          color: #9ca3af;
        }

        .message-status.delivered .status-icon {
          color: #9ca3af;
        }

        .message-status.read .status-icon.read-icon {
          color: #3b82f6;
        }

        .message-time {
          font-size: 12px;
          color: #6b7280;
        }

        .msg-message-bubble.sent {
          background-color: #2563eb;
          color: white;
          position: relative;
        }

        .msg-message-bubble.received {
          background-color: white;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        .msg-message-footer.sent {
          justify-content: flex-end;
          align-items: center;
          gap: 4px;
        }

        .msg-message-footer.received {
          justify-content: flex-start;
        }

        .msg-message-wrapper {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .msg-last-message.unread {
          font-weight: 600;
          color: #111827;
        }

        .msg-conversation-item .msg-last-message-status {
          margin-left: 4px;
        }

        .read-icon {
          color: #3b82f6 !important;
          filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
        }

        /* Scrollbar Styling */
        .msg-conversations-list::-webkit-scrollbar,
        .msg-messages-area::-webkit-scrollbar,
        .msg-modal-users-list::-webkit-scrollbar {
          width: 6px;
        }

        .msg-conversations-list::-webkit-scrollbar-track,
        .msg-messages-area::-webkit-scrollbar-track,
        .msg-modal-users-list::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .msg-conversations-list::-webkit-scrollbar-thumb,
        .msg-messages-area::-webkit-scrollbar-thumb,
        .msg-modal-users-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .msg-conversations-list::-webkit-scrollbar-thumb:hover,
        .msg-messages-area::-webkit-scrollbar-thumb:hover,
        .msg-modal-users-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Connection Status */}
      <div className="connection-status">
        <div className={`status-dot ${wsConnected ? 'connected' : 'disconnected'}`}></div>
        <span>{wsConnected ? 'Connecté' : 'Déconnecté'}</span>
      </div>

      {/* Sidebar */}
      <div className="msg-sidebar">
        {/* Header */}
        <div className="msg-sidebar-header">
          <div className="msg-header-top">
            <div className="msg-header-left">
              <button className="msg-back-btn" onClick={() => window.history.back()}>
                <ArrowLeft className="msg-back-icon" />
              </button>
              <div className="msg-header-info">
                <h1>Messages</h1>
                <div className="msg-connection-status">
                  <Circle className={`msg-status-dot ${isConnected ? 'online' : 'offline'}`} />
                  <span>{isConnected ? 'En ligne' : 'Hors ligne'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="msg-new-chat-btn"
              title="Nouvelle conversation"
            >
              <Plus className="msg-new-chat-icon" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="msg-search-container">
            <Search className="msg-search-icon" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="msg-search-input"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="msg-conversations-list">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(p => p._id !== currentUser?.id);
              if (!otherParticipant) return null;

              return (
                <div
                  key={conversation._id}
                  onClick={() => selectConversation(conversation)}
                  className={`msg-conversation-item ${
                    selectedConversation?._id === conversation._id ? 'selected' : ''
                  }`}
                >
                  <div className="msg-conversation-content">
                    <div className="msg-avatar-container">
                      <img
                        src={otherParticipant.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                        alt={otherParticipant.name}
                        className="msg-avatar"
                      />
                      {otherParticipant.isOnline && (
                        <div className="msg-online-indicator"></div>
                      )}
                    </div>
                    
                    <div className="msg-conversation-info">
                      <div className="msg-conversation-header">
                        <h3 className="msg-conversation-name">
                          {otherParticipant.name}
                        </h3>
                        <div className="msg-conversation-time">
                          <span>{formatTimestamp(conversation.updatedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="msg-conversation-footer">
                        <p className="msg-last-message">
                          {conversation.lastMessage?.content || 'Aucun message'}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="msg-unread-badge">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <div className="msg-company-info">
                        <Briefcase className="msg-company-icon" />
                        <span>{otherParticipant.company} - {otherParticipant.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="msg-empty-state">
              <MessageSquare className="msg-empty-icon" />
              <h3 className="msg-empty-title">
                {searchQuery ? 'Aucun résultat' : 'Aucune conversation'}
              </h3>
              <p className="msg-empty-description">
                {searchQuery 
                  ? 'Essayez avec d\'autres mots-clés'
                  : 'Commencez une nouvelle conversation'
                }
              </p>
              <button
                onClick={() => setShowNewChatModal(true)}
                className="msg-empty-action"
              >
                Nouvelle conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedConversation ? (
        <div className="msg-chat-area">
          {/* Chat Header */}
          <div className="msg-chat-header">
            <div className="msg-chat-header-content">
              <div className="msg-chat-user-info">
                {(() => {
                  const otherParticipant = selectedConversation.participants.find(p => p._id !== currentUser?.id);
                  return (
                    <>
                      <div className="msg-chat-avatar-container">
                        <img
                          src={otherParticipant?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                          alt={otherParticipant?.name}
                          className="msg-chat-avatar"
                        />
                        {otherParticipant?.isOnline && (
                          <div className="msg-chat-online-indicator"></div>
                        )}
                      </div>
                      <div className="msg-chat-user-details">
                        <h2>{otherParticipant?.name}</h2>
                        <div className="msg-chat-user-status">
                          <Briefcase className="msg-company-icon" />
                          <span>{otherParticipant?.company} - {otherParticipant?.position}</span>
                          {!otherParticipant?.isOnline && (
                            <>
                              <span>•</span>
                              <span>Vu {formatTimestamp(otherParticipant?.lastSeen)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              <div className="msg-chat-actions">
                <button className="msg-chat-action-btn" title="Appel vocal">
                  <Phone className="msg-chat-action-icon" />
                </button>
                <button className="msg-chat-action-btn" title="Appel vidéo">
                  <Video className="msg-chat-action-icon" />
                </button>
                <button className="msg-chat-action-btn" title="Informations">
                  <Info className="msg-chat-action-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="msg-messages-area">
            <div className="msg-messages-container">
              {messages[selectedConversation._id]?.map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input Area */}
          <div className="msg-input-area">
            <div className="msg-input-container">
              <div className="msg-input-attachments">
                <button className="msg-input-action-btn" title="Emoji">
                  <Smile className="msg-input-action-icon" />
                </button>
                <button className="msg-input-action-btn" title="Joindre une image">
                  <Image className="msg-input-action-icon" />
                </button>
                <button className="msg-input-action-btn" title="Joindre un fichier">
                  <File className="msg-input-action-icon" />
                </button>
              </div>
              
              <div className="msg-input-wrapper">
                <textarea
                  ref={messageInputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="msg-input-textarea"
                  rows="1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={sendingMessage}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sendingMessage}
                className={`msg-send-btn ${
                  newMessage.trim() && !sendingMessage ? 'enabled' : 'disabled'
                }`}
                title="Envoyer"
              >
                <Send className="msg-send-icon" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* No Conversation Selected */
        <div className="msg-no-selection">
          <div className="msg-no-selection-content">
            <MessageSquare className="msg-no-selection-icon" />
            <h2 className="msg-no-selection-title">Sélectionnez une conversation</h2>
            <p className="msg-no-selection-description">
              Choisissez une conversation dans la liste ou commencez une nouvelle discussion
            </p>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="msg-no-selection-action"
            >
              Nouvelle conversation
            </button>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="msg-modal-overlay">
          <div className="msg-modal">
            <div className="msg-modal-header">
              <h3 className="msg-modal-title">
                Nouvelle conversation
              </h3>
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setNewChatSearch('');
                }}
                className="msg-modal-close-btn"
              >
                <X className="msg-modal-close-icon" />
              </button>
            </div>
            
            <div className="msg-modal-content">
              <div className="msg-modal-search-container">
                <Search className="msg-modal-search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={newChatSearch}
                  onChange={(e) => setNewChatSearch(e.target.value)}
                  className="msg-modal-search-input"
                />
              </div>
              
              <div className="msg-modal-users-list">
                {availableUsersForChat.length > 0 ? (
                  <div className="msg-modal-users-container">
                    {availableUsersForChat.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => startNewConversation(user)}
                        className="msg-modal-user-item"
                      >
                        <div className="msg-modal-user-avatar-container">
                          <img
                            src={user.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                            alt={user.name}
                            className="msg-modal-user-avatar"
                          />
                          {user.isOnline && (
                            <div className="msg-modal-user-online"></div>
                          )}
                        </div>
                        
                        <div className="msg-modal-user-info">
                          <h4 className="msg-modal-user-name">
                            {user.name}
                          </h4>
                          <div className="msg-modal-user-meta">
                            <span className={`msg-modal-user-badge ${user.role}`}>
                              {user.role === 'candidat' ? 'Candidat' : 'Recruteur'}
                            </span>
                            {user.isOnline && (
                              <span className="msg-modal-user-online-status">En ligne</span>
                            )}
                          </div>
                          <p className="msg-modal-user-company">
                            {user.company} - {user.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="msg-modal-empty">
                    <Users className="msg-modal-empty-icon" />
                    <p className="msg-modal-empty-text">
                      {newChatSearch 
                        ? 'Aucun utilisateur trouvé' 
                        : 'Aucun utilisateur disponible'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
            


