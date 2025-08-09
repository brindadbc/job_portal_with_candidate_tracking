// Service pour les API des messages
class MessageService {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
  }

  // Obtenir le token d'authentification
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Headers par défaut avec authentification
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthToken()}`
    };
  }

  // Obtenir toutes les conversations
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

  // Obtenir les utilisateurs disponibles
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

  // Obtenir ou créer une conversation
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

  // Obtenir les messages d'une conversation
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

  // Envoyer un message
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

  // Modifier un message
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

  // Supprimer un message
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

  // Marquer les messages comme lus
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


// Export de l'instance du service
const messageService = new MessageService();
export default messageService;