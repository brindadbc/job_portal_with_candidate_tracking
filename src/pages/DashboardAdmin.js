import React from 'react';

const DashboardAdmin = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Administrateur</h1>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>Bienvenue dans l'espace administrateur</h2>
        <p>Ici vous pouvez gérer les utilisateurs et les paramètres de l'application.</p>
        
        <div style={{ marginTop: '20px' }}>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer'
          }}>
            Gérer les utilisateurs
          </button>
          
          <button style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Paramètres
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;