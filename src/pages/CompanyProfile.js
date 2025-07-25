import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/profilcc.css';
import { 
  Building, 
  Users, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Edit, 
  Save, 
  X, 
  Plus,
  Upload,
  Camera,
  ArrowLeft,
  LinkedinIcon,
  Twitter,
  Facebook
} from 'lucide-react';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Solutions',
    description: 'Entreprise leader dans le développement de solutions technologiques innovantes. Nous créons des produits qui transforment la façon dont les entreprises travaillent et interagissent avec leurs clients.',
    industry: 'Technologie',
    size: '50-100 employés',
    founded: '2015',
    location: 'Paris, France',
    website: 'https://techcorp-solutions.com',
    email: 'contact@techcorp-solutions.com',
    phone: '+33 1 23 45 67 89',
    logo: 'https://via.placeholder.com/120x120',
    cover: 'https://via.placeholder.com/800x200',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      facebook: 'https://facebook.com/techcorp'
    },
    benefits: [
      'Télétravail flexible',
      'Assurance santé premium',
      'Formation continue',
      'Tickets restaurant',
      'RTT supplémentaires'
    ],
    values: [
      'Innovation',
      'Collaboration',
      'Excellence',
      'Intégrité'
    ]
  });

  const [editData, setEditData] = useState(companyData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(companyData);
  };

  const handleSave = () => {
    setCompanyData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(companyData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (platform, value) => {
    setEditData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...editData.benefits];
    newBenefits[index] = value;
    setEditData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  const addBenefit = () => {
    setEditData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const removeBenefit = (index) => {
    setEditData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleValueChange = (index, value) => {
    const newValues = [...editData.values];
    newValues[index] = value;
    setEditData(prev => ({
      ...prev,
      values: newValues
    }));
  };

  const addValue = () => {
    setEditData(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const removeValue = (index) => {
    setEditData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const data = isEditing ? editData : companyData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/RecruiterDashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Profil Entreprise</h1>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cover Photo */}
        <div className="relative mb-8">
          <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
            <img 
              src={data.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30">
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          
          {/* Logo */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img 
                src={data.logo} 
                alt="Logo" 
                className="w-32 h-32 bg-white rounded-lg border-4 border-white shadow-lg object-cover"
              />
              {isEditing && (
                <button className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center text-white">
                  <Camera className="w-8 h-8" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg font-medium">{data.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      value={data.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{data.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secteur d'activité
                    </label>
                    {isEditing ? (
                      <select
                        value={data.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Technologie">Technologie</option>
                        <option value="Finance">Finance</option>
                        <option value="Santé">Santé</option>
                        <option value="Éducation">Éducation</option>
                        <option value="Commerce">Commerce</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{data.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille de l'entreprise
                    </label>
                    {isEditing ? (
                      <select
                        value={data.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1-10 employés">1-10 employés</option>
                        <option value="11-50 employés">11-50 employés</option>
                        <option value="51-200 employés">51-200 employés</option>
                        <option value="201-500 employés">201-500 employés</option>
                        <option value="500+ employés">500+ employés</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{data.size}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Année de création
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={data.founded}
                        onChange={(e) => handleInputChange('founded', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{data.founded}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={data.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {data.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={data.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a 
                      href={data.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {data.website}
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {data.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {data.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Réseaux sociaux
                  </label>
                  <div className="space-y-2">
                    {Object.entries(data.socialLinks).map(([platform, url]) => (
                      <div key={platform} className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                          {platform === 'linkedin' && <LinkedinIcon className="w-4 h-4 text-blue-600" />}
                          {platform === 'twitter' && <Twitter className="w-4 h-4 text-blue-400" />}
                          {platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-800" />}
                        </div>
                        {isEditing ? (
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => handleSocialChange(platform, e.target.value)}
                            placeholder={`URL ${platform}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 capitalize"
                          >
                            {platform}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Values */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Nos valeurs</h3>
                {isEditing && (
                  <button
                    onClick={addValue}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {data.values.map((value, index) => (
                  <div key={index} className="flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleValueChange(index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeValue(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Avantages</h3>
                {isEditing && (
                  <button
                    onClick={addBenefit}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {data.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleBenefitChange(index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeBenefit(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;