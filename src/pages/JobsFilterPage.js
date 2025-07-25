// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/pages/jobFilter.css';
// import { 
//   Search, 
//   Filter, 
//   X, 
//   Calendar, 
//   MapPin, 
//   Users, 
//   Briefcase,
//   ArrowUpDown,
//   Eye,
//   Edit,
//   Trash2,
//   Plus,
//   Download,
//   RefreshCw
// } from 'lucide-react';


// const JobsFilterPage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedJobs, setSelectedJobs] = useState(new Set());
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     status: '',
//     location: '',
//     dateRange: '',
//     applicantCount: '',
//     jobType: '',
//     department: ''
//   });

//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: 'Senior React Developer',
//       department: 'Tech',
//       location: 'Paris',
//       type: 'CDI',
//       status: 'Actif',
//       applicants: 45,
//       views: 324,
//       datePosted: '2024-01-15',
//       deadline: '2024-02-15',
//       salary: '60-80k €'
//     },
//     {
//       id: 2,
//       title: 'UX Designer',
//       department: 'Design',
//       location: 'Remote',
//       type: 'CDI',
//       status: 'Actif',
//       applicants: 23,
//       views: 156,
//       datePosted: '2024-01-12',
//       deadline: '2024-02-12',
//       salary: '45-55k €'
//     },
//     {
//       id: 3,
//       title: 'Product Manager',
//       department: 'Product',
//       location: 'Lyon',
//       type: 'CDI',
//       status: 'Fermé',
//       applicants: 67,
//       views: 445,
//       datePosted: '2024-01-10',
//       deadline: '2024-02-10',
//       salary: '70-90k €'
//     },
//     {
//       id: 4,
//       title: 'DevOps Engineer',
//       department: 'Tech',
//       location: 'Marseille',
//       type: 'CDD',
//       status: 'Actif',
//       applicants: 34,
//       views: 198,
//       datePosted: '2024-01-08',
//       deadline: '2024-02-08',
//       salary: '55-70k €'
//     },
//     {
//       id: 5,
//       title: 'Marketing Manager',
//       department: 'Marketing',
//       location: 'Paris',
//       type: 'CDI',
//       status: 'Brouillon',
//       applicants: 0,
//       views: 0,
//       datePosted: '2024-01-05',
//       deadline: '2024-02-05',
//       salary: '50-65k €'
//     }
//   ]);

//   const statusOptions = [
//     { value: '', label: 'Tous les statuts' },
//     { value: 'Actif', label: 'Actif' },
//     { value: 'Fermé', label: 'Fermé' },
//     { value: 'Brouillon', label: 'Brouillon' },
//     { value: 'Expiré', label: 'Expiré' }
//   ];

//   const locationOptions = [
//     { value: '', label: 'Tous les lieux' },
//     { value: 'Paris', label: 'Paris' },
//     { value: 'Lyon', label: 'Lyon' },
//     { value: 'Marseille', label: 'Marseille' },
//     { value: 'Remote', label: 'Remote' }
//   ];

//   const departmentOptions = [
//     { value: '', label: 'Tous les départements' },
//     { value: 'Tech', label: 'Tech' },
//     { value: 'Design', label: 'Design' },
//     { value: 'Product', label: 'Product' },
//     { value: 'Marketing', label: 'Marketing' },
//     { value: 'HR', label: 'RH' }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Actif': return 'bg-green-100 text-green-800';
//       case 'Fermé': return 'bg-red-100 text-red-800';
//       case 'Brouillon': return 'bg-yellow-100 text-yellow-800';
//       case 'Expiré': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//   };

//   const handleSelectJob = (jobId) => {
//     setSelectedJobs(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(jobId)) {
//         newSet.delete(jobId);
//       } else {
//         newSet.add(jobId);
//       }
//       return newSet;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedJobs.size === filteredJobs.length) {
//       setSelectedJobs(new Set());
//     } else {
//       setSelectedJobs(new Set(filteredJobs.map(job => job.id)));
//     }
//   };

//   const handleBulkAction = (action) => {
//     setLoading(true);
//     setTimeout(() => {
//       switch(action) {
//         case 'delete':
//           setJobs(prev => prev.filter(job => !selectedJobs.has(job.id)));
//           break;
//         case 'close':
//           setJobs(prev => prev.map(job => 
//             selectedJobs.has(job.id) ? { ...job, status: 'Fermé' } : job
//           ));
//           break;
//         case 'activate':
//           setJobs(prev => prev.map(job => 
//             selectedJobs.has(job.id) ? { ...job, status: 'Actif' } : job
//           ));
//           break;
//       }
//       setSelectedJobs(new Set());
//       setLoading(false);
//     }, 1000);
//   };

//   const clearFilters = () => {
//     setFilters({
//       status: '',
//       location: '',
//       dateRange: '',
//       applicantCount: '',
//       jobType: '',
//       department: ''
//     });
//     setSearchQuery('');
//   };

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = !filters.status || job.status === filters.status;
//     const matchesLocation = !filters.location || job.location === filters.location;
//     const matchesDepartment = !filters.department || job.department === filters.department;
    
//     return matchesSearch && matchesStatus && matchesLocation && matchesDepartment;
//   });

//   const sortedJobs = [...filteredJobs].sort((a, b) => {
//     let aValue = a[sortBy];
//     let bValue = b[sortBy];
    
//     if (sortBy === 'applicants' || sortBy === 'views') {
//       aValue = parseInt(aValue);
//       bValue = parseInt(bValue);
//     }
    
//     if (sortOrder === 'asc') {
//       return aValue > bValue ? 1 : -1;
//     } else {
//       return aValue < bValue ? 1 : -1;
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Filtrer les offres</h1>
//               <p className="text-gray-600">Gérez et filtrez vos offres d'emploi</p>
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => navigate('/create-job')}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Nouvelle offre</span>
//               </button>
//               <button
//                 onClick={() => navigate('/dashboard')}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Retour
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Search and Filters */}
//         <div className="bg-white rounded-lg shadow-sm mb-6">
//           <div className="p-6 border-b">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//               <div className="flex-1 max-w-lg">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher une offre..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <Filter className="w-4 h-4" />
//                   <span>Filtres</span>
//                 </button>
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   <span>Effacer</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Filters Panel */}
//           {showFilters && (
//             <div className="p-6 bg-gray-50 border-t">
//               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Statut
//                   </label>
//                   <select
//                     value={filters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {statusOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Lieu
//                   </label>
//                   <select
//                     value={filters.location}
//                     onChange={(e) => handleFilterChange('location', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {locationOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Département
//                   </label>
//                   <select
//                     value={filters.department}
//                     onChange={(e) => handleFilterChange('department', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {departmentOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type de contrat
//                   </label>
//                   <select
//                     value={filters.jobType}
//                     onChange={(e) => handleFilterChange('jobType', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Tous les types</option>
//                     <option value="CDI">CDI</option>
//                     <option value="CDD">CDD</option>
//                     <option value="Stage">Stage</option>
//                     <option value="Freelance">Freelance</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bulk Actions */}
//         {selectedJobs.size > 0 && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <span className="text-sm text-blue-800">
//                   {selectedJobs.size} offre(s) sélectionnée(s)
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handleBulkAction('activate')}
//                   disabled={loading}
//                   className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
//                 >
//                   Activer
//                 </button>
//                 <button
//                   onClick={() => handleBulkAction('close')}
//                   disabled={loading}
//                   className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 disabled:opacity-50 transition-colors"
//                 >
//                   Fermer
//                 </button>
//                 <button
//                   onClick={() => handleBulkAction('delete')}
//                   disabled={loading}
//                   className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
//                 >
//                   Supprimer
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Jobs Table */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedJobs.size === filteredJobs.length && filteredJobs.length > 0}
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort('title')}
//                       className="flex items-center space-x-1 hover:text-gray-700"
//                     >
//                       <span>Titre</span>
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Département
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Lieu
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort('applicants')}
//                       className="flex items-center space-x-1 hover:text-gray-700"
//                     >
//                       <span>Candidatures</span>
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort('views')}
//                       className="flex items-center space-x-1 hover:text-gray-700"
//                     >
//                       <span>Vues</span>
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Statut
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort('datePosted')}
//                       className="flex items-center space-x-1 hover:text-gray-700"
//                     >
//                       <span>Date</span>
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {sortedJobs.map((job) => (
//                   <tr key={job.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="checkbox"
//                         checked={selectedJobs.has(job.id)}
//                         onChange={() => handleSelectJob(job.id)}
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{job.title}</div>
//                       <div className="text-sm text-gray-500">{job.salary}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {job.department}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <MapPin className="w-4 h-4 mr-1 text-gray-400" />
//                         {job.location}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <Users className="w-4 h-4 mr-1 text-gray-400" />
//                         {job.applicants}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {job.views}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
//                         {job.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                         {new Date(job.datePosted).toLocaleDateString('fr-FR')}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button
//                           onClick={() => navigate(`/job/${job.id}`)}
//                           className="text-blue-600 hover:text-blue-900 transition-colors"
//                           title="Voir les détails"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => navigate(`/job/edit/${job.id}`)}
//                           className="text-gray-600 hover:text-gray-900 transition-colors"
//                           title="Modifier"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => setJobs(prev => prev.filter(j => j.id !== job.id))}
//                           className="text-red-600 hover:text-red-900 transition-colors"
//                           title="Supprimer"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {sortedJobs.length === 0 && (
//             <div className="text-center py-12">
//               <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">Aucune offre trouvée</p>
//               <p className="text-sm text-gray-400 mt-2">
//                 Essayez de modifier vos filtres ou créez une nouvelle offre
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Stats */}
//         <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{filteredJobs.length}</div>
//               <div className="text-sm text-gray-600">Offres filtrées</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600">
//                 {filteredJobs.filter(j => j.status === 'Actif').length}
//               </div>
//               <div className="text-sm text-gray-600">Offres actives</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-orange-600">
//                 {filteredJobs.reduce((sum, job) => sum + job.applicants, 0)}
//               </div>
//               <div className="text-sm text-gray-600">Total candidatures</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-purple-600">
//                 {filteredJobs.reduce((sum, job) => sum + job.views, 0)}
//               </div>
//               <div className="text-sm text-gray-600">Total vues</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobsFilterPage;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Briefcase,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';

const JobsFilterPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    status: '',
    location: '',
    dateRange: '',
    applicantCount: '',
    jobType: '',
    department: ''
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Tech',
      location: 'Paris',
      type: 'CDI',
      status: 'Actif',
      applicants: 45,
      views: 324,
      datePosted: '2024-01-15',
      deadline: '2024-02-15',
      salary: '60-80k €'
    },
    {
      id: 2,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'CDI',
      status: 'Actif',
      applicants: 23,
      views: 156,
      datePosted: '2024-01-12',
      deadline: '2024-02-12',
      salary: '45-55k €'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Lyon',
      type: 'CDI',
      status: 'Fermé',
      applicants: 67,
      views: 445,
      datePosted: '2024-01-10',
      deadline: '2024-02-10',
      salary: '70-90k €'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Tech',
      location: 'Marseille',
      type: 'CDD',
      status: 'Actif',
      applicants: 34,
      views: 198,
      datePosted: '2024-01-08',
      deadline: '2024-02-08',
      salary: '55-70k €'
    },
    {
      id: 5,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Paris',
      type: 'CDI',
      status: 'Brouillon',
      applicants: 0,
      views: 0,
      datePosted: '2024-01-05',
      deadline: '2024-02-05',
      salary: '50-65k €'
    }
  ]);

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'Actif', label: 'Actif' },
    { value: 'Fermé', label: 'Fermé' },
    { value: 'Brouillon', label: 'Brouillon' },
    { value: 'Expiré', label: 'Expiré' }
  ];

  const locationOptions = [
    { value: '', label: 'Tous les lieux' },
    { value: 'Paris', label: 'Paris' },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' },
    { value: 'Remote', label: 'Remote' }
  ];

  const departmentOptions = [
    { value: '', label: 'Tous les départements' },
    { value: 'Tech', label: 'Tech' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'HR', label: 'RH' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif': return 'status-active';
      case 'Fermé': return 'status-closed';
      case 'Brouillon': return 'status-draft';
      case 'Expiré': return 'status-expired';
      default: return 'status-default';
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectJob = (jobId) => {
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedJobs.size === filteredJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(filteredJobs.map(job => job.id)));
    }
  };

  const handleBulkAction = (action) => {
    setLoading(true);
    setTimeout(() => {
      switch(action) {
        case 'delete':
          setJobs(prev => prev.filter(job => !selectedJobs.has(job.id)));
          break;
        case 'close':
          setJobs(prev => prev.map(job => 
            selectedJobs.has(job.id) ? { ...job, status: 'Fermé' } : job
          ));
          break;
        case 'activate':
          setJobs(prev => prev.map(job => 
            selectedJobs.has(job.id) ? { ...job, status: 'Actif' } : job
          ));
          break;
      }
      setSelectedJobs(new Set());
      setLoading(false);
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      location: '',
      dateRange: '',
      applicantCount: '',
      jobType: '',
      department: ''
    });
    setSearchQuery('');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesDepartment = !filters.department || job.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesLocation && matchesDepartment;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'applicants' || sortBy === 'views') {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8fafc;
        }

        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .header {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }

        .header-text h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-text p {
          color: #64748b;
          font-size: 1.1rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-size: 0.95rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          color: white;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(100, 116, 139, 0.4);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .search-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .search-header {
          padding: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .search-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-input-container {
          flex: 1;
          max-width: 500px;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background: white;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          width: 1.25rem;
          height: 1.25rem;
        }

        .search-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-filter {
          padding: 0.875rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          color: #475569;
        }

        .btn-filter:hover {
          border-color: #3b82f6;
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .btn-clear {
          padding: 0.875rem 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-weight: 500;
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .btn-clear:hover {
          color: #475569;
          background: #f1f5f9;
        }

        .filters-panel {
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-top: 1px solid #e2e8f0;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
        }

        .filter-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          background: white;
          color: #374151;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .bulk-actions {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 1px solid #93c5fd;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .bulk-actions-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bulk-actions-info {
          color: #1e40af;
          font-weight: 600;
        }

        .bulk-actions-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .bulk-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .bulk-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .bulk-btn.activate {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .bulk-btn.activate:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .bulk-btn.close {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .bulk-btn.close:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }

        .bulk-btn.delete {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .bulk-btn.delete:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .jobs-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .table-overflow {
          overflow-x: auto;
        }

        .jobs-table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
        }

        .table-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .table-header th {
          padding: 1.5rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }

        .table-header th:last-child {
          width: 140px;
          text-align: center;
        }

        .sort-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #374151;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .sort-button:hover {
          color: #1e40af;
        }

        .table-row {
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .table-row:hover {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .table-cell {
          padding: 1.5rem 1rem;
          vertical-align: middle;
          white-space: nowrap;
        }

        .table-cell:last-child {
          width: 140px;
          text-align: center;
        }

        .job-title {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }

        .job-salary {
          color: #64748b;
          font-size: 0.875rem;
        }

        .job-department {
          color: #374151;
          font-weight: 500;
        }

        .job-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
        }

        .job-applicants {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
          font-weight: 500;
        }

        .job-views {
          color: #374151;
          font-weight: 500;
        }

        .status-badge {
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-active {
          background: #dcfce7;
          color: #166534;
        }

        .status-closed {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-draft {
          background: #fef3c7;
          color: #92400e;
        }

        .status-expired {
          background: #f3f4f6;
          color: #374151;
        }

        .status-default {
          background: #f3f4f6;
          color: #374151;
        }

        .job-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
        }

        .job-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
        }

        .action-btn:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .action-btn.view {
          color: #3b82f6;
        }

        .action-btn.view:hover {
          color: #1e40af;
          background: #dbeafe;
        }

        .action-btn.edit {
          color: #64748b;
        }

        .action-btn.edit:hover {
          color: #475569;
          background: #f8fafc;
        }

        .action-btn.delete {
          color: #ef4444;
        }

        .action-btn.delete:hover {
          color: #dc2626;
          background: #fee2e2;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-state-icon {
          width: 4rem;
          height: 4rem;
          color: #9ca3af;
          margin: 0 auto 1.5rem;
        }

        .empty-state-title {
          color: #6b7280;
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .empty-state-text {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-value.primary {
          color: #3b82f6;
        }

        .stat-value.success {
          color: #10b981;
        }

        .stat-value.warning {
          color: #f59e0b;
        }

        .stat-value.purple {
          color: #8b5cf6;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          accent-color: #3b82f6;
        }

        .checkbox:checked {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }

        @media (max-width: 1024px) {
          .header-inner {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .search-content {
            flex-direction: column;
          }

          .search-input-container {
            max-width: 100%;
          }

          .filters-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .bulk-actions-content {
            flex-direction: column;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 1rem;
          }

          .main-content {
            padding: 1rem;
          }

          .header-inner {
            padding: 1.5rem 0;
          }

          .header-text h1 {
            font-size: 1.5rem;
          }

          .header-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            justify-content: center;
          }

          .search-header {
            padding: 1.5rem;
          }

          .filters-panel {
            padding: 1.5rem;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .table-header th {
            padding: 1rem 0.5rem;
            font-size: 0.75rem;
          }

          .table-cell {
            padding: 1rem 0.5rem;
          }

          .stats-card {
            padding: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .job-actions {
            flex-direction: column;
            gap: 0.25rem;
          }

          .action-btn {
            min-width: 28px;
            height: 28px;
            padding: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0 0.75rem;
          }

          .main-content {
            padding: 0.75rem;
          }

          .search-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-filter,
          .btn-clear {
            width: 100%;
            justify-content: center;
          }

          .bulk-actions-buttons {
            flex-direction: column;
            width: 100%;
          }

          .bulk-btn {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="header-inner">
              <div className="header-text">
                <h1>Filtrer les offres</h1>
                <p>Gérez et filtrez vos offres d'emploi</p>
              </div>
              <div className="header-actions">
                <button
                  onClick={() => navigate('/create-job')}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle offre</span>
                </button>
                <button
                  onClick={() => navigate('/RecruiterDashboard')}
                  className="btn btn-secondary"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Search and Filters */}
          <div className="search-card">
            <div className="search-header">
              <div className="search-content">
                <div className="search-input-container">
                  <div className="search-input-wrapper">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Rechercher une offre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
                <div className="search-actions">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn-filter"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                  </button>
                  <button
                    onClick={clearFilters}
                    className="btn-clear"
                  >
                    <X className="w-4 h-4" />
                    <span>Effacer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="filters-panel">
                <div className="filters-grid">
                  <div className="filter-group">
                    <label className="filter-label">Statut</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="filter-select"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Lieu</label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="filter-select"
                    >
                      {locationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Département</label>
                    <select
                      value={filters.department}
                      onChange={(e) => handleFilterChange('department', e.target.value)}
                      className="filter-select"
                    >
                      {departmentOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Type de contrat</label>
                    <select
                      value={filters.jobType}
                      onChange={(e) => handleFilterChange('jobType', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Tous les types</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedJobs.size > 0 && (
            <div className="bulk-actions">
              <div className="bulk-actions-content">
                <div className="bulk-actions-info">
                  {selectedJobs.size} offre(s) sélectionnée(s)
                </div>
                <div className="bulk-actions-buttons">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    disabled={loading}
                    className="bulk-btn activate"
                  >
                    Activer
                  </button>
                  <button
                    onClick={() => handleBulkAction('close')}
                    disabled={loading}
                    className="bulk-btn close"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    disabled={loading}
                    className="bulk-btn delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Table */}
          <div className="jobs-table-container">
            <div className="table-overflow">
              <table className="jobs-table">
                <thead className="table-header">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedJobs.size === filteredJobs.length && filteredJobs.length > 0}
                        onChange={handleSelectAll}
                        className="checkbox"
                      />
                    </th>
                    <th>
                      <button
                        onClick={() => handleSort('title')}
                        className="sort-button"
                      >
                        <span>Titre</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th>Département</th>
                    <th>Lieu</th>
                    <th>
                      <button
                        onClick={() => handleSort('applicants')}
                        className="sort-button"
                      >
                        <span>Candidatures</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleSort('views')}
                        className="sort-button"
                      >
                        <span>Vues</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th>Statut</th>
                    <th>
                      <button
                        onClick={() => handleSort('datePosted')}
                        className="sort-button"
                      >
                        <span>Date</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedJobs.map((job) => (
                    <tr key={job.id} className="table-row">
                      <td className="table-cell">
                        <input
                          type="checkbox"
                          checked={selectedJobs.has(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="checkbox"
                        />
                      </td>
                      <td className="table-cell">
                        <div className="job-title">{job.title}</div>
                        <div className="job-salary">{job.salary}</div>
                      </td>
                      <td className="table-cell">
                        <div className="job-department">{job.department}</div>
                      </td>
                      <td className="table-cell">
                        <div className="job-location">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="job-applicants">
                          <Users className="w-4 h-4" />
                          {job.applicants}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="job-views">{job.views}</div>
                      </td>
                      <td className="table-cell">
                        <span className={`status-badge ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="job-date">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.datePosted).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="job-actions">
                          <button
                            onClick={() => navigate(`/job/${job.id}`)}
                            className="action-btn view"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/job/edit/${job.id}`)}
                            className="action-btn edit"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setJobs(prev => prev.filter(j => j.id !== job.id))}
                            className="action-btn delete"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedJobs.length === 0 && (
              <div className="empty-state">
                <Briefcase className="empty-state-icon" />
                <div className="empty-state-title">Aucune offre trouvée</div>
                <div className="empty-state-text">
                  Essayez de modifier vos filtres ou créez une nouvelle offre
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value primary">{filteredJobs.length}</div>
                <div className="stat-label">Offres filtrées</div>
              </div>
              <div className="stat-item">
                <div className="stat-value success">
                  {filteredJobs.filter(j => j.status === 'Actif').length}
                </div>
                <div className="stat-label">Offres actives</div>
              </div>
              <div className="stat-item">
                <div className="stat-value warning">
                  {filteredJobs.reduce((sum, job) => sum + job.applicants, 0)}
                </div>
                <div className="stat-label">Total candidatures</div>
              </div>
              <div className="stat-item">
                <div className="stat-value purple">
                  {filteredJobs.reduce((sum, job) => sum + job.views, 0)}
                </div>
                <div className="stat-label">Total vues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsFilterPage;