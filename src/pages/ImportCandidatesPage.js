import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  X,
  Download,
  Plus,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';

const ImportCandidatesPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importStatus, setImportStatus] = useState('idle');
  const [importResults, setImportResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setUploadedFile(file);
      setImportStatus('idle');
    } else {
      alert('Veuillez sélectionner un fichier CSV valide');
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const processImport = () => {
    if (!uploadedFile) return;
    
    setImportStatus('processing');
    
    setTimeout(() => {
      setImportStatus('success');
      setImportResults({
        total: 150,
        imported: 142,
        duplicates: 5,
        errors: 3,
        candidates: [
          { id: 1, name: 'Marie Dubois', email: 'marie.dubois@email.com', status: 'Importé' },
          { id: 2, name: 'Jean Martin', email: 'jean.martin@email.com', status: 'Importé' },
          { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', status: 'Doublons' },
          { id: 4, name: 'Pierre Moreau', email: 'pierre.moreau@email.com', status: 'Erreur' }
        ]
      });
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = "nom,email,telephone,poste,experience,competences\n";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_candidats.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Importé': return 'status-success';
      case 'Doublons': return 'status-warning';
      case 'Erreur': return 'status-error';
      default: return 'status-default';
    }
  };

  return (
    <div className="import-candidates-container">
      <div className="container">
        {/* Header */}
        <div className="import-header">
          <div className="header-content">
            <button 
              onClick={() => window.history.back()}
              className="back-button"
            >
              <ArrowLeft className="icon" />
              Retour
            </button>
            <h1 className="page-title">Importer des candidats</h1>
          </div>
          <p className="page-description">Importez vos candidats en masse depuis un fichier CSV</p>
        </div>

        {/* Section d'upload */}
        <div className="upload-section">
          <div className="upload-card">
            <h2 className="section-title">Télécharger un fichier</h2>
            
            {/* Zone de drag & drop */}
            <div
              className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="upload-icon" />
              <p className="upload-text">
                Glissez votre fichier CSV ici ou 
                <label className="browse-link">
                  parcourez
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden-input"
                  />
                </label>
              </p>
              <p className="upload-info">
                Taille maximale: 10MB. Format supporté: CSV
              </p>
            </div>

            {/* Fichier uploadé */}
            {uploadedFile && (
              <div className="uploaded-file">
                <div className="file-info">
                  <FileText className="file-icon" />
                  <div className="file-details">
                    <p className="file-name">{uploadedFile.name}</p>
                    <p className="file-size">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="remove-file-btn"
                >
                  <X className="icon" />
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="actions">
              <button
                onClick={processImport}
                disabled={!uploadedFile || importStatus === 'processing'}
                className="btn btn-primary"
              >
                <Upload className="btn-icon" />
                {importStatus === 'processing' ? 'Traitement...' : 'Importer'}
              </button>
              
              <button
                onClick={downloadTemplate}
                className="btn btn-secondary"
              >
                <Download className="btn-icon" />
                Télécharger modèle
              </button>
            </div>
          </div>

          {/* Résultats de l'import */}
          {importStatus === 'success' && importResults && (
            <div className="results-card">
              <h3 className="results-title">Résultats de l'import</h3>
              
              <div className="stats-grid">
                <div className="stat-card stat-total">
                  <div className="stat-number">{importResults.total}</div>
                  <div className="stat-label">Total</div>
                </div>
                <div className="stat-card stat-success">
                  <div className="stat-number">{importResults.imported}</div>
                  <div className="stat-label">Importés</div>
                </div>
                <div className="stat-card stat-warning">
                  <div className="stat-number">{importResults.duplicates}</div>
                  <div className="stat-label">Doublons</div>
                </div>
                <div className="stat-card stat-error">
                  <div className="stat-number">{importResults.errors}</div>
                  <div className="stat-label">Erreurs</div>
                </div>
              </div>

              <div className="candidates-list">
                {importResults.candidates.map((candidate) => (
                  <div key={candidate.id} className="candidate-item">
                    <div className="candidate-info">
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-email">{candidate.email}</div>
                    </div>
                    <span className={`status-badge ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Maintenant horizontal */}
        <div className="sidebar-horizontal">
          {/* Instructions */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Instructions</h3>
            <div className="instructions-list">
              <div className="instruction-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p className="step-title">Préparez votre fichier CSV</p>
                  <p className="step-description">Utilisez le modèle fourni ou respectez le format requis</p>
                </div>
              </div>
              <div className="instruction-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p className="step-title">Téléchargez le fichier</p>
                  <p className="step-description">Glissez-déposez ou sélectionnez votre fichier CSV</p>
                </div>
              </div>
              <div className="instruction-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <p className="step-title">Lancez l'import</p>
                  <p className="step-description">Vérifiez et importez vos candidats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Format requis */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Format requis</h3>
            <div className="format-list">
              <div className="format-item">
                <span className="format-field">nom</span>
                <span className="format-type">Texte</span>
              </div>
              <div className="format-item">
                <span className="format-field">email</span>
                <span className="format-type">Email</span>
              </div>
              <div className="format-item">
                <span className="format-field">telephone</span>
                <span className="format-type">Texte</span>
              </div>
              <div className="format-item">
                <span className="format-field">poste</span>
                <span className="format-type">Texte</span>
              </div>
              <div className="format-item">
                <span className="format-field">experience</span>
                <span className="format-type">Nombre</span>
              </div>
              <div className="format-item">
                <span className="format-field">competences</span>
                <span className="format-type">Texte</span>
              </div>
            </div>
          </div>

          {/* Conseils */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Conseils</h3>
            <div className="tips-list">
              <div className="tip-item">
                <CheckCircle className="tip-icon tip-success" />
                <p>Vérifiez que les emails sont uniques</p>
              </div>
              <div className="tip-item">
                <CheckCircle className="tip-icon tip-success" />
                <p>Séparez les compétences par des virgules</p>
              </div>
              <div className="tip-item">
                <CheckCircle className="tip-icon tip-success" />
                <p>Utilisez UTF-8 pour les caractères spéciaux</p>
              </div>
              <div className="tip-item">
                <AlertCircle className="tip-icon tip-warning" />
                <p>Maximum 1000 candidats par import</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Variables CSS */
        :root {
          --primary-color: #2563eb;
          --primary-hover: #1d4ed8;
          --primary-light: #dbeafe;
          --secondary-color: #64748b;
          --success-color: #10b981;
          --warning-color: #f59e0b;
          --error-color: #ef4444;
          --background-color: #f8fafc;
          --card-background: #ffffff;
          --border-color: #e2e8f0;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-muted: #94a3b8;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --radius: 0.5rem;
          --radius-lg: 0.75rem;
          --transition: all 0.2s ease-in-out;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .import-candidates-container {
          min-height: 100vh;
          background-color: var(--background-color);
          padding: 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .import-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          margin-right: 1rem;
          transition: var(--transition);
          font-size: 0.875rem;
        }

        .back-button:hover {
          background-color: var(--primary-light);
          color: var(--primary-color);
        }

        .back-button .icon {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.5rem;
        }

        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .page-description {
          color: var(--text-secondary);
          font-size: 1rem;
          margin: 0;
        }

        /* Upload Section */
        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .upload-card, .results-card {
          background: var(--card-background);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        /* Drag & Drop Zone */
        .drag-drop-zone {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          transition: var(--transition);
          cursor: pointer;
          background: #fafbfc;
        }

        .drag-drop-zone.drag-active {
          border-color: var(--primary-color);
          background-color: var(--primary-light);
        }

        .upload-icon {
          width: 3rem;
          height: 3rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .upload-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .browse-link {
          color: var(--primary-color);
          cursor: pointer;
          text-decoration: underline;
          margin-left: 0.25rem;
        }

        .browse-link:hover {
          color: var(--primary-hover);
        }

        .hidden-input {
          display: none;
        }

        .upload-info {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        /* Uploaded File */
        .uploaded-file {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--background-color);
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }

        .file-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .file-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--text-secondary);
          margin-right: 0.75rem;
        }

        .file-details {
          flex: 1;
        }

        .file-name {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .file-size {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        .remove-file-btn {
          background: none;
          border: none;
          color: var(--error-color);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius);
          transition: var(--transition);
        }

        .remove-file-btn:hover {
          background-color: #fee2e2;
        }

        .remove-file-btn .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Actions */
        .actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: var(--transition);
          border: none;
          text-decoration: none;
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .btn-primary {
          background-color: var(--primary-color);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background-color: var(--card-background);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background-color: var(--background-color);
          border-color: var(--primary-color);
          color: var(--primary-color);
        }

        /* Results */
        .results-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-card {
          text-align: center;
          padding: 1rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }

        .stat-total {
          background-color: var(--primary-light);
          border-color: var(--primary-color);
        }

        .stat-success {
          background-color: #d1fae5;
          border-color: var(--success-color);
        }

        .stat-warning {
          background-color: #fef3c7;
          border-color: var(--warning-color);
        }

        .stat-error {
          background-color: #fee2e2;
          border-color: var(--error-color);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-total .stat-number {
          color: var(--primary-color);
        }

        .stat-success .stat-number {
          color: var(--success-color);
        }

        .stat-warning .stat-number {
          color: var(--warning-color);
        }

        .stat-error .stat-number {
          color: var(--error-color);
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Candidates List */
        .candidates-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .candidate-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: var(--background-color);
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }

        .candidate-info {
          flex: 1;
        }

        .candidate-name {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .candidate-email {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-success {
          background-color: #d1fae5;
          color: var(--success-color);
        }

        .status-warning {
          background-color: #fef3c7;
          color: var(--warning-color);
        }

        .status-error {
          background-color: #fee2e2;
          color: var(--error-color);
        }

        .status-default {
          background-color: #f1f5f9;
          color: var(--text-secondary);
        }

        /* Sidebar Horizontal */
        .sidebar-horizontal {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sidebar-card {
          background: var(--card-background);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .sidebar-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        /* Instructions */
        .instructions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .instruction-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .step-number {
          width: 1.5rem;
          height: 1.5rem;
          background-color: var(--primary-light);
          color: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .step-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        /* Format List */
        .format-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .format-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .format-field {
          color: var(--text-secondary);
        }

        .format-type {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.75rem;
          background: var(--background-color);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }

        /* Tips List */
        .tips-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .tip-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .tip-success {
          color: var(--success-color);
        }

        .tip-warning {
          color: var(--warning-color);
        }

        .tip-item p {
          color: var(--text-primary);
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar-horizontal {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .import-candidates-container {
            padding: 1rem;
          }
          
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .back-button {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }
          
          .page-title {
            font-size: 1.5rem;
          }
          
          .actions {
            flex-direction: column;
          }
          
          .btn {
            justify-content: center;
          }
          
          .sidebar-horizontal {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ImportCandidatesPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/pages/importCandidat.css';
// import { 
//   Upload, 
//   FileText, 
//   Users, 
//   CheckCircle, 
//   AlertCircle, 
//   X,
//   Download,
//   Plus,
//   ArrowLeft,
//   Search,
//   Filter
// } from 'lucide-react';

// const ImportCandidatesPage = () => {
//   const navigate = useNavigate();
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [importStatus, setImportStatus] = useState('idle'); // idle, processing, success, error
//   const [importResults, setImportResults] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFile = (file) => {
//     if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
//       setUploadedFile(file);
//       setImportStatus('idle');
//     } else {
//       alert('Veuillez sélectionner un fichier CSV valide');
//     }
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const processImport = () => {
//     if (!uploadedFile) return;
    
//     setImportStatus('processing');
    
//     // Simulation du traitement
//     setTimeout(() => {
//       setImportStatus('success');
//       setImportResults({
//         total: 150,
//         imported: 142,
//         duplicates: 5,
//         errors: 3,
//         candidates: [
//           { id: 1, name: 'Marie Dubois', email: 'marie.dubois@email.com', status: 'Importé' },
//           { id: 2, name: 'Jean Martin', email: 'jean.martin@email.com', status: 'Importé' },
//           { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', status: 'Doublons' },
//           { id: 4, name: 'Pierre Moreau', email: 'pierre.moreau@email.com', status: 'Erreur' }
//         ]
//       });
//     }, 2000);
//   };

//   const downloadTemplate = () => {
//     // Simulation du téléchargement
//     const csvContent = "nom,email,telephone,poste,experience,competences\n";
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'template_candidats.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Importé': return 'text-green-600 bg-green-100';
//       case 'Doublons': return 'text-yellow-600 bg-yellow-100';
//       case 'Erreur': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <button 
//               onClick={() => navigate('/dashboard')}
//               className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Retour
//             </button>
//             <h1 className="text-3xl font-bold text-gray-900">Importer des candidats</h1>
//           </div>
//           <p className="text-gray-600">Importez vos candidats en masse depuis un fichier CSV</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Section d'upload */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-xl font-semibold mb-4">Télécharger un fichier</h2>
              
//               {/* Zone de drag & drop */}
//               <div
//                 className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                   dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                 }`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//               >
//                 <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-lg font-medium mb-2">
//                   Glissez votre fichier CSV ici ou 
//                   <label className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1">
//                     parcourez
//                     <input
//                       type="file"
//                       accept=".csv"
//                       onChange={handleFileInput}
//                       className="hidden"
//                     />
//                   </label>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Taille maximale: 10MB. Format supporté: CSV
//                 </p>
//               </div>

//               {/* Fichier uploadé */}
//               {uploadedFile && (
//                 <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
//                   <div className="flex items-center">
//                     <FileText className="w-5 h-5 text-gray-500 mr-3" />
//                     <div>
//                       <p className="font-medium">{uploadedFile.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setUploadedFile(null)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="mt-6 flex gap-4">
//                 <button
//                   onClick={processImport}
//                   disabled={!uploadedFile || importStatus === 'processing'}
//                   className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   {importStatus === 'processing' ? 'Traitement...' : 'Importer'}
//                 </button>
                
//                 <button
//                   onClick={downloadTemplate}
//                   className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Télécharger modèle
//                 </button>
//               </div>
//             </div>

//             {/* Résultats de l'import */}
//             {importStatus === 'success' && importResults && (
//               <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
//                 <h3 className="text-lg font-semibold mb-4">Résultats de l'import</h3>
                
//                 <div className="grid grid-cols-4 gap-4 mb-6">
//                   <div className="text-center p-4 bg-blue-50 rounded-lg">
//                     <div className="text-2xl font-bold text-blue-600">{importResults.total}</div>
//                     <div className="text-sm text-gray-600">Total</div>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 rounded-lg">
//                     <div className="text-2xl font-bold text-green-600">{importResults.imported}</div>
//                     <div className="text-sm text-gray-600">Importés</div>
//                   </div>
//                   <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                     <div className="text-2xl font-bold text-yellow-600">{importResults.duplicates}</div>
//                     <div className="text-sm text-gray-600">Doublons</div>
//                   </div>
//                   <div className="text-center p-4 bg-red-50 rounded-lg">
//                     <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
//                     <div className="text-sm text-gray-600">Erreurs</div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   {importResults.candidates.map((candidate) => (
//                     <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <div className="font-medium">{candidate.name}</div>
//                         <div className="text-sm text-gray-600">{candidate.email}</div>
//                       </div>
//                       <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(candidate.status)}`}>
//                         {candidate.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Instructions */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Instructions</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-start">
//                   <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
//                   <div>
//                     <p className="font-medium">Préparez votre fichier CSV</p>
//                     <p className="text-gray-600">Utilisez le modèle fourni ou respectez le format requis</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
//                   <div>
//                     <p className="font-medium">Téléchargez le fichier</p>
//                     <p className="text-gray-600">Glissez-déposez ou sélectionnez votre fichier CSV</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
//                   <div>
//                     <p className="font-medium">Lancez l'import</p>
//                     <p className="text-gray-600">Vérifiez et importez vos candidats</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Format requis */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Format requis</h3>
//               <div className="text-sm space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">nom</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Texte</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">email</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Email</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">telephone</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Texte</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">poste</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Texte</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">experience</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Nombre</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">competences</span>
//                   <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Texte</span>
//                 </div>
//               </div>
//             </div>

//             {/* Conseils */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Conseils</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-start">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
//                   <p>Vérifiez que les emails sont uniques</p>
//                 </div>
//                 <div className="flex items-start">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
//                   <p>Séparez les compétences par des virgules</p>
//                 </div>
//                 <div className="flex items-start">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
//                   <p>Utilisez UTF-8 pour les caractères spéciaux</p>
//                 </div>
//                 <div className="flex items-start">
//                   <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
//                   <p>Maximum 1000 candidats par import</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportCandidatesPage;



// import React, { useState } from 'react';
//  import '../styles/pages/importCandidat.css';
// import { 
//   Upload, 
//   FileText, 
//   Users, 
//   CheckCircle, 
//   AlertCircle, 
//   X,
//   Download,
//   Plus,
//   ArrowLeft,
//   Search,
//   Filter
// } from 'lucide-react';

// const ImportCandidatesPage = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [importStatus, setImportStatus] = useState('idle');
//   const [importResults, setImportResults] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFile = (file) => {
//     if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
//       setUploadedFile(file);
//       setImportStatus('idle');
//     } else {
//       alert('Veuillez sélectionner un fichier CSV valide');
//     }
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const processImport = () => {
//     if (!uploadedFile) return;
    
//     setImportStatus('processing');
    
//     setTimeout(() => {
//       setImportStatus('success');
//       setImportResults({
//         total: 150,
//         imported: 142,
//         duplicates: 5,
//         errors: 3,
//         candidates: [
//           { id: 1, name: 'Marie Dubois', email: 'marie.dubois@email.com', status: 'Importé' },
//           { id: 2, name: 'Jean Martin', email: 'jean.martin@email.com', status: 'Importé' },
//           { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', status: 'Doublons' },
//           { id: 4, name: 'Pierre Moreau', email: 'pierre.moreau@email.com', status: 'Erreur' }
//         ]
//       });
//     }, 2000);
//   };

//   const downloadTemplate = () => {
//     const csvContent = "nom,email,telephone,poste,experience,competences\n";
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'template_candidats.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Importé': return 'success';
//       case 'Doublons': return 'warning';
//       case 'Erreur': return 'error';
//       default: return '';
//     }
//   };

//   return (
//     <div className="import-candidates-container">
//       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
//         {/* Header */}
//         <div className="import-header" style={{ marginBottom: '2rem' }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <button 
//               onClick={() => window.history.back()}
//               className="back-button"
//               style={{ 
//                 display: 'flex', 
//                 alignItems: 'center',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 marginRight: '1rem'
//               }}
//             >
//               <ArrowLeft className="w-5 h-5" style={{ marginRight: '0.5rem' }} />
//               Retour
//             </button>
//             <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>
//               Importer des candidats
//             </h1>
//           </div>
//           <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
//             Importez vos candidats en masse depuis un fichier CSV
//           </p>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
//           {/* Section d'upload */}
//           <div>
//             <div className="import-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
//               <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
//                 Télécharger un fichier
//               </h2>
              
//               {/* Zone de drag & drop */}
//               <div
//                 className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//               >
//                 <Upload className="upload-icon" size={48} />
//                 <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
//                   Glissez votre fichier CSV ici ou {' '}
//                   <label style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
//                     parcourez
//                     <input
//                       type="file"
//                       accept=".csv"
//                       onChange={handleFileInput}
//                       style={{ display: 'none' }}
//                     />
//                   </label>
//                 </p>
//                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
//                   Taille maximale: 10MB. Format supporté: CSV
//                 </p>
//               </div>

//               {/* Fichier uploadé */}
//               {uploadedFile && (
//                 <div className="uploaded-file">
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <FileText size={20} style={{ marginRight: '0.75rem', color: 'var(--text-secondary)' }} />
//                       <div>
//                         <p style={{ fontWeight: '500', margin: 0 }}>{uploadedFile.name}</p>
//                         <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                           {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setUploadedFile(null)}
//                       style={{ 
//                         background: 'none', 
//                         border: 'none', 
//                         color: 'var(--error-color)', 
//                         cursor: 'pointer' 
//                       }}
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
//                 <button
//                   onClick={processImport}
//                   disabled={!uploadedFile || importStatus === 'processing'}
//                   className="btn btn-primary"
//                 >
//                   <Upload size={16} style={{ marginRight: '0.5rem' }} />
//                   {importStatus === 'processing' ? 'Traitement...' : 'Importer'}
//                 </button>
                
//                 <button
//                   onClick={downloadTemplate}
//                   className="btn btn-secondary"
//                 >
//                   <Download size={16} style={{ marginRight: '0.5rem' }} />
//                   Télécharger modèle
//                 </button>
//               </div>
//             </div>

//             {/* Résultats de l'import */}
//             {importStatus === 'success' && importResults && (
//               <div className="import-card import-results" style={{ padding: '2rem' }}>
//                 <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
//                   Résultats de l'import
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
//                   <div className="stat-card total">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
//                       {importResults.total}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total</div>
//                   </div>
//                   <div className="stat-card success">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-color)' }}>
//                       {importResults.imported}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Importés</div>
//                   </div>
//                   <div className="stat-card warning">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning-color)' }}>
//                       {importResults.duplicates}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Doublons</div>
//                   </div>
//                   <div className="stat-card error">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--error-color)' }}>
//                       {importResults.errors}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Erreurs</div>
//                   </div>
//                 </div>

//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                   {importResults.candidates.map((candidate) => (
//                     <div key={candidate.id} className="candidate-item">
//                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <div>
//                           <div style={{ fontWeight: '500' }}>{candidate.name}</div>
//                           <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
//                             {candidate.email}
//                           </div>
//                         </div>
//                         <span className={`status-badge ${getStatusColor(candidate.status)}`}>
//                           {candidate.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//             {/* Instructions */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Instructions
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">1</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Préparez votre fichier CSV</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Utilisez le modèle fourni ou respectez le format requis
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">2</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Téléchargez le fichier</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Glissez-déposez ou sélectionnez votre fichier CSV
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">3</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Lancez l'import</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Vérifiez et importez vos candidats
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Format requis */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Format requis
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>nom</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>email</span>
//                   <span className="format-type">Email</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>telephone</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>poste</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>experience</span>
//                   <span className="format-type">Nombre</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>competences</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//               </div>
//             </div>

//             {/* Conseils */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Conseils
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Vérifiez que les emails sont uniques</p>
//                 </div>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Séparez les compétences par des virgules</p>
//                 </div>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Utilisez UTF-8 pour les caractères spéciaux</p>
//                 </div>
//                 <div className="tip-item">
//                   <AlertCircle className="tip-icon" size={16} style={{ color: 'var(--warning-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Maximum 1000 candidats par import</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//        </div>
//    );
// };
//  export default ImportCandidatesPage;



// import React, { useState } from 'react';
// import { 
//   Upload, 
//   FileText, 
//   Users, 
//   CheckCircle, 
//   AlertCircle, 
//   X,
//   Download,
//   Plus,
//   ArrowLeft,
//   Search,
//   Filter
// } from 'lucide-react';

// const ImportCandidatesPage = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [importStatus, setImportStatus] = useState('idle');
//   const [importResults, setImportResults] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFile = (file) => {
//     if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
//       setUploadedFile(file);
//       setImportStatus('idle');
//     } else {
//       alert('Veuillez sélectionner un fichier CSV valide');
//     }
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const processImport = () => {
//     if (!uploadedFile) return;
    
//     setImportStatus('processing');
    
//     setTimeout(() => {
//       setImportStatus('success');
//       setImportResults({
//         total: 150,
//         imported: 142,
//         duplicates: 5,
//         errors: 3,
//         candidates: [
//           { id: 1, name: 'Marie Dubois', email: 'marie.dubois@email.com', status: 'Importé' },
//           { id: 2, name: 'Jean Martin', email: 'jean.martin@email.com', status: 'Importé' },
//           { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', status: 'Doublons' },
//           { id: 4, name: 'Pierre Moreau', email: 'pierre.moreau@email.com', status: 'Erreur' }
//         ]
//       });
//     }, 2000);
//   };

//   const downloadTemplate = () => {
//     const csvContent = "nom,email,telephone,poste,experience,competences\n";
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'template_candidats.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Importé': return 'success';
//       case 'Doublons': return 'warning';
//       case 'Erreur': return 'error';
//       default: return '';
//     }
//   };

//   return (
//     <div className="import-candidates-container">
//       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
//         {/* Header */}
//         <div className="import-header" style={{ marginBottom: '2rem' }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <button 
//               onClick={() => window.history.back()}
//               className="back-button"
//               style={{ 
//                 display: 'flex', 
//                 alignItems: 'center',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 marginRight: '1rem'
//               }}
//             >
//               <ArrowLeft className="w-5 h-5" style={{ marginRight: '0.5rem' }} />
//               Retour
//             </button>
//             <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>
//               Importer des candidats
//             </h1>
//           </div>
//           <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
//             Importez vos candidats en masse depuis un fichier CSV
//           </p>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
//           {/* Section d'upload */}
//           <div>
//             <div className="import-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
//               <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
//                 Télécharger un fichier
//               </h2>
              
//               {/* Zone de drag & drop */}
//               <div
//                 className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//               >
//                 <Upload className="upload-icon" size={48} />
//                 <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
//                   Glissez votre fichier CSV ici ou {' '}
//                   <label style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
//                     parcourez
//                     <input
//                       type="file"
//                       accept=".csv"
//                       onChange={handleFileInput}
//                       style={{ display: 'none' }}
//                     />
//                   </label>
//                 </p>
//                 <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
//                   Taille maximale: 10MB. Format supporté: CSV
//                 </p>
//               </div>

//               {/* Fichier uploadé */}
//               {uploadedFile && (
//                 <div className="uploaded-file">
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <FileText size={20} style={{ marginRight: '0.75rem', color: 'var(--text-secondary)' }} />
//                       <div>
//                         <p style={{ fontWeight: '500', margin: 0 }}>{uploadedFile.name}</p>
//                         <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                           {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setUploadedFile(null)}
//                       style={{ 
//                         background: 'none', 
//                         border: 'none', 
//                         color: 'var(--error-color)', 
//                         cursor: 'pointer' 
//                       }}
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
//                 <button
//                   onClick={processImport}
//                   disabled={!uploadedFile || importStatus === 'processing'}
//                   className="btn btn-primary"
//                 >
//                   <Upload size={16} style={{ marginRight: '0.5rem' }} />
//                   {importStatus === 'processing' ? 'Traitement...' : 'Importer'}
//                 </button>
                
//                 <button
//                   onClick={downloadTemplate}
//                   className="btn btn-secondary"
//                 >
//                   <Download size={16} style={{ marginRight: '0.5rem' }} />
//                   Télécharger modèle
//                 </button>
//               </div>
//             </div>

//             {/* Résultats de l'import */}
//             {importStatus === 'success' && importResults && (
//               <div className="import-card import-results" style={{ padding: '2rem' }}>
//                 <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
//                   Résultats de l'import
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
//                   <div className="stat-card total">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
//                       {importResults.total}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total</div>
//                   </div>
//                   <div className="stat-card success">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-color)' }}>
//                       {importResults.imported}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Importés</div>
//                   </div>
//                   <div className="stat-card warning">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning-color)' }}>
//                       {importResults.duplicates}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Doublons</div>
//                   </div>
//                   <div className="stat-card error">
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--error-color)' }}>
//                       {importResults.errors}
//                     </div>
//                     <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Erreurs</div>
//                   </div>
//                 </div>

//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                   {importResults.candidates.map((candidate) => (
//                     <div key={candidate.id} className="candidate-item">
//                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <div>
//                           <div style={{ fontWeight: '500' }}>{candidate.name}</div>
//                           <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
//                             {candidate.email}
//                           </div>
//                         </div>
//                         <span className={`status-badge ${getStatusColor(candidate.status)}`}>
//                           {candidate.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//             {/* Instructions */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Instructions
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">1</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Préparez votre fichier CSV</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Utilisez le modèle fourni ou respectez le format requis
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">2</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Téléchargez le fichier</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Glissez-déposez ou sélectionnez votre fichier CSV
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//                     <div className="step-number">3</div>
//                     <div>
//                       <p style={{ fontWeight: '500', margin: '0 0 0.25rem 0' }}>Lancez l'import</p>
//                       <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
//                         Vérifiez et importez vos candidats
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Format requis */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Format requis
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>nom</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>email</span>
//                   <span className="format-type">Email</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>telephone</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>poste</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>experience</span>
//                   <span className="format-type">Nombre</span>
//                 </div>
//                 <div className="format-item">
//                   <span style={{ color: 'var(--text-secondary)' }}>competences</span>
//                   <span className="format-type">Texte</span>
//                 </div>
//               </div>
//             </div>

//             {/* Conseils */}
//             <div className="import-card" style={{ padding: '1.5rem' }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//                 Conseils
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Vérifiez que les emails sont uniques</p>
//                 </div>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Séparez les compétences par des virgules</p>
//                 </div>
//                 <div className="tip-item">
//                   <CheckCircle className="tip-icon" size={16} style={{ color: 'var(--success-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Utilisez UTF-8 pour les caractères spéciaux</p>
//                 </div>
//                 <div className="tip-item">
//                   <AlertCircle className="tip-icon" size={16} style={{ color: 'var(--warning-color)' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>Maximum 1000 candidats par import</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Variables CSS pour une cohérence parfaite */
//         :root {
//           --primary-color: #2563eb;
//           --primary-hover: #1d4ed8;
//           --primary-light: #dbeafe;
//           --secondary-color: #64748b;
//           --success-color: #10b981;
//           --warning-color: #f59e0b;
//           --error-color: #ef4444;
//           --background-color: #f8fafc;
//           --card-background: #ffffff;
//           --border-color: #e2e8f0;
//           --text-primary: #1e293b;
//           --text-secondary: #64748b;
//           --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
//           --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//           --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
//           --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
//           --radius: 0.5rem;
//           --radius-lg: 0.75rem;
//           --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         * {
//           box-sizing: border-box;
//         }

//         body {
//           margin: 0;
//           padding: 0;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//           line-height: 1.6;
//           color: var(--text-primary);
//           background-color: var(--background-color);
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//         }

//         .import-candidates-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//           position: relative;
//           overflow-x: hidden;
//         }

//         .import-candidates-container::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 300px;
//           background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
//           opacity: 0.03;
//           z-index: -1;
//         }

//         .import-header {
//           animation: slideInFromTop 0.6s ease-out;
//         }

//         .import-header h1 {
//           background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           font-weight: 800;
//           letter-spacing: -0.025em;
//         }

//         .back-button {
//           position: relative;
//           overflow: hidden;
//           transition: var(--transition);
//           border-radius: var(--radius);
//           padding: 0.5rem 1rem;
//         }

//         .back-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           transition: left 0.6s ease;
//         }

//         .back-button:hover::before {
//           left: 100%;
//         }

//         .back-button:hover {
//           background-color: var(--primary-light);
//           color: var(--primary-color);
//           transform: translateX(-4px);
//         }

//         .import-card {
//           background: var(--card-background);
//           border-radius: var(--radius-lg);
//           box-shadow: var(--shadow-sm);
//           transition: var(--transition);
//           position: relative;
//           overflow: hidden;
//           animation: fadeInUp 0.6s ease-out;
//         }

//         .import-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, var(--primary-color), #3b82f6, var(--primary-color));
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .import-card:hover {
//           box-shadow: var(--shadow-xl);
//           transform: translateY(-4px);
//         }

//         .import-card:hover::before {
//           opacity: 1;
//         }

//         .drag-drop-zone {
//           position: relative;
//           background: linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%);
//           border: 2px dashed var(--border-color);
//           border-radius: var(--radius-lg);
//           padding: 3rem 2rem;
//           text-align: center;
//           transition: var(--transition);
//           cursor: pointer;
//           overflow: hidden;
//         }

//         .drag-drop-zone::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .drag-drop-zone:hover::before {
//           opacity: 1;
//         }

//         .drag-drop-zone.drag-active {
//           border-color: var(--primary-color);
//           background: linear-gradient(135deg, var(--primary-light) 0%, #f0f9ff 100%);
//           transform: scale(1.02);
//         }

//         .drag-drop-zone.drag-active::before {
//           opacity: 1;
//         }

//         .upload-icon {
//           animation: float 3s ease-in-out infinite;
//           margin-bottom: 1rem;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         .uploaded-file {
//           background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//           border: 1px solid var(--border-color);
//           border-radius: var(--radius);
//           padding: 1rem;
//           margin-top: 1rem;
//           animation: slideInFromBottom 0.4s ease-out;
//           position: relative;
//           overflow: hidden;
//         }

//         .uploaded-file::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, var(--success-color), #22c55e);
//           animation: loadingBar 2s ease-in-out;
//         }

//         .btn {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           padding: 0.75rem 1.5rem;
//           border-radius: var(--radius);
//           font-weight: 600;
//           text-decoration: none;
//           transition: var(--transition);
//           cursor: pointer;
//           border: none;
//           font-size: 0.875rem;
//           overflow: hidden;
//         }

//         .btn::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           transition: left 0.6s ease;
//         }

//         .btn:hover::before {
//           left: 100%;
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
//           color: white;
//           box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3);
//         }

//         .btn-primary:hover {
//           background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-color) 100%);
//           box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.4);
//           transform: translateY(-2px);
//         }

//         .btn-secondary {
//           background: var(--card-background);
//           color: var(--text-primary);
//           border: 1px solid var(--border-color);
//           box-shadow: var(--shadow-sm);
//         }

//         .btn-secondary:hover {
//           background: var(--background-color);
//           border-color: var(--primary-color);
//           color: var(--primary-color);
//           transform: translateY(-2px);
//         }

//         .btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//           transform: none !important;
//         }

//         .import-results {
//           animation: slideInFromRight 0.6s ease-out;
//         }

//         .stat-card {
//           background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
//           border-radius: var(--radius);
//           padding: 1.5rem;
//           text-align: center;
//           position: relative;
//           overflow: hidden;
//           transition: var(--transition);
//           cursor: pointer;
//         }

//         .stat-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: var(--shadow-lg);
//         }

//         .stat-card.total::before {
//           background: linear-gradient(90deg, var(--primary-color), #3b82f6);
//         }

//         .stat-card.success::before {
//           background: linear-gradient(90deg, var(--success-color), #22c55e);
//         }

//         .stat-card.warning::before {
//           background: linear-gradient(90deg, var(--warning-color), #fbbf24);
//         }

//         .stat-card.error::before {
//           background: linear-gradient(90deg, var(--error-color), #f87171);
//         }

//         .stat-card:hover::before {
//           height: 100%;
//           opacity: 0.05;
//         }

//         .candidate-item {
//           background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
//           border: 1px solid var(--border-color);
//           border-radius: var(--radius);
//           padding: 1rem;
//           margin-bottom: 0.5rem;
//           transition: var(--transition);
//           position: relative;
//           overflow: hidden;
//           animation: fadeInUp 0.4s ease-out;
//         }

//         .candidate-item::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.05), transparent);
//           transition: left 0.6s ease;
//         }

//         .candidate-item:hover::before {
//           left: 100%;
//         }

//         .candidate-item:hover {
//           transform: translateX(4px);
//           box-shadow: var(--shadow-md);
//           border-color: var(--primary-color);
//         }

//      .status-badge {
//           padding: 0.25rem 0.75rem;
//           border-radius: 9999px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.025em;
//           position: relative;
//           overflow: hidden;
//           transition: var(--transition);
//         }

//         .status-badge::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//           transition: left 0.6s ease;
//         }

//         .status-badge:hover::before {
//           left: 100%;
//         }

//         .status-badge.success {
//           background: linear-gradient(135deg, var(--success-color) 0%, #22c55e 100%);
//           color: white;
//           box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.3);
//         }

//         .status-badge.warning {
//           background: linear-gradient(135deg, var(--warning-color) 0%, #fbbf24 100%);
//           color: white;
//           box-shadow: 0 2px 8px 0 rgba(245, 158, 11, 0.3);
//         }

//         .status-badge.error {
//           background: linear-gradient(135deg, var(--error-color) 0%, #f87171 100%);
//           color: white;
//           box-shadow: 0 2px 8px 0 rgba(239, 68, 68, 0.3);
//         }

//         .sidebar {
//           animation: slideInFromRight 0.6s ease-out;
//         }

//         .instruction-step {
//           position: relative;
//           padding-left: 0.5rem;
//         }

//         .instruction-step::before {
//           content: '';
//           position: absolute;
//           left: 1.25rem;
//           top: 2.5rem;
//           width: 1px;
//           height: calc(100% - 1rem);
//           background: linear-gradient(to bottom, var(--primary-color), transparent);
//           opacity: 0.3;
//         }

//         .instruction-step:last-child::before {
//           display: none;
//         }

//         .step-number {
//           width: 2.5rem;
//           height: 2.5rem;
//           background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 0.875rem;
//           margin-right: 1rem;
//           flex-shrink: 0;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 4px 12px 0 rgba(37, 99, 235, 0.3);
//         }

//         .step-number::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .step-number:hover::before {
//           opacity: 1;
//         }

//         .format-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.5rem 0;
//           border-bottom: 1px solid var(--border-color);
//           transition: var(--transition);
//         }

//         .format-item:last-child {
//           border-bottom: none;
//         }

//         .format-item:hover {
//           background: linear-gradient(135deg, var(--primary-light) 0%, #f0f9ff 100%);
//           padding-left: 0.5rem;
//           border-radius: var(--radius);
//         }

//         .format-type {
//           background: linear-gradient(135deg, var(--secondary-color) 0%, #94a3b8 100%);
//           color: white;
//           padding: 0.25rem 0.5rem;
//           border-radius: var(--radius);
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.025em;
//           box-shadow: 0 2px 4px 0 rgba(100, 116, 139, 0.2);
//         }

//         .tip-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 0.5rem;
//           padding: 0.5rem 0;
//           transition: var(--transition);
//         }

//         .tip-item:hover {
//           background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//           padding-left: 0.5rem;
//           border-radius: var(--radius);
//         }

//         .tip-icon {
//           margin-top: 0.125rem;
//           flex-shrink: 0;
//         }

//         /* Animations */
//         @keyframes slideInFromTop {
//           from {
//             opacity: 0;
//             transform: translateY(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInFromBottom {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInFromRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes loadingBar {
//           0% {
//             width: 0%;
//           }
//           50% {
//             width: 70%;
//           }
//           100% {
//             width: 100%;
//           }
//         }

//         /* Fix pour éviter la superposition des éléments */
//         .import-candidates-container {
//           position: relative;
//           z-index: 0;
//         }

//         .import-candidates-container > div {
//           position: relative;
//           z-index: 1;
//         }

//         .import-card {
//           position: relative;
//           z-index: 2;
//           margin-bottom: 1.5rem;
//         }

//         .sidebar {
//           position: relative;
//           z-index: 3;
//         }

//         /* Assurer que le grid fonctionne correctement */
//         .import-candidates-container > div > div {
//           display: grid;
//           grid-template-columns: 2fr 1fr;
//           gap: 2rem;
//           align-items: start;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .import-candidates-container > div {
//             padding: 1rem !important;
//           }
          
//           .import-candidates-container > div > div {
//             grid-template-columns: 1fr !important;
//             gap: 1.5rem !important;
//           }
          
//           .sidebar {
//             order: -1;
//           }
//         }

//         @media (max-width: 768px) {
//           .import-header h1 {
//             font-size: 1.5rem !important;
//           }
          
//           .drag-drop-zone {
//             padding: 2rem 1rem !important;
//           }
          
//           .import-card {
//             padding: 1.5rem !important;
//           }
          
//           .btn {
//             padding: 0.625rem 1.25rem !important;
//             font-size: 0.8125rem !important;
//           }
          
//           .stat-card {
//             padding: 1rem !important;
//           }
          
//           .stat-card > div:first-child {
//             font-size: 1.5rem !important;
//           }
//         }

//         @media (max-width: 640px) {
//           .import-candidates-container > div {
//             padding: 0.5rem !important;
//           }
          
//           .import-header {
//             margin-bottom: 1rem !important;
//           }
          
//           .import-header h1 {
//             font-size: 1.25rem !important;
//           }
          
//           .sidebar {
//             gap: 1rem !important;
//           }
          
//           .import-card {
//             padding: 1rem !important;
//           }
          
//           .drag-drop-zone {
//             padding: 1.5rem 1rem !important;
//           }
          
//           .btn {
//             flex: 1;
//             justify-content: center;
//           }
          
//           .import-results > div:nth-child(2) {
//             grid-template-columns: repeat(2, 1fr) !important;
//           }
          
//           .candidate-item {
//             padding: 0.75rem !important;
//           }
          
//           .instruction-step {
//             padding-left: 0 !important;
//           }
          
//           .instruction-step::before {
//             display: none !important;
//           }
          
//           .step-number {
//             width: 2rem !important;
//             height: 2rem !important;
//             font-size: 0.75rem !important;
//           }
//         }

//         /* Dark mode support */
//         @media (prefers-color-scheme: dark) {
//           :root {
//             --primary-color: #3b82f6;
//             --primary-hover: #2563eb;
//             --primary-light: #1e293b;
//             --secondary-color: #94a3b8;
//             --success-color: #10b981;
//             --warning-color: #f59e0b;
//             --error-color: #ef4444;
//             --background-color: #0f172a;
//             --card-background: #1e293b;
//             --border-color: #334155;
//             --text-primary: #f1f5f9;
//             --text-secondary: #94a3b8;
//           }
          
//           .import-candidates-container::before {
//             opacity: 0.1;
//           }
          
//           .drag-drop-zone {
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//           }
          
//           .uploaded-file {
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//           }
          
//           .stat-card {
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//           }
          
//           .candidate-item {
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//           }
//         }

//         /* High contrast mode */
//         @media (prefers-contrast: high) {
//           .import-card {
//             border: 2px solid var(--border-color);
//           }
          
//           .btn-primary {
//             background: var(--primary-color);
//             border: 2px solid var(--primary-color);
//           }
          
//           .btn-secondary {
//             border: 2px solid var(--border-color);
//           }
          
//           .status-badge {
//             border: 2px solid currentColor;
//           }
//         }

//         /* Reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
          
//           .upload-icon {
//             animation: none;
//           }
          
//           .btn::before,
//           .candidate-item::before,
//           .status-badge::before {
//             display: none;
//           }
//         }

//         /* Print styles */
//         @media print {
//           .import-candidates-container {
//             background: white;
//             color: black;
//           }
          
//           .import-card {
//             box-shadow: none;
//             border: 1px solid #ccc;
//           }
          
//           .btn {
//             display: none;
//           }
          
//           .drag-drop-zone {
//             display: none;
//           }
//         }

//         /* Focus styles for accessibility */
//         .btn:focus,
//         .back-button:focus,
//         input[type="file"]:focus + label {
//           outline: 2px solid var(--primary-color);
//           outline-offset: 2px;
//         }

//         /* Loading states */
//         .btn:disabled {
//           position: relative;
//           overflow: hidden;
//         }

//         .btn:disabled::after {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           animation: shimmer 1.5s infinite;
//         }

//         @keyframes shimmer {
//           0% {
//             left: -100%;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}
//       </style>
//               </div>
//     );
//  };
//   export default ImportCandidatesPage;
