import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateJobPage from '../pages/CreateJobPage';

// Bouton pour créer une offre (utilisé dans MyJobs)
const CreateJobButton = ({ className = "create-job-btn" }) => {
  const [showCreateJob, setShowCreateJob] = useState(false);

  if (showCreateJob) {
    return <CreateJobPage onClose={() => setShowCreateJob(false)} />;
  }

  return (
    <button
      onClick={() => setShowCreateJob(true)}
      className={className}
    >
      <Plus size={16} />
      {className.includes('empty') ? 'Créer une offre' : 'Nouvelle offre'}
    </button>
  );
};

export default CreateJobButton;