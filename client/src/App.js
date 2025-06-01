import './App.css';
import LoginPage from './components/loginPage';
import SignUpPage from './components/signUpPage';
import NewProjectPage from './components/NewProjectPage';
import PodcastDashboard from './components/PodcastDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/publicRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
          <Route path="/signup" element={<PublicRoute element={<SignUpPage />} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <NewProjectPage />
            </ProtectedRoute>
          } />
          <Route path="/podcast" element={
            <ProtectedRoute>
              <PodcastDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
