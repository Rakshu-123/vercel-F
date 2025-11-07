import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated, isEmployer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaBriefcase />
            JobPortal
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-indigo-200 transition">
              Jobs
            </Link>

            {isAuthenticated ? (
              <>
                {isEmployer ? (
                  <>
                    <Link to="/post-job" className="hover:text-indigo-200 transition">
                      Post Job
                    </Link>
                    <Link to="/my-jobs" className="hover:text-indigo-200 transition">
                      My Jobs
                    </Link>
                  </>
                ) : (
                  <Link to="/my-applications" className="hover:text-indigo-200 transition">
                    My Applications
                  </Link>
                )}
                <Link to="/profile" className="hover:text-indigo-200 transition flex items-center gap-2">
                  <FaUser />
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-indigo-700 px-4 py-2 rounded hover:bg-indigo-800 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;