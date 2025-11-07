import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaMoneyBillWave, FaUser } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isJobSeeker, isEmployer } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getJobById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setApplying(true);
      await applicationsAPI.applyForJob({
        jobId: id,
        coverLetter,
      });
      setShowApplicationModal(false);
      alert('Application submitted successfully!');
      navigate('/my-applications');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <Loader />;

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800 mb-6 flex items-center gap-2"
        >
          ← Back to jobs
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-xl text-indigo-600 font-semibold">{job.company}</p>
            </div>
            {job.status === 'active' && isJobSeeker && (
              <button
                onClick={() => setShowApplicationModal(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Apply Now
              </button>
            )}
            {isEmployer && (
              <button
                onClick={() => navigate(`/jobs/${id}/applications`)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                View Applications
              </button>
            )}
          </div>

          {/* Job Info */}
          <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-indigo-600" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-indigo-600" />
              <span>{job.experienceLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-600" />
              <span>Posted on {formatDate(job.createdAt)}</span>
            </div>
          </div>

          {job.salary && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-green-800">
                <FaMoneyBillWave />
                <span className="font-semibold">
                  ₹{job.salary.min?.toLocaleString()} - ₹{job.salary.max?.toLocaleString()} / year
                </span>
              </div>
            </div>
          )}

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Deadline */}
          {job.applicationDeadline && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Application Deadline:</strong> {formatDate(job.applicationDeadline)}
              </p>
            </div>
          )}
        </div>

        {/* Posted By */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About the Company</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">
                {job.company.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{job.company}</p>
              <p className="text-gray-600">{job.postedBy?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for {job.title}</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter (Optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="6"
                placeholder="Tell us why you're a great fit for this position..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Your resume from your profile will be submitted with this application.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;