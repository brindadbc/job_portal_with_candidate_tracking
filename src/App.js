import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import { TranslationProvider } from './contexts/TranslationContext';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
 import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import ProfilePage from './pages/ProfilePage';
// import CompanyPage from './pages/CompanyPage';
import './styles/globals.css';


function App() {
  return (
   <TranslationProvider>
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/jobs" element={<JobsPage />} /> */}
              <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
                <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/company" element={<CompanyPage />} /> */}
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
