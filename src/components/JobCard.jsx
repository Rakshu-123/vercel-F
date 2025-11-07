import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
            <p className="text-indigo-600 font-semibold">{job.company}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {job.status}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="text-gray-500 text-sm">+{job.skills.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-indigo-600" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <FaBriefcase className="text-indigo-600" />
              {job.jobType}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <FaClock className="text-indigo-600" />
            {formatDate(job.createdAt)}
          </span>
        </div>

        {job.salary && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-green-600 font-semibold">
              ₹{job.salary.min?.toLocaleString()} - ₹{job.salary.max?.toLocaleString()} / year
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobCard;