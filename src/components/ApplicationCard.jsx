import { Link } from 'react-router-dom';
import { STATUS_COLORS, APPLICATION_STATUS } from '../utils/constants';
import { FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const ApplicationCard = ({ application }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link to={`/jobs/${application.job._id}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-600">
              {application.job.title}
            </h3>
          </Link>
          <p className="text-indigo-600 font-semibold">{application.job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[application.status]}`}>
          {APPLICATION_STATUS[application.status]}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-indigo-600" />
          {application.job.location}
        </span>
        <span className="flex items-center gap-1">
          <FaBriefcase className="text-indigo-600" />
          {application.job.jobType}
        </span>
      </div>

      {application.coverLetter && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">{application.coverLetter}</p>
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-200">
        <span>Applied on {formatDate(application.createdAt)}</span>
        
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Resume
          </a>
      </div>
    </div>
  );
};

export default ApplicationCard;