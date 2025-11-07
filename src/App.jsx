import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import MyApplications from './pages/MyApplications';
import Applications from './pages/Applications';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            
            {/* Job Seeker Routes */}
            <Route
              path="/my-applications"
              element={
                <PrivateRoute requiredRole="jobseeker">
                  <MyApplications />
                </PrivateRoute>
              }
            />
            
            {/* Employer Routes */}
            <Route
              path="/post-job"
              element={
                <PrivateRoute requiredRole="employer">
                  <PostJob />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-jobs"
              element={
                <PrivateRoute requiredRole="employer">
                  <MyJobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/:jobId/applications"
              element={
                <PrivateRoute requiredRole="employer">
                  <Applications />
                </PrivateRoute>
              }
            />
            
            {/* Common Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;