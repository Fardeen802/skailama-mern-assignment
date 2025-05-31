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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<NewProjectPage />}  />
          <Route path="/podcast" element={<PodcastDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
