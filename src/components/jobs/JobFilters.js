import React, { useMemo } from 'react';

const JobFilters = ({ filters, onFilterChange, jobs = [] }) => {
  // Extraction automatique des données uniques depuis les jobs
  const filterOptions = useMemo(() => {
    const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))].sort();
    
    // Extraction des expériences (niveaux d'expérience)
    const experiences = [...new Set(jobs.map(job => 
      job.experience || job.level || job.experienceLevel
    ).filter(Boolean))].sort();
    
    const types = [...new Set(jobs.map(job => job.type).filter(Boolean))].sort();
    const companies = [...new Set(jobs.map(job => job.company).filter(Boolean))].sort();
    
    // Extraction des départements
    const departments = [...new Set(jobs.map(job => 
      job.department || job.departmentName
    ).filter(Boolean))].sort();
    
    // Debug: afficher les options extraites
    console.log('Options de filtrage extraites:', {
      locations: locations.length,
      experiences: experiences.length,
      types: types.length,
      companies: companies.length,
      departments: departments.length
    });
    
    return {
      locations,
      experiences,
      types,
      companies,
      departments
    };
  }, [jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="job-filters">
      <div className="filter-group">
        <input
          type="text"
          name="search"
          placeholder="Rechercher un emploi, entreprise, compétence..."
          value={filters.search}
          onChange={handleChange}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Toutes les villes</option>
          {filterOptions.locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <select
          name="experience"
          value={filters.experience || ''}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Tous les niveaux d'expérience</option>
          {filterOptions.experiences.map(experience => (
            <option key={experience} value={experience}>{experience}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          name="department"
          value={filters.department || ''}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Tous les départements</option>
          {filterOptions.departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Tous les types</option>
          {filterOptions.types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          name="company"
          value={filters.company || ''}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Toutes les entreprises</option>
          {filterOptions.companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
    </div>
     </div>
  );
};

export default JobFilters;



