import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import '../styles/pages/JobsPage.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    type: '',
    salary: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de récupération des emplois
    const fetchJobs = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockJobs = [
        {
          id: 1,
          title: 'Développeur Full Stack',
          company: 'TechCorp',
          location: 'Paris',
          type: 'CDI',
          salary: '45000-55000 CFA',
          category: 'tech',
          description: 'Nous recherchons un développeur full stack expérimenté...',
          requirements: ['React', 'Node.js', 'PostgreSQL'],
          posted: '2024-01-15'
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'Design Studio',
          location: 'Lyon',
          type: 'CDI',
          salary: '38000-45000 CFA',
          category: 'design',
          description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
          requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
          posted: '2024-01-14'
        },
        {
          id: 3,
          title: 'Chef de Projet Digital',
          company: 'Digital Agency',
          location: 'Marseille',
          type: 'CDI',
          salary: '42000-50000 CFA',
          category: 'management',
          description: 'Nous cherchons un chef de projet digital dynamique...',
          requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
          posted: '2024-01-13'
        },
        {
      id: 4,
      title: "Senior UX Designer",
      company: "Google",
      location: ('featuredJobs.remoteWork'),
      type: 'stage',
      salary: "$80k-$120k",
      category: 'UX Designer',
          description: 'Nous cherchons un responsable de projet digital dynamique...',
          requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
          posted: '2024-01-13'
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Meta",
      location: "San Francisco",
      type: 'CDI',
      salary: "$100k-$150k",
      category: 'management',
          description: 'Nous cherchons un chef de projet digital dynamique...',
          requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
          posted: '2024-01-13'
    },
    {
      id: 6,
      title: "Junior Graphic Designer",
      company: "Adobe",
      location: "New York",
      type: 'freeland',
      salary: "$50k-$70k",
      category: 'management',
          description: 'Nous cherchons un chef de projet digital dynamique...',
          requirements: ['Gestion de projet', 'Agile', 'Digital Marketing'],
          posted: '2024-01-13'
    },
    {
      id: 7,
      title: "Product Designer",
      company: "Apple",
      location: "Cupertino",
      type: 'freeland',
      salary: "$90k-$130k",
      category: 'tech',
          description: 'Nous recherchons un développeur full stack expérimenté...',
          requirements: ['React', 'Node.js', 'PostgreSQL'],
          posted: '2024-01-15'
    },
    {
      id: 8,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Seattle",
      type: 'CDI',
      salary: "$85k-$125k",
      category: 'design',
          description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
          requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
          posted: '2024-01-14'
    },
    {
      id: 9,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Angeles",
      type: 'stage',
      salary: "$110k-$160k",
     category: 'design',
          description: 'Rejoignez notre équipe créative en tant que UX/UI Designer...',
          requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
          posted: '2024-01-14'
      
    }
      ];
      
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filtrage des emplois
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-container">
        <div className="jobs-header">
          <h1>Emplois disponibles</h1>
          <p>Trouvez l'emploi qui vous correspond</p>
        </div>
        
        <JobFilters filters={filters} onFilterChange={handleFilterChange} />
        
        <div className="jobs-content">
          {loading ? (
            <div className="loading">Chargement des emplois...</div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
