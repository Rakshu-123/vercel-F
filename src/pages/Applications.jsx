import { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/api';
import ApplicationCard from '../components/ApplicationCard';
import Loader from '../components/Loader';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet</p>
            
              <a
                href="/"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Browse Jobs
              </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <ApplicationCard key={application._id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;