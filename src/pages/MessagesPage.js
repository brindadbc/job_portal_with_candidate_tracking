// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   MessageSquare, 
//   Search, 
//   Send, 
//   Paperclip, 
//   MoreVertical,
//   Phone,
//   Video,
//   Info,
//   Archive,
//   Star,
//   StarOff,
//   Reply,
//   Forward,
//   Download,
//   User,
//   Clock,
//   CheckCheck,
//   Check
// } from 'lucide-react';
// import '../styles/pages/message.css';

// const MessagesPage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       name: 'Marie Dubois',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Merci pour votre retour rapide !',
//       timestamp: '14:30',
//       unread: 2,
//       online: true,
//       type: 'candidate'
//     },
//     {
//       id: 2,
//       name: 'Jean Martin',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Quand pouvons-nous programmer l\'entretien ?',
//       timestamp: '12:15',
//       unread: 0,
//       online: false,
//       type: 'candidate'
//     },
//     {
//       id: 3,
//       name: 'Sophie Laurent',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'J\'ai quelques questions sur le poste',
//       timestamp: 'Hier',
//       unread: 1,
//       online: true,
//       type: 'candidate'
//     }
//   ]);

//   const [messages, setMessages] = useState({
//     1: [
//       {
//         id: 1,
//         senderId: 1,
//         content: 'Bonjour, je suis intéressée par le poste de Senior React Developer',
//         timestamp: '10:30',
//         status: 'read'
//       },
//       {
//         id: 2,
//         senderId: 'me',
//         content: 'Bonjour Marie, merci pour votre candidature. J\'ai examiné votre profil et il correspond parfaitement à nos besoins.',
//         timestamp: '10:45',
//         status: 'delivered'
//       },
//       {
//         id: 3,
//         senderId: 1,
//         content: 'Merci pour votre retour rapide !',
//         timestamp: '14:30',
//         status: 'read'
//       }
//     ],
//     2: [
//       {
//         id: 4,
//         senderId: 2,
//         content: 'Bonjour, suite à notre échange téléphonique',
//         timestamp: '11:00',
//         status: 'read'
//       },
//       {
//         id: 5,
//         senderId: 'me',
//         content: 'Bonjour Jean, nous pouvons programmer l\'entretien pour cette semaine.',
//         timestamp: '11:30',
//         status: 'delivered'
//       },
//       {
//         id: 6,
//         senderId: 2,
//         content: 'Quand pouvons-nous programmer l\'entretien ?',
//         timestamp: '12:15',
//         status: 'read'
//       }
//     ]
//   });

//   const filteredConversations = conversations.filter(conv =>
//     conv.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedConversation) {
//       const newMsg = {
//         id: Date.now(),
//         senderId: 'me',
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         status: 'sent'
//       };

//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
//       }));

//       setConversations(prev => prev.map(conv =>
//         conv.id === selectedConversation.id
//           ? { ...conv, lastMessage: newMessage, timestamp: 'Maintenant', unread: 0 }
//           : conv
//       ));

//       setNewMessage('');
//     }
//   };

//   const getMessageStatus = (status) => {
//     switch (status) {
//       case 'sent':
//         return <Check className="w-4 h-4 text-gray-400" />;
//       case 'delivered':
//         return <CheckCheck className="w-4 h-4 text-gray-400" />;
//       case 'read':
//         return <CheckCheck className="w-4 h-4 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="messages-page">
//       <div className="messages-sidebar">
//         <div className="messages-header">
//           <h2>Messages</h2>
//           <div className="search-container">
//             <Search className="search-icon" />
//             <input
//               type="text"
//               placeholder="Rechercher une conversation..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </div>
//         </div>

//         <div className="conversations-list">
//           {filteredConversations.map(conversation => (
//             <div
//               key={conversation.id}
//               className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
//               onClick={() => setSelectedConversation(conversation)}
//             >
//               <div className="conversation-avatar">
//                 <img src={conversation.avatar} alt={conversation.name} />
//                 {conversation.online && <div className="online-indicator" />}
//               </div>
//               <div className="conversation-info">
//                 <div className="conversation-header">
//                   <h4>{conversation.name}</h4>
//                   <span className="timestamp">{conversation.timestamp}</span>
//                 </div>
//                 <div className="conversation-preview">
//                   <p>{conversation.lastMessage}</p>
//                   {conversation.unread > 0 && (
//                     <span className="unread-badge">{conversation.unread}</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="messages-main">
//         {selectedConversation ? (
//           <>
//             <div className="chat-header">
//               <div className="chat-user-info">
//                 <img src={selectedConversation.avatar} alt={selectedConversation.name} />
//                 <div>
//                   <h3>{selectedConversation.name}</h3>
//                   <span className={`status ${selectedConversation.online ? 'online' : 'offline'}`}>
//                     {selectedConversation.online ? 'En ligne' : 'Hors ligne'}
//                   </span>
//                 </div>
//               </div>
//               <div className="chat-actions">
//                 <button className="btn-icon">
//                   <Phone className="w-5 h-5" />
//                 </button>
//                 <button className="btn-icon">
//                   <Video className="w-5 h-5" />
//                 </button>
//                 <button className="btn-icon">
//                   <Info className="w-5 h-5" />
//                 </button>
//                 <button className="btn-icon">
//                   <MoreVertical className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="chat-messages">
//               {messages[selectedConversation.id]?.map(message => (
//                 <div
//                   key={message.id}
//                   className={`message ${message.senderId === 'me' ? 'sent' : 'received'}`}
//                 >
//                   <div className="message-content">
//                     <p>{message.content}</p>
//                     <div className="message-meta">
//                       <span className="message-time">{message.timestamp}</span>
//                       {message.senderId === 'me' && getMessageStatus(message.status)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="chat-input">
//               <div className="input-container">
//                 <button className="btn-icon">
//                   <Paperclip className="w-5 h-5" />
//                 </button>
//                 <input
//                   type="text"
//                   placeholder="Tapez votre message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <button
//                   className="btn-send"
//                   onClick={handleSendMessage}
//                   disabled={!newMessage.trim()}
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="no-conversation">
//             <MessageSquare className="w-16 h-16 text-gray-400" />
//             <h3>Sélectionnez une conversation</h3>
//             <p>Choisissez une conversation dans la liste pour commencer à discuter</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;



// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   ArrowLeft, 
//   Plus, 
//   Search, 
//   Phone, 
//   Video, 
//   Info, 
//   Send, 
//   Paperclip, 
//   MessageSquare, 
//   X, 
//   Users,
//   Check,
//   CheckCheck,
//   MoreVertical,
//   Edit2,
//   Trash2,
//   Reply
// } from 'lucide-react';

// const MessagesPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [showNewChatModal, setShowNewChatModal] = useState(false);
//   const [newChatSearch, setNewChatSearch] = useState('');
//   const [userType, setUserType] = useState('recruiter');
//   const [showMessageOptions, setShowMessageOptions] = useState(null);
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [editContent, setEditContent] = useState('');
//   const messagesEndRef = useRef(null);

//   // Navigation function
//   const navigateToDashboard = () => {
//     console.log('Navigating to RecruiterDashboard');
//     alert('Retour au dashboard - Remplacez par votre logique de navigation');
//   };

//   // Simulated user data
//   const [allUsers, setAllUsers] = useState([
//     { id: 101, name: 'Marie Dubois', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 102, name: 'Jean Martin', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
//     { id: 103, name: 'Sophie Laurent', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 104, name: 'Pierre Dupont', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
//     { id: 201, name: 'Alice Moreau', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 202, name: 'Thomas Bernard', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 203, name: 'Emma Wilson', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: false },
//   ]);

//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       userId: 101,
//       name: 'Marie Dubois',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Merci pour votre retour rapide !',
//       timestamp: '14:30',
//       unread: 2,
//       online: true,
//       type: 'candidate',
//       lastSeen: new Date()
//     },
//     {
//       id: 2,
//       userId: 102,
//       name: 'Jean Martin',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Quand pouvons-nous programmer l\'entretien ?',
//       timestamp: '12:15',
//       unread: 0,
//       online: false,
//       type: 'candidate',
//       lastSeen: new Date(Date.now() - 3600000)
//     },
//     {
//       id: 3,
//       userId: 103,
//       name: 'Sophie Laurent',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'J\'ai quelques questions sur le poste',
//       timestamp: 'Hier',
//       unread: 1,
//       online: true,
//       type: 'candidate',
//       lastSeen: new Date()
//     }
//   ]);

//   const [messages, setMessages] = useState({
//     1: [
//       {
//         id: 1,
//         senderId: 101,
//         content: 'Bonjour, je suis intéressée par le poste de Senior React Developer',
//         timestamp: '10:30',
//         status: 'read',
//         readBy: ['me'],
//         edited: false
//       },
//       {
//         id: 2,
//         senderId: 'me',
//         content: 'Bonjour Marie, merci pour votre candidature. J\'ai examiné votre profil et il correspond parfaitement à nos besoins.',
//         timestamp: '10:45',
//         status: 'read',
//         readBy: [101],
//         edited: false
//       },
//       {
//         id: 3,
//         senderId: 101,
//         content: 'Merci pour votre retour rapide !',
//         timestamp: '14:30',
//         status: 'delivered',
//         readBy: [],
//         edited: false
//       }
//     ],
//     2: [
//       {
//         id: 4,
//         senderId: 102,
//         content: 'Bonjour, suite à notre échange téléphonique',
//         timestamp: '11:00',
//         status: 'read',
//         readBy: ['me'],
//         edited: false
//       },
//       {
//         id: 5,
//         senderId: 'me',
//         content: 'Bonjour Jean, nous pouvons programmer l\'entretien pour cette semaine.',
//         timestamp: '11:30',
//         status: 'read',
//         readBy: [102],
//         edited: false
//       },
//       {
//         id: 6,
//         senderId: 102,
//         content: 'Quand pouvons-nous programmer l\'entretien ?',
//         timestamp: '12:15',
//         status: 'delivered',
//         readBy: [],
//         edited: false
//       }
//     ]
//   });

//   // Auto scroll to bottom - MAINTENANT après la définition de messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedConversation]);

//   // Filter conversations based on search
//   const filteredConversations = conversations.filter(conv =>
//     conv.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Filter users for new chat
//   const availableUsersForChat = allUsers.filter(user => {
//     const typeMatch = userType === 'recruiter' ? user.type === 'candidate' : user.type === 'recruiter';
//     const searchMatch = user.name.toLowerCase().includes(newChatSearch.toLowerCase());
//     const notAlreadyInConversations = !conversations.some(conv => conv.userId === user.id);
//     return typeMatch && searchMatch && notAlreadyInConversations;
//   });

//   // Handle sending a message
//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedConversation) {
//       const newMsg = {
//         id: Date.now(),
//         senderId: 'me',
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         status: 'sent',
//         readBy: [],
//         edited: false
//       };

//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
//       }));

//       setConversations(prev => prev.map(conv =>
//         conv.id === selectedConversation.id
//           ? { ...conv, lastMessage: newMessage, timestamp: 'Maintenant', unread: 0 }
//           : conv
//       ));

//       setNewMessage('');

//       // Simulate delivery and read status
//       setTimeout(() => {
//         setMessages(prev => ({
//           ...prev,
//           [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//             msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
//           )
//         }));
//       }, 1000);

//       setTimeout(() => {
//         setMessages(prev => ({
//           ...prev,
//           [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//             msg.id === newMsg.id ? { ...msg, status: 'read', readBy: [selectedConversation.userId] } : msg
//           )
//         }));
//       }, 3000);
//     }
//   };

//   // Handle message editing
//   const handleEditMessage = (messageId, newContent) => {
//     if (newContent.trim() && selectedConversation) {
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//           msg.id === messageId
//             ? { ...msg, content: newContent, edited: true }
//             : msg
//         )
//       }));

//       // Update last message in conversation if it was the edited one
//       const isLastMessage = messages[selectedConversation.id]
//         .findIndex(msg => msg.id === messageId) === messages[selectedConversation.id].length - 1;
      
//       if (isLastMessage) {
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: newContent }
//             : conv
//         ));
//       }
//     }
//     setEditingMessage(null);
//     setEditContent('');
//   };

//   // Handle message deletion
//   const handleDeleteMessage = (messageId) => {
//     if (selectedConversation) {
//       const updatedMessages = messages[selectedConversation.id].filter(msg => msg.id !== messageId);
      
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: updatedMessages
//       }));

//       // Update last message in conversation if the deleted one was the last
//       if (updatedMessages.length > 0) {
//         const lastMessage = updatedMessages[updatedMessages.length - 1];
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: lastMessage.content }
//             : conv
//         ));
//       } else {
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: '' }
//             : conv
//         ));
//       }
//     }
//     setShowMessageOptions(null);
//   };

//   // Start editing
//   const startEditing = (message) => {
//     setEditingMessage(message.id);
//     setEditContent(message.content);
//     setShowMessageOptions(null);
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingMessage(null);
//     setEditContent('');
//   };

//   // Start a new conversation
//   const startNewConversation = (user) => {
//     const newConv = {
//       id: Date.now(),
//       userId: user.id,
//       name: user.name,
//       avatar: user.avatar,
//       lastMessage: '',
//       timestamp: 'Maintenant',
//       unread: 0,
//       online: user.online,
//       type: user.type,
//       lastSeen: new Date()
//     };

//     setConversations(prev => [...prev, newConv]);
//     setMessages(prev => ({ ...prev, [newConv.id]: [] }));
//     setSelectedConversation(newConv);
//     setShowNewChatModal(false);
//     setNewChatSearch('');
//   };

//   // Mark messages as read
//   useEffect(() => {
//     if (selectedConversation && messages[selectedConversation.id]) {
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//           msg.senderId !== 'me' && !msg.readBy.includes('me')
//             ? { ...msg, readBy: [...msg.readBy, 'me'] }
//             : msg
//         )
//       }));

//       setConversations(prev => prev.map(conv =>
//         conv.id === selectedConversation.id
//           ? { ...conv, unread: 0 }
//           : conv
//       ));
//     }
//   }, [selectedConversation]);

//   const getMessageStatus = (status) => {
//     switch (status) {
//       case 'sent':
//         return <Check className="w-4 h-4 text-gray-400" />;
//       case 'delivered':
//         return <CheckCheck className="w-4 h-4 text-gray-400" />;
//       case 'read':
//         return <CheckCheck className="w-4 h-4 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   const formatLastSeen = (lastSeen) => {
//     const now = new Date();
//     const diff = now - lastSeen;
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 1) return 'À l\'instant';
//     if (minutes < 60) return `Il y a ${minutes} min`;
//     if (hours < 24) return `Il y a ${hours}h`;
//     return `Il y a ${days}j`;
//   };

//   // Close options when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowMessageOptions(null);
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans">
//       {/* Sidebar */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-5 border-b border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-3">
//                <button
//                               onClick={() => navigate('/RecruiterDashboard')}
//                               className="back-button"
//                             >
//                               <ArrowLeft size={20} />
//                               Retour
//                             </button>
//               <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
//             </div>
//             <button
//               onClick={() => setShowNewChatModal(true)}
//               className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors duration-200"
//               title="Nouvelle conversation"
//             >
//               <Plus className="w-5 h-5 text-white" />
//             </button>
//           </div>
          
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Rechercher une conversation..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Conversations List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredConversations.map(conversation => (
//             <div
//               key={conversation.id}
//               onClick={() => setSelectedConversation(conversation)}
//               className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 flex items-center gap-3 ${
//                 selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
//               }`}
//             >
//               <div className="relative">
//                 <img 
//                   src={conversation.avatar} 
//                   alt={conversation.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 {conversation.online && (
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                 )}
//               </div>
              
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center mb-1">
//                   <h4 className="font-medium text-gray-900 truncate">
//                     {conversation.name}
//                   </h4>
//                   <span className="text-xs text-gray-500">
//                     {conversation.timestamp}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <p className="text-sm text-gray-600 truncate max-w-44">
//                     {conversation.lastMessage}
//                   </p>
//                   {conversation.unread > 0 && (
//                     <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
//                       {conversation.unread}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedConversation ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-5 border-b border-gray-200 bg-white flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <img 
//                   src={selectedConversation.avatar} 
//                   alt={selectedConversation.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {selectedConversation.name}
//                   </h3>
//                   <span className={`text-sm ${selectedConversation.online ? 'text-green-600' : 'text-gray-500'}`}>
//                     {selectedConversation.online ? 'En ligne' : formatLastSeen(selectedConversation.lastSeen)}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" title="Appel audio">
//                   <Phone className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" title="Appel vidéo">
//                   <Video className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" title="Informations">
//                   <Info className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4">
//               {messages[selectedConversation.id]?.map(message => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className="relative group max-w-xs lg:max-w-md">
//                     <div
//                       className={`px-4 py-2 rounded-2xl shadow-sm ${
//                         message.senderId === 'me'
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-white text-gray-900'
//                       }`}
//                     >
//                       {editingMessage === message.id ? (
//                         <div className="space-y-2">
//                           <input
//                             type="text"
//                             value={editContent}
//                             onChange={(e) => setEditContent(e.target.value)}
//                             className="w-full bg-transparent border-b border-gray-300 pb-1 focus:outline-none focus:border-gray-500"
//                             autoFocus
//                             onKeyPress={(e) => {
//                               if (e.key === 'Enter') {
//                                 handleEditMessage(message.id, editContent);
//                               } else if (e.key === 'Escape') {
//                                 cancelEditing();
//                               }
//                             }}
//                           />
//                           <div className="flex gap-2 text-xs">
//                             <button 
//                               onClick={() => handleEditMessage(message.id, editContent)}
//                               className="px-2 py-1 bg-green-500 text-white rounded"
//                             >
//                               ✓
//                             </button>
//                             <button 
//                               onClick={cancelEditing}
//                               className="px-2 py-1 bg-red-500 text-white rounded"
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <p className="text-sm leading-relaxed">
//                             {message.content}
//                             {message.edited && (
//                               <span className="text-xs opacity-70 ml-2">(modifié)</span>
//                             )}
//                           </p>
//                           <div className="flex justify-end items-center gap-1 mt-1">
//                             <span className="text-xs opacity-70">
//                               {message.timestamp}
//                             </span>
//                             {message.senderId === 'me' && getMessageStatus(message.status)}
//                           </div>
//                         </>
//                       )}
//                     </div>

//                     {/* Message Options - Only for own messages */}
//                     {message.senderId === 'me' && editingMessage !== message.id && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setShowMessageOptions(showMessageOptions === message.id ? null : message.id);
//                         }}
//                         className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all duration-200"
//                       >
//                         <MoreVertical className="w-4 h-4 text-gray-500" />
//                       </button>
//                     )}

//                     {/* Options Menu */}
//                     {showMessageOptions === message.id && (
//                       <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-32">
//                         <button
//                           onClick={() => startEditing(message)}
//                           className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                           Modifier
//                         </button>
//                         <button
//                           onClick={() => handleDeleteMessage(message.id)}
//                           className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                           Supprimer
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Chat Input */}
//             <div className="p-5 border-t border-gray-200 bg-white">
//               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-full border border-gray-200">
//                 <button className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200">
//                   <Paperclip className="w-5 h-5 text-gray-500" />
//                 </button>
                
//                 <input
//                   type="text"
//                   placeholder="Tapez votre message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   className="flex-1 bg-transparent outline-none text-sm"
//                 />
                
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!newMessage.trim()}
//                   className={`p-2 rounded-full transition-colors duration-200 ${
//                     newMessage.trim() 
//                       ? 'bg-blue-500 hover:bg-blue-600 text-white' 
//                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
//             <MessageSquare className="w-16 h-16 mb-4 text-gray-300" />
//             <h3 className="text-xl font-medium mb-2">Sélectionnez une conversation</h3>
//             <p className="text-sm text-center max-w-xs">
//               Choisissez une conversation dans la liste ou créez une nouvelle discussion pour commencer
//             </p>
//           </div>
//         )}
//       </div>

//       {/* New Chat Modal */}
//       {showNewChatModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-md max-h-[600px] flex flex-col">
//             <div className="p-5 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-lg font-medium">Nouvelle conversation</h3>
//               <button
//                 onClick={() => {
//                   setShowNewChatModal(false);
//                   setNewChatSearch('');
//                 }}
//                 className="p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="p-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder={`Rechercher des ${userType === 'recruiter' ? 'candidats' : 'recruteurs'}...`}
//                   value={newChatSearch}
//                   onChange={(e) => setNewChatSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               {availableUsersForChat.map(user => (
//                 <div
//                   key={user.id}
//                   onClick={() => startNewConversation(user)}
//                   className="p-4 cursor-pointer hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="relative">
//                     <img 
//                       src={user.avatar} 
//                       alt={user.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     {user.online && (
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-900">{user.name}</h4>
//                     <p className="text-sm text-gray-500 capitalize">
//                       {user.type === 'candidate' ? 'Candidat' : 'Recruteur'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
              
//               {availableUsersForChat.length === 0 && (
//                 <div className="p-10 text-center text-gray-500">
//                   <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                   <p className="text-sm">
//                     {newChatSearch 
//                       ? 'Aucun utilisateur trouvé' 
//                       : `Aucun ${userType === 'recruiter' ? 'candidat' : 'recruteur'} disponible`
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesPage;

// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/pages/message.css';
// import { 
//   ArrowLeft, 
//   Plus, 
//   Search, 
//   Phone, 
//   Video, 
//   Info, 
//   Send, 
//   Paperclip, 
//   MessageSquare, 
//   X, 
//   Users,
//   Check,
//   CheckCheck,
//   MoreVertical,
//   Edit2,
//   Trash2,
//   Reply
// } from 'lucide-react';

// const MessagesPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [showNewChatModal, setShowNewChatModal] = useState(false);
//   const [newChatSearch, setNewChatSearch] = useState('');
//   const [userType, setUserType] = useState('recruiter');
//   const [showMessageOptions, setShowMessageOptions] = useState(null);
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [editContent, setEditContent] = useState('');
//   const messagesEndRef = useRef(null);

//   // Navigation function
//   const navigateToDashboard = () => {
//     window.location.href = '/dashboard';
//   };

//   // Simulated user data
//   const [allUsers, setAllUsers] = useState([
//     { id: 101, name: 'Marie Dubois', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 102, name: 'Jean Martin', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
//     { id: 103, name: 'Sophie Laurent', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 104, name: 'Pierre Dupont', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
//     { id: 201, name: 'Alice Moreau', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 202, name: 'Thomas Bernard', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
//     { id: 203, name: 'Emma Wilson', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: false },
//   ]);

//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       userId: 101,
//       name: 'Marie Dubois',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Merci pour votre retour rapide !',
//       timestamp: '14:30',
//       unread: 2,
//       online: true,
//       type: 'candidate',
//       lastSeen: new Date()
//     },
//     {
//       id: 2,
//       userId: 102,
//       name: 'Jean Martin',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'Quand pouvons-nous programmer l\'entretien ?',
//       timestamp: '12:15',
//       unread: 0,
//       online: false,
//       type: 'candidate',
//       lastSeen: new Date(Date.now() - 3600000)
//     },
//     {
//       id: 3,
//       userId: 103,
//       name: 'Sophie Laurent',
//       avatar: 'https://via.placeholder.com/40x40',
//       lastMessage: 'J\'ai quelques questions sur le poste',
//       timestamp: 'Hier',
//       unread: 1,
//       online: true,
//       type: 'candidate',
//       lastSeen: new Date()
//     }
//   ]);

//   const [messages, setMessages] = useState({
//     1: [
//       {
//         id: 1,
//         senderId: 101,
//         content: 'Bonjour, je suis intéressée par le poste de Senior React Developer',
//         timestamp: '10:30',
//         status: 'read',
//         readBy: ['me'],
//         edited: false
//       },
//       {
//         id: 2,
//         senderId: 'me',
//         content: 'Bonjour Marie, merci pour votre candidature. J\'ai examiné votre profil et il correspond parfaitement à nos besoins.',
//         timestamp: '10:45',
//         status: 'read',
//         readBy: [101],
//         edited: false
//       },
//       {
//         id: 3,
//         senderId: 101,
//         content: 'Merci pour votre retour rapide !',
//         timestamp: '14:30',
//         status: 'delivered',
//         readBy: [],
//         edited: false
//       }
//     ],
//     2: [
//       {
//         id: 4,
//         senderId: 102,
//         content: 'Bonjour, suite à notre échange téléphonique',
//         timestamp: '11:00',
//         status: 'read',
//         readBy: ['me'],
//         edited: false
//       },
//       {
//         id: 5,
//         senderId: 'me',
//         content: 'Bonjour Jean, nous pouvons programmer l\'entretien pour cette semaine.',
//         timestamp: '11:30',
//         status: 'read',
//         readBy: [102],
//         edited: false
//       },
//       {
//         id: 6,
//         senderId: 102,
//         content: 'Quand pouvons-nous programmer l\'entretien ?',
//         timestamp: '12:15',
//         status: 'delivered',
//         readBy: [],
//         edited: false
//       }
//     ]
//   });

//   // Auto scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedConversation]);

//   // Filter conversations based on search
//   const filteredConversations = conversations.filter(conv =>
//     conv.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Filter users for new chat
//   const availableUsersForChat = allUsers.filter(user => {
//     const typeMatch = userType === 'recruiter' ? user.type === 'candidate' : user.type === 'recruiter';
//     const searchMatch = user.name.toLowerCase().includes(newChatSearch.toLowerCase());
//     const notAlreadyInConversations = !conversations.some(conv => conv.userId === user.id);
//     return typeMatch && searchMatch && notAlreadyInConversations;
//   });

//   // Handle sending a message
//   const handleSendMessage = () => {
//     if (newMessage.trim() && selectedConversation) {
//       const newMsg = {
//         id: Date.now(),
//         senderId: 'me',
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         status: 'sent',
//         readBy: [],
//         edited: false
//       };

//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
//       }));

//       setConversations(prev => prev.map(conv =>
//         conv.id === selectedConversation.id
//           ? { ...conv, lastMessage: newMessage, timestamp: 'Maintenant', unread: 0 }
//           : conv
//       ));

//       setNewMessage('');

//       // Simulate delivery and read status
//       setTimeout(() => {
//         setMessages(prev => ({
//           ...prev,
//           [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//             msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
//           )
//         }));
//       }, 1000);

//       setTimeout(() => {
//         setMessages(prev => ({
//           ...prev,
//           [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//             msg.id === newMsg.id ? { ...msg, status: 'read', readBy: [selectedConversation.userId] } : msg
//           )
//         }));
//       }, 3000);
//     }
//   };

//   // Handle message editing
//   const handleEditMessage = (messageId, newContent) => {
//     if (newContent.trim() && selectedConversation) {
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//           msg.id === messageId
//             ? { ...msg, content: newContent, edited: true }
//             : msg
//         )
//       }));

//       // Update last message in conversation if it was the edited one
//       const isLastMessage = messages[selectedConversation.id]
//         .findIndex(msg => msg.id === messageId) === messages[selectedConversation.id].length - 1;
      
//       if (isLastMessage) {
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: newContent }
//             : conv
//         ));
//       }
//     }
//     setEditingMessage(null);
//     setEditContent('');
//   };

//   // Handle message deletion
//   const handleDeleteMessage = (messageId) => {
//     if (selectedConversation) {
//       const updatedMessages = messages[selectedConversation.id].filter(msg => msg.id !== messageId);
      
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: updatedMessages
//       }));

//       // Update last message in conversation if the deleted one was the last
//       if (updatedMessages.length > 0) {
//         const lastMessage = updatedMessages[updatedMessages.length - 1];
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: lastMessage.content }
//             : conv
//         ));
//       } else {
//         setConversations(prev => prev.map(conv =>
//           conv.id === selectedConversation.id
//             ? { ...conv, lastMessage: '' }
//             : conv
//         ));
//       }
//     }
//     setShowMessageOptions(null);
//   };

//   // Start editing
//   const startEditing = (message) => {
//     setEditingMessage(message.id);
//     setEditContent(message.content);
//     setShowMessageOptions(null);
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingMessage(null);
//     setEditContent('');
//   };

//   // Start a new conversation
//   const startNewConversation = (user) => {
//     const newConv = {
//       id: Date.now(),
//       userId: user.id,
//       name: user.name,
//       avatar: user.avatar,
//       lastMessage: '',
//       timestamp: 'Maintenant',
//       unread: 0,
//       online: user.online,
//       type: user.type,
//       lastSeen: new Date()
//     };

//     setConversations(prev => [...prev, newConv]);
//     setMessages(prev => ({ ...prev, [newConv.id]: [] }));
//     setSelectedConversation(newConv);
//     setShowNewChatModal(false);
//     setNewChatSearch('');
//   };

//   // Mark messages as read
//   useEffect(() => {
//     if (selectedConversation && messages[selectedConversation.id]) {
//       setMessages(prev => ({
//         ...prev,
//         [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
//           msg.senderId !== 'me' && !msg.readBy.includes('me')
//             ? { ...msg, readBy: [...msg.readBy, 'me'] }
//             : msg
//         )
//       }));

//       setConversations(prev => prev.map(conv =>
//         conv.id === selectedConversation.id
//           ? { ...conv, unread: 0 }
//           : conv
//       ));
//     }
//   }, [selectedConversation]);

//   const getMessageStatus = (status) => {
//     switch (status) {
//       case 'sent':
//         return <Check style={{ width: '16px', height: '16px', color: '#9ca3af' }} />;
//       case 'delivered':
//         return <CheckCheck style={{ width: '16px', height: '16px', color: '#9ca3af' }} />;
//       case 'read':
//         return <CheckCheck style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
//       default:
//         return null;
//     }
//   };

//   const formatLastSeen = (lastSeen) => {
//     const now = new Date();
//     const diff = now - lastSeen;
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 1) return 'À l\'instant';
//     if (minutes < 60) return `Il y a ${minutes} min`;
//     if (hours < 24) return `Il y a ${hours}h`;
//     return `Il y a ${days}j`;
//   };

//   // Close options when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowMessageOptions(null);
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
    

//       <div className="messages-container">
//         {/* Sidebar */}
//         <div className="sidebar">
//           {/* Header */}
//           <div className="sidebar-header">
//             <div className="header-top">
//               <div className="header-title-section">
//                 <button onClick={navigateToDashboard} className="back-button">
//                   <ArrowLeft size={20} />
//                   Retour
//                 </button>
//                 <h2 className="page-title">Messages</h2>
//               </div>
//               <button
//                 onClick={() => setShowNewChatModal(true)}
//                 className="new-chat-button"
//                 title="Nouvelle conversation"
//               >
//                 {/* <Plus style={{ width: '20px', height: '20px' }} />
//               </button>
//             </div>
            
//             <div className="search-container">
//               <Search className="search */}
             
//               <Plus size={20} />
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Rechercher une conversation..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Conversations List */}
//           <div className="flex-1 overflow-y-auto">
//             {filteredConversations.map((conversation) => (
//               <div
//                 key={conversation.id}
//                 onClick={() => setSelectedConversation(conversation)}
//                 className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
//                   selectedConversation?.id === conversation.id
//                     ? 'bg-blue-50 border-l-blue-500'
//                     : 'border-l-transparent'
//                 }`}
//               >
//                 <div className="relative">
//                   <img
//                     src={conversation.avatar}
//                     alt={conversation.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   {conversation.online && (
//                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
//                   )}
//                 </div>
//                 <div className="ml-3 flex-1 min-w-0">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {conversation.name}
//                     </h3>
//                     <span className="text-xs text-gray-500">
//                       {conversation.timestamp}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-gray-600 truncate">
//                       {conversation.lastMessage}
//                     </p>
//                     {conversation.unread > 0 && (
//                       <span className="inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-500 rounded-full">
//                         {conversation.unread}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                       conversation.type === 'candidate' ? 'bg-blue-400' : 'bg-purple-400'
//                     }`}></span>
//                     <span className="text-xs text-gray-400">
//                       {conversation.type === 'candidate' ? 'Candidat' : 'Recruteur'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Chat Area */}
//         <div className="flex-1 flex flex-col">
//           {selectedConversation ? (
//             <>
//               {/* Chat Header */}
//               <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <img
//                       src={selectedConversation.avatar}
//                       alt={selectedConversation.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     {selectedConversation.online && (
//                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                     )}
//                   </div>
//                   <div className="ml-3">
//                     <h2 className="font-semibold text-gray-900">
//                       {selectedConversation.name}
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       {selectedConversation.online
//                         ? 'En ligne'
//                         : `Vu ${formatLastSeen(selectedConversation.lastSeen)}`
//                       }
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <Phone size={20} className="text-gray-600" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <Video size={20} className="text-gray-600" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <Info size={20} className="text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages Area */}
//               <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 <div className="space-y-4">
//                   {(messages[selectedConversation.id] || []).map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                           message.senderId === 'me'
//                             ? 'bg-blue-500 text-white'
//                             : 'bg-white text-gray-900'
//                         }`}
//                         onContextMenu={(e) => {
//                           e.preventDefault();
//                           if (message.senderId === 'me') {
//                             setShowMessageOptions(message.id);
//                           }
//                         }}
//                       >
//                         {editingMessage === message.id ? (
//                           <div className="space-y-2">
//                             <textarea
//                               value={editContent}
//                               onChange={(e) => setEditContent(e.target.value)}
//                               className="w-full p-2 border border-gray-300 rounded text-gray-900 resize-none"
//                               rows="2"
//                               autoFocus
//                             />
//                             <div className="flex justify-end space-x-2">
//                               <button
//                                 onClick={() => handleEditMessage(message.id, editContent)}
//                                 className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//                               >
//                                 Sauvegarder
//                               </button>
//                               <button
//                                 onClick={cancelEditing}
//                                 className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
//                               >
//                                 Annuler
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <>
//                             <p className="text-sm">{message.content}</p>
//                             {message.edited && (
//                               <span className="text-xs opacity-75 italic"> (modifié)</span>
//                             )}
//                             <div className="flex items-center justify-between mt-1">
//                               <span className="text-xs opacity-75">{message.timestamp}</span>
//                               {message.senderId === 'me' && (
//                                 <div className="flex items-center space-x-1">
//                                   {getMessageStatus(message.status)}
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       setShowMessageOptions(
//                                         showMessageOptions === message.id ? null : message.id
//                                       );
//                                     }}
//                                     className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
//                                   >
//                                     <MoreVertical size={14} />
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           </>
//                         )}

//                         {/* Message Options */}
//                         {showMessageOptions === message.id && message.senderId === 'me' && (
//                           <div className="absolute top-0 right-0 mt-8 mr-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
//                             <button
//                               onClick={() => startEditing(message)}
//                               className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             >
//                               <Edit2 size={14} className="mr-2" />
//                               Modifier
//                             </button>
//                             <button
//                               onClick={() => handleDeleteMessage(message.id)}
//                               className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
//                             >
//                               <Trash2 size={14} className="mr-2" />
//                               Supprimer
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>
//               </div>

//               {/* Message Input */}
//               <div className="bg-white border-t border-gray-200 p-4">
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <Paperclip size={20} className="text-gray-600" />
//                   </button>
//                   <div className="flex-1 relative">
//                     <input
//                       type="text"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                       placeholder="Tapez votre message..."
//                       className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!newMessage.trim()}
//                     className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             // No conversation selected
//             <div className="flex-1 flex items-center justify-center bg-gray-50">
//               <div className="text-center">
//                 <MessageSquare size={64} className="mx-auto text-gray-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                   Sélectionnez une conversation
//                 </h3>
//                 <p className="text-gray-500">
//                   Choisissez une conversation dans la liste pour commencer à discuter
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* New Chat Modal */}
//       {showNewChatModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold">Nouvelle conversation</h3>
//               <button
//                 onClick={() => setShowNewChatModal(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4">
//               <div className="relative mb-4">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//                 <input
//                   type="text"
//                   placeholder="Rechercher un utilisateur..."
//                   value={newChatSearch}
//                   onChange={(e) => setNewChatSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="max-h-60 overflow-y-auto">
//                 {availableUsersForChat.length > 0 ? (
//                   availableUsersForChat.map((user) => (
//                     <div
//                       key={user.id}
//                       onClick={() => startNewConversation(user)}
//                       className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
//                     >
//                       <div className="relative">
//                         <img
//                           src={user.avatar}
//                           alt={user.name}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         {user.online && (
//                           <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                         )}
//                       </div>
//                       <div className="ml-3 flex-1">
//                         <h4 className="font-medium text-gray-900">{user.name}</h4>
//                         <div className="flex items-center">
//                           <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                             user.type === 'candidate' ? 'bg-blue-400' : 'bg-purple-400'
//                           }`}></span>
//                           <span className="text-sm text-gray-500">
//                             {user.type === 'candidate' ? 'Candidat' : 'Recruteur'}
//                           </span>
//                           {user.online && (
//                             <span className="ml-2 text-xs text-green-600">En ligne</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <Users size={48} className="mx-auto text-gray-400 mb-3" />
//                     <p className="text-gray-500">Aucun utilisateur disponible</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .new-chat-button {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
        
//         .new-chat-button:hover {
//           transform: scale(1.1);
//           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
//         }
//       `}</style>
//     </div>
//   );
// };
// export default MessagesPage;
                







import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/message.css';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Phone, 
  Video, 
  Info, 
  Send, 
  Paperclip, 
  MessageSquare, 
  X, 
  Users,
  Check,
  CheckCheck,
  MoreVertical,
  Edit2,
  Trash2,
  Reply
} from 'lucide-react';

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatSearch, setNewChatSearch] = useState('');
  const [userType, setUserType] = useState('recruiter');
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef(null);

  // Navigation function
  const navigateToDashboard = () => {
    window.location.href = '/RecruiterDashboard';
  };

  // Simulated user data
  const [allUsers, setAllUsers] = useState([
    { id: 101, name: 'Marie Dubois', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
    { id: 102, name: 'Jean Martin', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
    { id: 103, name: 'Sophie Laurent', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: true },
    { id: 104, name: 'Pierre Dupont', type: 'candidate', avatar: 'https://via.placeholder.com/40x40', online: false },
    { id: 201, name: 'Alice Moreau', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
    { id: 202, name: 'Thomas Bernard', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: true },
    { id: 203, name: 'Emma Wilson', type: 'recruiter', avatar: 'https://via.placeholder.com/40x40', online: false },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      userId: 101,
      name: 'Marie Dubois',
      avatar: 'https://via.placeholder.com/40x40',
      lastMessage: 'Merci pour votre retour rapide !',
      timestamp: '14:30',
      unread: 2,
      online: true,
      type: 'candidate',
      lastSeen: new Date()
    },
    {
      id: 2,
      userId: 102,
      name: 'Jean Martin',
      avatar: 'https://via.placeholder.com/40x40',
      lastMessage: 'Quand pouvons-nous programmer l\'entretien ?',
      timestamp: '12:15',
      unread: 0,
      online: false,
      type: 'candidate',
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      userId: 103,
      name: 'Sophie Laurent',
      avatar: 'https://via.placeholder.com/40x40',
      lastMessage: 'J\'ai quelques questions sur le poste',
      timestamp: 'Hier',
      unread: 1,
      online: true,
      type: 'candidate',
      lastSeen: new Date()
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 101,
        content: 'Bonjour, je suis intéressée par le poste de Senior React Developer',
        timestamp: '10:30',
        status: 'read',
        readBy: ['me'],
        edited: false
      },
      {
        id: 2,
        senderId: 'me',
        content: 'Bonjour Marie, merci pour votre candidature. J\'ai examiné votre profil et il correspond parfaitement à nos besoins.',
        timestamp: '10:45',
        status: 'read',
        readBy: [101],
        edited: false
      },
      {
        id: 3,
        senderId: 101,
        content: 'Merci pour votre retour rapide !',
        timestamp: '14:30',
        status: 'delivered',
        readBy: [],
        edited: false
      }
    ],
    2: [
      {
        id: 4,
        senderId: 102,
        content: 'Bonjour, suite à notre échange téléphonique',
        timestamp: '11:00',
        status: 'read',
        readBy: ['me'],
        edited: false
      },
      {
        id: 5,
        senderId: 'me',
        content: 'Bonjour Jean, nous pouvons programmer l\'entretien pour cette semaine.',
        timestamp: '11:30',
        status: 'read',
        readBy: [102],
        edited: false
      },
      {
        id: 6,
        senderId: 102,
        content: 'Quand pouvons-nous programmer l\'entretien ?',
        timestamp: '12:15',
        status: 'delivered',
        readBy: [],
        edited: false
      }
    ]
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter users for new chat
  const availableUsersForChat = allUsers.filter(user => {
    const typeMatch = userType === 'recruiter' ? user.type === 'candidate' : user.type === 'recruiter';
    const searchMatch = user.name.toLowerCase().includes(newChatSearch.toLowerCase());
    const notAlreadyInConversations = !conversations.some(conv => conv.userId === user.id);
    return typeMatch && searchMatch && notAlreadyInConversations;
  });

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: Date.now(),
        senderId: 'me',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        readBy: [],
        edited: false
      };

      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
      }));

      setConversations(prev => prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMessage, timestamp: 'Maintenant', unread: 0 }
          : conv
      ));

      setNewMessage('');

      // Simulate delivery and read status
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
            msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
          )
        }));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
            msg.id === newMsg.id ? { ...msg, status: 'read', readBy: [selectedConversation.userId] } : msg
          )
        }));
      }, 3000);
    }
  };

  // Handle message editing
  const handleEditMessage = (messageId, newContent) => {
    if (newContent.trim() && selectedConversation) {
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
          msg.id === messageId
            ? { ...msg, content: newContent, edited: true }
            : msg
        )
      }));

      // Update last message in conversation if it was the edited one
      const isLastMessage = messages[selectedConversation.id]
        .findIndex(msg => msg.id === messageId) === messages[selectedConversation.id].length - 1;
      
      if (isLastMessage) {
        setConversations(prev => prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newContent }
            : conv
        ));
      }
    }
    setEditingMessage(null);
    setEditContent('');
  };

  // Handle message deletion
  const handleDeleteMessage = (messageId) => {
    if (selectedConversation) {
      const updatedMessages = messages[selectedConversation.id].filter(msg => msg.id !== messageId);
      
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: updatedMessages
      }));

      // Update last message in conversation if the deleted one was the last
      if (updatedMessages.length > 0) {
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        setConversations(prev => prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: lastMessage.content }
            : conv
        ));
      } else {
        setConversations(prev => prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: '' }
            : conv
        ));
      }
    }
    setShowMessageOptions(null);
  };

  // Start editing
  const startEditing = (message) => {
    setEditingMessage(message.id);
    setEditContent(message.content);
    setShowMessageOptions(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  // Start a new conversation
  const startNewConversation = (user) => {
    const newConv = {
      id: Date.now(),
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      lastMessage: '',
      timestamp: 'Maintenant',
      unread: 0,
      online: user.online,
      type: user.type,
      lastSeen: new Date()
    };

    setConversations(prev => [...prev, newConv]);
    setMessages(prev => ({ ...prev, [newConv.id]: [] }));
    setSelectedConversation(newConv);
    setShowNewChatModal(false);
    setNewChatSearch('');
  };

  // Mark messages as read
  useEffect(() => {
    if (selectedConversation && messages[selectedConversation.id]) {
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(msg =>
          msg.senderId !== 'me' && !msg.readBy.includes('me')
            ? { ...msg, readBy: [...msg.readBy, 'me'] }
            : msg
        )
      }));

      setConversations(prev => prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, unread: 0 }
          : conv
      ));
    }
  }, [selectedConversation]);

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check style={{ width: '16px', height: '16px', color: '#9ca3af' }} />;
      case 'delivered':
        return <CheckCheck style={{ width: '16px', height: '16px', color: '#9ca3af' }} />;
      case 'read':
        return <CheckCheck style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
      default:
        return null;
    }
  };

  const formatLastSeen = (lastSeen) => {
    const now = new Date();
    const diff = now - lastSeen;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMessageOptions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="messages-containers">
      {/* Sidebar */}
      <div className="sidebarss">
        {/* Header */}
        <div className="sidebarss-header">
          <div className="headers-top">
            <div className="header-title-sections">
              <button onClick={navigateToDashboard} className="back-button">
                <ArrowLeft size={20} />
                Retour
              </button>
              <h2 className="pages-title">Messages</h2>
            </div>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="new-chat-buttons"
              title="Nouvelle conversation"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="conversations-lists">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`conversations-item ${
                selectedConversation?.id === conversation.id ? 'selected' : ''
              }`}
            >
              <div className="conversations-avatar-container">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="conversations-avatar"
                />
                {conversation.online && (
                  <div className="onlines-indicator"></div>
                )}
              </div>
              <div className="conversations-content">
                <div className="conversations-header">
                  <h3 className="conversations-name">
                    {conversation.name}
                  </h3>
                  <span className="conversations-time">
                    {conversation.timestamp}
                  </span>
                </div>
                <div className="conversations-footer">
                  <p className="conversations-last-message">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="unreads-badge">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="conversations-meta">
                  <span className={`user-type-indicators ${conversation.type}`}></span>
                  <span className="user-types-text">
                    {conversation.type === 'candidate' ? 'Candidat' : 'Recruteur'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chats-area">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="chats-header">
              <div className="chats-header-info">
                <div className="chats-avatar-container">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="chats-avatar"
                  />
                  {selectedConversation.online && (
                    <div className="chats-online-indicator"></div>
                  )}
                </div>
                <div className="chats-user-info">
                  <h2>{selectedConversation.name}</h2>
                  <p className="chats-user-status">
                    {selectedConversation.online
                      ? 'En ligne'
                      : `Vu ${formatLastSeen(selectedConversation.lastSeen)}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="chats-actions">
                <button className="actions-button">
                  <Phone size={20} />
                </button>
                <button className="actions-button">
                  <Video size={20} />
                </button>
                <button className="actions-button">
                  <Info size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="messages-areas">
              <div className="messages-lists">
                {(messages[selectedConversation.id] || []).map((message) => (
                  <div
                    key={message.id}
                    className={`message-rows ${message.senderId === 'me' ? 'sent' : 'received'}`}
                  >
                    <div
                      className={`messages-bubble ${message.senderId === 'me' ? 'sent' : 'received'}`}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (message.senderId === 'me') {
                          setShowMessageOptions(message.id);
                        }
                      }}
                    >
                      {editingMessage === message.id ? (
                        <div className="edits-form">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="edits-textarea"
                            rows="2"
                            autoFocus
                          />
                          <div className="edits-actions">
                            <button
                              onClick={() => handleEditMessage(message.id, editContent)}
                              className="edits-button save"
                            >
                              Sauvegarder
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="edits-button cancel"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="messages-content">{message.content}</p>
                          {message.edited && (
                            <span className="messages-edited">(modifié)</span>
                          )}
                          <div className="messages-footer">
                            <span className="messages-time">{message.timestamp}</span>
                            {message.senderId === 'me' && (
                              <div className="messages-status">
                                {getMessageStatus(message.status)}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMessageOptions(
                                      showMessageOptions === message.id ? null : message.id
                                    );
                                  }}
                                  className="messages-options-button"
                                >
                                  <MoreVertical size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Message Options */}
                      {showMessageOptions === message.id && message.senderId === 'me' && (
                        <div className="messages-options">
                          <button
                            onClick={() => startEditing(message)}
                            className="messages-option"
                          >
                            <Edit2 size={14} className="messages-option-icon" />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="messages-option delete"
                          >
                            <Trash2 size={14} className="message-option-icon" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="messages-input-container">
              <div className="messages-input-row">
                <button className="attachs-button">
                  <Paperclip size={20} />
                </button>
                <div className="inputs-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="messages-input"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="send-button"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No conversation selected
          <div className="emptys-state">
            <div className="emptys-state-content">
              <MessageSquare size={64} className="empty-state-icon" />
              <h3 className="emptys-state-title">
                Sélectionnez une conversation
              </h3>
              <p className="emptys-state-text">
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="modals-overlay">
          <div className="modals">
            <div className="modals-header">
              <h3 className="modals-title">Nouvelle conversation</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="modals-close"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modals-content">
              <div className="modals-search">
                <Search className="modals-search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={newChatSearch}
                  onChange={(e) => setNewChatSearch(e.target.value)}
                  className="modals-search-input"
                />
              </div>

              <div className="users-lists">
                {availableUsersForChat.length > 0 ? (
                  availableUsersForChat.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => startNewConversation(user)}
                      className="users-item"
                    >
                      <div className="users-avatar-container">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="users-avatar"
                        />
                        {user.online && (
                          <div className="users-online-indicator"></div>
                        )}
                      </div>
                      <div className="users-info">
                        <h4 className="users-name">{user.name}</h4>
                        <div className="users-meta">
                          <span className={`users-type-dot ${user.type}`}></span>
                          <span className="users-type-label">
                            {user.type === 'candidate' ? 'Candidat' : 'Recruteur'}
                          </span>
                          {user.online && (
                            <span className="users-online-status">En ligne</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="emptys-users">
                    <Users size={48} className="empty-users-icon" />
                    <p className="empty-users-text">Aucun utilisateur disponible</p>
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