import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import Loader from '../components/Loader';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getMyJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsAPI.deleteJob(id);
        setJobs(jobs.filter((job) => job._id !== id));
        alert('Job deleted successfully');
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Posted Jobs</h1>
          <Link
            to="/post-job"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <FaPlus />
            Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't posted any jobs yet</p>
            <Link
              to="/post-job"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.company} • {job.location}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span>{job.jobType}</span>
                      <span>•</span>
                      <span>{job.experienceLevel} Level</span>
                      <span>•</span>
                      <span>Posted {formatDate(job.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-indigo-600">
                          {job.applicants?.length || 0}
                        </span>
                        <span className="text-gray-600">Applications</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="View Job"
                    >
                      <FaEye size={20} />
                    </Link>
                    <Link
                      to={`/jobs/${job._id}/applications`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Applications"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Job"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;