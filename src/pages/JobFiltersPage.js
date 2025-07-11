// import React from 'react';

// const JobFilters = ({ filters, onFilterChange }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onFilterChange({
//       ...filters,
//       [name]: value
//     });
//   };

//   return (
//     <div className="job-filters">
//       <div className="filter-group">
//         <input
//           type="text"
//           name="search"
//           placeholder="Rechercher un emploi..."
//           value={filters.search}
//           onChange={handleChange}
//           className="filter-input"
//         />
//       </div>
      
//       <div className="filter-group">
//         <select
//           name="location"
//           value={filters.location}
//           onChange={handleChange}
//           className="filter-select"
//         >
//           <option value="">Toutes les villes</option>
//           <option value="Paris">Paris</option>
//           <option value="Lyon">Lyon</option>
//           <option value="Marseille">Marseille</option>
//         </select>
//       </div>
      
//       <div className="filter-group">
//         <select
//           name="category"
//           value={filters.category}
//           onChange={handleChange}
//           className="filter-select"
//         >
//           <option value="">Toutes les catégories</option>
//           <option value="tech">Technologie</option>
//           <option value="design">Design</option>
//           <option value="management">Management</option>
//         </select>
//       </div>
      
//       <div className="filter-group">
//         <select
//           name="type"
//           value={filters.type}
//           onChange={handleChange}
//           className="filter-select"
//         >
//           <option value="">Tous les types</option>
//           <option value="CDI">CDI</option>
//           <option value="CDD">CDD</option>
//           <option value="Freelance">Freelance</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default JobFilters;
