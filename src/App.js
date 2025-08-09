import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import { TranslationProvider } from './contexts/TranslationContext';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { JobsProvider } from './contexts/JobsContext';
import { Toaster } from 'react-hot-toast';

// Pages existantes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import ProfilePage from './pages/ProfilePage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import DashboardAdmin from './pages/DashboardAdmin';
import CompanyProfile from './pages/CompanyProfile';
import CompanyPage from './pages/CompanyPage';
import CandidatesPage from './pages/CandidatesPage';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import MessagesPage from './pages/MessagesPage';
import MyJobs from './pages/MyJobs';
import ContactSection from './pages/ContactSection';
import CandidateApplications from './pages/CandidateApplications';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import AdminJobsManagement from './pages/AdminJobsManagement';
import UsersManagement from './pages/UsersManagement';
import CompaniesManagement from './pages/CompaniesManagement';

// Nouvelles pages
import JobDetailPage from './pages/JobDetailPage';
import EditJobPage from './pages/EditJobPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import CandidateNotifications from './pages/CandidateNotifications';
import ImportCandidatesPage from './pages/ImportCandidatesPage';
import JobsFilterPage from './pages/JobsFilterPage';
import AnalyticsPage from './pages/AnalyticsPage';
import JobApplicationPage from './pages/JobApplicationPage';
import RecentApplications from './pages/RecentApplicationsPage';

import './styles/globals.css';

function App() {
  return (
    <TranslationProvider>
      <Provider store={store}>
        <AuthProvider>
          <JobsProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Routes du dashboard */}
                  <Route path="/admin-jobs" element={<AdminJobsManagement />} />
                  <Route path="/CandidateProfilPage" element={<CandidateProfilePage />} />
                  <Route path="/Applications" element={<CandidateApplications />} />
                  <Route path="/c-Notifications" element={<CandidateNotifications />} />
                  <Route path="/Users" element={<UsersManagement />} />
                  <Route path="/Companies-management" element={<CompaniesManagement />} />
                  <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
                  <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
                  <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/postuler" element={<JobApplicationPage />} />
                  <Route path="/company" element={<CompanyPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/contact" element={<ContactSection />} />
                  
                  {/* Routes du recruteur */}
                  <Route path="/company-profile" element={<CompanyProfile />} />
                  <Route path="/candidates" element={<CandidatesPage />} />
                  <Route path="/candidate/:id" element={<CandidateDetailPage />} />
                  <Route path="/create-job" element={<CreateJobPage />} />
                  <Route path="/my-jobs" element={<MyJobs />} />
                  <Route path="/job/:id" element={<JobDetailPage />} />
                  <Route path="/job/edit/:id" element={<EditJobPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/import-candidates" element={<ImportCandidatesPage />} />
                  <Route path="/jobs-filter" element={<JobsFilterPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/recent-applications" element={<RecentApplications />} />
                </Routes>
                <Toaster position="top-right" />
              </div>
            </Router>
          </JobsProvider>
        </AuthProvider>
      </Provider>
    </TranslationProvider>
  );
}

export default App;