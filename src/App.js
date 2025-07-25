// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import './i18n';
// import { TranslationProvider } from './contexts/TranslationContext';
// import { store } from './store';
// import { AuthProvider } from './contexts/AuthContext';
// import { Toaster } from 'react-hot-toast';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
//  import RecruiterDashboard from './pages/RecruiterDashboard';
// import CandidateDashboard from './pages/CandidateDashboard';
// import ProfilePage from './pages/ProfilePage';
// // import CompanyPage from './pages/CompanyPage';
// import './styles/globals.css';


// function App() {
//   return (
//    <TranslationProvider>
//     <Provider store={store}>
//       <AuthProvider>
//         <Router>
//           <div className="App">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               {/* <Route path="/jobs" element={<JobsPage />} /> */}
//               <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
//                 <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
//               <Route path="/profile" element={<ProfilePage />} />
//               {/* <Route path="/company" element={<CompanyPage />} /> */}
//             </Routes>
//             <Toaster position="top-right" />
//           </div>
//         </Router>
//       </AuthProvider>
//     </Provider>
//     </TranslationProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import { TranslationProvider } from './contexts/TranslationContext';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Pages existantes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import ProfilePage from './pages/ProfilePage';
import DashboardAdmin from './pages/DashboardAdmin';
import CompanyProfile from './pages/CompanyProfile';
import CompanyPage from './pages/CompanyPage';
import CandidatesPage from './pages/CandidatesPage';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import MessagesPage from './pages/MessagesPage';
import MyJobs from './pages/MyJobs';

import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

// Nouvelles pages
import JobDetailPage from './pages/JobDetailPage';
import EditJobPage from './pages/EditJobPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import ImportCandidatesPage from './pages/ImportCandidatesPage';
import JobsFilterPage from './pages/JobsFilterPage';
import AnalyticsPage from './pages/AnalyticsPage';

import './styles/globals.css';
import RecentApplications from './pages/RecentApplicationsPage';

function App() {
  return (
    <TranslationProvider>
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Routes du dashboard */}
                <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
                <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
                <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                 <Route path="/company" element={<CompanyPage />} />
                 <Route path="/jobs" element={<JobsPage />} />
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
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </AuthProvider>
      </Provider>
    </TranslationProvider>
  );
}

export default App;
